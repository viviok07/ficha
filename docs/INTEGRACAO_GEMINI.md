# Gerar o retrato com o Gemini

Caminho **opcional** do passo 5: em vez de copiar o prompt e gerar a imagem por fora, o app
chama a API do Gemini e carrega o retrato sozinho. Quem não tem chave continua com o fluxo
manual inteiro — ver [INTEGRACAO_IMAGEM.md](INTEGRACAO_IMAGEM.md).

> A chamada sai **do navegador**, sem backend. Isso expõe a chave a quem estiver usando a
> página. É uma decisão consciente do usuário para uso local; ver *Segurança* no fim.

## Parte 1 — Como pegar a chave (para o adulto)

1. Acesse <https://aistudio.google.com/apikey> e entre com uma conta Google.
2. Clique em **Create API key** e escolha (ou crie) um projeto.
3. Copie a chave. Ela costuma começar com `AIza`.
4. Modelos de imagem podem exigir **faturamento ativo** no projeto. Se a geração falhar com
   "sem crédito", confira o billing em <https://aistudio.google.com/> antes de tentar de novo.
5. Abra o `index.html`, vá até o passo 5 (História) e clique em **⚙ INTEGRAÇÕES**. O modal
   **não abre sozinho** — esse botão é o único jeito de abri-lo. No bloco **Gemini**:
   - **Chave da API do Gemini** — a chave copiada.
   - **Modelo** — lista com os modelos de imagem conhecidos, mais *Outro*, que revela um campo
     de texto para digitar um nome novo (útil quando a Google renomeia um modelo).
   - **Proporção** — só verticais (`3:4`, `2:3`, `4:5`, `9:16`), porque o retrato é de corpo
     inteiro e ocupa uma coluna estreita no PDF.
   - **Resolução** — `1K` ou `0.5K`. Não há `2K`/`4K` de propósito: o data URL ficaria enorme e
     atravessaria o `html2canvas` na geração do PDF.
6. Escolha **Gemini (Google)** no `<select>` do topo do modal: é ele que decide qual plataforma
   o botão de gerar vai chamar. O bloco escolhido fica destacado.
7. **SALVAR E FECHAR** guarda tudo na sessão. **FECHAR** sai sem chave nenhuma e o app segue
   funcionando por completo.
8. No passo 5, clique em **✨ GERAR COM GEMINI**. Sem chave, esse botão **abre o modal** em vez
   de chamar a API.

Ao atualizar a página, **tudo some** — e o modal continua só abrindo pelo botão.

## Parte 2 — Como a chamada é feita (para quem mexe no código)

Tudo vive em `src/main.js`: `geminiRequestBody()` e `geminiImageFromPayload()` são exclusivas do
Gemini e estão registradas em `AI_REQUESTS.gemini`; `aiErrorMessage()` e `generateAiImage()` são
compartilhadas com a OpenAI. Trocar de API um dia significa mexer só nas duas primeiras.

### Requisição — Interactions API

```
POST https://generativelanguage.googleapis.com/v1beta/interactions
x-goog-api-key: <chave>
Content-Type: application/json

{
  "model": "gemini-3.1-flash-image",
  "input": [{ "type": "text", "text": "<saída de buildImagePrompt(), sem alteração>" }],
  "response_format": {
    "type": "image", "mime_type": "image/jpeg",
    "aspect_ratio": "3:4", "image_size": "1K"
  }
}
```

O prompt é exatamente o mesmo que o botão COPIAR PROMPT entrega — `buildImagePrompt()` não foi
tocado. A chave viaja **só no header**, nunca no corpo.

**`mime_type` só aceita `image/jpeg`.** Está na constante `GEMINI_IMAGE_MIME`, ao lado de
`GEMINI_ASPECTS`/`GEMINI_SIZES`. Pedir `image/png` faz a API responder com erro
`The value 'image/png' is not supported for 'response_format.mime_type'. Supported values:
'image/jpeg'.`, que o usuário vê na tela pelo fallback de `geminiErrorMessage()`. Já aconteceu
uma vez; não tente PNG de novo sem conferir a documentação da API.

### Resposta

```json
{ "id": "int_123",
  "steps": [
    { "type": "model_output", "status": "done",
      "content": [ { "type": "text", "text": "…" },
                   { "type": "image", "mime_type": "image/jpeg", "data": "<base64>" } ] } ] }
```

`geminiImageFromPayload()` procura o passo `model_output`, pega o primeiro item
`type: "image"` com `data` e monta `` `data:${mime_type};base64,${data}` ``. Esse data URL vai
para `imageState.dataUrl` — **o mesmo campo do upload manual**, então passo 6 e PDF não sabem a
diferença. A imagem anterior é substituída sem perguntar, igual ao botão TROCAR IMAGEM.

O `mime_type` usado no data URL é o que a **resposta** trouxer; `GEMINI_IMAGE_MIME` só entra
como fallback quando o item vem sem esse campo.

