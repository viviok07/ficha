# Arquitetura

## Visão geral

```
index.html
  |- <div id="root">              <- único ponto de montagem
  |- <link src/style.css>         <- todo o CSS (sem pré-processador)
  |- <script defer src/main.js>   <- todo o JS (script clássico, sem módulos)
```

`src/main.js` termina com uma chamada solta a `render()` (última linha do arquivo). É esse o
bootstrap da aplicação — não há `DOMContentLoaded` porque o `defer` já garante o DOM pronto.

## O ciclo de vida (o coração do sistema)

```
        state / integration / imageState        (objetos mutáveis no topo do arquivo)
                        |
                        | lido por
                        v
   render()  -->  monta uma STRING de HTML inteira  -->  #root.innerHTML = ...
                        |
                        v
   bindEvents()  -->  querySelectorAll('[data-*]') + addEventListener em cada nó
                        |
                        v
   restoreFocus()  -->  devolve foco e cursor ao campo que estava ativo
                        |
                        v
   usuário clica/digita  -->  handler MUTA o estado  -->  chama render()
                        |
                        +--------> (recomeça o ciclo)
```

Pontos críticos desse modelo:

- **Não há reconciliação.** Cada `render()` destrói e recria todos os nós de `#root`. Por isso
  `bindEvents()` precisa rodar ao final de **todo** `render()` — os listeners antigos morreram
  junto com os nós.
- **Não há vazamento de listeners**, justamente porque os nós antigos são descartados.
- **O estado é global e mutável por design.** Não introduza imutabilidade, reducers ou stores a
  menos que o usuário peça; o padrão do arquivo é `state.x = valor; render();`.
