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
  { id: 'guerreiro', name: 'Guerreiro', icon: '🛡️', description: 'O mestre das armas, vai para a linha de frente com espada, escudo e armadura pesada.', equipment: ['Espada longa', 'Escudo', 'Armadura pesada', 'Kit de treino'], attributes: { forca: 5, destreza: 3, inteligencia: 2, sabedoria: 3 } },
  { id: 'barbaro', name: 'Bárbaro', icon: '💢', description: 'O guerreiro furioso que confia na força bruta, fica mais forte e quase não sente dor.', equipment: ['Machado grande', 'Peles de proteção', 'Amuleto tribal', 'Tambor de guerra'], attributes: { forca: 5, destreza: 3, inteligencia: 1, sabedoria: 4 } },
  { id: 'ladino', name: 'Ladino', icon: '🗝️', description: 'Rápido, silencioso e esperto; abre fechaduras, desarma armadilhas e ataca de surpresa.', equipment: ['Adaga dupla', 'Ferramentas de ladrão', 'Capa escura', 'Corda fina'], attributes: { forca: 2, destreza: 5, inteligencia: 4, sabedoria: 3 } },
  { id: 'patrulheiro', name: 'Patrulheiro', icon: '🏹', description: 'O protetor da natureza, arqueiro incrível que rastreia pegadas e sobrevive na floresta.', equipment: ['Arco longo', 'Aljava com flechas', 'Punhal', 'Apito do companheiro animal'], attributes: { forca: 3, destreza: 5, inteligencia: 3, sabedoria: 5 } },
  { id: 'clerigo', name: 'Clérigo', icon: '✨', description: 'O guerreiro da cura, usa fé e magia de luz para ajudar amigos e afastar monstros sombrios.', equipment: ['Martelo leve', 'Símbolo sagrado', 'Kit de curativos', 'Livro de preces'], attributes: { forca: 3, destreza: 2, inteligencia: 3, sabedoria: 5 } },
  { id: 'mago', name: 'Mago', icon: '🪄', description: 'O cientista da magia, estuda livros antigos e lança feitiços como fogo ou invisibilidade.', equipment: ['Cajado', 'Livro de feitiços', 'Cristal mágico', 'Manto estrelado'], attributes: { forca: 1, destreza: 3, inteligencia: 5, sabedoria: 4 } },
  { id: 'bardo', name: 'Bardo', icon: '🎵', description: 'O artista do grupo, usa música, poemas e piadas para fortalecer amigos e confundir vilões.', equipment: ['Alaúde', 'Caderno de canções', 'Roupa colorida', 'Flauta encantada'], attributes: { forca: 2, destreza: 4, inteligencia: 4, sabedoria: 3 } },
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
  { key: 'height', title: 'Altura', icon: '📏', options: ['Baixa', 'Média', 'Alta'] },
  { key: 'body', title: 'Tipo físico', icon: '✿', options: ['Leve', 'Atlético', 'Forte', 'Robusto'] },
  { key: 'marks', title: 'Marcas e detalhes', icon: '✴', options: ['Nenhuma', 'Cicatriz no rosto', 'Sardas', 'Tatuagem mágica'] },
  { key: 'accessory', title: 'Acessório', icon: '○', options: ['Nenhum', 'Colar com pingente', 'Brinco', 'Óculos'] },
  { key: 'style', title: 'Roupa / estilo', icon: '🧥', options: ['Roupa da floresta', 'Armadura leve', 'Manto mágico', 'Roupa de viagem'] },
];

const steps = [
  { id: 'race', number: 1, title: 'Raça', subtitle: 'Escolha sua origem' },
  { id: 'class', number: 2, title: 'Classe', subtitle: 'Escolha sua profissão' },
  { id: 'skills', number: 3, title: 'Habilidades', subtitle: 'Escolha 2 opções' },
  { id: 'appearance', number: 4, title: 'Aparência', subtitle: 'Defina sua aparência' },
  { id: 'story', number: 5, title: 'História', subtitle: 'Conte um pouco sobre você' },
];

