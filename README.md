# AI APP builder mpv

## Start


### Web
```
pnpm install
pnpm dev
```

### LLM

We are using [llama2](https://ollama.com/) here.

```
ollama run llama2
```

## Scope

### UI

The user should be able to add nodes and move nodes around.
There should be:
- Tool bar
- Canvas

Nodes type:
- TextInput
- TextOutput
- ImageInput(Optional)
- AIModel

### LLM 

- Mock LLM response
- Integrate with any LLM API

## Tasking

Components:

- Canvas: Drop area for nodes
- Node: Draggable node
    - TextInput
    - TextOutput
    - ImageInput
    - AIModel
- Toolbar

State:
- Node
  - id
  - type
  - position: {left, top}
  - data: {}
- Canvas
  - nodes: [Node]
  - links: [{source, target}]

Actions:
- Toolbar
  - Add TextInput Node
  - Add TextOutput Node
  - Add ImageInput Node
  - Add AIModel Node
- Canvas
  - Move nodes around
  - Connect nodes

Integrations:
- LLM API
  - Mock LLM API
  - Integrate with any LLM API

