# Sistema Work — Ono Pocket

## 1. Objetivo

Gerenciar o envio de Onos para atividades de trabalho, calculando a aptidão da criatura, o tempo de execução, os resultados, as recompensas econômicas e o desgaste biológico.

---

## 2. Responsabilidades

- Oferecer oportunidades de trabalho ativas aos jogadores.
- Validar se um Ono atende aos requisitos mínimos para ser designado a uma tarefa.
- Calcular a taxa de aptidão com base nos atributos, predisposições, componentes visuais e estado atual do Ono.
- Controlar o tempo da atividade e resolver o resultado de forma idempotente e atômica.
- Aplicar o desgaste (consumo de energia, acréscimo de estresse) e creditar moedas (`Coins`) e experiência.

---

## 3. Entidades e Tipos de Trabalho

### Oportunidades Iniciais do MVP
1. **Transporte de Materiais:** Favorece Força, Resistência e Energia.
2. **Inspeção de Estruturas:** Favorece Sensibilidade, Mobilidade e Cognição.
3. **Limpeza Técnica:** Favorece Mobilidade, Autonomia e Resistência.
4. **Monitoramento Ambiental:** Favorece Sensibilidade, Autonomia e Cognição.

### Entidades
- `WorkOpportunity`: Oportunidade declarativa (tipo, requisitos, duração, pagamento base, risco, desgaste).
- `WorkAssignment`: Atribuição de um Ono a uma oportunidade (`onoId`, `playerId`, `startedAt`, `endsAt`, `status`).
- `WorkResult`: Resultado calculado (`classification`: `excellent`, `success`, `partial`, `failed`, `coinsEarned`, `xpEarned`, `energyConsumed`).

---

## 4. Cálculo de Aptidão e Resolução Determinística

$$\text{Aptidão} = f(\text{Atributos Relevantes}, \text{Predisposições}, \text{Componentes Visuais}, \text{Condições Temporárias})$$

- O resultado do trabalho combina a aptidão calculada com um fator pseudoaleatório gerado pela seed da atribuição.
- **Classificações:**
  - **Excelente (120% recompensa):** Desempenho superior, desgaste normal.
  - **Sucesso (100% recompensa):** Desempenho padrão.
  - **Parcial (50% recompensa):** Recompensa reduzida por incompatibilidade ou desgaste alto.
  - **Falha (0% recompensa principal):** Sem recompensa, desgaste/estresse aplicado.

---

## 5. Regras e Invariantes

1. **Incompatibilidade Temporal:** Enquanto um Ono estiver em `WorkAssignment` ativo (`status = active`), ele não pode aceitar outro trabalho ou ser colocado em cultivo.
2. **Resolução Idempotente:** A resolução de um trabalho concluído só atribui moedas e experiência uma única vez (`WorkResult` único e transacional).
3. **Validação Estrita no Backend:** Toda a fórmula de aptidão e distribuição de recompensas reside exclusivamente no backend.

---

## 6. Status

- **Maturidade:** Core / MVP.
