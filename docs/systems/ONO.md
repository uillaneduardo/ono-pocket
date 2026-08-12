# Sistema Ono — Ono Pocket

## 1. Objetivo

Definir a estrutura persistente, atributos, condições, fases de desenvolvimento e disponibilidade dos **Onos** já formados.

Um Ono é criado ao concluir com sucesso um `Cultivation`. O período anterior à formação pertence ao sistema de Cultivation e não é um estado da entidade Ono.

---

## 2. Responsabilidades

- Representar a identidade persistente de cada Ono.
- Manter atributos permanentes e condições temporárias.
- Preservar os dados gerados originalmente e a composição visual.
- Controlar fase de desenvolvimento do organismo.
- Expor sua disponibilidade para atividades sem duplicar o estado transacional dos sistemas de Work, Cultivation ou outros sistemas futuros.

---

## 3. Entidade Ono

- `id`: UUID.
- `playerId`: UUID do proprietário.
- `seed`: String.
- `generatorVersion`: String.
- `contentVersion`: String/hash que identifica o catálogo/regras usados na geração.
- `cultivationProtocol`: String/Enum utilizado na geração.
- `name`: String opcional até a nomeação.
- `stage`: Enum inicial (`newborn`, `young`, `adult`).
- `attributes`: dados tipados de atributos permanentes.
- `conditions`: dados tipados de condições temporárias.
- `predispositions`: conjunto de predisposições.
- `visualComposition`: composição persistida em componentes/IDs estáveis.
- `createdAt`: DateTime.
- `updatedAt`: DateTime.

A implementação física poderá normalizar alguns desses campos em tabelas próprias em vez de JSON. Este documento define o domínio, não o schema final do banco.

---

## 4. Atributos Permanentes

- **Força:** capacidade de esforço físico.
- **Mobilidade:** deslocamento e agilidade.
- **Sensibilidade:** percepção ambiental.
- **Resistência:** tolerância a desgaste.
- **Cognição:** aprendizado e resolução de tarefas.
- **Autonomia:** desempenho com pouca supervisão.
- **Sociabilidade:** vínculo e cooperação.
- **Plasticidade:** potencial de adaptação.

---

## 5. Condições Temporárias

Escala inicial sugerida de 0 a 100:
- **Energia**
- **Saúde**
- **Estresse**
- **Motivação**

Os valores e limiares concretos pertencem ao `GameConfig` e às regras de cada sistema consumidor.

---

## 6. Fases de Desenvolvimento

- `newborn`: recém-formado e disponível para descoberta/nomeação.
- `young`: apto às atividades iniciais permitidas.
- `adult`: fase futura/avançada quando houver mecânicas que justifiquem a transição.

O MVP não deve criar progressão de fase sem função concreta documentada.

---

## 7. Disponibilidade e Ocupação

A fase biológica (`stage`) é diferente de ocupação operacional.

Um Ono pode estar, por exemplo:
- disponível;
- trabalhando;
- descansando/tratando-se futuramente.

A fonte de verdade da ocupação deve ser o sistema que possui a atividade (`WorkAssignment`, tratamento futuro etc.), evitando múltiplos campos contraditórios. Uma visão derivada `availability` pode ser calculada pela API.

Um Ono existente nunca volta ao estado de `Cultivation`; Cultivation cria novos Onos.

---

## 8. Regras e Invariantes

1. Um Ono pertence a exatamente um `Player`.
2. Um Ono não pode participar simultaneamente de atividades mutuamente exclusivas.
3. Saúde/energia podem impedir atividades conforme regras do sistema consumidor e `GameConfig`.
4. Alterações futuras do gerador ou catálogo não modificam retroativamente um Ono persistido.
5. A composição visual deve referenciar IDs estáveis e manter dados suficientes para continuar renderizável mesmo após evolução do catálogo.

---

## 9. Eventos Produzidos

- `OnoCreated(onoId, playerId, cultivationId, generatorVersion, contentVersion)`
- `OnoNamed(onoId, newName)`
- `OnoStageChanged(onoId, oldStage, newStage)`
- `OnoConditionsUpdated(onoId, changes)`

---

## 10. Status

- **Maturidade:** Core / MVP.
