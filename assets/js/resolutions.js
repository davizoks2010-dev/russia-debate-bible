/* ============================================================
   resolutions.js — Módulo "Resolução" (3 propostas soberanas)
   КРЕМЛЬ · v3.0 · SOCHUM/CIMED 2026
   ============================================================ */

import { RESOLUTIONS } from './resolutions-data.js';
import { showToast } from './state.js';
import { addPin } from './speech.js';

let activeResId = RESOLUTIONS[0].id;

/* ============================================================
   INIT
   ============================================================ */
export function initResolutions() {
  renderTabs();
  renderPanels();
  if (window.lucide) lucide.createIcons();
  bindResActions();
  bindResModalClose();
}

/* ============================================================
   RENDER — TABS (estilo Microsoft Word)
   ============================================================ */
function renderTabs() {
  const rail = document.getElementById('resTabsRail');
  if (!rail) return;
  rail.innerHTML = RESOLUTIONS.map((r) => `
    <button type="button"
            class="res-tab${r.id === activeResId ? ' active' : ''}"
            data-res="${r.id}"
            role="tab"
            aria-selected="${r.id === activeResId}"
            aria-controls="resPanel-${r.id}">
      <span class="res-tab__roman">${r.tab}</span>
      <i data-lucide="${r.icon}" class="w-3.5 h-3.5"></i>
      <span class="res-tab__label">${r.shortLabel}</span>
      <span class="res-tab__position">${r.position}</span>
    </button>
  `).join('');
}

function renderPanels() {
  const wrap = document.getElementById('resPanels');
  if (!wrap) return;
  wrap.innerHTML = RESOLUTIONS.map((r) => `
    <article id="resPanel-${r.id}"
             class="res-panel${r.id === activeResId ? '' : ' hidden'}"
             role="tabpanel"
             aria-labelledby="resTab-${r.id}">
      ${renderResHeader(r)}
      ${renderResActions(r)}
      ${renderResBody(r)}
    </article>
  `).join('');
}

function renderResHeader(r) {
  return `
    <div class="tac-card glass-tac border border-[var(--line-default)] rounded p-4 sm:p-5 mb-3">
      <div class="flex items-start justify-between gap-3 flex-wrap mb-2">
        <span class="font-mono text-[var(--gold-soft)] text-[.68rem] tracking-widest">${r.number}</span>
        <span class="badge badge-red">POSIÇÃO RU · ${r.position}</span>
      </div>
      <h3 class="font-display text-lg sm:text-xl text-white leading-snug">${r.title}</h3>
    </div>
  `;
}

function renderResActions(r) {
  return `
    <div class="flex flex-wrap gap-2 mb-4">
      <button type="button" class="btn btn-tac text-xs" data-pin="${r.id}">
        <i data-lucide="bookmark" class="w-3.5 h-3.5"></i> Fixar no Painel
      </button>
      <button type="button" class="btn btn-ghost text-xs" data-copy="${r.id}">
        <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar Texto
      </button>
      <button type="button" class="btn btn-ghost text-xs" data-modal="${r.id}">
        <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i> Abrir em Modal
      </button>
    </div>
  `;
}

