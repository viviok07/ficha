const races = [
  { id: 'humano', name: 'Humano', icon: '🧑', description: 'Igual a nós: determinado, aprende rápido e se adapta a qualquer profissão ou lugar do mundo.', traits: ['Aprende uma perícia extra', 'Talento para qualquer coisa', 'Coragem para tentar de novo', 'Faz amizade rápido'] },
  { id: 'anao', name: 'Anão', icon: '⛏️', description: 'Baixinho e forte como rocha, vive em montanhas e cria armas e armaduras excelentes.', traits: ['Braços de ferreiro', 'Sabedoria das montanhas', 'Resistência de rocha', 'Visão nas minas'] },
  { id: 'elfo', name: 'Elfo', icon: '🌿', description: 'Alto, elegante e de orelhas pontudas, vive nas florestas e se move sem fazer barulho.', traits: ['Passos silenciosos', 'Memória de séculos', 'Visão no escuro', 'Ouvido afiado'] },
  { id: 'halfling', name: 'Halfling', icon: '🍀', description: 'Pequenino, ágil e corajoso; adora comida, bons amigos e tem muita sorte.', traits: ['Escapa por qualquer fresta', 'Sente o perigo chegando', 'Sorte pequenina', 'Coragem de gigante'] },
  { id: 'draconato', name: 'Draconato', icon: '🐲', description: 'Um herói-dragão com escamas coloridas, cauda e uma baforada elemental impressionante.', traits: ['Força sobre-humana', 'Baforada elemental', 'Escamas protetoras', 'Cauda equilibrista'] },
  { id: 'tabaxi', name: 'Tabaxi', icon: '🐱', description: 'O povo-gato: curioso, veloz, com garras e talento para escalar lugares difíceis.', traits: ['Reflexos de gato', 'Escalada felina', 'Corrida veloz', 'Cai sempre de pé'] },
  { id: 'gnomo', name: 'Gnomo', icon: '🧠', description: 'Pequeno inventor de cabelos coloridos, mente brilhante, ilusões e piadas espertas.', traits: ['Ideias que ninguém teve antes', 'Pequena ilusão', 'Inventor curioso', 'Conversa com bichinhos'] },
];

const classes = [
  { id: 'guerreiro', name: 'Guerreiro', icon: '🛡️', description: 'O mestre das armas, vai para a linha de frente com espada, escudo e armadura pesada.', attributes: { forca: 5, destreza: 3, inteligencia: 2, sabedoria: 3 }, traits: ['Treinado em toda arma', 'Guarda que não abre', 'Aguenta o tranco', 'Anima a tropa'] },
  { id: 'barbaro', name: 'Bárbaro', icon: '💢', description: 'O guerreiro furioso que confia na força bruta, fica mais forte e quase não sente dor.', attributes: { forca: 5, destreza: 3, inteligencia: 1, sabedoria: 4 }, traits: ['Fúria de tempestade', 'Quase não sente dor', 'Grito que arrepia', 'Faro para o perigo'] },
  { id: 'ladino', name: 'Ladino', icon: '🗝️', description: 'Rápido, silencioso e esperto; abre fechaduras, desarma armadilhas e ataca de surpresa.', attributes: { forca: 2, destreza: 5, inteligencia: 4, sabedoria: 3 }, traits: ['Dedos de mestre', 'Some nas sombras', 'Ataca de surpresa', 'Enxerga a armadilha'] },
  { id: 'patrulheiro', name: 'Patrulheiro', icon: '🏹', description: 'O protetor da natureza, arqueiro incrível que rastreia pegadas e sobrevive na floresta.', attributes: { forca: 3, destreza: 5, inteligencia: 3, sabedoria: 5 }, traits: ['Mira que não erra', 'Lê pegadas no chão', 'Amigo dos animais', 'Em casa na floresta'] },
  { id: 'clerigo', name: 'Clérigo', icon: '✨', description: 'O guerreiro da cura, usa fé e magia de luz para ajudar amigos e afastar monstros sombrios.', attributes: { forca: 3, destreza: 2, inteligencia: 3, sabedoria: 5 }, traits: ['Mãos que curam', 'Luz que afasta sombras', 'Fé inabalável', 'Acalma quem tem medo'] },
  { id: 'mago', name: 'Mago', icon: '🪄', description: 'O cientista da magia, estuda livros antigos e lança feitiços como fogo ou invisibilidade.', attributes: { forca: 1, destreza: 3, inteligencia: 5, sabedoria: 4 }, traits: ['Memória de mil feitiços', 'Lê línguas antigas', 'Sente magia por perto', 'Curiosidade sem fim'] },
  { id: 'bardo', name: 'Bardo', icon: '🎵', description: 'O artista do grupo, usa música, poemas e piadas para fortalecer amigos e confundir vilões.', attributes: { forca: 2, destreza: 4, inteligencia: 4, sabedoria: 3 }, traits: ['Música que dá coragem', 'Lábia para tudo', 'Sabe toda história antiga', 'Vira amigo de qualquer um'] },
];

const skillCatalog = {
  guerreiro: {
    type: 'manobras',
    singular: 'manobra',
    options: [
      { id: 'golpe-preciso', name: 'Golpe preciso', icon: '🎯', description: 'Acerte um ponto fraco com sua arma e cause dano extra.' },
      { id: 'proteger-aliado', name: 'Proteger aliado', icon: '🛡️', description: 'Entre na frente de um ataque para defender um amigo próximo.' },
      { id: 'desarmar', name: 'Desarmar', icon: '⚔️', description: 'Tente derrubar a arma ou item perigoso da mão do inimigo.' },
      { id: 'investida', name: 'Investida', icon: '🏃', description: 'Avance rapidamente e empurre o alvo para trás.' },
      { id: 'postura-de-guarda', name: 'Postura de guarda', icon: '🧱', description: 'Fique firme, ganhando proteção até sua próxima ação.' },
    ],
  },
  barbaro: {
    type: 'manobras',
    singular: 'manobra',
    options: [
      { id: 'golpe-brutal', name: 'Golpe brutal', icon: '💥', description: 'Ataque com toda a força para causar um impacto devastador.' },
      { id: 'rugido-intimidador', name: 'Rugido intimidador', icon: '🗣️', description: 'Assuste inimigos próximos e chame a atenção deles para você.' },
      { id: 'arremesso-poderoso', name: 'Arremesso poderoso', icon: '🪨', description: 'Arremesse uma pedra, arma ou objeto pesado contra um alvo.' },
      { id: 'quebra-defesa', name: 'Quebra-defesa', icon: '🪓', description: 'Abra a guarda do inimigo para facilitar o próximo ataque aliado.' },
      { id: 'salto-selvagem', name: 'Salto selvagem', icon: '🐾', description: 'Salte sobre obstáculos e caia atacando com fúria.' },
    ],
  },
  ladino: {
    type: 'manobras',
    singular: 'manobra',
    options: [
      { id: 'ataque-furtivo', name: 'Ataque furtivo', icon: '🗡️', description: 'Apareça de surpresa e cause dano extra em um alvo distraído.' },
      { id: 'rolamento-evasivo', name: 'Rolamento evasivo', icon: '🌀', description: 'Role para fora de perigo e se reposicione rapidamente.' },
      { id: 'mao-leve', name: 'Mão leve', icon: '🖐️', description: 'Pegue ou esconda um item pequeno sem chamar atenção.' },
      { id: 'poeira-nos-olhos', name: 'Poeira nos olhos', icon: '💨', description: 'Confunda um inimigo para escapar ou ajudar um aliado.' },
      { id: 'passo-silencioso', name: 'Passo silencioso', icon: '🤫', description: 'Mova-se sem fazer barulho para chegar a um lugar seguro.' },
    ],
  },
  patrulheiro: {
    type: 'manobras',
    singular: 'manobra',
    options: [
      { id: 'tiro-marcado', name: 'Tiro marcado', icon: '🏹', description: 'Mire com calma e guie seus aliados até o alvo certo.' },
      { id: 'armadilha-rapida', name: 'Armadilha rápida', icon: '🪤', description: 'Monte uma armadilha simples para atrasar uma criatura.' },
      { id: 'passo-da-floresta', name: 'Passo da floresta', icon: '🌲', description: 'Atravesse terreno difícil sem perder velocidade.' },
      { id: 'corte-duplo', name: 'Corte duplo', icon: '⚔️', description: 'Ataque com duas armas leves em sequência.' },
      { id: 'chamar-companheiro', name: 'Chamar companheiro', icon: '🐺', description: 'Peça ajuda de um animal aliado para rastrear ou distrair.' },
    ],
  },
  clerigo: {
    type: 'magias',
    singular: 'magia',
    options: [
      { id: 'curar-ferimentos', name: 'Curar ferimentos', icon: '💚', description: 'Recupere a energia de um aliado machucado.' },
      { id: 'luz-sagrada', name: 'Luz sagrada', icon: '✨', description: 'Crie uma luz que afasta sombras e criaturas assustadoras.' },
      { id: 'escudo-da-fe', name: 'Escudo da fé', icon: '🛡️', description: 'Proteja alguém com uma barreira brilhante por alguns instantes.' },
      { id: 'benção', name: 'Benção', icon: '🙏', description: 'Inspire o grupo para agir com mais confiança.' },
      { id: 'chama-radiante', name: 'Chama radiante', icon: '🔥', description: 'Lance uma centelha de luz quente contra um inimigo.' },
    ],
  },
  mago: {
    type: 'magias',
    singular: 'magia',
    options: [
      { id: 'bola-de-fogo', name: 'Bola de fogo', icon: '☄️', description: 'Crie uma explosão flamejante que ilumina o campo de batalha.' },
      { id: 'missil-magico', name: 'Míssil mágico', icon: '🌠', description: 'Dispare pequenos projéteis de energia que perseguem o alvo.' },
      { id: 'invisibilidade', name: 'Invisibilidade', icon: '👻', description: 'Fique oculto por pouco tempo para passar despercebido.' },
      { id: 'sono', name: 'Sono', icon: '💤', description: 'Faça criaturas cansadas cochilarem por alguns minutos.' },
      { id: 'escudo-arcano', name: 'Escudo arcano', icon: '🔮', description: 'Levante uma proteção mágica contra ataques perigosos.' },
    ],
  },
  bardo: {
    type: 'magias',
    singular: 'magia',
    options: [
      { id: 'cancao-corajosa', name: 'Canção corajosa', icon: '🎶', description: 'Cante para encorajar aliados e afastar o medo.' },
      { id: 'encantar-pessoa', name: 'Encantar pessoa', icon: '💞', description: 'Deixe alguém mais amigável durante uma conversa.' },
      { id: 'ilusão-sonora', name: 'Ilusão sonora', icon: '🔔', description: 'Crie sons falsos para distrair ou impressionar.' },
      { id: 'palavra-curativa', name: 'Palavra curativa', icon: '💬', description: 'Use uma frase mágica para ajudar um amigo a se recuperar.' },
      { id: 'piada-desconcertante', name: 'Piada desconcertante', icon: '😄', description: 'Conte uma piada encantada que atrapalha a ação de um vilão.' },
    ],
  },
};