const integration = {
  ready: false,
  apiKey: '',
  model: 'gpt-image-2',
  size: '1024x1024',
  quality: 'high',
};

const imageState = {
  loading: false,
  error: '',
  dataUrl: '',
  prompt: '',
};

const state = {
  step: 'race',
  name: 'Lirien',
  player: 'Maria Eduarda',
  race: 'elfo',
  class: 'patrulheiro',
  skills: ['tiro-marcado', 'passo-da-floresta'],
  appearance: {
    skin: 'Morena clara',
    hair: 'Longo',
    hairColor: 'Prateado',
    eyes: 'Verdes',
    height: 'Média',
    body: 'Atlético',
    marks: 'Cicatriz no rosto',
    accessory: 'Colar com pingente',
    style: 'Roupa da floresta',
  },
  personality: ['Observadora', 'Curiosa', 'Leal', 'Determinada'],
  equipment: 'Arco longo, aljava com flechas, punhal e apito do companheiro animal.',
  otherCharacteristics: 'Fala com animais pequenos e conhece trilhas escondidas na floresta.',
  story: 'Lirien cresceu nas florestas, aprendendo com os animais e com as árvores. Seu objetivo é proteger a natureza e manter o equilíbrio entre todos os seres.',
};

const $ = (selector) => document.querySelector(selector);
const selectedRace = () => races.find((item) => item.id === state.race);
const selectedClass = () => classes.find((item) => item.id === state.class);
const selectedSkillCatalog = () => skillCatalog[state.class];
const selectedSkills = () => selectedSkillCatalog().options.filter((item) => state.skills.includes(item.id));
const characterJson = () => ({
  name: state.name,
  player: state.player,
  race: selectedRace(),
  class: selectedClass(),
  skills: selectedSkills(),
  appearance: state.appearance,
  personality: state.personality,
  equipment: state.equipment,
  otherCharacteristics: state.otherCharacteristics,
  story: state.story,
});

function render() {
  $('#root').innerHTML = `
    <main class="page">
      ${renderIntegrationGate()}
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
        </div>
      </header>
      <div class="workspace">
        ${renderStepper()}
        ${renderCurrentStep()}
        ${renderSheet()}
      </div>
    </main>`;
  bindEvents();
}

function renderIntegrationGate() {
  if (integration.ready) return '';

  return `<section class="integration-gate" aria-label="Configuração da integração com OpenAI">
    <div class="integration-card">
      <h2>✦ Integração com ChatGPT para imagem ✦</h2>
      <p>Informe os dados da API para esta sessão. Nada será salvo: ao atualizar a página, você precisará preencher novamente.</p>
      <label class="field">Chave da API OpenAI
        <input type="password" autocomplete="off" data-integration="apiKey" placeholder="sk-..." value="${escapeHtml(integration.apiKey)}" />
      </label>
      <div class="integration-grid">
        <label class="field">Modelo de imagem
          <input data-integration="model" value="${escapeHtml(integration.model)}" />
        </label>
        <label class="field">Tamanho
          <select data-integration="size">
            ${['1024x1024', '1024x1536', '1536x1024'].map((size) => `<option value="${size}" ${integration.size === size ? 'selected' : ''}>${size}</option>`).join('')}
          </select>
        </label>
        <label class="field">Qualidade
          <select data-integration="quality">
            ${['high', 'medium', 'low', 'auto'].map((quality) => `<option value="${quality}" ${integration.quality === quality ? 'selected' : ''}>${quality}</option>`).join('')}
          </select>
        </label>
      </div>
      <button class="primary" data-action="confirm-integration">OK</button>
      <small>Recomendação: use esta tela apenas localmente. Em produção, faça a chamada por um backend para não expor a chave.</small>
    </div>
  </section>`;
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
  return renderStoryStep();
}

