/* ============================================================
   red.js — Protocolo Ω · Arsenal de Tréplica Expandido
   КРЕМЛЬ · Imperial Ritus v3.0
   Categorias: Procedimental · Evidência · Soberania · DIH
               Sanções · Humanitário · Competência · Genocídio
               Criança · Narrativa · Seletividade · Paz
   ============================================================ */

import { state, capitalize, showToast } from './state.js';
import { addPin } from './speech.js';

/* Frases-modelo por categoria — base tática para combate ao vivo.
   Cada frase é calibrada para ~30 segundos de leitura (S.O. SOCHUM). */
export const RED_PHRASES = {
  /* ---------- PROCEDIMENTAL ---------- */
  procedural: 'Excelência, esta é uma questão de ordem. Em conformidade com o Art. XX do Regulamento, solicito a citação da base jurídica da fala anterior. Caso inexistente, peço a exclusão do registro. Esta Comissão não é palanque de opinião: é Corpo de Discussão Técnica.',

  /* ---------- EVIDÊNCIA ---------- */
  evidence:   'Excelências, a Federação Russa exige — como exige a Carta — provas concretas, rastreáveis e auditáveis por organismos internacionais NEUTROS. A opinião da mídia financiada por uma OTAN beligerante não substitui prova.',

  /* ---------- COMPETÊNCIA ---------- */
  competence: 'Excelência, este Comitê tem natureza consultiva, conforme Res. 45-II-B. Recomendar é admissível; julgar a soberania de Estados não é. Reencaminho a discussão ao foro competente — o Conselho de Segurança.',

  /* ---------- SOBERANIA ---------- */
  sovereignty:'Não admitimos tutelas morais. A Federação Russa exerce sua política de segurança e de proteção civil sob sua exclusiva responsabilidade, no marco da Carta e do Direito Internacional Humanitário.',

  /* ---------- DIH ---------- */
  dih:        'Excelências, o Direito Internacional Humanitário é universal ou não é. Quem invoca princípios para proteger civis deve aplicá-los sem distinção de geografia. Onde estão as auditorias in loco nos teatros que aqui se calam?',

  /* ---------- SANÇÕES ---------- */
  sanctions:  'Excelência, sanções unilaterais NÃO CONSTAM do Artigo 41 da Carta. Esse artigo reserva ao Conselho de Segurança — único — competência sancionatória. Quem vota sanções unilaterais viola a Carta e hipoteca a credibilidade da criança que delas sofre.',

  /* ---------- HUMANITÁRIO ---------- */
  humanitarian:'A Federação Russa lembra a este Conselho que humanitarismo é PRÁTICA, não RETÓRICA. Corredor humanitário funciona onde o corredor é monitorado, supervisionado e auditado. Quantos corredores assim funcionam hoje nos teatros convenientemente esquecidos?',

  /* ---------- GENOCÍDIO ---------- */
  genocide:   'Excelência, genocídio tem definição jurídica precisa: a Convenção de 1948 exige dolo específico — intenção de destruir, EM PARTE OU NO TODO, um grupo. Quem usa o termo sem perícia está instrumentalizando o sofrimento. Pedimos: perícia independente, contraditório real.',

  /* ---------- CRIANÇA ---------- */
  child:      'Esta Comissão foi invocada para proteger crianças, não para sancioná-las. Sanções que impedem o acesso a insumos pediátricos, oncológicos e nutricionais são pediatricídio silencioso. A Rússia exige que a saúde da criança seja declarada intocável — por tratado, não por intenção.',

  /* ---------- NARRATIVA ---------- */
  narrative:  'Excelência, a Federação Russa percebe que o debate oscila entre narrativas financiadas. Lembramos que a verdade jurídica é apurada em foro competente, com contraditório, provas rastreáveis e sem seletividade política. Não repetiremos slogans; produziremos fatos.',

  /* ---------- SELETIVIDADE ---------- */
  selectivity:'Onde estão as moções sobre o Sudão? Sobre o Tigray? Sobre o Iêmen e a fome das suas crianças? Esta Comissão não tem autoridade para falar de crianças em Gaza se silencia sobre crianças em crises igualmente documentadas e convenientemente esquecidas.',

  /* ---------- PAZ / NEGOCIAÇÃO ---------- */
  peace:      'A Federação Russa insiste: o único caminho é o diplomático. Estamos prontos para negociação direta, sem precondições midiáticas, sobre todas as crises que este Comitê citou. Quem recusa sentar à mesa é cúmplice do prolongamento da guerra. A Rússia não é esse alguém.',

  /* ---------- DESCOLONIZAÇÃO ---------- */
  decolonization:'Excelência, a descolonização não terminou em 1960 — terminou no papel. Saara Ocidental, Cabinda, Nova Caledônia, Malvinas, Porto Rico seguem pendentes. Quem fala de ordem baseada em regras invoca a regra que ignora.',

  /* ---------- ENERGIA & RECURSOS ---------- */
  energy:     'A Federação Russa lembra que segurança energética é segurança humana. Sanções sobre energia são sanções sobre populações inteiras — inverno europeu, fome global. A Carta não autoriza esse crime.',

  /* ---------- GUERRA COGNITIVA ---------- */
  cognitive:  'Excelência, a Federação Russa denuncia o duplo-standard informacional. RT e Sputnik são vetados enquanto veículos financiados por serviços de inteligência operam livremente. A UNESCO tem palavra a dizer sobre isso.',

  /* ---------- VETOS CRUZADOS ---------- */
  veto:       'A Federação Russa exerce o direito de veto conferido pela Carta. Não é cortesia — é salvaguarda de equilíbrio. Quem pede que a Rússia se abstenha deve também reconhecer o direito dos demais.',

  /* ---------- HIPOCRISIA HUMANITÁRIA ---------- */
  hypocrisy:  'Excelências, humanitarismo seletivo é cinismo. Quem evacua Gaza de um lado da manchete e ignora Khartoum da outra pratica política, não filantropia. A Rússia exige coerência ou, no mínimo, honestidade sobre prioridades.',

  /* ---------- GEOPOLÍTICA / INDO-PACÍFICO ---------- */
  indo_pacific:'A Federação Russa recusa a lógica de blocos. AUKUS, QUAD, IPEF — são tentativas de conter o desenvolvimento soberano de Estados soberanos. O Indo-Pacífico não é quintal de ninguém.',
};

