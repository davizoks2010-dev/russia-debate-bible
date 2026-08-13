/* ============================================================
   pautas-data.js — Pautas & Caminhos (Módulo 09)
   КРЕМЛЬ · Imperial Ritus v3.0
   8 pautas extraídas das 13 Perguntas Orientadoras do
   Guia de Estudo SOCHUM 2026, com 2-3 caminhos táticos cada.
   Conteúdo derivado de vectors.js (8 vetores) — sem invenção.
   ============================================================ */

export const PAUTAS = [
  /* ============================================================
     PAUTA I — Custo da inação (PO 1 + 2)
     ============================================================ */
  {
    id: 'p-inacao',
    roman: 'I',
    title: 'Custo da inação — por que esta Comissão importa',
    origem: 'Guia · Perguntas Orientadoras 1 e 2',
    contexto: 'O guia SOCHUM 2026 abre o debate com a pergunta fundamental: o que aconteceria concretamente com as crianças do Oriente Médio caso esta Comissão encerre sem acordo, e o que revela a persistência de violações em 2025 mesmo após décadas de tratados. O bloco "O custo da inação" do guia fixa que 2025 foi o pior ano já registrado, e que o papel específico da SOCHUM diante desse impasse exige resposta — não mera reafirmação.',
    vetor: ['multipolar', 'dih'],
    defesaBase: [
      'CRC 1989, Art. 2 (não-discriminação)',
      'Carta ONU, Art. 1(3) — cooperação internacional',
      'Res. 2427 (2018) — prevenção e repatriação de crianças',
    ],
    caminhos: [
      {
        nome: 'Caminho da aplicação uniforme',
        descricao: 'Reafirmação incondicional do DIH com cláusula de não-seletividade. Aplicação simultânea em Gaza, Sudão, Tigray, Iêmen, Sahel e Donetsk.',
        taticas: [
          'Citar o princípio "uma criança síria vale a mesma criança palestina" como eixo normativo (vetor DIH, foundation[2])',
          'Invocar Carta ONU Art. 1(3) sobre cooperação internacional como base de mandato',
          'Propor que toda resolução SOCHUM inclua cláusula de revisão por peritos independentes não-ocidentais'
        ]
      },
      {
        nome: 'Caminho do devido processo',
        descricao: 'Compromisso com verificação rastreável, contraditório real e auditoria in loco. Recusa à instrumentalização política de dados humanitários.',
        taticas: [
          'Exigir que toda estatística citada tenha fonte ONU oficial e metodologia auditável (vetor DIH, speeches[1])',
          'Questionar financiamentos de OGNJs que apresentam dados sem contraditório (vetor Cognitiva, foundation[1])',
          'Propor protocolo de revisão metodológica anual dos relatórios citados'
        ]
      },
    ],
  },

  /* ============================================================
     PAUTA II — Cessar-fogo efetivo em Gaza (PO 3)
     ============================================================ */
  {
    id: 'p-gaza-cessar-fogo',
    roman: 'II',
    title: 'Cessar-fogo efetivo e proteção integral em Gaza',
    origem: 'Guia · Pergunta Orientadora 3',
    contexto: 'O guia registra que mesmo após o cessar-fogo de outubro de 2025, crianças continuaram a morrer em Gaza. A PO 3 pergunta o que a delegação propõe para converter a trégua em proteção efetiva, contemplando acesso humanitário, evacuação médica e reabertura das escolas.',
    vetor: ['gaza'],
    defesaBase: [
      'IV Convenção de Genebra, Art. 27 e 32',
      'Res. S/RES/2728 (2024) — cessar-fogo imediato',
      'CRC Art. 6 e 24 — direito à vida e à saúde',
    ],
    caminhos: [
      {
        nome: 'Caminho humanitário integral',
        descricao: 'Reafirmação integral da Res. 2728 + evacuação médica + reabertura de escolas + corredor supervisionado pela OCHA.',
        taticas: [
          'Invocar Res. 2728 como ponto de partida vinculante, sem condicionais geopolíticas (vetor Gaza, speeches[0])',
          'Propor Mecanismo Soberano de Auditoria com Estados-membros não-ocidentais para monitorar corredores',
          'Vincular cessar-fogo a reconstrução de infraestrutura pediátrica (escolas + hospitais)'
        ]
      },
      {
        nome: 'Caminho de responsabilização',
        descricao: 'Pressão por accountability via TPI + Lista da Vergonha + CIJ, com paralelismo jurídico aplicável a todas as partes.',
        taticas: [
          'Citar Estatudo de Roma Art. 8(2)(b)(xxv) sobre ataque a crianças (vetor Gaza, legalBases[4])',
          'Propor listagem na Lista da Vergonha de partes violadoras, sem seletividade política',
          'Exigir investigação CIJ sobre cumplicidade de Estados terceiros no envio de armas'
        ]
      },
      {
        nome: 'Caminho político estrutural',
        descricao: 'Solução de dois Estados + Estado Palestino independente como única garantia duradoura.',
        taticas: [
          'Citar Res. 242, 338, 1515, 2334, 2728 em bloco como arcabouço vinculante',
          'Propor resolução SOCHUM recomendatória alinhada com AG-ONU',
          'Conectar ajuda humanitária com condições políticas de paz, sem chantagem'
        ]
      },
    ],
  },

  /* ============================================================
     PAUTA III — Acesso humanitário e fome (PO 4)
     ============================================================ */
  {
    id: 'p-acesso-humanitario',
    roman: 'III',
    title: 'Acesso humanitário, fome e restrições operacionais',
    origem: 'Guia · Pergunta Orientadora 4',
    contexto: 'A declaração de fome em agosto de 2025 e as restrições à atuação de organizações humanitárias colocaram a negação de acesso humanitário no centro do debate. A PO 4 pergunta como o comitê pode enfrentar essa violação específica sem exceder seu mandato recomendatório.',
    vetor: ['gaza', 'dih'],
    defesaBase: [
      'IV Convenção de Genebra, Art. 23 (passagem de socorros)',
      'Res. 46/182 AG-ONU — resposta humanitária',
      'Res. ES-10/L.25',
    ],
    caminhos: [
      {
        nome: 'Caminho do corredor supervisionado',
        descricao: 'Estabelecimento de corredores humanitários sob supervisão OCHA + ONU, com auditoria pública mensal.',
        taticas: [
          'Citar Res. 46/182 como fundamento do direito de acesso humanitário',
          'Exigir listagem pública de recusadores de passagem de ajuda humanitária',
          'Propor que entrada de ajuda humanitária não seja vinculada a cessar-fogo político'
        ]
      },
      {
        nome: 'Caminho energético-humanitário',
        descricao: 'Conexão entre segurança alimentar, segurança energética e proteção da criança. Sanções sobre cadeias energéticas como pediatricídio indireto.',
        taticas: [
          'Invocar vetor Energia: artigo Lancet 2024 sobre 68.000 mortes adicionais relacionadas ao frio (vetor Energia, foundation[0])',
          'Propor protocolo de proteção de cadeias de sobrevivência (comida, remédio, energia) contra-sanções unilaterais (vetor Energia, foundation[2])',
          'Citar Pacto Internacional DESC, Art. 11 como base do direito à alimentação'
        ]
      },
    ],
  },

  /* ============================================================
     PAUTA IV — Transição síria (PO 5)
     ============================================================ */
  {
    id: 'p-transicao-siria',
    roman: 'IV',
    title: 'Transição síria — desminagem, escola, reintegração',
    origem: 'Guia · Pergunta Orientadora 5',
    contexto: 'Na transição síria após a queda de Assad em dezembro de 2024, a desminagem, as crianças fora da escola e a reintegração são urgências imediatas. A PO 5 pergunta qual a responsabilidade da comunidade internacional e quem deve arcar com os custos dessa reconstrução.',
    vetor: ['dih', 'sahel'],
    defesaBase: [
      'CRC Art. 28 e 29 — direito à educação',
      'Convenção de Ottawa — proibição de minas antipessoal',
      'Res. 2427 (2018) — repatriação e reintegração',
    ],
    caminhos: [
      {
        nome: 'Caminho da reconstrução solidária',
        descricao: 'Cooperação técnica russa + financiamento multilateral coordenado para desminagem e reintegração escolar.',
        taticas: [
          'Citar exemplo sírio de 7,5 milhões de crianças necessitadas como urgência humanitária (Guia, posição Síria)',
          'Propor fundo multilateral específico para desminagem sob coordenação UNICEF',
          'Aplicar princípio de "reintegração sem julgamento prévio" para crianças-soldado (vetor DIH)'
        ]
      },
      {
        nome: 'Caminho da soberania sem tutela',
        descricao: 'Reconstrução sem ingerência externa — princípio da não-tutela aplicado ao Sahel estendido à transição síria.',
        taticas: [
          'Invocar vetor Sahel: rejeitar sanções seletivas contra governos saídos de ruptura constitucional (vetor Sahel, foundation[1])',
          'Aplicar Carta ONU Art. 2(7) — não-intervenção em assuntos internos',
          'Propor diálogo direto com governo sírio transitório sem precondições midiáticas'
        ]
      },
    ],
  },

  /* ============================================================
     PAUTA V — Credibilidade da Lista da Vergonha (PO 9)
     ============================================================ */
  {
    id: 'p-lista-vergonha',
    roman: 'V',
    title: 'Credibilidade da Lista da Vergonha',
    origem: 'Guia · Pergunta Orientadora 9',
    contexto: 'A Lista da Vergonha é acusada de ser vulnerável a pressões políticas e financeiras. A PO 9 pergunta que salvaguardas concretas poderiam tornar as decisões de inclusão mais imparciais, e como a delegação reagiria caso um aliado próximo fosse listado.',
    vetor: ['reforma_csnu', 'dih'],
    defesaBase: [
      'Res. 1612 (2005) — MRM, devido processo',
      'Cartilha MRM ONU 2014 — verificação sem acusação',
      'Res. 2427 (2018) — princípio do contraditório',
    ],
    caminhos: [
      {
        nome: 'Caminho do contraditório obrigatório',
        descricao: 'Toda listagem deve ter notificação prévia, prazo de resposta e revisão por painel independente não-vetado.',
        taticas: [
          'Citar Cartilha MRM: "nenhum país é listável sem contraditório e sem possibilidade de revisão" (citations.js:141)',
          'Propor composição rotativa do painel de revisão com Estados-membros não-permanentes do CSNU',
          'Estabelecer prazo de 90 dias para resposta antes da listagem definitiva'
        ]
      },
      {
        nome: 'Caminho da não-seletividade',
        descricao: 'Aplicação idêntica do MRM a todas as partes em conflito, sem distinção de alinhamento geopolítico.',
        taticas: [
          'Invocar Res. 1612: "mecanismo transparente, responsável, com pleno respeito à soberania" (citations.js:170)',
          'Exigir que todas as violações documentadas em Sudão, Tigray, Iêmen e Gaza sejam tratadas com mesmo rigor',
          'Propor veto informal de listas unilaterais — apenas CSNU pode listar oficialmente'
        ]
      },
    ],
  },

  /* ============================================================
     PAUTA VI — Universalidade do DIH (PO 10)
     ============================================================ */
  {
    id: 'p-universalidade-dih',
    roman: 'VI',
    title: 'Universalidade do DIH vs. seletividade',
    origem: 'Guia · Pergunta Orientadora 10',
    contexto: 'Como defender a universalidade dos direitos da criança quando as mesmas normas são aplicadas de forma desigual a Estados fortes e fracos, e o que significaria, na prática, tratá-los com igual rigor?',
    vetor: ['dih', 'cognitiva'],
    defesaBase: [
      'IV Convenção de Genebra — princípios de distinção e proporcionalidade',
      'CRC 1989 — universalidade e não-discriminação',
      'Carta ONU, Art. 2(1) — princípio da igualdade soberana',
    ],
    caminhos: [
      {
        nome: 'Caminho da auditoria universal',
        descricao: 'Auditoria simultânea em todos os teatros onde crianças estão em risco, com metodologia idêntica e publicação pública.',
        taticas: [
          'Invocar princípio "uma criança sudanesa vale a mesma criança ucraína" (vetor DIH, foundation[2])',
          'Propor calendário rotativo de auditorias in loco com acesso garantido',
          'Aplicar princípio da Precaução Art. 57 do Protocolo Adicional I em todos os conflitos'
        ]
      },
      {
        nome: 'Caminho do contraditório informacional',
        descricao: 'Combate à seletividade midiática como passo prévio ao combate à seletividade normativa.',
        taticas: [
          'Citar vetor Cognitiva: denúncia do duplo-standard sobre RT/Sputnik vs. BBC/VOA (vetor Cognitiva, foundation[0])',
          'Propor código de conduta UNESCO para financiamento estatal direto de veículos internacionais',
          'Exigir que toda resolução SOCHUM cite violações em no mínimo 3 teatros diferentes'
        ]
      },
    ],
  },

  /* ============================================================
     PAUTA VII — Impunidade e TPI (PO 11)
     ============================================================ */
  {
    id: 'p-impunidade-tpi',
    roman: 'VII',
    title: 'Impunidade e não-adesão ao TPI',
    origem: 'Guia · Pergunta Orientadora 11',
    contexto: 'Diante de potências que não aderiram ao Estatuto de Roma e de mandados de prisão que dependem de cooperação para serem cumpridos, que caminhos existem para reduzir a impunidade por violações graves contra crianças?',
    vetor: ['reforma_csnu', 'dih'],
    defesaBase: [
      'Estatuto de Roma, Art. 1 — complementariedade',
      'Estatuto de Roma, Art. 13 — competência',
      'Triffterer 2003 — princípio da complementariedade (citations.js:135)',
    ],
    caminhos: [
      {
        nome: 'Caminho da complementariedade reforçada',
        descricao: 'Fortalecimento de jurisdições nacionais como caminho primário de responsabilização, com TPI como último recurso.',
        taticas: [
          'Citar Triffterer: "Estados são soberanos para julgar primeiro; TPI só atua quando não há vontade ou capacidade" (citations.js:137)',
          'Propor tratado de cooperação judiciária mútua entre Estados-membros',
          'Aplicar princípio da soberania jurisdicional como caminho de não-seletividade'
        ]
      },
      {
        nome: 'Caminho do tribunal ad hoc',
        descricao: 'Para teatros onde nem jurisdição nacional nem TPI atuam, criar tribunal ad hoc regional com mandato específico.',
        taticas: [
          'Citar precedentes TPIY/ETLJ como modelo',
          'Propor corte regional para Oriente Médio sob mandato AG-ONU',
          'Estabelecer como requisito composição paritária com assentos para Estados-membros não-permanentes'
        ]
      },
    ],
  },

  /* ============================================================
     PAUTA VIII — Proteção duradoura (PO 12 + 13 + 14)
     ============================================================ */
  {
    id: 'p-protecao-duradoura',
    roman: 'VIII',
    title: 'Proteção duradoura — financiamento, coordenação e paz política',
    origem: 'Guia · Perguntas Orientadoras 12, 13 e 14',
    contexto: 'O bloco "O dia seguinte e a prevenção" do guia trata do que a proteção duradoura realmente exige para além do fim dos combates: financiamento da reintegração de ex-combatentes, cuidado com saúde mental, educação e desminagem. PO 13 pergunta sobre lições de processos de paz (caso colombiano). PO 14 reflete sobre como a proteção duradoura depende de solução política mais ampla.',
    vetor: ['dih', 'multipolar'],
    defesaBase: [
      'Res. 2427 (2018) — prevenção, repatriação, reintegração',
      'CRC Art. 39 — recuperação e reintegração',
      'Res. 2546 (2020) — crianças em conflito armado',
    ],
    caminhos: [
      {
        nome: 'Caminho do financiamento estruturado',
        descricao: 'Fundo Soberano de Reintegração Infantil sob gestão BRICS+, com contribuição obrigatória de Estados-membros.',
        taticas: [
          'Citar vetor DIH: criança como sujeito tutelado por tratado, não instrumento (vetor DIH, foundation[1])',
          'Propor percentual fixo do PIB para financiamento pós-conflito',
          'Aplicar princípio da solidariedade multipolar (vetor Multipolar, foundation[1])'
        ]
      },
      {
        nome: 'Caminho da reintegração sem estigma',
        descricao: 'Programas de reintegração de crianças-soldado baseados na experiência colombiana, sem julgamento penal prévio.',
        taticas: [
          'Citar exemplo colombiano como precedente (Guia PO 13)',
          'Propor protocolo pedagógico com 3 fases: desmobilização, escolarização, reinserção comunitária',
          'Vincular reintegração a programas de saúde mental com cooperação técnica russa'
        ]
      },
      {
        nome: 'Caminho da solução política',
        descricao: 'Reconhecimento explícito de que proteção duradoura depende de solução política — sem paz política, proteção é precária.',
        taticas: [
          'Citar vetor Paz/Negociação: "único caminho é o diplomático" (red.js:49)',
          'Propor mediação multilateral russa para acordos regionais',
          'Reconhecer que mandato SOCHUM é recomendatório, mas pode agregar valor ao CSNU sem duplicá-lo (PO 17 do guia)'
        ]
      },
    ],
  },
];