function renderRaceStep() {
  const race = selectedRace();
  return `<section class="panel current-panel"><h2>✦ 1. ESCOLHA SUA RAÇA ✦</h2><p>Cada raça possui habilidades únicas.</p><div class="option-grid race-grid">${races.map((item, index) => `
    <button class="choice-card p${index} ${state.race === item.id ? 'selected' : ''}" data-race="${item.id}">
      <span class="choice-art">${item.icon}</span><b>${item.name}</b><em>${state.race === item.id ? '✓' : ''}</em>
    </button>`).join('')}</div><div class="info"><h3>${race.icon} ${race.name.toUpperCase()}</h3><p>${race.description}</p><b>Vantagens:</b><ul>${race.traits.map((trait) => `<li>${trait}</li>`).join('')}</ul></div>${renderNavButtons('class')}</section>`;
}

function renderClassStep() {
  const klass = selectedClass();
  return `<section class="panel current-panel"><h2>✦ 2. ESCOLHA SUA CLASSE ✦</h2><p>A classe mostra como seu herói ajuda o grupo.</p><div class="option-grid class-grid">${classes.map((item) => `
    <button class="choice-card class-card ${state.class === item.id ? 'selected' : ''}" data-class="${item.id}">
      <span class="choice-art">${item.icon}</span><b>${item.name}</b><small>${item.description}</small><em>${state.class === item.id ? '✓' : ''}</em>
    </button>`).join('')}</div><div class="info"><h3>${klass.icon} ${klass.name.toUpperCase()}</h3><p>${klass.description}</p><b>Equipamentos:</b><ul>${klass.equipment.map((item) => `<li>${item}</li>`).join('')}</ul></div>${renderNavButtons('skills', 'race')}</section>`;
}

function renderSkillsStep() {
  const klass = selectedClass();
  const catalog = selectedSkillCatalog();
  const selectedCount = state.skills.length;
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
  return `<section class="panel current-panel"><h2>✦ 5. HISTÓRIA ✦</h2><p>Conte quem é seu personagem.</p><label class="field">Nome do personagem<input data-field="name" value="${escapeHtml(state.name)}" /></label><label class="field">Jogador<input data-field="player" value="${escapeHtml(state.player)}" /></label><label class="field">Equipamento<input data-field="equipment" value="${escapeHtml(state.equipment)}" /></label><label class="field">Outras características<textarea data-field="otherCharacteristics">${escapeHtml(state.otherCharacteristics)}</textarea></label><label class="field">História<textarea data-field="story">${escapeHtml(state.story)}</textarea></label><div class="image-generator"><h3>Retrato do personagem</h3><p>Gere uma imagem em aquarela, fantasia clássica e visual de livro de histórias usando o JSON atual e o equipamento informado acima.</p><button class="primary" data-action="generate-image" ${imageState.loading ? 'disabled' : ''}>${imageState.loading ? 'GERANDO...' : 'GERAR IMAGEM'}</button>${renderImageResult()}</div>${renderNavButtons(null, 'appearance')}</section>`;
}

function renderImageResult() {
  if (imageState.loading) return '<div class="loader"><span></span><b>Preparando ilustração mágica...</b></div>';
  if (imageState.error) return `<p class="image-error">${escapeHtml(imageState.error)}</p>`;
  if (!imageState.dataUrl) return '';

  return `<figure class="generated-image"><img src="${imageState.dataUrl}" alt="Imagem gerada do personagem ${escapeHtml(state.name)}" /><figcaption>Imagem gerada por IA a partir do prompt do personagem.</figcaption></figure>`;
}

function renderNavButtons(next, previous) {
  return `<div class="panel-actions">${previous ? `<button class="secondary" data-step="${previous}">← VOLTAR</button>` : ''}${next ? `<button class="next" data-step="${next}">PRÓXIMO PASSO →</button>` : ''}</div>`;
}

