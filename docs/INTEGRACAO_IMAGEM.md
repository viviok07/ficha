# Retrato do personagem: prompt + upload

Este documento explica como o retrato entra na ficha e como o PDF é montado. **Não há mais
chamada de API.** A geração da imagem acontece fora da aplicação, na ferramenta de IA que o
usuário preferir.

> Histórico: até a PR #9 existia uma integração direta com a API de imagens da OpenAI, com um
> overlay pedindo a chave. Ela foi removida por inteiro — chave, `fetch`, gate e loader.

## Fluxo completo

```
Passo 5 (História)
1. COPIAR PROMPT      -> copyPrompt(): buildImagePrompt() + cadeia de cópia
2. textarea readonly  -> o prompt fica visível na tela, copiado ou não
3. CARREGAR IMAGEM    -> importImage(): valida o tipo e lê como data URL

Passo 6 (Visão geral)
4. imageState.dataUrl -> <figure class="generated-image"> com o retrato
5. GERAR PDF          -> generatePdf(): html2canvas na ficha + jsPDF
```

## `imageState` — tudo em memória, nada persistido

| Campo | Papel |
| --- | --- |
| `dataUrl` | O retrato carregado, como data URL. **Não entra em `characterJson()`.** |
| `uploadError` | Mensagem quando o arquivo não é imagem ou não pôde ser lido |
| `prompt` | Último prompt gerado; alimenta o `<textarea class="prompt-box">` |
| `copyStatus` | `'copiado'` ou `'manual'` — decide a mensagem verde ou âmbar |
| `pdfLoading` / `pdfError` | Estado do botão GERAR PDF |

**A imagem vive só na sessão.** Salvar a ficha em JSON não guarda o retrato, e reimportar uma
ficha exige carregar a imagem de novo. Isso é decisão de produto: um data URL de 1024x1024 deixa
o JSON com vários MB. O passo 6 avisa isso em uma linha.

## `buildImagePrompt()`

Monta um **texto corrido em português**, **omitindo todo campo vazio** — a ficha não precisa
estar completa para copiar o prompt. Não há JSON anexado e não há rótulo campo a campo: a única
parte rotulada é o bloco final `Informações adicionais:`. Os parágrafos, em ordem:

1. Abertura (sempre presente): "Crie uma ilustração de personagem de RPG de fantasia."
2. Estilo (sempre presente): a constante `IMAGE_STYLE`, com as definições aprovadas pelo usuário
   (chibi/SD, fantasy storybook, clean linework, isolated character / sticker-like etc.).
3. Idade, gênero e altura, quando preenchidos.
4. Raça, classe e equipamento **na mesma frase**, com o equipamento como algo que o personagem
   "está usando" — sem linguagem de obrigatoriedade.
5. Aparência: percorre `appearanceGroups` e emite `título valor` para **todos** os preenchidos.
6. Personalidade, mais a instrução de que a expressão do rosto seja coerente com esses traços.
7. Enquadramento e negativos (sempre presente): personagem inteiro, centralizado, fundo simples.
8. `Informações adicionais:` com o conteúdo do campo História, só quando houver texto.

Detalhes deliberados:

- **Nada de JSON.** O `JSON.stringify(characterJson())` saiu do prompt: é só prosa.
- **Nem todo campo entra.** Ficam de fora `player`, o **nome** do personagem e as **habilidades**.
- `listar()` junta enumerações como "a, b e c" e devolve string vazia para lista vazia — é o que
  permite descartar a frase inteira em vez de emitir texto truncado numa ficha pela metade.
- O bloco de aparência é **genérico**: um grupo novo em `appearanceGroups` entra no prompt
  sozinho, sem editar esta função (antes as chaves eram escritas à mão).
- Os dois dados de altura continuam separados: `appearance.height` sai como "estatura" (o título
  do grupo) e `state.height` na frase de idade/gênero/altura.
- Idade e altura são digitadas com a unidade ("12 anos", "1,45 m"), então o prompt não acrescenta.
- O texto é português; só os termos técnicos de estilo ficam em inglês.

