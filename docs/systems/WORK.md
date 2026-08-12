# Sistema Work — Ono Pocket

## 1. Objetivo

Gerenciar o envio de Onos para atividades de trabalho, calculando aptidão, tempo, resultado, recompensa e desgaste com autoridade do servidor e preservação histórica das regras utilizadas.

---

## 2. Responsabilidades

- Expor oportunidades de trabalho válidas a partir do sistema `Content`.
- Validar propriedade, disponibilidade e requisitos do Ono.
- Calcular aptidão usando atributos, predisposições, componentes relevantes e condições temporárias.
- Congelar as regras necessárias no início da atribuição para que mudanças posteriores de conteúdo/configuração não alterem um trabalho em andamento.
- Resolver o resultado de forma idempotente.
- Aplicar desgaste/condições.
- Solicitar à `Economy` a concessão de Coins.
- Registrar um relatório persistente do resultado.

---

## 3. Conteúdo Inicial

O MVP pode iniciar com:
1. transporte de materiais;
2. inspeção de estruturas;
3. limpeza técnica;
4. monitoramento ambiental.

Os valores concretos pertencem a `WorkDefinition`/`GameConfig`, não a condicionais hardcoded na engine.

---

## 4. Entidades

### WorkOpportunity / WorkDefinition
Definição declarativa versionada contendo, conforme necessário:
- `id` estável;
- `version`/`contentVersion`;
- requisitos;
- duração;
- atributos desejáveis e pesos;
- risco;
- desgaste;
- recompensa base/política econômica permitida.

### WorkAssignment
- `id`: UUID.
- `onoId`: UUID.
- `playerId`: UUID.
- `workDefinitionId`: String.
- `workDefinitionVersion`: String/hash.
- `startedAt`: DateTime.
- `endsAt`: DateTime.
- `status`: Enum (`active`, `ready`, `completed`, `cancelled`, `failed`).
- `resolutionSeed`: String.
- snapshots mínimos de duração, regras e modificadores relevantes.

### WorkResult
- `assignmentId`: UUID único.
- `classification`: Enum (`excellent`, `success`, `partial`, `failed`).
- `coinsEarned`: Integer.
- `xpEarned`: Integer.
- alterações de condição aplicadas;
- dados resumidos da resolução para relatório/auditoria.

---

## 5. Aptidão e Resolução

A fórmula exata será definida pela SPEC de Work, mas conceitualmente:

```text
aptidão = f(
  atributos relevantes,
  predisposições,
  características funcionais,
  condições temporárias,
  experiência/modificadores permitidos
)
```

A variação pseudoaleatória usa `resolutionSeed` persistida para que a resolução seja reproduzível e idempotente.

Classificações iniciais podem corresponder a faixas de recompensa, mas percentuais como 120%, 100% ou 50% são parâmetros de balanceamento e não invariantes arquiteturais.

---

## 6. Regras e Invariantes

1. **Propriedade:** o Ono pertence ao jogador que cria a atribuição.
2. **Disponibilidade:** o Ono não possui outra atividade mutuamente exclusiva ativa.
3. **Condição mínima:** saúde, energia e demais limiares são validados conforme regras versionadas/configuradas.
4. **Servidor controla o tempo:** conclusão depende de `endsAt` e `serverNow`.
5. **Snapshot no início:** uma alteração posterior de `WorkDefinition`, mod ou `GameConfig` não muda uma atribuição já iniciada.
6. **Resolução idempotente:** um `WorkAssignment` produz no máximo um `WorkResult` efetivo e uma concessão econômica correspondente.
7. **Economy é a única fronteira de saldo:** Work nunca altera carteira diretamente.
8. **Conteúdo não concede moeda por si só:** valores declarados são entradas para regras validadas pelo servidor; o motor econômico decide a concessão efetiva.

---

## 7. Relação com Mods

Trabalhos de mods utilizam os mesmos schemas declarativos, mas no servidor oficial recompensas e riscos podem ser limitados/normalizados por políticas da Economy/GameConfig e podem exigir aprovação administrativa.

Um mod nunca recebe acesso ao serviço de Economy nem cria transações diretamente.

---

## 8. Eventos Produzidos

- `WorkAssignmentStarted(assignmentId, playerId, onoId, endsAt)`
- `WorkAssignmentReady(assignmentId)` quando útil para notificações.
- `WorkAssignmentCompleted(assignmentId, resultId)`

Esses eventos são conceituais e não exigem broker de mensagens.

---

## 9. Status

- **Maturidade:** Core / MVP.