function renderSheet() {
  const race = selectedRace();
  const klass = selectedClass();
  const attributes = klass.attributes;
  return `<aside class="sheet"><div class="ribbon">FICHA DO AVENTUREIRO</div><div class="row"><label>NOME DO PERSONAGEM<b>${state.name}</b></label><label>JOGADOR<b>${state.player}</b></label></div><div class="badges"><div>${race.icon}<span>RAÇA<b>${race.name}</b></span></div><div>${klass.icon}<span>CLASSE<b>${klass.name}</b></span></div></div><h3>✧ ATRIBUTOS ✧</h3><div class="attrs"><div><span>✊</span><small>FORÇA</small><b>${attributes.forca}</b><em>MOD. ${modifier(attributes.forca)}</em></div><div><span>🍃</span><small>DESTREZA</small><b>${attributes.destreza}</b><em>MOD. ${modifier(attributes.destreza)}</em></div><div><span>📖</span><small>INTELIGÊNCIA</small><b>${attributes.inteligencia}</b><em>MOD. ${modifier(attributes.inteligencia)}</em></div><div><span>👁️</span><small>SABEDORIA</small><b>${attributes.sabedoria}</b><em>MOD. ${modifier(attributes.sabedoria)}</em></div></div><h3>CARACTERÍSTICAS DA RAÇA</h3><p class="center">${race.traits.map((trait) => `• ${trait}`).join(' &nbsp; ')}</p><div class="cols"><section><h4>APARÊNCIA</h4>${Object.entries(state.appearance).map(([key, value]) => `<p>✹ ${labelForAppearance(key)}: ${value}</p>`).join('')}</section><section><h4>EQUIPAMENTOS</h4>${klass.equipment.map((item) => `<p>⚔ ${item}</p>`).join('')}</section></div><h3>${selectedSkillCatalog().type.toUpperCase()}</h3><div class="chips">${selectedSkills().map((item) => `<span>${item.icon} ${item.name}</span>`).join('')}</div><h3>PERSONALIDADE</h3><div class="chips">${state.personality.map((item) => `<span>${item}</span>`).join('')}</div><h3>EQUIPAMENTO</h3><p>${state.equipment}</p><h3>OUTRAS CARACTERÍSTICAS</h3><p>${state.otherCharacteristics}</p><h3>HISTÓRIA</h3><p>${state.story}</p></aside>`;
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
  document.querySelectorAll('[data-class]').forEach((button) => button.addEventListener('click', () => { state.class = button.dataset.class; state.skills = selectedSkillCatalog().options.slice(0, 2).map((item) => item.id); render(); }));
  document.querySelectorAll('[data-skill]').forEach((button) => button.addEventListener('click', () => toggleSkill(button.dataset.skill)));
  document.querySelectorAll('[data-appearance-key]').forEach((button) => button.addEventListener('click', () => { state.appearance[button.dataset.appearanceKey] = button.dataset.appearanceValue; render(); }));
  document.querySelectorAll('[data-field]').forEach((field) => field.addEventListener('input', () => { state[field.dataset.field] = field.value; render(); }));
  document.querySelectorAll('[data-integration]').forEach((field) => {
    const updateIntegration = () => { integration[field.dataset.integration] = field.value; };
    field.addEventListener('input', updateIntegration);
    field.addEventListener('change', updateIntegration);
  });
  $('[data-action="confirm-integration"]')?.addEventListener('click', confirmIntegration);
  $('[data-action="generate-image"]')?.addEventListener('click', generateCharacterImage);
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
  state.race = normalizeId(data.race, races, state.race);
  state.class = normalizeId(data.class, classes, state.class);
  state.skills = normalizeSkills(data.skills);
  state.appearance = { ...state.appearance, ...(data.appearance || {}) };
  state.personality = Array.isArray(data.personality) ? data.personality : state.personality;
  state.equipment = data.equipment || state.equipment;
  state.otherCharacteristics = data.otherCharacteristics || state.otherCharacteristics;
  state.story = data.story || state.story;
}

