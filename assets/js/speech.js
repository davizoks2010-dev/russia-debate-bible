/* ============================================================
   speech.js — Painel de Discurso (pins + drawer)
   КРЕМЛЬ · v2.0
   ============================================================ */

import { state, saveStorage, loadStorage, STORAGE_KEYS, showToast, capitalize } from './state.js';

export function addPin(item) {
  state.pinned.unshift(item);
  saveStorage(STORAGE_KEYS.pinned, state.pinned);
  refreshPin();
  showToast('Fixado no Painel de Discurso');
}

export function removePin(id) {
  state.pinned = state.pinned.filter((p) => p.id !== id);
  saveStorage(STORAGE_KEYS.pinned, state.pinned);
  refreshPin();
  renderSpeechList();
}

export function refreshPin() {
  const pinCount = document.getElementById('pinCount');
  const pinnedTotal = document.getElementById('pinnedTotal');
  if (pinCount) pinCount.textContent = state.pinned.length;
  if (pinnedTotal) pinnedTotal.textContent = state.pinned.length + ' ITENS';
  renderSpeechDrawer();
}

export function copyPin(id) {
  const p = state.pinned.find((x) => x.id === id);
  if (!p) return;
  navigator.clipboard.writeText(p.body).then(() => showToast('Fixado copiado'));
}

export function renderSpeechList() {
  const list = document.getElementById('speechList');
  const empty = document.getElementById('speechEmpty');
  if (!list) return;
  if (state.pinned.length === 0) {
    empty.classList.remove('hidden');
    list.innerHTML = '';
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = state.pinned.map((p, idx) => `
    <div class="tac-card glass-tac border border-[var(--line-default)] border-l-[3px] border-l-[var(--accent-red)] p-4 rounded fade-up" draggable="true" data-id="${p.id}">
      <div class="flex items-start justify-between gap-3 mb-2">
        <div>
          <div class="flex items-center gap-2">
            <span class="badge badge-red">${p.type ? capitalize(p.type) : 'FIXADO'}</span>
            <span class="font-mono text-[.65rem] text-[var(--text-tertiary)]">Σ-${String(idx+1).padStart(2,'0')}</span>
            <i data-lucide="grip-vertical" class="w-3 h-3 text-[var(--text-tertiary)] cursor-grab" title="Arrastar para reordenar"></i>
          </div>
          <h3 class="font-display text-lg text-white mt-1">${p.title}</h3>
          ${p.source ? `<div class="font-mono text-[.65rem] text-[var(--text-tertiary)] mt-0.5 tracking-widest">${p.source}</div>` : ''}
        </div>
        <div class="flex gap-1">
          <button class="btn btn-ghost text-[.65rem] !p-1.5" data-copy="${p.id}" title="Copiar"><i data-lucide="copy" class="w-3 h-3"></i></button>
          <button class="btn btn-ghost text-[.65rem] !p-1.5" data-remove="${p.id}" title="Remover"><i data-lucide="x" class="w-3 h-3"></i></button>
        </div>
      </div>
      <p class="text-[var(--text-secondary)] text-sm font-tact leading-relaxed whitespace-pre-wrap">${p.body}</p>
    </div>`).join('');
  if (window.lucide) lucide.createIcons();
  list.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copyPin(b.getAttribute('data-copy'))));
  list.querySelectorAll('[data-remove]').forEach((b) => b.addEventListener('click', () => removePin(b.getAttribute('data-remove'))));
  bindDragReorder();
}

/* HTML5 DnD reorder */
let dragSrcId = null;
function bindDragReorder() {
  const list = document.getElementById('speechList');
  if (!list) return;
  list.querySelectorAll('[draggable]').forEach((el) => {
    el.addEventListener('dragstart', (e) => {
      dragSrcId = el.getAttribute('data-id');
      el.classList.add('opacity-50');
      e.dataTransfer.effectAllowed = 'move';
    });
    el.addEventListener('dragend', () => { el.classList.remove('opacity-50'); dragSrcId = null; });
    el.addEventListener('dragover', (e) => { e.preventDefault(); el.classList.add('ring-1', 'ring-[var(--crimson-bright)]'); });
    el.addEventListener('dragleave', () => { el.classList.remove('ring-1', 'ring-[var(--crimson-bright)]'); });
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      el.classList.remove('ring-1', 'ring-[var(--crimson-bright)]');
      if (!dragSrcId || dragSrcId === el.getAttribute('data-id')) return;
      const fromIdx = state.pinned.findIndex((p) => p.id === dragSrcId);
      const toIdx   = state.pinned.findIndex((p) => p.id === el.getAttribute('data-id'));
      if (fromIdx < 0 || toIdx < 0) return;
      const [moved] = state.pinned.splice(fromIdx, 1);
      state.pinned.splice(toIdx, 0, moved);
      saveStorage(STORAGE_KEYS.pinned, state.pinned);
      renderSpeechList();
      renderSpeechDrawer();
    });
  });
}

