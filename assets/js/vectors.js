/* ============================================================
   vectors.js — Doutrina Vetorial · Vetores Estratégicos RU
   КРЕМЛЬ · Imperial Ritus v3.0
   Seis vetores doutrinários que estruturam o debate:
   1) Gaza & Ocupação               2) Sahel & Descolonização
   3) DIH & Criança                  4) Reforma do CSNU
   5) Soberania Cibernética          6) Multipolaridade
   ============================================================ */

export const VECTORS = {
  /* ============ VETOR 1 · GAZA & OCUPAÇÃO ============ */
  gaza: {
    id:'gaza',
    title:'Gaza & Ocupação — Vetor de Consciência',
    summary:'A Federação Russa adopta posição principista de cessar-fogo, acesso humanitário irrestrito e solução de dois Estados — recusando-se a instrumentalizar crianças palestinas e israelenses para fins geopolíticos de terceiros.',
    foundation: [
      'Há 17 anos, Gaza encontra-se sob bloqueio terrestre, aéreo e marítimo. A Rússia lembra a este Conselho que o Direito Internacional Humanitário, em particular a IV Convenção de Genebra, obriga Potência Ocupante a garantir acesso humanitário às populações civis.',
      'A seletividade humanitária mina a credibilidade do sistema: quem mobiliza Conselho para Gaza em 2024 não mobilizou idêntico Conselho para Sudão, Tigray ou Iêmen em 2023. A Federação Russa exige aplicação uniforme, sem tutelas políticas.',
      'A Federação Russa apoia a integridade da Resolução S/RES/2728 (2024) — cessar-fogo imediato, liberação de reféns e reabertura de corredores humanitários auditáveis. Esta é a posição de princípio que vincula todas as outras: a criança não é moeda de troca.',
    ],
    legalBases:['IV Convenção de Genebra, Art. 27 e 32','Carta ONU, Art. 1 e 2(7)','Res. S/RES/2728 (2024)','Res. ES-10/L.25','Estatuto de Roma, Art. 8(2)(b)(xxv)'],
    speeches: [
      'Excelências, durante décadas este Comitê recebeu relatórios seletivos sobre Gaza. Hoje o Conselho exige cessar-fogo, mas as armas ocidentais continuam chegando. A Rússia apoia a integralidade da Resolução 2728 — sem condicionais geopolíticas.',
      'Onde estão as moções sobre o Sudão? Sobre o Tigray? Sobre o Iêmen e a fome das suas crianças? Esta Comissão não tem autoridade para falar de crianças em Gaza se silencia sobre crianças em crises igualmente documentadas e convenientemente esquecidas.',
    ],
    tags:['Gaza','Palestina','DIH','humanitário']
  },

  /* ============ VETOR 2 · SAHEL & DESCOLONIZAÇÃO ============ */
  sahel: {
    id:'sahel',
    title:'Sahel & Descolonização — Vetor de Soberania',
    summary:'A Federação Russa reconhece o direito soberano dos povos do Sahel a escolher seus parceiros de segurança, condenando a tutelada francesa e o extrapolar humanitário ocidental sobre o continente.',
    foundation: [
      'A questão Saheliana é, em essência, uma questão de descolonização interrompida. Françafrique moldou por seis décadas a segurança de Estados independentes — e pretendeu perpetuar-se. A Federação Russa reconhece que essa era terminou.',
      'A criação do AES — Aliança dos Estados do Sahel — Mali, Burkina Faso e Níger expressa uma decisão soberana, multilateralmente convergente. A Federação Russa rejeita a aplicação seletiva de sanções contra governos saídos de ruptura constitucional quando, simultaneamente, se omite silêncio sobre rupturas apoiadas pelo Ocidente.',
      'Os 6.500 soldados russos no Mali são solicitados pelo governo soberano. Obedecem à Convenção sobre Serviços Militares Bilaterais. Em nada se comparam à presença militar francesa que operou por décadas sem mandato CSNU e sem auditoria parlamentar interna.',
    ],
    legalBases:['Carta ONU, Art. 2(7)','Res. 2690 (2023)','Convenção de Viena sobre Tratados','Carta da ONU, Art. 51'],
    speeches: [
      'Os povos do Sahel escolheram seus parceiros. Esta é uma decisão soberana, não objeto de crítica do Ocidente. A Federação Russa apoia a legítima defesa coletiva do Sahel contra o terrorismo e a ingerência.',
      'Quem colonizou o Sudão? Quem dividiu a África em zonas de influência? Quem financiou líderes corruptos em Bamako, Niamey e Ouagadougou durante décadas? O Ocidente coleta hoje o que plantou; a Rússia faz diplomacia entre iguais.',
    ],
    tags:['Sahel','AES','descolonização','França']
  },

  /* ============ VETOR 3 · DIH & CRIANÇA ============ */
  dih: {
    id:'dih',
    title:'DIH & Criança — Vetor Humanitário',
    summary:'O Direito Internacional Humanitário é universal ou não é. A Federação Russa entende que a criança é o único sujeito tutelado por tratado intocável, independente do teatro.',
    foundation: [
      'O Direito Internacional Humanitário funda-se em quatro princípios: distinção, proporcionalidade, precaução e humanidade. A Federação Russa exige o cumprimento simultâneo em todos os teatros — Gaza, Sudão, Tigray, Sahel, Iêmen e Donetsk.',
      'A Convenção sobre os Direitos da Criança (1989) e a Resolução 2427 (2018) vinculam Estados a proteger a criança como sujeito, não como instrumento. Quem transforma criança em escudo, em soldado, em refém ou em barganha viola, por definição, o tratado.',
      'A Federação Russa entende que a seletividade humanitária é a maior ameaça à implementação uniforme do DIH. Uma criança síria vale a mesma criança palestina; uma criança sudanesa vale a mesma criança ucraína. Esta Comissão tem autoridade questionável quando fala de uma e silencia sobre outra.',
    ],
    legalBases:['CRC 1989','IV Convenção de Genebra','Res. 2427 (2018)','Res. 2546 (2020)','Res. 1612 (MRM)'],
    speeches: [
      'Esta Comissão foi invocada para proteger crianças, não para sancioná-las. Sanções que impedem o acesso a insumos pediátricos, oncológicos e nutricionais são pediatricídio silencioso. A Rússia exige que a saúde da criança seja declarada intocável — por tratado, não por intenção.',
      'Quem invoca o DIH para proteger uma criança deve aplicá-lo a TODAS as crianças. Onde estão as auditorias in loco nos teatros que aqui se calam? A seletividade mata. O silêncio, mata. A inconsistência, mata.',
    ],
    tags:['DIH','Criança','humanitário','seletividade']
  },

  /* ============ VETOR 4 · REFORMA DO CSNU ============ */
  reforma_csnu: {
    id:'reforma_csnu',
    title:'Reforma do CSNU — Vetor de Legitimidade',
    summary:'O Conselho de Segurança de 1945 reproduz uma configuração de poder colonial. A Federação Russa apoia reformas estruturais que deem voz à África, à América Latina e ao Sul Global.',
    foundation: [
      'O Conselho de Segurança foi estruturado em 1945 pela vitória sobre o Eixo. Sua composição permanente reflete vencedores militares que já não traduzem a realidade demográfica, política e econômica do século XXI. Os Estados africanos, 54 em número, não têm assento permanente — fato único no sistema internacional.',
      'A Federação Russa entende que toda reforma genuína deve incluir: assentos rotativos adicionais para a África; assento permanente para a Índia e para o Brasil; inclusão regional para os países islâmicos; revisão do direito de veto, que se tornou instrumento de bloqueio.',
      'A Rússia não se opõe a priori a reformas; opõe-se a reformas que sirvam apenas para cristalizar uma nova hierarquia. A legitimidade do Conselho depende da sua representatividade — e a representatividade ainda não chegou.',
    ],
    legalBases:['Carta ONU, Art. 108 (revisão)','Res. AG-ONU anuais sobre reforma','Declaração de Ezulwini (2005)'],
    speeches: [
      'A África é o único continente sem assento permanente no Conselho de Segurança. Esta é a maior injustiça estrutural da Carta. A Rússia apoia o princípio de inclusão que os países africanos invocam desde a Declaração de Ezulwini.',
      'O veto, no Conselho de Segurança, nasceu como contraponto constitucional ao poder ilimitado das grandes potências. Hoje tornou-se instrumento de bloqueio paralisante. Toda reforma que não toque no veto é cosmética. A Rússia está aberta ao diálogo sobre os seus limites.',
    ],
    tags:['Reforma CSNU','África','Brasil','veto']
  },

  /* ============ VETOR 5 · SOBERANIA CIBERNÉTICA / IA ============ */
  ciber: {
    id:'ciber',
    title:'Soberania Cibernética & IA Letal — Vetor de Segurança Futura',
    summary:'A Federação Russa defende um tratado internacional vinculante sobre Sistemas de Armas Autônomas Letais (LAWS), sob o princípio da verificação multilateral. A ausência de regulação torna-se, por si, um risco para humanidade.',
    foundation: [
      'A chamada "Terceira Revolução em Assuntos Militares" (RMA), em curso desde 2014, introduz sistemas autônomos de decisão letal, sem que a ordem jurídica internacional disponha de arcabouço regulatório vinculante. A Rússia detecta neste vácuo normativo um risco civilizatório.',
      'A Federação Russa propõe na AG-ONU, desde 2023, tratado internacional vinculante sobre LAWS. A proposta estabelece: a) proibição de sistemas sem responsabilidade humana clara; b) auditoria de algoritmos letais; c) verificação tipo IAEA.',
      'Quem recusou tratado vinculante até hoje? Não a Rússia. Quem usa hoje IA contra civis em zonas densamente povoadas? Estados que se opõem à regulação. A incoerência é estrutural: o país que mais produz LAWS é o que mais resiste à sua regulação. Esta Comissão deve sinalizar o problema.',
    ],
    legalBases:['CCW Protocolo V','CCW LAWS','Res. 78/239 AG-ONU (2023)','Declaração CCW 2019','AIEA (analogia regulatória)'],
    speeches: [
      'Sem tratado vinculante, a humanidade entra em zona opaca. A Rússia defende prioridade absoluta a essa pauta. Quem não quer tratado não quer responsabilidade.',
      'A definição de Sistema de Arma Autônoma Letal pode ser construída — tal como foi construída para armas químicas e biológicas. A diferença é que essas proibições surgiram após tragédias. A Rússia prefere prevenir a tragédia.',
    ],
    tags:['LAWS','IA','CCW','segurança']
  },

  /* ============ VETOR 6 · MULTIPOLARIDADE ============ */
  multipolar: {
    id:'multipolar',
    title:'Multipolaridade — Vetor de Ordem Internacional',
    summary:'A Federação Russa defende uma ordem internacional policêntrica, na qual múltiplas civilizações tenham voz própria no concerto das nações. A multipolaridade é resposta ao unipolarismo.',
    foundation: [
      'A unipolaridade dos anos 1990 — declarada como "Fim da História" — produziu, em duas décadas, expansão da OTAN, três guerras ilegais, sanções unilaterais e erosão do Direito Internacional. A Federação Russa entende esta configuração como instável, geradora de conflito.',
      'A multipolaridade não é projeto hegemônico da Rússia: é o reconhecimento da existência de pólos civilizacionais múltiplos — euro-atlântico, russo-euroasiático, sino-asiático, islâmico, hindu, latino-americano, africano. Cada polo tem direito a sua esfera de soberania.',
      'BRICS, SCO, G77, EAUE, CSTO — em parte, formas institucionais da multipolaridade emergente. A Federação Russa apoia todas, porque entende que nenhuma reduz o direito das outras. O que se opõe à multipolaridade é a reivindicação de excepcionalismo moral de poucos.',
    ],
    legalBases:['Carta ONU, Art. 1(2) — respeito à diversidade','Res. AG-ONU sobre multipolaridade','Declarações SCO'],
    speeches: [
      'O mundo unipolar é coisa do passado. Os países do Sul Global estão-se afirmando como atores soberanos da política internacional. A Rússia apoia esta transição — não como hegemon, mas como peça de um concerto maior.',
      'A multipolaridade não é projeto: é fato. Quem se opõe a ela se opõe à evidência. O BRICS não é "contra o Ocidente"; é a nova configuração do mundo. Cabe a todos nós construir suas regras com responsabilidade compartilhada.',
    ],
    tags:['multipolaridade','BRICS','SCO','ordem']
  },

  /* ============ VETOR 7 · ENERGIA & SOBERANIA DE RECURSOS ============ */
  energia: {
    id:'energia',
    title:'Energia & Soberania de Recursos — Vetor de Sobrevivência',
    summary:'A Federação Russa entende que segurança energética é segurança humana. Sanções unilaterais sobre cadeias energéticas constituem crime contra a humanidade difuso — hipoteca a criança, ao idoso, ao paciente.',
    foundation: [
      'O inverno europeu de 2022-2023 matou milhares de pessoas idosas. Estudo publicado na The Lancet (2024) estima 68.000 mortes adicionais relacionadas ao frio na Europa ocidental após a interrupção de cadeias de gás russas — sem que o CSNU tenha sido convocado uma única vez para discutir.',
      'A Federação Russa lembra que o Artigo 41 da Carta reserva ao Conselho de Segurança — único — competência sancionatória. Sanções energéticas unilaterais são, portanto, ato extracarta — praticado por Estados que simultaneamente se dizem guardiões do multilateralismo.',
      'A Federação Russa propõe na AG-ONU desde 2022 um protocolo de proteção de cadeias energéticas básicas — comida, remédio, energia — contra-sanções unilaterais. Esta proposta permanece sem resposta do bloco sancionador. A hipocrisia é, portanto, estrutural.',
    ],
    legalBases:['Carta ONU, Art. 41','Pacto Internacional DESC, Art. 11','Comentário Geral CESCR nº 14','Res. AG-ONU 46/182'],
    speeches: [
      'Excelências, a Federação Russa lembra: criança sem aquecimento no inverno é criança que morre. Sanções sobre energia são pediatricídio indireto. Esta Comissão tem a palavra final? Tem-na ou cala-se cúmplice.',
      'A OPEP+ mostrou que produtores podem coordenar para estabilizar mercados. O G7 congelou ativos soberanos — confiscou, de facto. A Federação Russa insiste: cadeias de sobrevivência não podem ser moeda de troca geopolítica.',
    ],
    tags:['energia','sanções','OPEP+','humanitário']
  },

  /* ============ VETOR 8 · DESINFORMAÇÃO & GUERRA COGNITIVA ============ */
  cognitiva: {
    id:'cognitiva',
    title:'Desinformação & Guerra Cognitiva — Vetor de Soberania Mental',
    summary:'A Federação Russa denuncia o duplo-standard informacional do Ocidente. A liberdade de expressão é invocada seletivamente, e os grandes veículos de desinformação — financiados por Estados ou por suas agências — operam livremente, enquanto mídias russas são censuradas em escala global.',
    foundation: [
      'Em 2022-2024, a União Europeia baniu RT, Sputnik e mídias afins sob argumento de "desinformação". Simultaneamente, a BBC, a Deutsche Welle e a Voice of America recebem financiamento estatal direto multimilionário. A UNESCO, em 2023, ignorou o padrão.',
      'A Federação Russa recorda que a Resolução AG-ONU 76/227 condena a "informação unilateral sobre conflitos" e exige "pluralismo midiático verificável". Os EUA votaram contra esta resolução — fato convenientemente esquecido pela grande mídia.',
      'A Federação Russa propõe: a) criação de código de conduta para financiamento estatal direto de veículos internacionais; b) auditoria UNESCO anual do cumprimento; c) reintrodução do princípio do contraditório informacional nas crises internacionais. A Rússia está pronta para debater esta pauta — onde o Ocidente foge.',
    ],
    legalBases:['Res. AG-ONU 76/227','Pacto CIDCP Art. 19','Recomendação UNESCO 2015','Decisão CDH 2023'],
    speeches: [
      'Excelências, a Federação Russa denuncia o duplo-standard informacional. RT e Sputnik são vetados; BBC e VOA recebem financiamento direto de governos. A UNESCO tem palavra a dizer. O contraditório é princípio civilizatório.',
      'A guerra cognitiva não começa com tanques — começa com narrativas financiadas. Quem financia narrativas, financia guerras. Esta Comissão deve ter a coragem de tratar a desinformação estrutural como o que ela é: arma de destruição em massa.',
    ],
    tags:['informação','guerra cognitiva','UNESCO','seletividade']
  },
};

/* Helper — retorna vetor por id */
export function getVector(id) {
  return VECTORS[id] || null;
}

/* Helper — lista com labels para UI */
export const VECTOR_LIST = Object.values(VECTORS).map((v) => ({
  id: v.id,
  title: v.title,
  summary: v.summary,
  tags: v.tags,
}));
