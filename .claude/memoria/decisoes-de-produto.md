# Decisões de produto do criador de personagem

**A ficha começa do zero, sempre.** Nada de raça, classe, habilidade, aparência ou texto
pré-selecionado — nem por valor padrão no `state`, nem por fallback escondido.
**Por quê:** o usuário quer que a criança escolha tudo; autopreenchimento faz a criança aceitar
o padrão sem decidir e polui a ficha com dados que ninguém escolheu.
**Como aplicar:** ao mexer em `state`, `normalizeSkills()` ou nos handlers de escolha, nunca
"ajude" escolhendo por conta própria. Estado vazio mostra texto de espera; nunca trava o
botão PRÓXIMO PASSO.

**Gerar imagem exige a ficha inteira preenchida.** O passo 5 lista o que falta em vez de
mandar uma requisição incompleta.
**Por quê:** cada chamada à OpenAI é paga e uma ficha pela metade gera um retrato ruim.
**Como aplicar:** campo novo obrigatório entra também em `missingCharacterFields()`.

**"Estatura" e "Altura" coexistem de propósito.** Estatura é o porte (Baixa/Média/Alta) do
passo 4; Altura é texto livre da aba História.
**Por quê:** o usuário quis os dois e a chave `height` de `appearance` foi mantida para não
quebrar fichas JSON já salvas.
**Como aplicar:** não "unifique" os dois campos nem renomeie a chave.

Relacionado: `docs/MODELO_DE_DADOS.md`, `docs/INTEGRACAO_IMAGEM.md`.
