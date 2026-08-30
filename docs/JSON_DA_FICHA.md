# JSON da ficha — estado e schema

O `state` em memória e o formato exato do arquivo que `SALVAR FICHA` baixa e `IMPORTAR JSON`
lê. Os catálogos que alimentam esses campos estão em [MODELO_DE_DADOS.md](MODELO_DE_DADOS.md).

## `state` — o personagem — [src/main.js:200](../src/main.js#L200)

```js
{
  step: 'race',            // id do passo ativo (UI, não serializado)
  name: '',                // string livre
  player: '',              // string livre
  age: '',                 // texto livre (ex.: "12 anos")
  gender: '',              // texto livre, sem placeholder na UI
  height: '',              // texto livre (ex.: "1,45 m") — NÃO confundir com appearance.height
  race: '',                // race.id, '' enquanto nada foi escolhido
  class: '',               // class.id, '' enquanto nada foi escolhido
  skills: [],              // até 2 skill.id da classe atual
  appearance: { skin, hair, hairColor, eyes, height, body, marks, accessory, style }, // só estas 9 chaves; rótulos, '' quando vazio
  personality: [],         // até 3 ids de personalityCatalog
  equipment: [],           // até 2 ids de equipmentCatalog[state.class]
  story: '',
}
```

**Tudo começa vazio.** A aplicação não pré-seleciona nada: nenhuma raça, classe, habilidade,
opção de aparência ou texto vem preenchido. Blocos de informação exibem um texto de espera
("Nenhuma raça escolhida ainda") e as seções vazias da ficha simplesmente não são renderizadas.
Isso obriga todo consumidor de `state.race`/`state.class` a tolerar `undefined` — use
`selectedRace()?.` / `selectedClass()?.` em vez de acessar direto.

`state.skills`, `state.personality` e `state.equipment` são as **três listas de ids** do sistema e
funcionam exatamente igual: clicar alterna, o limite é respeitado silenciosamente e a ordem é a de
seleção. Todas passam por `toggleChoice()` na UI e por `normalizeChoices()` na importação.

O retrato **não** mora em `state`: fica em `imageState.dataUrl` e não é serializado. Ver
[ARQUITETURA.md](ARQUITETURA.md#os-dois-objetos-de-estado).

---

## JSON exportado — `characterJson()` — [src/main.js:238](../src/main.js#L238)

`SALVAR FICHA` baixa `${state.name || 'personagem'}.json` com este formato (**objetos completos**
para raça, classe, habilidades, personalidade e equipamento, não apenas ids):

```json
{
  "name": "Lirien",
  "player": "Maria Eduarda",
  "age": "12 anos",
  "gender": "menina",
  "height": "1,45 m",
  "race":  { "id": "elfo", "name": "Elfo", "icon": "🌿", "description": "...", "traits": ["..."] },
  "class": { "id": "patrulheiro", "name": "Patrulheiro", "icon": "🏹", "description": "...",
             "attributes": { "forca": 3, "destreza": 5, "inteligencia": 3, "sabedoria": 5 } },
  "skills": [ { "id": "tiro-marcado", "name": "Tiro marcado", "icon": "🏹", "description": "..." } ],
  "appearance": { "skin": "Morena clara", "hair": "Longo", "hairColor": "Prateado", "eyes": "Verdes",
                  "height": "Média", "body": "Atlético", "marks": "Cicatriz no rosto",
                  "accessory": "Colar com pingente", "style": "Roupa da floresta" },
  "personality": [ { "id": "valente", "name": "Valente", "icon": "🦁", "description": "..." } ],
  "equipment": [ { "id": "arco-longo", "name": "Arco longo e aljava", "icon": "🏹", "description": "..." } ],
  "story": "..."
}
```

`race` e `class` saem como `null` enquanto nada foi escolhido, e as três listas podem vir vazias —
o JSON de uma ficha incompleta continua válido e importável. **O retrato nunca entra no JSON.**

Na importação, `loadCharacter()` aceita as duas formas — objeto completo ou id em string — para
`race`, `class` e cada item de `skills`, `personality` e `equipment`. Campos desconhecidos são
ignorados; campos ausentes mantêm o valor atual.

Em `appearance`, **só as 9 chaves de `appearanceGroups` são aceitas** — qualquer outra é
descartada em silêncio e o valor é convertido para texto. Isso vale também quando `appearance`
vem com o tipo errado (string, array, `null`): o objeto atual é preservado.

**Fichas salvas antes desta versão importam sem quebrar, mas perdem dois campos.** O `equipment`
antigo era uma string livre e a `personality` antiga era uma lista de traços digitados à mão:
nenhum dos dois casa com um id de catálogo, então `normalizeChoices()` os descarta e os campos
ficam vazios. `otherCharacteristics` deixou de existir e é simplesmente ignorado.

**Ao adicionar um campo novo ao personagem, atualize os três pontos:** `state` (valor padrão),
`characterJson()` (exportação) e `loadCharacter()` (importação). Esquecer um deles gera perda
silenciosa de dados. Se o campo deve aparecer no prompt do retrato, acrescente-o também a
`buildImagePrompt()` — lembrando que lá o texto é corrido e todo campo vazio é omitido.
