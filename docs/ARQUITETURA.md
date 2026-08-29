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

## Os três objetos de estado

Ficam em [src/main.js:121-158](../src/main.js#L121-L158). São separados de propósito:

| Objeto | Conteúdo | Sai no JSON exportado? |
| --- | --- | --- |
| `integration` | `ready`, `apiKey`, `model`, `size`, `quality` — configuração da OpenAI da sessão | nunca (contém segredo) |
| `imageState` | `loading`, `error`, `dataUrl`, `prompt` — resultado da geração de imagem | não |
| `state` | O personagem em si + `state.step` (passo ativo do wizard) | sim, via `characterJson()` |

`state.step` é estado de UI convivendo com estado de domínio; ele **não** é serializado porque
`characterJson()` monta um objeto novo campo a campo.

## Camadas de funções em `src/main.js`

O arquivo segue uma ordem consistente. Ao adicionar código, respeite o bloco correspondente.

| Bloco | Linhas aprox. | Funções | Responsabilidade |
| --- | --- | --- | --- |
| 1. Catálogos | 1–118 | `races`, `classes`, `skillCatalog`, `appearanceGroups`, `steps` | Dados estáticos do jogo |
| 2. Estado | 121–158 | `integration`, `imageState`, `state` | Estado mutável |
| 3. Derivados | 160–176 | `$`, `selectedRace`, `selectedClass`, `selectedSkillCatalog`, `selectedSkills`, `characterJson` | Leitura derivada do estado |
| 4. Render | 178–319 | `render`, `renderIntegrationGate`, `renderStepper`, `renderCurrentStep`, `renderRaceStep`, `renderClassStep`, `renderSkillsStep`, `renderAppearanceStep`, `renderStoryStep`, `renderImageResult`, `renderNavButtons`, `renderSheet`, `modifier`, `labelForAppearance` | HTML como template string |
| 5. Eventos | 321–339 | `bindEvents` | Único lugar que registra listeners |
| 6. Domínio e IO | 341–402 | `importJson`, `loadCharacter`, `toggleSkill`, `normalizeSkills`, `normalizeId`, `confirmIntegration` | Regras e importação |
| 7. IA | 404–459 | `buildImagePrompt`, `generateCharacterImage` | Integração OpenAI |
| 8. Utilitários e bootstrap | 461–479 | `escapeHtml`, `downloadJson` e a chamada final `render()` | Helpers e inicialização |

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

`bindEvents()` ([src/main.js:321](../src/main.js#L321)) é uma tabela de despacho baseada
inteiramente em atributos `data-*`. **Para tornar um elemento interativo basta emitir o
atributo certo no HTML — nenhum listener novo é preciso se você reutilizar um existente.**

| Atributo | Efeito ao clicar/digitar |
| --- | --- |
| `data-step="<id>"` | `state.step = id` (usado pelo stepper lateral **e** pelos botões Voltar/Próximo) |
| `data-race="<id>"` | `state.race = id` |
| `data-class="<id>"` | `state.class = id` **e reseta `state.skills` para as 2 primeiras do novo catálogo** |
| `data-skill="<id>"` | `toggleSkill(id)` — máximo de 2 selecionadas |
| `data-appearance-key` + `data-appearance-value` | `state.appearance[key] = value` |
| `data-field="<chave>"` | no evento `input`: `state[chave] = elemento.value` |
| `data-integration="<chave>"` | no `input`/`change`: `integration[chave] = elemento.value` |
| `data-action="confirm-integration"` | valida a chave e fecha o gate |
| `data-action="generate-image"` | dispara `generateCharacterImage()` |
| `data-action="reset"` | `window.location.reload()` (não há reset de estado em memória) |
| `data-action="save"` | `downloadJson()` |
| `data-action="import"` | abre o `<input type="file" data-file-input>` escondido |
| `data-file-input` | no `change`: `importJson(event)` |

`data-field` só funciona para chaves **de primeiro nível e do tipo string** em `state`
(`name`, `player`, `equipment`, `otherCharacteristics`, `story`). Campos aninhados precisam de
um atributo próprio, como `data-appearance-key` faz para `state.appearance`.

## Regras de domínio implementadas

- **Exatamente 2 habilidades.** `toggleSkill()` remove a habilidade se ela já estiver
  selecionada e só adiciona quando `state.skills.length < 2`. Não há mensagem de erro no limite —
  o clique simplesmente não faz nada.
- **Trocar de classe invalida as habilidades.** O handler de `data-class` substitui
  `state.skills` pelas duas primeiras opções do catálogo da nova classe, porque os ids de
  habilidade são exclusivos por classe.
- **Os atributos vêm da classe, não da raça.** `renderSheet()` lê `selectedClass().attributes`;
  os traços de raça (`race.traits`) são texto livre e não afetam números.
- **Modificador**: `modifier(score) = max(-1, score - 2)`, formatado com sinal
  ([src/main.js:311](../src/main.js#L311)). A escala esperada de atributo é 1–5.
- **Dois conceitos de equipamento coexistem**:
  - `class.equipment` (array) — exibido na seção "EQUIPAMENTOS" da ficha e no passo de Classe;
  - `state.equipment` (string editável na aba História) — exibido em "EQUIPAMENTO" e **é o único
    usado no prompt de imagem**. Isso é intencional; ver [INTEGRACAO_IMAGEM.md](INTEGRACAO_IMAGEM.md).

## Importação de JSON

`importJson()` → `FileReader` → `JSON.parse` → `loadCharacter(data)` → `render()`.

`loadCharacter()` ([src/main.js:358](../src/main.js#L358)) é tolerante: qualquer campo ausente
mantém o valor atual. Ele aceita tanto `"elfo"` quanto `{ "id": "elfo", ... }` graças a
`normalizeId()` e `normalizeSkills()`.

> A ordem das atribuições importa. `state.class` precisa ser definido **antes** de
> `state.skills`, porque `normalizeSkills()` chama `selectedSkillCatalog()`, que lê
> `state.class`. Se você reordenar as linhas de `loadCharacter()`, as habilidades importadas
> passam a ser validadas contra o catálogo da classe errada.

## Armadilhas conhecidas

Documentadas para que agentes não as tratem como bugs novos nem as repitam:

1. **Foco perdido ao digitar.** Os handlers `data-field` chamam `render()` a cada tecla, o que
   recria o `<input>` e tira o cursor do campo. Se for corrigir, a solução idiomática aqui é não
   re-renderizar tudo no evento `input` (atualizar só a ficha) ou restaurar foco e posição do
   cursor logo após o `render()`.
2. **HTML não escapado na ficha.** `renderSheet()` interpola `state.name`, `state.player`,
   `state.equipment`, `state.otherCharacteristics`, `state.story` e os valores de
   `state.appearance` **sem** `escapeHtml()`. O `renderStoryStep()` já escapa. Ao mexer nessas
   linhas, envolva os valores com `escapeHtml()`.
3. **`escapeHtml()` não escapa aspas simples** (trata apenas `&`, `<`, `>` e `"`), então não use
   o retorno dentro de atributos delimitados por `'`.
4. **REINICIAR recarrega a página**, o que também apaga a configuração da OpenAI e obriga o
   usuário a informar a chave de novo.
5. **A chave de API vive só em memória.** Ela é enviada do navegador direto para a OpenAI. Nunca
   adicione código que a persista, registre em log ou envie para outro destino.
6. **Não há validação de tamanho nem de tipo profundo no JSON importado** — um arquivo
   arbitrário pode, por exemplo, substituir `state.personality` por um array gigante.