- **O foco sobrevive ao re-render.** `captureFocus()` roda antes de trocar o HTML e
  `restoreFocus()` depois de `bindEvents()`, devolvendo foco e `selectionRange`. Só campos com
  `data-field`, `data-integration` ou `data-personality-input` são reconhecidos
  ([src/main.js:222](../src/main.js#L222)): input novo fora dessa lista volta a perder o cursor.
- **A flag `rendering`** ([src/main.js:186](../src/main.js#L186)) marca o intervalo em que o DOM
  está sendo substituído. Handlers de `blur` precisam checá-la — a remoção do nó focado dispara
  `blur` em alguns navegadores.

## Os três objetos de estado

Ficam em [src/main.js:121-163](../src/main.js#L121-L163). São separados de propósito:

| Objeto | Conteúdo | Sai no JSON exportado? |
| --- | --- | --- |
| `integration` | `ready`, `apiKey`, `model`, `size`, `quality` — configuração da OpenAI da sessão | nunca (contém segredo) |
| `imageState` | `loading`, `error`, `checked`, `dataUrl`, `prompt` — resultado da geração de imagem | não |
| `state` | O personagem em si + `state.step` e `state.personalityDraft` (UI) | sim, via `characterJson()` |

`state.step` e `state.personalityDraft` são estado de UI convivendo com estado de domínio; eles
**não** são serializados porque `characterJson()` monta um objeto novo campo a campo.

`imageState.checked` vira `true` no primeiro clique em GERAR IMAGEM e faz `renderImageResult()`
recalcular `missingCharacterFields()` a cada render — a lista de pendências some sozinha
conforme o usuário preenche.

## Camadas de funções em `src/main.js`

O arquivo segue uma ordem consistente. Ao adicionar código, respeite o bloco correspondente.

| Bloco | Linhas aprox. | Funções | Responsabilidade |
| --- | --- | --- | --- |
| 1. Catálogos | 1–118 | `races`, `classes`, `skillCatalog`, `appearanceGroups`, `steps` | Dados estáticos do jogo |
| 2. Estado | 121–163 | `integration`, `imageState`, `state` | Estado mutável |
| 3. Derivados | 165–183 | `$`, `selectedRace`, `selectedClass`, `selectedSkillCatalog`, `selectedSkills`, `characterJson` | Leitura derivada do estado |
| 4. Render | 186–394 | `rendering`, `render`, `focusSelector`, `captureFocus`, `restoreFocus`, `renderIntegrationGate`, `renderStepper`, `renderCurrentStep`, os cinco `render*Step`, `renderPersonalityField`, `renderImageResult`, `renderNavButtons`, `renderSheet`, `sheetLabels`, `sheetText`, `modifier`, `labelForAppearance` | HTML como template string |
| 5. Eventos | 396–431 | `bindEvents` | Único lugar que registra listeners |
| 6. Domínio e IO | 433–532 | `importJson`, `loadCharacter`, `toggleSkill`, `normalizeSkills`, `addPersonalityTrait`, `updatePersonalityDraft`, `commitPersonalityDraft`, `normalizeId`, `confirmIntegration` | Regras e importação |
| 7. IA | 534–623 | `buildImagePrompt`, `missingCharacterFields`, `generateCharacterImage` | Integração OpenAI |
| 8. Utilitários e bootstrap | 625–643 | `escapeHtml`, `downloadJson` e a chamada final `render()` | Helpers e inicialização |

## Estrutura visual montada por `render()`

```
<main class="page">
  {integration-gate}          <- overlay fixo; some quando integration.ready === true
  <header class="hero-head">  <- marca + botões REINICIAR / IMPORTAR JSON / SALVAR FICHA
  <div class="workspace">     <- grid de 3 colunas
     <aside class="steps">    <- renderStepper(): os 5 passos clicáveis
     <section class="panel">  <- renderCurrentStep(): o passo ativo
     <aside class="sheet">    <- renderSheet(): a ficha, sempre visível e sempre atualizada
```

`renderCurrentStep()` é um despacho simples por `state.step`; o `else` final cai em
`renderStoryStep()`.

## Contrato de eventos: atributos `data-*`

`bindEvents()` ([src/main.js:396](../src/main.js#L396)) é uma tabela de despacho baseada
inteiramente em atributos `data-*`. **Para tornar um elemento interativo basta emitir o
atributo certo no HTML — nenhum listener novo é preciso se você reutilizar um existente.**

| Atributo | Efeito ao clicar/digitar |
| --- | --- |
| `data-step="<id>"` | `state.step = id` (usado pelo stepper lateral **e** pelos botões Voltar/Próximo) |
| `data-race="<id>"` | `state.race = id` |
| `data-class="<id>"` | `state.class = id` **e esvazia `state.skills`** (ids são exclusivos por classe) |
| `data-skill="<id>"` | `toggleSkill(id)` — máximo de 2 selecionadas |
| `data-appearance-key` + `data-appearance-value` | `state.appearance[key] = value` |
| `data-field="<chave>"` | no evento `input`: `state[chave] = elemento.value` |
| `data-personality-input` | `input`: vírgula vira badge; `Enter` e `blur` confirmam o pendente |
| `data-personality-remove="<índice>"` | remove aquele traço de `state.personality` |
| `data-integration="<chave>"` | no `input`/`change`: `integration[chave] = elemento.value` |
| `data-action="confirm-integration"` | valida a chave e fecha o gate |
| `data-action="generate-image"` | dispara `generateCharacterImage()` |
| `data-action="reset"` | `window.location.reload()` (não há reset de estado em memória) |
| `data-action="save"` | `downloadJson()` |
| `data-action="import"` | abre o `<input type="file" data-file-input>` escondido |
| `data-file-input` | no `change`: `importJson(event)` |

`data-field` só funciona para chaves **de primeiro nível e do tipo string** em `state`
(`name`, `player`, `age`, `gender`, `height`, `equipment`, `otherCharacteristics`, `story`).
Campos aninhados precisam de um atributo próprio, como `data-appearance-key` faz para
`state.appearance`.

## Regras de domínio implementadas

- **Exatamente 2 habilidades.** `toggleSkill()` remove a habilidade se ela já estiver
  selecionada e só adiciona quando `state.skills.length < 2`. Não há mensagem de erro no limite —
  o clique simplesmente não faz nada.
- **Nada vem pré-selecionado.** O `state` inicial é inteiramente vazio e nenhum caminho do código
  escolhe por conta própria: o handler de `data-class` **não** preenche habilidades e
  `normalizeSkills()` **não** tem fallback (JSON sem habilidades válidas vira `[]`).
- **Trocar de classe invalida as habilidades.** O handler de `data-class` zera `state.skills`,
  porque os ids de habilidade são exclusivos por classe.
- **Gerar imagem exige a ficha completa.** `missingCharacterFields()`
  ([src/main.js:551](../src/main.js#L551)) lista o que falta (raça, classe, 2 habilidades, os 9
  grupos de aparência, os 8 textos da aba História e ao menos 1 traço de personalidade). Havendo
  pendência, a requisição não sai.
- **Os atributos vêm da classe, não da raça.** `renderSheet()` lê `selectedClass().attributes`;
  os traços de raça (`race.traits`) são texto livre e não afetam números.
- **Modificador**: `modifier(score) = max(-1, score - 2)`, formatado com sinal
  ([src/main.js:386](../src/main.js#L386)). A escala esperada de atributo é 1–5.
- **Dois conceitos de equipamento coexistem**:
  - `class.equipment` (array) — exibido na seção "EQUIPAMENTOS" da ficha e no passo de Classe;
  - `state.equipment` (string editável na aba História) — exibido em "EQUIPAMENTO" e **é o único
    usado no prompt de imagem**. Isso é intencional; ver [INTEGRACAO_IMAGEM.md](INTEGRACAO_IMAGEM.md).

## Importação de JSON

`importJson()` → `FileReader` → `JSON.parse` → `loadCharacter(data)` → `render()`.

`loadCharacter()` ([src/main.js:450](../src/main.js#L450)) é tolerante: qualquer campo ausente
mantém o valor atual. Ele aceita tanto `"elfo"` quanto `{ "id": "elfo", ... }` graças a
`normalizeId()` e `normalizeSkills()`.

> A ordem das atribuições importa. `state.class` precisa ser definido **antes** de
> `state.skills`, porque `normalizeSkills()` chama `selectedSkillCatalog()`, que lê
> `state.class`. Se você reordenar as linhas de `loadCharacter()`, as habilidades importadas
> passam a ser validadas contra o catálogo da classe errada.

## Armadilhas conhecidas

Documentadas para que agentes não as tratem como bugs novos nem as repitam:

1. ~~Foco perdido ao digitar~~ — **resolvido** por `captureFocus()`/`restoreFocus()`. Volta a
   acontecer se você criar um input que `focusSelector()` não reconheça.
2. ~~HTML não escapado na ficha~~ — **resolvido**. `renderSheet()` escapa todos os valores vindos
   do usuário. Textos de catálogo (nomes de raça, classe, habilidade) não são escapados de
   propósito: são dados do próprio código.
3. **`escapeHtml()` não escapa aspas simples** (trata apenas `&`, `<`, `>` e `"`), então não use
   o retorno dentro de atributos delimitados por `'`.
4. **REINICIAR recarrega a página**, o que também apaga a configuração da OpenAI e obriga o
   usuário a informar a chave de novo.
5. **A chave de API vive só em memória.** Ela é enviada do navegador direto para a OpenAI. Nunca
   adicione código que a persista, registre em log ou envie para outro destino.
6. **Não há validação de tamanho nem de tipo profundo no JSON importado** — um arquivo
   arbitrário pode, por exemplo, substituir `state.personality` por um array gigante.
