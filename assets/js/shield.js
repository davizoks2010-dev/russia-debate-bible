/* ============================================================
   shield.js — Escudo Defensivo
   КРЕМЛЬ · v2.0
   ============================================================ */

import { DATA } from './data.js';
import { state, showToast } from './state.js';
import { addPin } from './speech.js';

export function initShield() {
  const filters = document.getElementById('shieldFilters');
  if (!filters) return;
  const cats = ['TODOS', ...new Set(DATA.defenses.map((d) => d.category))];
  filters.innerHTML = cats.map((c) =>
    `<button class="chip ${state.shieldFilter === c ? 'gold active' : ''}" data-cat="${c}">${c}</button>`).join('');
  filters.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-cat]');
    if (!chip) return;
    state.shieldFilter = chip.getAttribute('data-cat');
    filters.querySelectorAll('.chip').forEach((c) => c.classList.remove('gold', 'active'));
    chip.classList.add('gold', 'active');
    refresh();
  });
  const search = document.getElementById('shieldSearch');
  if (search) search.addEventListener('input', refresh);
  refresh();
}

function refresh() {
  const grid = document.getElementById('shieldGrid');
  if (!grid) return;
  const query = (document.getElementById('shieldSearch')?.value || '').toLowerCase();
  const filtered = DATA.defenses.filter((d) => {
    const matchFilter = state.shieldFilter === 'TODOS' || d.category === state.shieldFilter;
    const matchQuery = !query ||
      (d.title + ' ' + d.charge + ' ' + d.basis + ' ' + d.pivot)
        .toLowerCase().includes(query);
    return matchFilter && matchQuery;
  });
  grid.innerHTML = filtered.map((d, i) => `
    <article class="tac-card glass-tac border border-[var(--line-default)] card-gold rounded fade-up" style="animation-delay:${Math.min(i*0.04,0.4)}s">
      <header class="tac-header flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="badge badge-red">${d.category}</span>
          <span class="badge badge-slate">${(d.voice || 'procedimental').toUpperCase()}</span>
        </div>
        <span class="font-mono text-[.65rem] text-[var(--text-tertiary)]">D-${String(i+1).padStart(2,'0')}</span>
      </header>
      <div class="p-5 space-y-4">
        <div>
          <div class="classified text-[var(--text-tertiary)] mb-1">Linha Defensiva</div>
          <h3 class="font-display text-white text-base">${d.title}</h3>
        </div>
        <div class="tac-card glass-tac p-3 border-l-[3px] border-l-[var(--accent-red)] rounded">
          <div class="classified text-[var(--accent-red-soft)] mb-1.5">Acusação</div>
          <p class="text-[var(--text-primary)] text-sm font-medium">${d.charge}</p>
        </div>
        <div class="tac-card glass-tac p-3 border-l-[3px] border-l-[var(--text-tertiary)] rounded">
          <div class="classified text-[var(--text-tertiary)] mb-1.5">Base Legal</div>
          <p class="text-[var(--text-secondary)] text-sm leading-relaxed font-mono">${d.basis}</p>
        </div>
        <div class="tac-card glass-tac p-3 border-l-[3px] border-l-[var(--accent-gold)] rounded">
          <div class="classified text-[var(--accent-gold-soft)] mb-1.5">Pivot Tático</div>
          <p class="text-[var(--accent-gold-bright)] text-sm italic leading-relaxed">${d.pivot}</p>
        </div>
        <div class="flex flex-wrap gap-1.5">
          ${d.tags.map((t) => `<span class="badge badge-slate">${t}</span>`).join('')}
        </div>
        <div class="flex items-center justify-end pt-3 border-t border-[var(--line-default)]">
          <button class="btn btn-ghost text-[.7rem]" data-shield="${d.id}">
            <i data-lucide="bookmark" class="w-3 h-3"></i> Fixar
          </button>
        </div>
      </div>
    </article>`).join('');
  if (window.lucide) lucide.createIcons();
  grid.querySelectorAll('[data-shield]').forEach((b) => {
    b.addEventListener('click', () => {
      const d = DATA.defenses.find((x) => x.id === b.getAttribute('data-shield'));
      if (!d) return;
      const text = `[${d.category} — ${d.title}]\n\nAcusação: ${d.charge}\n\nBase: ${d.basis}\n\nPivot: ${d.pivot}`;
      addPin({ id: 'shd-' + d.id, type: 'escudo', title: `${d.category} — ${d.title}`, body: text, source: 'Escudo Defensivo' });
      showToast('Defesa fixada no Painel');
    });
  });
}