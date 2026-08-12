# Sistema Ono — Ono Pocket

## 1. Objetivo

Definir a estrutura de domínio, atributos, condições temporárias, fases e comportamento dos **Onos** — os organismos biológicos modulares cultivados e gerenciados pelos jogadores.

---

## 2. Responsabilidades

- Representar a identidade persistente e estado completo de cada Ono.
- Manter o registro dos atributos permanentes e condições temporárias do organismo.
- Armazenar a composição visual em camadas.
- Garantir as regras de transição de fase e disponibilidade para atividades (trabalho, descanso).

---

## 3. Entidades de Domínio

### Ono
- `id`: UUID (Chave primária).
- `playerId`: UUID (Chave estrangeira apontando para o proprietário).
- `seed`: String (Seed usada na geração determinística).
- `generatorVersion`: String (Versão do gerador usada).
- `name`: String (Nome dado pelo jogador ou atribuído).
- `stage`: Enum (`cultivation`, `newborn`, `young`, `adult`).
- `attributes`: JSON (Atributos permanentes).
- `conditions`: JSON (Condições temporárias atuais).
- `predispositions`: JSON (Lista de tendências biológicas).
- `visualComposition`: JSON (Lista de camadas de componentes visuais).
- `createdAt`: DateTime.
- `updatedAt`: DateTime.

---

## 4. Atributos Permanentes e Condições Temporárias

### Atributos Permanentes
- **Força:** Capacidade de transporte e esforço físico.
- **Mobilidade:** Velocidade e deslocamento.
- **Sensibilidade:** Percepção de sinais ambientais.
- **Resistência:** Tolerância a desgaste e condições adversas.
- **Cognição:** Aprendizado de rotinas e resolução de tarefas.
- **Autonomia:** Agir com pouca supervisão.
- **Sociabilidade:** Vínculo e cooperação.
- **Plasticidade:** Potencial de adaptação.

### Condições Temporárias
- **Energia:** (0 a 100) Consumida em trabalhos e recuperada com descanso.
- **Saúde:** (0 a 100) Afetada por acidentes ou maus cuidados.
- **Estresse:** (0 a 100) Aumentado em tarefas pesadas.
- **Motivação:** (0 a 100) Influencia bônus de desempenho.

---

## 5. Fases de Desenvolvimento

1. **Cultivo (`cultivation`):** Organismo em formação dentro da incubadora.
2. **Recém-formado (`newborn`):** Concluído na incubadora, pronto para primeira descoberta e nomeação.
3. **Jovem (`young`):** Aptidão para realizar os trabalhos iniciais e atividades do laboratório.

---

## 6. Regras e Invariantes

1. **Exclusividade de Proprietário:** Um Ono pertence a exatamente um `Player`.
2. **Exclusividade de Atividade:** Um Ono **NÃO** pode estar simultaneamente em cultivo, disponível e trabalhando.
3. **Impedimento por Saúde/Energia:** Um Ono com saúde crítica (< 10) ou sem energia (0) não pode ser enviado para trabalhos.
4. **Imutabilidade Histórica do Gerador:** Alterações no algoritmo de geração não modificam retroativamente os atributos e visual de Onos já criados.

---

## 7. Eventos Produzidos

- `OnoCreated(onoId, playerId, seed, generatorVersion)`
- `OnoNamed(onoId, newName)`
- `OnoStageChanged(onoId, oldStage, newStage)`
- `OnoConditionsUpdated(onoId, newConditions)`

---

## 8. Status

- **Maturidade:** Core / MVP.
