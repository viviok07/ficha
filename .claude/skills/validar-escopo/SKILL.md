---
name: validar-escopo
description: Verifica a implementação contra o escopo e os critérios de aceite acordados — nem menos, nem mais — rodando as checagens do projeto e revisando o diff. Use na fase 5, antes de documentar e commitar.
---

# Validar contra o escopo

Você valida **o que foi acordado**, não o que seria bom ter. Duas falhas são igualmente graves:
entregar menos que o combinado e entregar coisas que ninguém pediu.

## 1. Checagens do projeto

```bash
npm run build        # node --check src/main.js
```

Não há suíte de testes neste repositório. A validação funcional é manual:

- Abrir `index.html` no navegador.
- Percorrer os 5 passos e conferir a ficha lateral.
- `SALVAR FICHA` → `IMPORTAR JSON` (round-trip da exportação).

Se você não puder abrir o navegador, **diga isso explicitamente** e liste os passos manuais
que ficaram por conta do usuário. Nunca declare "validado no navegador" sem ter validado.

## 2. Critérios de aceite, um a um

Retome a ficha de requisito e marque cada critério com evidência real:

```markdown
- [x] <critério> — verificado em <arquivo:linha> / <o que foi observado>
- [ ] <critério> — NÃO atendido: <motivo>
```

Critério não atendido nunca vira "quase": ou você corrige, ou reporta como pendência aberta.

## 3. Revise o diff contra o plano

```bash
git diff
git status --porcelain
```

Confira:

- [ ] Todo arquivo alterado estava no plano aprovado.
- [ ] Nenhuma mudança "de brinde": refatoração, renomeação, reformatação, comentário extra.
- [ ] Nenhum arquivo temporário, de editor ou de build no diff.
- [ ] Nada de segredo (chave de API, token, `.env`).

Achou algo fora do plano? Reverta, ou avise o usuário e peça autorização. Não deixe passar
"porque já está pronto".

## 4. Regressões prováveis neste projeto

Cheque as que se aplicarem à mudança (ver `docs/ARQUITETURA.md`):

- Campo novo no personagem → está nos **três** pontos (`state`, `characterJson()`,
  `loadCharacter()`)?
- Classe nova → tem entrada correspondente em `skillCatalog`?
- Grid novo → comporta-se abaixo de 980px?
- Valor de usuário interpolado em HTML → passou por `escapeHtml()`?
- Mudou o limite de habilidades → os quatro pontos concordam?
- Mexeu em `loadCharacter()` → `state.class` ainda é atribuído antes de `state.skills`?

## 5. Relatório

```markdown
### Validação
- npm run build: OK
- Critérios de aceite: 4/4 atendidos
- Diff: 3 arquivos, todos previstos no plano
- Não verificado: <o que ficou de fora e por quê>
```

Falhou alguma coisa? Relate o erro real, com a saída do comando. Não maquie, não arredonde e
não siga para o commit com pendência não comunicada.
