# Sistema Content — Ono Pocket

## 1. Objetivo

Fornecer infraestrutura data-driven para definições de conteúdo do jogo sem espalhar lógica específica por rotas e serviços, preservando compatibilidade e histórico quando o conteúdo evoluir.

---

## 2. Responsabilidades

- Carregar e validar definições declarativas de conteúdo oficial.
- Fornecer catálogos tipados para Work, OnoGenerator, sistema visual e sistemas futuros.
- Versionar conjuntos de conteúdo que influenciam resultados persistentes.
- Manter IDs estáveis.
- Futuramente unificar tratamento de conteúdo oficial e mods sem conceder aos mods acesso direto às engines ou carteiras.

---

## 3. Conteúdo vs. Regra de Engine

`Content` descreve dados. A engine interpreta esses dados conforme regras estáveis.

Evitar:

```text
if work.type == mining
  reward = 100
```

Preferir uma definição como:

```json
{
  "id": "work-transport-material-01",
  "version": "1",
  "name": "Transporte de Materiais",
  "durationSeconds": 600,
  "requirements": {
    "minStage": "young"
  },
  "desirableAttributes": {
    "strength": 0.5,
    "resistance": 0.3
  },
  "rewards": {
    "baseCoins": 80
  },
  "wear": {
    "energyCost": 15,
    "stressCost": 5
  },
  "source": "official",
  "sourceId": "official"
}
```

O fato de um campo declarar recompensa não concede moeda automaticamente; Work/Economy validam e processam a concessão.

---

## 4. Fontes

Cada definição registra origem:
- `source`: `official` ou `mod` futuramente;
- `sourceId`: identificador da origem;
- `definitionVersion`: versão da definição;
- quando necessário, `contentVersion`: versão/hash do conjunto de catálogo utilizado.

IDs de conteúdo não devem ser reutilizados para significados incompatíveis.

---

## 5. Versionamento e Histórico

Conteúdo mutável não pode alterar silenciosamente operações já iniciadas ou entidades históricas.

Por isso:
- Cultivation guarda `contentVersion` e snapshots relevantes.
- Ono guarda metadados de geração e composição persistida.
- WorkAssignment guarda versão/snapshot da definição usada.
- PaymentOrder guarda snapshots de preço e créditos, embora catálogo comercial pertença a Commerce.

Ao editar conteúdo, criar nova versão quando a mudança puder alterar resultados ou interpretação histórica.

---

## 6. Validação

Conteúdo deve passar por:
- schema tipado;
- validações semânticas;
- referências válidas;
- limites definidos pela engine/GameConfig;
- compatibilidade de versão;
- políticas de origem (oficial/mod).

Dados inválidos não devem ser parcialmente ativados.

---

## 7. Persistência

A implementação pode usar:
- arquivos versionados no repositório;
- tabelas no banco;
- ou modelo híbrido.

No MVP, preferir a alternativa mais simples e testável. A escolha física não altera o contrato: o consumidor recebe definições validadas e versionadas.

---

## 8. Relação com Mods

Mods futuros utilizam os mesmos schemas base sempre que possível, mas passam por políticas adicionais de namespace, segurança, compatibilidade e impacto econômico.

Conteúdo oficial e de mod podem compartilhar formato sem possuir as mesmas permissões.

---

## 9. Status

- **Core / MVP:** conteúdo oficial data-driven e versionado.
- **Future:** importação/carregamento de conteúdo externo de mods.
