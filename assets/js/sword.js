/* ============================================================
   sword.js — Espada que desembainha e abre o leque de módulos
   КРЕМЛЬ · v2.0 (full-width + split animation)
   ============================================================ */

import { go } from './nav.js';

export function bindSword() {
  const nav   = document.getElementById('swordNav');
  const btn   = document.getElementById('swordToggle');
  const fan   = document.getElementById('swordFan');
  const etch  = document.getElementById('swordEtch');
  if (!nav || !btn || !fan) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const open  = () => { nav.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); };
  const close = () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  const toggle = () => nav.classList.contains('open') ? close() : open();

  /* Click no botão (lâmina + cabo) */
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  /* Hover só adiciona a classe .hover (reflexo extra) */
  nav.addEventListener('mouseenter', () => nav.classList.add('hover'));
  nav.addEventListener('mouseleave', () => nav.classList.remove('hover'));

  /* Click num módulo do leque → grava o nome na lâmina */
  fan.addEventListener('click', (e) => {
    const tab = e.target.closest('.blade-tab[data-target]');
    if (!tab) return;
    const label = (tab.querySelector('span') || {}).textContent || tab.getAttribute('data-target');
    if (etch) etch.textContent = label;
    setTimeout(close, reduced ? 0 : 120);
  });

  /* Click fora / Esc → fecha */
  document.addEventListener('click', (e) => { if (!nav.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key.toLowerCase() === 'm' && !/input|textarea|select/i.test(e.target.tagName || '')) {
      e.preventDefault();
      toggle();
    }
  });
}