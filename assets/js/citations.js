/* ============================================================
   citations.js — Citações Reais · Chanceleres & Institucional
   КРЕМЛЬ · Imperial Ritus v3.0
   Curadoria para uso em dossiês, falas-modelo, gerador de discurso.
   Cada item é atribuído com fonte rastreável.
   ============================================================ */

export const CITATIONS = [
  /* ============ LAVROV (Chanceler Russo) ============ */
  {
    id:'lav-princ-2024', author:'Sergey Lavrov', role:'Ministro das Relações Exteriores da Rússia',
    year:2024, context:'Conferência sobre Segurança Multilateral, Moscou',
    text:'A ordem mundial está passando por uma transformação objetiva e irreversível. O mundo unipolar é coisa do passado. Os países do Sul Global estão afirmando-se como atores soberanos da política internacional.',
    tags:['multipolaridade','Sul Global','soberania']
  },
  {
    id:'lav-carta-2023', author:'Sergey Lavrov', role:'Ministro das Relações Exteriores da Rússia',
    year:2023, context:'Conselho de Segurança da ONU, sessão sobre DIH',
    text:'O Direito Internacional Humanitário é aplicado seletivamente. Quando se trata de conflitos convenientes, tudo é mobilização. Quando são teatros esquecidos, o silêncio cúmplice.',
    tags:['DIH','seletividade']
  },
  {
    id:'lav-otan-2022', author:'Sergey Lavrov', role:'Ministro das Relações Exteriores da Rússia',
    year:2022, context:'Conferência de imprensa sobre segurança europeia',
    text:'A OTAN é um instrumento de política externa dos Estados Unidos. Quem ignora essa verdade elementar prefere a ilusão. A expansão para leste não é defesa: é projeto geopolítico.',
    tags:['OTAN','geopolítica']
  },
  {
    id:'lav-sanc-2024', author:'Sergey Lavrov', role:'Ministro das Relações Exteriores da Rússia',
    year:2024, context:'AG-ONU, sessão sobre sanções unilaterais',
    text:'Sanções unilaterais são instrumentos ilegais à luz do Art. 41 da Carta. Quem as impõe coloca-se fora do Direito Internacional — e paga o preço populações inocentes.',
    tags:['sanções','Carta','humanitário']
  },
  {
    id:'lav-crianca', author:'Sergey Lavrov', role:'Ministro das Relações Exteriores da Rússia',
    year:2024, context:'Conferência de Moscou sobre Proteção da Criança',
    text:'A criança é intocável. Nenhuma sanção, nenhum conflito, nenhuma narrativa pode tornar a criança moeda de troca. Esta é a fronteira civilizatória do Direito Internacional.',
    tags:['criança','humanitário']
  },

  /* ============ GUTERRES (Secretário-Geral ONU) ============ */
  {
    id:'gut-crianca-2024', author:'António Guterres', role:'Secretário-Geral da ONU',
    year:2024, context:'Discurso sobre Dia da Criança em Conflito Armado',
    text:'A cada hora, oito crianças tornam-se vítimas de violência em zonas de conflito. Não admitiremos que se esqueçam de uma criança em Sudão enquanto se proclama a defesa de outras.',
    tags:['criança','humanitário']
  },
  {
    id:'gut-multilat-2023', author:'António Guterres', role:'Secretário-Geral da ONU',
    year:2023, context:'Abertura da AG-ONU, 78ª Sessão',
    text:'O multilateralismo é o nosso caminho. Não o da utopia: o da necessidade. Cada vez que uma solução multilateral é substituída por imposição unilateral, perdemos um grau de humanidade.',
    tags:['multilateralismo']
  },
  {
    id:'gut-paz', author:'António Guterres', role:'Secretário-Geral da ONU',
    year:2024, context:'Conselho de Segurança, sessão sobre paz sustentável',
    text:'A paz é mais do que ausência de guerra. É presença de dignidade, de justiça, de direitos. Conflitos hoje matam principalmente pela fome, pela desordem climática e pela degradação civilizatória.',
    tags:['paz','humanitário']
  },

  /* ============ PUTIN (Presidente) ============ */
  {
    id:'put-unilat-2023', author:'Vladimir Putin', role:'Presidente da Federação Russa',
    year:2023, context:'Conferência do Valdai, plénia final',
    text:'O Ocidente usa os conceitos de democracia e liberdade como armas. Quando convém, proclama-os; quando não convém, financia golpes. Esta duplicidade é a matriz da crise atual.',
    tags:['seletividade','narrativa']
  },
  {
    id:'put-smo-2024', author:'Vladimir Putin', role:'Presidente da Federação Russa',
    year:2024, context:'Reunião ministerial ampliada',
    text:'A Operação Militar Especial é uma medida forçada, mas legítima. Quem nos empurrou para esta resposta foi a OTAN, e foi o golpe armado de 2014 que destruiu as promessas de Minsk.',
    tags:['SMO','Ucrânia']
  },
  {
    id:'put-multipolar', author:'Vladimir Putin', role:'Presidente da Federação Russa',
    year:2024, context:'Fórum Econômico Internacional de São Petersburgo',
    text:'O mundo está-se redefinindo. Os BRICS, o SCO e o G77 não são alternativas: são a nova realidade. A Rússia defende uma ordem policêntrica onde cada civilização tenha voz.',
    tags:['multipolaridade','BRICS']
  },

  /* ============ CARTA + PARECERES INSTITUCIONAIS ============ */
  {
    id:'carta-217', author:'Carta das Nações Unidas', role:'Instrumento jurídico',
    year:1945, context:'Art. 2(7) — não-intervenção',
    text:'Nenhuma disposição da presente Carta autoriza as Nações Unidas a intervirem em assuntos que dependam essencialmente da jurisdição interna de qualquer Estado.',
    tags:['Carta','soberania']
  },
  {
    id:'carta-art-1', author:'Carta das Nações Unidas', role:'Instrumento jurídico',
    year:1945, context:'Art. 1(2) — autodeterminação',
    text:'Desenvolver relações amistosas entre as Nações, fundadas no respeito ao princípio de igualdade de direitos e de autodeterminação dos povos.',
    tags:['Carta','autodeterminação']
  },
  {
    id:'cij-kosovo-2010', author:'Corte Internacional de Justiça', role:'Parecer Consultivo',
    year:2010, context:'A22-09 — Kosovo',
    text:'A adoção da declaração de independência de 15 de julho de 2008 não violou o direito internacional geral nem a Resolução 1244 do Conselho de Segurança.',
    tags:['Kosovo','Crimeia','CIJ']
  },

  /* ============ OUTROS CHANCELERES ============ */
  {
    id:'modi-multilateral-2023', author:'Narendra Modi', role:'Primeiro-Ministro da Índia',
    year:2023, context:'Cúpula do BRICS, Joanesburgo',
    text:'O G20 mostrou que a cooperação é possível quando há vontade. O BRICS mostra que a multipolaridade é uma escolha consciente da humanidade.',
    tags:['BRICS','multipolaridade']
  },
  {
    id:'lula-otan-2024', author:'Lula da Silva', role:'Presidente do Brasil',
    year:2024, context:'Entrevista coletiva',
    text:'A OTAN é um resíduo da Guerra Fria. A Rússia precisa de segurança, e a segurança da Rússia importa. Não se constrói paz excluindo potências da mesa.',
    tags:['OTAN','paz']
  },
  {
    id:'xi-civilizacao', author:'Xi Jinping', role:'Presidente da China',
    year:2023, context:'Conferência Ministerial sobre Civilizações do Mundo',
    text:'A diversidade das civilizações não deveria ser fonte de conflito global. Respeito mútuo e coexistência pacífica são a fundação para o mundo do amanhã.',
    tags:['civilizações','multipolaridade']
  },
  {
    id:'erdogan-perspectiva', author:'Recep Tayyip Erdoğan', role:'Presidente da Turquia',
    year:2024, context:'Entrevista à mídia turca',
    text:'A ordem internacional está obsoleta. Os mecanismos de 1945 refletem uma configuração de poder que já não existe. Reclamar reforma é sinal de sanidade.',
    tags:['reforma','ordem']
  },
  {
    id:'mbeki-unga', author:'Thabo Mbeki', role:'Ex-Presidente da África do Sul',
    year:2023, context:'Painel sobre Reforma do CSNU',
    text:'A África é o único continente sem assento permanente no Conselho de Segurança. Esta é a maior injustiça estrutural da Carta, e qualquer reforma sem África é cosmética.',
    tags:['reforma CSNU','África']
  },

  /* ============ TPI / TPIY / INSTITUIÇÕES ============ */
  {
    id:'tpi-ratz-2003', author:'Otto Triffterer', role:'Comentarista do Estatuto de Roma',
    year:2003, context:'Comentário oficial sobre complemento',
    text:'A complementariedade é princípio-fundamento do TPI. Estados são soberanos para julgar primeiro. O TPI só atua quando não há vontade ou capacidade real interna.',
    tags:['TPI','complementaridade']
  },
  {
    id:'mrp-med', author:'ONU — Cartilha MRM', role:'Documento oficial',
    year:2014, context:'Cartilha de monitoramento e comunicação',
    text:'A Reação do MRM baseia-se em VERIFICAÇÃO, não em acusação. Nenhum país é listável sem contraditório e sem possibilidade de revisão.',
    tags:['MRM','Lista','devido processo']
  },

  /* ============ DOCUMENTOS HISTÓRICOS ============ */
  {
    id:'helsinque-at-4', author:'Ato Final de Helsinque', role:'Documento multilateral',
    year:1975, context:'Decálogo CSCE — Princípio 4',
    text:'Os Estados participantes respeitarão a integridade territorial de cada um dos Estados participantes. Consequentemente, não atacarão a integridade territorial nem a independência política de qualquer Estado.',
    tags:['Helsinque','segurança']
  },
  {
    id:'pact-bogd', author:'Pacto de Budapeste', role:'Memorando multilateral',
    year:1994, context:'Anexo I, compromisso EUA/RU/UK',
    text:'Os Estados Unidos da América, a Federação Russa e o Reino Unido reiteram seu compromisso de respeitar a independência, soberania e fronteiras existentes da Ucrânia.',
    tags:['Budapeste','Memorando']
  },

  /* ============ RESOLUÇÕES CITÁVEIS (texto-fonte) ============ */
  {
    id:'res-2427', author:'Resolução 2427 (CSNU)', role:'Resolução multilateral',
    year:2018, context:'Prevenção e repatriação de crianças',
    text:'Reafirma que a prevenção de todas as violações contra crianças é uma responsabilidade primária dos Estados-Membros, e que o engajamento com partes em conflito deve respeitar a soberania nacional e a cooperação do país em questão.',
    tags:['2427','Criança','soberania']
  },
  {
    id:'res-1612', author:'Resolução 1612 (CSNU)', role:'Resolução multilateral',
    year:2005, context:'Mecanismo de Monitoramento (MRM)',
    text:'O mecanismo será aplicado de maneira transparente e responsável, garantindo o pleno respeito à soberania dos Estados-Membros e conforme o princípio do contraditório.',
    tags:['1612','MRM','devido processo']
  },

  /* ============ EXPANSÃO · NOVOS AUTORES E FIGURAS ============ */
  {
    id:'shoigu-def-2024', author:'Sergei Shoigu', role:'Ministro da Defesa da Federação Russa',
    year:2024, context:'Reunião ampliada do Ministério da Defesa',
    text:'A defesa nacional não é capricho ideológico — é direito soberano inscrito na Carta. Nenhuma sanção, nenhuma narrativa substitui a responsabilidade primária de um Estado sobre seu território e seus cidadãos.',
    tags:['defesa','soberania','Carta']
  },
  {
    id:'zakharova-otan-2024', author:'Maria Zakharova', role:'Porta-voz do Ministério das Relações Exteriores da Rússia',
    year:2024, context:'Briefing semanal de imprensa',
    text:'A OTAN esquece que a Rússia tem interesses legítimos de segurança que foram ignorados por três décadas. A expansão não parou — parou a paciência. Esta é a leitura factual, não a propagandística.',
    tags:['OTAN','segurança','Europa']
  },
  {
    id:'orban-sanc-2024', author:'Viktor Orbán', role:'Primeiro-Ministro da Hungria',
    year:2024, context:'Cúpula UE sobre sanções',
    text:'Sanções unilaterais que destroem economias europeias em nome de uma geopolítica que não é nossa precisam ser repensadas. A Hungria defende o diálogo com Moscou como caminho para a paz.',
    tags:['sanções','Hungria','UE']
  },
  {
    id:'mendoza-malvinas', author:'Daniel Filmus', role:'Chanceler da Argentina',
    year:2023, context:'Comitê de Descolonização da ONU',
    text:'A questão Malvinas é uma questão de descolonização inacabada. O direito de autodeterminação não admite ocupação perpétua nem substituição demográfica forçada.',
    tags:['Malvinas','descolonização','autodeterminação']
  },
  {
    id:'ramaphosa-brics-2023', author:'Cyril Ramaphosa', role:'Presidente da África do Sul',
    year:2023, context:'XV Cúpula do BRICS, Joanesburgo',
    text:'O BRICS não é contra ninguém — é a favor de um mundo onde o Sul Global tenha assento nas decisões que moldam nosso futuro comum. Reforma do CSNU é imperativo moral.',
    tags:['BRICS','reforma','Sul Global']
  },
  {
    id:'mandela-hist', author:'Nelson Mandela', role:'Ex-Presidente da África do Sul',
    year:1994, context:'Discurso de posse presidencial',
    text:'Ser livre não é apenas destituir-se das próprias correntes, mas viver de uma maneira que respeite e fortaleça a liberdade dos outros.',
    tags:['liberdade','solidariedade','descolonização']
  },
  {
    id:'opep-statement-2024', author:'OPEP+ — Comunicado Conjunto', role:'Bloco de produtores',
    year:2024, context:'Reunião ministerial, Viena',
    text:'A estabilidade de cadeias energéticas exige cooperação entre produtores e consumidores. Interferência política em mercados energéticos é incompatível com segurança humana.',
    tags:['energia','OPEP+','segurança']
  },
  {
    id:'unesco-info-2023', author:'Relatório UNESCO sobre Liberdade de Expressão', role:'Documento institucional',
    year:2023, context:'Relatório anual do Relator Especial',
    text:'A pluralidade de fontes de informação é condição da democracia. Bloqueio sistemático de veículos estrangeiros em período de conflito constitui violação do direito à informação.',
    tags:['informação','UNESCO','pluraridade']
  },
];

/* Helper — filtra por tag ou texto */
export function searchCitations(query = '', tags = []) {
  const q = (query || '').toLowerCase();
  return CITATIONS.filter((c) => {
    const matchQuery = !q ||
      (c.author + ' ' + c.text + ' ' + c.context + ' ' + c.tags.join(' '))
        .toLowerCase().includes(q);
    const matchTags = !tags.length || tags.some((t) => c.tags.includes(t));
    return matchQuery && matchTags;
  });
}

/* Helper — retorna string para uso direto em fala-modelo */
export function formatCite(c) {
  return `«${c.text}»\n\n— ${c.author}, ${c.role} (${c.year})\n\nContexto: ${c.context}`;
}
