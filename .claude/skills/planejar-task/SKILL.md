---
name: planejar-task
description: Transforma uma ficha de requisito aprovada em um plano de implementação curto, com passos verificáveis, arquivos afetados e riscos, e o valida com o usuário antes de qualquer código. Use na fase 2, depois de levantar-requisitos.
---

# Planejar a task

Entrada: a ficha de requisito confirmada. Saída: um plano aprovado pelo usuário.
**Nenhuma linha de código antes da aprovação.**

## 1. Investigue o terreno

Antes de escrever o plano, saiba onde vai mexer:

- Existe receita pronta em `docs/GUIA_DE_FEATURES.md`? Se sim, o plano segue a receita.
- Quais funções/arquivos exatos mudam? Liste com `arquivo:linha`.
- A mudança toca os três pontos de dados (`state`, `characterJson()`, `loadCharacter()`)?
- Alguma armadilha conhecida em `docs/ARQUITETURA.md` está no caminho?

## 2. Escreva o plano

Curto e concreto. Se passar de ~12 passos, a task é grande demais — proponha fatiar.

```markdown
## Plano: <título>

**Branch:** feature/<slug-curto>
**Abordagem:** <2-3 linhas: como será feito e por quê>

### Passos
1. `src/main.js:101` — adicionar grupo `capa` em `appearanceGroups`
2. `src/main.js:136` — valor padrão em `state.appearance`
3. `docs/MODELO_DE_DADOS.md` — documentar o grupo novo
...

### Validação
- `npm run build`
- Abrir `index.html`, ir ao passo 4 e conferir <...>
- Salvar e reimportar o JSON

### Riscos e decisões
- <risco> → <como será tratado>

### Não faz parte deste plano
- <item fora de escopo>
```

## 3. Regras do plano

- **Cada passo aponta um arquivo real.** "Ajustar a UI" não é um passo; "`src/main.js:288` —
  adicionar `<label class="field">` com `data-field=\"motivacao\"`" é.
- **Nada de passo especulativo.** Se você não sabe o que precisa mudar em um arquivo, investigue
  antes de planejar; se ainda restar dúvida, volte a perguntar.
- **Sem escopo extra.** Refatoração, renomeação, formatação e "melhorias" que ninguém pediu
  ficam na seção *Não faz parte deste plano*.
- **Sem dependências novas** neste projeto (JS puro, zero deps) — se parecer necessário, isso é
  uma pergunta ao usuário, não uma decisão sua.
- **Alternativas**: se houver duas abordagens defensáveis, apresente as duas em uma linha cada,
  recomende uma e deixe o usuário decidir.

## 4. Valide com o usuário

Apresente o plano e espere aprovação explícita.

- Aprovado ("ok", "pode ir", "aprovado") → siga para a fase 3.
- Ajustes pedidos → reescreva o plano inteiro e valide de novo.
- Silêncio ou resposta ambígua → **não é aprovação**. Pergunte de novo.

Se durante a implementação o plano se mostrar errado, pare, atualize o plano e revalide.
O plano aprovado é o que a fase 5 vai cobrar.