export function renderSpeechDrawer() {
  const wrap = document.getElementById('speechDrawerList');
  if (!wrap) return;
  if (state.pinned.length === 0) {
    wrap.innerHTML = '<p class="text-[.7rem] font-mono text-[var(--text-tertiary)] text-center py-6">PAINEL VAZIO — sem itens fixados</p>';
    return;
  }
  wrap.innerHTML = state.pinned.map((p) => `
    <div class="d-pin" data-drawer-copy="${p.id}">
      <div class="flex items-center gap-2">
        <span class="badge badge-red">${p.type ? capitalize(p.type) : 'FIXADO'}</span>
        <i data-lucide="copy" class="w-3 h-3 text-[var(--text-tertiary)] ml-auto"></i>
      </div>
      <h4 class="font-display text-white text-sm leading-tight">${p.title}</h4>
      <p class="text-[var(--text-secondary)] text-[.8rem] font-tact leading-snug line-clamp-3">${p.body}</p>
    </div>`).join('');
  if (window.lucide) lucide.createIcons();
  wrap.querySelectorAll('[data-drawer-copy]').forEach((b) => b.addEventListener('click', () => copyPin(b.getAttribute('data-drawer-copy'))));
}

export function bindSpeech() {
  document.getElementById('openSpeechPanel')?.addEventListener('click', openDrawer);
  document.getElementById('closeSpeechDrawer')?.addEventListener('click', closeDrawer);
  document.getElementById('drawerBackdrop')?.addEventListener('click', closeDrawer);
  document.getElementById('clearPinned')?.addEventListener('click', () => {
    if (confirm('Limpar todos os itens do Painel de Discurso?')) {
      state.pinned = [];
      saveStorage(STORAGE_KEYS.pinned, []);
      refreshPin();
      renderSpeechList();
    }
  });
  document.getElementById('exportSession')?.addEventListener('click', () => exportSession());
  document.getElementById('addDoctrineToPanel')?.addEventListener('click', () => {
    addPin({
      id: 'doctrine-' + Date.now(),
      type: 'doutrina',
      title: 'Doutrina Soberana — Núcleo',
      body: 'A Federação Russa reitera: a proteção da criança não pode ser transformada em arma política. Soberania, não-seletividade, devido processo legal.',
      source: 'Painel de Doutrina',
    });
  });
}

function openDrawer() {
  document.getElementById('speechDrawer').classList.add('open');
  document.getElementById('drawerBackdrop').classList.remove('hidden');
}
function closeDrawer() {
  document.getElementById('speechDrawer').classList.remove('open');
  document.getElementById('drawerBackdrop').classList.add('hidden');
}

/* Exportar sessão — gera .html formatado estilo ata */
export function exportSession() {
  if (state.pinned.length === 0) return showToast('Painel vazio — nada para exportar');
  const items = state.pinned.map((p, i) => `
    <li>
      <div class="meta">
        <strong>${(p.type || 'FIXADO').toUpperCase()}</strong> ·
        <span>${p.source || '—'}</span> ·
        <span>Σ-${String(i+1).padStart(2,'0')}</span>
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      <pre>${escapeHtml(p.body)}</pre>
    </li>`).join('\n');
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Painel de Discurso — Federação Russa · SOCHUM 2026</title>
<style>
  body { font-family: Georgia, serif; max-width: 780px; margin: 2rem auto; padding: 0 1rem; color: #1a1a1a; line-height: 1.55; }
  h1 { font-family: 'Times New Roman', serif; letter-spacing: .04em; border-bottom: 2px solid #7A1414; padding-bottom: .5rem; }
  ol { list-style: none; padding: 0; }
  li { border-left: 3px solid #7A1414; padding: 1rem 1rem 1rem 1.25rem; margin: 1rem 0; background: #faf6ed; }
  li .meta { font-family: 'Courier New', monospace; font-size: .78rem; color: #7A1414; letter-spacing: .12em; margin-bottom: .35rem; }
  li h3 { margin: .25rem 0 .5rem; font-size: 1.05rem; }
  li pre { white-space: pre-wrap; font-family: 'Georgia', serif; font-size: .92rem; margin: 0; color: #2a2a2a; }
  footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #aaa; font-family: 'Courier New', monospace; font-size: .7rem; color: #555; letter-spacing: .12em; }
</style>
</head>
<body>
  <h1>Painel de Discurso — Federação Russa</h1>
  <p style="font-family:'Courier New',monospace; font-size:.78rem; color:#555; letter-spacing:.12em">
    SOCHUM/CIMED 2026 · Exportado em ${new Date().toLocaleString('pt-BR')}
  </p>
  <ol>${items}</ol>
  <footer>▲ КРЕМЛЬ · ${state.pinned.length} ITENS · СОВЕРШЕННО СЕКРЕТНО</footer>
</body>
</html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `painel-soberano-${Date.now()}.html`;
  a.click(); URL.revokeObjectURL(url);
  showToast('Sessão exportada');
}

function escapeHtml(s) { return (s || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }