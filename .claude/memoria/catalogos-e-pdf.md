# Catálogos de características e o PDF econômico

**Nenhum `trait` é bônus de atributo — nem de raça, nem de classe.** Em 2026-08-30 o usuário
mandou retrabalhar as duas listas: 4 itens cada, sempre característica **descrita**
("Força sobre-humana"), nunca `+2 Força` nem "bônus em um atributo" por extenso.
**Por quê:** é ficha para criança de ~9 anos; número de bônus não diz nada a ela, característica
contada em palavras diz.
**Como aplicar:** os números do jogo vivem **só** em `class.attributes` (escala 1–5) e no bloco
✧ ATRIBUTOS ✧. O usuário pediu explicitamente que essa tabela ficasse intacta — não a mexa ao
editar `traits`.

**Segunda passada (2026-08-30): "descrito" não bastava, tem de ser CENA.** O usuário rejeitou
"Aprende uma perícia extra" e "Talento para qualquer coisa" e mandou reescrever os 56 traços.
**Critério aceito:** a criança consegue ver a cena ("Escala parede com as garras"). Reprovado:
jargão de regra ("perícia") e qualidade vaga ("Fé inabalável", "Curiosidade sem fim").
**Como aplicar:** verbo de ação, ≤27 caracteres, e o `guia.html` repete os mesmos traços em
minúsculas separados por ` · ` — atualize os dois ou eles divergem em silêncio.

**A classe ganhou `traits` espelhando o da raça.** Passo 2 mostra "Características:"; a ficha
mostra "CARACTERÍSTICAS DA CLASSE" logo abaixo da seção da raça.
**Como aplicar:** `characterJson()` embute o objeto de classe inteiro, então os `traits` entram
no JSON exportado sozinhos; a importação re-resolve pelo `id` via `normalizeId()`, então trocar
o texto de um `trait` **não** quebra ficha salva — ela passa a exibir o texto novo.

**No PDF a ficha é preto e branco, o retrato não.** `applyPrintTheme()` injeta o tema no
`clonedDocument` do `onclone` do html2canvas.
**Por quê:** o usuário imprime as fichas e o fundo bege mais a faixa em gradiente escuro gastavam
tinta demais. Os emojis ficaram coloridos **de propósito** (nada de `filter: grayscale`).
**Como aplicar:** o tema vive só no clone — nunca mude a ficha da tela para "ajudar" o PDF.

**"Dourado" saiu de `hairColor`, substituído por "Loiro".** O usuário escolheu substituir mesmo
avisado de que fichas antigas referenciam o valor.
**Consequência real (verificada):** `normalizeAppearance()` valida a **chave**, não o valor, então
"Dourado" sobrevive em `state.appearance`, aparece na ficha e no prompt — só não fica marcado no
passo 4. Aceito como está; não existe migração e não é para criar uma.

Relacionado: `docs/MODELO_DE_DADOS.md`, `docs/INTEGRACAO_IMAGEM.md`.
