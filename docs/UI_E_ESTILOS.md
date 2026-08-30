# UI e estilos

Todo o CSS está em [src/style.css](../src/style.css) (~655 linhas), escrito à mão, sem
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

Ponto de quebra único: `@media (max-width: 980px)` ([src/style.css:556](../src/style.css#L556)),
que empilha `.hero-head` e `.workspace` em uma coluna, transforma `.steps` em uma faixa
horizontal de 5 colunas e colapsa os grids de cards, `.row`, `.badges`, `.cols` e `.attrs` para
uma coluna. **Se você adicionar um grid novo, avalie incluí-lo nessa lista.**

## Classes por área

| Classe | Onde é gerada | Papel |
| --- | --- | --- |
| `.integration-gate` / `.integration-card` | `renderIntegrationGate()` | Overlay fixo de configuração da OpenAI |
| `.hero-head`, `.brand`, `.sigil`, `.twinkle`, `.actions` | `render()` | Cabeçalho |
| `.primary`, `.secondary`, `.ghost`, `.next` | vários | Variantes de botão |
| `.steps`, `.step`, `.step.active` | `renderStepper()` | Navegação lateral |
| `.panel`, `.current-panel` | cada `render*Step()` | Cartão do passo atual |
| `.option-grid` + `.race-grid` / `.class-grid` / `.skill-grid` | passos 1–3 | Grids de escolha (3, 2 e 2 colunas) |
| `.choice-card`, `.choice-art`, `.p0`–`.p6`, `.skill-card` | passos 1–3 | Card selecionável |
| `.appearance-list`, `.group`, `.opts`, `.pill-choice` | passo 4 | Grupos de aparência |
| `.field` | passo 5 e gate | `<label>` (ou `<div>`) com input/textarea/select |
| `.traits`, `.trait`, `.trait-remove`, `.traits-empty` | `renderPersonalityField()` | Badges de personalidade e o "×" que remove cada uma |
| `.info.empty` | passos 1–3 | Texto de espera quando nada foi escolhido |
| `.row.details` | `renderSheet()` | Linha de 3 colunas com idade, gênero e altura |
| `.image-generator`, `.loader`, `.image-error`, `.generated-image` | passo 5 | Bloco de geração de imagem |
| `.sheet`, `.ribbon`, `.badges`, `.attrs`, `.cols`, `.chips`, `.center` | `renderSheet()` | Ficha lateral |
| `.info` | passos 1–3 | Bloco de detalhe abaixo do grid |
| `.panel-actions` | `renderNavButtons()` | Botões Voltar / Próximo |
| `.file-input` | `render()` | `<input type="file">` escondido (`display: none`) |

## Padrões de marcação a seguir

- **Seleção** é sinalizada pela classe `selected` em `.choice-card` ou `.pill-choice` (contorno
  roxo), somada a um `<em>✓</em>` dentro dos cards. Ao criar um controle selecionável novo,
  reutilize `.pill-choice` — ela já cobre estado normal e selecionado.
- **Cards de escolha** seguem sempre a mesma ordem interna:
  `<span class="choice-art">ícone</span><b>nome</b><small>descrição</small><em>✓</em>`.
  O `<small>` é opcional (a grade de raças não usa).
- **Campos de formulário** sempre dentro de `<label class="field">Rótulo<input …/></label>`.
- **Ícones são emojis literais** no JS, nunca imagens ou fontes de ícone.
- **Títulos de passo** usam o formato `✦ N. TÍTULO ✦` em maiúsculas.
- A ficha usa `<h3>` em maiúsculas como separador de seção e `<p>` para o conteúdo.

## Ao adicionar estilos

1. Procure primeiro uma classe existente que sirva — o arquivo é pequeno e a repetição visual é
   proposital.
2. Acrescente as regras novas **no fim do bloco temático correspondente**, não no fim do arquivo
   (as seções de integração e imagem já estão depois da media query, o que é uma exceção
   histórica).
3. Se criar um grid, verifique o comportamento abaixo de 980px.
4. Mantenha alvos de toque com pelo menos 44px de altura (`.pill-choice` já define isso) — o
   público-alvo inclui crianças em tablets.
