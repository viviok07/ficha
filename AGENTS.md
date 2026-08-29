# AGENTS.md — Guia de entrada para agentes de IA

Leia este arquivo **antes** de alterar qualquer coisa neste repositório. Ele existe para
que um agente autônomo consiga entender o sistema inteiro em poucos minutos e implementar
features novas sem quebrar o que já funciona.

## O que é este projeto

**Criador de Personagem** — uma aplicação web de página única (pt-BR) que guia uma criança
ou jogador por 5 passos (Raça → Classe → Habilidades → Aparência → História) para montar
uma ficha de RPG estilo D&D, exibe a ficha em tempo real ao lado do formulário, permite
salvar/importar a ficha em JSON e gerar um retrato do personagem chamando a API de imagens
da OpenAI direto do navegador.

## Fatos essenciais (memorize antes de codar)

| Fato | Detalhe |
| --- | --- |
| Stack | HTML + CSS + **JavaScript puro (ES2021+)**. Zero frameworks, zero dependências. |
| Arquivos de código | [index.html](index.html), [src/main.js](src/main.js) (~480 linhas), [src/style.css](src/style.css) (~655 linhas). É tudo. |
| Build | Não existe bundler. `npm run build` roda apenas `node --check src/main.js` (checagem de sintaxe). |
| Como rodar | Abrir `index.html` no navegador, ou servir a pasta (`python -m http.server`). |
| Módulos | **Não há `import`/`export`.** `src/main.js` é um script clássico (`<script defer>`); todo o escopo é um único arquivo. |
| Renderização | Reescrita total de `#root.innerHTML` a cada mudança de estado. Sem virtual DOM, sem diff. |
| Persistência | Nenhuma. Nada de `localStorage`. Só download/upload manual de JSON. |
| Idioma | Todo texto de UI, nomes de dados e commits em **português do Brasil**. |
| Testes | Não existem. A validação é `npm run build` + verificação manual no navegador. |

## Mapa da documentação

| Documento | Use quando precisar de… |
| --- | --- |
| [docs/ARQUITETURA.md](docs/ARQUITETURA.md) | Entender o ciclo render → bind → evento → estado → render, e onde cada função vive. |
| [docs/MODELO_DE_DADOS.md](docs/MODELO_DE_DADOS.md) | Os catálogos (`races`, `classes`, `skillCatalog`, `appearanceGroups`), o `state` e o schema do JSON exportado. |
| [docs/GUIA_DE_FEATURES.md](docs/GUIA_DE_FEATURES.md) | **Receitas prontas**: adicionar raça, classe, habilidade, campo, passo, ação do cabeçalho, etc. |
| [docs/UI_E_ESTILOS.md](docs/UI_E_ESTILOS.md) | Tokens de cor, classes CSS existentes, grid, responsividade. |
| [docs/INTEGRACAO_IMAGEM.md](docs/INTEGRACAO_IMAGEM.md) | Como funciona a geração de imagem por IA por dentro (prompt, fetch, estados). |
| [INTEGRACAO_OPENAI_IMAGENS.md](INTEGRACAO_OPENAI_IMAGENS.md) | Passo a passo **para o usuário final** obter e usar a chave da OpenAI. |

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

1. **Não introduza dependências, bundlers ou frameworks.** Se a feature parecer exigir isso,
   escreva a solução em JS puro ou pergunte ao usuário antes.
2. **Todo dado novo começa como um catálogo no topo de `src/main.js`**, não espalhado no HTML.
   Ver [docs/MODELO_DE_DADOS.md](docs/MODELO_DE_DADOS.md).
3. **Nunca mute o DOM diretamente** para refletir estado. Altere o objeto `state` (ou
   `integration` / `imageState`) e chame `render()`.
4. **Toda string vinda do usuário interpolada em HTML deve passar por `escapeHtml()`.**
   Ver a lista de pontos hoje desprotegidos em [docs/ARQUITETURA.md](docs/ARQUITETURA.md#armadilhas-conhecidas).
5. **Ids são a chave de tudo** (`race.id`, `class.id`, `skill.id`). São kebab-case sem acento e
   nunca devem mudar depois de publicados — JSONs salvos por usuários referenciam esses ids.
6. **Mantenha o texto acessível a crianças**: frases curtas, sem jargão de regras, tom acolhedor.
7. Depois de editar, rode `npm run build` e confirme que o passo afetado ainda renderiza no
   navegador (a ficha lateral também).
