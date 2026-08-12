# Sistema Cultivation — Ono Pocket

## 1. Objetivo

Gerenciar o ciclo de desenvolvimento de Onos dentro do laboratório do jogador, controlando incubadoras, custos, tempo e finalização de cultivos.

---

## 2. Responsabilidades

- Controlar o estado das incubadoras do jogador.
- Descontar atomicamente o custo do cultivo em moedas do jogo (`Coins`).
- Registrar o tempo do cultivo baseado exclusivamente no relógio do servidor (`serverTime`).
- Invocar o `OnoGenerator` ao término do tempo e persistir o novo Ono de forma transacional.

---

## 3. Entidades e Estados

### Entidade Cultivation
- `id`: UUID.
- `incubatorId`: UUID.
- `playerId`: UUID.
- `seed`: String.
- `generatorVersion`: String.
- `protocol`: String (Protocolo selecionado).
- `cost`: Integer (Moedas gastas).
- `status`: Enum (`active`, `ready`, `completed`, `cancelled`, `failed`).
- `startedAt`: DateTime.
- `endsAt`: DateTime.
- `completedAt`: DateTime (Opcional).

### Estados do Cultivo
- **active:** Cultivo em andamento na incubadora.
- **ready:** Horário `endsAt` atingido; aguarda ação do jogador para revelar o Ono.
- **completed:** Ono gerado e vinculado ao jogador; incubadora liberada.
- **cancelled:** Cultivo interrompido pelo jogador.
- **failed:** Erro recuperável mantendo o cultivo elegível para nova tentativa.

---

## 4. Regras de Tempo e Transação Atômica

1. **Servidor Autoridade do Tempo:** O tempo restante é calculado dinamicamente no backend: `remaining = max(0, endsAt - now())`. Não existe daemon contínuo no servidor para cada segundo decorrido.
2. **Início Atômico:** A dedução de moedas (`Coins`) do jogador e a criação do registro de `Cultivation` ocorrem na mesma transação de banco de dados.
3. **Conclusão Atômica:** A revelação do Ono, alteração de status do cultivo para `completed` e liberação da incubadora ocorrem em uma única transação atômica idempotente.

---

## 5. Eventos Produzidos

- `CultivationStarted(cultivationId, playerId, incubatorId, cost, endsAt)`
- `CultivationCompleted(cultivationId, playerId, onoId)`
- `CultivationCancelled(cultivationId, playerId)`

---

## 6. Status

- **Maturidade:** Core / MVP.
