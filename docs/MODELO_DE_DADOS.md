# Modelo de dados

Todos os catálogos ficam no topo de [src/main.js](../src/main.js), antes de qualquer função.
São arrays/objetos literais, sem carregamento externo. **Adicionar conteúdo ao jogo é, quase
sempre, apenas editar esses literais** — a UI é gerada por `map()` sobre eles.

## Convenção de `id`

- kebab-case, minúsculo, **sem acentos e sem espaços**: `guerreiro`, `passo-da-floresta`.
- Único dentro do seu catálogo (ids de habilidade e de equipamento precisam ser únicos apenas
  dentro da classe, mas mantenha-os globalmente distintos para facilitar depuração).
- **Nunca renomeie um id já publicado**: fichas JSON salvas por usuários referenciam esses
  valores, e `normalizeId()` / `normalizeChoices()` descartam silenciosamente ids desconhecidos.

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
card. Só existem gradientes definidos para `.p1`–`.p5` em [src/style.css:237](../src/style.css#L237);
adicionar raças além disso ainda funciona, mas os cards excedentes usam o gradiente padrão de
`.choice-art`.

## `classes` — [src/main.js:11](../src/main.js#L11)

```js
{
  id: 'patrulheiro',
  name: 'Patrulheiro',
  icon: '🏹',
  description: '...',
  attributes: { forca: 3, destreza: 5, inteligencia: 3, sabedoria: 5 }, // escala 1–5
}
```

A classe **não** guarda mais uma lista de equipamentos: isso virou `equipmentCatalog`, abaixo.

As **quatro** chaves de `attributes` são fixas e usadas literalmente em `renderSheet()`
(`forca`, `destreza`, `inteligencia`, `sabedoria`, sem acento). Adicionar um quinto atributo
exige alterar `renderSheet()` e o CSS `.attrs`.

> Toda classe **precisa** ter uma entrada correspondente em `skillCatalog` **e** em
> `equipmentCatalog`, com a mesma chave de id. Sem a primeira, `selectedSkillCatalog()` retorna
> `undefined` e o passo 3 quebra; sem a segunda, o passo 5 mostra o texto de espera para sempre.

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
- `buildImagePrompt()` percorre `appearanceGroups` genericamente e emite `título valor`, em texto
  corrido, para cada grupo preenchido, ignorando os vazios. **Um grupo novo entra no prompt
  sozinho**, sem editar a função.

> **Estatura ≠ Altura.** O grupo `height` se chama **"Estatura"** (Baixa/Média/Alta) e é diferente
> do campo de texto livre `state.height` ("Altura", aba História). A chave continua `height` para
> não quebrar fichas antigas, e `buildImagePrompt()` cita os dois em frases diferentes.

## `personalityCatalog` — [src/main.js:113](../src/main.js#L113)

Array simples de 10 opções, **global** (não depende de classe nem de raça):

```js
{ id: 'valente', name: 'Valente', icon: '🦁', description: 'Encara o medo e vai em frente mesmo tremendo.' }
```

Os nomes são propositalmente **neutros em gênero** (valente, gentil, leal, alegre, inteligente,
paciente, falante, otimista, persistente, responsável): o campo Gênero é texto livre e a ficha
mostra o traço como chip. Ao acrescentar opções, mantenha essa neutralidade e o tom infantil.

O usuário escolhe até `PERSONALITY_LIMIT` (3).

## `equipmentCatalog` — [src/main.js:126](../src/main.js#L126)

Objeto indexado pelo `class.id`, com **5 opções por classe**, misturando vestimenta e equipamento
principal para que dê para escolher "uma roupa + uma arma":

```js
patrulheiro: [
  { id: 'arco-longo', name: 'Arco longo e aljava', icon: '🏹', description: 'Acerta o alvo bem de longe.' },
  // ... 5 no total
],
```

O usuário escolhe até `EQUIPMENT_LIMIT` (2). É a **única** fonte de equipamento do sistema: o
passo 2 lista as 5 como "o que essa classe costuma usar", o passo 5 deixa escolher, e a ficha e o
prompt mostram só as escolhidas.

## `steps` — [src/main.js:178](../src/main.js#L178)

```js
{ id: 'race', number: 1, title: 'Raça', subtitle: 'Escolha sua origem' }
```

São **6**: `race`, `class`, `skills`, `appearance`, `story`, `overview`. Só alimenta o stepper
visual. A navegação real depende de `renderCurrentStep()` (o `if` por `state.step`) e dos
`renderNavButtons(proximo, anterior)` de cada passo.

## Limites — [src/main.js:187](../src/main.js#L187)

`SKILL_LIMIT` (2), `PERSONALITY_LIMIT` (3) e `EQUIPMENT_LIMIT` (2) são consumidos tanto pelos
handlers (`toggleChoice`) quanto pelos textos da UI e por `normalizeChoices()` na importação.
Mudar a constante muda os três lugares de uma vez.

---

O `state` em memória e o schema do JSON salvo ficam em [JSON_DA_FICHA.md](JSON_DA_FICHA.md).
