/* ============================================================
   state.js — Estado global + helpers de localStorage
   КРЕМЛЬ · v2.0
   ============================================================ */

export const STORAGE_KEYS = {
  pinned:    'kr_pinned_v2',
  prefs:     'kr_prefs_v2',
  speechLog: 'kr_speech_log_v2',
  geminiLog: 'kr_gemini_log_v2',
};

export const state = {
  section: 'warroom',
  pinned: [],
  arsenalFilter: 'TODOS',
  shieldFilter: 'TODOS',
  currentSpeech: { type: null, target: '', axes: [], tone: 'Procedimental', text: '' },
  attempts: 3,
  authenticated: false,
  files: [],
  notes: [],
  activeNote: null,
  activeNoteDraft: '',
};

/* ---------- localStorage helpers ---------- */

export function loadStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn('[state] loadStorage failed:', key, e);
    return fallback;
  }
}

export function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('[state] saveStorage failed:', key, e);
    return false;
  }
}

export function clearStorage(key) {
  try { localStorage.removeItem(key); return true; }
  catch (e) { return false; }
}

/* ---------- Init ---------- */

export function initState() {
  state.pinned = loadStorage(STORAGE_KEYS.pinned, []);
}

/* ---------- Caps ---------- */

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ---------- Toast ---------- */

export function showToast(message, duration = 2500) {
  const wrap = document.getElementById('toastContainer');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4 text-[var(--accent-gold-soft)]"></i><span>${message}</span>`;
  wrap.appendChild(t);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity .3s ease';
    setTimeout(() => t.remove(), 320);
  }, duration);
}