const appearanceGroups = [
  { key: 'skin', title: 'Tom de pele', icon: '🎨', options: ['Clara', 'Morena clara', 'Morena', 'Escura'] },
  { key: 'hair', title: 'Cabelo', icon: '💇', options: ['Curto', 'Cacheado', 'Longo', 'Trançado', 'Coque'] },
  { key: 'hairColor', title: 'Cor do cabelo', icon: '💧', options: ['Preto', 'Castanho', 'Ruivo', 'Prateado', 'Loiro', 'Azul', 'Roxo'] },
  { key: 'eyes', title: 'Cor dos olhos', icon: '👁️', options: ['Castanhos', 'Verdes', 'Azuis', 'Cinzas', 'Roxos', 'Vermelhos', 'Pretos', 'Laranja'] },
  { key: 'height', title: 'Estatura', icon: '📏', options: ['Baixa', 'Média', 'Alta'] },
  { key: 'body', title: 'Tipo físico', icon: '✿', options: ['Leve', 'Atlético', 'Forte', 'Robusto'] },
  { key: 'marks', title: 'Marcas e detalhes', icon: '✴', options: ['Nenhuma', 'Cicatriz no rosto', 'Sardas', 'Tatuagem mágica'] },
  { key: 'accessory', title: 'Acessório', icon: '○', options: ['Nenhum', 'Colar com pingente', 'Brinco', 'Óculos'] },
  { key: 'style', title: 'Roupa / estilo', icon: '🧥', options: ['Roupa da floresta', 'Armadura leve', 'Manto mágico', 'Roupa de viagem'] },
];

const personalityCatalog = [
  { id: 'valente', name: 'Valente', icon: '🦁', description: 'Encara o medo e vai em frente mesmo tremendo.' },
  { id: 'gentil', name: 'Gentil', icon: '💛', description: 'Trata todo mundo com carinho, até quem acabou de conhecer.' },
  { id: 'leal', name: 'Leal', icon: '🤝', description: 'Nunca abandona um amigo, nem no perigo.' },
  { id: 'alegre', name: 'Alegre', icon: '😄', description: 'Sempre acha um motivo para rir e animar o grupo.' },
  { id: 'inteligente', name: 'Inteligente', icon: '🧠', description: 'Pensa rápido e acha saída para problemas difíceis.' },
  { id: 'paciente', name: 'Paciente', icon: '🐢', description: 'Sabe esperar a hora certa sem se irritar.' },
  { id: 'falante', name: 'Falante', icon: '🗣️', description: 'Puxa conversa com qualquer um que aparecer.' },
  { id: 'otimista', name: 'Otimista', icon: '🌟', description: 'Acredita que tudo vai dar certo no final.' },
  { id: 'persistente', name: 'Persistente', icon: '🧗', description: 'Tenta de novo e de novo até conseguir.' },
  { id: 'responsavel', name: 'Responsável', icon: '🧰', description: 'Cuida das próprias coisas e das do grupo.' },
];

