# Sistema Commerce & Monetização — Ono Pocket

## 1. Objetivo

Gerenciar a relação entre dinheiro real (BRL) e a aquisição de produtos virtuais ou créditos premium (**PremiumCredits**), suportando cobranças via Pix com integração assíncrona e segura.

---

## 2. Responsabilidades

- Oferecer o catálogo de loja e pacotes de créditos premium (`CreditPackages`).
- Processar a criação de pedidos de pagamento (`PaymentOrders`).
- Interagir com provedores de pagamento via abstração `PaymentProvider` (ex: Pix).
- Processar e validar webhooks de pagamento de forma segura e idempotente.
- Creditar `PremiumCredits` na carteira do jogador exclusivamente após a confirmação server-side do pagamento.

---

## 3. Entidades de Domínio

### CreditPackage
- `id`: String (ex: `"pack-pix-100"`).
- `name`: String (ex: `"Pacote de Créditos Inicial"`).
- `priceBrl`: Integer (Preço em centavos, ex: `1000` = R$ 10,00).
- `premiumCreditsGranted`: Integer (Quantidade de Créditos Premium concedidos).
- `isActive`: Boolean.

### PaymentOrder
- `id`: UUID (Chave primária).
- `playerId`: UUID.
- `packageId`: String.
- `priceBrl`: Integer (Preço no momento do pedido).
- `creditsToGrant`: Integer.
- `status`: Enum (`pending`, `paid`, `cancelled`, `refunded`, `expired`).
- `provider`: String (ex: `"MOCK_PIX"`, `"GERENCIANET"`, `"MERCADOPAGO"`).
- `providerTransactionId`: String (ID do pagamento no gateway).
- `pixQrCode`: String (Texto do QR Code Pix / Copia e Cola).
- `createdAt`: DateTime.
- `paidAt`: DateTime (Opcional).

### PremiumWallet
- `playerId`: UUID (Chave primária).
- `premiumCreditsBalance`: Integer (Saldo de créditos comprados com dinheiro real).
- `updatedAt`: DateTime.

---

## 4. Abstração `PaymentProvider`

Para evitar o acoplamento do Ono Pocket a um gateway de pagamento específico, as integrações de pagamento usam a seguinte interface conceitual no backend:

```typescript
export interface PaymentProvider {
  createCharge(order: PaymentOrder): Promise<{
    providerTransactionId: string;
    pixQrCode: string;
    expiresAt: Date;
  }>;

  getCharge(providerTransactionId: string): Promise<{
    status: 'pending' | 'paid' | 'expired' | 'failed';
    paidAt?: Date;
  }>;

  handleWebhook(payload: unknown, headers: Record<string, string>): Promise<{
    providerTransactionId: string;
    status: 'paid' | 'failed' | 'refunded';
  }>;

  refund(providerTransactionId: string): Promise<boolean>;
}
```

---

## 5. Fluxo Completo de Cobrança Pix

```text
Jogador              Web Client            Game Server         PaymentProvider (PSP)
   │                      │                     │                         │
   │── Seleciona Pacote ─>│                     │                         │
   │                      │── POST /orders ────>│                         │
   │                      │   (packageId)       │── createCharge() ──────>│
   │                      │                     │   (Order Data)          │
   │                      │                     │<─ QR Code / TxID ───────│
   │                      │<─ Order Created ────│                         │
   │                      │   (QR Code Pix)     │                         │
   │                      │                     │                         │
   │── Pagamento no Banco ───────────────────────────────────────────────>│
   │   (via Pix QR Code)  │                     │                         │
   │                      │                     │<─ Webhook Notification ─│
   │                      │                     │   (Signed Payload)      │
   │                      │                     │                         │
   │                      │                     │── Valida Assinatura/PSP │
   │                      │                     │── Transação Atômica:    │
   │                      │                     │   Order -> 'paid'       │
   │                      │                     │   + PremiumCredits      │
   │                      │                     │   + Transaction Ledger  │
   │                      │                     │                         │
   │<─ Notificação/Status ┼─────────────────────│                         │
```

---

## 6. Regras de Segurança Financeira e Invariantes

1. **Preço Determinado no Servidor:** O preço dos pacotes e a quantidade de créditos a conceder são definidos exclusivamente no backend a partir de `CreditPackage`. O frontend jamais envia preços ou quantidades de créditos.
2. **Proibição de Confirmação pelo Cliente:** O frontend **NUNCA** informa ao servidor que um pagamento foi concluído. A confirmação ocorre **exclusivamente** via webhook autenticado pelo gateway ou verificação ativa do servidor com o PSP.
3. **Idempotência Estrita no Webhook:** Um webhook recebido repetidamente para o mesmo `providerTransactionId` não credita `PremiumCredits` mais de uma vez.
4. **Registros Indeléveis:** Pedidos pagos não são excluídos. Estornos geram um lançamento negativo correspondente no ledger de créditos.
5. **Segredos e Credenciais:** Chaves de API de provedores Pix e tokens de assinatura de webhook residem estritamente em variáveis de ambiente no servidor e nunca são expostas ao cliente ou versionadas em repositório.

---

## 7. Status

- **Maturidade:** Planned (Projetado; sem integração direta de gateway nesta fase).
