/* ============================================================
   doctrine.js — Painel de Doutrina + Citações no War Room
   КРЕМЛЬ · Imperial Ritus v3.0
   Renderiza: cards de vetores estratégicos + citações atribuídas
   ============================================================ */

import { VECTORS, VECTOR_LIST, getVector } from './vectors.js';
import { CITATIONS, formatCite } from './citations.js';
import { addPin } from './speech.js';
import { showToast } from './state.js';

/* ============================================================
   VETORES — cards no War Room (id="warVectors")
   ============================================================ */

const VECTOR_ICONS = {
  gaza:'map-pin',
  sahel:'compass',
  dih:'heart',
  reforma_csnu:'globe-2',
  ciber:'cpu',
  multipolar:'network',
};

export function renderWarVectors() {
  const wrap = document.getElementById('warVectors');
  if (!wrap) return;
  wrap.innerHTML = VECTOR_LIST.map((v, i) => {
    const full = getVector(v.id);
    const foundation = full?.foundation?.[0] || v.summary;
    const speechesCount = full?.speeches?.length || 0;
    const legalCount = full?.legalBases?.length || 0;
    return `
    <article class="tac-card glass-tac p-4 fade-up" style="animation-delay:${Math.min(i * 0.05, 0.4)}s" data-vector="${v.id}">
      <div class="flex items-start gap-3">
        <i data-lucide="${VECTOR_ICONS[v.id] || 'bookmark'}" class="w-5 h-5 text-[var(--gold-soft)] mt-1 shrink-0"></i>
        <div class="min-w-0 flex-1">
          <div class="font-ceremonial text-[.65rem] uppercase tracking-widest text-[var(--gold-soft)]">${v.tags.slice(0, 2).join(' · ')}</div>
          <h4 class="font-display text-white text-sm mt-1 leading-tight">${v.title}</h4>
          <p class="text-[var(--text-secondary)] text-xs mt-2 leading-snug">${foundation}</p>
          <div class="flex flex-wrap gap-1.5 mt-2">
            <span class="badge badge-slate text-[.55rem]">${speechesCount} falas-modelo</span>
            <span class="badge badge-slate text-[.55rem]">${legalCount} bases legais</span>
          </div>
          <div class="flex gap-2 mt-3">
            <button class="btn btn-ghost text-[.65rem] !py-1" data-vector-detail="${v.id}"><i data-lucide="scroll-text" class="w-3 h-3"></i> Ver</button>
            <button class="btn btn-tac text-[.65rem] !py-1" data-vector-pin="${v.id}"><i data-lucide="bookmark" class="w-3 h-3"></i> Fixar</button>
          </div>
        </div>
      </div>
    </article>
  `;}).join('');
  if (window.lucide) lucide.createIcons();

  wrap.querySelectorAll('[data-vector-detail]').forEach((b) => {
    b.addEventListener('click', () => openVectorDetail(b.getAttribute('data-vector-detail')));
  });
  wrap.querySelectorAll('[data-vector-pin]').forEach((b) => {
    b.addEventListener('click', () => pinVector(b.getAttribute('data-vector-pin')));
  });
}

function openVectorDetail(id) {
  const v = getVector(id);
  if (!v) return;
  const html = `
    <div class="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
      <div>
        <div class="font-ceremonial text-[.65rem] uppercase tracking-widest text-[var(--gold-soft)]">Vetor Estratégico Soberano</div>
        <h3 class="font-ceremonial text-xl text-white mt-1">${v.title}</h3>
      </div>
      <div class="tac-card glass-tac p-4 rounded border-l-[3px] border-l-[var(--gold)]">
        <div class="classified text-[var(--gold-soft)] mb-2">Posição de Princípio</div>
        <p class="text-[var(--text-primary)] text-sm leading-relaxed font-display">${v.summary}</p>
      </div>
      <div>
        <div class="classified text-[var(--text-tertiary)] mb-2">Fundamento Doutrinário</div>
        ${v.foundation.map((p) => `<p class="text-[var(--text-secondary)] text-sm leading-relaxed mb-2.5">${p}</p>`).join('')}
      </div>
      <div>
        <div class="classified text-[var(--text-tertiary)] mb-2">Bases Jurídicas</div>
        <ul class="space-y-1">
          ${v.legalBases.map((l) => `<li class="text-[var(--text-secondary)] text-xs font-mono">◆ ${l}</li>`).join('')}
        </ul>
      </div>
      <div>
        <div class="classified text-[var(--text-tertiary)] mb-2">Falas-Modelo</div>
        ${v.speeches.map((s, i) => `
          <div class="tac-card glass-tac p-3 rounded mb-2 border-l-[3px] border-l-[var(--crimson)]">
            <div class="font-mono text-[.6rem] uppercase text-[var(--text-tertiary)] tracking-widest">Modelo ${i + 1}</div>
            <p class="text-[var(--text-primary)] text-sm italic leading-relaxed mt-1.5">"${s}"</p>
          </div>
        `).join('')}
      </div>
      <div class="flex flex-wrap gap-2 justify-end">
        <button class="btn btn-ghost text-xs" data-close><i data-lucide="x" class="w-3 h-3"></i> Fechar</button>
        <button class="btn btn-tac text-xs" data-pin-vector="${v.id}"><i data-lucide="bookmark" class="w-3 h-3"></i> Fixar Vetor</button>
      </div>
    </div>`;
  openModal(html, () => {
    const pin = document.querySelector('[data-pin-vector]');
    if (pin) pin.addEventListener('click', () => pinVector(v.id));
  });
}

