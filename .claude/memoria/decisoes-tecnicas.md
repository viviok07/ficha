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

**A integração com a API da OpenAI foi removida por inteiro.** Não existe mais chave, gate,
`fetch` nem `integration`. O usuário copia o prompt, gera a imagem fora e faz upload.
**Como aplicar:** não "restaure" o fluxo antigo; se um dia voltar uma API, ela entra por trás de
um backend, não com a chave no navegador.

**O retrato vive só em memória** (`imageState.dataUrl`) e **não** entra em `characterJson()`.
**Por quê:** um data URL de 1024x1024 deixaria o JSON salvo com vários MB.
**Como aplicar:** persistência de ficha, se houver, salva apenas `characterJson()`.

**Ids de raça, classe, habilidade, personalidade e equipamento são contrato.** Fichas JSON salvas
referenciam esses ids, e `normalizeChoices()`/`normalizeId()` descartam silenciosamente os
desconhecidos.
**Como aplicar:** nunca renomeie um id já publicado.

Relacionado: `docs/ARQUITETURA.md`, `docs/INTEGRACAO_IMAGEM.md`, `vendor/README.md`.
