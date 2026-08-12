# Sistema Cultivation — Ono Pocket

## 1. Objetivo

Gerenciar o ciclo de formação de novos Onos dentro do laboratório do jogador, controlando incubadora, custo, protocolo, tempo e conclusão de forma consistente e idempotente.

---

## 2. Responsabilidades

- Validar se o jogador pode iniciar um novo cultivo.
- Reservar uma incubadora disponível.
- Debitar o custo através da `Economy`.
- Persistir os dados e versões necessários para reproduzir a geração.
- Controlar o tempo usando exclusivamente o relógio do servidor.
- Invocar `OnoGenerator` somente na conclusão/revelação.
- Persistir o novo Ono e liberar a incubadora de forma atômica/idempotente.

Cultivation representa o organismo **antes de existir uma entidade Ono persistida**.

---

## 3. Entidade Cultivation

- `id`: UUID.
- `incubatorId`: UUID.
- `playerId`: UUID.
- `seed`: String.
- `generatorVersion`: String.
- `contentVersion`: String/hash do catálogo utilizado.
- `protocol`: String/Enum.
- `generationConfigSnapshot`: JSON/versionamento mínimo dos parâmetros que influenciam a geração.
- `costCoins`: Integer — snapshot do custo cobrado.
- `durationSeconds`: Integer — snapshot da duração aplicada.
- `status`: Enum (`active`, `ready`, `completed`, `cancelled`, `failed`).
- `startedAt`: DateTime.
- `endsAt`: DateTime.
- `completedAt`: DateTime opcional.
- `onoId`: UUID opcional após conclusão.

---

## 4. Estados

- `active`: em andamento.
- `ready`: `endsAt` foi atingido; aguarda conclusão/revelação.
- `completed`: geração concluída, Ono criado e incubadora liberada.
- `cancelled`: interrompido conforme política explicitamente permitida.
- `failed`: erro técnico recuperável sem duplicar débito ou geração.

`ready` pode ser derivado do horário em vez de persistido fisicamente, caso a implementação prefira. A decisão deve evitar estados inconsistentes.

---

## 5. Regras de Tempo e Atomicidade

1. **Servidor é autoridade do tempo:** `remaining = max(0, endsAt - serverNow)`.
2. **Sem daemon por cultivo:** não existe processo individual atualizando contadores continuamente.
3. **Início atômico:** validação de capacidade, débito em Economy, reserva da incubadora e criação do cultivo devem ser coordenados para não produzir débito sem cultivo ou cultivo sem débito.
4. **Snapshots no início:** custo, duração e entradas versionadas da geração são congelados quando o cultivo começa. Mudanças posteriores em `GameConfig` ou `Content` não alteram um cultivo ativo.
5. **Conclusão idempotente:** chamadas repetidas para concluir o mesmo cultivo retornam o mesmo Ono e nunca geram duas criaturas.
6. **Conclusão atômica:** criação do Ono, vínculo ao cultivo e liberação da incubadora são concluídos de modo consistente.

---

## 6. Cancelamento e Falhas

A política de cancelamento (se permitido), incluindo eventual reembolso parcial ou total, deve ser definida em `GameConfig`/SPEC antes da implementação. Não assumir reembolso automático.

Falhas técnicas recuperáveis não devem:
- gerar novo débito;
- alterar seed/versões;
- criar múltiplos Onos;
- liberar a incubadora antes de uma conclusão ou cancelamento válido.

---

## 7. Eventos Produzidos

- `CultivationStarted(cultivationId, playerId, incubatorId, costCoins, endsAt)`
- `CultivationReady(cultivationId)` quando útil para notificações futuras.
- `CultivationCompleted(cultivationId, playerId, onoId)`
- `CultivationCancelled(cultivationId, playerId)`

Eventos conceituais não implicam adoção de event sourcing ou broker de mensagens.

---

## 8. Status

- **Maturidade:** Core / MVP.
