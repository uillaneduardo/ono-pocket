# Sistema Economy — Ono Pocket

## 1. Objetivo

Gerenciar a economia interna do jogo (**Coins**), mantendo um livro razão (*ledger*) auditável e garantindo a integridade de todas as transações financeiras virtuais.

---

## 2. Responsabilidades

- Controlar o saldo da moeda interna (`Coins`) de cada jogador.
- Processar débitos (custo de cultivo, compra de upgrades de laboratório) e créditos (pagamento de trabalhos).
- Registrar cada movimentação financeira em um histórico atômico/ledger com origem identificada (`source` e `sourceId`).
- Impedir qualquer alteração direta ou desautorizada no saldo do jogador.

---

## 3. Entidades de Domínio

### PlayerWallet
- `playerId`: UUID (Chave primária).
- `coinsBalance`: BigInt / Integer (Saldo atual de Coins, padrão `>= 0`).
- `updatedAt`: DateTime.

### Transaction
- `id`: UUID (Chave primária).
- `playerId`: UUID (Chave estrangeira).
- `amount`: Integer (Valor positivo para crédito, negativo para débito).
- `balanceAfter`: Integer (Saldo do jogador após a transação).
- `currency`: Enum (`COINS`).
- `source`: Enum (`CULTIVATION_COST`, `WORK_REWARD`, `LABORATORY_UPGRADE`, `INITIAL_GRANT`, `ADMIN_ADJUSTMENT`).
- `sourceId`: String (Identificador único do evento que originou a transação, ex: `WORK-ASSIGNMENT-UUID`).
- `createdAt`: DateTime.

---

## 4. Estrutura Exemplar do Ledger

```text
Transaction #1:
  playerId: "p-1001"
  amount: +200
  balanceAfter: 200
  source: "INITIAL_GRANT"
  sourceId: "SYSTEM-INIT"

Transaction #2:
  playerId: "p-1001"
  amount: -50
  balanceAfter: 150
  source: "CULTIVATION_COST"
  sourceId: "CULT-908"

Transaction #3:
  playerId: "p-1001"
  amount: +120
  balanceAfter: 270
  source: "WORK_REWARD"
  sourceId: "WORK-504"
```

---

## 5. Regras de Integridade Financeira

1. **Vedação a Alterações Diretas:** Nenhuma função de serviço ou rota pode executar `UPDATE player_wallet SET balance = ...` sem gerar a entrada correspondente na tabela `transactions`.
2. **Proibição de Saldo Negativo:** Nenhuma operação de débito pode ser concluída se o saldo atual for inferior ao valor debitado.
3. **Idempotência por `sourceId`:** Duas transações com a mesma moeda, mesmo `source` e mesmo `sourceId` são rejeitadas para evitar duplicidade de recompensas ou cobranças.
4. **Isolamento de Créditos Premium:** A moeda interna (`Coins`) é totalmente separada de moedas compradas com dinheiro real (`PremiumCredits`, tratadas no sistema de Commerce).

---

## 6. Status

- **Maturidade:** Core / MVP.
