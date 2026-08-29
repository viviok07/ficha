# Ambiente de desenvolvimento

**Fato:** o `gh` CLI não está instalado nesta máquina e o remote `origin` é SSH
(`git@github.com:viviok07/ficha.git`). Branch principal: `main`.
**Por quê:** sem `gh`, não dá para criar a PR por linha de comando.
**Como aplicar:** depois do `git push -u origin <branch>`, entregue o link de compare
`https://github.com/viviok07/ficha/compare/main...<branch>?expand=1` e avise que a PR ainda
precisa ser aberta com um clique. Se o `gh` for instalado no futuro, prefira `gh pr create`.

Relacionado: skill `branch-e-pr`.