function toggleSkill(id) {
  if (state.skills.includes(id)) {
    state.skills = state.skills.filter((item) => item !== id);
  } else if (state.skills.length < 2) {
    state.skills = [...state.skills, id];
  }
  render();
}

function normalizeSkills(value) {
  const availableIds = selectedSkillCatalog().options.map((item) => item.id);
  const ids = Array.isArray(value)
    ? value.map((item) => (typeof item === 'string' ? item : item?.id))
    : [];
  const validIds = ids.filter((id, index) => availableIds.includes(id) && ids.indexOf(id) === index);
  return validIds.length ? validIds.slice(0, 2) : availableIds.slice(0, 2);
}

function normalizeId(value, collection, fallback) {
  const id = typeof value === 'string' ? value : value?.id;
  return collection.some((item) => item.id === id) ? id : fallback;
}

function confirmIntegration() {
  if (!integration.apiKey.trim()) {
    alert('Informe a chave da API OpenAI para continuar.');
    return;
  }

  integration.ready = true;
  render();
}

function buildImagePrompt() {
  const data = characterJson();
  return `Crie uma ilustração vertical de personagem de RPG em fantasia clássica, aquarela delicada, pintura de storybook e desenho de livro infantil/juvenil de aventura.

Personagem: ${data.name}, raça ${data.race.name}, classe ${data.class.name}.
Aparência: pele ${data.appearance.skin}, cabelo ${data.appearance.hair.toLowerCase()} ${data.appearance.hairColor.toLowerCase()}, olhos ${data.appearance.eyes.toLowerCase()}, altura ${data.appearance.height.toLowerCase()}, corpo ${data.appearance.body.toLowerCase()}, marcas: ${data.appearance.marks.toLowerCase()}, acessório: ${data.appearance.accessory.toLowerCase()}, roupa/estilo: ${data.appearance.style.toLowerCase()}.
Personalidade: ${data.personality.join(', ')}.
Equipamentos obrigatórios da aba História: ${data.equipment}. Não substitua por equipamentos padrão de raça ou classe.
Outras características: ${data.otherCharacteristics}.
História e intenção dramática: ${data.story}.

Composição: pose dinâmica e heroica em três quartos, corpo inteiro visível, expressão carismática coerente com a personalidade, cenário de fantasia suave relacionado à história, luz dourada cinematográfica, pinceladas de aquarela, contornos finos, textura de papel, cores harmoniosas, detalhes nos equipamentos, atmosfera mágica e acolhedora. Evite texto, assinatura, logotipos, marcas d'água, moldura, aparência fotorealista ou estilo sombrio adulto.

JSON do personagem para fidelidade:
${JSON.stringify(data, null, 2)}`;
}

async function generateCharacterImage() {
  if (!integration.ready || !integration.apiKey.trim()) {
    alert('Atualize a página e informe os dados da integração antes de gerar a imagem.');
    return;
  }

  imageState.loading = true;
  imageState.error = '';
  imageState.dataUrl = '';
  imageState.prompt = buildImagePrompt();
  render();

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${integration.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: integration.model.trim() || 'gpt-image-2',
        prompt: imageState.prompt,
        size: integration.size,
        quality: integration.quality,
        n: 1,
      }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error?.message || 'A API recusou a solicitação de imagem.');
    const imageBase64 = payload.data?.[0]?.b64_json;
    if (!imageBase64) throw new Error('A resposta da API não trouxe uma imagem em base64.');
    imageState.dataUrl = `data:image/png;base64,${imageBase64}`;
  } catch (error) {
    imageState.error = `Não foi possível gerar a imagem: ${error.message}`;
  } finally {
    imageState.loading = false;
    render();
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\"', '&quot;');
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
