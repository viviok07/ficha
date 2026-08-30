# Combinados de processo

**Fato:** o usuário quer o ciclo completo conduzido pelo agente `desenvolvedor`: requisito →
plano validado → branch a partir da `main` atualizada → implementação → validação de escopo →
documentação/memória → commit → PR → link.
**Por quê:** evita retrabalho e escopo inflado.
**Como aplicar:** nunca presuma requisito — pergunte. Não escreva código antes da aprovação
explícita do plano. Não trabalhe direto na `main`.

**Fato:** a validação automatizada é um smoke test de DOM stubado que o usuário decidiu **não
versionar** (2026-08-30) — o repositório segue sem testes, sem script `npm test` e com a linha
"Testes: Não existem" do `AGENTS.md` intacta.
**Por quê:** manter o projeto sem infraestrutura de teste; a prova da correção vai no relatório
e na PR, não no repo.
**Como aplicar:** recrie o harness no scratchpad quando precisar (`vm.createContext` + stub de
`document`, carregando `src/main.js` como texto e expondo o que precisar num epílogo), rode-o e
**cole a saída real** no relatório — ela é a única evidência que sobrevive à sessão.

**Fato:** o markdown do projeto deve ser breve e objetivo; arquivos acima de 200 linhas são
quebrados e indexados em um mapa carregado sob demanda.
**Como aplicar:** ver skill `memoria-do-projeto`.