## Cópia para a área de transferência — `copyPrompt()`

A página costuma ser aberta por `file://`, onde `navigator.clipboard` é bloqueado em vários
navegadores. Por isso a cópia tem três degraus, nesta ordem:

1. `navigator.clipboard.writeText()`, só quando `window.isSecureContext` é verdadeiro;
2. `document.execCommand('copy')` em um `<textarea>` temporário fora da tela;
3. falhando os dois, o `<textarea class="prompt-box">` visível é selecionado e a mensagem manda
   o usuário usar Ctrl+C / ⌘+C.

O prompt aparece na tela nos três casos — serve de conferência e de plano B.

`renderCopyFeedback()` remonta o prompt a cada render e compara com `imageState.prompt`. Se a
ficha mudou depois da cópia, o `<textarea>` já mostra a versão **atual** (é ele que o usuário
seleciona no fallback manual) e o aviso troca para "a ficha mudou, copie de novo". Sem isso, o
plano B entregaria um prompt velho.

## Upload — `importImage()`

Um único `<input type="file" accept="image/*" data-image-input>` fica escondido no cabeçalho;
os botões dos passos 5 e 6 disparam o mesmo input. A validação é por `file.type`: qualquer coisa
que não comece com `image/` vira mensagem de erro. Não há limite de tamanho. O `value` do input é
zerado a cada escolha, para que recarregar o **mesmo** arquivo continue disparando o `change`.

## PDF — `generatePdf()`

Depende das bibliotecas locais em [vendor/](../vendor/README.md) (`window.html2canvas` e
`window.jspdf.jsPDF`). Se algum global faltar, o botão devolve um erro legível em vez de quebrar.

```
1. pdfLoading = true; render()  <- ficha em P&B só no clone (applyPrintTheme)
2. requery de .sheet  <- obrigatório: o render acima descartou o nó anterior
3. html2canvas(.sheet, { scale: 2, height: scrollHeight, onclone: overflow visible })
4. loadImageElement(dataUrl) + toJpegDataUrl()  <- reencoda qualquer formato em JPEG
5. jsPDF A4 retrato, mm
6. placeInQuadrant(ficha, coluna 0) e placeInQuadrant(retrato, coluna 1)
7. pdf.save('<nome>.pdf')
```

### O layout da página

A4 retrato (210 x 297 mm), margem de 8 mm:

```
+---------------------------+---------------------------+
|  ficha (html2canvas)      |  retrato carregado        |   <- ambos começam em y = 8 mm
|  metade da largura        |  metade da largura        |
|  metade da altura         |  mesma altura da ficha    |
+---------------------------+---------------------------+
|                                                       |
|            metade de baixo em branco                  |   <- proposital
|                                                       |
+-------------------------------------------------------+
```

`placeInQuadrant()` encaixa cada imagem no seu quadrante preservando a proporção
(`Math.min` das escalas), centraliza na horizontal e alinha as duas pelo topo. A metade inferior
ficar vazia é o pedido original do usuário, não um bug.

### Armadilhas do html2canvas

- `.sheet` tem `overflow: auto`; sem o `onclone` que solta o overflow e a altura, uma ficha longa
  sairia cortada.
- **A ficha sai em preto e branco, o retrato não.** `applyPrintTheme()` injeta um `<style>` no
  `clonedDocument` do `onclone`: fundo branco, texto preto e a faixa "FICHA DO AVENTUREIRO" sem o
  gradiente escuro, para gastar menos tinta. Como vive só no clone, **a tela nunca muda**. Não há
  `filter: grayscale`: emoji é fonte colorida e ignora `color`, então os ícones continuam
  coloridos de propósito. O retrato é adicionado direto de `imageState.dataUrl` e não passa por
  aqui — ele sempre sai colorido.
- Fontes: o `@import` do Google Fonts não carrega offline, então o PDF sai com as fontes de
  fallback (`serif`). O layout não muda.
- O `.sheet::before` (o dragão) é um pseudo-elemento; html2canvas o desenha, mas é o primeiro
  candidato a investigar se o topo da ficha sair estranho.
