# Modelo de dados

Todos os catálogos ficam no topo de [src/main.js](../src/main.js), antes de qualquer função.
São arrays/objetos literais, sem carregamento externo. **Adicionar conteúdo ao jogo é, quase
sempre, apenas editar esses literais** — a UI é gerada por `map()` sobre eles.

## Convenção de `id`

- kebab-case, minúsculo, **sem acentos e sem espaços**: `guerreiro`, `passo-da-floresta`.
- Único dentro do seu catálogo (ids de habilidade precisam ser únicos apenas dentro da classe,
  mas mantenha-os globalmente distintos para facilitar depuração).
- **Nunca renomeie um id já publicado**: fichas JSON salvas por usuários referenciam esses
  valores, e `normalizeId()` descarta silenciosamente ids desconhecidos, caindo no padrão.

---

## `races` — [src/main.js:1](../src/main.js#L1)

```js
{
  id: 'elfo',
  name: 'Elfo',                 // exibido nos cards e na ficha
  icon: '🌿',                    // 1 emoji; vira a arte do card
  description: '...',           // 1 frase, linguagem infantil
  traits: ['+1 Destreza', ...], // 3 itens; texto livre, sem efeito mecânico
}
```

Consumido por: `renderRaceStep()` (grid + bloco de informações) e `renderSheet()` (badge de raça
e a linha "CARACTERÍSTICAS DA RAÇA").

