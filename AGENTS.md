# AGENTS.md — Guia de entrada para agentes de IA

Leia este arquivo **antes** de alterar qualquer coisa neste repositório. Ele existe para
que um agente autônomo consiga entender o sistema inteiro em poucos minutos e implementar
features novas sem quebrar o que já funciona.

## O que é este projeto

**EducaRPG Kids** — uma aplicação web de página única (pt-BR) que guia uma criança
ou jogador por 6 passos (Raça → Classe → Habilidades → Aparência → História → Visão geral) para
montar uma ficha de RPG estilo D&D, exibe a ficha em tempo real ao lado do formulário, permite
salvar/importar a ficha em JSON, copiar um prompt para gerar o retrato na ferramenta de IA que o
usuário preferir, carregar essa imagem e gerar um PDF de uma página com a ficha inteira e o
retrato dentro dela.

## Fatos essenciais (memorize antes de codar)

| Fato | Detalhe |
| --- | --- |
| Stack | HTML + CSS + **JavaScript puro (ES2021+)**. Zero frameworks. |
| Dependências | Nenhuma via npm. Duas bibliotecas locais em [vendor/](vendor/README.md), só para o PDF — ver regra 1. |
| Arquivos de código | [index.html](index.html), [src/main.js](src/main.js) (~900 linhas), [src/style.css](src/style.css) (~710 linhas). É tudo. |
| Página à parte | [guia.html](guia.html) — o *Guia do Aventureiro*, estático e **autossuficiente**: CSS e JS próprios embutidos, não carrega `src/main.js` nem `src/style.css` e não conhece o `state`. O app só o alcança por um `<a href="./guia.html">` no cabeçalho. |
| Build | Não existe bundler. `npm run build` roda apenas `node --check src/main.js` (checagem de sintaxe). |
| Como rodar | Abrir `index.html` no navegador, ou servir a pasta (`python -m http.server`). |
| Módulos | **Não há `import`/`export`.** `src/main.js` é um script clássico (`<script defer>`); todo o escopo é um único arquivo. |
| Renderização | Reescrita total de `#root.innerHTML` a cada mudança de estado. Sem virtual DOM, sem diff. |
| Persistência | Nenhuma. Nada de `localStorage`. Só download/upload manual de JSON. A chave do Gemini também é só de sessão. |
| Estado inicial | **Vazio.** Nada de raça, classe, habilidade, aparência ou texto pré-selecionado. |
| Retrato | Dois caminhos: copiar o prompt e trazer a imagem por upload, ou gerar pela API do Gemini com uma chave da sessão (opcional). Vive só em memória. |
| Idioma | Todo texto de UI, nomes de dados e commits em **português do Brasil**. |
| Testes | Não existem. A validação é `npm run build` + verificação manual no navegador. |

## Mapa da documentação

| Documento | Use quando precisar de… |
| --- | --- |
| [docs/ARQUITETURA.md](docs/ARQUITETURA.md) | Entender o ciclo render → bind → evento → estado → render, e onde cada função vive. |
| [docs/ARMADILHAS.md](docs/ARMADILHAS.md) | As armadilhas já conhecidas do arquivo — o que já foi resolvido e o que continua valendo. |
| [docs/MODELO_DE_DADOS.md](docs/MODELO_DE_DADOS.md) | Os catálogos: `races`, `classes`, `skillCatalog`, `appearanceGroups`, `personalityCatalog`, `equipmentCatalog`, `steps` e os limites. |
| [docs/JSON_DA_FICHA.md](docs/JSON_DA_FICHA.md) | O objeto `state` e o schema do JSON salvo/importado. |
| [docs/GUIA_DE_FEATURES.md](docs/GUIA_DE_FEATURES.md) | **Receitas prontas**: adicionar raça, classe, habilidade, campo, passo, ação do cabeçalho, etc. |
| [docs/UI_E_ESTILOS.md](docs/UI_E_ESTILOS.md) | Tokens de cor, classes CSS existentes, grid, responsividade. |
| [docs/INTEGRACAO_IMAGEM.md](docs/INTEGRACAO_IMAGEM.md) | Como funcionam o prompt, a cópia, o upload do retrato e a geração do PDF. |
| [docs/INTEGRACAO_GEMINI.md](docs/INTEGRACAO_GEMINI.md) | O caminho opcional pela API do Gemini: chave, modal, endpoint, mapa de erros, CORS e segurança. |
| [vendor/README.md](vendor/README.md) | Quais bibliotecas de terceiros existem, em que versão e por quê. |

## Agente e skills deste repositório

Existe um agente dedicado a conduzir features do requisito até a PR:

| Arquivo | Papel |
| --- | --- |
| [.claude/agents/desenvolvedor.md](.claude/agents/desenvolvedor.md) | Agente `desenvolvedor` — ciclo de 7 fases, nunca presume, valida o plano com o usuário |
| [.claude/skills/levantar-requisitos/](.claude/skills/levantar-requisitos/SKILL.md) | Fase 1 — ficha de requisito e perguntas |
| [.claude/skills/planejar-task/](.claude/skills/planejar-task/SKILL.md) | Fase 2 — plano e aprovação |
| [.claude/skills/branch-e-pr/](.claude/skills/branch-e-pr/SKILL.md) | Fases 3 e 7 — branch, commit, PR e link |
| [.claude/skills/validar-escopo/](.claude/skills/validar-escopo/SKILL.md) | Fase 5 — validação contra o acordado |
| [.claude/skills/memoria-do-projeto/](.claude/skills/memoria-do-projeto/SKILL.md) | Fase 6 — docs e memória, com limite de 200 linhas |

A memória do projeto fica em [.claude/memoria/](.claude/memoria/MAPA.md): carregue apenas o
`MAPA.md` e abra as entradas sob demanda.

## Regras de ouro para alterações

1. **Não introduza dependências, bundlers ou frameworks.** Existe **uma exceção nomeada e já
   autorizada pelo usuário**: `jspdf` e `html2canvas`, versionados em [vendor/](vendor/README.md)
   e usados só pelo botão GERAR PDF. Ela não abre precedente — qualquer biblioteca nova exige
   nova autorização explícita. Nada de npm, nada de CDN em runtime.
2. **Todo dado novo começa como um catálogo no topo de `src/main.js`**, não espalhado no HTML.
   Ver [docs/MODELO_DE_DADOS.md](docs/MODELO_DE_DADOS.md).
3. **Nunca mute o DOM diretamente** para refletir estado. Altere o objeto `state` (ou
   `imageState`) e chame `render()`.
4. **Toda string vinda do usuário interpolada em HTML deve passar por `escapeHtml()`.**
   Hoje a ficha lateral e os passos 5 e 6 já escapam tudo; ver
   [docs/ARMADILHAS.md](docs/ARMADILHAS.md).
5. **Ids são a chave de tudo** (`race.id`, `class.id`, `skill.id`, `personality.id`,
   `equipment.id`). São kebab-case sem acento e nunca devem mudar depois de publicados — JSONs
   salvos por usuários referenciam esses ids.
6. **Mantenha o texto acessível a crianças**: frases curtas, sem jargão de regras, tom acolhedor.
7. Depois de editar, rode `npm run build` e confirme que o passo afetado ainda renderiza no
   navegador (a ficha lateral também).
