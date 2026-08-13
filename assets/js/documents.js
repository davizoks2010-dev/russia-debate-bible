/* ============================================================
   documents.js — Módulo de Documentos Soberanos
   КРЕМЛЬ · v3.0
   Curadoria hardcoded · Filtros · Modal leitura · Fixar no Painel
   ============================================================ */

import { DOCS } from './documents-data.js';
import { showToast } from './state.js';
import { addPin } from './speech.js';

let filterClassification = 'TODOS';
let filterType           = 'TODOS';
let filterTopic          = 'TODOS';
let filterQuery          = '';

const TYPE_LABELS = {
  dpo:       'DPO',
  mocao:     'Moção',
  fala:      'Fala 1 min',
  pos:       'Posicionamento',
  resolucao: 'Resolução',
  ata:       'Ata',
};

const CLASS_LABELS = {
  topsecret: 'СОВЕРШЕННО СЕКРЕТНО',
  secret:    'СЕКРЕТНО',
  restricted:'ДСП',
  unclass:   'НЕСЕКРЕТНО',
};

export function initDocuments() {
  bindFilters();
  refreshTopicSelect();
  refresh();
}

/* ============================================================
   FILTROS
   ============================================================ */
function bindFilters() {
  const cls = document.getElementById('docFilterClassification');
  const typ = document.getElementById('docFilterType');
  const top = document.getElementById('docFilterTopic');
  const q   = document.getElementById('docSearch');
  const rst = document.getElementById('docFilterReset');

  cls?.addEventListener('change', () => { filterClassification = cls.value || 'TODOS'; refresh(); });
  typ?.addEventListener('change', () => { filterType = typ.value || 'TODOS'; refresh(); });
  top?.addEventListener('change', () => { filterTopic = top.value || 'TODOS'; refresh(); });
  q  ?.addEventListener('input',  () => { filterQuery = q.value || ''; refresh(); });
  rst?.addEventListener('click',  () => {
    filterClassification = 'TODOS';
    filterType = 'TODOS';
    filterTopic = 'TODOS';
    filterQuery = '';
    if (cls) cls.value = 'TODOS';
    if (typ) typ.value = 'TODOS';
    if (top) top.value = 'TODOS';
    if (q)   q.value = '';
    refresh();
  });
}

function refreshTopicSelect() {
  const top = document.getElementById('docFilterTopic');
  if (!top) return;
  const topics = Array.from(new Set(DOCS.map((d) => d.topic).filter(Boolean))).sort();
  top.innerHTML = '<option value="TODOS">Todos</option>' +
    topics.map((t) => `<option value="${t}">${t}</option>`).join('');
}

/* ============================================================
   FILTRO + RENDER
   ============================================================ */
