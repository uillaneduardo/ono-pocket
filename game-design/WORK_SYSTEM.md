# Sistema de trabalho

## Objetivo

O sistema de trabalho permite enviar Onos aptos para atividades temporárias que geram moeda, experiência e desgaste. O cálculo deve ser previsível o suficiente para orientar decisões, mas ainda permitir variação controlada.

## Fluxo

1. O jogador consulta oportunidades disponíveis.
2. Seleciona um Ono apto.
3. O backend valida propriedade, disponibilidade e condições.
4. O trabalho é iniciado e recebe horário de conclusão.
5. O Ono fica indisponível durante a atividade.
6. Ao concluir, o backend calcula o resultado.
7. O jogador recebe relatório, pagamento e efeitos sobre o Ono.

## Estados

Um trabalho atribuído pode estar em:

- **active:** em andamento;
- **ready:** tempo concluído e aguardando resolução;
- **completed:** resultado aplicado;
- **cancelled:** cancelado conforme regra permitida;
- **failed:** erro técnico recuperável.

O trabalho deve ser resolvido de forma idempotente.

## Tipos iniciais

O MVP terá quatro oportunidades básicas:

### Transporte de materiais

Favorece:

- força;
- resistência;
- energia atual.

### Inspeção de estruturas

Favorece:

- sensibilidade;
- mobilidade;
- cognição.

### Limpeza técnica

Favorece:

- mobilidade;
- autonomia;
- resistência.

### Monitoramento ambiental

Favorece:

- sensibilidade;
- autonomia;
- cognição.

Os nomes e valores devem ser configuráveis como dados.

## Requisitos

Cada oportunidade pode definir:

- fase mínima;
- atributos desejáveis;
- condições mínimas;
- duração;
- recompensa base;
- desgaste de energia;
- aumento de estresse;
- risco;
- experiência concedida;
- componentes visuais que concedem bônus.

Requisitos obrigatórios impedem o início. Valores desejáveis apenas afetam o resultado.

## Aptidão

A aptidão é calculada a partir de:

- atributos relevantes;
- predisposição;
- componentes funcionais;
- experiência no tipo de trabalho;
- condições temporárias;
- penalidades ativas.

A fórmula final deve ficar centralizada no domínio, documentada e testável. A interface não pode recalcular resultados autoritativos.

## Resultado

O MVP utiliza quatro classificações:

- **excelente:** desempenho acima do esperado;
- **sucesso:** atividade concluída normalmente;
- **parcial:** atividade concluída com recompensa reduzida;
- **falha:** sem recompensa principal e com desgaste aplicado.

A variação aleatória deve vir de um gerador determinístico associado ao trabalho, permitindo auditoria e testes.

## Pagamento

O pagamento final pode considerar:

- recompensa base;
- classificação do resultado;
- bônus por aptidão;
- penalidade por condição inadequada;
- limite mínimo e máximo da oportunidade.

Toda movimentação deve usar a moeda interna do jogo. Valores exibidos podem seguir formatação pt-BR, mas não representam dinheiro real.

O crédito, a resolução do trabalho e a atualização do Ono devem ocorrer na mesma transação.

## Desgaste

Ao concluir um trabalho, o Ono pode sofrer:

- redução de energia;
- aumento de estresse;
- redução moderada de higiene;
- perda de saúde apenas quando a oportunidade declarar risco e o resultado justificar.

O desgaste não deve ser ignorado em caso de falha.

Um Ono com saúde crítica, energia insuficiente ou já ocupado não pode iniciar trabalho.

## Experiência

A experiência deve ser registrada por categoria de trabalho, não apenas como nível global.

No MVP, a experiência pode:

- conceder pequeno bônus de aptidão;
- demonstrar histórico de especialização;
- desbloquear oportunidades posteriores.

Não implementar árvore de habilidades nesta etapa.

## Tempo

O trabalho armazena:

- início;
- duração;
- conclusão prevista;
- resolução efetiva.

O servidor é a fonte oficial. Não atualizar cada trabalho continuamente.

## Cancelamento

No MVP, um trabalho ativo não precisa permitir cancelamento pelo jogador. Essa restrição simplifica o domínio e evita exploração da aleatoriedade.

Cancelamentos administrativos devem registrar motivo e restaurar o estado do Ono de forma segura, sem conceder recompensa.

## Relatório

O relatório de conclusão deve apresentar:

- nome do Ono;
- tipo de trabalho;
- classificação;
- fatores principais do resultado;
- pagamento;
- experiência recebida;
- desgaste aplicado;
- horário de conclusão.

Não revelar números aleatórios internos ou informações técnicas desnecessárias.

## Segurança e integridade

- validar propriedade do Ono;
- impedir atribuição simultânea;
- não confiar em recompensa enviada pelo frontend;
- usar tempo do servidor;
- impedir resolução duplicada;
- impedir recebimento repetido de recompensa;
- registrar transações financeiras e eventos relevantes.

## Testes obrigatórios

- Ono ocupado não inicia novo trabalho;
- Ono sem condições mínimas é rejeitado;
- usuário não atribui Ono de outra conta;
- mesma entrada determinística gera mesmo resultado;
- aptidão maior melhora a distribuição de resultados;
- pagamento respeita limites;
- conclusão credita saldo uma única vez;
- desgaste é aplicado corretamente;
- trabalho finalizado libera o Ono;
- falha técnica permite resolução segura sem duplicação.

## Fora do escopo do MVP

- combate;
- equipes com vários Onos;
- negociação de contratos;
- trabalhos entre jogadores;
- mapas de deslocamento;
- eventos narrativos complexos;
- seguro, impostos ou moeda premium;
- controle manual do Ono durante a atividade.
