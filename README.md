# Criador de Personagem

Aplicação web de página única (pt-BR) para montar uma ficha de personagem de RPG em 5 passos —
Raça, Classe, Habilidades, Aparência e História — com a ficha sendo atualizada em tempo real ao
lado do formulário, exportação/importação em JSON e geração de um retrato do personagem pela API
de imagens da OpenAI.

## Como rodar

Não há build nem dependências. Abra [index.html](index.html) no navegador, ou sirva a pasta:

```bash
python -m http.server 8000   # depois acesse http://localhost:8000
```

Checagem de sintaxe do JS:

```bash
npm run build   # equivale a: node --check src/main.js
```

## Estrutura

```
index.html                    página e pontos de montagem
src/main.js                   catálogos, estado, render, eventos e integração com a OpenAI
src/style.css                 todo o CSS
AGENTS.md                     guia de entrada para agentes de IA (leia primeiro)
docs/                         documentação técnica
.claude/agents/               agente `desenvolvedor` (requisito -> plano -> branch -> PR)
.claude/skills/               skills usadas por ele em cada fase
.claude/memoria/              memória do projeto, indexada por MAPA.md
INTEGRACAO_OPENAI_IMAGENS.md  passo a passo do usuário para configurar a chave da OpenAI
```

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Resumo do sistema, regras de contribuição e índice — comece por aqui |
| [docs/ARQUITETURA.md](docs/ARQUITETURA.md) | Ciclo render/estado/eventos, contrato `data-*`, armadilhas conhecidas |
| [docs/MODELO_DE_DADOS.md](docs/MODELO_DE_DADOS.md) | Catálogos, `state` e o schema do JSON salvo |
| [docs/GUIA_DE_FEATURES.md](docs/GUIA_DE_FEATURES.md) | Receitas passo a passo para features novas |
| [docs/UI_E_ESTILOS.md](docs/UI_E_ESTILOS.md) | Tokens, layout e classes CSS |
| [docs/INTEGRACAO_IMAGEM.md](docs/INTEGRACAO_IMAGEM.md) | Como a geração de imagem funciona por dentro |

## Aviso de segurança

A chave da API da OpenAI é informada no navegador e usada em chamadas diretas à OpenAI. Isso
expõe a chave a quem estiver usando a página — use apenas localmente. Para produção, coloque a
chamada atrás de um backend próprio (ver
[docs/INTEGRACAO_IMAGEM.md](docs/INTEGRACAO_IMAGEM.md#migrando-para-um-backend)).
