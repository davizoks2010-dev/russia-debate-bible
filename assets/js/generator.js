/* ============================================================
   generator.js — Construtor de Discursos
   КРЕМЛЬ · v2.0
   ============================================================ */

import { DATA } from './data.js';
import { state, showToast, capitalize } from './state.js';
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
}

function updateOutput() {
  const out = document.getElementById('genOutput');
  if (!out) return;
  const text = state.currentSpeech.text || '// aguardando configuração...';
  out.innerHTML = `<div class="inner">${escapeHtml(text)}</div>`;
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
  updateOutput();
  showToast('Discurso gerado');
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