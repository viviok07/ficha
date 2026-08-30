# Gerar o retrato com o ChatGPT (OpenAI)

Segundo caminho **opcional** do passo 5, ao lado do [Gemini](INTEGRACAO_GEMINI.md): em vez de
copiar o prompt e gerar a imagem por fora, o app chama a Images API da OpenAI e carrega o
retrato sozinho. Quem não tem chave continua com o fluxo manual inteiro — ver
[INTEGRACAO_IMAGEM.md](INTEGRACAO_IMAGEM.md).

> A chamada sai **do navegador**, sem backend. Isso expõe a chave a quem estiver usando a
> página. É uma decisão consciente do usuário para uso local; ver *Segurança* no fim.

## Parte 1 — Como pegar a chave (para o adulto)

1. Acesse <https://platform.openai.com/> e entre (ou crie a conta).
2. Configure uma forma de pagamento em **Billing**. Modelos de imagem consomem crédito; sem
   saldo, a geração falha com a mensagem de "sem crédito".
3. Vá em <https://platform.openai.com/api-keys> e clique em **Create new secret key**. Copie a
   chave (começa com `sk-`) — ela não é exibida de novo.
4. Alguns modelos de imagem exigem **verificação da organização**. Se a geração falhar dizendo
   que a chave não tem permissão, confira isso no painel.
5. Abra o `index.html`, vá até o passo 5 (História) e clique em **⚙ INTEGRAÇÕES**. O modal
   **não abre sozinho** — esse botão é o único jeito de abri-lo. No bloco **ChatGPT**:
   - **Chave da API da OpenAI** — a chave copiada.
   - **Modelo** — lista com os modelos de imagem conhecidos, mais *Outro*, que revela um campo
     de texto para digitar um nome novo (a OpenAI renomeia modelo e o app não se atualiza
     sozinho). O padrão é `gpt-image-2`.
   - **Tamanho** — `1024x1536` (retrato, padrão) ou `1024x1024` (quadrado). `1536x1024` ficou
     **de fora de propósito**: é paisagem, e o retrato é de corpo inteiro numa coluna estreita
     do PDF — mesma regra das proporções do Gemini.
   - **Qualidade** — `auto`, `low`, `medium` (padrão) ou `high`. O padrão não é `high` porque o
     data URL fica pesado e ainda precisa atravessar o `html2canvas` na geração do PDF.
6. Escolha **ChatGPT (OpenAI)** no `<select>` do topo do modal: é ele que decide qual plataforma
   o botão de gerar vai chamar. O bloco escolhido fica destacado.
7. **SALVAR E FECHAR** guarda tudo na sessão. **FECHAR** sai sem chave nenhuma e o app segue
   funcionando por completo.
8. No passo 5, clique em **✨ GERAR COM CHATGPT**. Sem chave, esse botão **abre o modal** em vez
   de chamar a API.

Ao atualizar a página, **tudo some** — e o modal continua só abrindo pelo botão.

## Parte 2 — Como a chamada é feita (para quem mexe no código)

Só duas funções de `src/main.js` são exclusivas desta API: `openaiRequestBody()` e
`openaiImageFromPayload()`, registradas em `AI_REQUESTS.openai`. O resto —
`generateAiImage()`, `aiErrorMessage()`, `scrubKey()` — é compartilhado com o Gemini.

### Requisição — Images API

```
POST https://api.openai.com/v1/images/generations
Authorization: Bearer <chave>
Content-Type: application/json

{
  "model": "gpt-image-2",
  "prompt": "<saída de buildImagePrompt(), sem alteração>",
  "size": "1024x1536",
  "quality": "medium",
  "n": 1
}
```

O prompt é exatamente o mesmo que o botão COPIAR PROMPT entrega — `buildImagePrompt()` não foi
tocado, e é o mesmo texto enviado ao Gemini. A chave viaja **só no header**, nunca no corpo.

`response_format` **não** é enviado: os modelos `gpt-image-*` devolvem base64 sempre, e mandar
esse campo é o que quebraria a chamada.

### Resposta

```json
{ "created": 1788000000,
  "data": [ { "b64_json": "<base64>" } ] }
```

