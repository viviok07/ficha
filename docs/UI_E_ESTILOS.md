# UI e estilos

Todo o CSS está em [src/style.css](../src/style.css) (~625 linhas), escrito à mão, sem
pré-processador, sem utilitários e sem `!important`. As classes são semânticas e curtas, e o
HTML que as usa vive nas template strings de `src/main.js`.

## Identidade visual

Pergaminho de RPG infantojuvenil: fundo de papel envelhecido, títulos em serifa capitular
(Cinzel), texto em Lora, roxo e dourado como cores de destaque. As fontes vêm de um `@import` do
Google Fonts na primeira linha do arquivo — mantenha os fallbacks (`Cinzel, serif` /
`Lora, Georgia, serif`) porque a página precisa funcionar offline.

## Tokens — [src/style.css:3](../src/style.css#L3)

```css
--ink: #170d09;         /* texto principal          */
--purple: #482181;      /* destaque primário        */
--purple-dark: #301158;
--gold: #b8863b;
--paper: #fff6e7;       /* fundo dos painéis        */
--paper-deep: #f1dcc0;
--line: #d9c5a5;        /* bordas                   */
--brown: #5b2c17;
```

Use os tokens em vez de hexadecimais novos sempre que possível. O arquivo ainda contém vários
hexadecimais literais em sombras e gradientes — é o estilo existente, não um erro a corrigir em
massa.

## Layout

```
.page      grid 2 linhas (cabeçalho, conteúdo), padding 20px
.hero-head flex: marca à esquerda, .actions à direita
.workspace grid 3 colunas: steps (0.16fr) | painel (1.08fr) | ficha (0.92fr)
```

Dois pontos de quebra, nesta ordem:

