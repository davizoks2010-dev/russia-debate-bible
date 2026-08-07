/* ============================================================
   files.js — Módulo de Arquivos (Tiptap + upload/list/delete via API)
   КРЕМЛЬ · v2.0
   ============================================================ */

import { state, showToast } from './state.js';
import { SESSION_CODE } from './auth.js';

const API_BASE = '/api';

function authHeaders(extra = {}) {
  return { 'X-Access-Code': SESSION_CODE, ...extra };
}

async function api(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers: authHeaders(options.headers || {}) });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    showToast(`API: ${e.message}`);
    throw e;
  }
}

let editor = null;
let activeNoteId = null;

/* ============================================================
   LISTAGEM + TIPTAP
   ============================================================ */

export async function initFiles() {
  bindUpload();
  bindNotes();
  await loadFiles();
  await loadNotes();
}

function bindUpload() {
  const drop = document.getElementById('uploadDrop');
  const inp = document.getElementById('uploadInput');
  const pickBtn = document.getElementById('uploadPick');
  if (!drop || !inp) return;
  if (pickBtn) pickBtn.addEventListener('click', () => inp.click());
  inp.addEventListener('change', () => handleFiles([...inp.files]));
  ;['dragover','dragenter'].forEach((ev) => drop.addEventListener(ev, (e) => {
    e.preventDefault();
    drop.classList.add('is-active');
  }));
  ;['dragleave','drop'].forEach((ev) => drop.addEventListener(ev, (e) => {
    e.preventDefault();
    drop.classList.remove('is-active');
  }));
  drop.addEventListener('drop', (e) => {
    e.preventDefault();
    handleFiles([...(e.dataTransfer?.files || [])]);
  });
}

async function handleFiles(files) {
  if (!files.length) return;
  const allowed = files.filter((f) => f.size <= 25 * 1024 * 1024); /* 25MB */
  if (allowed.length < files.length) showToast('Arquivos >25MB foram ignorados.');
  for (const file of allowed) {
    const form = new FormData();
    form.append('file', file);
    try {
      await fetch(`${API_BASE}/files/upload`, {
        method: 'POST',
        headers: { 'X-Access-Code': SESSION_CODE },
        body: form,
      }).then((r) => {
        if (!r.ok) throw new Error('Falha no upload');
        return r.json();
      });
      showToast(`Enviado: ${file.name}`);
    } catch (e) {
      showToast(`Falha: ${file.name}`);
    }
  }
  await loadFiles();
}

async function loadFiles() {
  try {
    const list = await api('/files/list');
    state.files = list.files || [];
    renderFilesList();
  } catch (e) { /* silencioso */ }
}

function renderFilesList() {
  const wrap = document.getElementById('filesList');
  if (!wrap) return;
  if (state.files.length === 0) {
    wrap.innerHTML = '<p class="text-[var(--text-tertiary)] text-sm text-center py-6 font-mono">// Nenhum arquivo soberano armazenado</p>';
    return;
  }
  wrap.innerHTML = state.files.map((f) => `
    <div class="tac-card glass-tac border border-[var(--line-default)] rounded p-4 flex items-center gap-3 fade-up">
      <div class="w-10 h-10 rounded bg-[var(--bg-elevated)] flex items-center justify-center">
        <i data-lucide="${iconForType(f.type)}" class="w-5 h-5 text-[var(--accent-gold-soft)]"></i>
      </div>
      <div class="min-w-0 flex-1">
        <div class="font-display text-white text-sm truncate">${f.name}</div>
        <div class="font-mono text-[.65rem] text-[var(--text-tertiary)] mt-0.5">
          ${formatSize(f.size)} · ${new Date(f.uploadedAt).toLocaleString('pt-BR')}
        </div>
      </div>
      <div class="flex items-center gap-1">
        <a href="${f.url}" target="_blank" rel="noopener" class="btn btn-ghost text-[.65rem] !p-1.5" title="Abrir"><i data-lucide="external-link" class="w-3 h-3"></i></a>
        <button class="btn btn-ghost text-[.65rem] !p-1.5" data-delete-file="${f.url}" title="Remover"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
      </div>
    </div>`).join('');
  if (window.lucide) lucide.createIcons();
  wrap.querySelectorAll('[data-delete-file]').forEach((b) => {
    b.addEventListener('click', () => deleteFile(b.getAttribute('data-delete-file')));
  });
}