function pinVector(id) {
  const v = getVector(id);
  if (!v) return;
  const speech = v.speeches[0];
  addPin({
    id: 'vector-' + id,
    type: 'doutrina',
    title: v.title,
    body: `${v.summary}\n\nFala-modelo:\n"${speech}"`,
    source: `Doutrina Vetorial · ${v.tags.join(' · ')}`,
  });
}

/* ============================================================
   CITAÇÕES — lista no War Room (id="warCitations")
   ============================================================ */

export function renderWarCitations() {
  const wrap = document.getElementById('warCitations');
  if (!wrap) return;
  wrap.classList.add('items-start');
  wrap.innerHTML = CITATIONS.map((c, i) => `
    <article class="tac-card glass-tac p-4 fade-up" style="animation-delay:${Math.min(i * 0.03, 0.45)}s">
      <div class="flex items-start gap-3">
        <i data-lucide="quote" class="w-4 h-4 text-[var(--gold-soft)] mt-1 shrink-0"></i>
        <div class="min-w-0 flex-1">
          <div class="font-ceremonial text-[.65rem] uppercase tracking-widest text-[var(--gold-soft)]">${c.author}</div>
          <div class="font-mono text-[.6rem] text-[var(--text-tertiary)] mt-0.5">${c.role} · ${c.year}</div>
          <p class="text-[var(--text-primary)] text-sm italic leading-relaxed mt-2">"${c.text}"</p>
          <div class="flex flex-wrap gap-1 mt-2">
            ${c.tags.map((t) => `<span class="badge badge-slate text-[.6rem]">${t}</span>`).join('')}
          </div>
          <div class="flex gap-2 mt-3">
            <button class="btn btn-ghost text-[.65rem] !py-1" data-citation-detail="${c.id}"><i data-lucide="scroll-text" class="w-3 h-3"></i> Ver</button>
            <button class="btn btn-tac text-[.65rem] !py-1" data-citation-pin="${c.id}"><i data-lucide="bookmark" class="w-3 h-3"></i> Fixar</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
  if (window.lucide) lucide.createIcons();

  wrap.querySelectorAll('[data-citation-detail]').forEach((b) => {
    b.addEventListener('click', () => openCitationDetail(b.getAttribute('data-citation-detail')));
  });
  wrap.querySelectorAll('[data-citation-pin]').forEach((b) => {
    b.addEventListener('click', () => pinCitation(b.getAttribute('data-citation-pin')));
  });
}

function openCitationDetail(id) {
  const c = CITATIONS.find((x) => x.id === id);
  if (!c) return;
  const html = `
    <div class="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
      <div>
        <div class="font-ceremonial text-[.65rem] uppercase tracking-widest text-[var(--gold-soft)]">${c.role}</div>
        <h3 class="font-ceremonial text-xl text-white mt-1">${c.author} · ${c.year}</h3>
      </div>
      <div class="tac-card glass-tac p-4 rounded border-l-[3px] border-l-[var(--gold)]">
        <p class="text-[var(--text-primary)] text-base leading-relaxed font-display italic">"${c.text}"</p>
      </div>
      <div class="tac-card glass-tac p-3 rounded border-l-[3px] border-l-[var(--text-tertiary)]">
        <div class="classified text-[var(--text-tertiary)] mb-1">Contexto</div>
        <p class="text-[var(--text-secondary)] text-sm leading-relaxed">${c.context}</p>
      </div>
      <div>
        <div class="classified text-[var(--text-tertiary)] mb-1.5">Etiquetas</div>
        <div class="flex flex-wrap gap-1.5">
          ${c.tags.map((t) => `<span class="badge badge-slate text-[.65rem]">${t}</span>`).join('')}
        </div>
      </div>
      <div class="flex flex-wrap gap-2 justify-end">
        <button class="btn btn-ghost text-xs" data-close><i data-lucide="x" class="w-3 h-3"></i> Fechar</button>
        <button class="btn btn-tac text-xs" data-pin-citation="${c.id}"><i data-lucide="bookmark" class="w-3 h-3"></i> Fixar no Painel</button>
      </div>
    </div>`;
  openModal(html, () => {
    const pin = document.querySelector('[data-pin-citation]');
    if (pin) pin.addEventListener('click', () => pinCitation(c.id));
  });
}

function pinCitation(id) {
  const c = CITATIONS.find((x) => x.id === id);
  if (!c) return;
  addPin({
    id: 'cite-' + c.id,
    type: 'citação',
    title: `${c.author} (${c.year})`,
    body: formatCite(c),
    source: `${c.role} · ${c.context}`,
  });
  showToast('Citação fixada no Painel');
}

/* ============================================================
   Modal genérico (reutilizado de intel.js para coerência)
   ============================================================ */

function openModal(html, onReady) {
  let modal = document.getElementById('genericModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'genericModal';
    modal.className = 'fixed inset-0 z-[200] flex items-center justify-center px-4 modal-overlay';
    modal.innerHTML = `<div class="modal-card tac-card glass-tac border border-[var(--line-default)] rounded-lg p-5 sm:p-6 max-w-2xl w-full"></div>`;
    document.body.appendChild(modal);
  }
  modal.querySelector('.modal-card').innerHTML = html;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (window.lucide) lucide.createIcons();
  const close = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  modal.querySelector('[data-close]')?.addEventListener('click', close);
  if (onReady) onReady();
}

export function initDoctrine() {
  renderWarVectors();
  renderWarCitations();
}
