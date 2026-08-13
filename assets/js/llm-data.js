/* ============================================================
   llm-data.js — Constantes para o módulo Pesquisa Soberana
   КРЕМЛЬ · v3.0
   Modos, atalhos pré-configurados e metadados de UI.
   O system prompt vive no backend (api/llm/search.js)
   por segurança — não no front-end.
   ============================================================ */

export const MODES = {
  search: {
    id: 'search',
    label: 'Pesquisa livre',
    icon: 'search',
    placeholder: 'Ex.: Como rebater acusação de seletividade humanitária?',
    desc: 'Análise estruturada: CONTEXTO / ARGUMENTAÇÃO / PIVÔ TÁTICO.',
  },
  speech: {
    id: 'speech',
    label: 'Geração de fala-modelo',
    icon: 'megaphone',
    placeholder: 'Ex.: Fala de 60s sobre proteção da criança em conflito',
    desc: 'Texto corrido, ~180 palavras, tom diplomático de púlpito.',
  },
};

/* Atalhos táticos — pré-preenchem query + modo com base em vetor doutrinário.
   Conteúdo paráfraseado dos vetores em vectors.js e do guia_utf8.txt. */
export const SHORTCUTS = [
  {
    id: 's-ceasefire',
    label: 'Cessar-fogo Gaza',
    icon: 'shield',
    mode: 'search',
    query: 'Quais são os 3 principais argumentos russos para defender o cessar-fogo efetivo em Gaza, à luz da Res. 2728 e do DIH?',
    context: { vector: 'gaza' },
  },
  {
    id: 's-selectivity',
    label: 'Seletividade DIH',
    icon: 'scale',
    mode: 'search',
    query: 'Como rebater a acusação de seletividade humanitária russa invocando Iêmen e Sudão? Como articular o princípio da aplicação uniforme?',
    context: { vector: 'dih' },
  },
  {
    id: 's-shame-list',
    label: 'Lista da Vergonha',
    icon: 'alert-triangle',
    mode: 'search',
    query: 'Quais salvaguardas concretas para a credibilidade da Lista da Vergonha (MRM), sem comprometer o devido processo?',
    context: { vector: 'dih' },
  },
  {
    id: 's-tpi',
    label: 'Paralelismo TPI',
    icon: 'gavel',
    mode: 'search',
    query: 'Como argumentar paralelismo entre mandado TPI contra autoridades russas e contra autoridades israelenses, sem abandonar o princípio da complementariedade?',
    context: { vector: 'reforma_csnu' },
  },
  {
    id: 's-energy',
    label: 'Sanções & energia',
    icon: 'flame',
    mode: 'search',
    query: 'Como defender que sanções energéticas unilaterais são pediatricídio indireto, à luz do Art. 41 da Carta e do DESC Art. 11?',
    context: { vector: 'energia' },
  },
  {
    id: 's-csnu',
    label: 'Reforma CSNU',
    icon: 'globe-2',
    mode: 'search',
    query: 'Quais 3 reformas estruturais o CSNU precisa, considerando a Declaração de Ezulwini e a ausência de assento permanente africano?',
    context: { vector: 'reforma_csnu' },
  },
  {
    id: 's-speech-child',
    label: 'Fala: criança',
    icon: 'baby',
    mode: 'speech',
    query: 'Gere fala-modelo de 60 segundos sobre proteção da criança em conflito, citando CRC Art. 6 e Res. 2427.',
    context: { vector: 'dih' },
  },
  {
    id: 's-speech-sov',
    label: 'Fala: soberania',
    icon: 'shield-check',
    mode: 'speech',
    query: 'Gere fala-modelo de 60 segundos sobre soberania e Carta ONU, citando Art. 2(7) e a experiência do Sahel.',
    context: { vector: 'multipolar' },
  },
  {
    id: 's-speech-csnu',
    label: 'Fala: reforma CSNU',
    icon: 'globe-2',
    mode: 'speech',
    query: 'Gere fala-modelo de 60 segundos sobre reforma do CSNU, citando Declaração de Ezulwini e o veto como instrumento.',
    context: { vector: 'reforma_csnu' },
  },
  {
    id: 's-speech-multipolar',
    label: 'Fala: multipolaridade',
    icon: 'network',
    mode: 'speech',
    query: 'Gere fala-modelo de 60 segundos sobre multipolaridade e BRICS+, citando Lavrov e a Declaração SCO.',
    context: { vector: 'multipolar' },
  },
];
