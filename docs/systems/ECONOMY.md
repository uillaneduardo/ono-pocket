# Sistema Economy — Ono Pocket

## 1. Objetivo

Gerenciar as moedas virtuais do jogo por meio de carteiras e um livro razão (*ledger*) auditável, garantindo integridade e rastreabilidade de toda movimentação.

---

## 2. Responsabilidades

- Controlar o saldo de `Coins` de cada jogador.
- Suportar `PremiumCredits` quando o sistema de Commerce for implementado.
- Processar créditos e débitos por serviços autorizados.
- Registrar cada movimentação em ledger com origem identificada.
- Impedir alteração direta e não auditada de saldo.
- Oferecer uma única fronteira de domínio para concessão e consumo de moedas virtuais.

---

## 3. Entidades de Domínio

### PlayerWallet
- `playerId`: UUID.
- `coinsBalance`: BigInt / Integer, sempre `>= 0`.
- `premiumCreditsBalance`: BigInt / Integer, sempre `>= 0` quando Commerce estiver habilitado.
- `updatedAt`: DateTime.

O modelo físico poderá separar saldos em tabelas distintas no futuro, mas conceitualmente pertencem à mesma fronteira de Economy.

### Transaction
- `id`: UUID.
- `playerId`: UUID.
- `currency`: Enum (`COINS`, `PREMIUM_CREDITS`).
- `amount`: Integer positivo para crédito e negativo para débito.
- `balanceAfter`: Integer.
- `source`: String/Enum controlado pelo servidor.
- `sourceId`: String que identifica a operação de origem.
- `metadata`: JSON opcional contendo apenas dados não sensíveis úteis para auditoria.
- `createdAt`: DateTime.

---

## 4. Exemplos do Ledger

```text
+200 COINS
source: INITIAL_GRANT
sourceId: player-onboarding:p-1001

-50 COINS
source: CULTIVATION_COST
sourceId: cultivation:cult-908

+120 COINS
source: WORK_REWARD
sourceId: work-assignment:work-504

+500 PREMIUM_CREDITS
source: PIX_PURCHASE
sourceId: payment-order:pay-220
```

---

## 5. Regras de Integridade Financeira

1. **Sem alteração direta:** saldo só muda através do serviço de Economy e da criação da respectiva `Transaction`.
2. **Saldo não negativo:** débitos são recusados quando não há saldo suficiente, salvo regra futura explicitamente documentada.
3. **Atomicidade:** alteração do saldo e criação do ledger ocorrem na mesma transação de banco.
4. **Idempotência:** uma operação econômica não pode ser aplicada duas vezes. A chave lógica deve considerar ao menos `playerId`, `currency`, `source` e `sourceId`.
5. **Origem obrigatória:** toda movimentação possui causa rastreável.
6. **Sem deleção corretiva:** estornos ou correções são novas movimentações inversas/compensatórias, não edição destrutiva do histórico.
7. **Autoridade do servidor:** cliente, mods e conteúdos declarativos nunca alteram carteira diretamente.

---

## 6. Relação com Commerce

`Commerce` gerencia produtos, pedidos e pagamentos reais. Após um pagamento validado, Commerce solicita a Economy uma operação idempotente de concessão de `PremiumCredits`.

```text
PaymentProvider
      ↓
Commerce confirma PaymentOrder
      ↓
Economy.grantPremiumCredits(...)
      ↓
Wallet + Transaction
```

Commerce não executa `UPDATE` direto na carteira.

---

## 7. Relação com Content e Mods

Conteúdo pode declarar recompensas econômicas apenas dentro de políticas aceitas pelo servidor. O motor de Economy é responsável por limites, validação e concessão efetiva.

Mods não têm permissão para conceder `Coins` ou `PremiumCredits` diretamente. Em servidores oficiais, qualquer conteúdo de mod com impacto econômico deve passar por regras/caps definidos pelo servidor ou aprovação administrativa explícita.

---

## 8. Status

- **Maturidade:** Core / MVP para `Coins` e ledger.
- **Planned:** suporte efetivo a `PremiumCredits`, ativado juntamente com Commerce.
