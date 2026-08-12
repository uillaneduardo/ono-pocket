# Sistema Laboratory — Ono Pocket

## 1. Objetivo

Gerenciar as instalações, capacidade física, incubadoras, habitats e melhorias (`Upgrades`) do laboratório de cada jogador.

---

## 2. Responsabilidades

- Controlar os limites de capacidade de Onos mantidos simultaneamente pelo jogador.
- Gerenciar os slots de incubadoras e habitats disponíveis.
- Processar compras de melhorias do laboratório (`LaboratoryUpgrade`).

---

## 3. Entidades de Domínio

### Incubator
- `id`: UUID.
- `laboratoryId`: UUID.
- `slotIndex`: Integer.
- `isUnlocked`: Boolean.
- `currentCultivationId`: UUID (Opcional, apontando para cultivo ativo).

### LaboratoryUpgrade
- `id`: UUID.
- `playerId`: UUID.
- `upgradeType`: String (ex: `INCUBATOR_SLOT_2`, `HABITAT_CAPACITY_EXPANSION`).
- `level`: Integer.
- `purchasedAt`: DateTime.

---

## 4. Regras e Limites

1. **Capacidade Inicial do MVP:**
   - 1 Incubadora desbloqueada por padrão.
   - Capacidade para até 3 Onos ativos no laboratório.
2. **Expansão:** O desbloqueio da segunda incubadora e expansão do laboratório exige pagamento em moedas do jogo (`Coins`) via sistema de Economia.
3. **Validação de Espaço:** Um novo cultivo não pode ser iniciado se todas as incubadoras desbloqueadas estiverem ocupadas ou se o limite de Onos do laboratório tiver sido atingido.

---

## 5. Status

- **Maturidade:** Core / MVP.