const equipmentCatalog = {
  guerreiro: [
    { id: 'espada-longa', name: 'Espada longa', icon: '⚔️', description: 'A arma clássica de quem treina desde pequeno.' },
    { id: 'escudo-de-aco', name: 'Escudo de aço', icon: '🛡️', description: 'Protege você e quem estiver do seu lado.' },
    { id: 'armadura-de-placas', name: 'Armadura de placas', icon: '🪖', description: 'Pesada, mas quase nada consegue atravessar.' },
    { id: 'martelo-de-guerra', name: 'Martelo de guerra', icon: '🔨', description: 'Amassa até o escudo do inimigo.' },
    { id: 'capa-do-regimento', name: 'Capa do regimento', icon: '🧣', description: 'Mostra a quem você jurou lealdade.' },
    { id: 'lanca-de-torneio', name: 'Lança de torneio', icon: '🔱', description: 'Alcança o inimigo antes que ele chegue perto.' },
    { id: 'espada-curta-reserva', name: 'Espada curta de reserva', icon: '🗡️', description: 'A segunda lâmina, para quando a primeira cai.' },
    { id: 'elmo-com-viseira', name: 'Elmo com viseira', icon: '⛑️', description: 'Protege o rosto e ainda deixa você enxergar bem.' },
    { id: 'botas-reforcadas', name: 'Botas reforçadas', icon: '🥾', description: 'Firmes no chão: ninguém derruba você.' },
  ],
  barbaro: [
    { id: 'machado-enorme', name: 'Machado enorme', icon: '🪓', description: 'Precisa das duas mãos e derruba portas.' },
    { id: 'peles-de-urso', name: 'Peles de urso', icon: '🐻', description: 'Roupa quente que aguenta neve e garras.' },
    { id: 'clava-de-pedra', name: 'Clava de pedra', icon: '🪨', description: 'Simples, pesada e muito convincente.' },
    { id: 'amuleto-de-osso', name: 'Amuleto de osso', icon: '🦴', description: 'Lembrança da tribo que dá coragem.' },
    { id: 'tambor-de-guerra', name: 'Tambor de guerra', icon: '🥁', description: 'O som faz o coração dos amigos acelerar.' },
    { id: 'lanca-de-caca', name: 'Lança de caça', icon: '🔱', description: 'Serve para caçar o jantar e para enfrentar o perigo.' },
    { id: 'escudo-de-madeira', name: 'Escudo de madeira e couro', icon: '🛡️', description: 'Simples de fazer e difícil de quebrar.' },
    { id: 'braceletes-de-couro', name: 'Braceletes de couro', icon: '🧤', description: 'Protegem os braços nos golpes mais fortes.' },
    { id: 'capuz-de-lobo', name: 'Capuz de pele de lobo', icon: '🐺', description: 'Assusta de longe e esquenta na tempestade.' },
  ],
  ladino: [
    { id: 'par-de-adagas', name: 'Par de adagas', icon: '🗡️', description: 'Duas lâminas leves, rápidas e silenciosas.' },
    { id: 'capa-com-capuz', name: 'Capa escura com capuz', icon: '🧥', description: 'Some nas sombras e esconde o rosto.' },
    { id: 'ferramentas-de-ladrao', name: 'Ferramentas de abrir fechaduras', icon: '🗝️', description: 'Ganchinhos que abrem quase qualquer porta.' },
    { id: 'corda-com-gancho', name: 'Corda fina com gancho', icon: '🪢', description: 'Sobe muros e desce por janelas.' },
    { id: 'mascara-de-meio-rosto', name: 'Máscara de meio rosto', icon: '🎭', description: 'Ninguém sabe quem passou por ali.' },
    { id: 'besta-de-mao', name: 'Besta de mão', icon: '🎯', description: 'Pequena, silenciosa e cabe embaixo da capa.' },
    { id: 'estilingue-de-bolso', name: 'Estilingue de bolso', icon: '🪨', description: 'Acerta de longe e faz barulho para distrair a guarda.' },
    { id: 'botas-macias', name: 'Botas macias de feltro', icon: '👢', description: 'Nenhum passo seu faz barulho no assoalho.' },
    { id: 'luvas-sem-dedos', name: 'Luvas sem dedos', icon: '🧤', description: 'Agarram qualquer parede e não deixam marca.' },
  ],
  patrulheiro: [
    { id: 'arco-longo', name: 'Arco longo e aljava', icon: '🏹', description: 'Acerta o alvo bem de longe.' },
    { id: 'capa-camuflada', name: 'Capa camuflada de folhas', icon: '🍃', description: 'Você vira parte da floresta.' },
    { id: 'punhal-de-caca', name: 'Punhal de caça', icon: '🔪', description: 'Corta corda, galho e o que aparecer.' },
    { id: 'apito-do-companheiro', name: 'Apito do companheiro animal', icon: '🐺', description: 'Chama seu amigo animal de longe.' },
    { id: 'botas-de-trilha', name: 'Botas de trilha', icon: '🥾', description: 'Andam o dia inteiro sem machucar o pé.' },
    { id: 'lanca-de-arremesso', name: 'Lança curta de arremesso', icon: '🔱', description: 'Leve de jogar e fácil de buscar depois.' },
    { id: 'funda-de-couro', name: 'Funda de couro', icon: '🪨', description: 'Uma pedra bem mirada resolve muita coisa.' },
    { id: 'gibao-de-couro', name: 'Gibão de couro', icon: '🦺', description: 'Armadura leve que não atrapalha correr.' },
    { id: 'chapeu-de-abas-largas', name: 'Chapéu de abas largas', icon: '👒', description: 'Segura a chuva e o sol na trilha inteira.' },
  ],
  clerigo: [
    { id: 'martelo-abencoado', name: 'Martelo leve abençoado', icon: '🔨', description: 'Brilha um pouquinho quando você reza.' },
    { id: 'simbolo-do-sol', name: 'Símbolo sagrado do sol', icon: '☀️', description: 'O sinal da sua fé, pendurado no peito.' },
    { id: 'bolsa-de-curativos', name: 'Bolsa de curativos', icon: '🧵', description: 'Ataduras e ervas para cuidar dos amigos.' },
    { id: 'livro-de-preces', name: 'Livro de preces', icon: '📖', description: 'Palavras antigas que acalmam qualquer um.' },
    { id: 'tunica-branca', name: 'Túnica branca bordada', icon: '👘', description: 'Roupa simples com fios dourados.' },
    { id: 'maca-de-peregrino', name: 'Maça de peregrino', icon: '⚒️', description: 'Vira bordão na estrada e arma no perigo.' },
    { id: 'escudo-com-simbolo', name: 'Escudo com o símbolo sagrado', icon: '🛡️', description: 'Protege você e mostra em quem você acredita.' },
    { id: 'manto-de-la', name: 'Manto de lã com capuz', icon: '🧥', description: 'Aquece nas noites longas de viagem.' },
    { id: 'incensario-de-bronze', name: 'Incensário de bronze', icon: '🕯️', description: 'A fumaça perfumada acalma quem está com medo.' },
  ],
  mago: [
    { id: 'cajado-antigo', name: 'Cajado de madeira antiga', icon: '🪄', description: 'Ajuda a mirar e a guardar magia.' },
    { id: 'livro-de-feiticos', name: 'Livro de feitiços', icon: '📕', description: 'Todas as magias que você já estudou.' },
    { id: 'cristal-magico', name: 'Cristal mágico', icon: '🔮', description: 'Guarda energia para o feitiço mais difícil.' },
    { id: 'manto-estrelado', name: 'Manto estrelado', icon: '🌌', description: 'Tecido azul que parece o céu à noite.' },
    { id: 'chapeu-pontudo', name: 'Chapéu pontudo', icon: '🎩', description: 'Ninguém duvida que você é mago.' },
    { id: 'varinha-de-cristal', name: 'Varinha de cristal', icon: '💎', description: 'Menor que o cajado e mais rápida de apontar.' },
    { id: 'adaga-ritual', name: 'Adaga ritual', icon: '🗡️', description: 'Corta as ervas e os ingredientes das poções.' },
    { id: 'tunica-com-runas', name: 'Túnica com runas bordadas', icon: '👘', description: 'As runas brilham quando tem magia por perto.' },
    { id: 'bolsa-de-componentes', name: 'Bolsa de componentes', icon: '🎒', description: 'Penas, pó colorido e outras coisas de feitiço.' },
  ],
  bardo: [
    { id: 'alaude', name: 'Alaúde de cordas brilhantes', icon: '🪕', description: 'O instrumento que abre portas e corações.' },
    { id: 'flauta-encantada', name: 'Flauta encantada', icon: '🪈', description: 'Toca sozinha se você pedir com jeitinho.' },
    { id: 'caderno-de-cancoes', name: 'Caderno de canções', icon: '📓', description: 'Todas as músicas e histórias que você inventou.' },
    { id: 'casaco-colorido', name: 'Casaco colorido de artista', icon: '🧥', description: 'Chama atenção em qualquer praça.' },
    { id: 'chapeu-com-pluma', name: 'Chapéu com pluma', icon: '🪶', description: 'A pluma balança quando você faz reverência.' },
    { id: 'rapieira-elegante', name: 'Rapieira elegante', icon: '🤺', description: 'Fina, veloz e combina com a reverência.' },
    { id: 'adaga-escondida', name: 'Adaga escondida no alaúde', icon: '🗡️', description: 'Ninguém espera que o músico saiba se defender.' },
    { id: 'botas-de-veludo', name: 'Botas de veludo', icon: '👢', description: 'Confortáveis para dançar a noite inteira.' },
    { id: 'capa-de-cetim', name: 'Capa de cetim brilhante', icon: '🧣', description: 'Roda no ar quando você faz a reverência final.' },
  ],
};

const steps = [
  { id: 'race', number: 1, title: 'Raça', subtitle: 'Escolha sua origem' },
  { id: 'class', number: 2, title: 'Classe', subtitle: 'Escolha sua profissão' },
  { id: 'skills', number: 3, title: 'Habilidades', subtitle: 'Escolha 2 opções' },
  { id: 'appearance', number: 4, title: 'Aparência', subtitle: 'Defina sua aparência' },
  { id: 'story', number: 5, title: 'História', subtitle: 'Conte um pouco sobre você' },
  { id: 'overview', number: 6, title: 'Visão geral', subtitle: 'Veja o retrato e gere o PDF' },
];

const SKILL_LIMIT = 2;
const PERSONALITY_LIMIT = 3;
const EQUIPMENT_LIMIT = 2;

// Integração com o Gemini (Interactions API) ---------------------------------
// A chamada sai do NAVEGADOR, sem backend: a chave é digitada pelo usuário, vive só nesta
// sessão e some no F5. Ver docs/INTEGRACAO_GEMINI.md.
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/interactions';

// Nomes conferidos na documentação oficial. "outro" não é um modelo: é a opção que revela o
// campo de texto, porque a Google renomeia modelo com frequência e o app não se atualiza sozinho.
const GEMINI_MODELS = [
  { id: 'gemini-3.1-flash-image', name: 'Nano Banana 2 (equilibrado)' },
  { id: 'gemini-3.1-flash-lite-image', name: 'Nano Banana 2 Lite (mais rápido e barato)' },
  { id: 'gemini-3-pro-image', name: 'Nano Banana Pro (mais caro)' },
  { id: 'gemini-2.5-flash-image', name: 'Nano Banana (legado)' },
  { id: 'outro', name: 'Outro (digitar o nome)' },
];

// Só proporções verticais: o retrato é de corpo inteiro e ocupa uma coluna estreita no PDF.
const GEMINI_ASPECTS = ['3:4', '2:3', '4:5', '9:16'];
// Teto de 1K de propósito: 2K/4K virariam um data URL enorme atravessando o html2canvas.
const GEMINI_SIZES = ['1K', '0.5K'];

// error.code da Interactions API -> texto que a criança lê. Toda mensagem termina no caminho
// manual, que continua disponível mesmo quando o Gemini falha.
const GEMINI_ERRORS = {
  quota_exceeded: 'A conta do Gemini está sem crédito ou já bateu o limite de hoje. Copie o prompt aqui em cima e gere a imagem na ferramenta de IA que você preferir, depois use CARREGAR IMAGEM.',
  rate_limit_exceeded: 'A conta do Gemini está sem crédito ou já bateu o limite de hoje. Copie o prompt aqui em cima e gere a imagem na ferramenta de IA que você preferir, depois use CARREGAR IMAGEM.',
  too_many_requests: 'A conta do Gemini está sem crédito ou já bateu o limite de hoje. Copie o prompt aqui em cima e gere a imagem na ferramenta de IA que você preferir, depois use CARREGAR IMAGEM.',
  failed_precondition: 'A conta do Gemini está sem crédito ou já bateu o limite de hoje. Copie o prompt aqui em cima e gere a imagem na ferramenta de IA que você preferir, depois use CARREGAR IMAGEM.',
  authentication: 'O Gemini não aceitou essa chave. Confira a chave em ⚙ GEMINI — ou copie o prompt e gere a imagem manualmente.',
  permission_denied: 'Essa chave não tem permissão para gerar imagens. Confira a conta no Google AI Studio — ou copie o prompt e gere a imagem manualmente.',
  model_not_found: 'O modelo escolhido não está disponível para essa chave. Tente outro em ⚙ GEMINI — ou copie o prompt e gere a imagem manualmente.',
  not_found: 'O modelo escolhido não está disponível para essa chave. Tente outro em ⚙ GEMINI — ou copie o prompt e gere a imagem manualmente.',
  safety: 'O Gemini não pôde criar esta imagem por causa das regras de conteúdo dele. Tente mudar a história ou a aparência — ou copie o prompt e gere a imagem manualmente.',
  image_safety: 'O Gemini não pôde criar esta imagem por causa das regras de conteúdo dele. Tente mudar a história ou a aparência — ou copie o prompt e gere a imagem manualmente.',
  prohibited_content: 'O Gemini não pôde criar esta imagem por causa das regras de conteúdo dele. Tente mudar a história ou a aparência — ou copie o prompt e gere a imagem manualmente.',
  image_prohibited_content: 'O Gemini não pôde criar esta imagem por causa das regras de conteúdo dele. Tente mudar a história ou a aparência — ou copie o prompt e gere a imagem manualmente.',
  recitation: 'O Gemini não pôde criar esta imagem por causa das regras de conteúdo dele. Tente mudar a história ou a aparência — ou copie o prompt e gere a imagem manualmente.',
  image_recitation: 'O Gemini não pôde criar esta imagem por causa das regras de conteúdo dele. Tente mudar a história ou a aparência — ou copie o prompt e gere a imagem manualmente.',
  image_other: 'O Gemini não pôde criar esta imagem por causa das regras de conteúdo dele. Tente mudar a história ou a aparência — ou copie o prompt e gere a imagem manualmente.',
  content_blocked: 'O Gemini não pôde criar esta imagem por causa das regras de conteúdo dele. Tente mudar a história ou a aparência — ou copie o prompt e gere a imagem manualmente.',
  no_image: 'O Gemini respondeu, mas não mandou nenhuma imagem. Tente de novo — ou copie o prompt e gere a imagem manualmente.',
  api_error: 'O Gemini está fora do ar agora. Tente de novo em alguns minutos — ou copie o prompt e gere a imagem manualmente.',
  service_unavailable: 'O Gemini está fora do ar agora. Tente de novo em alguns minutos — ou copie o prompt e gere a imagem manualmente.',
  deadline_exceeded: 'O Gemini está fora do ar agora. Tente de novo em alguns minutos — ou copie o prompt e gere a imagem manualmente.',
};

