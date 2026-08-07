/* ============================================================
   intel.js — Central de Inteligência (render dossiês + busca/filtro)
   КРЕМЛЬ · v2.0
   ============================================================ */

import { DATA, REGIONS, QUICK_TAGS } from './data.js';
import { showToast } from './state.js';

let intelFilter = 'TODOS';
let intelQuery  = '';

export function renderIntelQuickTags() {
  const wrap = document.getElementById('quickTags');
  if (!wrap) return;
  wrap.innerHTML = QUICK_TAGS.slice(0, 16).map((t) =>
    `<button class="chip" data-tag="${t}">${t}</button>`).join('');
  wrap.addEventListener('click', (e) => {
    const tag = e.target.closest('[data-tag]');
    if (!tag) return;
    document.getElementById('intelSearch').value = tag.getAttribute('data-tag');
    refresh();
  });
}

export function bindIntel() {
  const search = document.getElementById('intelSearch');
  const filter = document.getElementById('intelFilter');
  if (search) search.addEventListener('input', () => { intelQuery = search.value; refresh(); });
  if (filter) filter.addEventListener('input', () => { intelFilter = filter.value || 'TODOS'; refresh(); });
}

function refresh() {
  const list = document.getElementById('intelResults');
  const empty = document.getElementById('intelEmpty');
  if (!list) return;
  const q = (intelQuery || '').toLowerCase();
  const filtered = DATA.conflicts.filter((c) => {
    const matchQuery = !q ||
      (c.title + ' ' + c.tags.join(' ') + ' ' + c.position + ' ' + (c.speech||''))
        .toLowerCase().includes(q);
    const matchFilter = intelFilter === 'TODOS' || c.region === intelFilter;
    return matchQuery && matchFilter;
  });
  if (filtered.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    empty.innerHTML = '<div class="text-center py-8 text-[var(--text-tertiary)]">Nenhum dossiê corresponde ao filtro.</div>';
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = filtered.map((c, i) => `
    <article class="tac-card glass-tac border border-[var(--line-default)] rounded fade-up" data-idx="${i}" style="animation-delay:${Math.min(i*0.04,0.4)}s">
      <header class="tac-header flex items-start justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="badge badge-blue">${c.region}</span>
            <span class="font-mono text-[.65rem] text-[var(--text-tertiary)]">D-${String(i+1).padStart(2,'0')}</span>
          </div>
          <h3 class="font-display text-lg text-white mt-2">${c.country} ${c.title}</h3>
        </div>
      </header>
      <div class="p-4 sm:p-5">
        <p class="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3">${c.position}</p>
        <div class="cls-ribbon my-4"></div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div class="text-[var(--text-tertiary)] uppercase tracking-widest text-[.6rem] mb-1">Cronologia</div>
            <div class="text-[var(--text-secondary)] line-clamp-2">${c.cronology[0]}</div>
          </div>
          <div>
            <div class="text-[var(--text-tertiary)] uppercase tracking-widest text-[.6rem] mb-1">Base Legal</div>
            <div class="text-[var(--text-secondary)] line-clamp-2">${c.legal[0]}</div>
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5 mt-4">
          ${c.tags.slice(0,4).map((t) => `<span class="badge badge-slate">${t}</span>`).join('')}
        </div>
        <div class="flex items-center justify-between mt-4 pt-3 border-t border-[var(--line-default)]">
          <span class="text-[var(--text-tertiary)] text-[.65rem] font-mono">${c.defenses.length} DEFESAS · ${c.attacks.length} ATAQUES</span>
          <button class="btn btn-ghost text-[.7rem]" data-topic="${c.id}">
            <i data-lucide="open" class="w-3 h-3"></i> Abrir Dossiê
          </button>
        </div>
      </div>
    </article>
  `).join('');
  if (window.lucide) lucide.createIcons();
  list.querySelectorAll('[data-topic]').forEach((b) => {
    b.addEventListener('click', () => openDossier(b.getAttribute('data-topic')));
  });
}

export function openDossier(id) {
  const c = DATA.conflicts.find((x) => x.id === id);
  if (!c) return;
  const def = c.defenses.map((d) => `
    <div class="tac-card glass-tac p-4 rounded border-l-[3px] border-l-[var(--accent-blue)]">
      <div class="font-mono text-[.65rem] text-[var(--accent-red-soft)] uppercase tracking-widest">${d.charge}</div>
      <div class="text-[var(--text-secondary)] text-xs mt-1.5">${d.basis}</div>
      <div class="font-mono text-[var(--accent-gold-bright)] text-xs mt-2 italic">→ ${d.pivot}</div>
    </div>`).join('');

  const html = `
    <div class="space-y-5 max-h-[75vh] overflow-y-auto pr-2">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="badge badge-blue">${c.region}</span>
          <span class="font-mono text-[.65rem] text-[var(--text-tertiary)]">D-${c.id.toUpperCase()}</span>
        </div>
        <h3 class="font-display text-xl text-white">${c.country} ${c.title}</h3>
      </div>
      <div class="tac-card glass-tac p-4 rounded">
        <div class="classified text-[var(--text-tertiary)] mb-2">Posição Soberana</div>
        <p class="text-[var(--text-secondary)] text-sm leading-relaxed">${c.position}</p>
      </div>
      <div class="tac-card glass-tac p-4 rounded">
        <div class="classified text-[var(--text-tertiary)] mb-2">Cronologia</div>
        <ul class="space-y-1.5 text-[var(--text-secondary)] text-sm font-mono">
          ${c.cronology.map((line) => `<li class="leading-relaxed">▸ ${line}</li>`).join('')}
        </ul>
      </div>
      <div class="tac-card glass-tac p-4 rounded">
        <div class="classified text-[var(--text-tertiary)] mb-2">Estatísticas</div>
        <p class="text-[var(--text-secondary)] text-sm leading-relaxed">${c.stats}</p>
      </div>
      <div class="tac-card glass-tac p-4 rounded">
        <div class="classified text-[var(--text-tertiary)] mb-2">Base Legal</div>
        <ul class="space-y-1.5 text-[var(--accent-gold-soft)] text-xs font-mono">
          ${c.legal.map((l) => `<li>◆ ${l}</li>`).join('')}
        </ul>
      </div>
      <div>
        <div class="classified text-[var(--text-tertiary)] mb-3">${c.defenses.length} Linhas Defensivas — Por País</div>
        <div class="space-y-3">${def}</div>
      </div>
      <div class="tac-card glass-tac p-4 rounded border-l-[3px] border-l-[var(--accent-gold)]">
        <div class="classified text-[var(--accent-gold-soft)] mb-2">Discurso Modelo (60s)</div>
        <p class="text-[var(--text-primary)] text-sm font-tact leading-relaxed italic">"${c.speech}"</p>
      </div>
      <div class="flex flex-wrap gap-2 justify-end">
        <button class="btn btn-ghost text-xs" data-close><i data-lucide="x" class="w-3 h-3"></i> Fechar</button>
        <button class="btn btn-tac text-xs" data-pin><i data-lucide="bookmark" class="w-3 h-3"></i> Fixar Discurso</button>
      </div>
    </div>`;

  const modal = openModal(html);
  modal.querySelector('[data-close]').addEventListener('click', closeModal);
  modal.querySelector('[data-pin]').addEventListener('click', () => {
    import('./speech.js').then(({ addPin }) => {
      addPin({
        id: 'dossier-' + c.id,
        type: 'dossiê',
        title: `${c.country} ${c.title}`,
        body: c.speech,
        source: `Central de Inteligência · ${c.region}`,
      });
      showToast('Discurso fixado');
    });
  });
}

function openModal(html) {
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
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  return modal;
}

function closeModal() {
  const m = document.getElementById('genericModal');
  if (!m) return;
  m.classList.add('hidden');
  m.classList.remove('flex');
}

export function initIntel() {
  renderIntelQuickTags();
  bindIntel();
  refresh();
}