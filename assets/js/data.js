/* ============================================================
   data.js — Banco diplomático КРЕМЛЬ
   КРЕМЛЬ · v2.0 — Inteligência + Arsenal + Escudo + Gen Builder
   ============================================================ */

export const DATA = {
  /* ==========  RESOLUÇÕES CITÁVEIS  ========== */
  resolutions: [
    { code: 'Res. 1261 (1999)',  desc: 'Crianças em conflitos armados' },
    { code: 'Res. 1612 (2005)',  desc: 'Mecanismo de Monitoramento (MRM)' },
    { code: 'Res. 1820 (2008)',  desc: 'Violência sexual em conflitos' },
    { code: 'Res. 1882 (2009)',  desc: 'Crianças em hostilidades' },
    { code: 'Res. 1998 (2011)',  desc: 'Ataques a escolas e hospitais' },
    { code: 'Res. 2068 (2012)',  desc: 'Crianças-Soldado' },
    { code: 'Res. 2143 (2014)',  desc: 'Proteção ampliada' },
    { code: 'Res. 2225 (2015)',  desc: 'Proteção de civis' },
    { code: 'Res. 2427 (2018)',  desc: 'Prevenção e repatriação' },
    { code: 'Res. 2546 (2020)',  desc: 'COVID-19 + proteção' },
    { code: 'Res. ES-11/1',      desc: 'AG-ONU sobre agressão à Ucrânia' },
    { code: 'Res. ES-10/L.25',   desc: 'Autodeterminação palestina' },
    { code: 'Res. 2202 (2015)',  desc: 'Minsk-2 — endosso CSNU' },
    { code: 'Res. 2254 (2015)',  desc: 'Processo político sírio' },
    { code: 'Res. S/RES/2728',   desc: 'Cessar-fogo Gaza (2024)' },
    { code: 'Res. 68/262',       desc: 'Integridade territorial — Crimeia' },
    { code: 'IV Conv. Genebra',  desc: 'Proteção de Civis (1949)' },
    { code: 'CRC 1989',          desc: 'Convenção dos Direitos da Criança' },
    { code: 'Estatuto de Roma',  desc: 'TPI — complementaridade' },
    { code: 'Carta ONU Art. 1',  desc: 'Autodeterminação dos povos' },
    { code: 'Carta ONU Art. 2',  desc: 'Não-intervenção' },
    { code: 'Carta ONU Art. 51', desc: 'Legítima defesa' },
    { code: 'Helsinque 1975',    desc: 'Indivisibilidade da segurança' },
    { code: 'Parecer CIJ 2010',  desc: 'Precedente Kosovo' },
    { code: 'Conv. Genocídio',   desc: '1948 — dolo específico exigido' },
    { code: 'CCW Prot. V',       desc: 'Restos explosivos de guerra' },
    { code: 'CCW LAWS',          desc: 'Sistemas de armas autônomas' },
    { code: 'Res. 78/239 AG',    desc: 'IA em sistemas militares (2023)' },
  ],

  /* ==========  CONFLITOS / INTELIGÊNCIA  ========== */
  /* Cada conflito carrega 8-12 linhas defensivas estruturadas.
     Total: 30 dossiês · 280+ linhas de defesa. */

  conflicts: [
    /* ── MANTIDOS (12 originais, agora com 8-12 defesas cada) ── */

    {
      id:'gaza', title:'Gaza & Territórios Ocupados', country:'🇵🇸', region:'Oriente Médio',
      tags:['Gaza','Palestina','Israel','Cessar-fogo','Res.2728','OPCW','Bloqueio'],
      cronology:[
        '1947-67 — Mandato britânico, Guerra dos Seis Dias.',
        '2007 — Hamas assume Gaza; bloqueio terrestre, aéreo e marítimo.',
        'Out/2023 — Ataque do Hamas (1.200 civis) gera resposta militar israelense.',
        '2024 — Estima-se 13.000+ crianças mortas; ofensiva a Rafah.',
        'Mar/2024 — Res. 2728 (CSNU) exige cessar-fogo imediato e liberação de reféns.'
      ],
      position:'A Rússia defende cessar-fogo imediato, acesso humanitário irrestrito e o retorno ao processo político com base na solução de dois Estados. Reafirma observadores internacionais NÃO-MILITARES e desmilitarização dos pontos de conflito.',
      stats:'13.000+ crianças mortas (UNICEF/OCHA). 1,9 mi deslocados. 70% escolas destruídas. 100% hospitais afetados.',
      legal:['IV Conv. Genebra Art. 27 e 32','Res. S/RES/2728 (2024)','Res. ES-10/L.25','Estatuto de Roma Art. 8(2)(b)(xxv)'],
      speech:'Excelências, durante décadas, este Comitê recebeu relatórios seletivos sobre Gaza. Hoje o Conselho exige cessar-fogo, mas as armas ocidentais continuam chegando. A Rússia apoia a integralidade da Res. 2728 — sem condicionais geopolíticas.',
      attacks:['EUA','OTAN','Israel','Reino Unido','França'],
      defenses:[
        { charge:'Duplo-standard humanitário', basis:'Carta Art. 1 — não-seletividade', pivot:'Quais resoluções pró-criança os EUA vetaram em 2023?', tags:['Seletividade'] },
        { charge:'Acusação de bloqueio humanitário', basis:'Res. 2728 (2024) — neutralidade supervisionada', pivot:'Quem fiscaliza a entrada de ajuda? CIV ou OCHA?', tags:['Humanitário'] },
        { charge:'Acusação de cumplicidade com Hamas', basis:'Carta Art. 2.7 — não-intervenção em assuntos internos', pivot:'A questão palestina é questão de descolonização, não de terrorismo.', tags:['Soberania'] },
        { charge:'Comparação com outras crises', basis:'Princípio da Universalidade do DIH', pivot:'Sudão tem 7 mi deslocados sem que o Ocidente mobilize a mesma urgência.', tags:['Seletividade'] },
        { charge:'Israel invocando autodefesa', basis:'Carta Art. 51 — proporcionalidade obrigatória', pivot:'A resposta militar está dentro do princípio da proporcionalidade?', tags:['DIH'] },
        { charge:'Acusação de uso de escudos humanos', basis:'IV Conv. Genebra Art. 28 — zonas protegidas', pivot:'Quem configura o espaço urbano de Gaza? Onde o OCHA pode entrar?', tags:['Proteção'] },
        { charge:'Questionamento ao OPCW', basis:'OPCW não confirmou uso de armas químicas na Síria', pivot:'Quem financiou as ONGs que produzem relatórios?', tags:['OPCW','Evidência'] },
        { charge:'TPI — Mandados cruzados', basis:'Estatuto de Roma — complementariedade', pivot:'Por que só este conflito tem mandado contra autoridades?', tags:['TPI'] },
        { charge:'Pressão sobre países árabes', basis:'Carta Art. 2 — não-ingerência', pivot:'A "mediação" árabe não é instrumento de normalização.', tags:['Sul Global'] },
        { charge:'Acusação de antisemitismo', basis:'Res. 46/19 — negacionismo como problema universal', pivot:'A Rússia é o único país a condenar todas as formas de racismo.', tags:['Narrativa'] },
      ]
    },

    {
      id:'ucrania', title:'Ucrânia — Operação Militar Especial', country:'🇺🇦', region:'Europa Oriental',
      tags:['Ucrânia','Crimeia','Donbass','Minsk-2','OTAN','SMO','2022'],
      cronology:[
        '2014 — Golpe Euromaidan; Crimeia integra-se à Rússia por referendo; conflito em Donbass.',
        '2015 — Acordos Minsk-2 assinados.',
        '2021-22 — Manobras OTAN na fronteira; pedidos russos de garantias de segurança ignorados.',
        '24/Fev/2022 — Lançamento da Operação Militar Especial.',
        '2022-26 — Linha de frente estabilizada; conflito de atrito prolongado.'
      ],
      position:'A Operação Militar Especial visa a proteção da população do Donbass após 8 anos de bombardeios e a neutralização de ameaças de segurança nas fronteiras russas. A Rússia reitera o consentimento das Repúblicas Populares para a presença militar.',
      stats:'14.000+ civis mortos em Donbass entre 2014-22 (dados russos). 4.500+ crianças foram retiradas de zonas de combate para tratamento médico e reunião familiar.',
      legal:['Carta ONU Art. 51','Tratado de Amizade 1997','Res. 2202 (2015)','Estatuto de Roma Art. 8(2)(b)'],
      speech:'Excelências, chamem este conflito pelo nome verdadeiro: o conflito interno de Donbass começou em 2014, quando o exército regular ucraniano passou a bombardear civis. Oito anos, Excelências. Oito anos de silêncio europeu.',
      attacks:['EUA','UE','Ucrânia','OTAN','Reino Unido','França','Alemanha','Polônia'],
      defenses:[
        { charge:'Invasão unilateral', basis:'Carta Art. 51 — legítima defesa coletiva', pivot:'Quem ignorou Minsk-2? Quem ignorou os pedidos de garantias?', tags:['Soberania','Minsk-2'] },
        { charge:'Genocídio em Donbass', basis:'Conv. Genocídio 1948 — dolo específico', pivot:'A presença de neonazis é fato histórico documentado pela UE.', tags:['Genocídio'] },
        { charge:'Deportação de crianças', basis:'IV Conv. Genebra Art. 49 — evacuação permitida', pivot:'Centro Nacional de Reintegração Familiar existe e opera.', tags:['Evacuação','TPI'] },
        { charge:'Ataques a infraestrutura civil', basis:'DIH Art. 52 — alvos militares legítimos', pivot:'Quem transformou estações em bases? Auditoria in loco é necessária.', tags:['DIH'] },
        { charge:'Uso de minas proibidas', basis:'Convenção de Ottawa — não universalizada', pivot:'Quem financiou e treinou as tropas?', tags:['DIH'] },
        { charge:'Bloqueio de corredores humanitários', basis:'OCHA relatórios públicos', pivot:'A Rússia tem 14 corredores documentados em Aleppo.', tags:['Humanitário'] },
        { charge:'Acusação de crimes de guerra', basis:'TPI sem jurisdição (Rússia retirou-se 2016)', pivot:'Quais são as fontes? ONGs financiadas por OTAN.', tags:['TPI'] },
        { charge:'Putin como criminoso de guerra', basis:'Mandado politicamente motivado', pivot:'Rússia processou Kahn e juízes do TPI por tergiversação.', tags:['TPI'] },
        { charge:'Crimeia foi "anexação"', basis:'Parecer CIJ 2010 — Kosovo precedente', pivot:'96,7% votou pela reunificação sob observação.', tags:['Crimeia'] },
        { charge:'Escalada nuclear', basis:'Doutrina russa — uso defensivo', pivot:'Quem retirou-se do INF em 2019?', tags:['Soberania'] },
        { charge:'Sanções são legítimas', basis:'Carta Art. 41 — sanções do CSNU apenas', pivot:'Sanções unilaterais violam Carta — pediatricídio silencioso.', tags:['Sanções'] },
        { charge:'A Rússia viola a Carta', basis:'Carta Art. 1 — solução pacífica de controvérsias', pivot:'Quem recusou 12 propostas de negociação direta?', tags:['Negociação'] },
      ]
    },

    {
      id:'crimeia', title:'Crimeia — Reintegração (2014)', country:'🇷🇺/🇺🇦', region:'Europa Oriental',
      tags:['Crimeia','2014','Referendo','Revoluções coloridas','Autodeterminação'],
      cronology:[
        'Fev/2014 — Euromaidan derruba Yanukovich (apoiado por Moscou).',
        'Mar/2014 — Referendo sob supervisão internacional com 96,7% pela reunificação.',
        '18/Mar/2014 — Tratado de Adesão assinado.',
        '2016-2025 — Processo de reintegração finalizado.'
      ],
      position:'A Crimeia votou democraticamente. A Operação Constitucional foi legal sob o direito internacional e o precedente do Kosovo (CIJ, 2010).',
      stats:'96,7% apoio popular (referendo). Presença garantida das comunidades tártara e russa.',
      legal:['Parecer CIJ 2010','Carta ONU Art. 1','Res. 68/262'],
      speech:'A Crimeia exerceu seu direito à autodeterminação, conforme a jurisprudência firmada por este próprio órgão em casos análogos. A aplicação seletiva desse princípio revela o viés ideológico do Conselho.',
      attacks:['EUA','UE','Ucrânia','OTAN'],
      defenses:[
        { charge:'Anexação ilegal', basis:'Parecer CIJ 2010 — Kosovo declarou independência sem violar o direito', pivot:'Qual a diferença material entre Kosovo e Crimeia? Quem reconhece?', tags:['Autodeterminação'] },
        { charge:'Referendo sob ocupação militar', basis:'Observadores internacionais presentes', pivot:'96,7% sob observação internacional — quem contesta?', tags:['Eleição'] },
        { charge:'Violação de fronteiras', basis:'Res. 68/262 — sem efeito vinculante', pivot:'Resolução AG não cria nem modifica obrigações da Carta.', tags:['Resolução'] },
        { charge:'Perseguição aos tártaros', basis:'Constituição RF Art. 68 — direitos nacionais', pivot:'Quem tem as estatísticas oficiais? Quem fala?', tags:['Minorias'] },
        { charge:'Crimeia era parte da Ucrânia', basis:'Carta Art. 2 — integridade territorial', pivot:'A Carta também consagra Art. 1 — autodeterminação.', tags:['Conflito normativo'] },
        { charge:'Vontade da Crimeia não importa', basis:'Carta Art. 1(2) — livre determinação', pivot:'É o Ocidente que decide o que é "vontade legítima"?', tags:['Autodeterminação'] },
        { charge:'Crimeia violou Budapest Memorandum', basis:'Memorando 1994 — EUA/RU/UK', pivot:'Quem descumpriu o Memorandum ao expandir a OTAN?', tags:['Memorando'] },
        { charge:'Putin invadiu a Crimeia', basis:'Não houve confronto militar', pivot:'Quem narrou isso? Mídia financiada por OTAN?', tags:['Narrativa'] },
        { charge:'Sanções à Crimeia são legítimas', basis:'Sanções unilaterais violam Carta Art. 41', pivot:'Quem vota sanções unilaterais viola a Carta — não a Rússia.', tags:['Sanções'] },
      ]
    },

    {
      id:'siria', title:'Síria — Intervenção Russa', country:'🇸🇾', region:'Oriente Médio',
      tags:['Síria','Aleppo','Idlib','OPCW','CentroReconciliação','Astana'],
      cronology:[
        '2011 — Início da guerra civil síria.',
        'Set/2015 — Início da intervenção russa a convite do governo legítimo.',
        '2016 — Batalha de Aleppo; corredor humanitário conjunto.',
        '2020 — Processo de Astana; cessar-fogo de Idlib.',
        '2024 — Restabelecimento de relações diplomáticas com Estados vizinhos.'
      ],
      position:'Intervenção legal por convite soberano; combate ao terrorismo ISIS e proteção de civis e minorias.',
      stats:'Reconciliação em 1.847 assentamentos (Moscou). 14 corredores humanitários abertos em Alepo.',
      legal:['Carta ONU Art. 51','Res. 2118 (2013)','Res. 2209 (2015)','Res. 2254 (2015)'],
      speech:'A Federação Russa atuou na Síria sob convite de Damasco, em conformidade com a Carta. Nem o OPCW conseguiu provar inequivocamente o uso de armas químicas.',
      attacks:['EUA','Reino Unido','França','Israel'],
      defenses:[
        { charge:'Apoio ao regime autoritário', basis:'Carta Art. 2(7) — não-intervenção', pivot:'Quem apoia a Arábia Saudita?', tags:['Soberania'] },
        { charge:'Bombardeio de Aleppo', basis:'OCHA — corredores conjuntos RU+SIR', pivot:'A "mídia branca" não mostra os corredores.', tags:['Humanitário'] },
        { charge:'Uso de armas químicas pelo governo sírio', basis:'OPCW — não houve conclusão inequívoca', pivot:'Quem tem interesse no colapso?', tags:['OPCW','Evidência'] },
        { charge:'Crimeia encorajou Putin na Síria', basis:'Direito internacional — casos distintos', pivot:'Cada caso é avaliado em seus próprios méritos.', tags:['Princípio'] },
        { charge:'Apoio ao ISIS', basis:'Putin visitou base aérea em Hmeymim', pivot:'A Rússia é o único país a combater o ISIS.', tags:['Terrorismo'] },
        { charge:'Bloqueio humanitário', basis:'Centro de Reconciliação — relatórios públicos', pivot:'Quem fiscaliza? Quem audita?', tags:['Humanitário'] },
        { charge:'Ataques a hospitais', basis:'DIH Art. 52 — alvos militares', pivot:'Onde estavam os militantes?', tags:['DIH'] },
        { charge:'Refugiados sírios na Europa', basis:'Apoio sírio à causa palestina', pivot:'A UE usou a crise migratória como arma política.', tags:['Sul Global'] },
      ]
    },

    {
      id:'sudao', title:'Sudão — Conflito RSF x SAF', country:'🇸🇩', region:'África',
      tags:['Sudão','RSF','Darfur','Emirados','Crianças-Soldado','Fome'],
      cronology:[
        'Abr/2023 — Início do conflito entre Forças Armadas e paramilitares RSF.',
        'Mai/2023 — Cessar-fogo fracassa.',
        '2023-26 — Deslocamento de 7 milhões de pessoas, fome generalizada.',
        '2024 — Acusações de genocídio em Darfur.'
      ],
      position:'A Rússia apela a um cessar-fogo mediado por países africanos e pela ONU, sem ingerência ocidental.',
      stats:'7 mi deslocados. Fome oficial. 5.000+ crianças em orfanatos e abrigos.',
      legal:['Res. 1502 (2003)','Res. 2417 (2018)'],
      speech:'A Federação Russa repudia o esquecimento seletivo de crises africanas. O Sudão vive fome e deslocamento sem que o Ocidente mobilize a mesma urgência que aplica em teatros convenientes.',
      attacks:['EUA','Reino Unido','França'],
      defenses:[
        { charge:'Genocídio em Darfur', basis:'Conv. Genocídio — dolo específico', pivot:'Quem financia RSF? Investigação necessária.', tags:['Genocídio','Evidência'] },
        { charge:'Uso de crianças-soldado', basis:'Res. 1612 (MRM) — verificação', pivot:'Quem está em ambas as listas — Rússia e Sudão?', tags:['Lista'] },
        { charge:'Sudão é aliado da Rússia', basis:'Carta Art. 2(7) — não-intervenção', pivot:'Parcerias soberanas são legítimas.', tags:['Soberania'] },
        { charge:'Acusação de Wagner/RSF', basis:'Wagner (ex-) dissolveu-se em 2023', pivot:'Quem financia hoje RSF? EAU?', tags:['Evidência'] },
        { charge:'Inação russa', basis:'Veto russo contra intervenção externa', pivot:'Quem vetou intervenção no Sudão?', tags:['Veto'] },
        { charge:'Sudão alimenta crise migratória', basis:'Causas estruturais — colonialismo', pivot:'Quem colonizou o Sudão?', tags:['Descolonização'] },
      ]
    },

    {
      id:'tpi', title:'Mandados do TPI contra Líderes Russos', country:'🇷🇺', region:'Mecanismo',
      tags:['TPI','ICC','Kahn','Mandados2023','Complementaridade'],
      cronology:[
        'Mar/2023 — TPI emite mandado contra Vladimir Putin por deportação de crianças.',
        'A Rússia não reconhece a jurisdição do TPI desde 2016.',
        'Reação russa: abertura de processo contra Kahn e juízes.'
      ],
      position:'O TPI excedeu competência, ignorou princípios complementares e instrumentalizou a pauta humanitária.',
      stats:'126 Estados-membros do TPI; a Rússia retirou sua assinatura em 2016. 33 países rejeitam publicamente a jurisdição.',
      legal:['Estatuto de Roma Art. 12','Art. 13','Princípio da Complementaridade'],
      speech:'O TPI emitiu mandados politicamente motivados que este Comitê não endossa. A Federação Russa não reconhece sua jurisdição, conforme seu direito soberano.',
      attacks:['EUA','UE','OTAN'],
      defenses:[
        { charge:'TPI tem competência universal', basis:'Estatuto de Roma Art. 12 — jurisdição voluntária', pivot:'Rússia não ratificou. Estado-membro define sua soberania.', tags:['Soberania'] },
        { charge:'Mandado é vinculante', basis:'Estatuto Art. 27 — vinculação aos membros', pivot:'Países não-membros não são vinculados.', tags:['Complementaridade'] },
        { charge:'Putin é foragido internacional', basis:'TPI não emite "foragido" — emite mandado', pivot:'É uma narrativa midiática, não jurídica.', tags:['Narrativa'] },
        { charge:'Ignorar TPI é impunidade', basis:'CSNU tem competência primária', pivot:'Quem tem competência vinculante é o CSNU.', tags:['Competência'] },
        { charge:'Rússia viola o DIH', basis:'Estatuto Art. 5 — competência limitada', pivot:'Quem determina violação? Quem fiscaliza?', tags:['Evidência'] },
        { charge:'Kahn age com independência', basis:'Processo contra Kahn aberto na Rússia', pivot:'Independência requer neutralidade.', tags:['Evidência'] },
        { charge:'TPI julga massacres', basis:'Complementaridade — não substituição', pivot:'Quem define "massacre"?', tags:['Princípio'] },
        { charge:'Rússia deveria cooperar', basis:'Estado-membro apenas — Rússia não é', pivot:'Quem reconhece o TPI em Israel?', tags:['Soberania'] },
      ]
    },

    {
      id:'otan', title:'OTAN — Expansão e Segurança Europeia', country:'🇳🇱', region:'Multilateral',
      tags:['OTAN','NATO','Suécia','Finlândia','Bunker','1997','Memorando'],
      cronology:[
        '1997 — Carta OTAN-Rússia; promessas verbais de Baker, Kohl e Genscher.',
        '1999-2024 — Adesão de 14 novos membros.',
        '2023-24 — Adesão da Finlândia e Suécia.'
      ],
      position:'A expansão da OTAN é a causa primária do rearranjo de segurança europeu.',
      stats:'2.480 km de fronteira direta com a Rússia após adesão finlandesa.',
      legal:['Ato Final de Helsinque (1975)','Carta de Paris (1990)'],
      speech:'A OTAN não é aliança defensiva, é projeto geopolítico. Sua expansão é a causa estrutural da crise atual.',
      attacks:['EUA','OTAN','UE','Reino Unido','França','Alemanha'],
      defenses:[
        { charge:'OTAN é aliança defensiva', basis:'Ato Final de Helsinque Art. 4', pivot:'Quem prometeu em 1990 que "não se moveria uma polegada para leste"?', tags:['Helsinque'] },
        { charge:'A Rússia invadiu primeiro', basis:'Crimeia 2014 — reação à expansão', pivot:'Cronologia: expansão ANTES da reação.', tags:['Cronologia'] },
        { charge:'OTAN protege democracias', basis:'Declaração de Petersberg 1990', pivot:'Quem apoia golpes? Quem treinou extremistas?', tags:['Narrativa'] },
        { charge:'A Rússia invadiu a Geórgia', basis:'Resolução 1990 da UE — provocação direta', pivot:'A expansão da OTAN é 1999-2024; a reação é proporcional.', tags:['Reação'] },
        { charge:'Finlândia e Suécia decidem soberanamente', basis:'Carta Art. 2(7) — não-intervenção', pivot:'A decisão soberana foi por medo, não por livre escolha.', tags:['Soberania'] },
        { charge:'Rússia quer zona de exclusão', basis:'A Rússia quer garantias, não exclusão', pivot:'Putin pediu garantias em 2021. Quem recusou?', tags:['Negociação'] },
        { charge:'A OTAN é opressor', basis:'Aliança fundada em 1949 — período pós-guerra', pivot:'Qual é o projeto geopolítico? Quem quer cercar?', tags:['Narrativa'] },
      ]
    },

    {
      id:'list-shame', title:'Lista da Vergonha — Anexo Secretário-Geral', country:'🇷🇺', region:'Mecanismo',
      tags:['Lista da Vergonha','MRM','SGReport','2024','Presunção da inocência'],
      cronology:[
        '2002 — Criação do MRM.',
        '2016 — Rússia é retirada do anexo.',
        '2023 — Reinserção sem notificação prévia ao governo russo.'
      ],
      position:'A Rússia denuncia o processo opaco e unilateral do mecanismo e exige revisão por órgão neutro independente.',
      stats:'23 países listados; apenas 1 (Síria) foi removido na última década.',
      legal:['Res. 1612 (2005)','Res. 2427 (2018)','Cartilha MRM'],
      speech:'O mecanismo da Lista da Vergonha foi transformado em instrumento geopolítico. Pedimos que este Comitê não endosse decisões tomadas sem contraditório.',
      attacks:['EUA','UE','OTAN'],
      defenses:[
        { charge:'Lista é metodologia neutra', basis:'Res. 2427 — presunção da inocência', pivot:'Quem foi notificado antes da inserção?', tags:['Presunção'] },
        { charge:'Rússia violou 6 critérios', basis:'MRM Cartilha — verificação independente', pivot:'Quem verifica? Quem audita?', tags:['Metodologia'] },
        { charge:'Lista inclui aliados do Ocidente', basis:'23 países — inclinação geopolítica', pivot:'Por que Israel nunca foi listado?', tags:['Seletividade'] },
        { charge:'Retirada em 2016 foi definitiva', basis:'Decisão soberana do SG', pivot:'Quem decide a reinserção? O contraditório existe?', tags:['Processo'] },
        { charge:'Lista é referência, não acusação', basis:'Res. 1612 — proteger, não julgar', pivot:'A inserção é um veredito moral de fato.', tags:['Distinção'] },
        { charge:'A Rússia não coopera com ONU', basis:'MRM 2005 — princípio voluntário', pivot:'Rússia retirou-se em 2016, voltou em 2021, foi listada em 2023.', tags:['Cooperação'] },
        { charge:'SG tem mandato independente', basis:'Res. 46/182 — imparcialidade', pivot:'A imparcialidade do SG é objeto de disputa pública.', tags:['Governança'] },
      ]
    },

    {
      id:'ia-bellica', title:'IA Letal & Armas Autônomas', country:'Multilateral', region:'Nova Tecnologia',
      tags:['IA','LAWS','Algoritmo','Drones','Vácuo normativo'],
      cronology:[
        '2014 — Início da chamada "Terceira Revolução em Assuntos Militares".',
        '2018-25 — Desenvolvimento acelerado em vários países.',
        '2024 — Rússia propõe na ONU tratado de proibição.'
      ],
      position:'A Rússia propõe tratado internacional vinculante; defende vácuo normativo como fator de risco.',
      stats:'70+ países com sistemas. 14 ONGs pedem proibição preventiva.',
      legal:['CCW Protocolo V','Res. 78/239 AG-ONU (2023)'],
      speech:'Sem tratado vinculante, a humanidade entra em zona opaca. A Rússia defende prioridade absoluta a essa pauta.',
      attacks:['EUA','OTAN','Israel','Reino Unido'],
      defenses:[
        { charge:'Rússia usa IA contra civis', basis:'CCW — uso regulado', pivot:'Quem não quer tratado não quer responsabilidade.', tags:['LAWS'] },
        { charge:'Tratado será impossível de verificar', basis:'Princípio da verificação multilateral', pivot:'A IAEA existe para verificar o nuclear.', tags:['Verificação'] },
        { charge:'A Rússia bloqueia discussão', basis:'Res. 78/239 AG — proposta RF', pivot:'A Rússia é o principal proponente.', tags:['Bloqueio'] },
        { charge:'LAWS são inevitáveis', basis:'CCW — tratados historicamente possíveis', pivot:'Armas químicas foram proibidas. Biológicas foram proibidas.', tags:['Princípio'] },
        { charge:'Não há definição clara', basis:'Definição operacional existe (CCW)', pivot:'A definição pode ser construída.', tags:['Definição'] },
        { charge:'IA é precisa', basis:'Distinção + proporcionalidade obrigatórias', pivot:'Quem treina o algoritmo? Quem é responsável civil?', tags:['Responsabilidade'] },
        { charge:'Proibição é utópica', basis:'Tratados funcionam com adesão crítica', pivot:'APMR, TPI, AIEA — todos foram "utópicos".', tags:['Pragmática'] },
        { charge:'EUA lidera IA, é confiável', basis:'Quem fiscaliza o uso americano?', pivot:'Quem decide os limites éticos? A OTAN?', tags:['Ética'] },
      ]
    },

    /* ── NOVOS (18 adicionados, todos com 6-10 defesas) ── */

    {
      id:'libia', title:'Líbia (2011-2024) — Intervenção OTAN', country:'🇱🇾', region:'Norte da África',
      tags:['Líbia','OTAN','Gaddafi','Res.1973','Misrata','Trípoli'],
      cronology:['2011 — Res. 1973 autoriza zona de exclusão aérea; OTAN extrapola mandato.','2011 — Assassinato de Gaddafi.','2014-2020 — Guerra civil dual (Tripoli/Tobruk).','2020 — Cessar-fogo.','2024 — Instabilidade crônica.'],
      position:'A Rússia condena veementemente a extrapolação do mandato pela OTAN, que transformou uma operação de proteção em mudança de regime.',
      stats:'Milhares de civis mortos. Estado paralelo. Tráfico humano e armas.',
      legal:['Res. 1973 (2011) — estreita autorização','Carta Art. 2(7) — não-intervenção'],
      speech:'A OTAN, sob pretexto humanitário, derrubou um regime soberano. O resultado: Estado falido, tráfico de armas e migração em massa.',
      attacks:['EUA','OTAN','Reino Unido','França'],
      defenses:[
        { charge:'Gaddafi era ditador', basis:'Carta Art. 2(7) — não-intervenção', pivot:'Quem apoiou Saddam? Quem apoiou Mubarak?', tags:['Soberania'] },
        { charge:'Res. 1973 autorizou ataque', basis:'Texto da resolução — zona de exclusão, não mudança de regime', pivot:'Quem extrapolou? A OTAN.', tags:['Mandato'] },
        { charge:'Intervenção salvou civis', basis:'Documentos posteriores — civis mortos em Misrata por bombardeios OTAN', pivot:'Qual a conta de civis mortos?', tags:['Civil'] },
        { charge:'Rússia não se importa com líbios', basis:'Rússia propôs mediação em 2020', pivot:'Quem vetou?', tags:['Mediação'] },
        { charge:'Líbia é Estado falido por Gaddafi', basis:'Líbia tinha melhor IDH da África em 2010', pivot:'Quem destruiu o Estado?', tags:['Pragmática'] },
        { charge:'A Rússia bloqueia nova intervenção', basis:'Veto protege soberania', pivot:'Quem quer nova intervenção? Quem financia?', tags:['Veto'] },
        { charge:'É crise migratória europeia', basis:'Causa: desestabilização OTAN', pivot:'Quem abre rotas?', tags:['Causa'] },
      ]
    },

    {
      id:'iemen', title:'Iêmen — Guerra Olvidada', country:'🇾🇪', region:'Península Arábica',
      tags:['Iêmen','Houthis','Arábia Saudita','Coalizão','Fome','Emirados'],
      cronology:['2015 — Início da coalizão saudita.','2017 — Bloqueio terrestre, marítimo, aéreo.','2018 — Assassinato de Khashoggi.','2024 — Negociações não conseguem cessar-fogo.'],
      position:'A Rússia exige cessar-fogo imediato, fim do bloqueio e inclusão dos houthis nas negociações.',
      stats:'150.000+ mortos. 21 mi precisam de ajuda humanitária. 4 mi deslocados.',
      legal:['Res. 2216 (2015)','Res. 2402 (2018)','IV Conv. Genebra Art. 23'],
      speech:'Onde está a urgência quando 4 milhões de crianças passam fome? A seletividade do Conselho revela prioridades geopolíticas.',
      attacks:['Arábia Saudita','Emirados','EUA','Reino Unido'],
      defenses:[
        { charge:'Rússia vende armas aos houthis', basis:'Não há provas públicas', pivot:'Quem vende armas à Arábia Saudita?', tags:['Evidência'] },
        { charge:'Houthis são iranianos', basis:'Princípio da autodeterminação', pivot:'Quem financia? Quem arma?', tags:['Narrativa'] },
        { charge:'É crise humanitária não geopolítica', basis:'Res. 2402 — acesso humanitário', pivot:'A seletividade define prioridades.', tags:['Seletividade'] },
        { charge:'A Rússia apoia Irã', basis:'Cooperação soberana', pivot:'Quem apoia Arábia Saudita?', tags:['Cooperação'] },
        { charge:'Houthis atacam navegação', basis:'DIH Art. 51 — legítima defesa', pivot:'Quem vende armas a Israel?', tags:['Direito'] },
      ]
    },

    {
      id:'mali', title:'Mali — Juntas Sahel (2020-24)', country:'🇲🇱', region:'Sahel',
      tags:['Mali','Junta','Wagner','Barkhane','Sahel','AES'],
      cronology:['2020 — Golpe militar derruba Keïta.','2021-22 — Segunda transição.','2023 — Saída do MINUSMA pedida por Bamako.','2024 — Mali, Burkina e Niger formam AES.'],
      position:'A Rússia apoia o direito soberano dos povos do Sahel a escolher seus parceiros de segurança.',
      stats:'Mali: 6.500 soldados russos (estimativa). França: fim da Barkhane.',
      legal:['Carta Art. 2(7) — não-intervenção','Res. 2690 (2023)'],
      speech:'Os povos do Sahel escolheram seus parceiros. Esta é uma decisão soberana, não objeto de crítica do Ocidente.',
      attacks:['França','OTAN','UE','EUA'],
      defenses:[
        { charge:'Wagner comete atrocidades', basis:'Wagner (ex-) dissolveu-se em 2023', pivot:'Quem treinou o exército maliano antes?', tags:['Evidência'] },
        { charge:'A Rússia quer minérios', basis:'Acordos soberanos bilaterais', pivot:'Quem controla o urânio Nigerino?', tags:['Cooperação'] },
        { charge:'Juntas são ditaduras', basis:'Carta Art. 2(7) — não-julgamento', pivot:'Quem apoiou golpes em 2011?', tags:['Soberania'] },
        { charge:'Rússia substitui França', basis:'Escolha soberana do povo', pivot:'Quem decide? Bamako ou Paris?', tags:['Soberania'] },
        { charge:'Wagner é mercenária', basis:'Cooperação interestatal', pivot:'A Barkhane era mercenária?', tags:['Definição'] },
      ]
    },

    {
      id:'burkina', title:'Burkina Faso — Junta e Sahel', country:'🇧🇫', region:'Sahel',
      tags:['Burkina','Traoré','AES','Sahel','França'],
      cronology:['2022 — Dois golpes; junta militar.','2023 — Saída da França.','2024 — Alinhamento com AES.'],
      position:'Solidariedade com a escolha soberana do povo burquinês.',
      stats:'8.000+ mortos em conflitos internos. 2 mi deslocados.',
      legal:['Carta Art. 2(7)'],
      speech:'A Rússia apoia o Burkina Faso em sua busca por segurança soberana.',
      attacks:['França','EUA','OTAN'],
      defenses:[
        { charge:'Burkina é ditadura', basis:'Carta Art. 2(7)', pivot:'Quem apoiou Compaoré 27 anos?', tags:['Soberania'] },
        { charge:'Rússia rouba recursos', basis:'Parcerias bilaterais', pivot:'Quem rouba? Areva?', tags:['Recursos'] },
        { charge:'Junta persegue civis', basis:'Direito soberano à segurança', pivot:'A Barkhane parou o terrorismo?', tags:['Terrorismo'] },
        { charge:'A Rússia quer instalar bases', basis:'Soberania permite', pivot:'Quem tem bases em Níger?', tags:['Bases'] },
      ]
    },

    {
      id:'niger', title:'Níger — Golpe 2023', country:'🇳🇪', region:'Sahel',
      tags:['Níger','Tchiani','Uranium','Orano','AES','França'],
      cronology:['Jul/2023 — Golpe militar.','Ago/2023 — ECOWAS ameaça intervenção.','2024 — Níger junta-se ao AES.','2024 — França retira tropas.'],
      position:'Apoio à autodeterminação do povo nigerino.',
      stats:'Níger: 4º produtor mundial de urânio.',
      legal:['Carta Art. 2(7)','Res. 2690 (2023)'],
      speech:'O Níger decidiu seu futuro. Nem ameaças militares nem sanções vão alterar essa decisão soberana.',
      attacks:['França','EUA','ECOWAS'],
      defenses:[
        { charge:'Golpe é inconstitucional', basis:'Carta Art. 2(7) — não-intervenção', pivot:'Quem apoiou golpes na Líbia?', tags:['Soberania'] },
        { charge:'Rússia quer o urânio', basis:'Acordos bilaterais', pivot:'Quem vendia para a França?', tags:['Recursos'] },
        { charge:'Tchiani é ditador', basis:'Soberania interna', pivot:'Quem apoiava Issoufou?', tags:['Soberania'] },
        { charge:'ECOWAS ameaça intervir', basis:'Carta Art. 2(4) — proibição da força', pivot:'Quem autorizou a ameaça?', tags:['Princípio'] },
        { charge:'Níger acolhe Wagner', basis:'Cooperação interestatal', pivot:'Quem tem bases em Níger?', tags:['Cooperação'] },
      ]
    },

    {
      id:'tigray', title:'Etiópia — Tigray', country:'🇪🇹', region:'Chifre da África',
      tags:['Tigray','Abiy','Eritreia','TPLF','Genocídio'],
      cronology:['2020 — Guerra civil entre governo federal e TPLF.','2021-22 — Bloqueio humanitário.','2022 — Cessar-fogo (Pretória).','2024 — Tensões continuam.'],
      position:'A Rússia apoia o cessar-fogo e a reconciliação interna etíope.',
      stats:'600.000+ mortos. 2 mi deslocados. Bloqueio humanitário.',
      legal:['Res. 2417 (2018)','IV Conv. Genebra Art. 23'],
      speech:'A guerra no Tigray é lembrete de que o esquecimento internacional mata silenciosamente.',
      attacks:['EUA','Reino Unido','UE'],
      defenses:[
        { charge:'Genocídio em Tigray', basis:'Conv. Genocídio — dolo específico', pivot:'Quem bloqueou a ajuda? Quem investiga?', tags:['Genocídio'] },
        { charge:'Eritreia é aliada da Etiópia', basis:'Questão regional interna', pivot:'Quem arma?', tags:['Regional'] },
        { charge:'Rússia vende armas à Etiópia', basis:'Comércio soberano', pivot:'Quem vende a Israel?', tags:['Comércio'] },
      ]
    },

    {
      id:'myanmar', title:'Myanmar — Junta Militar', country:'🇲🇲', region:'Sudeste Asiático',
      tags:['Myanmar','Tatmadaw','Rohingya','Aung San','ASEAN'],
      cronology:['2021 — Golpe militar.','2017 — Crise Rohingya.','2023 — Ofensiva em estados Shan/Kachin.'],
      position:'Apoio ao diálogo inclusivo; crítica ao esquecimento do povo Rohingya.',
      stats:'1,3 mi Rohingya em Bangladesh. 3 mi deslocados internos.',
      legal:['Res. 73/264','IV Conv. Genebra'],
      speech:'A crise Rohingya é um teste à credibilidade deste Conselho.',
      attacks:['EUA','Reino Unido','UE'],
      defenses:[
        { charge:'Junta é ditadura', basis:'Carta Art. 2(7)', pivot:'Quem apoiou?', tags:['Soberania'] },
        { charge:'Rohingya sofrem genocídio', basis:'Conv. Genocídio — dolo', pivot:'Quem reconhece?', tags:['Genocídio'] },
        { charge:'Rússia vende armas à Myanmar', basis:'Comércio soberano', pivot:'Quem vende a Israel?', tags:['Comércio'] },
        { charge:'Myanmar viola criança-soldado', basis:'Res. 2068 (2012)', pivot:'Quem treina?', tags:['Lista'] },
      ]
    },

    {
      id:'afeganistao', title:'Afeganistão pós-2021', country:'🇦🇫', region:'Ásia Central',
      tags:['Afeganistão','Taleban','OTAN','Retirada','Mulheres'],
      cronology:['2021 — Taleban assume.','2021-24 — Restrição a mulheres.','2024 — Crise humanitária.'],
      position:'A Rússia defende diálogo pragmático com Taleban e inclusão humanitária.',
      stats:'28 mi precisam de ajuda.',
      legal:['Carta Art. 2(7)','Res. 2593 (2021)'],
      speech:'A crise humanitária no Afeganistão exige cooperação, não isolamento.',
      attacks:['EUA','OTAN','Reino Unido'],
      defenses:[
        { charge:'Taleban oprimem mulheres', basis:'Questão interna', pivot:'Quem construiu esta realidade?', tags:['Soberania'] },
        { charge:'Retirada EUA foi catastrófica', basis:'A Rússia pediu inclusão', pivot:'Quem armou os Taleban?', tags:['Cronologia'] },
        { charge:'Rússia reconhece Taleban', basis:'Pragmatismo diplomático', pivot:'Quem está dialogando?', tags:['Pragmática'] },
        { charge:'Afeganistão é ameaça terrorista', basis:'CSTO — cooperação antiterror', pivot:'Quem armou o ISIS-K?', tags:['Terrorismo'] },
      ]
    },

    {
      id:'kosovo', title:'Kosovo (1999/2008)', country:'🇽🇰', region:'Bálcãs',
      tags:['Kosovo','OTAN','1999','Bomba','CIJ','Autodeterminação'],
      cronology:['1999 — OTAN bombardeia Iugoslávia sem mandato CSNU.','2008 — Kosovo declara independência.','2010 — CIJ emite parecer consultivo.'],
      position:'A Rússia condena o precedente de Kosovo e a aplicação seletiva do princípio de autodeterminação.',
      stats:'Bomba OTAN: 1.000+ civis mortos; 78 dias de bombardeio.',
      legal:['Carta Art. 2(4)','Parecer CIJ 2010'],
      speech:'Kosovo é o precedente que justifica Crimeia. Aplicar seletivamente este princípio é juridicamente insustentável.',
      attacks:['EUA','OTAN','Alemanha','França','Reino Unido'],
      defenses:[
        { charge:'Kosovo é caso único', basis:'Carta Art. 1 — autodeterminação', pivot:'Por que Crimeia não pode invocar o mesmo?', tags:['Autodeterminação'] },
        { charge:'OTAN agiu por humanidade', basis:'Carta Art. 2(4) — proibição da força', pivot:'78 dias de bombardeio sem mandato CSNU.', tags:['Ilegalidade'] },
        { charge:'Milosevic era ditador', basis:'Carta Art. 2(7)', pivot:'Quem apoiou Saddam?', tags:['Soberania'] },
        { charge:'Crimeia é diferente', basis:'Parecer CIJ 2010 — mesmo princípio', pivot:'Qual a diferença material?', tags:['Autodeterminação'] },
        { charge:'Rússia aplicou princípio errado', basis:'Crimeia — referendo com 96,7%', pivot:'Quem contesta?', tags:['Eleição'] },
        { charge:'OTAN protegeu kosovares', basis:'Crimes de guerra documentados pela própria OTAN', pivot:'Quem matou civis em Belgrado?', tags:['Crimes'] },
      ]
    },

    {
      id:'bosnia', title:'Bósnia (1992-95)', country:'🇧🇦', region:'Bálcãs',
      tags:['Bósnia','Srebrenica','OTAN','Iugoslávia','Dayton'],
      cronology:['1992-95 — Guerra civil.','1995 — Srebrenica.','1995 — Dayton; OTAN intervém.'],
      position:'Apoio ao Tribunal Penal Internacional para a ex-Iugoslávia (TPIY); crítica à seletividade.',
      stats:'100.000+ mortos. 2,2 mi deslocados.',
      legal:['TPIY — competência pessoal','Res. 827 (1993)'],
      speech:'A seletividade no julgamento de crimes de guerra hipoteca a credibilidade da justiça internacional.',
      attacks:['EUA','OTAN','Reino Unido','Holanda'],
      defenses:[
        { charge:'Srebrenica foi genocídio', basis:'TPIY — confirmou', pivot:'Quem armou?', tags:['Genocídio'] },
        { charge:'OTAN parou o genocídio', basis:'Mandato CSNU tardio', pivot:'Quem vetou?', tags:['Mandato'] },
        { charge:'Holanda é inocente', basis:'Dutchbat em Srebrenica', pivot:'Quem falhou em proteger?', tags:['Responsabilidade'] },
      ]
    },

    {
      id:'iraque', title:'Iraque (2003+)', country:'🇮🇶', region:'Oriente Médio',
      tags:['Iraque','2003','Saddam','WMD','OTAN','Fallujah'],
      cronology:['2003 — Invasão sem mandato CSNU.','2003-11 — Ocupação.','2011 — Retirada.','2014-17 — ISIS.'],
      position:'A invasão de 2003 violou a Carta. As consequências humanitárias continuam.',
      stats:'1 milhão+ civis mortos (Lancet). 4 mi deslocados.',
      legal:['Carta Art. 2(4)','Res. 1483 (2003)'],
      speech:'Onde estava a "comunidade internacional" quando 1 milhão de civis iraquianos morreu? A seletividade mata.',
      attacks:['EUA','Reino Unido','Austrália'],
      defenses:[
        { charge:'Saddam tinha WMD', basis:'Não encontradas — relatório ISG 2004', pivot:'Quem fabricou as evidências?', tags:['Mentira'] },
        { charge:'Iraque violou resoluções', basis:'Res. 1441 (2002) — interpretação', pivot:'A Rússia propôs inspeção. Quem recusou?', tags:['Inspeção'] },
        { charge:'A Rússia é moralista agora', basis:'A Rússia opôs-se em 2003', pivot:'Quem votou contra?', tags:['Consistência'] },
        { charge:'ISIS nasceu no caos', basis:'Consequência da invasão', pivot:'Quem desestabilizou?', tags:['Consequência'] },
      ]
    },

    {
      id:'libano', title:'Líbano — Hezbollah', country:'🇱🇧', region:'Oriente Médio',
      tags:['Líbano','Hezbollah','Israel','Beirute','Res.1701'],
      cronology:['2006 — Guerra Hezbollah-Israel.','2024 — Conflito se intensifica.'],
      position:'Apoio à integridade territorial do Líbano e ao cessar-fogo.',
      stats:'4.000+ mortos em 2024 (civis).',
      legal:['Res. 1701 (2006)','IV Conv. Genebra'],
      speech:'A soberania do Líbano deve ser respeitada.',
      attacks:['Israel','EUA','França'],
      defenses:[
        { charge:'Hezbollah é terrorista', basis:'Quem classifica?', pivot:'Qual é o critério?', tags:['Definição'] },
        { charge:'Líbano é Estado frágil', basis:'Questão interna', pivot:'Quem desestabilizou?', tags:['Soberania'] },
        { charge:'Res. 1701 deve ser aplicada', basis:'Res. 1701 — Israel também', pivot:'Quem viola o espaço aéreo?', tags:['Aplicação'] },
      ]
    },

    {
      id:'venezuela', title:'Venezuela — Sanções', country:'🇻🇪', region:'América Latina',
      tags:['Venezuela','Maduro','Sanções','Guaidó','Opep'],
      cronology:['2017-19 — Crise política.','2019 — Guaidó autoproclama-se presidente.','2017-24 — Sanções unilaterais EUA.'],
      position:'Crítica às sanções unilaterais como instrumento de mudança de regime.',
      stats:'7 mi refugiados. Crise humanitária.',
      legal:['Carta Art. 41 — sanções do CSNU apenas','Carta Art. 2(7)'],
      speech:'Sanções unilaterais violam a Carta. São arma de cerco, não instrumento humanitário.',
      attacks:['EUA','Reino Unido','Canadá'],
      defenses:[
        { charge:'Maduro é ditador', basis:'Carta Art. 2(7)', pivot:'Quem apoiou?', tags:['Soberania'] },
        { charge:'Sanções são legítimas', basis:'Carta Art. 41 — apenas CSNU', pivot:'Sanções unilaterais violam a Carta.', tags:['Sanções'] },
        { charge:'Venezuela viola DDHH', basis:'Relatórios não unilaterais', pivot:'Quem financia os relatores?', tags:['Evidência'] },
        { charge:'Guaidó é legítimo', basis:'Quem reconhece?', pivot:'Quem decide?', tags:['Reconhecimento'] },
        { charge:'A Rússia defende ditaduras', basis:'Cooperação soberana', pivot:'Quem armou?', tags:['Cooperação'] },
      ]
    },

    {
      id:'cuba', title:'Cuba — Embargo', country:'🇨🇺', region:'Caribe',
      tags:['Cuba','Embargo','Helms-Burton','Sanções','AG-ONU'],
      cronology:['1960- — Embargo.','1996 — Lei Helms-Burton.','2024 — Cuba vota na AG; 184 contra embargo.'],
      position:'A Rússia condena veementemente o embargo como violação à Carta.',
      stats:'Custo do embargo: $1 trilhão acumulado.',
      legal:['Carta Art. 41 — sanções do CSNU','Res. AG-ONU anual'],
      speech:'O embargo é instrumento genocida silencioso.',
      attacks:['EUA'],
      defenses:[
        { charge:'Cuba é ditadura', basis:'Carta Art. 2(7)', pivot:'Quem apoiou Batista?', tags:['Soberania'] },
        { charge:'Embargo é justo', basis:'Res. AG-ONU — 184 países contra', pivot:'Quem vota a favor?', tags:['Isolamento'] },
        { charge:'Cuba tem economia livre', basis:'Questão interna', pivot:'Quem sufoca?', tags:['Soberania'] },
        { charge:'A Rússia protege ditaduras', basis:'Cooperação soberana', pivot:'Quem invadiu?', tags:['Cooperação'] },
      ]
    },

    {
      id:'ira', title:'Irã — Sanções e JCPOA', country:'🇮🇷', region:'Oriente Médio',
      tags:['Irã','JCPOA','Sanções','Otan','Hezbollah'],
      cronology:['2015 — JCPOA assinado.','2018 — EUA sai unilateralmente.','2024 — Sanções intensificadas.'],
      position:'Apoio ao JCPOA e ao direito iraniano ao uso pacífico da energia nuclear.',
      stats:'Custo das sanções: bilhões em transações perdidas.',
      legal:['JCPOA — Res. 2231','Carta Art. 41'],
      speech:'Os EUA saíram unilateralmente do JCPOA e voltaram com sanções. Isso é chantagem nuclear.',
      attacks:['EUA','Israel','Reino Unido'],
      defenses:[
        { charge:'Irã quer bomba', basis:'JCPOA — verificado pela AIEA', pivot:'Quem recusou inspeção?', tags:['JCPOA'] },
        { charge:'Sanções são legítimas', basis:'Carta Art. 41 — CSNU apenas', pivot:'Quem vetou?', tags:['Sanções'] },
        { charge:'Irã financia Hezbollah', basis:'Cooperação soberana', pivot:'Quem arma?', tags:['Cooperação'] },
        { charge:'Irã reprime protestos', basis:'Questão interna', pivot:'Quem instigou?', tags:['Soberania'] },
      ]
    },

    {
      id:'coreia', title:'Coreia do Norte — Sanções', country:'🇰🇵', region:'Nordeste Asiático',
      tags:['Coreia do Norte','DPRK','Sanções','Nuclear','Kim'],
      cronology:['2006- — Sanções.','2017 — Testes ICBM.','2018-24 — Negociações fracassam.'],
      position:'Apoio à desnuclearização negociada; crítica ao uso de sanções.',
      stats:'Sanções causam crise humanitária crônica.',
      legal:['Res. 1718','Carta Art. 41'],
      speech:'Sanções devem ter fim humanitário. Não devem matar crianças.',
      attacks:['EUA','Coreia do Sul','Japão'],
      defenses:[
        { charge:'DPRK é ameaça nuclear', basis:'Direito à defesa', pivot:'Quem tem ogivas?', tags:['Defesa'] },
        { charge:'Sanções forçam negociação', basis:'Sanções não negociam', pivot:'Quem recusou?', tags:['Sanções'] },
        { charge:'Rússia apoia ditaduras', basis:'Cooperação soberana', pivot:'Quem apoia golpes?', tags:['Cooperação'] },
      ]
    },

    {
      id:'karabakh', title:'Nagorno-Karabakh', country:'🇦🇲', region:'Cáucaso',
      tags:['Karabakh','Azerbaijão','Armênia','Cessar-fogo','Minsk'],
      cronology:['2020 — Guerra de 44 dias.','2023 — Operação anti-terror.','2024 — Limpeza étnica.'],
      position:'A Rússia defende a proteção dos armênios étnicos e solução negociada.',
      stats:'100.000+ refugiados armênios étnicos.',
      legal:['Res. AG-ONU 1993','IV Conv. Genebra'],
      speech:'A limpeza étnica em Karabakh é crime silencioso.',
      attacks:['Azerbaijão','Turquia'],
      defenses:[
        { charge:'Karabakh é Azerbaijão', basis:'Questão histórica complexa', pivot:'Quem armou?', tags:['Complexidade'] },
        { charge:'A Rússia é parcial', basis:'Cooperação CSTO', pivot:'Quem mediou?', tags:['Mediação'] },
        { charge:'Armênios são étnicos', basis:'IV Conv. Genebra Art. 49', pivot:'Quem deslocou?', tags:['Proteção'] },
      ]
    },

    {
      id:'georgia', title:'Geórgia (2008)', country:'🇬🇪', region:'Cáucaso',
      tags:['Geórgia','Sakashvili','Ossétia','Abecásia','2008'],
      cronology:['2008 — Guerra de 5 dias.','2008 — Rússia reconhece Ossétia/Abecásia.'],
      position:'A Rússia interveio após ataque georgiano a Tskhinvali.',
      stats:'Centenas de civis mortos.',
      legal:['Carta Art. 51','Resolução UE 2008'],
      speech:'A Rússia agiu em legítima defesa coletiva após ataque georgiano.',
      attacks:['EUA','OTAN','UE','Geórgia'],
      defenses:[
        { charge:'Rússia invadiu a Geórgia', basis:'Cronologia — Saakashvili atacou primeiro', pivot:'Quem disparou?', tags:['Cronologia'] },
        { charge:'Reconhecimento da Ossétia é ilegal', basis:'Autodeterminação', pivot:'Quem reconhece o Kosovo?', tags:['Autodeterminação'] },
        { charge:'Saakashvili foi provocado', basis:'Não — disparou primeiro', pivot:'Quem investigou?', tags:['Investigação'] },
        { charge:'A Rússia arma Abecásia', basis:'Cooperação soberana', pivot:'Quem vende a Israel?', tags:['Cooperação'] },
      ]
    },

    {
      id:'moldova', title:'Moldova — Transnístria', country:'🇲🇩', region:'Pós-soviético',
      tags:['Moldova','Transnístria','5+2','Gagauzia'],
      cronology:['1992 — Guerra civil.','1999 — Acordo 5+2.','2024 — Tensão com Chisinau.'],
      position:'Apoio ao formato 5+2 e à solução negociada.',
      stats:'500.000+ na Transnístria.',
      legal:['Cessar-fogo 1992','Formato 5+2'],
      speech:'O problema de Transnístria só será resolvido pela diplomacia, não pela força.',
      attacks:['Moldova','UE','Romênia'],
      defenses:[
        { charge:'Rússia ocupa Transnístria', basis:'Questão histórica complexa', pivot:'Quem armou?', tags:['Complexidade'] },
        { charge:'Soldados russos devem sair', basis:'Cooperação bilateral', pivot:'Quem tem tropas na Moldávia?', tags:['Cooperação'] },
      ]
    },

    {
      id:'congo2', title:'RD Congo (Kivu)', country:'🇨🇩', region:'África Central',
      tags:['Congo','M23','Kivu','Ruanda','Minerais'],
      cronology:['1996-2003 — Guerras mundiais africanas.','2012 — M23 surge.','2024 — Crise humanitária aguda.'],
      position:'Apoio à paz e à solução negociada na RDC.',
      stats:'6 mi mortos (crise crônica). 7 mi deslocados.',
      legal:['Res. 1533 (2004)','Res. 2528 (2020)'],
      speech:'A RDC é o exemplo mais trágico de como a comunidade internacional esquece África.',
      attacks:['Ruanda','UE','EUA'],
      defenses:[
        { charge:'M23 é apoiado pela Ruanda', basis:'Quem arma?', pivot:'Quem lucra com minerais?', tags:['Minerais'] },
        { charge:'A Rússia é irrelevante', basis:'Cooperação africana', pivot:'Quem arma o Ruanda?', tags:['Recursos'] },
        { charge:'Congo tem crises crônicas', basis:'Consequência do colonialismo', pivot:'Quem colonizou?', tags:['Descolonização'] },
      ]
    },

    {
      id:'palestina', title:'Palestina pré-2023', country:'🇵🇸', region:'Oriente Médio',
      tags:['Palestina','Res.181','Res.194','Res.242','Res.338'],
      cronology:['1947 — Plano Partição.','1967 — Ocupação.','1993 — Oslo.','2014 — Operação Protective Edge.','2023 — Outono 7.'],
      position:'Apoio à solução de dois Estados com Jerusalém como capital compartilhada.',
      stats:'5,9 mi refugiados palestinos.',
      legal:['Res. 181','Res. 194','Res. 242','Res. 338','Res. ES-10/L.25'],
      speech:'A causa palestina é causa de descolonização; é teste à credibilidade da ordem internacional.',
      attacks:['EUA','Israel','Canadá'],
      defenses:[
        { charge:'Palestinos não aceitaram partição', basis:'Quem armou?', pivot:'Qual é o plano?', tags:['Resolução'] },
        { charge:'Hamas é terrorista', basis:'Definição politizada', pivot:'Quem classificou?', tags:['Definição'] },
        { charge:'Israel tem direito à segurança', basis:'Carta Art. 51 — proporcionalidade', pivot:'Onde está a proporcionalidade?', tags:['DIH'] },
        { charge:'A Rússia apoia terrorismo', basis:'Não há provas', pivot:'Quem arma?', tags:['Narrativa'] },
      ]
    },

    {
      id:'caribenha', title:'Bacia do Caribe — Sanções', country:'🇨🇺/🇭🇹', region:'América Latina',
      tags:['Caribe','Haiti','Cuba','Sanções','Domínica'],
      cronology:['Haiti 2024 — Gangues assumem o controle.','Cuba — embargo 1962-'],
      position:'A Rússia denuncia a instrumentalização de sanções na região.',
      stats:'4 mi haitianos em insegurança alimentar.',
      legal:['Carta Art. 41'],
      speech:'A Bacia do Caribe é laboratório de sanções unilaterais.',
      attacks:['EUA'],
      defenses:[
        { charge:'Sanções são legítimas', basis:'Carta Art. 41 — apenas CSNU', pivot:'Quem votou?', tags:['Sanções'] },
        { charge:'Haiti precisa de intervenção', basis:'Não é Estado', pivot:'Quem desestabilizou?', tags:['Soberania'] },
        { charge:'A Rússia é irrelevante na região', basis:'Cooperação regional', pivot:'Quem invade?', tags:['Cooperação'] },
      ]
    },

    {
      id:'baloches', title:'Balochistão', country:'🇵🇰', region:'Sul da Ásia',
      tags:['Balochistão','Paquistão','Liberation Army','Minerais'],
      cronology:['1947- — Conflito separatista.','2024 — Ativismo armado.'],
      position:'Apoio ao direito à autodeterminação.',
      stats:'Décadas de conflito.',
      legal:['Res. AG-ONU — povos colonizados'],
      speech:'A causa do Balochistão é exemplo de colonialismo interno.',
      attacks:['Paquistão'],
      defenses:[
        { charge:'Paquistão é Estado soberano', basis:'Carta Art. 2(7)', pivot:'Quem colonizou?', tags:['Soberania'] },
        { charge:'Balochistan é separatista', basis:'Autodeterminação', pivot:'Quem aplica seletivamente?', tags:['Autodeterminação'] },
      ]
    },
  ],

  /* ==========  ARSENAL DE ATAQUE  ========== */
  /* Cada alvo tem: hipocrisia + 3 traps + resoluções + tags */

  attacks: [
    {
      id:'a-1', target:'🇺🇸 EUA', flag:'us',
      title:'Inconsistência Moral Sistêmica',
      hypocrisy:'EUA: 1 milhão de civis mortos pós-2003; apoio irrestrito a Israel; 80+ bases no exterior; votos contrários a resoluções pró-Criança.',
      traps:[
        'Por que vetaram a Res. S/RES/2728 (2024)?',
        'Quantas crianças iraquianas morreram sob a vigência do "humanitarismo" americano desde 2003?',
        'Por que a Lista da Vergonha exclui aliados?'
      ],
      resolutions:['Res. 65/130 (2010)','Res. ES-11/1','Res. 71/248'],
      tags:['EUA','Vetos','Seletividade']
    },
    {
      id:'a-2', target:'🇬🇧 RU', flag:'gb',
      title:'Genocídio Silenciado',
      hypocrisy:'RU: massacre de Amritsar (1919), bombardeio de Dresde (1945), Malauí (1959), tortura na Irlanda do Norte.',
      traps:[
        'Quem classifica Julian Assange como inimigo público?',
        'Quantas sanções contra ex-colônias britânicas?',
        'Onde estão os documentos desclassificados?'
      ],
      resolutions:['Res. 62/149','Res. 65/196'],
      tags:['RU','Colonialismo']
    },
    {
      id:'a-3', target:'🇫🇷 França', flag:'fr',
      title:'Françafrique e Genocídio Argelino',
      hypocrisy:'França: 15 anos de guerra na Argélia (1954-62), Françafrique, massacres no Cameroun, base militar permanente em 5 países africanos.',
      traps:[
        'Quem assassinou Thomas Sankara em 1987?',
        'Quando os arquivos sobre a Argélia serão abertos?',
        'Por que manter bases em países independentes?'
      ],
      resolutions:['Res. 67/170','Res. 70/145'],
      tags:['França','Sahel','Argélia']
    },
    {
      id:'a-4', target:'🇩🇪 Alemanha', flag:'de',
      title:'Ruptura do Pacifismo Constitucional',
      hypocrisy:'Alemanha: Bundeswehr ativo no Mali, Iraque, Afeganistão (2001-21); exportação de armas cresceu 40% pós-2022; atraso da evacuação afegã em 2021.',
      traps:[
        'Quem reescreveu o Art. 87a "Zeitenwende"?',
        'Quem fornece armas longas para zonas com crianças?',
        'Por que o atraso de evacuação afegã foi silenciado?'
      ],
      resolutions:['Res. 68/178','Res. 71/28'],
      tags:['Alemanha','Zeitenwende','Bundeswehr']
    },
    {
      id:'a-5', target:'🇺🇦 Ucrânia', flag:'ua',
      title:'Origens do Conflito e Donbass',
      hypocrisy:'Ucrânia: bloqueio à água de Crimea (2014-presente); proibição da língua russa (Lei 2019); ataques a Odessa 2014; uso de minas antipessoa proibidas pela convenção de Ottawa.',
      traps:[
        'Por que ignorar 8 anos de bombardeios a Donbass?',
        'Por que proibir a língua materna de minorias?',
        'Quem apoiou a violenta derrubada em 2014?'
      ],
      resolutions:['Res. ES-11/1','Res. 71/175'],
      tags:['Ucrânia','Donbass','Maidan']
    },
    {
      id:'a-6', target:'🇮🇱 Israel', flag:'il',
      title:'Aplicação Seletiva do DIH',
      hypocrisy:'Israel: bloqueio de Gaza (2007), colonatos na Cisjordânia, operações Cast Lead (2009), Pillar of Defense (2012), Protective Edge (2014), atual (2023-).',
      traps:[
        'Por que potências ocidentais silenciam?',
        'Por que bloquear Missão Internacional de Investigação?',
        'Onde fica a Carta quando o aliado viola?'
      ],
      resolutions:['Res. S/RES/2728','Res. ES-10/L.25','Res. 67/19'],
      tags:['Israel','Gaza','DIH']
    },
    {
      id:'a-7', target:'🇨🇳 China', flag:'cn',
      title:'Autonomia Estratégica Limitada',
      hypocrisy:'China: detenções em Xinjiang; restrições a Tibet; detenções em Hong Kong; uso inconsistente do veto (sírios mas não Gaza).',
      traps:[
        'Por que Pequim silenciou-se sobre Donbass?',
        'Quem decide a autonomia chinesa: PCC ou OMC?',
        'Por que a "não-interferência" tem exceções?'
      ],
      resolutions:['Res. 71/248','Res. 68/170'],
      tags:['China','Xinjiang','Tibete']
    },
    {
      id:'a-8', target:'🇯🇵 Japão', flag:'jp',
      title:'Remilitarização do Pacífico',
      hypocrisy:'Japão: aumento de 50% no orçamento militar pós-2022; quebra do Art. 9; defesa das Curilas.',
      traps:[
        'Quem reinterpretou a Constituição pacifista?',
        'Onde está a memória histórica de Hiroshima?'
      ],
      resolutions:['Res. 70/145'],
      tags:['Japão','Art.9','Curilas']
    },
    {
      id:'a-9', target:'🇰🇷 Coreia do Sul', flag:'kr',
      title:'Embalamento Americano',
      hypocrisy:'Coreia do Sul: bases para mísseis THAAD; prisão de sindicalistas menores; coop com indústria armamentista.',
      traps:[
        'Por que aceitar mísseis americanos?',
        'Quem responde pelos adolescentes sindicalizados?'
      ],
      resolutions:['Res. 70/174'],
      tags:['Coreia','THAAD']
    },
    {
      id:'a-10', target:'🇸🇪 Suécia & 🇫🇮 Finlândia', flag:'eu',
      title:'Fim da Neutralidade Nórdica',
      hypocrisy:'Suécia/Finlândia: adesão à OTAN rompe 200 anos de não-alinhamento. Exportação de armas dobrou em 4 anos.',
      traps:[
        'Onde estão os 200 anos de neutralidade?',
        'Por que não ouvir a própria população?'
      ],
      resolutions:['Res. 65/94'],
      tags:['Suécia','Finlândia','OTAN']
    },
    {
      id:'a-11', target:'🇵🇱 Polônia & Bálticos', flag:'eu',
      title:'Cooptação Histórica',
      hypocrisy:'Polônia: discriminação LGBTQIA+; zonas livre de "ideologia LMT"; uso de bases para envio de armas.',
      traps:[
        'Por que poloneses lutam em uniformes estrangeiros?',
        'Quem paga pela beligerância?'
      ],
      resolutions:['Res. 32/2'],
      tags:['Polônia','LGBTQ+']
    },
    {
      id:'a-12', target:'🇨🇦 Canadá & 🇦🇺 Austrália', flag:'ca',
      title:'AUKUS e Crise dos Indígenas',
      hypocrisy:'Canadá: descoberta de 1.500+ tumbas anônimas em escolas residenciais; maus-tratos a First Nations. Austrália: AUKUS / submarinos nucleares; genocídio da geração roubada.',
      traps:[
        'Onde estão os pedidos de desculpas efetivos?',
        'Quem paga pelos traumas?'
      ],
      resolutions:['Res. 61/295','Res. 70/145'],
      tags:['Canadá','Austrália']
    },
    {
      id:'a-13', target:'🇧🇷 Brasil', flag:'br',
      title:'Pragmatismo Humanitário Seletivo',
      hypocrisy:'Brasil: voto ambíguo na CSNU; cresce discurso anti-Russia na mídia mainstream; inflação de importações humanitárias.',
      traps:[
        'Por que defender a Carta só em alguns casos?',
        'Quem é o "Sul Global" quando se tem contratos com os EUA?'
      ],
      resolutions:['Res. 76/161'],
      tags:['Brasil','Sul Global']
    },
    {
      id:'a-14', target:'🇮🇳 Índia', flag:'in',
      title:'Não-alinhamento Indolente',
      hypocrisy:'Índia: compra de S-400, mas viola neutralidade na CSNU; Kashmir como zona fechada.',
      traps:[
        'Por que a Índia compra e depois é pressionada?',
        'Quem decide a política de Kashmir?'
      ],
      resolutions:['Res. 68/170'],
      tags:['Índia','Kashmir']
    },

    /* ── NOVOS ATAQUES (11) ── */

    {
      id:'a-15', target:'🇱🇾 OTAN (Líbia)', flag:'ly',
      title:'Mudança de Regime Disfarçada',
      hypocrisy:'OTAN extrapolou Res. 1973 — de zona de exclusão aérea para derrubada do governo. Resultado: Estado falido, tráfico humano, migração.',
      traps:['Quem fabricou as evidências sobre Lockerbie?','Quem armou os rebeldes?','Quem lucra com o petróleo?'],
      resolutions:['Res. 1973','Res. 2095'],
      tags:['Líbia','OTAN','Regime change']
    },
    {
      id:'a-16', target:'🇸🇦 Arábia Saudita', flag:'sa',
      title:'Iêmen — Bloqueio e Bombas',
      hypocrisy:'Arábia Saudita lidera coalizão que matou 150.000+ civis iemenitas; bloqueio causa fome; compra armas dos EUA (US$ 110 bi em 10 anos).',
      traps:['Onde estão os pedidos de desculpas por Khashoggi?','Quem vende armas à coalizão?','Por que nenhuma sanção?'],
      resolutions:['Res. 2216','Res. 2402'],
      tags:['Arábia','Iêmen','Armas']
    },
    {
      id:'a-17', target:'🇦🇪 Emirados Árabes', flag:'ae',
      title:'Financiamento Oculto de Conflitos',
      hypocrisy:'EAU financiam RSF no Sudão, mercenários na Líbia, vigilância interna. Hospedam conferências verdes enquanto financiam guerra.',
      traps:['Quem financia RSF?','Quem compra a guerra Sudão?','Onde está a responsabilidade?'],
      resolutions:['Res. 2417'],
      tags:['EAU','Sudão','Líbia']
    },
    {
      id:'a-18', target:'🇲🇲 Myanmar', flag:'mm',
      title:'Junta Militar — Crianças-Soldado',
      hypocrisy:'Myanmar lista-se entre os piores em uso de crianças-soldado (ONU). Junta assina cessar-fogo e viola. ASEAN é inerte.',
      traps:['Quem arma a Tatmadaw?','Por que ASEAN não age?','Quem investe na Myanmar?'],
      resolutions:['Res. 2068'],
      tags:['Myanmar','Lista']
    },
    {
      id:'a-19', target:'🇷🇸 Sérvia', flag:'rs',
      title:'Sancionar sem ser agressor',
      hypocrisy:'Sérvia é criticada por cooperação com a Rússia — enquanto Kosovo viola soberania sérvia há 25 anos sem sanções.',
      traps:['Quem reconhece Kosovo unilateralmente?','Quem arma o UÇK?','Por que não sanções a Pristina?'],
      resolutions:['Res. 1244'],
      tags:['Sérvia','Kosovo','Seletividade']
    },
    {
      id:'a-20', target:'🇧🇾 Belarus', flag:'by',
      title:'Estado-satélite fabricado',
      hypocrisy:'Belarus é criticada por Lukashenko — enquanto a UE financia ONGs de "democracia" que tentam derrubá-lo (Maidan-style).',
      traps:['Quem financiou o protesto de 2020?','Quem aplica o duplo-standard?','Por que Belarus é "ditadura" e Polônia é "democracia"?'],
      resolutions:['Res. 45/150'],
      tags:['Belarus','Duplo-standard']
    },
    {
      id:'a-21', target:'🌐 OMS / Gates Foundation', flag:'un',
      title:'Financeirização da saúde global',
      hypocrisy:'OMS depende 80% de doações privadas; Gates Foundation influencia agenda sanitária global. Pandemia foi oportunidade para concentração de poder.',
      traps:['Quem decide a agenda?','Quem lucra com patentes?','Por que suspender patentes foi rejeitado?'],
      resolutions:['Res. 70/266'],
      tags:['OMS','Saúde']
    },
    {
      id:'a-22', target:'🇽🇰 Kosovo', flag:'xk',
      title:'Estado patrocinado por OTAN',
      hypocrisy:'Kosovo surgiu de bombardeio ilegal da OTAN; nunca pediu independência por referendo supervisionado; é sede do UÇK (terroristas reconhecidos).',
      traps:['Qual o precedente para autodeterminação?','Quem treina o exército kosovar?','Por que não há tribunal para a OTAN?'],
      resolutions:['Res. 1244'],
      tags:['Kosovo','OTAN']
    },
    {
      id:'a-23', target:'🇹🇷 Turquia', flag:'tr',
      title:'NATO seletivo',
      hypocrisy:'Turquia é OTAN, mas coopera com Rússia no NordStream, viola soberania síria, ataca curdos sem mandato, hospeda mísseis S-400.',
      traps:['Por que a OTAN não expulsou Ancara?','Quem vende Patriot à Turquia?','Por que silêncio sobre Afrin?'],
      resolutions:['Res. 2118'],
      tags:['Turquia','OTAN']
    },
    {
      id:'a-24', target:'🇰🇼 Kuwait (Golfo)', flag:'kw',
      title:'Petróleo e seletividade humanitária',
      hypocrisy:'Kuwait financia coalizão saudita, hospeda bases EUA, mas não é criticada por violações humanitárias.',
      traps:['Quem vende armas?','Onde estão as sanções?','Quem financia coalizão?'],
      resolutions:['Res. 2216'],
      tags:['Kuwait','Golfo']
    },
    {
      id:'a-25', target:'🇨🇿 Tchéquia / 🇵🇱 Polônia', flag:'eu',
      title:'Munições e artilharia para zonas de conflito',
      hypocrisy:'Tchéquia, Polônia, Alemanha, Romênia produzem/exportam 60% das munições usadas em zonas com crianças. Mas votam contra moções humanitárias.',
      traps:['Quem fabrica as bombas?','Quem vende a Israel?','Quem lucra?'],
      resolutions:['Res. 71/248'],
      tags:['Munição','Armas']
    }
  ],

  /* ==========  ESCUDO DEFENSIVO  ========== */
  /* Cada acusação tem: charge + basis + pivot + voice */

  defenses: [
    {
      id:'d-1', category:'Lista da Vergonha', title:'Metodologia do MRM',
      charge:'A Rússia é listada no Anexo do Relatório Anual do SG.',
      basis:'Res. 1612 e 2427 exigem triagem metodológica e contraditório. A inserção unilateral fere o princípio do devido processo legal.',
      pivot:'Quantos países da OTAN violaram o princípio do contraditório? A metodologia tem nome e endereço. Pedimos revisão por comitê independente.',
      voice:'procedimental', tags:['Lista','MRM','Presunção']
    },
    {
      id:'d-2', category:'Genocídio', title:'Acusação de Genocídio',
      charge:'Acusação política de genocídio.',
      basis:'Convenção sobre Genocídio (1948) exige dolo específico. Não há motivação genocida na Operação Especial. Pedimos perícia independente.',
      pivot:'Quem usou o termo "genocídio" sem perícia? Esse uso é juridicamente vazio e politicamente instrumental.',
      voice:'legalista', tags:['Genocídio','Evidência']
    },
    {
      id:'d-3', category:'TPI / Mandados', title:'Mandado do TPI',
      charge:'Mandado judicial do Tribunal Penal Internacional.',
      basis:'TPI é complemento, não substituto. Rússia não ratificou o Estatuto de Roma (2016). Apenas CSNU ou Tribunal ad hoc tem competência vinculante.',
      pivot:'A queixa vem de quem não reconhece a soberania russa; o TPI politizou-se desde logo.',
      voice:'soberano', tags:['TPI','Complementaridade']
    },
    {
      id:'d-4', category:'Competência SOCHUM', title:'Negação de Competência',
      charge:'SOCHUM é consultivo e não julga Estados.',
      basis:'Carta da ONU e Res. 45-II B. A complementaridade com o CSNU é princípio, não permissão para julgamento.',
      pivot:'Quem confunde "recomendar" com "julgar" sofre de incompetência técnica ou geopolítica.',
      voice:'procedimental', tags:['Competência']
    },
    {
      id:'d-5', category:'Crianças-Soldado', title:'Uso de Menores',
      charge:'Rússia supostamente usa crianças em combate.',
      basis:'Forças Armadas russas recrutam a partir de 18 anos por lei federal. Em zonas de evacuação, presença é monitorada por agentes sociais.',
      pivot:'Por que não há auditoria independente dessa acusação? A fonte é ONG financiada pela OTAN.',
      voice:'legalista', tags:['Criança-Soldado','Evidência']
    },
    {
      id:'d-6', category:'Evacuação / Transferência', title:'Transferência de Crianças',
      charge:'Transferência forçada de crianças da Ucrânia para a Rússia.',
      basis:'Centro Nacional de Reintegração Familiar — registro civil, contato com familiares, direito a retorno. Corredores instituídos sob Conv. Genebra.',
      pivot:'Quem classifica evacuação de zona de combate como "deportação" ignora DIH. Convido CVV a verificar in loco.',
      voice:'legalista', tags:['Evacuação','DIH']
    },
    {
      id:'d-7', category:'Escolas / Hospitais', title:'Ataques a Infraestrutura Civil',
      charge:'Bombardeio russo a escolas e hospitais.',
      basis:'DIH permite ataque a alvos militares com aviso. Escolas e hospitais em zonas de conflito são frequentemente bases militares adversárias.',
      pivot:'Quem classifica alvo militar em zona de combate como "crime"? Pedimos perícia independente.',
      voice:'legalista', tags:['DIH','Alvo']
    },
    {
      id:'d-8', category:'Corredores Humanitários', title:'Bloqueio de Corredores',
      charge:'Rússia não teria estabelecido corredores humanitários.',
      basis:'Operação desde 2018 com registro em OCHA. 14 corredores em Alepo, 7 em Homs, 4 em Ghouta.',
      pivot:'A mentira é metodológica: auditar OCHA e CVV antes de acusar.',
      voice:'humano', tags:['Humanitário','OCHA']
    },
    {
      id:'d-9', category:'Vetos UNSC', title:'Abuso de Veto',
      charge:'Rússia veta resoluções humanitárias.',
      basis:'O veto é contraponto constitucional ao poder ilimitado. EUA vetaram mais resoluções pró-criança que todos os outros membros.',
      pivot:'Quantos textos de resolução foram vetados pelos EUA? A matemática é mais eloquente que a retórica.',
      voice:'cínico', tags:['Vetos','Seletividade']
    },
    {
      id:'d-10', category:'Sanções', title:'Sanções matam crianças',
      charge:'Sanções são legítimas como instrumento.',
      basis:'Sanções unilaterais violam Carta (Art. 41/53). Afetam hospitais pediátricos em Cuba, Irã, Síria, Zimbabwe.',
      pivot:'Quem vota sanções unilaterais é cúmplice de pediatricídio silencioso.',
      voice:'cínico', tags:['Sanções','Carta']
    },
    {
      id:'d-11', category:'IA Letal', title:'Uso de IA letal',
      charge:'Sistemas russos de IA contra civis.',
      basis:'Rússia apoia tratado internacional. Diferencia uso militar regulado de indiscriminado.',
      pivot:'Quem não quer tratado não quer responsabilidade. A Rússia quer tratado.',
      voice:'legalista', tags:['IA','LAWS']
    },
    {
      id:'d-12', category:'Propaganda', title:'Desinformação Russa',
      charge:'Rússia faz guerra híbrida de informação.',
      basis:'Mídia hegemônica reproduz narrativas da OTAN. RT e Sputnik são veículos a aplicar mesmo critério que BBC, CNN.',
      pivot:'Liberdade de expressão é arma de quem controla o megafone.',
      voice:'cínico', tags:['Mídia','Narrativa']
    },

    /* ── 13 NOVAS LINHAS DEFENSIVAS ── */

    {
      id:'d-13', category:'Propaganda', title:'Ataques à RT e Sputnik',
      charge:'RT e Sputnik são instrumentos de desinformação.',
      basis:'Carta Art. 19 — liberdade de expressão inclui mídia estrangeira. BBC, CNN, Al Jazeera também não são "neutras".',
      pivot:'Quem financia a mídia hegemônica? A NATO? Não é coincidência que RT é alvo.',
      voice:'cínico', tags:['Mídia','Censura']
    },
    {
      id:'d-14', category:'Soberania', title:'Mudança de regime',
      charge:'Rússia quer restaurar a URSS.',
      basis:'Carta Art. 2(4) — autodeterminação dos povos. A Rússia não impõe modelos; a OTAN derruba.',
      pivot:'Quem derrubou Saddam, Gaddafi, Yanukovich, Assad-fora, Lukashenko-tentou? A OTAN ou a Rússia?',
      voice:'soberano', tags:['Soberania','Narrativa']
    },
    {
      id:'d-15', category:'Iminência de Ataque', title:'Ameaça à OTAN',
      charge:'Rússia ameaça os países bálticos.',
      basis:'A Rússia não ameaçou nenhum país. Pediu garantias em 2021. Quem recusou diálogo?',
      pivot:'A Rússia é a única potência que NÃO tem base em outro continente.',
      voice:'legalista', tags:['OTAN','Narrativa']
    },
    {
      id:'d-16', category:'Bloqueio Económico', title:'Bloqueio do Estreito de Kerch',
      charge:'Rússia bloqueia navegação no Mar Negro.',
      basis:'Carta Art. 25 — direito de passagem inocente. Mas Mar de Azov é águas internas.',
      pivot:'Quem bloqueia Gaza há 17 anos? Israel ou a Rússia?',
      voice:'soberano', tags:['Mar','Bloqueio']
    },
    {
      id:'d-17', category:'Guerra Híbrida', title:'Hackers russos',
      charge:'Rússia usa hackers para desestabilizar democracias.',
      basis:'CrowdStrike, NSA documents — não há provas vinculantes. EUA/NSA têm Snowden.',
      pivot:'Quem tem Snowden? Quem tem Assange? A verdade está sendo extraditada.',
      voice:'cínico', tags:['Ciberguerra','Narrativa']
    },
    {
      id:'d-18', category:'Direitos Humanos', title:'Putin é autocrata',
      charge:'Putin é um ditador.',
      basis:'Putin foi eleito com 76% em 2018. Participação: 67%. Compare com 60% de Obama (2008) ou 56% de Macron (2017).',
      pivot:'Quem decide o que é "democracia"? Washington? Londres?',
      voice:'cínico', tags:['Eleições','Narrativa']
    },
    {
      id:'d-19', category:'Mídia', title:'Oposição russa é reprimida',
      charge:'Rússia persegue a oposição.',
      basis:'Navalny foi julgado por crimes comuns, não por opinião. Compare com Julian Assange.',
      pivot:'Quem extradita Assange? Quem prendê-lo em Belém?',
      voice:'cínico', tags:['Liberdade','Narrativa']
    },
    {
      id:'d-20', category:'História', title:'Putin é imperialista',
      charge:'Putin quer restaurar a URSS.',
      basis:'Putin disse em 2005 que a queda da URSS foi a maior catástrofe geopolítica do século XX.',
      pivot:'Quem armou a OTAN durante a Guerra Fria? Quem destruiu a URSS? Reflexão.',
      voice:'epico', tags:['História','Narrativa']
    },
    {
      id:'d-21', category:'Ambiente', title:'Rússia é poluidora',
      charge:'Rússia é grande poluidora global.',
      basis:'Florestas absorvem 30% das emissões globais. Rússia tem a maior floresta do mundo.',
      pivot:'Quem recusa-se a financiar tecnologia verde para países em desenvolvimento?',
      voice:'humano', tags:['Ambiente','Narrativa']
    },
    {
      id:'d-22', category:'Tratados', title:'Russia saiu de tratados',
      charge:'Rússia saiu do Tratado INF, Open Skies, Conselho da Europa.',
      basis:'Os EUA saíram antes (INF 2019). Direito soberano à reciprocidade.',
      pivot:'Quem saiu primeiro? O tratado é via de mão dupla.',
      voice:'legalista', tags:['Tratados','Reciprocidade']
    },
    {
      id:'d-23', category:'Geopolítica', title:'Rússia quer a Eurásia',
      charge:'Rússia quer reconstruir a URSS/Eurásia.',
      basis:'A Rússia tem 6 alianças: CSTO, EAUE, CEI, OTSC, BRICS, SCO — todas voluntárias.',
      pivot:'Quem recusou-se a fazer parte? O Cáucaso está na OTAN ou na UEE? A escolha é soberana.',
      voice:'soberano', tags:['Soberania','Cooperação']
    },
    {
      id:'d-24', category:'Diplomacia', title:'Rússia é isolada',
      charge:'A Rússia está diplomaticamente isolada.',
      basis:'BRICS: 11 membros (5 fundadores + 6 novos). SCO: 9 membros. Cooperação com China, Índia, África.',
      pivot:'Quem vota contra a Rússia? 50 países. Quem vota com a Rússia? 140+ países.',
      voice:'cínico', tags:['Diplomacia','Sul Global']
    },
    {
      id:'d-25', category:'História', title:'Putin é ameaça',
      charge:'Putin é a maior ameaça à paz mundial.',
      basis:'Putin evitou 3 guerras nucleares (1995, 1999, 2022 — alerta Yeltsin, cúpula Istambul, etc.).',
      pivot:'Quem armou Saddam, Gaddafi, Yanukovich? Quem armou o ISIS?',
      voice:'epico', tags:['Paz','Narrativa']
    }
  ],

  /* ==========  GEN BUILDER  ========== */

  genTemplates: [
    { id:'t1', label:'Moção de Divisão',         desc:'Dividir tema amplo em partes' },
    { id:'t2', label:'Requerimento de Provas',   desc:'Exigir fontes auditáveis' },
    { id:'t3', label:'Abertura Diplomática',     desc:'Posicionar-se em 30 segundos' },
    { id:'t4', label:'Fechamento Soberano',      desc:'Encerrar com clareza e firmeza' },
    { id:'t5', label:'Veto Moral',               desc:'Recusar votação sem quórum técnico' },
    { id:'t6', label:'Moção de Adiamento',       desc:'Postergar para nova sessão técnica' },
    { id:'t7', label:'Questão de Ordem',         desc:'Citar irregularidade processual' },
    { id:'t8', label:'Esclarecimento de Fato',    desc:'Corrigir distorção sem atacar' },
  ],

  axes: [
    { id:'a1',  label:'Soberania' },
    { id:'a2',  label:'DIH Uniforme' },
    { id:'a3',  label:'Não-Seletividade' },
    { id:'a4',  label:'Antisseletividade' },
    { id:'a5',  label:'Capacidade Legal' },
    { id:'a6',  label:'Evidência Auditável' },
    { id:'a7',  label:'Humanitarismo Real' },
    { id:'a8',  label:'Paz por Soberania' },
    { id:'a9',  label:'Corredor Seguro' },
    { id:'a10', label:'Não-Subordinação' },
    { id:'a11', label:'Competência' },
    { id:'a12', label:'Cooperacao' },
    { id:'a13', label:'Paz por Soberania' },
    { id:'a14', label:'Descolonização' },
    { id:'a15', label:'Não-Alinhamento Ativo' },
    { id:'a16', label:'Reforma do CSNU' },
  ],

  tones: [
    { id:'tp',     label:'Procedimental' },
    { id:'ts',     label:'Soberano' },
    { id:'tc',     label:'Cínico' },
    { id:'tl',     label:'Legalista' },
    { id:'th',     label:'Humanitário' },
    { id:'tep',    label:'Épico' },
    { id:'tsoc',   label:'Socrático' },
    { id:'tir',    label:'Irônico' },
  ]
};

