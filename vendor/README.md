# vendor/ — bibliotecas de terceiros

Estes arquivos são a **única exceção autorizada** à regra "zero dependências" do projeto
(ver [AGENTS.md](../AGENTS.md), regra 1). Foram baixados uma vez e versionados aqui para que
o botão **GERAR PDF** do passo 6 funcione **offline** e ao abrir `index.html` por `file://`,
sem nenhum CDN em tempo de execução.

| Arquivo | Biblioteca | Versão | Licença | Origem |
| --- | --- | --- | --- | --- |
| `jspdf.umd.min.js` | [jsPDF](https://github.com/parallax/jsPDF) | 4.2.1 | MIT | `https://cdnjs.cloudflare.com/ajax/libs/jspdf/4.2.1/jspdf.umd.min.js` |
| `html2canvas.min.js` | [html2canvas](https://github.com/niklasvh/html2canvas) | 1.4.1 | MIT | `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js` |

## Como são usados

Carregados por `<script defer>` em [index.html](../index.html), **antes** de `src/main.js`,
expondo os globais `window.html2canvas` e `window.jspdf.jsPDF`. Só `generatePdf()`
([src/main.js](../src/main.js)) os consome; se os globais faltarem, o botão mostra um erro
legível em vez de quebrar.

## Regras

- **Versões fixas.** Nunca troque por uma URL de CDN nem por um "latest".
- **Não edite os arquivos.** Para atualizar, baixe a versão nova da mesma origem, atualize a
  tabela acima e teste o PDF no navegador.
- **Não adicione outras bibliotecas aqui** sem uma nova autorização explícita do usuário.
