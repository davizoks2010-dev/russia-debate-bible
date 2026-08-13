/* ============================================================
   gemini.js — Módulo "Pesquisa Soberana" (Módulo 10)
   КРЕМЛЬ · v3.0
   Pesquisa livre + geração de fala-modelo via LLM remoto.
   Backend: api/llm/search.js (atualmente Groq · Llama 3.1 70B).
   A chave fica em env var (process.env.GROQ_API_KEY) —
   este módulo NUNCA a vê.
   ============================================================ */

import { MODES, SHORTCUTS } from './llm-data.js';
import { addPin } from './speech.js';
import { loadStorage, saveStorage, STORAGE_KEYS, showToast } from './state.js';

let lastSubmitTs = 0;
const DEBOUNCE_MS = 1500;

/* ============================================================
   INIT
   ============================================================ */
export function initGemini() {
  renderShortcuts();
  renderHistory();
  bindGeminiActions();
  if (window.lucide) lucide.createIcons();
}

/* ============================================================
   RENDER — Atalhos
   ============================================================ */
function renderShortcuts() {
  const wrap = document.getElementById('geminiShortcuts');
  if (!wrap) return;
  wrap.innerHTML = SHORTCUTS.map((s) => `
    <button type="button" class="tac-card glass-tac p-3 text-left w-full hover:border-[var(--gold)] transition-colors" data-shortcut="${s.id}">
      <div class="flex items-start gap-2">
        <i data-lucide="${s.icon}" class="w-4 h-4 text-[var(--gold-soft)] mt-0.5 shrink-0"></i>
        <div class="min-w-0 flex-1">
          <div class="font-display text-white text-[.8rem] leading-tight">${s.label}</div>
          <div class="text-[var(--text-tertiary)] text-[.6rem] font-mono mt-0.5">${s.mode === 'speech' ? 'FALA' : 'PESQUISA'} · ${s.context?.vector || '—'}</div>
        </div>
      </div>
    </button>
  `).join('');
}

/* ============================================================
   RENDER — Histórico (últimas 10 consultas)
   ============================================================ */
function renderHistory() {
  const wrap = document.getElementById('geminiHistory');
  if (!wrap) return;
  const log = loadStorage(STORAGE_KEYS.geminiLog, []);
  if (!log.length) {
    wrap.innerHTML = `
      <div class="tac-card glass-tac p-4 rounded border border-dashed border-[var(--line-default)] text-center">
        <p class="text-[var(--text-tertiary)] text-[.78rem]">Nenhuma consulta registrada. As últimas 10 aparecerão aqui.</p>
      </div>`;
    return;
  }
  wrap.innerHTML = log.map((h, i) => `
    <article class="tac-card glass-tac p-3 rounded border-l-[3px] border-l-[var(--gold)]">
      <div class="flex items-start justify-between gap-2 flex-wrap">
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="badge ${h.mode === 'speech' ? 'badge-red' : 'badge-gold'} text-[.55rem]">${h.mode === 'speech' ? 'FALA' : 'PESQUISA'}</span>
            <span class="font-mono text-[.55rem] text-[var(--text-tertiary)]">G-${String(i+1).padStart(2,'0')}</span>
            <span class="font-mono text-[.55rem] text-[var(--text-tertiary)]">${formatRelativeTime(h.ts)}</span>
          </div>
          <div class="text-[var(--text-secondary)] text-[.7rem] mb-1 italic">"${escapeHtml(truncate(h.query, 80))}"</div>
        </div>
        <button type="button" class="btn btn-tac text-[.6rem] !py-1" data-gemini-replay="${i}">
          <i data-lucide="refresh-cw" class="w-3 h-3"></i> Repetir
        </button>
      </div>
      <details class="acc mt-2">
        <summary class="text-[var(--gold-soft)] text-[.7rem] cursor-pointer hover:text-[var(--gold-bright)]">
          <i data-lucide="chevron-right" class="w-3 h-3 chev inline"></i>
          Ver resposta
        </summary>
        <div class="mt-2 space-y-2">
          <pre class="text-[var(--text-secondary)] text-[.72rem] whitespace-pre-wrap font-display leading-relaxed">${escapeHtml(h.text)}</pre>
          <button type="button" class="btn btn-tac text-[.6rem] !py-1" data-gemini-pin-history="${i}">
            <i data-lucide="bookmark" class="w-3 h-3"></i> Fixar no Painel
          </button>
        </div>
      </details>
    </article>
  `).join('');
  if (window.lucide) lucide.createIcons();

  wrap.querySelectorAll('[data-gemini-replay]').forEach((b) => {
    b.addEventListener('click', () => {
      const idx = parseInt(b.getAttribute('data-gemini-replay'), 10);
      const log = loadStorage(STORAGE_KEYS.geminiLog, []);
      const h = log[idx];
      if (!h) return;
      document.getElementById('geminiQuery').value = h.query;
      document.getElementById('geminiMode').value = h.mode;
      submitGemini();
    });
  });
  wrap.querySelectorAll('[data-gemini-pin-history]').forEach((b) => {
    b.addEventListener('click', () => {
      const idx = parseInt(b.getAttribute('data-gemini-pin-history'), 10);
      const log = loadStorage(STORAGE_KEYS.geminiLog, []);
      const h = log[idx];
      if (!h) return;
      addPin({
        id: 'gemini-' + h.ts,
        type: h.mode === 'speech' ? 'Fala IA' : 'Pesquisa IA',
        title: `${h.mode === 'speech' ? 'Fala' : 'Pesquisa'} — ${truncate(h.query, 60)}`,
        body: h.text,
        source: `Pesquisa Soberana · LLM Remoto · ${formatRelativeTime(h.ts)}`,
      });
    });
  });
}

