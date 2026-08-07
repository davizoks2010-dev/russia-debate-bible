/* ============================================================
   /api/notes/[id] — GET/PUT/DELETE nota específica
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
  if (!auth(req, res)) return;
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const note = await kv.get(`note:${id}`);
      if (!note) return res.status(404).json({ error: 'Nota não encontrada' });
      return res.status(200).json(note);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const existing = await kv.get(`note:${id}`);
      if (!existing) return res.status(404).json({ error: 'Nota não encontrada' });
      const { title, content } = req.body || {};
      const updated = {
        ...existing,
        title: (title || existing.title).slice(0, 200),
        content: (content ?? existing.content).toString().slice(0, 200_000),
        updatedAt: new Date().toISOString(),
      };
      await kv.set(`note:${id}`, updated);
      return res.status(200).json(updated);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await kv.del(`note:${id}`);
      await kv.srem('notes:index', id);
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}