---
name: branch-e-pr
description: Fluxo git da task — abre a branch de feature a partir da main atualizada, commita a mudança e abre a PR devolvendo o link (com fallback para o link de compare do GitHub quando o gh CLI não existe). Use nas fases 3 e 7.
---

# Branch e PR

Fluxo git da task. Duas seções: uma no começo (branch), outra no fim (commit + PR).

Ambiente deste repositório:
- remote `origin` = `git@github.com:viviok07/ficha.git` (SSH)
- branch principal = `main`
- **`gh` CLI não está instalado** → use o fallback de link de compare

---

## Abrir a branch (fase 3)

```bash
git status --porcelain          # precisa estar limpo
git switch main
git pull --ff-only origin main  # main ATUALIZADA é obrigatório
git switch -c feature/<slug>
```

- Working tree sujo → pare e pergunte ao usuário o que fazer com as alterações pendentes.
  Nunca use `git stash`, `git checkout --` ou `git reset --hard` por conta própria.
- `git pull` falhou (rede, credencial) → avise e pergunte se pode seguir a partir da `main`
  local; não siga em silêncio.
- Nome da branch: `feature/<slug-kebab>` para feature, `fix/<slug-kebab>` para correção.
  Slug curto, em português, sem acento: `feature/editar-personalidade`.

---

## Commit (fase 7)

Só depois da fase 5 (validação) ter passado.

```bash
git status
git diff                        # revise TUDO antes de adicionar
git add <arquivos-do-plano>     # nunca `git add -A` às cegas
git commit -m "..."
```

Antes de commitar, confirme:
- [ ] Nenhuma chave de API, `.env`, token ou dado pessoal no diff.
- [ ] Nenhum arquivo fora do plano aprovado.
- [ ] Nenhum `console.log`/código de depuração esquecido.

Mensagem de commit, no padrão do histórico deste repo (imperativo, pt-BR, uma linha):

```
Adiciona campos extras na história
```

Corpo opcional só quando o "porquê" não for óbvio. Encerre a mensagem com o trailer
`Co-Authored-By` exigido pelo ambiente.

Nunca: commitar na `main`, `--amend` em commit já enviado, `push --force` na `main`,
`--no-verify`.

---

## PR (fase 7)

```bash
git push -u origin feature/<slug>
```

Depois, **tente o gh CLI**:

```bash
gh pr create --base main --head feature/<slug> --title "<título>" --body "<corpo>"
```

Se `gh` não existir (é o caso hoje), monte o link de compare e entregue ao usuário:

```
https://github.com/viviok07/ficha/compare/main...feature/<slug>?expand=1
```

Para derivar o link de qualquer remote:
```bash
git remote get-url origin   # git@github.com:ORG/REPO.git  ->  https://github.com/ORG/REPO
```

### Corpo da PR

```markdown
## O que muda
<1-3 linhas>

## Por quê
<requisito/problema que motivou>

## Como validar
1. <passo>
2. <passo>

## Fora de escopo
- <item>
```

Termine o PR body com a linha de rodapé de geração exigida pelo ambiente.

### Entrega final

Sempre devolva ao usuário, nesta forma:

```
PR: <url da PR ou do compare>
Branch: feature/<slug>
Resumo: <1-3 linhas>
Fora de escopo/pendências: <lista ou "nenhuma">
```

Se o link for de compare (e não de uma PR já criada), diga isso explicitamente: a PR ainda
precisa ser aberta com um clique.
