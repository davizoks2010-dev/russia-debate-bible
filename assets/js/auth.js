/* ============================================================
   auth.js — Security Gateway (login diplomático)
   КРЕМЛЬ · v2.0
   ============================================================ */

import { state, showToast } from './state.js';

export const ALLOWED_CODES = [
  '0502026','260726','kr5','russia','msk5','kremlin','5326658',
];

/* Access code que o frontend envia para as APIs */
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
    count.innerHTML = `Tentativas: <span class="${state.attempts > 0 ? 'text-white' : 'text-[var(--accent-red)]'}">0${state.attempts} / 03</span>`;
    errText.textContent = 'Credencial inválida. Tentativa registrada e reportada ao Cônsul-Chefe CRT-MSK.';
    errBox.classList.remove('hidden');
    if (state.attempts <= 0) {
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    if (!reduced) {
      errBox.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
        { duration: 320 }
      );
    }
    return;
  }

  // Sucesso
  state.authenticated = true;
  sessionStorage.setItem('kr_session_code', code.toLowerCase());

  const gw = document.getElementById('securityGateway');
  const app = document.getElementById('appShell');
  gw.style.transition = 'opacity .55s ease';
  gw.style.opacity = '0';
  setTimeout(() => {
    gw.classList.add('hidden');
    app.classList.remove('hidden');
    if (!reduced) requestAnimationFrame(() => {
      app.style.transition = 'opacity .5s ease';
      app.style.opacity = '1';
    });
    else app.style.opacity = '1';
    showToast('Acesso diplomático liberado');
  }, 540);
}

export function bindAuth() {
  const btn = document.getElementById('btnAuthenticate');
  const inp = document.getElementById('accessCode');
  if (btn) btn.addEventListener('click', tryLogin);
  if (inp) inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryLogin();
  });
}