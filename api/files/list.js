/* ============================================================
   /api/files/list — Lista metadados de arquivos no KV
   КРЕМЛЬ · v2.0
   ============================================================ */

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
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  if (!auth(req, res)) return;
  res.setHeader('Cache-Control', 'no-store');

  try {
    const urls = (await kv.smembers('files:index')) || [];
    const files = await Promise.all(urls.map((u) => kv.get(`file:${u}`)));
    const valid = files.filter(Boolean).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    return res.status(200).json({ files: valid });
  } catch (e) {
    console.error('[list]', e);
    return res.status(200).json({ files: [] });
  }
}