function getFiltered() {
  const q = (filterQuery || '').toLowerCase();
  return DOCS.filter((d) => {
    if (filterClassification !== 'TODOS' && d.classification !== filterClassification) return false;
    if (filterType !== 'TODOS' && d.type !== filterType) return false;
    if (filterTopic !== 'TODOS' && d.topic !== filterTopic) return false;
    if (q) {
      const haystack = (d.title + ' ' + d.tags.join(' ') + ' ' + d.author + ' ' + stripTags(d.body || '')).toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

function refresh() {
  const grid = document.getElementById('docsGrid');
  const counter = document.getElementById('docsCount');
  if (!grid) return;
  const filtered = getFiltered();
  if (counter) counter.textContent = `${filtered.length} / ${DOCS.length}`;
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center py-8 text-[var(--text-tertiary)] font-mono">// Nenhum documento corresponde ao filtro.</div>';
    return;
  }
  grid.innerHTML = filtered.map((d, i) => renderCard(d, i)).join('');
  if (window.lucide) lucide.createIcons();
  grid.querySelectorAll('[data-doc]').forEach((b) => {
    b.addEventListener('click', () => openDocument(b.getAttribute('data-doc')));
  });
}

function renderCard(d, i) {
  const stamp = `sov-stamp--${d.classification || 'unclass'}`;
  const stampLabel = CLASS_LABELS[d.classification] || 'НЕСЕКРЕТНО';
  const typeLabel = TYPE_LABELS[d.type] || 'DOC';
  const preview = stripTags(d.body || '').slice(0, 140);
  return `
    <article class="tac-card glass-tac border border-[var(--line-default)] rounded p-4 fade-up hover:border-[var(--crimson-bright)] transition-colors cursor-pointer" data-doc="${d.id}" style="animation-delay:${Math.min(i*0.03,0.3)}s">
      <header class="flex items-start justify-between gap-2 mb-2">
        <div class="flex items-center gap-1.5">
          <span class="badge badge-blue text-[.6rem]">${typeLabel}</span>
          ${d.topic !== 'TODOS' ? `<span class="badge badge-slate text-[.6rem]">${d.topic}</span>` : ''}
        </div>
        <span class="sov-stamp ${stamp}" style="font-size:.5rem; padding:.15rem .4rem">${stampLabel}</span>
      </header>
      <h3 class="font-display text-white text-[.92rem] leading-snug mt-2 line-clamp-2">${d.title}</h3>
      <p class="text-[var(--text-secondary)] text-[.72rem] mt-2 leading-relaxed line-clamp-2 font-tact">${preview}</p>
      <div class="flex flex-wrap gap-1 mt-3">
        ${(d.tags || []).slice(0, 3).map((t) => `<span class="badge badge-slate text-[.55rem]">${t}</span>`).join('')}
      </div>
      <footer class="flex items-center justify-between mt-3 pt-3 border-t border-[var(--line-default)] text-[.62rem] font-mono text-[var(--text-tertiary)]">
        <span>${d.date} · ${d.author.replace('Delegação Soberana · ', '')}</span>
        <i data-lucide="arrow-right" class="w-3 h-3"></i>
      </footer>
    </article>`;
}

/* ============================================================
   MODAL DE LEITURA
   ============================================================ */
function openDocument(id) {
  const d = DOCS.find((x) => x.id === id);
  if (!d) return;
  const stamp = `sov-stamp--${d.classification || 'unclass'}`;
  const stampLabel = CLASS_LABELS[d.classification] || 'НЕСЕКРЕТНО';
  const typeLabel = TYPE_LABELS[d.type] || 'DOC';

  /* Replace [[cite:id]] markers in body */
  const body = (d.body || '').replace(/\[\[cite:([\w-]+)\]\]/g, (_, citeId) =>
    `<a href="#" class="cite-link" data-cite="${citeId}">[[cit:${citeId}]]</a>`);

  const html = `
    <div class="space-y-4 max-h-[78vh] overflow-y-auto pr-2">
      <div class="sov-header">
        <span class="sov-header__serial">▲ КРЕМЛЬ-${d.id.toUpperCase().slice(0,8)} / ${d.date}</span>
        <span class="sov-header__label">${typeLabel} · ${d.topic}</span>
        <span class="sov-stamp ${stamp} ml-auto" style="font-size:.55rem">${stampLabel}</span>
      </div>
      <div>
        <h2 class="font-display text-xl text-white">${d.title}</h2>
        <div class="text-[var(--text-tertiary)] text-xs mt-1 font-mono">${d.author} · ${d.date}</div>
      </div>
      <article class="prose-sov tac-card glass-tac p-5 rounded border-l-[3px] border-l-[var(--crimson-bright)]">
        ${body}
      </article>
      ${d.citations?.length ? `
        <div class="tac-card glass-tac p-4 rounded">
          <div class="classified text-[var(--text-tertiary)] mb-2">Citações Vinculadas (${d.citations.length})</div>
          <div class="flex flex-wrap gap-1.5">
            ${d.citations.map((c) => `<span class="badge badge-blue text-[.6rem] font-mono">[[cit:${c}]]</span>`).join('')}
          </div>
        </div>` : ''}
      ${d.speech ? `
        <div class="tac-card glass-tac p-4 rounded border-l-[3px] border-l-[var(--accent-gold)]">
          <div class="classified text-[var(--accent-gold-soft)] mb-2">Fala-Modelo (60s)</div>
          <div class="sov-terminal" style="border-left-color:var(--gold);margin:0"><span class="sov-terminal-prompt">$</span>${escapeHtml(d.speech)}<span class="sov-terminal-cursor"></span></div>
        </div>` : ''}
      <div class="flex flex-wrap gap-2 justify-end pt-2">
        <button class="btn btn-ghost text-xs" data-close><i data-lucide="x" class="w-3 h-3"></i> Fechar</button>
        <button class="btn btn-ghost text-xs" data-copy><i data-lucide="copy" class="w-3 h-3"></i> Copiar Texto</button>
        <button class="btn btn-tac text-xs" data-pin><i data-lucide="bookmark" class="w-3 h-3"></i> Fixar no Painel</button>
      </div>
    </div>`;

  const modal = openModal(html);
  modal.querySelector('[data-close]').addEventListener('click', closeModal);
  modal.querySelector('[data-copy]').addEventListener('click', () => {
    navigator.clipboard.writeText(stripTags(d.body || ''))
      .then(() => showToast('Documento copiado'))
      .catch(() => showToast('Falha ao copiar'));
  });
  modal.querySelector('[data-pin]').addEventListener('click', () => {
    addPin({
      id: 'doc-' + d.id,
      type: typeLabel,
      title: d.title,
      body: d.speech || stripTags(d.body || '').slice(0, 280),
      source: `Documentos Soberanos · ${d.author}`,
    });
    showToast('Documento fixado no Painel');
  });
}

function openModal(html) {
  let modal = document.getElementById('docModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'docModal';
    modal.className = 'fixed inset-0 z-[200] flex items-center justify-center px-4 modal-overlay hidden';
    modal.innerHTML = `<div class="modal-card tac-card glass-tac border border-[var(--line-default)] rounded-lg p-5 sm:p-6 max-w-3xl w-full"></div>`;
    document.body.appendChild(modal);
  }
  modal.querySelector('.modal-card').innerHTML = html;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (window.lucide) lucide.createIcons();
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  return modal;
}

function closeModal() {
  const m = document.getElementById('docModal');
  if (!m) return;
  m.classList.add('hidden');
  m.classList.remove('flex');
}

/* ============================================================
   UTILITÁRIOS
   ============================================================ */
function stripTags(s) { return (s || '').replace(/<[^>]*>/g, ''); }
function escapeHtml(s) { return (s || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }