/* ============================================================
   nav.js — Roteamento de abas (War Room, Intel, Arsenal…)
   КРЕМЛЬ · Imperial Ritus v3.0
   ============================================================ */

import { state } from './state.js';

export function go(target) {
  /* Vinheta ritual + som de espada ao trocar seção */
  if (state.section && state.section !== target && window.__ritual?.playTransition) {
    window.__ritual.playTransition();
    setTimeout(() => activate(target), 380);
  } else {
    activate(target);
  }
}

function activate(target) {
  document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'));
  document.querySelectorAll('.nav-item, .cmd-pill, .blade-tab').forEach((s) => s.classList.remove('active'));
  document.querySelectorAll('.bn-item').forEach((s) => s.classList.remove('active'));

  const sec = document.querySelector(`[data-section="${target}"]`);
  if (sec) sec.classList.add('active');
  document.querySelectorAll(`.nav-item[data-target="${target}"], .cmd-pill[data-target="${target}"]`)
    .forEach((n) => n.classList.add('active'));
  document.querySelectorAll(`.bn-item[data-target="${target}"]`)
    .forEach((n) => n.classList.add('active'));

  state.section = target;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeSidebar();
}

export function bindNav() {
  document.querySelectorAll('[data-target]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const t = el.getAttribute('data-target');
      if (t) go(t);
    });
  });
}

/* Sidebar removida — noop mantido para compatibilidade */
export function closeSidebar() {}

/* Atalhos de teclado: 1-9 → módulos */
export function bindHotkeys() {
  const map = { '1':'warroom', '2':'intel', '3':'arsenal', '4':'shield', '5':'generator', '6':'speech', '7':'files', '8':'resolucao', '9':'pautas' };
  document.addEventListener('keydown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (/input|textarea|select|tiptap/i.test(tag)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (map[e.key]) {
      e.preventDefault();
      go(map[e.key]);
    }
  });
}