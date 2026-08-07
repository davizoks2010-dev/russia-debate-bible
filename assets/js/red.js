/* ============================================================
   red.js — Modal de Retaliação
   КРЕМЛЬ · v2.0
   ============================================================ */

import { state, capitalize, showToast } from './state.js';
import { addPin } from './speech.js';

export const RED_PHRASES = {
  procedural: 'Excelência, esta é uma questão de ordem. Em conformidade com o Art. XX do Regulamento, solicito a citação da base jurídica da fala anterior. Caso inexistente, peço a exclusão do registro. Esta Comissão não é palanque de opinião: é Corpo de Discussão Técnica.',
  evidence:   'Excelências, a Federação Russa exige — como exige a Carta — provas concretas, rastreáveis e auditáveis por organismos internacionais NEUTROS. A opinião da mídia financiada por uma OTAN beligerante não substitui prova.',
  competence: 'Excelência, este Comitê tem natureza consultiva, conforme Res. 45-II-B. Recomendar é admissível; julgar a soberania de Estados não é. Reencaminho a discussão ao foro competente — o Conselho de Segurança.',
  sovereignty:'Não admitimos tutelas morais. A Federação Russa exerce sua política de segurança e de proteção civil sob sua exclusiva responsabilidade, no marco da Carta e do Direito Internacional Humanitário.',
};

export function bindRed() {
  document.getElementById('redModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'redModal') closeRedModal();
  });
  document.getElementById('openRedButton')?.addEventListener('click', () => openRedModal());
  document.getElementById('triggerCrisis')?.addEventListener('click', () => openRedModal());
  document.getElementById('redBtn')?.addEventListener('click', () => openRedModal());
  document.getElementById('crisisTriggerInline')?.addEventListener('click', () => openRedModal());
  document.getElementById('closeRedModal')?.addEventListener('click', closeRedModal);

  document.getElementById('copyRed')?.addEventListener('click', () => {
    if (!state.currentSpeech.text) return showToast('Gere uma fala primeiro');
    navigator.clipboard.writeText(state.currentSpeech.text).then(() => showToast('Fala copiada'));
  });
  document.getElementById('pinRed')?.addEventListener('click', () => {
    if (!state.currentSpeech.text) return showToast('Gere uma fala primeiro');
    addPin({
      id: 'red-' + Date.now(),
      type: 'retaliação',
      title: 'Retaliação — ' + capitalize(state.currentSpeech.type || 'Procedimental'),
      body: state.currentSpeech.text,
      source: 'Botão Vermelho Ω',
    });
  });

  document.querySelectorAll('[data-red-kind]').forEach((b) => {
    b.addEventListener('click', () => openRedModal(b.getAttribute('data-red-kind')));
  });
}

export function openRedModal(kind) {
  const m = document.getElementById('redModal');
  if (!m) return;
  m.classList.remove('hidden');
  m.classList.add('flex');
  if (kind) {
    document.getElementById('redSpeech').textContent = RED_PHRASES[kind];
    document.getElementById('redResult').classList.remove('hidden');
    state.currentSpeech.text = RED_PHRASES[kind];
    state.currentSpeech.type = kind;
  } else {
    document.getElementById('redResult').classList.add('hidden');
  }
  if (window.lucide) lucide.createIcons();
}

export function closeRedModal() {
  const m = document.getElementById('redModal');
  if (!m) return;
  m.classList.add('hidden');
  m.classList.remove('flex');
}