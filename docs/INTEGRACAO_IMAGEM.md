# Integração de imagem por IA (visão de desenvolvedor)

Este documento explica **como o recurso funciona por dentro**. Para o passo a passo de usuário
(criar conta, gerar chave), veja [INTEGRACAO_OPENAI_IMAGENS.md](../INTEGRACAO_OPENAI_IMAGENS.md).

## Fluxo completo

```
1. Página carrega            -> integration.ready === false
2. renderIntegrationGate()   -> overlay fixo cobrindo a tela (.integration-gate)
3. Usuário preenche campos   -> data-integration muta o objeto `integration` a cada tecla
4. Clique em OK              -> confirmIntegration(): exige apiKey não vazia; ready = true; render()
5. Aba História -> GERAR IMAGEM
6. generateCharacterImage()  -> imageState.loading = true; render()  (mostra o .loader)
7. buildImagePrompt()        -> texto em pt-BR + JSON completo do personagem
8. fetch POST api.openai.com/v1/images/generations
9. Resposta                  -> data[0].b64_json  ->  imageState.dataUrl = 'data:image/png;base64,...'
10. finally                  -> loading = false; render()  (mostra <figure> ou .image-error)
```

## `integration` — configuração da sessão

| Campo | Padrão | Origem |
| --- | --- | --- |
| `ready` | `false` | `confirmIntegration()` |
| `apiKey` | `''` | input `type="password"` do gate |
| `model` | `'gpt-image-2'` | input de texto livre |
| `size` | `'1024x1024'` | select: `1024x1024`, `1024x1536`, `1536x1024` |
| `quality` | `'high'` | select: `high`, `medium`, `low`, `auto` |

O gate é o **único** bloqueio da aplicação: enquanto `ready` for `false`, o overlay cobre a tela
(mas o restante da UI já está renderizado atrás dele). Ele nunca reaparece na mesma sessão — só
recarregando a página.

**A chave nunca é persistida.** Não a grave em `localStorage`, `sessionStorage`, cookie, URL, log
ou em qualquer requisição que não seja para `api.openai.com`.

## `imageState` — máquina de estados da geração

`renderImageResult()` ([src/main.js:292](../src/main.js#L292)) despacha nesta ordem de prioridade:

| Condição | Render |
| --- | --- |
| `loading` | `<div class="loader">` com spinner e "Preparando ilustração mágica..." |
| `error` | `<p class="image-error">` com a mensagem (escapada) |
| `dataUrl` vazio | nada |
| caso contrário | `<figure class="generated-image">` com a imagem e legenda |

O botão GERAR IMAGEM fica `disabled` enquanto `loading` for `true`, o que impede requisições
concorrentes. `imageState.prompt` guarda o último prompt enviado — hoje só para depuração, não é
exibido.

## `buildImagePrompt()` — [src/main.js:404](../src/main.js#L404)

Monta um prompt em português com quatro blocos:

1. **Estilo**: ilustração vertical de RPG, fantasia clássica, aquarela, storybook infantojuvenil.
2. **Dados do personagem**: nome, raça, classe, cada chave de aparência, personalidade,
   equipamento, outras características, história.
3. **Composição e negativos**: pose de três quartos, corpo inteiro, luz dourada; evitar texto,
   assinatura, logotipos, marca d'água, moldura, fotorrealismo e estilo sombrio adulto.
4. **JSON do personagem** (`JSON.stringify(data, null, 2)`) anexado para fidelidade.

Decisões deliberadas que **não devem ser "corrigidas" sem pedido explícito**:

- O prompt usa `state.equipment` (a string editável da aba História) e instrui explicitamente
  *"Não substitua por equipamentos padrão de raça ou classe"*. `class.equipment` fica de fora.
- As chaves de aparência são listadas **uma a uma, à mão**. Grupos novos em `appearanceGroups`
  não entram no prompt sozinhos — é preciso editar esta função.
- O texto é todo em português; o modelo lida bem com isso e mantém a coerência com a UI.

## A chamada HTTP — [src/main.js:421](../src/main.js#L421)

```js
POST https://api.openai.com/v1/images/generations
Authorization: Bearer <apiKey>
Content-Type: application/json

{ model, prompt, size, quality, n: 1 }
```

Tratamento de erro em duas etapas:

1. `!response.ok` → lança `payload.error?.message` ou a mensagem genérica
   "A API recusou a solicitação de imagem.";
2. resposta ok mas sem `data[0].b64_json` → lança "A resposta da API não trouxe uma imagem em
   base64.".

Qualquer exceção vira `imageState.error = 'Não foi possível gerar a imagem: <mensagem>'`, e o
`finally` sempre desliga o loader. Falhas comuns em campo: chave inválida (401), modelo sem
acesso na organização (403/404), CORS/rede, e organização não verificada para modelos GPT Image.

A resposta é sempre tratada como **base64**; a API também pode devolver `url` em alguns modelos —
se for dar suporte a isso, trate `payload.data[0].url` como alternativa antes de lançar o erro.

## Migrando para um backend

O modo atual expõe a chave a qualquer pessoa que use a página. Para produção:

1. Crie um endpoint próprio (ex.: `POST /api/imagem`) que receba `{ prompt, size, quality }` e
   guarde a chave no servidor.
2. Em `generateCharacterImage()`, troque a URL e remova o header `Authorization`.
3. Em `renderIntegrationGate()`, remova o campo de chave (mantenha modelo/tamanho/qualidade se
   ainda fizerem sentido) ou elimine o gate inteiro definindo `integration.ready = true` no padrão.
4. Faça o backend devolver `{ data: [{ b64_json }] }` para não precisar mexer no resto do fluxo.

Nada além dessas linhas precisa mudar: loader, erro e renderização da imagem já são agnósticos à
origem.
