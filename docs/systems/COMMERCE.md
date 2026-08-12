# Sistema Commerce & Monetização — Ono Pocket

## 1. Objetivo

Gerenciar a relação entre dinheiro real (BRL) e produtos digitais do Ono Pocket, incluindo futura aquisição de **PremiumCredits** por Pix, sem misturar processamento de pagamentos com a economia interna do jogo.

---

## 2. Responsabilidades

- Expor catálogo de produtos e pacotes (`CreditPackage`).
- Criar e acompanhar pedidos (`PaymentOrder`).
- Integrar provedores de pagamento através de `PaymentProvider`.
- Processar webhooks de forma autenticada, idempotente e auditável.
- Confirmar pedidos exclusivamente no servidor.
- Após pagamento confirmado, solicitar à `Economy` a concessão idempotente de `PremiumCredits`.
- Registrar estornos e estados de pagamento sem apagar histórico.

Commerce **não** altera diretamente saldos de carteira.

---

## 3. Entidades de Domínio

### CreditPackage
- `id`: String estável.
- `name`: String.
- `priceBrlCents`: Integer (`1000` = R$ 10,00).
- `premiumCreditsGranted`: Integer.
- `isActive`: Boolean.
- `version` ou `updatedAt`: usado para auditoria do catálogo.

### PaymentOrder
- `id`: UUID.
- `playerId`: UUID.
- `packageId`: String.
- `priceBrlCents`: Integer — snapshot do preço no momento da criação.
- `creditsToGrant`: Integer — snapshot da quantidade prometida.
- `status`: Enum (`pending`, `paid`, `cancelled`, `refunded`, `expired`, `failed`).
- `provider`: String.
- `providerTransactionId`: String único quando disponível.
- `pixPayload`: String/JSON contendo apenas dados necessários à exibição da cobrança, nunca credenciais.
- `expiresAt`: DateTime opcional.
- `createdAt`: DateTime.
- `paidAt`: DateTime opcional.
- `refundedAt`: DateTime opcional.

`PaymentOrder` preserva o valor e a quantidade de créditos prometidos mesmo que o catálogo seja alterado posteriormente.

---

## 4. Abstração PaymentProvider

```typescript
export interface PaymentProvider {
  createCharge(order: PaymentOrder): Promise<{
    providerTransactionId: string;
    pixQrCode: string;
    expiresAt: Date;
  }>;

  getCharge(providerTransactionId: string): Promise<{
    status: 'pending' | 'paid' | 'expired' | 'failed' | 'refunded';
    paidAt?: Date;
  }>;

  handleWebhook(payload: unknown, headers: Record<string, string>): Promise<{
    providerTransactionId: string;
    status: 'paid' | 'failed' | 'refunded';
  }>;

  refund(providerTransactionId: string): Promise<{
    status: 'requested' | 'refunded' | 'failed';
  }>;
}
```

A interface é conceitual; detalhes específicos do PSP ficam no adaptador de integração.

---

## 5. Fluxo de Cobrança Pix

```text
Player / Web Client
      ↓ packageId
Game Server / Commerce
      ↓ cria PaymentOrder com snapshots
PaymentProvider
      ↓
QR Code / Pix Copia e Cola
      ↓
Jogador paga
      ↓
PSP envia webhook ou API confirma cobrança
      ↓
Commerce valida provedor + estado + idempotência
      ↓
PaymentOrder = paid
      ↓
Economy.grantPremiumCredits(
  playerId,
  creditsToGrant,
  source = PIX_PURCHASE,
  sourceId = paymentOrderId
)
      ↓
Wallet + Transaction
```

A atualização do pedido e a concessão econômica devem ser coordenadas de modo que uma repetição do processamento nunca conceda créditos duas vezes.

---

## 6. Regras de Segurança Financeira

1. **Preço determinado no servidor:** cliente envia apenas o identificador do produto/pacote.
2. **Snapshot do pedido:** preço e créditos são copiados para o pedido no momento da criação.
3. **Cliente não confirma pagamento:** somente PSP/webhook validado ou verificação ativa server-side pode fazê-lo.
4. **Idempotência:** `providerTransactionId` e/ou `PaymentOrder.id` impedem processamento duplicado.
5. **Ledger obrigatório:** concessão e estorno de `PremiumCredits` passam pela Economy.
6. **Histórico preservado:** pedidos e transações financeiras não são apagados para “corrigir” saldo.
7. **Segredos server-side:** chaves, tokens, certificados e assinaturas de webhook nunca chegam ao frontend.
8. **Webhook público, porém autenticado:** caso Cloudflare Access proteja a aplicação, a rota de webhook precisa ser alcançável pelo PSP e protegida pelos mecanismos próprios do provedor, validação de payload, rate limiting e demais controles aplicáveis.
9. **Valor monetário em inteiros:** BRL é persistido em centavos; evitar `float` para valores financeiros.

---

## 7. Mods e Conteúdo Comunitário

Mods não podem:
- criar ou confirmar `PaymentOrder`;
- alterar preços em BRL;
- chamar `PaymentProvider`;
- conceder ou retirar `PremiumCredits`;
- definir produtos pagos sem fluxo administrativo oficial.

Marketplace comunitário pago, repasse a criadores e monetização de mods estão fora do escopo atual.

---

## 8. Status

- **Maturidade:** Planned.
- Nenhum PSP real deve ser integrado antes de uma SPEC própria de Commerce/Payments e revisão de requisitos legais, fiscais, privacidade e termos aplicáveis.
