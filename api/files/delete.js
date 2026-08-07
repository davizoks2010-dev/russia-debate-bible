/* ============================================================
   /api/files/delete — Remove arquivo do Blob e do KV
   КРЕМЛЬ · v2.0
   ============================================================ */

import { del } from '@vercel/blob';
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
    const { url } = req.body || {};
    if (!url) return res.status(400).json({ error: 'URL ausente' });

    await del(url);
    await kv.del(`file:${url}`);
    await kv.srem('files:index', url);

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[delete]', e);
    return res.status(500).json({ error: e.message || 'Falha ao deletar' });
  }
}