const GEMINI_NETWORK_ERROR = 'Não consegui falar com o Gemini (sem internet ou conexão bloqueada). Copie o prompt e gere a imagem na ferramenta de IA que você preferir.';
const GEMINI_NO_IMAGE_ERROR = GEMINI_ERRORS.no_image;

// Configuração da sessão. NÃO entra em characterJson(), NÃO vai para localStorage e NÃO é
// escrita em log: ao atualizar a página tudo isto some e o modal volta.
const gemini = {
  modalOpen: true,
  apiKey: '',
  model: GEMINI_MODELS[0].id,
  customModel: '',
  aspectRatio: GEMINI_ASPECTS[0],
  imageSize: GEMINI_SIZES[0],
};

const imageState = {
  dataUrl: '',
  uploadError: '',
  prompt: '',
  copyStatus: '',
  pdfLoading: false,
  pdfError: '',
  aiLoading: false,
  aiError: '',
};

const state = {
  step: 'race',
  name: '',
  player: '',
  age: '',
  gender: '',
  height: '',
  race: '',
  class: '',
  skills: [],
  appearance: {
    skin: '',
    hair: '',
    hairColor: '',
    eyes: '',
    height: '',
    body: '',
    marks: '',
    accessory: '',
    style: '',
  },
  personality: [],
  equipment: [],
  story: '',
};

const $ = (selector) => document.querySelector(selector);
const selectedRace = () => races.find((item) => item.id === state.race);
const selectedClass = () => classes.find((item) => item.id === state.class);
const selectedSkillCatalog = () => skillCatalog[state.class];
const selectedSkills = () => (selectedSkillCatalog()?.options || []).filter((item) => state.skills.includes(item.id));
const equipmentOptions = () => equipmentCatalog[state.class] || [];
const selectedEquipment = () => equipmentOptions().filter((item) => state.equipment.includes(item.id));
const selectedPersonality = () => personalityCatalog.filter((item) => state.personality.includes(item.id));
const characterJson = () => ({
  name: state.name,
  player: state.player,
  age: state.age,
  gender: state.gender,
  height: state.height,
  race: selectedRace() || null,
  class: selectedClass() || null,
  skills: selectedSkills(),
  appearance: state.appearance,
  personality: selectedPersonality(),
  equipment: selectedEquipment(),
  story: state.story,
});

function render() {
  const focus = captureFocus();
  $('#root').innerHTML = `
    <main class="page">
      ${renderGeminiModal()}
      <header class="hero-head">
        <div class="brand">
          <div class="sigil">✡</div>
          <div>
            <h1>EDUCARPG KIDS</h1>
            <p>Monte seu herói e viva grandes aventuras!</p>
          </div>
          <div class="twinkle">✦</div>
        </div>
        <div class="actions">
          <button class="ghost" data-action="reset">↻ REINICIAR</button>
          <button class="ghost" data-action="import">⇪ IMPORTAR JSON</button>
          <a class="ghost ghost-link" href="./guia.html" target="_blank" rel="noopener">❖ GUIA DO AVENTUREIRO</a>
          <button class="primary" data-action="save">▣ SALVAR FICHA</button>
          <input class="file-input" type="file" accept="application/json,.json" data-file-input />
          <input class="file-input" type="file" accept="image/*" data-image-input />
        </div>
      </header>
      <div class="workspace">
        ${renderStepper()}
        ${renderCurrentStep()}
        ${renderSheet()}
      </div>
    </main>`;
  bindEvents();
  restoreFocus(focus);
}

function focusSelector(element) {
  if (!element || !element.dataset) return '';
  if (element.dataset.field) return `[data-field="${element.dataset.field}"]`;
  return '';
}

function captureFocus() {
  const element = document.activeElement;
  const selector = focusSelector(element);
  if (!selector) return null;
  return { selector, start: element.selectionStart, end: element.selectionEnd };
}

function restoreFocus(focus) {
  if (!focus) return;
  const element = $(focus.selector);
  if (!element) return;
  element.focus();
  if (focus.start === null || focus.start === undefined) return;
  const limit = element.value.length;
  try {
    element.setSelectionRange(Math.min(focus.start, limit), Math.min(focus.end ?? focus.start, limit));
  } catch (error) {
    // Alguns tipos de input não suportam seleção; manter só o foco.
  }
}

function renderStepper() {
  return `<aside class="steps">${steps.map((step) => `
    <button class="step ${state.step === step.id ? 'active' : ''}" data-step="${step.id}">
      <strong>${step.number}</strong>
      <h3>${step.title}</h3>
      <p>${step.subtitle}</p>
    </button>`).join('')}</aside>`;
}

function renderCurrentStep() {
  if (state.step === 'race') return renderRaceStep();
  if (state.step === 'class') return renderClassStep();
  if (state.step === 'skills') return renderSkillsStep();
  if (state.step === 'appearance') return renderAppearanceStep();
  if (state.step === 'overview') return renderOverviewStep();
  return renderStoryStep();
}

function renderRaceStep() {
  const race = selectedRace();
  return `<section class="panel current-panel"><h2>✦ 1. ESCOLHA SUA RAÇA ✦</h2><p>Cada raça possui habilidades únicas.</p><div class="option-grid race-grid">${races.map((item, index) => `
    <button class="choice-card p${index} ${state.race === item.id ? 'selected' : ''}" data-race="${item.id}">
      <span class="choice-art">${item.icon}</span><b>${item.name}</b><em>${state.race === item.id ? '✓' : ''}</em>
    </button>`).join('')}</div>${race ? `<div class="info"><h3>${race.icon} ${race.name.toUpperCase()}</h3><p>${race.description}</p><b>Vantagens:</b><ul>${race.traits.map((trait) => `<li>${trait}</li>`).join('')}</ul></div>` : '<div class="info empty"><p>Nenhuma raça escolhida ainda.</p></div>'}${renderNavButtons('class')}</section>`;
}

function renderClassStep() {
  const klass = selectedClass();
  return `<section class="panel current-panel"><h2>✦ 2. ESCOLHA SUA CLASSE ✦</h2><p>A classe mostra como seu herói ajuda o grupo.</p><div class="option-grid class-grid">${classes.map((item) => `
    <button class="choice-card class-card ${state.class === item.id ? 'selected' : ''}" data-class="${item.id}">
      <span class="choice-art">${item.icon}</span><b>${item.name}</b><small>${item.description}</small><em>${state.class === item.id ? '✓' : ''}</em>
    </button>`).join('')}</div>${klass ? `<div class="info"><h3>${klass.icon} ${klass.name.toUpperCase()}</h3><p>${klass.description}</p><b>Características:</b><ul>${klass.traits.map((trait) => `<li>${trait}</li>`).join('')}</ul><b>O que essa classe costuma usar:</b><ul>${(equipmentCatalog[klass.id] || []).map((item) => `<li>${item.icon} ${item.name}</li>`).join('')}</ul><p class="hint">Você escolhe até ${EQUIPMENT_LIMIT} desses equipamentos no passo 5.</p></div>` : '<div class="info empty"><p>Nenhuma classe escolhida ainda.</p></div>'}${renderNavButtons('skills', 'race')}</section>`;
}

function renderSkillsStep() {
  const klass = selectedClass();
  const catalog = selectedSkillCatalog();
  const selectedCount = state.skills.length;
  if (!klass || !catalog) {
    return `<section class="panel current-panel"><h2>✦ 3. HABILIDADES ✦</h2><p>As habilidades dependem da classe.</p><div class="info empty"><p>Nenhuma classe escolhida ainda. Volte ao passo 2 para escolher uma classe e ver as habilidades dela.</p></div>${renderNavButtons('appearance', 'class')}</section>`;
  }

  return `<section class="panel current-panel"><h2>✦ 3. HABILIDADES DE ${klass.name.toUpperCase()} ✦</h2><p>${catalog.type === 'magias' ? 'Classes conjuradoras escolhem magias.' : 'Classes de contato físico escolhem manobras.'} Escolha 2 ${catalog.type} dentre as 5 disponíveis.</p><div class="option-grid skill-grid">${catalog.options.map((item) => `
    <button class="choice-card skill-card ${state.skills.includes(item.id) ? 'selected' : ''}" data-skill="${item.id}">
      <span class="choice-art">${item.icon}</span><b>${item.name}</b><small>${item.description}</small><em>${state.skills.includes(item.id) ? '✓' : ''}</em>
    </button>`).join('')}</div><div class="info"><h3>${klass.icon} ${catalog.type.toUpperCase()} ESCOLHIDAS (${selectedCount}/2)</h3><p>Selecione exatamente 2 ${catalog.type} para personalizar seu personagem.</p><ul>${selectedSkills().map((item) => `<li>${item.icon} ${item.name}</li>`).join('') || '<li>Nenhuma habilidade escolhida ainda.</li>'}</ul></div>${renderNavButtons('appearance', 'class')}</section>`;
}

