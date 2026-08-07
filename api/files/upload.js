/* ============================================================
   /api/files/upload — Recebe FormData e grava no Vercel Blob + KV
   КРЕМЛЬ · v2.0
   ============================================================ */

import { put } from '@vercel/blob';
import { kv } from '@vercel/kv';

const ALLOWED = ['0502026', '260726', 'kr5', 'russia', 'msk5', 'kremlin', '5326658'];

function auth(req, res) {
  const code = (req.headers['x-access-code'] || '').toLowerCase();
  if (!ALLOWED.includes(code)) {
    res.status(401).json({ error: 'Credencial inválida' });
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  if (!auth(req, res)) return;

  try {
    /* Em Vercel, FormData vem como req.body já parseado */
    if (!req.body || !req.body.file) {
      return res.status(400).json({ error: 'Arquivo ausente' });
    }
    const file = req.body.file;
    /* Vercel Blob: put() aceita Blob / Buffer / string */
    const blob = await put(file.filename || `kremlin-${Date.now()}`, file.data, {
      access: 'public',
      addRandomSuffix: true,
    });

    const meta = {
      url: blob.url,
      name: file.filename || blob.pathname,
      size: file.size || 0,
      type: file.type || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
    };

    await kv.set(`file:${blob.url}`, meta);
    await kv.sadd('files:index', blob.url);

    return res.status(200).json({ ok: true, file: meta });
  } catch (e) {
    console.error('[upload]', e);
    return res.status(500).json({ error: e.message || 'Falha no upload' });
  }
}

export const config = {
  api: { bodyParser: false, sizeLimit: '25mb' },
};