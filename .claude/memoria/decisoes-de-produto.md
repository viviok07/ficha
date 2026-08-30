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

**O PDF é uma ficha só, ocupando a página A4 inteira** (2026-08-30). Faixa no topo, conteúdo do
personagem à esquerda (58%), retrato **dentro** da moldura à direita (42%) e a história numa faixa
de largura inteira embaixo. O layout antigo, de quadrantes com a metade de baixo em branco, foi
abandonado a pedido do usuário.
**Regras que vieram junto:** a história cresce até um teto e as colunas de cima ficam com a altura
restante (curta não deixa buraco, longa não empurra nada para fora); conteúdo demais **reduz a
ficha inteira proporcionalmente**, nunca trunca texto e nunca vira uma segunda página; retrato com
outra proporção é encaixado inteiro e centralizado, sem cortar as bordas; GERAR PDF continua
exigindo imagem carregada — não existe estado "sem retrato".
**Como aplicar:** tudo isso vive no clone montado por `buildPdfSheet()`; a ficha da tela não muda.

**O prompt do retrato é texto corrido, e o estilo é escolha literal do usuário.** Sem JSON
anexado, sem rótulos campo a campo — a única parte rotulada é o bloco final
`Informações adicionais:`, que carrega a História. O bloco `IMAGE_STYLE` reproduz as definições
que o usuário passou, **com os nomes de estúdio** ("Pixar/Disney-like appeal"): ele escolheu
mantê-los; a ressalva "eu evitaria colocar nomes de estúdios" era comentário dele para quem
monta o prompt, não texto a enviar ao gerador.
**Ficam de fora de propósito:** `player`, o nome do personagem e as habilidades. Aparência entra
**inteira** (todos os grupos), por ordem explícita.
**Como aplicar:** não "melhore" o estilo nem reintroduza o JSON sem pedido; ao criar campo novo,
decida conscientemente se ele entra no prompt.

**O Guia do Aventureiro (`guia.html`) e o app são coisas separadas de propósito** (2026-08-30).
O guia veio pronto de fora do repositório (foi escrito para virar um Artifact) e entrou como
página estática, com CSS e JS próprios; no repositório ele só ganhou o esqueleto HTML que faltava.
**Por quê:** ele é material de leitura/impressão para a criança, não uma tela do app — e precisa
abrir por `file://`, sem servidor.
**Como aplicar:** não unifique o CSS dele com `src/style.css` nem o converta em passo do app. As
quebras de página são **manuais** — tentativas de automatizá-las erraram o alvo e foram
descartadas; quem edita cola `<div class="pagebreak"></div>` no ponto exato (nas listas geradas
por JS, usa a constante `NOVA_FOLHA`). Não reintroduza `break-before: page` fixo por seção ou
por classe. Qualquer edição no conteúdo do guia exige reconferir o preview de impressão — e esse preview
só vale aberto direto no navegador (`file://` ou pasta servida): nenhum navegador aplica quebra
de página de conteúdo em `iframe`, então visualizadores embutidos mentem sobre o resultado.

Relacionado: `docs/MODELO_DE_DADOS.md`, `docs/INTEGRACAO_IMAGEM.md`, `docs/UI_E_ESTILOS.md`.
