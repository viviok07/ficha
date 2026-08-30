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

Monta um texto em português, **omitindo todo campo vazio** — a ficha não precisa estar completa
para copiar o prompt. Os blocos, em ordem:

1. Estilo (sempre presente): ilustração vertical, aquarela, storybook infantojuvenil.
2. `Personagem:` nome, raça, classe, idade, gênero, altura informada.
3. `Aparência:` percorre `appearanceGroups` e monta `título: valor` só para os grupos preenchidos.
4. `Personalidade:` nomes das opções escolhidas no catálogo.
5. `Talentos que aparecem na pose:` as habilidades escolhidas.
6. `Equipamentos obrigatórios escolhidos pelo jogador:` com a instrução de não substituir por
   equipamentos padrão de raça ou classe.
7. `História e intenção dramática:`.
8. Composição e negativos.
9. O JSON completo do personagem, para fidelidade.

Detalhes deliberados:

- O bloco de aparência é **genérico**: um grupo novo em `appearanceGroups` entra no prompt
  sozinho, sem editar esta função (antes as chaves eram escritas à mão).
- Os dois dados de altura continuam separados: `appearance.height` sai como "estatura" (o título
  do grupo) e `state.height` como "altura informada".
- O texto é todo em português.

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
1. pdfLoading = true; render()
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
- Fontes: o `@import` do Google Fonts não carrega offline, então o PDF sai com as fontes de
  fallback (`serif`). O layout não muda.
- O `.sheet::before` (o dragão) é um pseudo-elemento; html2canvas o desenha, mas é o primeiro
  candidato a investigar se o topo da ficha sair estranho.
