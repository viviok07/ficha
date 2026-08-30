# Armadilhas conhecidas

Extraído de [ARQUITETURA.md](ARQUITETURA.md) quando aquele arquivo bateu no limite de 200 linhas.

Documentadas para que agentes não as tratem como bugs novos nem as repitam:

1. ~~Foco perdido ao digitar~~ — **resolvido** por `captureFocus()`/`restoreFocus()`. Volta a
   acontecer se você criar um input que `focusSelector()` não reconheça.
2. ~~HTML não escapado na ficha~~ — **resolvido**. `renderSheet()` escapa todos os valores vindos
   do usuário. Textos de catálogo (nomes de raça, classe, habilidade, personalidade, equipamento)
   não são escapados de propósito: são dados do próprio código.
3. ~~`escapeHtml()` não escapa aspas simples~~ — **resolvido**. Agora trata `&`, `<`, `>`, `"` e
   `'`. Nenhum atributo do arquivo usa `'` como delimitador, mas o retorno passou a ser seguro
   caso algum passe a usar.
4. **REINICIAR recarrega a página**, o que também descarta o retrato carregado.
5. **A cópia do prompt falha em `file://` em vários navegadores.** `copyPrompt()` já tem três
   degraus de fallback e o prompt fica visível na tela; não "simplifique" para só
   `navigator.clipboard`.
6. **Não há validação de tamanho nem de tipo profundo no JSON importado** — um arquivo
   arbitrário pode, por exemplo, substituir `state.personality` por um array gigante.
7. **O upload de imagem não tem limite de tamanho** (decisão do usuário). Só o tipo MIME é
   checado, via `file.type.startsWith('image/')`. Um SVG sem dimensão intrínseca é barrado depois,
   já dentro de `generatePdf()`.
8. ~~Chave de `appearance` vinda de JSON chega crua ao `innerHTML`~~ — **resolvido em duas
   camadas**: `normalizeAppearance()` ([src/main.js:899](../src/main.js#L899)) só aceita as chaves
   de `appearanceGroups` na importação, e `renderSheet()` escapa `labelForAppearance(key)` no
   ponto de interpolação. Chave desconhecida é descartada em silêncio, como nos outros catálogos.