function renderAppearanceStep() {
  return `<section class="panel current-panel"><h2>✦ 4. APARÊNCIA ✦</h2><p>Escolha como seu herói será.</p><div class="appearance-list">${appearanceGroups.map((group) => `
    <div class="group"><h4><span>${group.icon}</span>${group.title}</h4><div class="opts">${group.options.map((option) => `
      <button class="pill-choice ${state.appearance[group.key] === option ? 'selected' : ''}" data-appearance-key="${group.key}" data-appearance-value="${option}">${option}</button>`).join('')}</div></div>`).join('')}</div>${renderNavButtons('story', 'skills')}</section>`;
}

function renderStoryStep() {
  return `<section class="panel current-panel"><h2>✦ 5. HISTÓRIA ✦</h2><p>Conte quem é seu personagem.</p><label class="field">Nome do personagem<input data-field="name" value="${escapeHtml(state.name)}" /></label><label class="field">Jogador<input data-field="player" value="${escapeHtml(state.player)}" /></label><label class="field">Idade<input data-field="age" value="${escapeHtml(state.age)}" placeholder="Ex.: 12 anos" /></label><label class="field">Gênero<input data-field="gender" value="${escapeHtml(state.gender)}" /></label><label class="field">Altura<input data-field="height" value="${escapeHtml(state.height)}" placeholder="Ex.: 1,45 m" /></label>${renderPersonalityField()}${renderEquipmentField()}<label class="field">História<textarea data-field="story">${escapeHtml(state.story)}</textarea></label>${renderPortraitBlock()}${renderNavButtons('overview', 'appearance')}</section>`;
}

function renderPickGrid(options, selectedIds, attribute, gridClass) {
  return `<div class="option-grid ${gridClass}">${options.map((item) => `
    <button class="choice-card pick-card ${selectedIds.includes(item.id) ? 'selected' : ''}" data-${attribute}="${item.id}">
      <span class="choice-art">${item.icon}</span><b>${item.name}</b><small>${item.description}</small><em>${selectedIds.includes(item.id) ? '✓' : ''}</em>
    </button>`).join('')}</div>`;
}

function renderPersonalityField() {
  return `<div class="field"><span>Personalidade <small>(escolha até ${PERSONALITY_LIMIT} — ${state.personality.length}/${PERSONALITY_LIMIT})</small></span>${renderPickGrid(personalityCatalog, state.personality, 'personality', 'trait-grid')}</div>`;
}

function renderEquipmentField() {
  const options = equipmentOptions();
  if (!options.length) {
    return '<div class="field"><span>Equipamento</span><div class="info empty"><p>Escolha uma classe no passo 2 para ver os equipamentos disponíveis.</p></div></div>';
  }

  return `<div class="field"><span>Equipamento <small>(escolha até ${EQUIPMENT_LIMIT} — ${state.equipment.length}/${EQUIPMENT_LIMIT})</small></span>${renderPickGrid(options, state.equipment, 'equipment', 'equipment-grid')}</div>`;
}

// O modal aparece uma vez por sessão e é DELIBERADAMENTE não-bloqueante: "AGORA NÃO" fecha e
// libera o app inteiro, porque quem não tem chave do Gemini continua usando COPIAR PROMPT +
// CARREGAR IMAGEM normalmente. O botão ⚙ GEMINI do passo 5 reabre quando o usuário quiser.
function renderGeminiModal() {
  if (!gemini.modalOpen) return '';

  const custom = gemini.model === 'outro';
  const options = GEMINI_MODELS
    .map((item) => `<option value="${item.id}" ${gemini.model === item.id ? 'selected' : ''}>${escapeHtml(item.name)}</option>`)
    .join('');
  const aspects = GEMINI_ASPECTS
    .map((item) => `<option value="${item}" ${gemini.aspectRatio === item ? 'selected' : ''}>${item} (retrato)</option>`)
    .join('');
  const sizes = GEMINI_SIZES
    .map((item) => `<option value="${item}" ${gemini.imageSize === item ? 'selected' : ''}>${item}</option>`)
    .join('');

  return `<section class="gemini-modal" aria-label="Configuração do Gemini">
    <div class="gemini-card">
      <h2>✦ Gerar o retrato com o Gemini ✦</h2>
      <p>Quer que o retrato seja criado automaticamente? Informe sua chave do Google AI Studio. Se preferir continuar copiando o prompt e gerando a imagem por fora, clique em AGORA NÃO — o aplicativo funciona inteiro sem chave.</p>
      <label class="field">Chave da API do Gemini
        <input type="password" autocomplete="off" data-gemini="apiKey" placeholder="AIza..." value="${escapeHtml(gemini.apiKey)}" />
      </label>
      <div class="gemini-grid">
        <label class="field">Modelo
          <select data-gemini="model">${options}</select>
        </label>
        <label class="field">Proporção
          <select data-gemini="aspectRatio">${aspects}</select>
        </label>
        <label class="field">Resolução
          <select data-gemini="imageSize">${sizes}</select>
        </label>
      </div>
      <label class="field gemini-custom" data-gemini-custom ${custom ? '' : 'hidden'}>Nome do modelo
        <input data-gemini="customModel" placeholder="gemini-..." value="${escapeHtml(gemini.customModel)}" />
      </label>
      <div class="gemini-actions">
        <button class="primary" data-action="save-gemini">SALVAR E FECHAR</button>
        <button class="secondary" data-action="close-gemini">AGORA NÃO</button>
      </div>
      <small>A chave fica <b>só nesta sessão</b>, na memória do navegador: ao atualizar a página ela some e você precisa informar de novo. Ela nunca é gravada no computador nem entra no JSON da ficha. Mesmo assim, quem estiver usando este computador consegue ver a chave — use uma chave sua, não publique esta página em um servidor compartilhado e apague a chave no Google AI Studio se desconfiar de vazamento.</small>
    </div>
  </section>`;
}

// O modelo efetivamente enviado: "outro" é só o gatilho do campo de texto.
function geminiModel() {
  return (gemini.model === 'outro' ? gemini.customModel : gemini.model).trim();
}

function geminiReady() {
  return Boolean(gemini.apiKey.trim() && geminiModel());
}

function renderPortraitBlock() {
  // Três caminhos para a mesma imagem: copiar o prompt e gerar por fora, gerar aqui com o
  // Gemini, ou carregar um arquivo. Todos terminam no mesmo imageState.dataUrl.
  const aiLabel = imageState.dataUrl ? 'GERAR DE NOVO COM GEMINI' : 'GERAR COM GEMINI';
  const aiDisabled = geminiReady() && !imageState.aiLoading ? '' : 'disabled';
  const aiTitle = geminiReady() ? '' : ' title="Informe a chave do Gemini em ⚙ GEMINI para usar este botão."';
  return `<div class="portrait-tools"><h3>Retrato do personagem</h3><p>Copie o prompt abaixo e gere a imagem na ferramenta de IA que você preferir, ou peça ao Gemini para criar agora. Depois é só carregar o arquivo aqui. O retrato aparece no passo 6.</p><div class="portrait-actions"><button class="primary" data-action="copy-prompt">⧉ COPIAR PROMPT</button><button class="primary" data-action="generate-gemini" ${aiDisabled}${aiTitle}>✨ ${aiLabel}</button><button class="secondary" data-action="upload-image">⇪ ${imageState.dataUrl ? 'TROCAR IMAGEM' : 'CARREGAR IMAGEM'}</button><button class="ghost" data-action="open-gemini">⚙ GEMINI</button></div>${renderAiFeedback()}${renderCopyFeedback()}${renderUploadFeedback()}</div>`;
}

function renderAiFeedback() {
  if (imageState.aiLoading) return '<div class="loader"><span></span><b>Criando o retrato… isso pode levar até um minuto.</b></div>';
  if (imageState.aiError) return `<p class="image-error">⚠ ${escapeHtml(imageState.aiError)}</p>`;
  return '';
}

function renderCopyFeedback() {
  if (!imageState.prompt) return '';

  // O prompt é remontado a cada render: se a ficha mudou depois da cópia, o textarea mostra a
  // versão atual (é ele que o usuário seleciona no fallback manual) e o aviso muda de tom.
  const current = buildImagePrompt();
  let tone = 'warn';
  let message = '⚠ Seu navegador bloqueou a cópia automática. O texto abaixo já está selecionado: use Ctrl+C (ou ⌘+C).';
  if (current !== imageState.prompt) {
    message = '⚠ A ficha mudou depois da cópia. O texto abaixo já está atualizado — clique em COPIAR PROMPT de novo.';
  } else if (imageState.copyStatus === 'copiado') {
    tone = 'ok';
    message = '✓ Copiado! Agora é só colar na ferramenta de imagem.';
  }

  return `<p class="copy-status ${tone}">${message}</p><textarea class="prompt-box" data-prompt-box readonly rows="10" aria-label="Prompt do personagem">${escapeHtml(current)}</textarea>`;
}

