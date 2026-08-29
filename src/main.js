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
  { id: 'appearance', number: 3, title: 'Aparência', subtitle: 'Defina sua aparência' },
  { id: 'story', number: 4, title: 'História', subtitle: 'Conte um pouco sobre você' },
];

const state = {
  step: 'race',
  name: 'Lirien',
  player: 'Maria Eduarda',
  race: 'elfo',
  class: 'patrulheiro',
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
  story: 'Lirien cresceu nas florestas, aprendendo com os animais e com as árvores. Seu objetivo é proteger a natureza e manter o equilíbrio entre todos os seres.',
};

const $ = (selector) => document.querySelector(selector);
const selectedRace = () => races.find((item) => item.id === state.race);
const selectedClass = () => classes.find((item) => item.id === state.class);
const characterJson = () => ({
  name: state.name,
  player: state.player,
  race: selectedRace(),
  class: selectedClass(),
  appearance: state.appearance,
  personality: state.personality,
  story: state.story,
});

function render() {
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
    </button>`).join('')}</div><div class="info"><h3>${klass.icon} ${klass.name.toUpperCase()}</h3><p>${klass.description}</p><b>Equipamentos:</b><ul>${klass.equipment.map((item) => `<li>${item}</li>`).join('')}</ul></div>${renderNavButtons('appearance', 'race')}</section>`;
}

function renderAppearanceStep() {
  return `<section class="panel current-panel"><h2>✦ 3. APARÊNCIA ✦</h2><p>Escolha como seu herói será.</p><div class="appearance-list">${appearanceGroups.map((group) => `
    <div class="group"><h4><span>${group.icon}</span>${group.title}</h4><div class="opts">${group.options.map((option) => `
      <button class="pill-choice ${state.appearance[group.key] === option ? 'selected' : ''}" data-appearance-key="${group.key}" data-appearance-value="${option}">${option}</button>`).join('')}</div></div>`).join('')}</div>${renderNavButtons('story', 'class')}</section>`;
}

function renderStoryStep() {
  return `<section class="panel current-panel"><h2>✦ 4. HISTÓRIA ✦</h2><p>Conte quem é seu personagem.</p><label class="field">Nome do personagem<input data-field="name" value="${state.name}" /></label><label class="field">Jogador<input data-field="player" value="${state.player}" /></label><label class="field">História<textarea data-field="story">${state.story}</textarea></label><div class="json-box"><h3>JSON do personagem</h3><pre>${JSON.stringify(characterJson(), null, 2)}</pre></div>${renderNavButtons(null, 'appearance')}</section>`;
}

function renderNavButtons(next, previous) {
  return `<div class="panel-actions">${previous ? `<button class="secondary" data-step="${previous}">← VOLTAR</button>` : ''}${next ? `<button class="next" data-step="${next}">PRÓXIMO PASSO →</button>` : ''}</div>`;
}

function renderSheet() {
  const race = selectedRace();
  const klass = selectedClass();
  const attributes = klass.attributes;
  return `<aside class="sheet"><div class="ribbon">FICHA DO AVENTUREIRO</div><div class="row"><label>NOME DO PERSONAGEM<b>${state.name}</b></label><label>JOGADOR<b>${state.player}</b></label></div><div class="badges"><div>${race.icon}<span>RAÇA<b>${race.name}</b></span></div><div>${klass.icon}<span>CLASSE<b>${klass.name}</b></span></div></div><h3>✧ ATRIBUTOS ✧</h3><div class="attrs"><div><span>✊</span><small>FORÇA</small><b>${attributes.forca}</b><em>MOD. ${modifier(attributes.forca)}</em></div><div><span>🍃</span><small>DESTREZA</small><b>${attributes.destreza}</b><em>MOD. ${modifier(attributes.destreza)}</em></div><div><span>📖</span><small>INTELIGÊNCIA</small><b>${attributes.inteligencia}</b><em>MOD. ${modifier(attributes.inteligencia)}</em></div><div><span>👁️</span><small>SABEDORIA</small><b>${attributes.sabedoria}</b><em>MOD. ${modifier(attributes.sabedoria)}</em></div></div><h3>CARACTERÍSTICAS DA RAÇA</h3><p class="center">${race.traits.map((trait) => `• ${trait}`).join(' &nbsp; ')}</p><div class="cols"><section><h4>APARÊNCIA</h4>${Object.entries(state.appearance).map(([key, value]) => `<p>✹ ${labelForAppearance(key)}: ${value}</p>`).join('')}</section><section><h4>EQUIPAMENTOS</h4>${klass.equipment.map((item) => `<p>⚔ ${item}</p>`).join('')}</section></div><h3>PERSONALIDADE</h3><div class="chips">${state.personality.map((item) => `<span>${item}</span>`).join('')}</div><h3>HISTÓRIA</h3><p>${state.story}</p></aside>`;
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
  document.querySelectorAll('[data-class]').forEach((button) => button.addEventListener('click', () => { state.class = button.dataset.class; render(); }));
  document.querySelectorAll('[data-appearance-key]').forEach((button) => button.addEventListener('click', () => { state.appearance[button.dataset.appearanceKey] = button.dataset.appearanceValue; render(); }));
  document.querySelectorAll('[data-field]').forEach((field) => field.addEventListener('input', () => { state[field.dataset.field] = field.value; render(); }));
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
  state.appearance = { ...state.appearance, ...(data.appearance || {}) };
  state.personality = Array.isArray(data.personality) ? data.personality : state.personality;
  state.story = data.story || state.story;
}

function normalizeId(value, collection, fallback) {
  const id = typeof value === 'string' ? value : value?.id;
  return collection.some((item) => item.id === id) ? id : fallback;
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
