/* ============================================================
   pautas.js — Módulo "Pautas & Caminhos" (Módulo 09)
   КРЕМЛЬ · Imperial Ritus v3.0
   Renderiza 8 pautas com 2-3 caminhos táticos cada.
   Cada caminho tem botão "Fixar no Painel".
   ============================================================ */

import { PAUTAS } from './pautas-data.js';
import { addPin } from './speech.js';

/* ============================================================
   INIT
   ============================================================ */
export function initPautas() {
  renderPautas();
  bindPautasActions();
  if (window.lucide) lucide.createIcons();
}

/* ============================================================
   RENDER — grid de pautas com cards expansíveis
   ============================================================ */
function renderPautas() {
  const wrap = document.getElementById('pautasGrid');
  if (!wrap) return;
  wrap.innerHTML = PAUTAS.map((p, i) => renderPautaCard(p, i)).join('');
}

function renderPautaCard(p, i) {
  return `
    <article class="tac-card glass-tac border border-[var(--line-default)] rounded fade-up" style="animation-delay:${Math.min(i * 0.05, 0.4)}s">
      <header class="tac-header p-4 sm:p-5">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0 flex-1">
            <span class="font-ceremonial text-[var(--gold-soft)] text-base shrink-0 mt-0.5">${p.roman}</span>
            <div class="min-w-0">
              <div class="font-mono text-[.55rem] text-[var(--text-tertiary)] tracking-widest">${p.origem}</div>
              <h3 class="font-display text-base sm:text-lg text-white mt-1 leading-tight">${p.title}</h3>
              <div class="flex flex-wrap gap-1 mt-2">
                ${(p.vetor || []).map((v) => `<span class="badge badge-slate text-[.55rem]">${v}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="p-4 sm:p-5 space-y-3">
        <div class="tac-card glass-tac p-3 rounded border-l-[3px] border-l-[var(--gold)]">
          <div class="classified text-[var(--gold-soft)] mb-1.5">Contexto</div>
          <p class="text-[var(--text-secondary)] text-[.78rem] leading-relaxed">${p.contexto}</p>
        </div>
        <div>
          <div class="classified text-[var(--gold-soft)] mb-1.5">Defesa-Base</div>
          <ul class="space-y-0.5 text-[var(--accent-gold-soft)] text-[.7rem] font-mono">
            ${p.defesaBase.map((l) => `<li>◆ ${l}</li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="classified text-[var(--crimson-bright)] mb-2">${p.caminhos.length} Caminhos Táticos</div>
          <div class="space-y-2">
            ${p.caminhos.map((c, j) => renderCaminhoCard(p, c, i, j)).join('')}
          </div>
        </div>
      </div>
    </article>`;
}

function renderCaminhoCard(pauta, c, pi, ci) {
  return `
    <div class="tac-card glass-tac p-3 rounded border border-[var(--line-default)]">
      <div class="flex items-start justify-between gap-2 mb-1.5">
        <div class="min-w-0 flex-1">
          <div class="font-mono text-[.55rem] text-[var(--text-tertiary)] tracking-widest">CAMINHO ${pi + 1}.${ci + 1}</div>
          <div class="font-display text-white text-[.85rem] mt-0.5 leading-tight">${c.nome}</div>
        </div>
        <button type="button" class="btn btn-tac text-[.6rem] !py-1 shrink-0" data-pauta-pin="${pi}-${ci}">
          <i data-lucide="bookmark" class="w-3 h-3"></i> Fixar
        </button>
      </div>
      <p class="text-[var(--text-secondary)] text-[.75rem] leading-relaxed mb-2">${c.descricao}</p>
      <details class="acc">
        <summary class="flex items-center gap-1.5 text-[var(--gold-soft)] text-[.7rem] cursor-pointer hover:text-[var(--gold-bright)] transition-colors">
          <i data-lucide="chevron-right" class="w-3 h-3 chev"></i>
          <span class="font-mono uppercase tracking-widest text-[.6rem]">Táticas (${c.taticas.length})</span>
        </summary>
        <ol class="space-y-1.5 mt-2 text-[var(--text-secondary)] text-[.72rem] list-decimal list-inside">
          ${c.taticas.map((t) => `<li class="leading-relaxed">${t}</li>`).join('')}
        </ol>
      </details>
    </div>`;
}

/* ============================================================
   BIND — handlers de fixar no Painel
   ============================================================ */
function bindPautasActions() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pauta-pin]');
    if (!btn) return;
    const [pi, ci] = btn.getAttribute('data-pauta-pin').split('-').map(Number);
    const pauta = PAUTAS[pi];
    const caminho = pauta?.caminhos[ci];
    if (!pauta || !caminho) return;
    pinCaminho(pauta, caminho);
  });
}

function pinCaminho(pauta, caminho) {
  const body =
    `CAMINHO TÁTICO: ${caminho.nome}\n` +
    `PAUTA ${pauta.roman} — ${pauta.title}\n` +
    `Origem: ${pauta.origem}\n\n` +
    `DESCRIÇÃO:\n${caminho.descricao}\n\n` +
    `TÁTICAS:\n${caminho.taticas.map((t, i) => `${i + 1}. ${t}`).join('\n')}`;
  addPin({
    id: `pauta-${pauta.id}-${caminho.nome.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`,
    type: 'Caminho Tático',
    title: `${pauta.roman} · ${caminho.nome} — ${pauta.title}`,
    body,
    source: `Pautas & Caminhos · ${pauta.origem}`,
  });
}
