# Arquitetura

## Visão geral

```
index.html
  |- <div id="root">                  <- único ponto de montagem
  |- <link src/style.css>             <- todo o CSS (sem pré-processador)
  |- <script defer vendor/*.js>       <- html2canvas e jsPDF, só para o PDF
  |- <script defer src/main.js>       <- todo o JS (script clássico, sem módulos)
```

`src/main.js` termina com uma chamada solta a `render()` (última linha do arquivo). É esse o
bootstrap da aplicação — não há `DOMContentLoaded` porque o `defer` já garante o DOM pronto.
Os `<script>` de `vendor/` vêm **antes** de `main.js`: com `defer` a ordem é preservada, então
`window.html2canvas` e `window.jspdf` já existem quando o PDF é pedido.

## O ciclo de vida (o coração do sistema)

```
        state / imageState        (objetos mutáveis no topo do arquivo)
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
  `data-field` são reconhecidos ([src/main.js:281](../src/main.js#L281)): input novo fora dessa
  lista volta a perder o cursor.
- **Quem guarda um nó do DOM antes de chamar `render()` fica com lixo.** É por isso que
  `generatePdf()` ([src/main.js:632](../src/main.js#L632)) busca `.sheet` **depois** do render que
  liga o estado de carregamento.

## Os dois objetos de estado

Ficam em [src/main.js:191-217](../src/main.js#L191-L217). São separados de propósito:

| Objeto | Conteúdo | Sai no JSON exportado? |
| --- | --- | --- |
| `imageState` | `dataUrl`, `uploadError`, `prompt`, `copyStatus`, `pdfLoading`, `pdfError` | **não** — o retrato vive só na sessão |
| `state` | O personagem em si + `state.step` (UI) | sim, via `characterJson()` |

`state.step` é estado de UI convivendo com estado de domínio; ele **não** é serializado porque
`characterJson()` monta um objeto novo campo a campo.

`imageState.dataUrl` ficar fora do JSON é decisão de produto, não esquecimento: um data URL de
1024x1024 deixaria o arquivo salvo com vários MB. Ver
[INTEGRACAO_IMAGEM.md](INTEGRACAO_IMAGEM.md).

## Camadas de funções em `src/main.js`

O arquivo segue uma ordem consistente. Ao adicionar código, respeite o bloco correspondente.

| Bloco | Linhas aprox. | Conteúdo | Responsabilidade |
| --- | --- | --- | --- |
| 1. Catálogos | 1–217 | `races`, `classes`, `skillCatalog`, `appearanceGroups`, `personalityCatalog`, `equipmentCatalog`, `steps`, os três `*_LIMIT` | Dados estáticos do jogo |
| 2. Estado | 219–252 | `imageState`, `state` | Estado mutável |
| 3. Derivados | 254–275 | `$`, `selectedRace`, `selectedClass`, `selectedSkillCatalog`, `selectedSkills`, `equipmentOptions`, `selectedEquipment`, `selectedPersonality`, `characterJson` | Leitura derivada do estado |
| 4. Render | 277–503 | `render`, `focusSelector`, `captureFocus`, `restoreFocus`, `renderStepper`, `renderCurrentStep`, os seis `render*Step`, `renderPickGrid`, `renderPersonalityField`, `renderEquipmentField`, `renderPortraitBlock`, `renderCopyFeedback`, `renderUploadFeedback`, `renderNavButtons`, `renderSheet`, `sheetLabels`, `sheetStory`, `modifier`, `labelForAppearance` | HTML como template string |
| 5. Eventos | 505–522 | `bindEvents` | Único lugar que registra listeners |
| 6. Domínio e IO | 524–593 | `importJson`, `loadCharacter`, `toggleChoice`, `normalizeChoices`, `normalizeId`, `normalizeAppearance` | Regras e importação |
| 7. Retrato e PDF | 595–878 | `IMAGE_STYLE`, `listar`, `buildImagePrompt`, `copyPrompt`, `copyWithExecCommand`, `importImage`, `pdfPage`, `pdfLayout`, `generatePdf`, `buildPdfSheet`, `fitPdfSheet`, `fitsInBox`, `applyPrintTheme`, `loadImageElement` | Prompt, upload e PDF |
| 8. Utilitários e bootstrap | 880–899 | `escapeHtml`, `downloadJson` e a chamada final `render()` | Helpers e inicialização |

## Estrutura visual montada por `render()`

```
<main class="page">
  <header class="hero-head">  <- marca + botões REINICIAR / IMPORTAR JSON / SALVAR FICHA
                              <- e os dois <input type="file"> escondidos (JSON e imagem)
  <div class="workspace">     <- grid de 3 colunas
     <aside class="steps">    <- renderStepper(): os 6 passos clicáveis
     <section class="panel">  <- renderCurrentStep(): o passo ativo
     <aside class="sheet">    <- renderSheet(): a ficha, sempre visível e sempre atualizada
