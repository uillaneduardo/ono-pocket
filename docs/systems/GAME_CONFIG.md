# Sistema GameConfig — Ono Pocket

## 1. Objetivo

Centralizar a gestão e fornecimento dos parâmetros de balanceamento e configurações do jogo, evitando valores soltos (*magic numbers*) espalhados pelo código.

---

## 2. Responsabilidades

- Fornecer parâmetros padrão de balanceamento para Economia, Cultivo, Trabalho, Onos e Laboratório.
- Classificar parâmetros entre constantes técnicas, balanceamento e conteúdo administrável.
- Permitir ajustes dinâmicos e overrides persistidos sem necessidade de recompilar a aplicação.

---

## 3. Classificação dos Parâmetros

1. **Constantes Técnicas:** Imutáveis em tempo de execução (ex: `canvasLogicWidth = 64`, `maxLayerOrder = 200`).
2. **Parâmetros de Balanceamento:** Ajustáveis para refinar o jogo (ex: `economy.initialBalance = 200`, `work.energyCostMultiplier = 1.0`).
3. **Conteúdo Administrável:** Definições de catálogo que podem ser editadas pelo Game Admin (ex: tabelas de preços, pacotes de créditos).

---

## 4. Estrutura de Configurações Exemplar

```json
{
  "economy": {
    "initialBalance": 200,
    "rewardMultiplier": 1.0
  },
  "cultivation": {
    "baseCost": 50,
    "baseDurationSeconds": 1800,
    "maxActiveIncubatorsDefault": 1
  },
  "work": {
    "rewardMultiplier": 1.0,
    "energyCostMultiplier": 1.0,
    "baseRiskFactor": 0.05
  },
  "ono": {
    "energyRecoveryRatePerHour": 20,
    "maxBaseAttributePoints": 100
  }
}
```

---

## 5. Regras de Override e Precedência

O sistema determina o valor final de uma configuração seguindo a ordem de precedência:
1. **Override Ativo em Banco de Dados** (Ajuste administrativo mais recente).
2. **Variável de Ambiente** (Se explicitamente declarada no servidor).
3. **Valor Padrão em Código** (Arquivo de configuração padrão versionado no projeto).

---

## 6. Entradas e Saídas

### Entradas
- `getConfig(keyPath)`
- `setOverride(keyPath, value, adminUserId)`

### Saídas
- Valor tipado da configuração solicitada.

---

## 7. Invariantes e Segurança

- Alterações em `GameConfig` via overrides são auditadas (registram quem alterou, quando e o valor anterior).
- Validação estrita de tipos e limites (ex: `initialBalance` não pode ser negativo).
- Parâmetros técnicos imutáveis não podem sofrer overrides em tempo de execução.

---

## 8. Status

- **Maturidade:** Planned (Parâmetros padrão em código no MVP; overrides dinâmicos para fases posteriores).