Nenhum item de imagem na resposta → mensagem "não mandou nenhuma imagem".

### JPEG não tem fundo transparente

Consequência direta do parágrafo acima: como a API só devolve JPEG, e JPEG não tem canal alfa,
**o retrato gerado pelo Gemini sempre vem com algum fundo sólido**. O bloco `IMAGE_STYLE` do
prompt ainda pede "fundo simples ou transparente" — a parte "transparente" é inalcançável por
este caminho (continua válida para o upload manual, que aceita PNG/WEBP com alfa).

Isso **não quebra nada**: o passo 6 mostra o retrato num `<img>` de `.generated-image`, e o PDF
usa `.pdf-portrait` com `background-size: contain` sobre `background-color: #fff` — nos dois
casos um fundo sólido apenas aparece, sem cortar nem esticar a imagem. Além disso o PDF já
achatava qualquer transparência: o `html2canvas` roda com `backgroundColor: '#ffffff'` e o
`pdf.addImage()` recebe um `canvas.toDataURL('image/jpeg', 0.95)`.

Fica registrado para o usuário decidir depois se quer ajustar o `IMAGE_STYLE` (por exemplo,
trocar "transparente" por uma cor de fundo pedida explicitamente). **Não mude esse texto por
conta própria**: ele foi escrito palavra por palavra pelo usuário.

### Modelos

Nomes conferidos na documentação oficial em 2026-08-30. O campo é um `<select>` justamente
porque essa lista envelhece:

| Id | Apelido |
| --- | --- |
| `gemini-3.1-flash-image` (padrão) | Nano Banana 2 — generalista |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite — mais rápido e barato, só 1K |
| `gemini-3-pro-image` | Nano Banana Pro — mais caro |
| `gemini-2.5-flash-image` | Nano Banana — legado |
| *Outro* | não é modelo: revela o campo de texto livre |

### Erros

O corpo de erro é `{"error": {"code": "<snake_case>", "message": "…"}}`, com o status HTTP
definido. O `code` é a chave do mapa `GEMINI_ERROR_CODES`, que aponta para um texto de
`AI_ERROR_TEXTS` com `{plataforma}` interpolado — as frases são as mesmas para as duas APIs. O
status HTTP é a rede de segurança para códigos que a Google introduza depois. **Toda** mensagem termina apontando o caminho manual.

| Situação | Detecção | Mensagem |
| --- | --- | --- |
| Sem crédito / cota | 429 `quota_exceeded`, `rate_limit_exceeded`, `too_many_requests`; 400 `failed_precondition` | "sem crédito ou já bateu o limite de hoje… copie o prompt" |
| Chave recusada | 401 `authentication` | "não aceitou essa chave. Confira em ⚙ INTEGRAÇÕES" |
| Sem permissão | 403 `permission_denied` | "não tem permissão para gerar imagens" |
| Modelo inexistente | 404 `model_not_found`, `not_found` | "o modelo escolhido não está disponível" |
| Bloqueio de conteúdo | `safety`, `image_safety`, `prohibited_content`, `image_prohibited_content`, `recitation`, `image_recitation`, `image_other`, `content_blocked` | "regras de conteúdo… tente mudar a história" |
| Sem imagem | `no_image`, ou 200 sem item de imagem | "respondeu, mas não mandou nenhuma imagem" |
| Instabilidade | 500/503/504 | "está fora do ar agora" |
| Rede / CORS / offline | o `fetch` **rejeita** (`TypeError`), sem status | "não consegui falar com o Gemini" |
| Outra | fallback | "não consegui gerar a imagem (mensagem da API)" |

`fetch` só rejeita por rede; erro de API sempre chega como resposta com status. O `.json()` é
lido dentro de um `try` próprio porque um 500 pode devolver HTML.

### CORS

Verificado em 2026-08-30 com um preflight real: `OPTIONS` no endpoint devolve `200` com
`access-control-allow-origin` ecoando a origem (inclusive `null`, que é o caso de `file://`) e
`access-control-allow-headers: content-type,x-goog-api-key`. Ou seja, a chamada direta do
navegador funciona **até com o `index.html` aberto por duplo clique**. Não é preciso proxy.

## Segurança

- A chave vive em `integrations.gemini.apiKey`, só em memória. **Nada de `localStorage`**, nada em
  `characterJson()`, nada em `console`.
- `scrubKey()` apaga a chave de qualquer mensagem de erro antes de exibi-la, caso a API a ecoe.
- O campo é `type="password"`; com o modal fechado a chave não aparece em lugar nenhum do DOM.
- Ainda assim, **quem usa o computador consegue ver a chave**. Use uma chave sua, não publique
  esta página em servidor compartilhado e revogue a chave no AI Studio se desconfiar de
  vazamento.
- Em produção de verdade, a chamada deveria sair de um backend. Este projeto não tem um, e o
  usuário aceitou o risco para uso local.
