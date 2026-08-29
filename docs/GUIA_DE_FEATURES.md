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
`renderSkillsStep()` ([src/main.js:272](../src/main.js#L272)).
Não renomeie ids existentes — fichas salvas os referenciam.

## 4. Mudar o limite de habilidades (ex.: 3 em vez de 2)

Quatro pontos, todos precisam concordar:

| Onde | O que mudar |
| --- | --- |
| `toggleSkill()` ([src/main.js:371](../src/main.js#L371)) | `state.skills.length < 2` |
| handler `data-class` em `bindEvents()` ([src/main.js:324](../src/main.js#L324)) | `.slice(0, 2)` |
| `normalizeSkills()` ([src/main.js:380](../src/main.js#L380)) | `.slice(0, 2)` e o fallback `availableIds.slice(0, 2)` |
| Textos | `steps` (`subtitle: 'Escolha 2 opções'`) e as frases de `renderSkillsStep()`, incluindo `(${selectedCount}/2)` |

Extraia uma constante `const MAX_SKILLS = 2;` no topo se for mexer nisso — é a mudança mais
propensa a ficar inconsistente.

## 5. Adicionar um grupo de aparência

**Toque em:** `appearanceGroups` ([src/main.js:101](../src/main.js#L101)) **e** no padrão
`state.appearance` ([src/main.js:136](../src/main.js#L136)).

```js
// appearanceGroups
{ key: 'capa', title: 'Capa', icon: '🧣', options: ['Sem capa', 'Curta', 'Longa'] },

// state.appearance
capa: 'Sem capa',
```

O passo 4, a ficha e a exportação passam a incluir o grupo automaticamente.
Para que ele influencie a imagem gerada, acrescente-o à frase "Aparência:" em
`buildImagePrompt()` ([src/main.js:404](../src/main.js#L404)) — o prompt lista as chaves
manualmente.

## 6. Adicionar um campo de texto ao personagem

Exemplo: um campo `motivacao`.

1. `state.motivacao = 'Valor padrão'` ([src/main.js:136](../src/main.js#L136)).
2. Em `renderStoryStep()` ([src/main.js:288](../src/main.js#L288)), um controle com `data-field`:
   ```html
   <label class="field">Motivação<textarea data-field="motivacao">${escapeHtml(state.motivacao)}</textarea></label>
   ```
   O handler genérico de `data-field` já cuida do resto — não mexa em `bindEvents()`.
3. `characterJson()` ([src/main.js:165](../src/main.js#L165)) — adicione `motivacao: state.motivacao`.
4. `loadCharacter()` ([src/main.js:358](../src/main.js#L358)) — `state.motivacao = data.motivacao || state.motivacao;`.
5. `renderSheet()` ([src/main.js:304](../src/main.js#L304)) — se o campo deve aparecer na ficha,
   siga o padrão `<h3>MOTIVAÇÃO</h3><p>${escapeHtml(state.motivacao)}</p>`.
6. Opcional: incluir no prompt em `buildImagePrompt()`.

## 7. Adicionar um passo novo ao wizard

1. `steps` ([src/main.js:113](../src/main.js#L113)) — `{ id: 'novo', number: 6, title, subtitle }`
   e renumere os seguintes, se necessário.
2. Escreva `renderNovoStep()` seguindo o padrão dos irmãos: `<section class="panel current-panel">`,
   título `✦ N. TÍTULO ✦`, um parágrafo de instrução, o conteúdo e, no fim,
   `renderNavButtons(proximoId, anteriorId)`.
3. `renderCurrentStep()` ([src/main.js:248](../src/main.js#L248)) — adicione
   `if (state.step === 'novo') return renderNovoStep();` **antes** do `return renderStoryStep()`
   final, que funciona como fallback.
4. Ajuste os `renderNavButtons()` dos passos vizinhos para apontarem para o novo id.
5. Se o passo for o quinto ou além, confira `.steps { grid-template-columns: repeat(5, ...) }`
   em [src/style.css:500](../src/style.css#L500) (media query mobile).

Se o passo introduzir um tipo de interação que ainda não existe, registre um `data-*` novo em
`bindEvents()` seguindo o estilo das linhas vizinhas (um `querySelectorAll` + `addEventListener`
por linha, sempre terminando em `render()`).

## 8. Adicionar um botão de ação no cabeçalho

1. Em `render()` ([src/main.js:178](../src/main.js#L178)), dentro de `<div class="actions">`, um
   botão com `data-action="minha-acao"` e a classe `primary`, `ghost` ou `secondary`.
2. Em `bindEvents()`, na sequência dos outros:
   ```js
   $('[data-action="minha-acao"]')?.addEventListener('click', minhaAcao);
   ```
   O `?.` é intencional: o elemento não existe em todos os renders.
3. Implemente `minhaAcao()` no bloco de domínio/IO (perto de `downloadJson`), terminando com
   `render()` se alterar estado.

## 9. Editar a personalidade pela UI (feature pendente mais evidente)

`state.personality` é um array de strings que aparece na ficha e no prompt, mas não tem tela.
Caminho recomendado, sem sair do padrão do projeto:

1. Criar um catálogo `personalityTraits = ['Observadora', 'Corajosa', ...]` junto dos outros.
2. No passo de História (ou num passo novo), renderizar `.pill-choice` com
   `data-personality="<traço>"` e a classe `selected` quando `state.personality.includes(traço)`.
3. Em `bindEvents()`, um handler que faz toggle no array (espelhe `toggleSkill()`) e chama `render()`.
4. Nenhuma mudança em `characterJson()`/`loadCharacter()` é necessária — o campo já é serializado.

## 10. Persistir a ficha entre sessões

Hoje não há persistência (`REINICIAR` apenas recarrega a página). Se o usuário pedir:

- Salve **apenas** `characterJson()` em `localStorage`, nunca `integration` (contém a chave de API).
- Carregue no bootstrap: antes da chamada final a `render()`, tente
  `loadCharacter(JSON.parse(localStorage.getItem('ficha')))` dentro de um `try/catch`.
- Faça `REINICIAR` limpar a chave do `localStorage` antes do `reload()`, senão o botão deixa de
  reiniciar de fato.

## 11. Mover a chamada da OpenAI para um backend

Ver [INTEGRACAO_IMAGEM.md](INTEGRACAO_IMAGEM.md#migrando-para-um-backend). Resumo: trocar a URL e
os headers em `generateCharacterImage()` ([src/main.js:421](../src/main.js#L421)) e remover o
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