O grid usa a classe CSS `p{index}` (`p0`…`p6`) para dar um gradiente diferente à arte de cada
card. Só existem gradientes definidos para `.p1`–`.p5` em [src/style.css:235](../src/style.css#L235);
adicionar raças além disso ainda funciona, mas os cards excedentes usam o gradiente padrão de
`.choice-art`.

## `classes` — [src/main.js:11](../src/main.js#L11)

```js
{
  id: 'patrulheiro',
  name: 'Patrulheiro',
  icon: '🏹',
  description: '...',
  equipment: ['Arco longo', 'Aljava com flechas', ...], // itens padrão da classe
  attributes: { forca: 3, destreza: 5, inteligencia: 3, sabedoria: 5 }, // escala 1–5
}
```

As **quatro** chaves de `attributes` são fixas e usadas literalmente em `renderSheet()`
(`forca`, `destreza`, `inteligencia`, `sabedoria`, sem acento). Adicionar um quinto atributo
exige alterar `renderSheet()` e o CSS `.attrs`.

> Toda classe **precisa** ter uma entrada correspondente em `skillCatalog` com a mesma chave de
> id. Sem isso, `selectedSkillCatalog()` retorna `undefined` e o passo 3 quebra.

## `skillCatalog` — [src/main.js:21](../src/main.js#L21)

Objeto indexado pelo `class.id`:

```js
guerreiro: {
  type: 'manobras',      // 'manobras' | 'magias' — muda o texto e o título na ficha
  singular: 'manobra',   // presente no dado, hoje não usado pelo render
  options: [
    { id: 'golpe-preciso', name: 'Golpe preciso', icon: '🎯', description: '...' },
    // ... 5 opções por classe (o texto da UI diz "dentre as 5 disponíveis")
  ],
}
```

`type` é usado em `renderSkillsStep()` (texto explicativo e contador) e em `renderSheet()`
(título da seção, em maiúsculas). O número 5 aparece como texto fixo no passo 3 — se mudar a
quantidade de opções, ajuste também essa frase.

## `appearanceGroups` — [src/main.js:101](../src/main.js#L101)

```js
{ key: 'skin', title: 'Tom de pele', icon: '🎨', options: ['Clara', 'Morena clara', ...] }
```

- `key` é a chave dentro de `state.appearance`.
- As `options` são **strings exibidas diretamente** — o valor salvo é o próprio rótulo, não um id.
- `labelForAppearance(key)` faz o caminho inverso (chave → título) para a ficha.
- `buildImagePrompt()` referencia `skin`, `hair`, `hairColor`, `eyes`, `height`, `body`, `marks`,
  `accessory` e `style` **pelo nome**; grupos novos não entram no prompt automaticamente.

> **Estatura ≠ Altura.** O grupo `height` se chama **"Estatura"** (Baixa/Média/Alta) e é diferente
> do campo de texto livre `state.height` ("Altura", aba História). A chave continua `height` para
> não quebrar fichas antigas, e `buildImagePrompt()` cita os dois com rótulos distintos.

## `steps` — [src/main.js:113](../src/main.js#L113)

```js
{ id: 'race', number: 1, title: 'Raça', subtitle: 'Escolha sua origem' }
```

Só alimenta o stepper visual. A navegação real depende de `renderCurrentStep()` (o `if` por
`state.step`) e dos `renderNavButtons(proximo, anterior)` de cada passo.

---

## `state` — o personagem — [src/main.js:137](../src/main.js#L137)

```js
{
  step: 'race',            // id do passo ativo (UI, não serializado)
  name: '',                // string livre
  player: '',              // string livre
  age: '',                 // texto livre (ex.: "12 anos")
  gender: '',              // texto livre
  height: '',              // texto livre (ex.: "1,45 m") — NÃO confundir com appearance.height
  race: '',                // race.id, '' enquanto nada foi escolhido
  class: '',               // class.id, '' enquanto nada foi escolhido
  skills: [],              // até 2 skill.id da classe atual
  appearance: { skin, hair, hairColor, eyes, height, body, marks, accessory, style }, // rótulos, '' quando vazio
  personality: [],         // array de strings, editado por badges na aba História
  personalityDraft: '',    // texto ainda não confirmado no input de personalidade (UI, não serializado)
  equipment: '',           // string livre (aba História)
  otherCharacteristics: '',
  story: '',
}
```

**Tudo começa vazio.** A aplicação não pré-seleciona nada: nenhuma raça, classe, habilidade,
opção de aparência ou texto vem preenchido. Blocos de informação exibem um texto de espera
("Nenhuma raça escolhida ainda") e as seções vazias da ficha simplesmente não são renderizadas.
Isso obriga todo consumidor de `state.race`/`state.class` a tolerar `undefined` — use
`selectedRace()?.` / `selectedClass()?.` em vez de acessar direto.

`state.personality` é editado na aba História: vírgula (ou Enter, ou sair do campo) transforma o
texto em badge, e cada badge tem um "×" que a remove. Traços são aparados, vazios são ignorados e
repetidos (sem diferenciar maiúsculas) não entram duas vezes.

`state.personalityDraft` é o texto pendente do input e **não** é exportado — como `state.step`,
é estado de UI que mora dentro de `state`.

---

## JSON exportado — `characterJson()` — [src/main.js:170](../src/main.js#L170)

`SALVAR FICHA` baixa `${state.name || 'personagem'}.json` com este formato (**objetos completos**
para raça, classe e habilidades, não apenas ids):

```json
{
  "name": "Lirien",
  "player": "Maria Eduarda",
  "age": "12 anos",
  "gender": "menina",
  "height": "1,45 m",
  "race":  { "id": "elfo", "name": "Elfo", "icon": "🌿", "description": "...", "traits": ["..."] },
  "class": { "id": "patrulheiro", "name": "Patrulheiro", "icon": "🏹", "description": "...",
             "equipment": ["..."], "attributes": { "forca": 3, "destreza": 5, "inteligencia": 3, "sabedoria": 5 } },
  "skills": [ { "id": "tiro-marcado", "name": "Tiro marcado", "icon": "🏹", "description": "..." } ],
  "appearance": { "skin": "Morena clara", "hair": "Longo", "hairColor": "Prateado", "eyes": "Verdes",
                  "height": "Média", "body": "Atlético", "marks": "Cicatriz no rosto",
                  "accessory": "Colar com pingente", "style": "Roupa da floresta" },
  "personality": ["Observadora", "Curiosa", "Leal", "Determinada"],
  "equipment": "Arco longo, aljava com flechas, punhal e apito do companheiro animal.",
  "otherCharacteristics": "...",
  "story": "..."
}
```

`race` e `class` saem como `null` enquanto nada foi escolhido, e `skills` pode vir com 0 ou 1
item — o JSON de uma ficha incompleta continua válido e importável.

Na importação, `loadCharacter()` aceita as duas formas — objeto completo ou id em string — para
`race`, `class` e cada item de `skills`. Campos desconhecidos são ignorados; campos ausentes
mantêm o valor atual. Fichas antigas (sem `age`/`gender`/`height`) importam normalmente: os
campos novos ficam vazios.

**Ao adicionar um campo novo ao personagem, atualize os três pontos:** `state` (valor padrão),
`characterJson()` (exportação) e `loadCharacter()` (importação). Esquecer um deles gera perda
silenciosa de dados. Se o campo for obrigatório para gerar a imagem, acrescente-o também a
`missingCharacterFields()`.
