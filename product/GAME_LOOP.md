# Ciclo Principal do Jogo — Ono Pocket

## Objetivo

Este documento define o ciclo central do Ono Pocket. Todas as funcionalidades do MVP devem apoiar pelo menos uma etapa deste ciclo.

## Ciclo principal

```text
Cultivar um Ono
↓
Descobrir suas características
↓
Escolher um trabalho compatível
↓
Aguardar a conclusão
↓
Receber relatório, experiência e pagamento
↓
Manter ou melhorar o laboratório
↓
Iniciar um novo cultivo ou desenvolver outro Ono
```

## 1. Cultivar

O jogador utiliza um espaço de cultivo disponível e paga os recursos necessários para iniciar o processo.

O cultivo deve registrar:

- data e hora de início;
- duração prevista;
- condições aplicadas;
- seed procedural;
- versão do gerador;
- estado atual.

Durante o MVP, o jogador influencia o resultado por poucas escolhas claras. O sistema não deve exigir gerenciamento excessivo.

## 2. Descobrir

Ao concluir o cultivo, o sistema gera e registra o Ono.

O jogador conhece:

- aparência modular;
- nome provisório ou definido pelo jogador;
- atributos;
- predisposições;
- partes corporais;
- possíveis aptidões de trabalho;
- condição inicial.

A descoberta deve ser apresentada como um momento importante, mesmo com animações e artes simples.

## 3. Avaliar

Antes de selecionar um trabalho, o jogador compara as capacidades do Ono com os requisitos das oportunidades disponíveis.

A interface deve comunicar:

- requisitos desejáveis;
- duração;
- pagamento base;
- riscos;
- desgaste esperado;
- nível estimado de compatibilidade.

O sistema pode oferecer uma estimativa, mas não deve revelar antecipadamente todo o cálculo do resultado.

## 4. Trabalhar

O jogador envia um Ono disponível para uma oportunidade de trabalho.

Enquanto estiver trabalhando, o Ono:

- não pode participar de outro trabalho;
- permanece associado à tarefa;
- sofre passagem de tempo no servidor;
- pode consumir energia ou sofrer desgaste;
- retorna apenas após o horário de conclusão.

O MVP não exige simulação contínua. O sistema deve armazenar os horários e calcular o resultado quando necessário.

## 5. Receber resultado

Ao término, o jogador recebe um relatório contendo:

- resultado da tarefa;
- pagamento;
- experiência recebida;
- desgaste ou alterações de condição;
- eventos relevantes;
- fatores que contribuíram para o desempenho.

Os relatórios ajudam o jogador a entender melhor as capacidades dos Onos sem expor fórmulas técnicas completas.

## 6. Administrar recursos

O pagamento recebido pode ser utilizado para:

- iniciar novos cultivos;
- adquirir nutrientes ou insumos;
- recuperar a condição dos Onos;
- ampliar a quantidade de espaços;
- melhorar equipamentos do laboratório;
- desbloquear oportunidades de trabalho.

Para o MVP, deve existir apenas uma moeda principal.

## 7. Repetir com progressão

O ciclo se repete com novas combinações e escolhas. A progressão surge de:

- maior variedade de Onos;
- novas oportunidades de trabalho;
- melhorias do laboratório;
- melhor compreensão das combinações procedurais;
- desenvolvimento dos Onos existentes.

## Ciclos secundários

### Manutenção do Ono

```text
Verificar condição
→ alimentar ou descansar
→ recuperar disponibilidade
→ enviar para novo trabalho
```

### Expansão do laboratório

```text
Acumular dinheiro
→ adquirir melhoria
→ aumentar capacidade ou eficiência
→ acessar novas possibilidades
```

### Descoberta de combinações

```text
Cultivar em novas condições
→ observar resultado
→ registrar características
→ ajustar o próximo cultivo
```

## Duração das sessões

O jogo deve aceitar sessões curtas. O jogador deve conseguir tomar uma decisão útil em poucos minutos.

Tempos de espera podem existir, mas não devem ser usados para esconder falta de conteúdo. O jogador deve sempre compreender:

- o que está acontecendo;
- quando ficará pronto;
- o que poderá fazer em seguida.

## Critérios para novas funcionalidades

Antes de adicionar uma funcionalidade, devem ser respondidas estas perguntas:

1. Qual etapa do ciclo principal ela melhora?
2. Qual decisão nova e relevante ela oferece?
3. É necessária no MVP?
4. Pode ser implementada com menos regras ou telas?
5. Pode ser testada isoladamente?

Funcionalidades sem resposta clara devem permanecer fora do escopo atual.
