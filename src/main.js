const races = [
  { id: 'humano', name: 'Humano', icon: '🧑', description: 'Igual a nós: determinado, aprende rápido e se adapta a qualquer profissão ou lugar do mundo.', traits: ['Aprende uma perícia extra', 'Bônus versátil em um atributo', 'Coragem para tentar de novo'] },
  { id: 'anao', name: 'Anão', icon: '⛏️', description: 'Baixinho e forte como rocha, vive em montanhas e cria armas e armaduras excelentes.', traits: ['+1 Força', '+1 Sabedoria', 'Resistência de rocha'] },
  { id: 'elfo', name: 'Elfo', icon: '🌿', description: 'Alto, elegante e de orelhas pontudas, vive nas florestas e se move sem fazer barulho.', traits: ['+1 Destreza', '+1 Inteligência', 'Visão no escuro'] },
  { id: 'halfling', name: 'Halfling', icon: '🍀', description: 'Pequenino, ágil e corajoso; adora comida, bons amigos e tem muita sorte.', traits: ['+1 Destreza', '+1 Sabedoria', 'Sorte pequenina'] },
  { id: 'draconato', name: 'Draconato', icon: '🐲', description: 'Um herói-dragão com escamas coloridas, cauda e uma baforada elemental impressionante.', traits: ['+2 Força', 'Baforada elemental', 'Escamas protetoras'] },
  { id: 'tabaxi', name: 'Tabaxi', icon: '🐱', description: 'O povo-gato: curioso, veloz, com garras e talento para escalar lugares difíceis.', traits: ['+2 Destreza', 'Escalada felina', 'Corrida veloz'] },
  { id: 'gnomo', name: 'Gnomo', icon: '🧠', description: 'Pequeno inventor de cabelos coloridos, mente brilhante, ilusões e piadas espertas.', traits: ['+2 Inteligência', 'Pequena ilusão', 'Inventor curioso'] },
];

