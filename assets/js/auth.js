/* ============================================================
   auth.js — Security Gateway (login diplomático)
   КРЕМЛЬ · Imperial Ritus v3.0
   ============================================================ */

import { state, showToast } from './state.js';

export const ALLOWED_CODES = [
  '0502026','260726','kr5','russia','msk5','kremlin','5326658',
];

export const SESSION_CODE = (() => {
  const saved = sessionStorage.getItem('kr_session_code');
  return saved || '';
})();

export function tryLogin() {
  const code = document.getElementById('accessCode').value.trim();
  const errBox = document.getElementById('loginError');
  const errText = document.getElementById('loginErrorText');
  const btn = document.getElementById('btnAuthenticate');
  const count = document.getElementById('attemptCount');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  errBox.classList.add('hidden');

  if (state.attempts <= 0) {
    errText.textContent = 'Sistema bloqueado. Aguarde reset pelo Cônsul-Chefe (CRT-MSK).';
    errBox.classList.remove('hidden');
    return;
  }

  const ok = ALLOWED_CODES.includes(code.toLowerCase());

  if (!ok) {
    state.attempts--;
    count.innerHTML = `Tentativas: <span class="${state.attempts > 0 ? 'text-[var(--gold-bright)]' : 'text-[var(--crimson-bright)]'}">0${state.attempts} / 03</span>`;
    errText.textContent = 'Credencial inválida. Tentativa registrada e reportada ao Cônsul-Chefe CRT-MSK.';
    errBox.classList.remove('hidden');

    /* Erro: flash carmesim + sino grave curto */
    if (!reduced && window.__ritual?.playBell) {
      const ctx = document.getElementById('securityGateway');
      if (ctx) {
        ctx.animate(
          [
            { filter: 'brightness(1)' },
            { filter: 'brightness(1.4) sepia(1) hue-rotate(-50deg) saturate(3)' },
            { filter: 'brightness(1)' },
          ],
          { duration: 380 }
        );
      }
      window.__ritual.playWaxBreak();
    } else if (!reduced) {
      errBox.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
        { duration: 320 }
      );
    }

    if (state.attempts <= 0) {
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    return;
  }

  /* Sucesso — ritual de entrada */
  state.authenticated = true;
  sessionStorage.setItem('kr_session_code', code.toLowerCase());

  const gw = document.getElementById('securityGateway');
  const app = document.getElementById('appShell');

  /* Sino monástico + selo de cera quebrando */
  if (!reduced) {
    if (window.__ritual?.playWaxBreak) window.__ritual.playWaxBreak();

    /* Spawn do selo quebrando + glyphs */
    spawnWaxBreak(gw);

    /* Som solene */
    setTimeout(() => {
      if (window.__ritual?.playBell) window.__ritual.playBell();
    }, 220);
  }

  /* Fade out do gateway após o ritual (~1.2s) */
  setTimeout(() => {
    gw.style.transition = 'opacity .8s ease, filter .8s ease';
    gw.style.opacity = '0';
    gw.style.filter = 'blur(8px)';
    setTimeout(() => {
      gw.classList.add('hidden');
      app.classList.remove('hidden');
      requestAnimationFrame(() => {
        app.style.transition = 'opacity .7s ease';
        app.style.opacity = '1';
      });
      showToast('Acesso diplomático liberado');
    }, 800);
  }, 1200);
}

function spawnWaxBreak(gw) {
  /* Cria um selo de cera no centro que parte */
  const seal = document.createElement('div');
  seal.className = 'wax-seal is-breaking';
  seal.style.cssText = `
    position:fixed; left:50%; top:50%; transform:translate(-50%,-50%) scale(.6);
    z-index:400; pointer-events:none;
  `;
  seal.innerHTML = '<span style="font-size:.7rem;letter-spacing:.05em;">SEAL · MSK</span>';
  document.body.appendChild(seal);
  setTimeout(() => seal.remove(), 1200);

  /* Glyphs voando do centro */
  const glyphs = ['✦','❦','✧','❖','✶','✷','✪'];
  for (let i = 0; i < 14; i++) {
    const g = document.createElement('div');
    g.className = 'ritual-glyph fly';
    g.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    const r = gw.getBoundingClientRect();
    g.style.left = (r.left + r.width / 2 + (Math.random() - 0.5) * 80) + 'px';
    g.style.top  = (r.top + r.height / 2 + (Math.random() - 0.5) * 80) + 'px';
    g.style.color = Math.random() < 0.3 ? 'var(--crimson-bright)' : 'var(--gold-bright)';
    g.style.fontSize = (1.8 + Math.random() * 1.5) + 'rem';
    document.body.appendChild(g);
    setTimeout(() => g.remove(), 1800);
  }
}

export function bindAuth() {
  const btn = document.getElementById('btnAuthenticate');
  const inp = document.getElementById('accessCode');
  if (btn) btn.addEventListener('click', tryLogin);
  if (inp) inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryLogin();
  });
}