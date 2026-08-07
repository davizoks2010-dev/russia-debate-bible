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