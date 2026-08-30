# EducaRPG Kids

Aplicação web de página única (pt-BR) para montar uma ficha de personagem de RPG em 6 passos —
Raça, Classe, Habilidades, Aparência, História e Visão geral — com a ficha sendo atualizada em
tempo real ao lado do formulário, exportação/importação em JSON, um prompt pronto para gerar o
retrato na ferramenta de IA que você preferir e um PDF de uma página com a ficha inteira e o
retrato dentro dela.

## Como rodar

Não há build nem instalação. Abra [index.html](index.html) no navegador, ou sirva a pasta:

```bash
python -m http.server 8000   # depois acesse http://localhost:8000
```

Checagem de sintaxe do JS:

```bash
npm run build   # equivale a: node --check src/main.js
```

## Como fazer o retrato e o PDF

1. No passo 5, clique em **COPIAR PROMPT**. O texto também aparece na tela, para conferir ou
   copiar à mão se o navegador bloquear a cópia automática.
2. Cole o prompt na ferramenta de imagem que você usa e gere o retrato.
3. Ainda no passo 5 (ou no passo 6), clique em **CARREGAR IMAGEM** e escolha o arquivo.
4. No passo 6, confira o retrato e clique em **GERAR PDF**.

A imagem fica **só na sessão**: ela não entra no JSON salvo, então ao reimportar uma ficha é
preciso carregá-la de novo.

## Estrutura

```
index.html                    página e pontos de montagem
src/main.js                   catálogos, estado, render, eventos, prompt, upload e PDF
src/style.css                 todo o CSS
vendor/                       jsPDF e html2canvas locais (única exceção a "zero dependências")
AGENTS.md                     guia de entrada para agentes de IA (leia primeiro)
docs/                         documentação técnica
.claude/agents/               agente `desenvolvedor` (requisito -> plano -> branch -> PR)
.claude/skills/               skills usadas por ele em cada fase
.claude/memoria/              memória do projeto, indexada por MAPA.md
```

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Resumo do sistema, regras de contribuição e índice — comece por aqui |
| [docs/ARQUITETURA.md](docs/ARQUITETURA.md) | Ciclo render/estado/eventos, contrato `data-*`, armadilhas conhecidas |
| [docs/MODELO_DE_DADOS.md](docs/MODELO_DE_DADOS.md) | Os catálogos que alimentam a ficha |
| [docs/JSON_DA_FICHA.md](docs/JSON_DA_FICHA.md) | O `state` e o schema do JSON salvo |
| [docs/GUIA_DE_FEATURES.md](docs/GUIA_DE_FEATURES.md) | Receitas passo a passo para features novas |
| [docs/UI_E_ESTILOS.md](docs/UI_E_ESTILOS.md) | Tokens, layout e classes CSS |
| [docs/INTEGRACAO_IMAGEM.md](docs/INTEGRACAO_IMAGEM.md) | Prompt, cópia, upload do retrato e geração do PDF |
| [vendor/README.md](vendor/README.md) | Bibliotecas de terceiros: versão, licença e origem |

## Dependências de terceiros

O projeto não usa npm nem bundler. As duas únicas bibliotecas são locais, versionadas em
[vendor/](vendor/README.md) e carregadas por `<script>` a partir do disco — jsPDF 4.2.1 e
html2canvas 1.4.1, ambas MIT, usadas exclusivamente pelo botão GERAR PDF. Nenhuma requisição de
rede é feita em tempo de execução, e a aplicação continua funcionando offline e por `file://`.
