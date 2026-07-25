# Glossário do Projeto — Ono Pocket

Este documento padroniza os principais termos usados na documentação, no código e na interface do Ono Pocket.

## Termos de domínio

### Ono

Criatura biológica modular cultivada pelo jogador. Possui identidade, atributos, predisposições, condições temporárias e composição visual próprias.

### Cultivo

Processo de desenvolvimento inicial de um Ono dentro do laboratório. É iniciado pelo jogador, possui duração e utiliza uma seed procedural, condições e recursos.

### Incubadora

Equipamento ou espaço do laboratório usado para executar um cultivo. Uma incubadora ocupada não pode iniciar outro cultivo até ser liberada.

### Laboratório

Área principal de gestão do jogador. Reúne incubadoras, habitats, recursos, equipamentos e o registro dos Onos.

### Habitat

Espaço onde um Ono permanece quando não está em cultivo ou trabalhando. Pode influenciar sua recuperação e manutenção em versões futuras.

### Registro de Onos

Coleção dos Onos pertencentes ao jogador, com dados de identidade, aparência, atributos, condições, histórico e disponibilidade.

### Seed

Valor usado pelo gerador procedural para produzir um resultado determinístico. A mesma seed, combinada com a mesma versão do gerador e as mesmas entradas, deve gerar o mesmo resultado.

### Versão do gerador

Identificador da versão das regras de geração procedural. Deve ser armazenado para preservar Onos existentes quando o algoritmo evoluir.

### Linhagem

Conjunto básico de regras biológicas que restringe e orienta a geração de um Ono. O MVP pode utilizar apenas uma linhagem.

### Atributo

Capacidade relativamente estável do Ono que influencia seu desempenho. Exemplos iniciais: força, mobilidade, sensibilidade, resistência, inteligência, autonomia, sociabilidade e plasticidade.

### Predisposição

Tendência natural gerada durante o cultivo. Uma predisposição influencia o desenvolvimento ou a compatibilidade com certas funções, mas não representa garantia de resultado.

### Condição

Estado temporário do Ono. Exemplos: energia, fome, saúde, estresse, higiene e motivação.

### Característica física

Parte ou propriedade observável do corpo do Ono, como corpo base, membros, sensores, carapaça, membrana, padrão ou órgão especializado.

### Componente visual

Registro de uma camada gráfica utilizada para montar a aparência de um Ono.

### Composição visual

Conjunto ordenado de componentes visuais, transformações e configurações que forma a representação de um Ono.

### Camada visual

Elemento gráfico individual posicionado na composição. Possui ordem de renderização, posição, escala, visibilidade e possível animação.

### Asset visual

Arquivo e metadados reutilizáveis de uma parte, efeito, ícone, cenário ou animação do jogo. No código, pode ser representado como `VisualAsset`.

### Manifesto de asset

Arquivo estruturado que descreve um asset visual, suas dimensões, animações, quadros, velocidade, categorias e compatibilidades.

### Trabalho

Tipo de atividade que pode ser executada por um Ono. Define requisitos, duração, pagamento base, desgaste e possíveis resultados.

### Oportunidade de trabalho

Instância disponível de um trabalho que pode ser selecionada pelo jogador em determinado momento.

### Atribuição de trabalho

Registro criado quando um Ono é enviado para uma oportunidade. No código, deve ser representado como `WorkAssignment`.

### Compatibilidade de trabalho

Estimativa de adequação entre um Ono e os requisitos de um trabalho, considerando atributos, características físicas, experiência e condição atual.

### Resultado de trabalho

Conclusão calculada de uma atribuição. Pode conter nível de sucesso, pagamento, experiência, desgaste e eventos.

### Relatório de trabalho

Apresentação do resultado ao jogador em linguagem compreensível.

### Experiência

Progressão adquirida por um Ono ao concluir trabalhos. Sua aplicação detalhada será definida em especificação própria.

### Moeda

Recurso financeiro principal do jogo, recebido por trabalhos e gasto em cultivos, manutenção e melhorias. O MVP deve possuir apenas uma moeda.

### Melhoria do laboratório

Aquisição permanente que altera capacidade, eficiência ou acesso do laboratório.

### Passagem do tempo

Cálculo de mudanças baseado em horários registrados pelo servidor. Não significa manter uma simulação contínua ativa para cada Ono.

### Evento

Ocorrência registrada durante cultivo, manutenção ou trabalho. Pode afetar o resultado ou apenas compor o histórico.

## Termos técnicos preferidos

A documentação e o código devem preferir os seguintes nomes:

| Conceito | Nome preferido no código |
| --- | --- |
| Ono | `Ono` |
| Cultivo | `Cultivation` |
| Incubadora | `Incubator` |
| Laboratório | `Laboratory` |
| Atributo | `OnoAttribute` |
| Condição | `OnoCondition` |
| Asset visual | `VisualAsset` |
| Componente visual do Ono | `OnoVisualComponent` |
| Trabalho | `WorkType` |
| Oportunidade de trabalho | `WorkOpportunity` |
| Atribuição de trabalho | `WorkAssignment` |
| Resultado de trabalho | `WorkResult` |
| Melhoria do laboratório | `LaboratoryUpgrade` |

## Regras de nomenclatura

- Não usar “pet”, “monstro”, “animal” ou “Tamagotchi” como nome interno para Ono.
- Não usar “ovo” como termo genérico para todo cultivo, pois o formato inicial pode variar.
- Não usar “missão” e “trabalho” como sinônimos sem uma decisão documentada.
- Não criar nomes alternativos para entidades já definidas neste glossário.
- Termos novos relevantes devem ser adicionados aqui antes de se tornarem recorrentes no código.
