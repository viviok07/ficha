# Decisões de produto do criador de personagem

**A ficha começa do zero, sempre.** Nada de raça, classe, habilidade, aparência ou texto
pré-selecionado — nem por valor padrão no `state`, nem por fallback escondido.
**Por quê:** o usuário quer que a criança escolha tudo; autopreenchimento faz a criança aceitar
o padrão sem decidir e polui a ficha com dados que ninguém escolheu.
**Como aplicar:** ao mexer em `state`, `normalizeChoices()` ou nos handlers de escolha, nunca
"ajude" escolhendo por conta própria. Estado vazio mostra texto de espera; nunca trava o
botão PRÓXIMO PASSO, nem o acesso a um passo.

**Nada exige "ficha completa".** A regra `missingCharacterFields()` foi **removida**: copiar o
prompt e gerar o PDF funcionam com a ficha pela metade, e `buildImagePrompt()` apenas omite os
campos vazios.
**Por quê:** a trava existia para não desperdiçar chamadas pagas à OpenAI; sem API, ela só
atrapalhava. O único pré-requisito que restou é ter uma imagem carregada para gerar o PDF.

**Escolher, não digitar.** Personalidade (10 opções, até 3) e equipamento (5 por classe, até 2)
são grades de botões, no padrão da Aparência — nunca `<select multiple>`, que é ruim em tablet.
As opções de personalidade são **neutras em gênero** de propósito.
**Como aplicar:** um multi-select novo reusa `toggleChoice()` + `normalizeChoices()`.

**"Estatura" e "Altura" coexistem de propósito.** Estatura é o porte (Baixa/Média/Alta) do
passo 4; Altura é texto livre da aba História. O campo Gênero **não tem placeholder**: o usuário
pediu que nada fosse sugerido ali.
**Como aplicar:** não "unifique" os dois campos nem renomeie a chave `height`.

**O PDF é uma página A4 retrato com a metade de baixo em branco.** Ficha no quadrante superior
esquerdo, retrato no superior direito, os dois alinhados pelo topo.
**Por quê:** foi exatamente o que o usuário descreveu. Não é bug nem desperdício a "corrigir".

Relacionado: `docs/MODELO_DE_DADOS.md`, `docs/INTEGRACAO_IMAGEM.md`.