async function deleteFile(url) {
  if (!confirm('Excluir arquivo?')) return;
  try {
    await api('/files/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    showToast('Arquivo removido');
    await loadFiles();
  } catch (e) { /* silencioso */ }
}

function iconForType(type = '') {
  if (type.startsWith('image')) return 'image';
  if (type.includes('pdf')) return 'file-text';
  if (type.startsWith('video')) return 'film';
  if (type.startsWith('audio')) return 'music';
  if (type.includes('zip') || type.includes('compressed')) return 'package';
  return 'file';
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/* ============================================================
   NOTAS — Tiptap
   ============================================================ */

function bindNotes() {
  if (!window.TiptapCore) {
    console.warn('[files] Tiptap não carregou via CDN.');
    return;
  }
  const { Editor } = window.TiptapCore;
  const StarterKit = window.TiptapStarterKit.default || window.TiptapStarterKit;
  const Link = window.TiptapLink.default || window.TiptapLink;
  const Placeholder = window.TiptapPlaceholder.default || window.TiptapPlaceholder;

  editor = new Editor({
    element: document.getElementById('tiptapEditor'),
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Placeholder.configure({ placeholder: 'Digite sua nota diplomática aqui…' })],
    content: '<p></p>',
    onUpdate: ({ editor }) => { state.activeNoteDraft = editor.getHTML(); },
  });

  document.getElementById('noteNew')?.addEventListener('click', newNote);
  document.getElementById('noteSave')?.addEventListener('click', saveNote);
  document.getElementById('noteExport')?.addEventListener('click', exportNote);
  document.getElementById('noteDelete')?.addEventListener('click', deleteActiveNote);

  loadNotesList();
}

function newNote() {
  activeNoteId = null;
  if (editor) editor.commands.setContent('<p></p>');
  document.getElementById('noteTitle').value = '';
  showToast('Nova nota');
}

async function saveNote() {
  if (!editor) return;
  const title = document.getElementById('noteTitle').value.trim() || 'Sem título';
  const body = editor.getHTML();
  try {
    const res = await api('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content: body }),
    });
    activeNoteId = res.id;
    showToast('Nota salva');
    await loadNotes();
    loadNotesList();
  } catch (e) { /* silencioso */ }
}

async function loadNotes() {
  try {
    const list = await api('/notes');
    state.notes = list.notes || [];
  } catch (e) { state.notes = []; }
}

function loadNotesList() {
  const wrap = document.getElementById('notesList');
  if (!wrap) return;
  if (!state.notes.length) {
    wrap.innerHTML = '<p class="text-[var(--text-tertiary)] text-sm text-center py-6 font-mono">// Sem notas ainda</p>';
    return;
  }
  wrap.innerHTML = state.notes.map((n) => `
    <button class="d-pin text-left" data-note="${n.id}">
      <div class="flex items-center gap-2">
        <span class="badge badge-blue">NOTA</span>
        <i data-lucide="chevron-right" class="w-3 h-3 text-[var(--text-tertiary)] ml-auto"></i>
      </div>
      <h4 class="font-display text-white text-sm leading-tight">${n.title}</h4>
      <p class="text-[var(--text-secondary)] text-[.75rem] font-tact leading-snug line-clamp-2">${stripTags(n.content || '')}</p>
    </button>`).join('');
  if (window.lucide) lucide.createIcons();
  wrap.querySelectorAll('[data-note]').forEach((b) => {
    b.addEventListener('click', () => openNote(b.getAttribute('data-note')));
  });
}

async function openNote(id) {
  try {
    const res = await api('/notes/' + id);
    activeNoteId = id;
    document.getElementById('noteTitle').value = res.title;
    if (editor) editor.commands.setContent(res.content || '<p></p>');
    showToast('Nota carregada');
  } catch (e) { /* silencioso */ }
}

async function deleteActiveNote() {
  if (!activeNoteId) return showToast('Nenhuma nota ativa');
  if (!confirm('Excluir nota ativa?')) return;
  try {
    await api('/notes/' + activeNoteId, { method: 'DELETE' });
    activeNoteId = null;
    if (editor) editor.commands.setContent('<p></p>');
    document.getElementById('noteTitle').value = '';
    await loadNotes();
    loadNotesList();
    showToast('Nota excluída');
  } catch (e) { /* silencioso */ }
}

function exportNote() {
  if (!editor) return;
  const html = editor.getHTML();
  const blob = new Blob([`<html><body>${html}</body></html>`], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'nota.html';
  a.click(); URL.revokeObjectURL(url);
}

function stripTags(s) { return (s || '').replace(/<[^>]*>/g, '').slice(0, 140); }