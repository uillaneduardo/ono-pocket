# Sistema GameConfig — Ono Pocket

## 1. Objetivo

Centralizar parâmetros de balanceamento e funcionamento do jogo, evitando *magic numbers* espalhados pelo código e permitindo evolução controlada sem transformar toda configuração em dado administrável desde o início.

---

## 2. Responsabilidades

- Fornecer parâmetros padrão tipados para Economy, Cultivation, Work, Ono e Laboratory.
- Separar constantes técnicas, parâmetros de balanceamento e conteúdo administrável.
- Expor snapshots dos parâmetros relevantes para operações temporais que precisam preservar regras históricas.
- Futuramente permitir overrides persistidos apenas para chaves explicitamente autorizadas e auditadas.

---

## 3. Classificação

### Constantes técnicas
Fazem parte da implementação e não são alteráveis pelo Game Admin em tempo de execução.

Exemplos:
- formatos de IDs;
- versões de schema;
- limites estruturais necessários à integridade;
- dimensões lógicas do renderer quando forem invariantes da versão.

### Parâmetros de balanceamento
Podem mudar entre versões e, futuramente, receber override administrativo.

Exemplos:
- saldo inicial em Coins;
- custo base de cultivo;
- duração base;
- multiplicadores de trabalho;
- taxas de recuperação.

### Conteúdo administrável
Definições como trabalhos, partes visuais, itens e pacotes de loja pertencem principalmente ao sistema `Content`/`Commerce`, mesmo que o Game Admin futuramente os edite. Não transformar catálogo em `key/value` genérico de GameConfig.

---

## 4. Estratégia por Fase

### MVP
- defaults tipados e versionados no código;
- nenhuma interface administrativa;
- nenhuma tabela genérica de overrides necessária;
- operações em andamento persistem snapshots dos valores que não podem mudar retroativamente.

### Futuro
Somente parâmetros marcados como `runtimeOverrideAllowed` poderão receber override persistido e auditado.

---

## 5. Precedência

Não deve existir uma regra global onde qualquer variável de ambiente possa sobrescrever qualquer parâmetro de jogo.

Separar:
- **Configuração de infraestrutura:** `DATABASE_URL`, porta, origens, segredos etc. via ambiente.
- **GameConfig:** valores de balanceamento definidos em código e, futuramente, overrides persistidos autorizados.

Para um parâmetro de jogo elegível a override, a precedência futura é:

```text
override persistido válido
        ↓
default versionado no código
```

Variáveis de ambiente só participam quando uma chave específica for explicitamente projetada para isso.

---

## 6. Exemplo

```json
{
  "economy": {
    "initialCoins": 200
  },
  "cultivation": {
    "baseCostCoins": 50,
    "baseDurationSeconds": 1800
  },
  "work": {
    "rewardMultiplier": 1.0,
    "energyCostMultiplier": 1.0
  },
  "ono": {
    "energyRecoveryRatePerHour": 20
  }
}
```

Os números são apenas exemplos, não valores finais de balanceamento.

---

## 7. Snapshots e Operações em Andamento

Mudanças no GameConfig não alteram retroativamente:
- cultivos ativos;
- trabalhos ativos;
- pedidos de Commerce já criados;
- Onos já gerados.

Cada sistema persiste os valores/versões relevantes no momento em que a operação começa.

---

## 8. Overrides Futuros

Um override deve registrar:
- chave;
- valor tipado;
- valor anterior;
- responsável;
- data/hora;
- motivo opcional;
- versão/revisão.

Regras:
- validação de tipo e faixa;
- lista explícita de chaves editáveis;
- constantes técnicas nunca recebem override;
- mudanças críticas podem exigir confirmação/revisão adicional no Game Admin.

---

## 9. Status

- **Core / MVP:** defaults tipados em código e mecanismo de snapshot.
- **Planned:** overrides persistidos, auditoria e edição pelo Game Admin.