1. `@media (max-width: 980px)` ([src/style.css:537](../src/style.css#L537)) — empilha
   `.hero-head` e `.workspace` em uma coluna, transforma `.steps` em uma faixa horizontal de 6
   colunas e colapsa os grids de cards (`.race-grid`, `.class-grid`, `.skill-grid`,
   `.trait-grid`, `.equipment-grid`), `.row`, `.badges`, `.cols` e `.attrs` para uma coluna.
   **Se você adicionar um grid novo, inclua-o nessa lista.**
2. `@media (max-width: 650px)` ([src/style.css:572](../src/style.css#L572)) — **toca só o
   stepper**: a faixa de 6 colunas vira uma grade de 3 x 2 com número e título lado a lado e o
   subtítulo (`.step p`) escondido. Motivo: com 6 colunas a célula mede `(largura - 110) / 6`,
   então o círculo de 34px do número transborda abaixo de 434px e o alvo de toque cai abaixo de
   44px em telas de 374px ou menos. Com 3 colunas a célula é `(largura - 60) / 3` — 100px num
   celular de 360px. **Não acrescente aqui regras que não sejam do stepper**: o combinado é que
   nada mude de 651px para cima.

## Classes por área

| Classe | Onde é gerada | Papel |
| --- | --- | --- |
| `.hero-head`, `.brand`, `.sigil`, `.twinkle`, `.actions` | `render()` | Cabeçalho |
| `.primary`, `.secondary`, `.ghost`, `.next` | vários | Variantes de botão |
| `.ghost-link` | `render()` | O `<a>` GUIA DO AVENTUREIRO: soma-se a `.ghost` e dá ao link a caixa de um botão (`inline-flex`, `line-height: 1`, sem sublinhado) |
| `.steps`, `.step`, `.step.active` | `renderStepper()` | Navegação lateral |
| `.panel`, `.current-panel` | cada `render*Step()` | Cartão do passo atual |
| `.option-grid` + `.race-grid` / `.class-grid` / `.skill-grid` / `.trait-grid` / `.equipment-grid` | passos 1–3 e 5 | Grids de escolha (3, 2, 2, 2 e 2 colunas) |
| `.choice-card`, `.choice-art`, `.p0`–`.p6`, `.skill-card`, `.pick-card` | passos 1–3 e 5 | Card selecionável (`.pick-card` é o mais baixo, usado nos multi-selects do passo 5) |
| `.appearance-list`, `.group`, `.opts`, `.pill-choice` | passo 4 | Grupos de aparência |
| `.field` | passo 5 | `<label>` (ou `<div>`) com input, textarea ou uma grade de escolha |
| `.hint` | passo 2 e passo 6 | Observação em itálico, discreta |
| `.info.empty` | passos 1–3 | Texto de espera quando nada foi escolhido |
| `.row.details` | `renderSheet()` | Linha de 3 colunas com idade, gênero e altura |
| `.portrait-tools`, `.portrait-actions`, `.copy-status`, `.prompt-box` | passo 5 | Bloco do retrato: botões, aviso de cópia e o prompt em textarea |
| `.image-error`, `.generated-image` | passos 5 e 6 | Erro legível e a moldura do retrato |
| `.sheet`, `.ribbon`, `.badges`, `.attrs`, `.cols`, `.chips`, `.center` | `renderSheet()` | Ficha lateral |
| `.info` | passos 1–3 | Bloco de detalhe abaixo do grid |
| `.panel-actions` | `renderNavButtons()` | Botões Voltar / Próximo |
| `.file-input` | `render()` | Os dois `<input type="file">` escondidos, de JSON e de imagem (`display: none`) |
| `.pdf-stage`, `.pdf-sheet`, `.pdf-body`, `.pdf-row`, `.pdf-main`, `.pdf-portrait`, `.pdf-story` | `buildPdfSheet()` | **Só no PDF.** Layout de página inteira montado fora da tela; nenhum elemento visível usa essas classes |

## Padrões de marcação a seguir

- **Seleção** é sinalizada pela classe `selected` em `.choice-card` ou `.pill-choice` (contorno
  roxo), somada a um `<em>✓</em>` dentro dos cards. Ao criar um controle selecionável novo,
  reutilize `.pill-choice` — ela já cobre estado normal e selecionado.
- **Cards de escolha** seguem sempre a mesma ordem interna:
  `<span class="choice-art">ícone</span><b>nome</b><small>descrição</small><em>✓</em>`.
  O `<small>` é opcional (a grade de raças não usa).
- **Campos de formulário** sempre dentro de `<label class="field">Rótulo<input …/></label>`.
- **Ação que só abre uma página** é um `<a class="ghost ghost-link" target="_blank" rel="noopener">`,
  não um `<button>` com handler: continua funcionando se o JS falhar e não exige nada em
  `bindEvents()`. Os ícones do cabeçalho (`↻`, `⇪`, `❖`, `▣`) são glifos monocromáticos, não emojis.
- **Ícones são emojis literais** no JS, nunca imagens ou fontes de ícone.
- **Títulos de passo** usam o formato `✦ N. TÍTULO ✦` em maiúsculas.
- A ficha usa `<h3>` em maiúsculas como separador de seção e `<p>` para o conteúdo.

## Fora deste arquivo: `guia.html`

[guia.html](../guia.html) tem **CSS próprio embutido**, com tokens e identidade visual
diferentes (papel claro, `Baloo 2`/`Cinzel`/`Lora`, suporte a tema escuro por
`prefers-color-scheme`) e um bloco `@media print`. Nada em
`src/style.css` o alcança, e mudanças aqui não o afetam — nem o contrário.

**Impressão do guia:** não há nenhuma quebra de página automática — a quebra é feita à mão,
colando `<div class="pagebreak"></div>` no ponto onde a folha deve virar. O `@media print`
mantém só `break-inside: avoid`, que impede um bloco de ser partido ao meio. Ressalva: as
listas por classe (habilidades e equipamento) são geradas por JS, então lá a tag não pode ser
escrita no HTML — use a constante `NOVA_FOLHA` (`{ skills: [], gear: [] }`, ids das classes que
devem abrir folha nova).

## Ao adicionar estilos

1. Procure primeiro uma classe existente que sirva — o arquivo é pequeno e a repetição visual é
   proposital.
2. Acrescente as regras novas **no fim do bloco temático correspondente**, não no fim do arquivo
   (as seções de retrato e imagem já estão depois da media query, o que é uma exceção
   histórica). O bloco `.pdf-*`, no fim do arquivo, é do PDF — não mexa nele para ajustar a tela.
3. Se criar um grid, verifique o comportamento abaixo de 980px.
4. Mantenha alvos de toque com pelo menos 44px de altura (`.pill-choice` já define isso) — o
   público-alvo inclui crianças em tablets.