/* ============================================================
   BIND — handlers
   ============================================================ */
function bindGeminiActions() {
  document.addEventListener('click', (e) => {
    const sc = e.target.closest('[data-shortcut]');
    if (sc) { applyShortcut(sc.getAttribute('data-shortcut')); return; }
  });

  document.getElementById('geminiSubmit')?.addEventListener('click', submitGemini);
  document.getElementById('geminiClear')?.addEventListener('click', () => {
    document.getElementById('geminiQuery').value = '';
    document.getElementById('geminiOutput').innerHTML = '';
    setStatus('');
  });
  document.getElementById('geminiQuery')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); submitGemini(); }
  });
  document.getElementById('geminiMode')?.addEventListener('change', (e) => {
    const mode = e.target.value;
    const ta = document.getElementById('geminiQuery');
    if (ta && MODES[mode]) ta.placeholder = MODES[mode].placeholder;
  });
  /* inicializa placeholder */
  const modeSel = document.getElementById('geminiMode');
  const ta = document.getElementById('geminiQuery');
  if (modeSel && ta) ta.placeholder = MODES[modeSel.value]?.placeholder || '';
}

function applyShortcut(id) {
  const sc = SHORTCUTS.find((x) => x.id === id);
  if (!sc) return;
  document.getElementById('geminiMode').value = sc.mode;
  document.getElementById('geminiQuery').value = sc.query;
  const ta = document.getElementById('geminiQuery');
  if (ta) ta.placeholder = MODES[sc.mode]?.placeholder || '';
  setStatus(`Atalho aplicado: ${sc.label}`);
}

/* ============================================================
   SUBMIT — fetch ao backend
   ============================================================ */
async function submitGemini() {
  const now = Date.now();
  if (now - lastSubmitTs < DEBOUNCE_MS) {
    return setStatus('Aguarde ' + Math.ceil((DEBOUNCE_MS - (now - lastSubmitTs)) / 1000) + 's para nova consulta.');
  }
  const mode = document.getElementById('geminiMode')?.value || 'search';
  const query = document.getElementById('geminiQuery')?.value.trim();
  if (!query) {
    setStatus('Digite uma pergunta ou selecione um atalho.');
    return;
  }
  lastSubmitTs = now;

  setStatus('Consultando LLM Soberano…');
  renderOutputLoading();

  try {
    const resp = await fetch('/api/llm/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, query, context: {} }),
    });
    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      renderOutputError(data.error || `Erro ${resp.status}`, resp.status);
      setStatus('Falhou.');
      return;
    }

    renderOutputSuccess(data, mode, query);
    appendHistory({ ts: new Date().toISOString(), mode, query, text: data.text });
    setStatus(`Resposta em ${data.model || 'llama-3.3-70b-versatile'}.`);
  } catch (e) {
    renderOutputError('Erro de rede. Verifique conexão.', 0);
    setStatus('Falhou.');
  }
}

/* ============================================================
   RENDER — output states
   ============================================================ */
