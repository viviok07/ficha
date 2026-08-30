# Decisões técnicas duradouras

**Sem npm, sem bundler, sem framework.** HTML + CSS + JS puro; `npm run build` é apenas
`node --check src/main.js`.
**Por quê:** o projeto precisa abrir direto do `index.html`, inclusive por `file://`.
**Como aplicar:** não adicione framework, bundler ou pacote npm.

**Exceção autorizada: `vendor/`.** Em 2026-08-29 o usuário autorizou **explicitamente** versionar
`jspdf` (4.2.1) e `html2canvas` (1.4.1), ambas MIT, dentro de `vendor/`, carregadas por `<script>`
a partir do disco.
**Por quê:** era a única forma de gerar um PDF fiel à ficha renderizada com download de um clique;
as alternativas eram `window.print()` (sem download direto) ou CDN (exige internet).
**Escopo:** vale só para essas duas bibliotecas e só para o botão GERAR PDF. **Nada de CDN em
runtime, nada de npm, e qualquer biblioteca nova exige nova autorização.** A exceção está escrita
na regra 1 do `AGENTS.md` e detalhada em `vendor/README.md`.

**Chave de IA no navegador: aceita, sem backend.** Em 2026-08-30 o usuário **reverteu**
explicitamente a regra anterior ("se um dia voltar uma API, ela entra por trás de um backend") e
pediu a geração de imagem pelo Gemini chamada direto do `fetch`, com a chave digitada por ele.
**Por quê:** o projeto não tem servidor e é usado localmente; ele aceita o risco de a chave ficar
visível para quem estiver no computador, em troca de um clique em vez de copiar/colar o prompt.
**Como aplicar:** as chaves vivem só em `integrations.<plataforma>.apiKey`, em memória; nunca em
`localStorage`, em `characterJson()` nem em `console`. `scrubKey()` remove **todas** elas de
qualquer mensagem de erro exibida. Vale igual para o ChatGPT, reintroduzido em 2026-08-30 a
pedido do usuário ("como antes"). O `AGENTS.md` e os `docs/INTEGRACAO_*.md` mantêm o aviso.

**A integração é opcional, nunca um portão.** A da OpenAI (removida na PR #9) bloqueava o app
inteiro até a chave ser informada; a do Gemini não pode repetir isso.
**Por quê:** o público principal usa o fluxo manual (COPIAR PROMPT + upload) e não tem chave.
**Como aplicar:** o modal sempre tem saída ("FECHAR") e todo passo do wizard funciona sem chave.
Desde 2026-08-30 ele nem abre sozinho: só pelo botão ⚙ INTEGRAÇÕES do passo 5 — e, como o modal
sumiu da carga, o botão de gerar sem chave **abre o modal** em vez de ficar inerte, para a
funcionalidade continuar descobrível. Quebrar isso é regressão, não detalhe de UI.

**O retrato vive só em memória** (`imageState.dataUrl`) e **não** entra em `characterJson()`.
**Por quê:** um data URL de 1024x1024 deixaria o JSON salvo com vários MB.
**Como aplicar:** persistência de ficha, se houver, salva apenas `characterJson()`.

**Ids de raça, classe, habilidade, personalidade e equipamento são contrato.** Fichas JSON salvas
referenciam esses ids, e `normalizeChoices()`/`normalizeId()` descartam silenciosamente os
desconhecidos.
**Como aplicar:** nunca renomeie um id já publicado.

Relacionado: `docs/ARQUITETURA.md`, `docs/INTEGRACAO_IMAGEM.md`, `vendor/README.md`.