function renderUploadError() {
  return imageState.uploadError ? `<p class="image-error">${escapeHtml(imageState.uploadError)}</p>` : '';
}

function renderUploadFeedback() {
  if (imageState.uploadError) return renderUploadError();
  if (!imageState.dataUrl) return '';

  return '<p class="copy-status ok">✓ Imagem carregada. Vá ao passo 6 para ver o retrato e gerar o PDF.</p>';
}

function renderOverviewStep() {
  const portrait = imageState.dataUrl
    ? `<figure class="generated-image"><img src="${escapeHtml(imageState.dataUrl)}" alt="Retrato de ${escapeHtml(state.name) || 'personagem'}" /><figcaption>Retrato carregado por você.</figcaption></figure>`
    : '<div class="info empty"><p>Nenhuma imagem carregada ainda. Volte ao passo 5, copie o prompt, gere a imagem na ferramenta de IA que preferir e carregue o arquivo aqui.</p></div>';
  const pdfFeedback = imageState.pdfError ? `<p class="image-error">${escapeHtml(imageState.pdfError)}</p>` : '';
  const pdfDisabled = imageState.dataUrl && !imageState.pdfLoading ? '' : 'disabled';

  return `<section class="panel current-panel"><h2>✦ 6. VISÃO GERAL ✦</h2><p>Confira a ficha ao lado, veja o retrato e gere o PDF do aventureiro.</p>${portrait}<div class="portrait-actions"><button class="secondary" data-action="upload-image">⇪ ${imageState.dataUrl ? 'TROCAR IMAGEM' : 'CARREGAR IMAGEM'}</button><button class="primary" data-action="generate-pdf" ${pdfDisabled}>${imageState.pdfLoading ? 'GERANDO PDF...' : '▤ GERAR PDF'}</button></div>${renderUploadError()}${pdfFeedback}<p class="hint">A imagem fica só nesta sessão: ela não entra no JSON da ficha, então ao reimportar uma ficha salva é preciso carregá-la de novo.</p>${renderNavButtons(null, 'story')}</section>`;
}

function renderNavButtons(next, previous) {
  return `<div class="panel-actions">${previous ? `<button class="secondary" data-step="${previous}">← VOLTAR</button>` : ''}${next ? `<button class="next" data-step="${next}">PRÓXIMO PASSO →</button>` : ''}</div>`;
}

function renderSheet() {
  const race = selectedRace();
  const klass = selectedClass();
  const catalog = selectedSkillCatalog();
  const skills = selectedSkills();
  const attributes = klass?.attributes;
  const identity = sheetLabels([['NOME DO PERSONAGEM', state.name], ['JOGADOR', state.player]]);
  const details = sheetLabels([['IDADE', state.age], ['GÊNERO', state.gender], ['ALTURA', state.height]]);
  const appearanceEntries = Object.entries(state.appearance).filter(([, value]) => String(value ?? '').trim());
  const appearanceBlock = appearanceEntries.length
    ? `<section><h4>APARÊNCIA</h4>${appearanceEntries.map(([key, value]) => `<p>✹ ${escapeHtml(labelForAppearance(key))}: ${escapeHtml(value)}</p>`).join('')}</section>`
    : '';
  const equipment = selectedEquipment();
  const personality = selectedPersonality();
  const equipmentBlock = equipment.length ? `<section><h4>EQUIPAMENTOS</h4>${equipment.map((item) => `<p>${item.icon} ${item.name}</p>`).join('')}</section>` : '';

  return `<aside class="sheet"><div class="ribbon">FICHA DO AVENTUREIRO</div>${identity ? `<div class="row">${identity}</div>` : ''}${details ? `<div class="row details">${details}</div>` : ''}${race || klass ? `<div class="badges">${race ? `<div>${race.icon}<span>RAÇA<b>${race.name}</b></span></div>` : ''}${klass ? `<div>${klass.icon}<span>CLASSE<b>${klass.name}</b></span></div>` : ''}</div>` : ''}${attributes ? `<h3>✧ ATRIBUTOS ✧</h3><div class="attrs"><div><span>✊</span><small>FORÇA</small><b>${attributes.forca}</b><em>MOD. ${modifier(attributes.forca)}</em></div><div><span>🍃</span><small>DESTREZA</small><b>${attributes.destreza}</b><em>MOD. ${modifier(attributes.destreza)}</em></div><div><span>📖</span><small>INTELIGÊNCIA</small><b>${attributes.inteligencia}</b><em>MOD. ${modifier(attributes.inteligencia)}</em></div><div><span>👁️</span><small>SABEDORIA</small><b>${attributes.sabedoria}</b><em>MOD. ${modifier(attributes.sabedoria)}</em></div></div>` : ''}${race ? `<h3>CARACTERÍSTICAS DA RAÇA</h3><p class="center">${race.traits.map((trait) => `• ${trait}`).join(' &nbsp; ')}</p>` : ''}${klass ? `<h3>CARACTERÍSTICAS DA CLASSE</h3><p class="center">${klass.traits.map((trait) => `• ${trait}`).join(' &nbsp; ')}</p>` : ''}${appearanceBlock || equipmentBlock ? `<div class="cols">${appearanceBlock}${equipmentBlock}</div>` : ''}${skills.length && catalog ? `<h3>${catalog.type.toUpperCase()}</h3><div class="chips">${skills.map((item) => `<span>${item.icon} ${item.name}</span>`).join('')}</div>` : ''}${personality.length ? `<h3>PERSONALIDADE</h3><div class="chips">${personality.map((item) => `<span>${item.icon} ${item.name}</span>`).join('')}</div>` : ''}${sheetStory(state.story)}</aside>`;
}

function sheetLabels(pairs) {
  return pairs
    .filter(([, value]) => String(value ?? '').trim())
    .map(([label, value]) => `<label>${label}<b>${escapeHtml(value)}</b></label>`)
    .join('');
}

// `data-story` marca os dois nós da história. É por ele que o layout do PDF os retira da coluna
// da esquerda e os leva para a faixa de largura inteira no rodapé da ficha; na tela o atributo
// não muda nada.
function sheetStory(value) {
  return String(value ?? '').trim()
    ? `<h3 data-story>HISTÓRIA</h3><p data-story>${escapeHtml(value)}</p>`
    : '';
}

function modifier(value) {
  const score = Number(value) || 0;
  const mod = Math.max(-1, score - 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function labelForAppearance(key) {
  return appearanceGroups.find((group) => group.key === key)?.title || key;
}

function bindEvents() {
  // O scrollTo vem DEPOIS do render(): a página é reconstruída inteira e a rolagem da
  // janela é a única que sobrevive à troca, então a criança começa o passo novo no topo.
  document.querySelectorAll('[data-step]').forEach((button) => button.addEventListener('click', () => { state.step = button.dataset.step; render(); window.scrollTo(0, 0); }));
  document.querySelectorAll('[data-race]').forEach((button) => button.addEventListener('click', () => { state.race = button.dataset.race; render(); }));
  document.querySelectorAll('[data-class]').forEach((button) => button.addEventListener('click', () => { state.class = button.dataset.class; state.skills = []; state.equipment = []; render(); }));
  document.querySelectorAll('[data-skill]').forEach((button) => button.addEventListener('click', () => toggleChoice('skills', button.dataset.skill, SKILL_LIMIT)));
  document.querySelectorAll('[data-personality]').forEach((button) => button.addEventListener('click', () => toggleChoice('personality', button.dataset.personality, PERSONALITY_LIMIT)));
  document.querySelectorAll('[data-equipment]').forEach((button) => button.addEventListener('click', () => toggleChoice('equipment', button.dataset.equipment, EQUIPMENT_LIMIT)));
  document.querySelectorAll('[data-appearance-key]').forEach((button) => button.addEventListener('click', () => { state.appearance[button.dataset.appearanceKey] = button.dataset.appearanceValue; render(); }));
  document.querySelectorAll('[data-field]').forEach((field) => field.addEventListener('input', () => { state[field.dataset.field] = field.value; render(); }));
  // Os campos do modal NÃO chamam render(): a página inteira seria remontada a cada tecla e o
  // foco/seleção do campo se perderia (restoreFocus só cobre [data-field]). O único efeito
  // visual necessário — mostrar o campo "Nome do modelo" — é feito ligando/desligando o
  // atributo hidden no próprio nó, o que preserva tudo que já foi digitado no modal.
  document.querySelectorAll('[data-gemini]').forEach((field) => {
    const update = () => {
      gemini[field.dataset.gemini] = field.value;
      if (field.dataset.gemini === 'model') $('[data-gemini-custom]')?.toggleAttribute('hidden', field.value !== 'outro');
    };
    field.addEventListener('input', update);
    field.addEventListener('change', update);
  });
  $('[data-action="save-gemini"]')?.addEventListener('click', () => { gemini.modalOpen = false; render(); });
  $('[data-action="close-gemini"]')?.addEventListener('click', () => { gemini.modalOpen = false; render(); });
  $('[data-action="open-gemini"]')?.addEventListener('click', () => { gemini.modalOpen = true; render(); });
  $('[data-action="generate-gemini"]')?.addEventListener('click', generateGeminiImage);
  $('[data-action="copy-prompt"]')?.addEventListener('click', copyPrompt);
  $('[data-action="upload-image"]')?.addEventListener('click', () => $('[data-image-input]')?.click());
  $('[data-image-input]')?.addEventListener('change', importImage);
  $('[data-action="generate-pdf"]')?.addEventListener('click', generatePdf);
  $('[data-action="reset"]')?.addEventListener('click', () => window.location.reload());
  $('[data-action="save"]')?.addEventListener('click', downloadJson);
  $('[data-action="import"]')?.addEventListener('click', () => $('[data-file-input]')?.click());
  $('[data-file-input]')?.addEventListener('change', importJson);
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    try {
      const data = JSON.parse(reader.result);
      loadCharacter(data);
      render();
    } catch (error) {
      alert('Não consegui ler esse JSON. Verifique o arquivo e tente novamente.');
    }
  });
  reader.readAsText(file);
}

