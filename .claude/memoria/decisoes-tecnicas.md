# Decisões técnicas duradouras

**Zero dependências, sem bundler.** HTML + CSS + JS puro; `npm run build` é apenas
`node --check src/main.js`.
**Por quê:** o projeto precisa abrir direto do `index.html`, sem instalação.
**Como aplicar:** não adicione framework, bundler ou pacote npm sem autorização explícita.

**A chave da API da OpenAI nunca é persistida.** Vive só em memória, no objeto `integration`.
**Por quê:** decisão de segurança — a chamada sai do navegador direto para a OpenAI.
**Como aplicar:** nunca grave a chave em localStorage, cookie, URL, log ou requisição para
outro destino. Persistência de ficha, se houver, salva apenas `characterJson()`.

**Ids de raça, classe e habilidade são contrato.** Fichas JSON salvas por usuários referenciam
esses ids, e `normalizeId()` descarta silenciosamente os desconhecidos.
**Como aplicar:** nunca renomeie um id já publicado.

Relacionado: `docs/ARQUITETURA.md`, `docs/INTEGRACAO_IMAGEM.md`.
