# Escopo do MVP — Ono Pocket

## Status

Aprovado para planejamento inicial.

## Objetivo

Validar um ciclo de jogo simples em que o jogador cultiva um Ono procedural, analisa suas características, envia a criatura para um trabalho e utiliza o pagamento para continuar desenvolvendo o laboratório.

O MVP deve provar três hipóteses:

1. gerar e descobrir um Ono é interessante;
2. escolher trabalhos com base nas características do Ono é compreensível;
3. o ciclo cultivo → trabalho → melhoria incentiva o jogador a continuar.

## Ciclo principal

1. O jogador inicia um cultivo.
2. O sistema gera um Ono a partir de uma seed e de uma versão do gerador.
3. O Ono recebe atributos, predisposições e componentes visuais compatíveis.
4. O jogador consulta o registro da criatura.
5. O jogador seleciona um trabalho disponível.
6. O Ono permanece ocupado durante a duração definida.
7. O servidor calcula o resultado do trabalho.
8. O jogador recebe um relatório, experiência e pagamento.
9. O saldo pode ser usado para novos cultivos e melhorias simples.

## Áreas do MVP

### 1. Conta

- cadastro;
- login;
- logout;
- uma conta por jogador;
- isolamento dos dados de cada conta;
- recuperação de senha poderá ser adicionada depois da validação do fluxo principal.

### 2. Gerador procedural de Onos

O gerador inicial deve possuir:

- geração por seed;
- registro da versão do algoritmo;
- uma linhagem base;
- três corpos;
- três tipos de sensores ou olhos;
- três tipos de membros;
- duas carapaças;
- duas estruturas ou órgãos especializados;
- quatro cores;
- quatro padrões corporais;
- regras básicas de compatibilidade;
- atributos dentro de limites definidos;
- resultado determinístico para a mesma seed e versão.

### 3. Características do Ono

Atributos permanentes iniciais:

- força;
- mobilidade;
- sensibilidade;
- resistência;
- inteligência;
- autonomia;
- sociabilidade;
- plasticidade.

Condições temporárias iniciais:

- energia;
- saúde;
- estresse;
- motivação.

Nem todos os atributos precisam influenciar todos os sistemas na primeira versão, mas nenhum deve ser criado sem função documentada.

### 4. Aparência modular

O Ono deve ser renderizado por sobreposição de camadas.

Categorias iniciais:

- corpo;
- textura ou padrão;
- sensores;
- membros;
- carapaça;
- estrutura especializada;
- efeito temporário.

Cada camada deve possuir:

- identificador estável;
- categoria;
- ordem de renderização;
- arquivo visual;
- compatibilidades;
- dados mínimos de posicionamento;
- estado ativo ou inativo.

O MVP pode usar artes provisórias e animações simples.

### 5. Laboratório

O jogador começa com:

- uma incubadora;
- um habitat;
- saldo inicial limitado;
- capacidade para cultivar um Ono por vez.

Funcionalidades:

- iniciar cultivo;
- acompanhar tempo restante;
- concluir cultivo;
- nomear o Ono;
- consultar Onos cultivados;
- visualizar aparência e atributos;
- consultar histórico básico.

### 6. Trabalho

O MVP terá quatro tipos de trabalho:

- transporte de materiais;
- inspeção de estruturas;
- limpeza técnica;
- monitoramento ambiental.

Cada trabalho deve definir:

- duração;
- atributos desejáveis;
- custo energético;
- risco;
- pagamento-base;
- experiência concedida;
- regras para sucesso, sucesso parcial e falha.

O resultado deve considerar:

- atributos do Ono;
- componentes corporais relevantes;
- condição atual;
- experiência;
- pequena variação aleatória controlada pelo servidor.

### 7. Economia

A economia inicial terá apenas:

- saldo;
- custo de cultivo;
- custo de melhorias;
- pagamento de trabalho.

Melhorias iniciais possíveis:

- segundo espaço de cultivo;
- melhoria básica da incubadora;
- melhoria básica do habitat.

Não implementar múltiplas moedas, mercado ou negociação entre jogadores.

### 8. Passagem do tempo

Cultivos e trabalhos devem ser baseados em horários persistidos no servidor.

O sistema deve calcular a conclusão quando o jogador retornar ou quando uma operação consultar o estado.

Não manter processos contínuos individuais para cada Ono.

### 9. PWA

A aplicação deve:

- funcionar em telas pequenas;
- possuir manifesto instalável;
- possuir ícones temporários;
- apresentar tela offline básica;
- armazenar apenas dados seguros em cache;
- manter operações econômicas sob validação do servidor.

### 10. Notificações

Depois que o ciclo principal estiver funcional, adicionar notificações para:

- cultivo concluído;
- trabalho concluído;
- Ono disponível novamente.

A ausência de permissão para notificações não pode impedir o uso do jogo.

## Telas mínimas

- cadastro;
- login;
- visão geral do laboratório;
- incubadora e cultivo;
- lista de Onos;
- detalhes do Ono;
- oportunidades de trabalho;
- trabalho em andamento;
- relatório de trabalho;
- melhorias;
- configurações básicas.

## Fora do escopo

Não fazem parte do MVP:

- combate;
- exploração de mapa;
- reprodução;
- cruzamento de linhagens;
- comércio entre jogadores;
- chat;
- amigos;
- clãs;
- missões narrativas extensas;
- mundo aberto;
- múltiplas espécies completas;
- inteligência artificial generativa dentro do jogo;
- personalização cosmética avançada;
- editor visual administrativo completo;
- mercado real ou monetização.

## Critérios de sucesso

O MVP será considerado funcional quando um jogador puder:

- criar uma conta;
- iniciar e concluir um cultivo;
- obter um Ono reproduzível pela mesma seed e versão;
- visualizar sua composição modular;
- consultar seus atributos;
- selecionar um trabalho compatível;
- aguardar sua conclusão;
- receber um resultado persistente;
- receber pagamento;
- usar o saldo em uma melhoria simples;
- instalar a aplicação como PWA.

## Restrições

- manter arquitetura simples;
- evitar serviços externos obrigatórios;
- validar operações econômicas no backend;
- não confiar no relógio do dispositivo;
- não adicionar funcionalidades fora deste documento sem atualizar o escopo;
- toda regra crítica deve possuir teste automatizado.