function loadCharacter(data) {
  state.name = data.name || state.name;
  state.player = data.player || state.player;
  state.age = data.age || state.age;
  state.gender = data.gender || state.gender;
  state.height = data.height || state.height;
  state.race = normalizeId(data.race, races, state.race);
  state.class = normalizeId(data.class, classes, state.class);
  state.skills = normalizeChoices(data.skills, selectedSkillCatalog()?.options || [], SKILL_LIMIT);
  state.appearance = normalizeAppearance(data.appearance);
  state.personality = normalizeChoices(data.personality, personalityCatalog, PERSONALITY_LIMIT);
  state.equipment = normalizeChoices(data.equipment, equipmentOptions(), EQUIPMENT_LIMIT);
  state.story = data.story || state.story;
}

function toggleChoice(key, id, limit) {
  if (state[key].includes(id)) {
    state[key] = state[key].filter((item) => item !== id);
  } else if (state[key].length < limit) {
    state[key] = [...state[key], id];
  }
  render();
}

function normalizeChoices(value, options, limit) {
  const availableIds = options.map((item) => item.id);
  const ids = Array.isArray(value)
    ? value.map((item) => (typeof item === 'string' ? item : item?.id))
    : [];
  const validIds = ids.filter((id, index) => availableIds.includes(id) && ids.indexOf(id) === index);
  return validIds.slice(0, limit);
}

function normalizeId(value, collection, fallback) {
  const id = typeof value === 'string' ? value : value?.id;
  return collection.some((item) => item.id === id) ? id : fallback;
}

// O JSON importado só pode escrever nas chaves conhecidas de `appearanceGroups`. Uma chave fora
// do catálogo não tem UI que a edite ou remova, sobreviveria ao round-trip do JSON exportado e
// chegaria ao innerHTML pelo rótulo de `labelForAppearance()`. Mesma política de
// `normalizeChoices()`/`normalizeId()`: o desconhecido é descartado em silêncio.
function normalizeAppearance(value) {
  const incoming = value && typeof value === 'object' ? value : {};
  const result = { ...state.appearance };
  appearanceGroups.forEach((group) => {
    if (group.key in incoming) result[group.key] = String(incoming[group.key] ?? '');
  });
  return result;
}

// Bloco de estilo do retrato: texto fixo, presente em toda ficha, inclusive na vazia. Os termos
// técnicos ficam em inglês de propósito (é o jargão que os geradores reconhecem); o resto do
// prompt é português. Alterar isto muda o traço de todos os retratos.
const IMAGE_STYLE = 'Chibi / super-deformed (SD) — cabeça grande em relação ao corpo e proporções infantis. Fantasy storybook — estética de ilustração de livros de fantasia e aventura. Digital character illustration — acabamento digital polido. Cute fantasy RPG — personagens inspirados em classes tradicionais de RPG. Anime ocidentalizado / anime-inspired — olhos grandes e expressivos, mas com anatomia e figurino mais próximos de ilustração ocidental. Pixar/Disney-like appeal, no sentido de expressividade e formas arredondadas. Soft rendering — sombras suaves, iluminação delicada e pouca textura agressiva. Clean linework — contornos relativamente limpos e definidos. Rich fantasy costume design — roupas com muitas camadas, cintos, botas, armaduras, capas e pequenos acessórios. Expressive oversized eyes — olhos muito grandes, brilhantes e extremamente expressivos. Soft watercolor-like color treatment — cores suaves, com pequenas variações e aparência levemente pintada. Isolated character / sticker-like presentation — personagem inteiro, centralizado e com fundo simples ou transparente.';

// Junta itens em português natural: "a", "a e b", "a, b e c". Lista vazia devolve string vazia,
// e quem chama descarta a frase inteira — é isso que impede o prompt de sair truncado quando a
// ficha está pela metade.
function listar(itens) {
  const validos = itens.filter(Boolean);
  if (validos.length <= 1) return validos[0] || '';
  return `${validos.slice(0, -1).join(', ')} e ${validos[validos.length - 1]}`;
}

// Texto corrido: sem o JSON da ficha anexado e sem rótulos campo a campo. A única parte rotulada
// é o bloco final "Informações adicionais:", que carrega a História. Cada frase só entra se tiver
// conteúdo, então a ficha vazia ainda produz um prompt válido (estilo + enquadramento).
function buildImagePrompt() {
  const race = selectedRace();
  const klass = selectedClass();
  // Um JSON importado pode trazer número no lugar de texto, então nada de `.trim()` direto.
  const text = (value) => String(value ?? '').trim();
  const lower = (value) => text(value).toLowerCase();

  const blocks = [
    'Crie uma ilustração de personagem de RPG de fantasia.',
    `Use exatamente este estilo. ${IMAGE_STYLE}`,
  ];

  const identity = listar([
    // Idade e altura já são digitadas com a unidade ("12 anos", "1,45 m"): nada de acrescentar.
    text(state.age) && `tem ${text(state.age)}`,
    text(state.gender) && `é do gênero ${text(state.gender)}`,
    text(state.height) && `sua altura é ${text(state.height)}`,
  ]);
  if (identity) blocks.push(`O personagem ${identity}.`);

  // Raça, classe e equipamento ficam juntos na mesma frase, e o equipamento aparece como algo que
  // o personagem está usando — sem linguagem de "obrigatório" e sem proibir substituições.
  const origin = listar([race && `da raça ${race.name}`, klass && `da classe ${klass.name}`]);
  const equipment = listar(selectedEquipment().map((item) => lower(item.name)));
  if (origin && equipment) blocks.push(`É ${origin}, e está usando ${equipment}.`);
  else if (origin) blocks.push(`É ${origin}.`);
  else if (equipment) blocks.push(`Está usando ${equipment}.`);

  // Percorre `appearanceGroups` genericamente: um grupo novo entra no prompt sozinho, sem editar
  // esta função. Todos os grupos preenchidos entram — aparência não é resumida.
  const appearance = listar(appearanceGroups
    .filter((group) => text(state.appearance[group.key]))
    .map((group) => `${lower(group.title)} ${lower(state.appearance[group.key])}`));
  if (appearance) blocks.push(`Na aparência, tem ${appearance}.`);

  const personality = listar(selectedPersonality().map((item) => lower(item.name)));
  if (personality) blocks.push(`Tem personalidade ${personality}, e a expressão do rosto deve ser coerente com esses traços.`);

  blocks.push('Mostre o personagem inteiro, centralizado, com fundo simples ou transparente. Evite texto, assinatura, logotipos, marcas de água, moldura, aparência fotorrealista e estilo sombrio adulto.');

  if (text(state.story)) blocks.push(`Informações adicionais: ${text(state.story)}`);

  return blocks.join('\n\n');
}

async function copyPrompt() {
  const prompt = buildImagePrompt();
  imageState.prompt = prompt;
  let copied = false;

  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(prompt);
      copied = true;
    }
  } catch (error) {
    copied = false;
  }

  if (!copied) copied = copyWithExecCommand(prompt);
  imageState.copyStatus = copied ? 'copiado' : 'manual';
  render();
  if (!copied) $('[data-prompt-box]')?.select();
}

function copyWithExecCommand(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.top = '-1000px';
  document.body.appendChild(area);
  area.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (error) {
    copied = false;
  }
  area.remove();
  return copied;
}

function importImage(event) {
  const file = event.target.files?.[0];
  // Zera o input para que escolher o mesmo arquivo de novo continue disparando o change.
  event.target.value = '';
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    imageState.uploadError = 'Esse arquivo não é uma imagem. Escolha um PNG, JPG ou WEBP.';
    render();
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    imageState.dataUrl = String(reader.result || '');
    imageState.uploadError = '';
    imageState.pdfError = '';
    render();
  });
  reader.addEventListener('error', () => {
    imageState.uploadError = 'Não consegui ler esse arquivo. Tente outra imagem.';
    render();
  });
  reader.readAsDataURL(file);
}

// Geração pelo Gemini ---------------------------------------------------------
// Toda a conversa com a API está nestas quatro funções. Trocar a Interactions API por
// generateContent um dia significa mexer só em geminiRequestBody() e geminiImageFromPayload().

// A chave nunca pode vazar para a tela nem para o console. A mensagem de erro da API é texto de
// terceiro: antes de exibir, qualquer ocorrência da chave é apagada.
function scrubKey(text) {
  const key = gemini.apiKey.trim();
  const value = String(text ?? '');
  return key ? value.split(key).join('***') : value;
}