/* Categorias visíveis com ícone Lucide + label curto */
const CATEGORIES = [
  { id:'procedural',   label:'Procedimental',  icon:'gavel' },
  { id:'evidence',     label:'Evidência',      icon:'file-warning' },
  { id:'sovereignty',  label:'Soberania',      icon:'shield-check' },
  { id:'dih',          label:'DIH',            icon:'scale' },
  { id:'sanctions',    label:'Sanções',        icon:'ban' },
  { id:'humanitarian', label:'Humanitário',    icon:'heart' },
  { id:'genocide',     label:'Genocídio',      icon:'skull' },
  { id:'child',        label:'Criança',        icon:'baby' },
  { id:'narrative',    label:'Narrativa',      icon:'megaphone' },
  { id:'selectivity',  label:'Seletividade',   icon:'git-branch' },
  { id:'peace',        label:'Paz',            icon:'handshake' },
  { id:'competence',   label:'Competência',    icon:'building-2' },
  { id:'decolonization',label:'Descolonização',icon:'flag' },
  { id:'energy',       label:'Energia',        icon:'flame' },
  { id:'cognitive',    label:'Guerra Cognitiva',icon:'radar' },
  { id:'veto',         label:'Vetos',          icon:'shield-x' },
  { id:'hypocrisy',    label:'Hipocrisia HU',  icon:'alert-triangle' },
  { id:'indo_pacific', label:'Indo-Pacífico',  icon:'globe-2' },
];

let currentFilter = 'TODOS';

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
      title: 'Retaliação Ω — ' + capitalize(state.currentSpeech.type || 'Procedimental'),
      body: state.currentSpeech.text,
      source: 'Protocolo Ω — Botão Vermelho',
    });
  });

  /* Compatibilidade: qualquer botão com data-red-kind abre modal com filtro pré-aplicado */
  document.querySelectorAll('[data-red-kind]').forEach((b) => {
    b.addEventListener('click', () => openRedModal(b.getAttribute('data-red-kind')));
  });
}

