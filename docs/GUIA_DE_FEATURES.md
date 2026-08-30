# Guia de features — receitas de implementação

Cada receita lista **exatamente** os pontos do código a tocar. Siga a ordem indicada.
Antes de começar, leia [ARQUITETURA.md](ARQUITETURA.md#o-ciclo-de-vida-o-coração-do-sistema).

Checklist final, válido para toda receita:

```
1. npm run build                  # node --check src/main.js
2. abrir index.html no navegador
3. percorrer os 6 passos e conferir a ficha lateral
4. SALVAR FICHA -> IMPORTAR JSON  # garante round-trip da exportação
```

---

## 1. Adicionar uma raça

**Toque só em:** array `races` ([src/main.js:1](../src/main.js#L1)).

```js
{ id: 'orc', name: 'Orc', icon: '🪓',
  description: 'Grandalhão de coração valente, forte como um urso e leal aos amigos.',
  traits: ['Força de urso', 'Pele grossa', 'Grito de guerra', 'Leal até o fim'] },
```

São **4 `traits`**, sempre característica descrita — nunca bônus de atributo.
Nada mais é necessário: o grid, o bloco de informações e a ficha leem do array.
Opcional: adicionar `.p7 .choice-art { background: linear-gradient(...); }` em
[src/style.css:237](../src/style.css#L237) para dar cor própria ao card (o índice da classe CSS
é a posição no array).

## 2. Adicionar uma classe

**Toque em dois lugares, nesta ordem:**

1. `classes` ([src/main.js:11](../src/main.js#L11)) — `id`, `name`, `icon`, `description`,
   `attributes` (4 chaves, escala 1–5) e **4 `traits`** (descritos, nunca bônus de atributo).
2. `skillCatalog` ([src/main.js:21](../src/main.js#L21)) — **obrigatório**, com a mesma chave do
   `id` da classe, `type` (`'manobras'` ou `'magias'`), `singular` e **5 `options`**.
3. `equipmentCatalog` ([src/main.js:126](../src/main.js#L126)) — **obrigatório**, mesma chave do
   `id`, um array de **9 opções** misturando vestimenta e equipamento principal.

Sem o passo 2 a aplicação quebra no passo 3 (`selectedSkillCatalog()` retorna `undefined`); sem o
passo 3 o campo de equipamento do passo 5 fica preso no texto de espera.

## 3. Adicionar ou trocar uma habilidade

**Toque só em:** `skillCatalog[<classe>].options`.

Mantenha 5 opções por classe ou ajuste também a frase "Escolha 2 ... dentre as 5 disponíveis" em
`renderSkillsStep()` ([src/main.js:315](../src/main.js#L315)).
Não renomeie ids existentes — fichas salvas os referenciam.

## 4. Mudar o limite de habilidades, personalidade ou equipamento

Os três limites já são constantes em [src/main.js:187](../src/main.js#L187): `SKILL_LIMIT` (2),
`PERSONALITY_LIMIT` (3) e `EQUIPMENT_LIMIT` (2). Mudar a constante já acerta o handler
(`toggleChoice`), a importação (`normalizeChoices`) e o contador exibido no rótulo do campo.

Sobra apenas o **texto escrito à mão**:

| Onde | O que conferir |
| --- | --- |
| `steps` ([src/main.js:178](../src/main.js#L178)) | `subtitle: 'Escolha 2 opções'` do passo 3 |
| `renderSkillsStep()` | as frases "Escolha 2 …" e `(${selectedCount}/2)` |
| `renderClassStep()` | "Você escolhe até N desses equipamentos no passo 5" já usa a constante |

## 5. Adicionar um grupo de aparência

**Toque em:** `appearanceGroups` ([src/main.js:101](../src/main.js#L101)) **e** no padrão
`state.appearance` ([src/main.js:207](../src/main.js#L207)).

```js
// appearanceGroups
{ key: 'capa', title: 'Capa', icon: '🧣', options: ['Sem capa', 'Curta', 'Longa'] },

// state.appearance — sempre '' : nada vem pré-selecionado
capa: '',
```

O passo 4, a ficha (que omite a linha enquanto o valor for `''`), a exportação **e o prompt do
retrato** passam a incluir o grupo automaticamente: `buildImagePrompt()`
([src/main.js:577](../src/main.js#L577)) percorre `appearanceGroups` e ignora os vazios. Nada mais
a fazer.

## 6. Adicionar um campo de texto ao personagem

Exemplo: um campo `motivacao`.

1. `state.motivacao = ''` ([src/main.js:200](../src/main.js#L200)) — campo novo **sempre** começa
   vazio.
2. Em `renderStoryStep()` ([src/main.js:366](../src/main.js#L366)), um controle com `data-field`:
   ```html
   <label class="field">Motivação<textarea data-field="motivacao">${escapeHtml(state.motivacao)}</textarea></label>
   ```
   O handler genérico de `data-field` já cuida do resto — não mexa em `bindEvents()`. O foco
   também já é preservado: `focusSelector()` reconhece qualquer `data-field`.
3. `characterJson()` ([src/main.js:238](../src/main.js#L238)) — adicione `motivacao: state.motivacao`.
4. `loadCharacter()` ([src/main.js:496](../src/main.js#L496)) — `state.motivacao = data.motivacao || state.motivacao;`.
5. `renderSheet()` ([src/main.js:460](../src/main.js#L460)) — se o campo deve aparecer na ficha,
   emita o bloco no próprio template e **passe o valor por `escapeHtml()`**. `sheetStory()` serve
   só à história: é ela que marca os nós com `data-story` para o layout do PDF.
6. Opcional: incluir no prompt em `buildImagePrompt()` — lá o texto é corrido, então monte a frase
   com `listar()` e só a acrescente quando tiver conteúdo; todo campo vazio é omitido.

## 7. Adicionar um passo novo ao wizard

1. `steps` ([src/main.js:178](../src/main.js#L178)) — `{ id: 'novo', number: 7, title, subtitle }`
   e renumere os seguintes, se necessário.
2. Escreva `renderNovoStep()` seguindo o padrão dos irmãos: `<section class="panel current-panel">`,
   título `✦ N. TÍTULO ✦`, um parágrafo de instrução, o conteúdo e, no fim,
   `renderNavButtons(proximoId, anteriorId)`.
3. `renderCurrentStep()` ([src/main.js:337](../src/main.js#L337)) — adicione
   `if (state.step === 'novo') return renderNovoStep();` **antes** do `return renderStoryStep()`
   final, que funciona como fallback.
4. Ajuste os `renderNavButtons()` dos passos vizinhos para apontarem para o novo id.
5. Confira `.steps { grid-template-columns: repeat(6, ...) }` em
   [src/style.css:534](../src/style.css#L534) (media query mobile) — o número precisa bater com a
   quantidade de passos.

Todo passo precisa funcionar com o estado vazio: mostre um texto de espera em `.info.empty` em
vez de acessar `selectedRace().name` direto, e **não** bloqueie o botão PRÓXIMO PASSO.

Se o passo introduzir um tipo de interação que ainda não existe, registre um `data-*` novo em
`bindEvents()` seguindo o estilo das linhas vizinhas (um `querySelectorAll` + `addEventListener`
por linha, sempre terminando em `render()`).

## 8. Adicionar um botão de ação no cabeçalho

1. Em `render()` ([src/main.js:249](../src/main.js#L249)), dentro de `<div class="actions">`, um
   botão com `data-action="minha-acao"` e a classe `primary`, `ghost` ou `secondary`.
2. Em `bindEvents()`, na sequência dos outros:
   ```js
   $('[data-action="minha-acao"]')?.addEventListener('click', minhaAcao);
   ```
   O `?.` é intencional: o elemento não existe em todos os renders.
3. Implemente `minhaAcao()` no bloco de domínio/IO (perto de `downloadJson`), terminando com
   `render()` se alterar estado.

## 9. Mexer nos multi-selects (personalidade e equipamento)

Personalidade, equipamento e habilidades usam **as mesmas três peças**. Não existe mais campo de
texto com badges.

| Onde | Papel |
| --- | --- |
| `renderPickGrid(options, selecionados, atributo, classeDoGrid)` ([src/main.js:370](../src/main.js#L370)) | monta a grade de `.choice-card.pick-card` com o `✓` de selecionado |
| `renderPersonalityField()` / `renderEquipmentField()` ([src/main.js:378](../src/main.js#L378)) | rótulo, contador `n/limite` e a grade; o de equipamento mostra o texto de espera sem classe |
| `toggleChoice(chave, id, limite)` ([src/main.js:511](../src/main.js#L511)) | alterna, respeita o limite em silêncio e chama `render()` |
| `normalizeChoices(valor, opções, limite)` ([src/main.js:520](../src/main.js#L520)) | importação: aceita id ou objeto, descarta desconhecido e repetido, corta no limite |

Para criar um **quarto** multi-select basta um catálogo novo, uma lista em `state`, uma linha em
`bindEvents()` apontando para `toggleChoice` e uma classe de grid no CSS. Nenhuma lógica nova.

Cuidados:

- Se as opções dependerem da classe, zere a lista no handler de `data-class` (como
  `state.skills` e `state.equipment` já fazem) e valide contra o catálogo da classe atual.
- Em `loadCharacter()`, a linha do multi-select precisa vir **depois** de `state.class`.

## 10. Persistir a ficha entre sessões

Hoje não há persistência (`REINICIAR` apenas recarrega a página). Se o usuário pedir:

- Salve **apenas** `characterJson()` em `localStorage`. Nunca `imageState`: o retrato é um data
  URL de vários MB e foi deliberadamente deixado fora do que se salva.
- Carregue no bootstrap: antes da chamada final a `render()`, tente
  `loadCharacter(JSON.parse(localStorage.getItem('ficha')))` dentro de um `try/catch`.
- Faça `REINICIAR` limpar a chave do `localStorage` antes do `reload()`, senão o botão deixa de
  reiniciar de fato.

## 11. Mexer no prompt, no upload do retrato ou no PDF

Ver [INTEGRACAO_IMAGEM.md](INTEGRACAO_IMAGEM.md). Em resumo:

- **Prompt**: `buildImagePrompt()` ([src/main.js:577](../src/main.js#L577)) monta frases corridas
  e **omite todo campo vazio** — qualquer frase nova precisa do mesmo cuidado.
- **Cópia**: `copyPrompt()` tem três degraus (`navigator.clipboard` → `execCommand` → textarea
  selecionado). Não reduza para um só: a página roda por `file://`.
- **PDF**: `generatePdf()` depende de `window.html2canvas` e `window.jspdf`, carregados de
  [vendor/](../vendor/README.md). O layout de página inteira é montado por `buildPdfSheet()` +
  `fitPdfSheet()` sobre um clone do `<aside class="sheet">` — mudou a ficha, mudou o PDF.

---

## Anti-padrões a evitar neste repositório

- Adicionar `npm install`, bundler, TypeScript, React ou qualquer dependência. As duas de
  [vendor/](../vendor/README.md) são exceção já autorizada e não abrem precedente.
- Manipular o DOM diretamente (`element.textContent = ...`) em vez de mutar o estado e renderizar.
- Registrar listeners fora de `bindEvents()` — eles se perdem no próximo `render()`.
- Interpolar valor de usuário em HTML sem `escapeHtml()`.
- Usar `innerHTML` em subárvores para "otimizar" — quebra a premissa de que `render()` é a única
  fonte do DOM.
- Renomear ids já existentes de raça, classe, habilidade, personalidade ou equipamento.
- Textos de UI em inglês ou com jargão de regras de RPG.
- Pré-selecionar qualquer coisa para o usuário — nem valor padrão em `state`, nem fallback
  escondido em `normalizeChoices()`, nem "escolhe as 2 primeiras" ao trocar de classe.