function geminiRequestBody(prompt) {
  return {
    model: geminiModel(),
    input: [{ type: 'text', text: prompt }],
    response_format: {
      type: 'image',
      mime_type: 'image/png',
      aspect_ratio: gemini.aspectRatio,
      image_size: gemini.imageSize,
    },
  };
}

// A imagem chega como um item `type: "image"` dentro do content de um passo `model_output`.
// Devolve o data URL pronto, ou '' quando a resposta veio sem imagem nenhuma.
function geminiImageFromPayload(payload) {
  const steps = Array.isArray(payload?.steps) ? payload.steps : [];
  for (const step of steps) {
    if (step?.type !== 'model_output') continue;
    const content = Array.isArray(step.content) ? step.content : [];
    const image = content.find((item) => item?.type === 'image' && item?.data);
    if (image) return `data:${image.mime_type || 'image/png'};base64,${image.data}`;
  }
  return '';
}

// error.code é uma string snake_case documentada; o status HTTP é só a rede de segurança para
// códigos novos que a Google introduza depois.
function geminiErrorMessage(code, status, message) {
  if (code && GEMINI_ERRORS[code]) return GEMINI_ERRORS[code];
  if (status === 401 || status === 403) return GEMINI_ERRORS.authentication;
  if (status === 404) return GEMINI_ERRORS.model_not_found;
  if (status === 429) return GEMINI_ERRORS.quota_exceeded;
  if (status >= 500) return GEMINI_ERRORS.api_error;
  const detail = scrubKey(message).trim();
  return detail
    ? `Não consegui gerar a imagem com o Gemini (${detail}). Copie o prompt e gere a imagem manualmente.`
    : 'Não consegui gerar a imagem com o Gemini. Copie o prompt e gere a imagem manualmente.';
}

async function generateGeminiImage() {
  if (imageState.aiLoading || !geminiReady()) return;

  imageState.aiLoading = true;
  imageState.aiError = '';
  render();

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': gemini.apiKey.trim(),
      },
      body: JSON.stringify(geminiRequestBody(buildImagePrompt())),
    });

    // Um 500 pode devolver HTML em vez de JSON: o parse não pode derrubar o tratamento.
    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      imageState.aiError = geminiErrorMessage(payload?.error?.code, response.status, payload?.error?.message);
      return;
    }

    const dataUrl = geminiImageFromPayload(payload);
    if (!dataUrl) {
      imageState.aiError = GEMINI_NO_IMAGE_ERROR;
      return;
    }

    // Substitui a imagem anterior sem perguntar, igual ao botão TROCAR IMAGEM.
    imageState.dataUrl = dataUrl;
    imageState.uploadError = '';
    imageState.pdfError = '';
  } catch (error) {
    // fetch só rejeita por rede/CORS/offline; erro de API vem como resposta com status.
    imageState.aiError = GEMINI_NETWORK_ERROR;
  } finally {
    imageState.aiLoading = false;
    render();
  }
}

const pdfPage = { width: 210, height: 297, margin: 8 };

// A página do PDF é uma ficha só, montada fora da tela: faixa no topo, conteúdo à esquerda,
// retrato à direita e a história numa faixa de largura inteira embaixo. Ver
// docs/INTEGRACAO_IMAGEM.md.
const pdfLayout = {
  // Largura inicial do clone, em px. As fontes da ficha são fixas em px, então alargar a moldura
  // equivale a reduzir a ficha inteira proporcionalmente dentro da página.
  minWidth: 820,
  maxWidth: 2600,
  step: 1.08,
  // Largura desejada da imagem rasterizada: ~300 DPI para os 194 mm úteis do A4.
  rasterWidth: 2300,
};

async function generatePdf() {
  if (!imageState.dataUrl || imageState.pdfLoading) return;
  if (!window.html2canvas || !window.jspdf?.jsPDF) {
    imageState.pdfError = 'Não encontrei o gerador de PDF (pasta vendor/). Recarregue a página.';
    render();
    return;
  }

  imageState.pdfLoading = true;
  imageState.pdfError = '';
  render();

  let pdfSheet = null;
  try {
    // A ficha é buscada depois do render acima: o nó anterior já foi descartado.
    const sheet = $('.sheet');
    if (!sheet) throw new Error('a ficha não está na tela');
    const portrait = await loadImageElement(imageState.dataUrl);
    // Um SVG sem largura/altura intrínsecas chega aqui com 0x0 e sairia esticado na moldura.
    if (!portrait.naturalWidth || !portrait.naturalHeight) {
      throw new Error('a imagem carregada não tem tamanho definido; use um PNG, JPG ou WEBP');
    }
    pdfSheet = buildPdfSheet(sheet, imageState.dataUrl);
    const width = fitPdfSheet(pdfSheet);
    const canvas = await window.html2canvas(pdfSheet.node, {
      scale: Math.min(3, Math.max(1, pdfLayout.rasterWidth / width)),
      backgroundColor: '#ffffff',
      onclone: applyPrintTheme,
    });
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    // Uma imagem só, ocupando toda a área útil da página.
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      pdfPage.margin,
      pdfPage.margin,
      pdfPage.width - pdfPage.margin * 2,
      pdfPage.height - pdfPage.margin * 2,
    );
    pdf.save(`${state.name.trim() || 'personagem'}.pdf`);
  } catch (error) {
    imageState.pdfError = `Não consegui gerar o PDF: ${error.message}`;
  } finally {
    pdfSheet?.stage.remove();
    imageState.pdfLoading = false;
    render();
  }
}

// Monta o nó que vira a página do PDF, dentro de um palco fixo fora da viewport (`.pdf-stage`,
// 0x0, sem afetar rolagem nem layout). Trabalhamos sempre sobre um clone: a ficha da tela não é
// tocada. A faixa continua absoluta no topo; todo o resto do conteúdo vai para a coluna da
// esquerda, menos a história, que desce para o bloco de largura inteira.
function buildPdfSheet(sheet, portraitDataUrl) {
  const stage = document.createElement('div');
  stage.className = 'pdf-stage';
  const node = sheet.cloneNode(true);
  node.classList.add('pdf-sheet');

  const ribbon = node.querySelector('.ribbon');
  const storyNodes = new Set(node.querySelectorAll('[data-story]'));
  const body = document.createElement('div');
  body.className = 'pdf-body';
  const row = document.createElement('div');
  row.className = 'pdf-row';
  const main = document.createElement('div');
  main.className = 'pdf-main';
  const portrait = document.createElement('div');
  portrait.className = 'pdf-portrait';
  // Fundo em vez de <img>: o html2canvas ignora `object-fit` e esticaria o retrato, enquanto
  // `background-size: contain` encaixa a imagem inteira e centraliza, sem cortar as bordas.
  portrait.style.backgroundImage = `url("${portraitDataUrl}")`;

  [...node.childNodes].forEach((child) => {
    if (child === ribbon) return;
    node.removeChild(child);
    if (!storyNodes.has(child)) main.appendChild(child);
  });
  row.append(main, portrait);
  body.appendChild(row);

  let story = null;
  if (storyNodes.size) {
    story = document.createElement('div');
    story.className = 'pdf-story';
    storyNodes.forEach((element) => story.appendChild(element));
    body.appendChild(story);
  }
  node.appendChild(body);
  stage.appendChild(node);
  document.body.appendChild(stage);
  return { stage, node, main, story };
}

// A moldura mantém sempre a proporção da área útil do A4, então a imagem rasterizada preenche a
// página inteira. Quando o conteúdo não cabe, a moldura cresce em px: como as fontes são fixas em
// px, isso é a ficha inteira reduzida — letra menor, nada cortado, sempre uma página só.
function fitPdfSheet({ node, main, story }) {
  const ratio = (pdfPage.height - pdfPage.margin * 2) / (pdfPage.width - pdfPage.margin * 2);
  let width = pdfLayout.minWidth;
  for (;;) {
    node.style.width = `${width}px`;
    node.style.height = `${Math.round(width * ratio)}px`;
    if ((fitsInBox(main) && fitsInBox(story)) || width >= pdfLayout.maxWidth) return width;
    width = Math.min(pdfLayout.maxWidth, Math.round(width * pdfLayout.step));
  }
}

function fitsInBox(element) {
  return !element || element.scrollHeight <= element.clientHeight + 1;
}

// Tema de impressão da ficha: fundo branco, texto preto e a faixa "FICHA DO AVENTUREIRO" sem o
// gradiente escuro, para gastar menos tinta. Vive só no clone que o html2canvas rasteriza, então
// a tela nunca muda. Os emojis continuam coloridos de propósito: a fonte de emoji é colorida e
// ignora `color`, e são eles que deixam a ficha reconhecível para a criança. O retrato é a única
// exceção ao fundo branco — `.pdf-portrait` guarda a imagem em `background-image` e sai colorido.
function applyPrintTheme(clonedDocument) {
  const style = clonedDocument.createElement('style');
  style.textContent = `
    .sheet, .sheet * {
      color: #000 !important;
      border-color: #777 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    .sheet, .sheet *:not(.pdf-portrait) {
      background: #fff !important;
      background-image: none !important;
    }
    .sheet .pdf-portrait { background-color: #fff !important; }
    .sheet, .sheet::before, .ribbon { border-color: #000 !important; color: #000 !important; }
  `;
  clonedDocument.head.appendChild(style);
}

function loadImageElement(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject(new Error('não consegui abrir a imagem carregada')));
    image.src = source;
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\"', '&quot;')
    .replaceAll("'", '&#39;');
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(characterJson(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${state.name || 'personagem'}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

render();