`openaiImageFromPayload()` lê `data[0].b64_json` e monta `data:image/png;base64,<…>`. Esse data
URL vai para `imageState.dataUrl` — **o mesmo campo do upload manual e do Gemini**, então passo
6 e PDF não sabem a diferença. A imagem anterior é substituída sem perguntar, igual ao botão
TROCAR IMAGEM. Resposta sem `b64_json` → mensagem "não mandou nenhuma imagem".

### Modelos

A lista é um `<select>` justamente porque envelhece. `gpt-image-2` é o padrão, herdado da
integração anterior (PR #7). **Os nomes não foram reconferidos na documentação da OpenAI nesta
task** — se algum deixar de existir, a API responde 404 e a mensagem manda trocar o modelo; a
opção *Outro* aceita qualquer nome novo sem precisar mexer no código.

| Id | Observação |
| --- | --- |
| `gpt-image-2` (padrão) | herdado da integração anterior |
| `gpt-image-1` | |
| `gpt-image-1-mini` | mais rápido e barato |
| *Outro* | não é modelo: revela o campo de texto livre |

### Erros

O corpo de erro é `{"error": {"code": "…", "type": "…", "message": "…"}}`. Quando não há `code`,
`generateAiImage()` usa o `type`. A chave encontrada vai para `OPENAI_ERROR_CODES`, que aponta
para um texto de `AI_ERROR_TEXTS` — as mesmas frases usadas pelo Gemini, com `{plataforma}`
trocado por "ChatGPT". **Toda** mensagem termina apontando o caminho manual.

| Situação | Detecção | Mensagem |
| --- | --- | --- |
| Sem crédito / cota | `insufficient_quota`, `billing_hard_limit_reached`, `rate_limit_exceeded`, `quota_exceeded`; HTTP 429 | "sem crédito ou já bateu o limite de hoje… copie o prompt" |
| Chave recusada | `invalid_api_key`, `invalid_authentication`, `authentication_error`; HTTP 401 | "não aceitou essa chave. Confira em ⚙ INTEGRAÇÕES" |
| Sem permissão | `permission_denied`, `permission_error`, `unsupported_country_region_territory` | "não tem permissão para gerar imagens… confira a conta no painel da OpenAI" |
| Modelo inexistente | `model_not_found`; HTTP 404 | "o modelo escolhido não está disponível" |
| Bloqueio de conteúdo | `moderation_blocked`, `content_policy_violation`, `image_generation_user_error` | "regras de conteúdo… tente mudar a história" |
| Sem imagem | `no_image`, ou 200 sem `b64_json` | "respondeu, mas não mandou nenhuma imagem" |
| Instabilidade | `server_error`, `service_unavailable`; HTTP 5xx | "está fora do ar agora" |
| Rede / CORS / offline | o `fetch` **rejeita** (`TypeError`), sem status | "não consegui falar com o ChatGPT" |
| Outra | fallback | "não consegui gerar a imagem (mensagem da API)" |

O `.json()` é lido dentro de um `try` próprio porque um 500 pode devolver HTML.

### CORS

Verificado em 2026-08-30 com um preflight real: `OPTIONS` no endpoint devolve `200` com
`access-control-allow-origin: *`, `access-control-allow-methods` incluindo `POST` e
`access-control-allow-headers: content-type,authorization`. Como o `*` também vale para a origem
`null`, a chamada direta funciona **até com o `index.html` aberto por duplo clique** (`file://`).
Não é preciso proxy.

## Segurança

- A chave vive em `integrations.openai.apiKey`, só em memória. **Nada de `localStorage`**, nada
  em `characterJson()`, nada em `console`.
- `scrubKey()` apaga **as duas** chaves (Gemini e OpenAI) de qualquer mensagem de erro antes de
  exibi-la, caso a API as ecoe.
- O campo é `type="password"`; com o modal fechado a chave não aparece em lugar nenhum do DOM —
  e o modal agora nasce fechado.
- Ainda assim, **quem usa o computador consegue ver a chave**. Use uma chave sua, não publique
  esta página em servidor compartilhado e revogue a chave em
  <https://platform.openai.com/api-keys> se desconfiar de vazamento.
- Em produção de verdade, a chamada deveria sair de um backend. Este projeto não tem um, e o
  usuário aceitou o risco para uso local.