/* Render filtros por categoria */
function renderFilters() {
  const wrap = document.getElementById('redFilters');
  if (!wrap) return;
  wrap.innerHTML = ['TODOS', ...CATEGORIES.map((c) => c.id)].map((id) => {
    const cat = id === 'TODOS' ? null : CATEGORIES.find((x) => x.id === id);
    const label = id === 'TODOS' ? 'Todos' : cat.label;
    return `<button class="chip ${currentFilter === id ? 'active' : ''}" data-red-filter="${id}">${label}</button>`;
  }).join('');
  wrap.querySelectorAll('[data-red-filter]').forEach((b) => {
    b.addEventListener('click', () => {
      currentFilter = b.getAttribute('data-red-filter');
      renderFilters();
      renderGrid();
    });
  });
}

/* Render grid de frases com filtro ativo */
function renderGrid() {
  const wrap = document.getElementById('redGrid');
  if (!wrap) return;
  const cats = currentFilter === 'TODOS' ? CATEGORIES : CATEGORIES.filter((c) => c.id === currentFilter);
  wrap.classList.add('items-start');
  wrap.innerHTML = cats.map((c) => `
    <button class="tac-card glass-tac p-4 text-left fade-up" data-red-pick="${c.id}">
      <i data-lucide="${c.icon}" class="w-5 h-5 text-[var(--crimson-bright)] mb-2"></i>
      <div class="font-ceremonial text-white text-sm">${c.label}</div>
      <p class="text-[var(--text-secondary)] text-xs mt-2 font-display italic leading-relaxed">"${RED_PHRASES[c.id]}"</p>
    </button>
  `).join('');
  if (window.lucide) lucide.createIcons();
  wrap.querySelectorAll('[data-red-pick]').forEach((b) => {
    b.addEventListener('click', () => pickPhrase(b.getAttribute('data-red-pick')));
  });
}

function pickPhrase(id) {
  const phrase = RED_PHRASES[id];
  if (!phrase) return;
  state.currentSpeech.text = phrase;
  state.currentSpeech.type = id;
  document.getElementById('redSpeech').textContent = phrase;
  document.getElementById('redResult').classList.remove('hidden');
  /* Flash carmesim discreto no card escolhido */
  const grid = document.getElementById('redGrid');
  if (grid) {
    grid.querySelectorAll('[data-red-pick]').forEach((b) => {
      b.classList.remove('card-red');
      if (b.getAttribute('data-red-pick') === id) b.classList.add('card-red');
    });
  }
  if (window.lucide) lucide.createIcons();
}

export function openRedModal(kind) {
  const m = document.getElementById('redModal');
  if (!m) return;
  m.classList.remove('hidden');
  m.classList.add('flex');

  /* Ritual de crise — sino monástico + saturação carmesim + glyphs */
  triggerCrisisOverlay();

  /* Reset e render */
  const result = document.getElementById('redResult');
  if (result) result.classList.add('hidden');
  if (kind) {
    currentFilter = kind;
    renderFilters();
    renderGrid();
    pickPhrase(kind);
    state.currentSpeech.type = kind;
  } else {
    currentFilter = 'TODOS';
    renderFilters();
    renderGrid();
  }
  if (window.lucide) lucide.createIcons();
}

export function closeRedModal() {
  const m = document.getElementById('redModal');
  if (!m) return;
  m.classList.add('hidden');
  m.classList.remove('flex');
  /* Encerra saturação */
  const ov = document.getElementById('crisisOverlay');
  if (ov) ov.classList.remove('active');
}

function triggerCrisisOverlay() {
  /* Sino monástico + impacto */
  if (window.__ritual?.playBell) window.__ritual.playBell();

  let ov = document.getElementById('crisisOverlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'crisisOverlay';
    ov.className = 'crisis-overlay';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');

  /* Glyphs carmesim voando */
  const glyphs = ['✦','❦','✧','✶','✪','✺','✹'];
  for (let i = 0; i < 10; i++) {
    const g = document.createElement('div');
    g.className = 'ritual-glyph fly';
    g.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    g.style.left = (innerWidth * Math.random()) + 'px';
    g.style.top  = (innerHeight * Math.random()) + 'px';
    g.style.color = 'var(--crimson-bright)';
    g.style.fontSize = (2 + Math.random() * 1.5) + 'rem';
    document.body.appendChild(g);
    setTimeout(() => g.remove(), 1700);
  }

  /* Saturação sai depois de 1.2s */
  setTimeout(() => ov.classList.remove('active'), 1200);
}
