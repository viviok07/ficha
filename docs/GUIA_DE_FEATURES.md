# Guia de features — receitas de implementação

Cada receita lista **exatamente** os pontos do código a tocar. Siga a ordem indicada.
Antes de começar, leia [ARQUITETURA.md](ARQUITETURA.md#o-ciclo-de-vida-o-coração-do-sistema).

Checklist final, válido para toda receita:

```
1. npm run build                  # node --check src/main.js
2. abrir index.html no navegador
3. percorrer os 5 passos e conferir a ficha lateral
4. SALVAR FICHA -> IMPORTAR JSON  # garante round-trip da exportação
```

---

## 1. Adicionar uma raça

**Toque só em:** array `races` ([src/main.js:1](../src/main.js#L1)).

```js
{ id: 'orc', name: 'Orc', icon: '🪓',
  description: 'Grandalhão de coração valente, forte como um urso e leal aos amigos.',
  traits: ['+2 Força', 'Pele grossa', 'Grito de guerra'] },
```

Nada mais é necessário: o grid, o bloco de informações e a ficha leem do array.
Opcional: adicionar `.p7 .choice-art { background: linear-gradient(...); }` em
[src/style.css:235](../src/style.css#L235) para dar cor própria ao card (o índice da classe CSS
é a posição no array).

## 2. Adicionar uma classe

**Toque em dois lugares, nesta ordem:**

1. `classes` ([src/main.js:11](../src/main.js#L11)) — inclua `equipment` (array) e `attributes`
   com as quatro chaves `forca`, `destreza`, `inteligencia`, `sabedoria` (escala 1–5).
2. `skillCatalog` ([src/main.js:21](../src/main.js#L21)) — **obrigatório**, com a mesma chave do
   `id` da classe, `type` (`'manobras'` ou `'magias'`), `singular` e **5 `options`**.

Sem o passo 2 a aplicação quebra no passo 3 (`selectedSkillCatalog()` retorna `undefined`).

## 3. Adicionar ou trocar uma habilidade

**Toque só em:** `skillCatalog[<classe>].options`.

Mantenha 5 opções por classe ou ajuste também a frase "Escolha 2 ... dentre as 5 disponíveis" em
`renderSkillsStep()` ([src/main.js:315](../src/main.js#L315)).
Não renomeie ids existentes — fichas salvas os referenciam.

## 4. Mudar o limite de habilidades (ex.: 3 em vez de 2)

Quatro pontos, todos precisam concordar:

| Onde | O que mudar |
| --- | --- |
| `toggleSkill()` ([src/main.js:469](../src/main.js#L469)) | `state.skills.length < 2` |
| `normalizeSkills()` ([src/main.js:478](../src/main.js#L478)) | `.slice(0, 2)` |
| `missingCharacterFields()` ([src/main.js:551](../src/main.js#L551)) | `state.skills.length < 2` e o texto "2 habilidades" |
| Textos | `steps` (`subtitle: 'Escolha 2 opções'`) e as frases de `renderSkillsStep()`, incluindo `(${selectedCount}/2)` |

Extraia uma constante `const MAX_SKILLS = 2;` no topo se for mexer nisso — é a mudança mais
propensa a ficar inconsistente.

## 5. Adicionar um grupo de aparência

**Toque em:** `appearanceGroups` ([src/main.js:101](../src/main.js#L101)) **e** no padrão
`state.appearance` ([src/main.js:137](../src/main.js#L137)).

```js
// appearanceGroups
{ key: 'capa', title: 'Capa', icon: '🧣', options: ['Sem capa', 'Curta', 'Longa'] },

// state.appearance — sempre '' : nada vem pré-selecionado
capa: '',
```

O passo 4, a ficha (que omite a linha enquanto o valor for `''`), a exportação e a lista de
pendências de `missingCharacterFields()` passam a incluir o grupo automaticamente.
Para que ele influencie a imagem gerada, acrescente-o à frase "Aparência:" em
`buildImagePrompt()` ([src/main.js:534](../src/main.js#L534)) — o prompt lista as chaves
manualmente.

## 6. Adicionar um campo de texto ao personagem

Exemplo: um campo `motivacao`.

1. `state.motivacao = ''` ([src/main.js:137](../src/main.js#L137)) — campo novo **sempre** começa
   vazio.
2. Em `renderStoryStep()` ([src/main.js:335](../src/main.js#L335)), um controle com `data-field`:
   ```html
   <label class="field">Motivação<textarea data-field="motivacao">${escapeHtml(state.motivacao)}</textarea></label>
   ```
   O handler genérico de `data-field` já cuida do resto — não mexa em `bindEvents()`. O foco
   também já é preservado: `focusSelector()` reconhece qualquer `data-field`.
3. `characterJson()` ([src/main.js:170](../src/main.js#L170)) — adicione `motivacao: state.motivacao`.
4. `loadCharacter()` ([src/main.js:450](../src/main.js#L450)) — `state.motivacao = data.motivacao || state.motivacao;`.
5. `renderSheet()` ([src/main.js:358](../src/main.js#L358)) — se o campo deve aparecer na ficha,
   use `${sheetText('MOTIVAÇÃO', state.motivacao)}`, que já escapa o valor e omite a seção quando
   ela está vazia.
6. Opcional: incluir no prompt em `buildImagePrompt()` e na lista de obrigatórios de
   `missingCharacterFields()`.

## 7. Adicionar um passo novo ao wizard

1. `steps` ([src/main.js:113](../src/main.js#L113)) — `{ id: 'novo', number: 6, title, subtitle }`
   e renumere os seguintes, se necessário.
2. Escreva `renderNovoStep()` seguindo o padrão dos irmãos: `<section class="panel current-panel">`,
   título `✦ N. TÍTULO ✦`, um parágrafo de instrução, o conteúdo e, no fim,
   `renderNavButtons(proximoId, anteriorId)`.
3. `renderCurrentStep()` ([src/main.js:291](../src/main.js#L291)) — adicione
   `if (state.step === 'novo') return renderNovoStep();` **antes** do `return renderStoryStep()`
   final, que funciona como fallback.
4. Ajuste os `renderNavButtons()` dos passos vizinhos para apontarem para o novo id.
5. Se o passo for o quinto ou além, confira `.steps { grid-template-columns: repeat(5, ...) }`
   em [src/style.css:556](../src/style.css#L556) (media query mobile).

Todo passo precisa funcionar com o estado vazio: mostre um texto de espera em `.info.empty` em
vez de acessar `selectedRace().name` direto, e **não** bloqueie o botão PRÓXIMO PASSO.

Se o passo introduzir um tipo de interação que ainda não existe, registre um `data-*` novo em
`bindEvents()` seguindo o estilo das linhas vizinhas (um `querySelectorAll` + `addEventListener`
por linha, sempre terminando em `render()`).

## 8. Adicionar um botão de ação no cabeçalho

1. Em `render()` ([src/main.js:188](../src/main.js#L188)), dentro de `<div class="actions">`, um
   botão com `data-action="minha-acao"` e a classe `primary`, `ghost` ou `secondary`.
2. Em `bindEvents()`, na sequência dos outros:
   ```js
   $('[data-action="minha-acao"]')?.addEventListener('click', minhaAcao);
   ```
   O `?.` é intencional: o elemento não existe em todos os renders.
3. Implemente `minhaAcao()` no bloco de domínio/IO (perto de `downloadJson`), terminando com
   `render()` se alterar estado.

## 9. Mexer no campo de personalidade (badges)

`state.personality` é editado na aba História por um input que vira badge. As peças:

| Onde | Papel |
| --- | --- |
| `renderPersonalityField()` ([src/main.js:339](../src/main.js#L339)) | badges + `<input data-personality-input>` |
| `addPersonalityTrait()` ([src/main.js:487](../src/main.js#L487)) | apara, ignora vazio, recusa repetido (sem diferenciar maiúsculas) |
| `updatePersonalityDraft()` ([src/main.js:495](../src/main.js#L495)) | quebra o texto na vírgula; o resto vira `state.personalityDraft` |
| `commitPersonalityDraft()` ([src/main.js:506](../src/main.js#L506)) | confirma o pendente no `Enter`, no `blur` e antes de gerar a imagem |

Cuidados ao mexer aqui:

- O handler de `blur` precisa sair cedo quando `rendering` for `true` (o `blur` disparado pela
  troca do `innerHTML` confirmaria um traço a cada tecla) e adiar o `render()` com
  `setTimeout(render, 0)`, para o foco assentar no elemento clicado antes de o DOM ser recriado.
- Para trocar o separador (vírgula) mude só `updatePersonalityDraft()`; o resto não depende dele.
- Nada muda em `characterJson()`/`loadCharacter()`: o campo já era serializado.

## 10. Persistir a ficha entre sessões

Hoje não há persistência (`REINICIAR` apenas recarrega a página). Se o usuário pedir:

- Salve **apenas** `characterJson()` em `localStorage`, nunca `integration` (contém a chave de API).
- Carregue no bootstrap: antes da chamada final a `render()`, tente
  `loadCharacter(JSON.parse(localStorage.getItem('ficha')))` dentro de um `try/catch`.
- Faça `REINICIAR` limpar a chave do `localStorage` antes do `reload()`, senão o botão deixa de
  reiniciar de fato.

## 11. Mover a chamada da OpenAI para um backend

Ver [INTEGRACAO_IMAGEM.md](INTEGRACAO_IMAGEM.md#migrando-para-um-backend). Resumo: trocar a URL e
os headers em `generateCharacterImage()` ([src/main.js:575](../src/main.js#L575)) e remover o
campo de chave do `renderIntegrationGate()`. O resto do fluxo (loader, erro, `dataUrl`) não muda.

---

## Anti-padrões a evitar neste repositório

- Adicionar `npm install`, bundler, TypeScript, React ou qualquer dependência.
- Manipular o DOM diretamente (`element.textContent = ...`) em vez de mutar o estado e renderizar.
- Registrar listeners fora de `bindEvents()` — eles se perdem no próximo `render()`.
- Interpolar valor de usuário em HTML sem `escapeHtml()`.
- Usar `innerHTML` em subárvores para "otimizar" — quebra a premissa de que `render()` é a única
  fonte do DOM.
- Renomear ids de raça, classe ou habilidade já existentes.
- Textos de UI em inglês ou com jargão de regras de RPG.
- Pré-selecionar qualquer coisa para o usuário — nem valor padrão em `state`, nem fallback
  escondido em `normalizeSkills()`, nem "escolhe as 2 primeiras" ao trocar de classe.