function renderResBody(r) {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="space-y-3">
        <section class="tac-card glass-tac border border-[var(--line-default)] border-l-[3px] border-l-[var(--gold)] rounded p-4">
          <div class="classified text-[var(--gold-soft)] mb-2">Preâmbulo</div>
          <ol class="space-y-1.5 list-decimal list-inside text-[var(--text-secondary)] text-[.85rem] leading-relaxed">
            ${r.preambulo.map((p) => `<li>${p}</li>`).join('')}
          </ol>
        </section>
        <section class="tac-card glass-tac border border-[var(--line-default)] border-l-[3px] border-l-[var(--crimson-bright)] rounded p-4">
          <div class="classified text-[var(--crimson-bright)] mb-2">Cláusulas Operativas</div>
          <ol class="space-y-2 list-decimal list-inside text-[var(--text-secondary)] text-[.85rem] leading-relaxed">
            ${r.clauses.map((c) => `<li><span class="text-white">${c.text}</span></li>`).join('')}
          </ol>
        </section>
      </div>

      <div class="space-y-3">
        <section class="tac-card glass-tac border border-[var(--line-default)] border-l-[3px] border-l-[var(--crimson-bright)] rounded p-4">
          <div class="classified text-[var(--crimson-bright)] mb-2">Ataques Prováveis de Outras Federações</div>
          <div class="space-y-2">
            ${r.attacks.map((a) => `
              <div class="res-attack-card">
                <div class="font-mono text-[.62rem] text-[var(--crimson-bright)] tracking-widest">${a.agent}</div>
                <div class="text-white text-[.85rem] font-medium mt-1">${a.charge}</div>
                <div class="text-[var(--text-secondary)] text-[.75rem] mt-1.5 italic">
                  <i data-lucide="zap" class="w-3 h-3 inline text-[var(--gold-soft)]"></i> Armadilha retórica: <span class="text-[var(--gold-soft)]">${a.trap}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="tac-card glass-tac border border-[var(--line-default)] border-l-[3px] border-l-[var(--gold)] rounded p-4">
          <div class="classified text-[var(--gold-soft)] mb-2">Defesas &amp; Contra-argumentos Soberanos</div>
          <div class="space-y-2">
            ${r.defenses.map((d) => `
              <div class="res-defense-card">
                <div class="flex items-center gap-2 mb-1">
                  <span class="badge badge-gold text-[.55rem]">${d.key}</span>
                </div>
                <div class="text-[var(--text-secondary)] text-[.85rem] leading-relaxed">${d.text}</div>
                <div class="text-[var(--text-tertiary)] text-[.72rem] mt-1.5 italic">
                  <i data-lucide="arrow-right-circle" class="w-3 h-3 inline text-[var(--crimson-bright)]"></i> Pivot tático: <span class="text-white">${d.pivot}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="tac-card glass-tac border border-[var(--line-default)] border-l-[3px] border-l-[var(--gold-soft)] rounded p-4">
          <div class="classified text-[var(--gold-soft)] mb-2">Base Jurídica &amp; Citações</div>
          <div class="space-y-1">
            ${r.citations.map((c) => `
              <div class="res-citation-card flex items-start gap-2">
                <i data-lucide="book-marked" class="w-3.5 h-3.5 text-[var(--gold-soft)] mt-0.5 shrink-0"></i>
                <div>
                  <span class="font-mono text-[var(--gold-bright)] text-[.74rem]">${c.code}</span>
                  <span class="text-[var(--text-secondary)] text-[.78rem] ml-1.5">— ${c.desc}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}

/* ============================================================
   BIND — abas + ações (delegação no documento)
   ============================================================ */
function bindResActions() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-res]');
    if (tab) { activateRes(tab.getAttribute('data-res')); return; }

    const pin   = e.target.closest('[data-pin]');
    if (pin)   { pinRes(pin.getAttribute('data-pin')); return; }

    const copy  = e.target.closest('[data-copy]');
    if (copy)  { copyRes(copy.getAttribute('data-copy')); return; }

    const modal = e.target.closest('[data-modal]');
    if (modal) { openResModal(modal.getAttribute('data-modal')); return; }
  });
}

/* ============================================================
   ACTIVATE — troca de aba
   ============================================================ */
function activateRes(id) {
  if (!RESOLUTIONS.some((r) => r.id === id)) return;
  activeResId = id;

  document.querySelectorAll('.res-tab').forEach((t) => {
    const isActive = t.getAttribute('data-res') === id;
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  document.querySelectorAll('.res-panel').forEach((p) => {
    p.classList.toggle('hidden', p.id !== `resPanel-${id}`);
  });
}

/* ============================================================
   AÇÕES — Pin / Copy
   ============================================================ */
export function pinRes(id) {
  const r = RESOLUTIONS.find((x) => x.id === id);
  if (!r) return;
  const body =
    `RESOLUÇÃO ${r.tab} — ${r.title}\n\n` +
    `PREÂMBULO:\n${r.preambulo.join(' ')}\n\n` +
    `CLÁUSULAS OPERATIVAS:\n${r.clauses.map((c) => `${c.num}. ${c.text}`).join('\n')}`;
  addPin({
    id: 'res-' + r.id,
    type: 'Resolução',
    title: r.title,
    body,
    source: `${r.number} · Posição RU: ${r.position}`,
  });
  /* addPin já dispara showToast internamente — evitamos duplicidade */
}

function copyRes(id) {
  const r = RESOLUTIONS.find((x) => x.id === id);
  if (!r) return;
  const body =
    `RESOLUÇÃO ${r.tab} — ${r.title}\n\n` +
    `PREÂMBULO:\n${r.preambulo.join(' ')}\n\n` +
    `CLÁUSULAS OPERATIVAS:\n${r.clauses.map((c) => `${c.num}. ${c.text}`).join('\n')}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(body)
      .then(() => showToast('Resolução copiada'))
      .catch(() => fallbackCopy(body));
  } else {
    fallbackCopy(body);
  }
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('Resolução copiada');
  } catch (e) {
    showToast('Falha ao copiar');
  }
}

/* ============================================================
   MODAL — leitura em tela cheia
   ============================================================ */
export function openResModal(id) {
  const r = RESOLUTIONS.find((x) => x.id === id);
  if (!r) return;

  const html = `
    <div class="space-y-4 max-h-[78vh] overflow-y-auto pr-2">
      <div class="sov-header">
        <span class="sov-header__serial">▲ КРЕМЛЬ-${r.number}</span>
        <span class="sov-header__label">RESOLUÇÃO ${r.tab} · POSIÇÃO RU: ${r.position}</span>
        <span class="sov-stamp sov-stamp--topsecret ml-auto" style="font-size:.55rem">СОВЕРШЕННО СЕКРЕТНО</span>
      </div>
      <h2 class="font-display text-lg sm:text-xl text-white">${r.title}</h2>

      <article class="prose-sov tac-card glass-tac p-5 rounded border-l-[3px] border-l-[var(--gold)]">
        <div class="classified text-[var(--gold-soft)] mb-2">Preâmbulo</div>
        <ol class="space-y-1.5 list-decimal list-inside text-[var(--text-secondary)] text-[.85rem] leading-relaxed">
          ${r.preambulo.map((p) => `<li>${p}</li>`).join('')}
        </ol>
        <div class="cls-ribbon my-4"></div>
        <div class="classified text-[var(--crimson-bright)] mb-2">Cláusulas Operativas</div>
        <ol class="space-y-2 list-decimal list-inside text-[var(--text-secondary)] text-[.85rem] leading-relaxed">
          ${r.clauses.map((c) => `<li><span class="text-white">${c.text}</span></li>`).join('')}
        </ol>
      </article>

      <div class="tac-card glass-tac p-4 rounded">
        <div class="classified text-[var(--crimson-bright)] mb-2">Ataques Prováveis</div>
        ${r.attacks.map((a) => `
          <div class="mb-3 text-[.85rem]">
            <span class="font-mono text-[.62rem] text-[var(--crimson-bright)] tracking-widest">${a.agent}</span>
            <div class="text-white mt-0.5">${a.charge}</div>
            <div class="text-[var(--text-secondary)] text-[.75rem] italic mt-0.5">Armadilha: ${a.trap}</div>
          </div>
        `).join('')}
      </div>

      <div class="tac-card glass-tac p-4 rounded">
        <div class="classified text-[var(--gold-soft)] mb-2">Defesas Soberanas</div>
        ${r.defenses.map((d) => `
          <div class="mb-3 text-[.85rem]">
            <span class="badge badge-gold text-[.55rem]">${d.key}</span>
            <div class="text-[var(--text-secondary)] mt-1">${d.text}</div>
            <div class="text-[var(--text-tertiary)] text-[.72rem] italic mt-1">Pivot: ${d.pivot}</div>
          </div>
        `).join('')}
      </div>

      <div class="tac-card glass-tac p-4 rounded">
        <div class="classified text-[var(--gold-soft)] mb-2">Base Jurídica</div>
        ${r.citations.map((c) => `
          <div class="text-[.78rem] flex gap-2 mb-1">
            <span class="font-mono text-[var(--gold-bright)]">${c.code}</span>
            <span class="text-[var(--text-secondary)]">— ${c.desc}</span>
          </div>
        `).join('')}
      </div>

      <div class="flex flex-wrap gap-2 justify-end pt-2">
        <button type="button" class="btn btn-ghost text-xs" data-res-close>
          <i data-lucide="x" class="w-3 h-3"></i> Fechar
        </button>
        <button type="button" class="btn btn-ghost text-xs" data-res-copy>
          <i data-lucide="copy" class="w-3 h-3"></i> Copiar
        </button>
        <button type="button" class="btn btn-tac text-xs" data-res-pin>
          <i data-lucide="bookmark" class="w-3 h-3"></i> Fixar no Painel
        </button>
      </div>
    </div>`;

  const modal = ensureResModal();
  modal.querySelector('.modal-card').innerHTML = html;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (window.lucide) lucide.createIcons();

  /* Handlers do modal */
  modal.querySelector('[data-res-close]').addEventListener('click', closeResModal);
  modal.querySelector('[data-res-copy]').addEventListener('click',  () => copyRes(id));
  modal.querySelector('[data-res-pin]').addEventListener('click',   () => pinRes(id));
}

function ensureResModal() {
  let modal = document.getElementById('resModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'resModal';
  modal.className = 'fixed inset-0 z-[200] hidden items-center justify-center px-4 modal-overlay';
  modal.innerHTML = `<div class="modal-card tac-card glass-tac border border-[var(--line-default)] rounded-lg p-5 sm:p-6 max-w-3xl w-full" role="dialog" aria-modal="true"></div>`;
  document.body.appendChild(modal);

  /* Clique fora do card fecha */
  modal.addEventListener('click', (e) => { if (e.target === modal) closeResModal(); });
  return modal;
}

function bindResModalClose() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResModal();
  });
}

function closeResModal() {
  const m = document.getElementById('resModal');
  if (!m) return;
  m.classList.add('hidden');
  m.classList.remove('flex');
}
