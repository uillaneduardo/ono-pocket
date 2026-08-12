# Sistema Content — Ono Pocket

## 1. Objetivo

Fornecer repositório e infraestrutura data-driven para armazenar e carregar definições de conteúdo do jogo (trabalhos, partes de Onos, itens, tabelas de experiência) sem hardcoded logic na engine.

---

## 2. Responsabilidades

- Evitar construções procedurais engessadas em código (ex: `if (work.type === 'mining') reward = 100`).
- Carregar definições declarativas de conteúdo a partir de arquivos JSON/YAML ou tabelas no banco.
- Unificar o tratamento de conteúdo oficial do jogo e conteúdo proveniente de Mods da comunidade.

---

## 3. Exemplo de Definição Declarativa (`WorkDefinition`)

```json
{
  "id": "work-transport-material-01",
  "name": "Transporte de Materiais",
  "category": "transport",
  "durationSeconds": 600,
  "requirements": {
    "minStage": "young",
    "minStrength": 10
  },
  "desirableAttributes": {
    "strength": 0.5,
    "resistance": 0.3
  },
  "rewards": {
    "baseCoins": 80,
    "baseExperience": 25
  },
  "wear": {
    "energyCost": 15,
    "stressCost": 5
  },
  "source": "official"
}
```

---

## 4. Estrutura de Fontes de Conteúdo

O repositório de conteúdo categoriza a origem de cada definição:
- `source`: Enum (`official`, `mod`).
- `sourceId`: String (`"official"` ou ID do mod, ex: `"example-mod"`).

---

## 5. Garantias e Vantagens

- **Testabilidade:** Trabalhos e componentes podem ser validados por schemas JSON antes da execução.
- **Extensibilidade:** A inclusão de novos trabalhos ou tipos de Onos não exige modificação nas rotas de API ou motores de cálculo.
- **Isolamento:** A engine apenas interpreta e aplica as regras declaradas nos arquivos de conteúdo.

---

## 6. Status

- **Maturidade:** Core / MVP (Suporte a conteúdos oficiais); Planned (Extensibilidade completa para mods).
