/* ============================================================
   arsenal.js — Arsenal de Ataque
   КРЕМЛЬ · v2.0
   ============================================================ */

import { DATA } from './data.js';
import { state, showToast } from './state.js';
import { addPin } from './speech.js';

export function initArsenal() {
  const filter = document.getElementById('arsenalFilter') || document.getElementById('arsenalSearch');
  const filters = document.getElementById('arsenalFilters');
  if (!filters) return;
  const targets = ['TODOS', ...new Set(DATA.attacks.map((a) => a.target.split('&')[0].trim()))];
  filters.innerHTML = targets.map((t) =>
    `<button class="chip ${state.arsenalFilter === t ? 'gold active' : ''}" data-tgt="${t}">${t}</button>`).join('');
  filters.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-tgt]');
    if (!chip) return;
    state.arsenalFilter = chip.getAttribute('data-tgt');
    filters.querySelectorAll('.chip').forEach((c) => c.classList.remove('gold', 'active'));
    chip.classList.add('gold', 'active');
    refresh();
  });
  if (filter) filter.addEventListener('input', refresh);
  refresh();
}

function refresh() {
  const grid = document.getElementById('arsenalGrid');
  if (!grid) return;
  const query = (document.getElementById('arsenalSearch')?.value || '').toLowerCase();
  const filtered = DATA.attacks.filter((a) => {
    const matchFilter = state.arsenalFilter === 'TODOS' || a.target.includes(state.arsenalFilter);
    const matchQuery = !query ||
      (a.target + ' ' + a.title + ' ' + a.hypocrisy + ' ' + a.traps.join(' '))
        .toLowerCase().includes(query);
    return matchFilter && matchQuery;
  });
  grid.innerHTML = filtered.map((a, i) => `
    <article class="tac-card glass-tac border border-[var(--line-default)] card-blue rounded fade-up" style="animation-delay:${Math.min(i*0.04,0.4)}s">
      <header class="tac-header flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xl">${a.target}</span>
          <h3 class="font-display text-white text-base">${a.title}</h3>
        </div>
        <span class="font-mono text-[.65rem] text-[var(--text-tertiary)]">A-${String(i+1).padStart(2,'0')}</span>
      </header>
      <div class="p-5 space-y-4">
        <div class="tac-card glass-tac p-3 border-l-[3px] border-l-[var(--accent-red)] rounded">
          <div class="classified text-[var(--accent-red-soft)] mb-1.5">Hipocrisia Sistêmica</div>
          <p class="text-[var(--text-secondary)] text-sm leading-relaxed">${a.hypocrisy}</p>
        </div>
        <div>
          <div class="classified text-[var(--text-tertiary)] mb-2">Armadilhas Retóricas</div>
          <ul class="space-y-1.5">
            ${a.traps.map((t) => `<li class="text-[var(--accent-gold-soft)] text-xs font-mono">▶ ${t}</li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="classified text-[var(--text-tertiary)] mb-2">Resoluções Citáveis</div>
          <div class="flex flex-wrap gap-1.5">
            ${a.resolutions.map((r) => `<span class="badge badge-blue">${r}</span>`).join('')}
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5">
          ${a.tags.map((t) => `<span class="badge badge-slate">${t}</span>`).join('')}
        </div>
        <div class="flex items-center justify-end pt-3 border-t border-[var(--line-default)]">
          <button class="btn btn-ghost text-[.7rem]" data-attack="${a.id}">
            <i data-lucide="bookmark" class="w-3 h-3"></i> Fixar
          </button>
        </div>
      </div>
    </article>`).join('');
  if (window.lucide) lucide.createIcons();
  grid.querySelectorAll('[data-attack]').forEach((b) => {
    b.addEventListener('click', () => {
      const a = DATA.attacks.find((x) => x.id === b.getAttribute('data-attack'));
      if (!a) return;
      const text = `[${a.target} — ${a.title}]\n\nHipocrisia: ${a.hypocrisy}\n\nArmadilhas:\n${a.traps.map((t)=>'• '+t).join('\n')}`;
      addPin({ id: 'atk-' + a.id, type: 'ataque', title: `${a.target} — ${a.title}`, body: text, source: `Arsenal de Ataque` });
      showToast('Ataque fixado no Painel');
    });
  });
}