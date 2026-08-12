# Sistema Laboratory — Ono Pocket

## 1. Objetivo

Gerenciar instalações, capacidade, incubadoras, habitats e melhorias do laboratório pertencente ao jogador.

---

## 2. Responsabilidades

- Controlar capacidade física e slots desbloqueados.
- Disponibilizar incubadoras para Cultivation.
- Validar limites estruturais do laboratório.
- Processar upgrades através das regras de Economy/GameConfig.
- Não duplicar estados que pertencem a Cultivation, Work ou Ono.

---

## 3. Entidades Conceituais

### Laboratory
- `id`: UUID.
- `playerId`: UUID único.
- dados mínimos de capacidade necessários à versão atual.

### Incubator
- `id`: UUID.
- `laboratoryId`: UUID.
- `slotIndex`: Integer.
- `isUnlocked`: Boolean.

A ocupação da incubadora deve preferencialmente ser derivada da existência de um `Cultivation` ativo/ready associado a ela, com restrição de unicidade apropriada. Evitar manter simultaneamente `currentCultivationId` e outra fonte de verdade independente que possa divergir.

### LaboratoryUpgrade
- `id`: UUID.
- `playerId` ou `laboratoryId`: conforme schema final.
- `upgradeType`: ID estável da definição do upgrade.
- `level`: Integer.
- `purchasedAt`: DateTime.

Definições de preço/efeito de upgrades devem ser data-driven/configuráveis, não codificadas em condicionais de rota.

---

## 4. Regras e Limites

Valores iniciais são parâmetros de balanceamento, não invariantes arquiteturais.

Exemplo de MVP:
- uma incubadora inicialmente desbloqueada;
- capacidade limitada de Onos;
- possibilidade de desbloquear capacidade adicional com Coins.

Regras:
1. um novo cultivo exige incubadora desbloqueada e livre;
2. limites são validados no servidor;
3. compra de upgrade e débito em Economy devem ocorrer de forma consistente/idempotente;
4. alterações de GameConfig não devem remover retroativamente upgrades já adquiridos sem migração/regra explícita;
5. o laboratório não altera diretamente carteira, Cultivation ou Ono fora das interfaces dos respectivos sistemas.

---

## 5. Relações

```text
Player
  ↓
Laboratory
  ├── Incubators ──> Cultivation
  ├── Capacity ────> validação de novos Onos/cultivos
  └── Upgrades ────> Economy + GameConfig/Content
```

---

## 6. Status

- **Maturidade:** Core / MVP.