```

`renderCurrentStep()` é um despacho simples por `state.step`; o `else` final cai em
`renderStoryStep()`. A ficha lateral é também **a fonte do PDF**: `generatePdf()` rasteriza
exatamente esse `<aside class="sheet">`, então qualquer mudança nela aparece no PDF sem trabalho
extra.

## Contrato de eventos: atributos `data-*`

`bindEvents()` ([src/main.js:460](../src/main.js#L460)) é uma tabela de despacho baseada
inteiramente em atributos `data-*`. **Para tornar um elemento interativo basta emitir o
atributo certo no HTML — nenhum listener novo é preciso se você reutilizar um existente.**

| Atributo | Efeito ao clicar/digitar |
| --- | --- |
| `data-step="<id>"` | `state.step = id` (usado pelo stepper lateral **e** pelos botões Voltar/Próximo) |
| `data-race="<id>"` | `state.race = id` |
| `data-class="<id>"` | `state.class = id` **e esvazia `state.skills` e `state.equipment`** (ids são exclusivos por classe) |
| `data-skill="<id>"` | `toggleChoice('skills', id, SKILL_LIMIT)` — máximo de 2 |
| `data-personality="<id>"` | `toggleChoice('personality', id, PERSONALITY_LIMIT)` — máximo de 3 |
| `data-equipment="<id>"` | `toggleChoice('equipment', id, EQUIPMENT_LIMIT)` — máximo de 2 |
| `data-appearance-key` + `data-appearance-value` | `state.appearance[key] = value` |
| `data-field="<chave>"` | no evento `input`: `state[chave] = elemento.value` |
| `data-action="copy-prompt"` | `copyPrompt()` — monta o prompt e tenta copiá-lo |
| `data-action="upload-image"` | abre o `<input type="file" data-image-input>` escondido |
| `data-image-input` | no `change`: `importImage(event)` |
| `data-action="generate-pdf"` | `generatePdf()` — só habilitado com imagem carregada |
| `data-action="reset"` | `window.location.reload()` (não há reset de estado em memória) |
| `data-action="save"` | `downloadJson()` |
| `data-action="import"` | abre o `<input type="file" data-file-input>` escondido |
| `data-file-input` | no `change`: `importJson(event)` |

`data-field` só funciona para chaves **de primeiro nível e do tipo string** em `state`
(`name`, `player`, `age`, `gender`, `height`, `story`). Campos aninhados ou de lista precisam de
um atributo próprio, como `data-appearance-key` faz para `state.appearance` e `data-personality`
faz para `state.personality`.

## Regras de domínio implementadas

- **Três listas com limite, uma função só.** `toggleChoice(chave, id, limite)`
  ([src/main.js:511](../src/main.js#L511)) atende habilidades (2), personalidade (3) e
  equipamento (2): remove se já estiver na lista, adiciona enquanto couber. Não há mensagem de
  erro no limite — o clique simplesmente não faz nada.
- **Nada vem pré-selecionado.** O `state` inicial é inteiramente vazio e nenhum caminho do código
  escolhe por conta própria: o handler de `data-class` **não** preenche habilidades nem
  equipamentos, e `normalizeChoices()` **não** tem fallback (JSON sem itens válidos vira `[]`).
- **Trocar de classe invalida habilidades e equipamentos.** Os ids dos dois catálogos são
  exclusivos por classe.
- **Nada trava a cópia do prompt nem o PDF.** Não existe mais uma regra de "ficha completa":
  `buildImagePrompt()` simplesmente omite os campos vazios. O único pré-requisito do botão GERAR
  PDF é haver uma imagem carregada.
- **Os atributos vêm da classe, não da raça.** `renderSheet()` lê `selectedClass().attributes`;
  `race.traits` e `class.traits` são texto livre, nunca bônus, e não afetam número nenhum.
- **Modificador**: `modifier(score) = max(-1, score - 2)`, formatado com sinal
  ([src/main.js:450](../src/main.js#L450)). A escala esperada de atributo é 1–5.
- **Um conceito de equipamento só.** `equipmentCatalog[classeId]` é a única fonte: o passo 2 mostra
  as 9 opções como "o que essa classe costuma usar", o passo 5 deixa escolher até 2, e a ficha e o
  prompt exibem apenas as escolhidas. (Até a PR #9 havia dois conceitos concorrentes,
  `class.equipment` e um `state.equipment` de texto livre; ambos foram removidos.)

## Importação de JSON

`importJson()` → `FileReader` → `JSON.parse` → `loadCharacter(data)` → `render()`.

`loadCharacter()` ([src/main.js:496](../src/main.js#L496)) é tolerante: qualquer campo ausente
mantém o valor atual. Ele aceita tanto `"elfo"` quanto `{ "id": "elfo", ... }` graças a
`normalizeId()` e `normalizeChoices()`.

Tolerante não é crédulo: todo dado importado passa por um filtro de catálogo. `appearance` usa
`normalizeAppearance()` — chave fora de `appearanceGroups` é descartada e o valor vira texto.

> A ordem das atribuições importa. `state.class` precisa ser definido **antes** de
> `state.skills` e `state.equipment`, porque os dois são validados contra catálogos que dependem
> da classe atual. Se você reordenar as linhas de `loadCharacter()`, habilidades e equipamentos
> importados passam a ser validados contra o catálogo da classe errada.

## Armadilhas conhecidas

Documentadas para que agentes não as tratem como bugs novos nem as repitam:

1. ~~Foco perdido ao digitar~~ — **resolvido** por `captureFocus()`/`restoreFocus()`. Volta a
   acontecer se você criar um input que `focusSelector()` não reconheça.
2. ~~HTML não escapado na ficha~~ — **resolvido**. `renderSheet()` escapa todos os valores vindos
   do usuário. Textos de catálogo (nomes de raça, classe, habilidade, personalidade, equipamento)
   não são escapados de propósito: são dados do próprio código.
3. ~~`escapeHtml()` não escapa aspas simples~~ — **resolvido**. Agora trata `&`, `<`, `>`, `"` e
   `'`. Nenhum atributo do arquivo usa `'` como delimitador, mas o retorno passou a ser seguro
   caso algum passe a usar.
4. **REINICIAR recarrega a página**, o que também descarta o retrato carregado.
5. **A cópia do prompt falha em `file://` em vários navegadores.** `copyPrompt()` já tem três
   degraus de fallback e o prompt fica visível na tela; não "simplifique" para só
   `navigator.clipboard`.
6. **Não há validação de tamanho nem de tipo profundo no JSON importado** — um arquivo
   arbitrário pode, por exemplo, substituir `state.personality` por um array gigante.
7. **O upload de imagem não tem limite de tamanho** (decisão do usuário). Só o tipo MIME é
   checado, via `file.type.startsWith('image/')`. Um SVG sem dimensão intrínseca é barrado depois,
   já dentro de `generatePdf()`.
8. ~~Chave de `appearance` vinda de JSON chega crua ao `innerHTML`~~ — **resolvido em duas
   camadas**: `normalizeAppearance()` ([src/main.js:551](../src/main.js#L551)) só aceita as chaves
   de `appearanceGroups` na importação, e `renderSheet()` escapa `labelForAppearance(key)` no
   ponto de interpolação. Chave desconhecida é descartada em silêncio, como nos outros catálogos.
