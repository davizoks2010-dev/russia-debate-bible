/* ============================================================
   generator.js — Construtor de Discursos
   КРЕМЛЬ · v2.0
   ============================================================ */

import { DATA } from './data.js';
import { state, showToast, capitalize, saveStorage, loadStorage, STORAGE_KEYS } from './state.js';
import { addPin } from './speech.js';

let selectedAxes = new Set();

export function initGenerator() {
  const typeSel = document.getElementById('genType');
  const targetSel = document.getElementById('genTarget');
  const toneWrap = document.getElementById('genTone');
  const axesWrap = document.getElementById('genAxes');
  const out = document.getElementById('genOutput');

  if (!toneWrap || !axesWrap || !out) return;

  /* Tones */
  toneWrap.innerHTML = DATA.tones.map((t) =>
    `<button class="chip" data-tone="${t.id}">${t.label}</button>`).join('');
  toneWrap.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tone]');
    if (!b) return;
    toneWrap.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    b.classList.add('active');
    state.currentSpeech.tone = capitalize(b.textContent);
    updateOutput();
  });

  /* Eixos */
  axesWrap.innerHTML = DATA.axes.map((a) =>
    `<button class="chip" data-axis="${a.id}">${a.label}</button>`).join('');
  axesWrap.addEventListener('click', (e) => {
    const b = e.target.closest('[data-axis]');
    if (!b) return;
    const id = b.getAttribute('data-axis');
    if (selectedAxes.has(id)) { selectedAxes.delete(id); b.classList.remove('active'); }
    else if (selectedAxes.size < 4) { selectedAxes.add(id); b.classList.add('active'); }
    else showToast('Limite: 4 eixos.');
    state.currentSpeech.axes = Array.from(selectedAxes);
    updateOutput();
  });

  /* Botões */
  document.getElementById('generateBtn')?.addEventListener('click', generateSpeech);
  document.getElementById('addToPanel')?.addEventListener('click', pinCurrent);
  document.getElementById('randomizeBtn')?.addEventListener('click', randomize);
  document.getElementById('copyGen')?.addEventListener('click', copyOutput);
  document.getElementById('clearGen')?.addEventListener('click', clearOutput);
  document.getElementById('downloadGen')?.addEventListener('click', downloadOutput);

  /* Seletores */
  if (typeSel)   typeSel.addEventListener('change', () => { state.currentSpeech.type = typeSel.value; updateOutput(); });
  if (targetSel) targetSel.addEventListener('change', () => { state.currentSpeech.target = targetSel.value; updateOutput(); });

  /* Templates rápidos */
  const tplWrap = document.getElementById('quickTemplates');
  if (tplWrap) {
    tplWrap.innerHTML = DATA.genTemplates.map((t) =>
      `<button class="chip" data-tpl="${t.id}"><span class="font-medium">${t.label}</span><br><span class="text-[var(--text-tertiary)] text-[.65rem]">${t.desc}</span></button>`).join('');
    tplWrap.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tpl]');
      if (!b) return;
      const t = DATA.genTemplates.find((x) => x.id === b.getAttribute('data-tpl'));
      if (!t) return;
      state.currentSpeech.text = `[${t.label}]\n\nExcelências, com base em ${t.desc.toLowerCase()}, a Federação Russa solicita que esta Comissão considere a aplicação uniforme do DIH, sem seletividade política. Esta é a nossa exigência — fundamentada na Carta.`;
      updateOutput();
    });
  }

  updateOutput();
  renderSpeechHistory();
}

function updateOutput() {
  const out = document.getElementById('genOutput');
  if (!out) return;
  const text = state.currentSpeech.text || 'aguardando configuração...';
  out.innerHTML = `<span class="sov-terminal-prompt">$</span><span class="inner">${escapeHtml(text)}</span><span class="sov-terminal-cursor"></span>`;
  document.getElementById('genLength').textContent = `~${Math.ceil((text.length || 0) / 13)}s`;
}

