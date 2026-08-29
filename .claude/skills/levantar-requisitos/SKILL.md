---
name: levantar-requisitos
description: Transforma um pedido informal em uma ficha de requisito objetiva (problema, escopo, fora de escopo, critérios de aceite), listando dúvidas em vez de presumir. Use na fase 1 de qualquer task, antes de planejar ou escrever código.
---

# Levantar requisitos

Objetivo: sair daqui com **zero suposições**. Tudo que não estiver escrito ou confirmado é
dúvida, e dúvida vira pergunta — nunca um chute.

## 1. Pesquise antes de perguntar

Não gaste a paciência do usuário com o que o repositório já responde:

1. `AGENTS.md` e `docs/` — arquitetura, modelo de dados, receitas de feature.
2. `.claude/memoria/MAPA.md` — decisões e contexto já registrados.
3. O código do trecho afetado (`Grep`/`Read`).
4. `git log --oneline -15` — como mudanças parecidas foram feitas antes.

## 2. Monte a ficha de requisito

```markdown
## Requisito: <título curto>

**Problema/necessidade:** <o que o usuário quer resolver, na visão dele>
**Escopo:** <o que será feito — lista curta e verificável>
**Fora de escopo:** <o que explicitamente NÃO será feito nesta task>
**Impacto:** <arquivos/áreas que devem mudar>
**Critérios de aceite:**
- [ ] <condição observável 1>
- [ ] <condição observável 2>
```

Critério de aceite bom é observável: "o passo 4 mostra o grupo Capa e o valor escolhido
aparece na ficha". Critério ruim é vago: "funciona bem".

## 3. Levante as dúvidas

Passe o pedido por este filtro. Cada item sem resposta clara vira pergunta:

- **Comportamento**: o que acontece nos casos de borda? E se o valor estiver vazio/inválido?
- **Alcance**: afeta o JSON exportado? A ficha lateral? A importação? O prompt de imagem?
- **Compatibilidade**: fichas JSON já salvas continuam abrindo?
- **UI**: onde aparece, com qual rótulo, em qual passo?
- **Dados**: é catálogo fixo ou texto livre? Precisa de valor padrão?
- **Limites**: quantidade mínima/máxima, obrigatório ou opcional?
- **Pronto significa o quê**: qual é a evidência de que a task terminou?

## 4. Pergunte

Use `AskUserQuestion` (máx. 4 por vez) ou, se indisponível, devolva:

```
## PERGUNTAS PENDENTES
1. <pergunta> — opções: (a) <...> (b) <...> — recomendo (a) porque <motivo curto>
```

Regras:
- Uma decisão por pergunta.
- Sempre com opções concretas e uma recomendação.
- Agrupe todas as dúvidas de uma vez; evite interrogatório em série.
- Se o usuário responder "tanto faz", registre a escolha feita na ficha, explicitamente.

## 5. Confirme a ficha

Apresente a ficha final e confirme com o usuário antes de planejar. A partir daqui, ela é o
contrato: a validação da fase 5 usa exatamente esses critérios de aceite.

## Sinais de que você está presumindo

- Escreveu "provavelmente", "imagino que", "deve ser" na ficha.
- Escolheu um rótulo, um valor padrão ou um limite que ninguém pediu.
- Ampliou o pedido ("já que estou aqui, também vou...").
- Decidiu sozinho que algo é "óbvio" sem achar isso escrito no repositório.

Qualquer um desses: volte ao passo 3 e pergunte.
