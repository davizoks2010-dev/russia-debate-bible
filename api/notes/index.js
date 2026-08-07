/* ============================================================
   /api/notes — CRUD de notas Tiptap no KV
   КРЕМЛЬ · v2.0
   GET: lista todas / POST: cria nova
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

  if (req.method === 'GET') {
    try {
      const ids = (await kv.smembers('notes:index')) || [];
      const notes = await Promise.all(ids.map((id) => kv.get(`note:${id}`)));
      const valid = notes.filter(Boolean).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      return res.status(200).json({ notes: valid });
    } catch (e) {
      console.error('[notes GET]', e);
      return res.status(200).json({ notes: [] });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title = 'Sem título', content = '' } = req.body || {};
      const id = `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
      const note = {
        id,
        title: title.slice(0, 200),
        content: typeof content === 'string' ? content.slice(0, 200_000) : '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await kv.set(`note:${id}`, note);
      await kv.sadd('notes:index', id);
      return res.status(200).json(note);
    } catch (e) {
      console.error('[notes POST]', e);
      return res.status(500).json({ error: e.message || 'Falha ao criar nota' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}