function generateSpeech() {
  const tones = state.currentSpeech.tone || 'Procedimental';
  const target = state.currentSpeech.target || '';
  const axes = state.currentSpeech.axes || [];
  const intro = `Excelências, ${target ? `a Federação Russa dirige-se a ${target} para lembrar que` : 'a Federação Russa recorda que'}`;
  const pivot = axes.length
    ? `nossos eixos neste debate são: ${axes.map((a) => `"${a}"`).join(', ')}.`
    : 'nossa posição sustenta-se em fundamentos jurídicos e humanitários.';
  const closer = 'Esta Comissão deve aplicar o Direito Internacional Humanitário de forma uniforme — sem seletividade, sem tutelas.';
  state.currentSpeech.text = `${intro} ${pivot} ${tones === 'Cínico' ? 'Quem aplica duplo-standard hipoteca a credibilidade do sistema.' : tones === 'Épico' ? 'A Rússia defende a ordem multilateral com a firmeza de uma nação soberana.' : tones === 'Humanitário' ? 'Crianças não são moeda de troca em sanções unilaterais.' : tones === 'Legalista' ? 'A Carta é o único fundamento válido para este debate.' : tones === 'Socrático' ? 'Perguntamos: quem fiscaliza? Quem audita? Quem responde?' : 'A Carta é nosso único fundamento.'} ${closer}`;
  logSpeechHistory();
  updateOutput();
  renderSpeechHistory();
  showToast('Discurso gerado');
}

/* Salva o texto gerado no histórico (últimas 12) */
function logSpeechHistory() {
  try {
    const history = loadStorage(STORAGE_KEYS.speechLog, []);
    const entry = {
      ts: new Date().toISOString(),
      type: state.currentSpeech.type || 'Discurso',
      target: state.currentSpeech.target || '',
      axes: state.currentSpeech.axes || [],
      tone: state.currentSpeech.tone || 'Procedimental',
      text: state.currentSpeech.text,
    };
    const next = [entry, ...history].slice(0, 12);
    saveStorage(STORAGE_KEYS.speechLog, next);
  } catch (e) { /* silencioso */ }
}

function pinCurrent() {
  if (!state.currentSpeech.text || state.currentSpeech.text.startsWith('//')) {
    return showToast('Gere um discurso primeiro');
  }
  addPin({
    id: 'gen-' + Date.now(),
    type: state.currentSpeech.type || 'Discurso',
    title: `${state.currentSpeech.type || 'Discurso'} — ${state.currentSpeech.target || 'Geral'}`,
    body: state.currentSpeech.text,
    source: 'Gerador Soberano',
  });
}

function randomize() {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  state.currentSpeech.tone = capitalize(pick(DATA.tones).label);
  state.currentSpeech.target = pick([...document.getElementById('genTarget').options].slice(1)).text;
  state.currentSpeech.axes = DATA.axes.slice().sort(() => 0.5 - Math.random()).slice(0, 3).map((a) => a.label);
  document.querySelectorAll('#genTone .chip').forEach((c) => c.classList.toggle('active', c.textContent === state.currentSpeech.tone));
  generateSpeech();
}