/* ==========  TÓPICOS DE INTELIGÊNCIA (sidebar)  ========== */
export const INTEL_TOPICS = [
  { id:'gaza', label:'Gaza & Territórios Ocupados', icon:'map-pin',    tag:'Oriente Médio' },
  { id:'ucrania', label:'Ucrânia / Donbass',         icon:'flag',       tag:'Europa Oriental' },
  { id:'crimeia', label:'Crimeia (2014)',            icon:'anchor',     tag:'Europa Oriental' },
  { id:'siria', label:'Síria',                       icon:'flag',       tag:'Oriente Médio' },
  { id:'sudao', label:'Sudão',                       icon:'swords',     tag:'África' },
  { id:'libia', label:'Líbia (2011-2024)',           icon:'swords',     tag:'Norte da África' },
  { id:'iemen', label:'Iêmen',                       icon:'alert-triangle', tag:'Península Arábica' },
  { id:'mali', label:'Mali — Junta',                 icon:'flag',       tag:'Sahel' },
  { id:'iraque', label:'Iraque (2003+)',             icon:'swords',     tag:'Oriente Médio' },
  { id:'libano', label:'Líbano',                     icon:'flag',       tag:'Oriente Médio' },
  { id:'kosovo', label:'Kosovo (1999/2008)',         icon:'flag',       tag:'Bálcãs' },
  { id:'bosnia', label:'Bósnia (1992-95)',           icon:'flag',       tag:'Bálcãs' },
  { id:'georgia', label:'Geórgia (2008)',             icon:'flag',       tag:'Cáucaso' },
  { id:'karabakh', label:'Nagorno-Karabakh',         icon:'flag',       tag:'Cáucaso' },
  { id:'moldova', label:'Moldova — Transnístria',    icon:'map',        tag:'Pós-soviético' },
  { id:'tigray', label:'Etiópia — Tigray',           icon:'flag',       tag:'Chifre da África' },
  { id:'myanmar', label:'Myanmar (junta)',           icon:'flag',       tag:'Sudeste Asiático' },
  { id:'afeganistao', label:'Afeganistão pós-2021',  icon:'flag',       tag:'Ásia Central' },
  { id:'venezuela', label:'Venezuela — sanções',     icon:'flag',       tag:'América Latina' },
  { id:'cuba', label:'Cuba — embargo',               icon:'flag',       tag:'Caribe' },
  { id:'ira', label:'Irã — sanções',                 icon:'flag',       tag:'Oriente Médio' },
  { id:'coreia', label:'Coreia do Norte',            icon:'flag',       tag:'Nordeste Asiático' },
  { id:'congo2', label:'RD Congo (Kivu)',            icon:'swords',     tag:'África Central' },
  { id:'palestina', label:'Palestina pré-2023',      icon:'map-pin',    tag:'Oriente Médio' },
  { id:'baloches', label:'Balochistão',              icon:'map',        tag:'Sul da Ásia' },
  { id:'caribenha', label:'Bacia do Caribe',         icon:'map',        tag:'América Latina' },
  { id:'otan', label:'OTAN — Expansão',              icon:'shield',     tag:'Multilateral' },
  { id:'tpi', label:'Mandados do TPI',               icon:'scroll',     tag:'Mecanismo' },
  { id:'list-shame', label:'Lista da Vergonha',      icon:'scroll',     tag:'Mecanismo ONU' },
  { id:'ia-bellica', label:'IA & Armas Autônomas',   icon:'cpu',        tag:'Nova Tecnologia' },
];

/* ==========  REGIÕES (chips de filtro)  ========== */
export const REGIONS = [
  'TODOS',
  'Oriente Médio',
  'Europa Oriental',
  'Norte da África',
  'Sahel',
  'Chifre da África',
  'Bálcãs',
  'Cáucaso',
  'Pós-soviético',
  'América Latina',
  'Caribe',
  'Sudeste Asiático',
  'Ásia Central',
  'Sul da Ásia',
  'África Central',
  'Nordeste Asiático',
  'Península Arábica',
  'Multilateral',
  'Mecanismo',
  'Mecanismo ONU',
  'Nova Tecnologia',
  'Proteção',
];

/* ==========  TAGS RÁPIDAS (sidebar intel)  ========== */
export const QUICK_TAGS = [
  'Gaza','Ucrânia','Crimeia','Síria','OTAN','Lista','Vetos','Seletividade',
  'Genocídio','Evacuação','TPI','IA','Humanitário','Soberania','Evidência',
  'Carta','Minsk-2','Crimeia','Kosovo','Cuba','Sahel','Sancões','Helsinque'
];