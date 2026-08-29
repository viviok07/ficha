---
name: memoria-do-projeto
description: Mantém a memória do projeto em .claude/memoria/ e a documentação em docs/ — entradas curtas e objetivas, arquivos com no máximo 200 linhas e um mapa de referência (MAPA.md) para carregar arquivos sob demanda. Use na fase 6, depois de validar e antes de commitar.
---

# Memória e documentação do projeto

Duas famílias de markdown, com propósitos diferentes:

| Onde | O que guarda | Regra |
| --- | --- | --- |
| `docs/` | **Como o sistema funciona** — arquitetura, dados, receitas, estilos | Atualize quando o comportamento mudar |
| `.claude/memoria/` | **O que não se deduz do código** — decisões, restrições, combinados, fatos do ambiente | Só o não óbvio |

Nunca registre em memória o que o código, o `git log` ou `docs/` já dizem.

## Regras de tamanho (valem para os dois)

1. **Máximo de 200 linhas por arquivo.** Chegou perto? Quebre por subtópico e registre os novos
   arquivos no mapa.
2. Entradas de memória: **até ~40 linhas**. Se precisar de mais, provavelmente é documentação
   (`docs/`), não memória.
3. Frases curtas, listas, tabelas. Sem introdução, sem repetir o que o título já diz, sem
   "vale ressaltar que".
4. O mapa (`MAPA.md`) é o único arquivo sempre carregado — mantenha-o **abaixo de 60 linhas**.

## O mapa de referência — `.claude/memoria/MAPA.md`

Uma linha por arquivo, com um gancho que permita decidir se vale carregar:

```markdown
- [ambiente.md](ambiente.md) — remote SSH, gh ausente, como abrir PR aqui
- [decisoes-tecnicas.md](decisoes-tecnicas.md) — por que zero dependências e sem bundler
```

Carregamento sob demanda: no início da task, leia **só o MAPA.md**; abra uma entrada apenas
quando o gancho dela for relevante para a task. Não carregue a memória inteira "por garantia".

O mesmo vale para `docs/`: o índice está em `AGENTS.md`; carregue o documento específico.

## Quando escrever uma entrada de memória

Escreva se a informação for **duradoura** e **não derivável do repositório**:

- Uma decisão e o porquê dela ("a chave da OpenAI nunca é persistida — decisão de segurança").
- Uma restrição do ambiente ("`gh` não está instalado; PR via link de compare").
- Um combinado de processo com o usuário ("PR sempre a partir de main atualizada").
- Uma armadilha que já custou tempo e não está documentada em `docs/`.

Não escreva:
- Resumo do que foi feito na task (isso é o commit e a PR).
- Estrutura de código, lista de funções, detalhes de implementação (isso é `docs/`).
- Nada específico de uma conversa que não se repete.

## Formato de uma entrada

```markdown
# <Título curto>

**Decisão/fato:** <uma ou duas frases>
**Por quê:** <motivo, uma frase>
**Como aplicar:** <o que fazer na prática, uma frase>

Relacionado: [outra-entrada.md](outra-entrada.md)
```

## Fluxo da fase 6

1. Reveja o diff: o que ele tornou desatualizado em `docs/`? Corrija.
2. Novo campo/catálogo/passo? Atualize `docs/MODELO_DE_DADOS.md` e/ou
   `docs/GUIA_DE_FEATURES.md`. Mudou o ciclo de render ou o contrato `data-*`?
   Atualize `docs/ARQUITETURA.md`.
3. Referências `arquivo:linha` nos docs saíram do lugar? Confira com
   `grep -n '^function \|^const ' src/main.js` e corrija.
4. A task produziu alguma decisão duradoura? Escreva **uma** entrada de memória curta e
   adicione a linha correspondente no `MAPA.md`.
5. Algum arquivo passou de 200 linhas? Quebre agora e atualize mapa/índice.
6. Não sobrou nada para registrar? Ótimo — não invente entrada. Diga "sem alteração de
   documentação/memória" e siga.

## Antes de fechar

- [ ] Nenhum arquivo `.md` acima de 200 linhas (`wc -l docs/*.md .claude/memoria/*.md`)
- [ ] `MAPA.md` reflete os arquivos existentes, sem link quebrado
- [ ] Nenhuma entrada duplicada — atualize a existente em vez de criar outra