function copyOutput() {
  if (!state.currentSpeech.text) return showToast('Nada para copiar');
  navigator.clipboard.writeText(state.currentSpeech.text).then(() => showToast('Discurso copiado'));
}
function clearOutput() {
  state.currentSpeech.text = '';
  updateOutput();
}
function downloadOutput() {
  if (!state.currentSpeech.text) return showToast('Nada para baixar');
  const blob = new Blob([state.currentSpeech.text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'discurso.txt';
  a.click(); URL.revokeObjectURL(url);
}
function escapeHtml(s) { return (s || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ============================================================
   HISTÓRICO DE GERAÇÕES — últimas 12 falas geradas (STORAGE_KEYS.speechLog)
   ============================================================ */
export function renderSpeechHistory() {
  const wrap = document.getElementById('genHistory');
  if (!wrap) return;
  const history = loadStorage(STORAGE_KEYS.speechLog, []);
  if (!history.length) {
    wrap.innerHTML = `
      <div class="tac-card glass-tac p-4 rounded border border-dashed border-[var(--line-default)] text-center">
        <div class="classified text-[var(--gold-soft)] mb-1">Histórico de Gerações</div>
        <p class="text-[var(--text-tertiary)] text-[.78rem]">Nenhuma geração registrada ainda. As falas geradas pelo Construtor aparecerão aqui (até 12 últimas).</p>
      </div>`;
    return;
  }
  wrap.innerHTML = `
    <div class="classified text-[var(--gold-soft)] mb-2">Histórico de Gerações · ${history.length} ${history.length === 1 ? 'fala registrada' : 'falas registradas'}</div>
    <div class="space-y-2">
      ${history.map((h, i) => `
        <article class="tac-card glass-tac p-3 rounded border-l-[3px] border-l-[var(--gold)]">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div class="flex items-center gap-2">
                <span class="badge badge-red text-[.55rem]">${escapeHtml(h.type || 'Discurso')}</span>
                <span class="font-mono text-[.55rem] text-[var(--text-tertiary)]">H-${String(i+1).padStart(2,'0')}</span>
              </div>
              <div class="text-[var(--text-secondary)] text-[.7rem] mt-1">
                ${h.target ? `Target: <span class="text-white">${escapeHtml(h.target)}</span>` : ''}
                ${h.tone ? ` · Tom: <span class="text-white">${escapeHtml(h.tone)}</span>` : ''}
                ${h.axes && h.axes.length ? ` · Eixos: <span class="text-white">${h.axes.map(escapeHtml).join(', ')}</span>` : ''}
              </div>
              <div class="font-mono text-[.55rem] text-[var(--text-tertiary)] mt-1">${formatRelativeTime(h.ts)}</div>
            </div>
            <button class="btn btn-tac text-[.6rem] !py-1" data-history-pin="${i}">
              <i data-lucide="bookmark" class="w-3 h-3"></i> Fixar
            </button>
          </div>
          <p class="text-[var(--text-secondary)] text-[.78rem] mt-2 italic font-display leading-relaxed">"${escapeHtml(h.text)}"</p>
        </article>
      `).join('')}
    </div>`;
  if (window.lucide) lucide.createIcons();
  wrap.querySelectorAll('[data-history-pin]').forEach((b) => {
    b.addEventListener('click', () => pinHistoryEntry(parseInt(b.getAttribute('data-history-pin'), 10)));
  });
}

function pinHistoryEntry(idx) {
  const history = loadStorage(STORAGE_KEYS.speechLog, []);
  const h = history[idx];
  if (!h) return;
  const body = `${h.text}\n\n— Tom: ${h.tone}${h.target ? ` · Target: ${h.target}` : ''}${h.axes?.length ? ` · Eixos: ${h.axes.join(', ')}` : ''}\nGerado em: ${formatRelativeTime(h.ts)}`;
  addPin({
    id: 'history-' + h.ts,
    type: h.type || 'Discurso',
    title: `${h.type || 'Discurso'} — ${h.target || 'Geral'} (${h.tone || ''})`.trim(),
    body,
    source: 'Gerador Soberano · Histórico',
  });
}

function formatRelativeTime(iso) {
  try {
    const d = new Date(iso);
    const diffMs = Date.now() - d.getTime();
    const min = Math.floor(diffMs / 60000);
    if (min < 1) return 'agora há pouco';
    if (min < 60) return `${min} min atrás`;
    const h = Math.floor(min / 60);
    if (h < 24) return `${h} h atrás`;
    const days = Math.floor(h / 24);
    return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
  } catch (e) {
    return iso;
  }
}