const classes = [
  { id: 'guerreiro', name: 'Guerreiro', icon: '🛡️', description: 'O mestre das armas, vai para a linha de frente com espada, escudo e armadura pesada.', attributes: { forca: 5, destreza: 3, inteligencia: 2, sabedoria: 3 } },
  { id: 'barbaro', name: 'Bárbaro', icon: '💢', description: 'O guerreiro furioso que confia na força bruta, fica mais forte e quase não sente dor.', attributes: { forca: 5, destreza: 3, inteligencia: 1, sabedoria: 4 } },
  { id: 'ladino', name: 'Ladino', icon: '🗝️', description: 'Rápido, silencioso e esperto; abre fechaduras, desarma armadilhas e ataca de surpresa.', attributes: { forca: 2, destreza: 5, inteligencia: 4, sabedoria: 3 } },
  { id: 'patrulheiro', name: 'Patrulheiro', icon: '🏹', description: 'O protetor da natureza, arqueiro incrível que rastreia pegadas e sobrevive na floresta.', attributes: { forca: 3, destreza: 5, inteligencia: 3, sabedoria: 5 } },
  { id: 'clerigo', name: 'Clérigo', icon: '✨', description: 'O guerreiro da cura, usa fé e magia de luz para ajudar amigos e afastar monstros sombrios.', attributes: { forca: 3, destreza: 2, inteligencia: 3, sabedoria: 5 } },
  { id: 'mago', name: 'Mago', icon: '🪄', description: 'O cientista da magia, estuda livros antigos e lança feitiços como fogo ou invisibilidade.', attributes: { forca: 1, destreza: 3, inteligencia: 5, sabedoria: 4 } },
  { id: 'bardo', name: 'Bardo', icon: '🎵', description: 'O artista do grupo, usa música, poemas e piadas para fortalecer amigos e confundir vilões.', attributes: { forca: 2, destreza: 4, inteligencia: 4, sabedoria: 3 } },
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
  { key: 'hairColor', title: 'Cor do cabelo', icon: '💧', options: ['Preto', 'Castanho', 'Ruivo', 'Prateado', 'Dourado'] },
  { key: 'eyes', title: 'Cor dos olhos', icon: '👁️', options: ['Castanhos', 'Verdes', 'Azuis', 'Cinzas', 'Roxos'] },
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
  ],
  barbaro: [
    { id: 'machado-enorme', name: 'Machado enorme', icon: '🪓', description: 'Precisa das duas mãos e derruba portas.' },
    { id: 'peles-de-urso', name: 'Peles de urso', icon: '🐻', description: 'Roupa quente que aguenta neve e garras.' },
    { id: 'clava-de-pedra', name: 'Clava de pedra', icon: '🪨', description: 'Simples, pesada e muito convincente.' },
    { id: 'amuleto-de-osso', name: 'Amuleto de osso', icon: '🦴', description: 'Lembrança da tribo que dá coragem.' },
    { id: 'tambor-de-guerra', name: 'Tambor de guerra', icon: '🥁', description: 'O som faz o coração dos amigos acelerar.' },
  ],
  ladino: [
    { id: 'par-de-adagas', name: 'Par de adagas', icon: '🗡️', description: 'Duas lâminas leves, rápidas e silenciosas.' },
    { id: 'capa-com-capuz', name: 'Capa escura com capuz', icon: '🧥', description: 'Some nas sombras e esconde o rosto.' },
    { id: 'ferramentas-de-ladrao', name: 'Ferramentas de abrir fechaduras', icon: '🗝️', description: 'Ganchinhos que abrem quase qualquer porta.' },
    { id: 'corda-com-gancho', name: 'Corda fina com gancho', icon: '🪢', description: 'Sobe muros e desce por janelas.' },
    { id: 'mascara-de-meio-rosto', name: 'Máscara de meio rosto', icon: '🎭', description: 'Ninguém sabe quem passou por ali.' },
  ],
  patrulheiro: [
    { id: 'arco-longo', name: 'Arco longo e aljava', icon: '🏹', description: 'Acerta o alvo bem de longe.' },
    { id: 'capa-camuflada', name: 'Capa camuflada de folhas', icon: '🍃', description: 'Você vira parte da floresta.' },
    { id: 'punhal-de-caca', name: 'Punhal de caça', icon: '🔪', description: 'Corta corda, galho e o que aparecer.' },
    { id: 'apito-do-companheiro', name: 'Apito do companheiro animal', icon: '🐺', description: 'Chama seu amigo animal de longe.' },
    { id: 'botas-de-trilha', name: 'Botas de trilha', icon: '🥾', description: 'Andam o dia inteiro sem machucar o pé.' },
  ],
  clerigo: [
    { id: 'martelo-abencoado', name: 'Martelo leve abençoado', icon: '🔨', description: 'Brilha um pouquinho quando você reza.' },
    { id: 'simbolo-do-sol', name: 'Símbolo sagrado do sol', icon: '☀️', description: 'O sinal da sua fé, pendurado no peito.' },
    { id: 'bolsa-de-curativos', name: 'Bolsa de curativos', icon: '🧵', description: 'Ataduras e ervas para cuidar dos amigos.' },
    { id: 'livro-de-preces', name: 'Livro de preces', icon: '📖', description: 'Palavras antigas que acalmam qualquer um.' },
    { id: 'tunica-branca', name: 'Túnica branca bordada', icon: '👘', description: 'Roupa simples com fios dourados.' },
  ],
  mago: [
    { id: 'cajado-antigo', name: 'Cajado de madeira antiga', icon: '🪄', description: 'Ajuda a mirar e a guardar magia.' },
    { id: 'livro-de-feiticos', name: 'Livro de feitiços', icon: '📕', description: 'Todas as magias que você já estudou.' },
    { id: 'cristal-magico', name: 'Cristal mágico', icon: '🔮', description: 'Guarda energia para o feitiço mais difícil.' },
    { id: 'manto-estrelado', name: 'Manto estrelado', icon: '🌌', description: 'Tecido azul que parece o céu à noite.' },
    { id: 'chapeu-pontudo', name: 'Chapéu pontudo', icon: '🎩', description: 'Ninguém duvida que você é mago.' },
  ],
  bardo: [
    { id: 'alaude', name: 'Alaúde de cordas brilhantes', icon: '🪕', description: 'O instrumento que abre portas e corações.' },
    { id: 'flauta-encantada', name: 'Flauta encantada', icon: '🪈', description: 'Toca sozinha se você pedir com jeitinho.' },
    { id: 'caderno-de-cancoes', name: 'Caderno de canções', icon: '📓', description: 'Todas as músicas e histórias que você inventou.' },
    { id: 'casaco-colorido', name: 'Casaco colorido de artista', icon: '🧥', description: 'Chama atenção em qualquer praça.' },
    { id: 'chapeu-com-pluma', name: 'Chapéu com pluma', icon: '🪶', description: 'A pluma balança quando você faz reverência.' },
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

const imageState = {
  dataUrl: '',
  uploadError: '',
  prompt: '',
  copyStatus: '',
  pdfLoading: false,
  pdfError: '',
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
      <header class="hero-head">
        <div class="brand">
          <div class="sigil">✡</div>
          <div>
            <span>CRIADOR DE</span>
            <h1>PERSONAGEM</h1>
            <p>Monte seu herói e viva grandes aventuras!</p>
          </div>
          <div class="twinkle">✦</div>
        </div>
        <div class="actions">
          <button class="ghost" data-action="reset">↻ REINICIAR</button>
          <button class="ghost" data-action="import">⇪ IMPORTAR JSON</button>
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
    </button>`).join('')}</div>${klass ? `<div class="info"><h3>${klass.icon} ${klass.name.toUpperCase()}</h3><p>${klass.description}</p><b>O que essa classe costuma usar:</b><ul>${(equipmentCatalog[klass.id] || []).map((item) => `<li>${item.icon} ${item.name}</li>`).join('')}</ul><p class="hint">Você escolhe até ${EQUIPMENT_LIMIT} desses equipamentos no passo 5.</p></div>` : '<div class="info empty"><p>Nenhuma classe escolhida ainda.</p></div>'}${renderNavButtons('skills', 'race')}</section>`;
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

function renderPortraitBlock() {
  return `<div class="portrait-tools"><h3>Retrato do personagem</h3><p>Copie o prompt abaixo, gere a imagem na ferramenta de IA que você preferir e carregue o arquivo aqui. O retrato aparece no passo 6.</p><div class="portrait-actions"><button class="primary" data-action="copy-prompt">⧉ COPIAR PROMPT</button><button class="secondary" data-action="upload-image">⇪ ${imageState.dataUrl ? 'TROCAR IMAGEM' : 'CARREGAR IMAGEM'}</button></div>${renderCopyFeedback()}${renderUploadFeedback()}</div>`;
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

  return `<aside class="sheet"><div class="ribbon">FICHA DO AVENTUREIRO</div>${identity ? `<div class="row">${identity}</div>` : ''}${details ? `<div class="row details">${details}</div>` : ''}${race || klass ? `<div class="badges">${race ? `<div>${race.icon}<span>RAÇA<b>${race.name}</b></span></div>` : ''}${klass ? `<div>${klass.icon}<span>CLASSE<b>${klass.name}</b></span></div>` : ''}</div>` : ''}${attributes ? `<h3>✧ ATRIBUTOS ✧</h3><div class="attrs"><div><span>✊</span><small>FORÇA</small><b>${attributes.forca}</b><em>MOD. ${modifier(attributes.forca)}</em></div><div><span>🍃</span><small>DESTREZA</small><b>${attributes.destreza}</b><em>MOD. ${modifier(attributes.destreza)}</em></div><div><span>📖</span><small>INTELIGÊNCIA</small><b>${attributes.inteligencia}</b><em>MOD. ${modifier(attributes.inteligencia)}</em></div><div><span>👁️</span><small>SABEDORIA</small><b>${attributes.sabedoria}</b><em>MOD. ${modifier(attributes.sabedoria)}</em></div></div>` : ''}${race ? `<h3>CARACTERÍSTICAS DA RAÇA</h3><p class="center">${race.traits.map((trait) => `• ${trait}`).join(' &nbsp; ')}</p>` : ''}${appearanceBlock || equipmentBlock ? `<div class="cols">${appearanceBlock}${equipmentBlock}</div>` : ''}${skills.length && catalog ? `<h3>${catalog.type.toUpperCase()}</h3><div class="chips">${skills.map((item) => `<span>${item.icon} ${item.name}</span>`).join('')}</div>` : ''}${personality.length ? `<h3>PERSONALIDADE</h3><div class="chips">${personality.map((item) => `<span>${item.icon} ${item.name}</span>`).join('')}</div>` : ''}${sheetText('HISTÓRIA', state.story)}</aside>`;
}

function sheetLabels(pairs) {
  return pairs
    .filter(([, value]) => String(value ?? '').trim())
    .map(([label, value]) => `<label>${label}<b>${escapeHtml(value)}</b></label>`)
    .join('');
}

function sheetText(title, value) {
  return String(value ?? '').trim() ? `<h3>${title}</h3><p>${escapeHtml(value)}</p>` : '';
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
  document.querySelectorAll('[data-step]').forEach((button) => button.addEventListener('click', () => { state.step = button.dataset.step; render(); }));
  document.querySelectorAll('[data-race]').forEach((button) => button.addEventListener('click', () => { state.race = button.dataset.race; render(); }));
  document.querySelectorAll('[data-class]').forEach((button) => button.addEventListener('click', () => { state.class = button.dataset.class; state.skills = []; state.equipment = []; render(); }));
  document.querySelectorAll('[data-skill]').forEach((button) => button.addEventListener('click', () => toggleChoice('skills', button.dataset.skill, SKILL_LIMIT)));
  document.querySelectorAll('[data-personality]').forEach((button) => button.addEventListener('click', () => toggleChoice('personality', button.dataset.personality, PERSONALITY_LIMIT)));
  document.querySelectorAll('[data-equipment]').forEach((button) => button.addEventListener('click', () => toggleChoice('equipment', button.dataset.equipment, EQUIPMENT_LIMIT)));
  document.querySelectorAll('[data-appearance-key]').forEach((button) => button.addEventListener('click', () => { state.appearance[button.dataset.appearanceKey] = button.dataset.appearanceValue; render(); }));
  document.querySelectorAll('[data-field]').forEach((field) => field.addEventListener('input', () => { state[field.dataset.field] = field.value; render(); }));
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

function buildImagePrompt() {
  const race = selectedRace();
  const klass = selectedClass();
  // Um JSON importado pode trazer número no lugar de texto, então nada de `.trim()` direto.
  const text = (value) => String(value ?? '').trim();
  const identity = [
    text(state.name) && `nome ${text(state.name)}`,
    race && `raça ${race.name}`,
    klass && `classe ${klass.name}`,
    text(state.age) && `idade ${text(state.age)}`,
    text(state.gender) && `gênero ${text(state.gender)}`,
    text(state.height) && `altura informada ${text(state.height)}`,
  ].filter(Boolean);
  const appearance = appearanceGroups
    .filter((group) => String(state.appearance[group.key] ?? '').trim())
    .map((group) => `${group.title.toLowerCase()}: ${String(state.appearance[group.key]).toLowerCase()}`);
  const personality = selectedPersonality().map((item) => item.name.toLowerCase());
  const equipment = selectedEquipment().map((item) => item.name.toLowerCase());
  const skills = selectedSkills().map((item) => item.name.toLowerCase());

  const blocks = ['Crie uma ilustração vertical de personagem de RPG em fantasia clássica, aquarela delicada, pintura de storybook e desenho de livro infantil/juvenil de aventura.'];
  if (identity.length) blocks.push(`Personagem: ${identity.join(', ')}.`);
  if (appearance.length) blocks.push(`Aparência: ${appearance.join(', ')}.`);
  if (personality.length) blocks.push(`Personalidade: ${personality.join(', ')}.`);
  if (skills.length) blocks.push(`Talentos que aparecem na pose: ${skills.join(', ')}.`);
  if (equipment.length) blocks.push(`Equipamentos obrigatórios escolhidos pelo jogador: ${equipment.join(' e ')}. Não substitua por equipamentos padrão de raça ou classe.`);
  if (text(state.story)) blocks.push(`História e intenção dramática: ${text(state.story)}`);
  blocks.push('Composição: pose dinâmica e heroica em três quartos, corpo inteiro visível, expressão carismática coerente com a personalidade, cenário de fantasia suave relacionado à história, luz dourada cinematográfica, pinceladas de aquarela, contornos finos, textura de papel, cores harmoniosas, detalhes nos equipamentos, atmosfera mágica e acolhedora. Evite texto, assinatura, logotipos, marcas de água, moldura, aparência fotorealista ou estilo sombrio adulto.');
  blocks.push(`JSON do personagem para fidelidade:\n${JSON.stringify(characterJson(), null, 2)}`);

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

const pdfPage = { width: 210, height: 297, margin: 8 };

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

  try {
    // A ficha é buscada depois do render acima: o nó anterior já foi descartado.
    const sheet = $('.sheet');
    if (!sheet) throw new Error('a ficha não está na tela');
    const sheetCanvas = await window.html2canvas(sheet, {
      scale: 2,
      backgroundColor: '#f7ead3',
      height: sheet.scrollHeight,
      windowHeight: sheet.scrollHeight,
      onclone: (clonedDocument) => {
        const clone = clonedDocument.querySelector('.sheet');
        if (!clone) return;
        clone.style.overflow = 'visible';
        clone.style.height = 'auto';
        clone.style.maxHeight = 'none';
      },
    });
    const portrait = await loadImageElement(imageState.dataUrl);
    // Um SVG sem largura/altura intrínsecas chega aqui com 0x0 e viraria NaN no addImage.
    if (!portrait.naturalWidth || !portrait.naturalHeight) {
      throw new Error('a imagem carregada não tem tamanho definido; use um PNG, JPG ou WEBP');
    }
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    placeInQuadrant(pdf, sheetCanvas.toDataURL('image/jpeg', 0.95), sheetCanvas.width, sheetCanvas.height, 0);
    placeInQuadrant(pdf, toJpegDataUrl(portrait), portrait.naturalWidth, portrait.naturalHeight, 1);
    pdf.save(`${state.name.trim() || 'personagem'}.pdf`);
  } catch (error) {
    imageState.pdfError = `Não consegui gerar o PDF: ${error.message}`;
  } finally {
    imageState.pdfLoading = false;
    render();
  }
}

// Coluna 0 = quadrante superior esquerdo (ficha); coluna 1 = quadrante superior direito (retrato).
// Os dois começam na mesma altura e a metade de baixo da página fica em branco, como combinado.
function placeInQuadrant(pdf, dataUrl, naturalWidth, naturalHeight, column) {
  const halfWidth = pdfPage.width / 2;
  const halfHeight = pdfPage.height / 2;
  const boxWidth = halfWidth - pdfPage.margin * 1.5;
  const boxHeight = halfHeight - pdfPage.margin * 2;
  const scale = Math.min(boxWidth / naturalWidth, boxHeight / naturalHeight);
  const width = naturalWidth * scale;
  const height = naturalHeight * scale;
  const boxLeft = column === 0 ? pdfPage.margin : halfWidth + pdfPage.margin / 2;
  pdf.addImage(dataUrl, 'JPEG', boxLeft + (boxWidth - width) / 2, pdfPage.margin, width, height);
}

function loadImageElement(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject(new Error('não consegui abrir a imagem carregada')));
    image.src = source;
  });
}

// Reencoda em JPEG para que qualquer formato aceito pelo navegador (WEBP, GIF...) entre no PDF.
function toJpegDataUrl(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.95);
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