function renderOutputLoading() {
  const out = document.getElementById('geminiOutput');
  if (!out) return;
  out.innerHTML = `
    <div class="tac-card glass-tac p-4 rounded border-l-[3px] border-l-[var(--gold)]">
      <div class="flex items-center gap-2 mb-2">
        <span class="status-led amber"></span>
        <span class="classified text-[var(--gold-soft)]">Consultando LLM Soberano · Groq</span>
      </div>
      <div class="sov-terminal" style="border-left-color:var(--gold);margin:0">
        <span class="sov-terminal-prompt">$</span>
        <span class="text-[var(--text-secondary)]">aguarde resposta soberana…</span>
        <span class="sov-terminal-cursor"></span>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
}

function renderOutputError(msg, code) {
  const out = document.getElementById('geminiOutput');
  if (!out) return;
  const tone = code === 503 ? 'crimson' : 'gold';
  out.innerHTML = `
    <div class="tac-card glass-tac p-4 rounded border-l-[3px] border-l-[var(--${tone})]">
      <div class="classified text-[var(--${tone})] mb-2">Falha na Consulta · HTTP ${code || '???'}</div>
      <p class="text-[var(--text-secondary)] text-[.85rem] leading-relaxed">${escapeHtml(msg)}</p>
      ${code === 503 ? '<p class="text-[var(--text-tertiary)] text-[.72rem] mt-2 italic">Aguardando configuração de GROQ_API_KEY no servidor (Settings → Environment Variables na Vercel).</p>' : ''}
    </div>`;
}

function renderOutputSuccess(data, mode, query) {
  const out = document.getElementById('geminiOutput');
  if (!out) return;
  const ts = new Date().toISOString();
  out.innerHTML = `
    <div class="tac-card glass-tac p-4 rounded border-l-[3px] border-l-[var(--gold)]" data-gemini-last-ts="${ts}">
      <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <div class="flex items-center gap-2">
          <span class="badge ${mode === 'speech' ? 'badge-red' : 'badge-gold'} text-[.55rem]">${mode === 'speech' ? 'FALA' : 'PESQUISA'}</span>
          <span class="font-mono text-[.55rem] text-[var(--text-tertiary)]">${data.model || 'llama-3.3-70b-versatile'}</span>
        </div>
        <div class="flex gap-1.5">
          <button type="button" class="btn btn-ghost text-[.6rem] !py-1" data-gemini-copy>
            <i data-lucide="copy" class="w-3 h-3"></i> Copiar
          </button>
          <button type="button" class="btn btn-tac text-[.6rem] !py-1" data-gemini-pin>
            <i data-lucide="bookmark" class="w-3 h-3"></i> Fixar
          </button>
        </div>
      </div>
      <div class="text-[var(--text-tertiary)] text-[.7rem] mb-2 italic">"${escapeHtml(truncate(query, 120))}"</div>
      <pre class="text-[var(--text-secondary)] text-[.85rem] whitespace-pre-wrap font-display leading-relaxed">${escapeHtml(data.text)}</pre>
    </div>`;
  if (window.lucide) lucide.createIcons();

  out.querySelector('[data-gemini-copy]')?.addEventListener('click', () => {
    navigator.clipboard.writeText(data.text).then(() => showToast('Resposta copiada'));
  });
  out.querySelector('[data-gemini-pin]')?.addEventListener('click', () => {
    addPin({
      id: 'gemini-' + ts,
      type: mode === 'speech' ? 'Fala IA' : 'Pesquisa IA',
      title: `${mode === 'speech' ? 'Fala' : 'Pesquisa'} — ${truncate(query, 60)}`,
      body: data.text,
      source: `Pesquisa Soberana · ${data.model}`,
    });
  });
}

/* ============================================================
   HISTÓRICO — append + save
   ============================================================ */
function appendHistory(entry) {
  try {
    const log = loadStorage(STORAGE_KEYS.geminiLog, []);
    const next = [entry, ...log].slice(0, 10);
    saveStorage(STORAGE_KEYS.geminiLog, next);
    renderHistory();
  } catch (e) { /* silencioso */ }
}

/* ============================================================
   HELPERS
   ============================================================ */
function setStatus(msg) {
  const el = document.getElementById('geminiStatus');
  if (el) el.textContent = msg;
}
function escapeHtml(s) { return (s || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function truncate(s, n) { s = s || ''; return s.length > n ? s.slice(0, n) + '…' : s; }
function formatRelativeTime(iso) {
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return 'agora';
    if (min < 60) return `${min}min atrás`;
    const h = Math.floor(min / 60);
    if (h < 24) return `${h}h atrás`;
    return `${Math.floor(h / 24)}d atrás`;
  } catch (e) { return ''; }
}
