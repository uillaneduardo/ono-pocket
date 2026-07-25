# Estratégia de testes

## Objetivo

Garantir que cada etapa do Ono Pocket seja verificável, reproduzível e segura para evoluir sem quebrar regras anteriores.

## Princípios

- testar regras de negócio fora da interface;
- usar seeds fixas para testes procedurais;
- não declarar sucesso sem executar o comando correspondente;
- não remover testes para fazer a implementação passar;
- manter testes rápidos para desenvolvimento local;
- separar testes unitários, integração e interface.

## Testes unitários

Devem cobrir funções puras e regras isoladas.

Exemplos futuros:

- mesma seed e mesma versão geram o mesmo Ono;
- atributos permanecem dentro dos limites;
- componentes incompatíveis não são combinados;
- ordem de camadas é estável;
- cultivo não conclui antes do horário;
- trabalho reduz energia corretamente;
- pagamento é calculado conforme a aptidão;
- valores monetários nunca ficam negativos sem regra explícita.

## Testes de integração

Devem usar banco de teste isolado.

Exemplos futuros:

- conexão com MySQL;
- aplicação e reversão controlada de migrations em ambiente descartável;
- endpoint de saúde;
- criação e leitura de registros;
- conclusão de cultivo em transação;
- conclusão de trabalho e atualização de saldo;
- bloqueio de acesso a recursos de outro jogador.

## Testes de interface

Devem cobrir apenas fluxos essenciais.

Exemplos futuros:

- abrir página inicial;
- visualizar estado de carregamento;
- visualizar mensagem de erro da API;
- iniciar cultivo;
- consultar Ono;
- escolher trabalho;
- ler relatório de conclusão.

## Testes do sistema visual

- camadas são ordenadas pelo valor configurado;
- camada invisível é ignorada;
- fallback para `idle` funciona;
- imagem estática é usada quando não há animação;
- composição não altera atributos do Ono.

## Testes PWA

- manifesto é válido;
- service worker é registrado apenas em ambiente apropriado;
- shell básico abre sem conexão após primeira visita;
- operações sensíveis exibem que precisam de conexão;
- atualização do app não destrói dados persistidos no servidor.

## Comandos obrigatórios

A fundação deve oferecer scripts equivalentes a:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:integration
npm run build
```

Quando testes de interface forem adicionados:

```bash
npm run test:e2e
```

## CI

Cada push e pull request deve executar, no mínimo:

1. instalação reproduzível das dependências;
2. geração do cliente Prisma;
3. lint;
4. typecheck;
5. testes unitários;
6. build.

Testes de integração devem ser adicionados à CI quando o banco de teste estiver configurado.

## Banco de teste

- usar banco diferente do desenvolvimento;
- nunca executar limpeza em banco sem identificação explícita de ambiente de teste;
- aplicar migrations antes dos testes;
- limpar dados de forma controlada entre cenários;
- não depender da ordem dos testes.

## Relatório de entrega

Toda implementação deve informar:

- comandos executados;
- resultado real de cada comando;
- testes não executados e motivo;
- limitações do ambiente;
- regressões conhecidas.

## Critério mínimo para concluir uma especificação

Uma SPEC não deve ser marcada como validada enquanto:

- o código não compilar;
- o lint não passar;
- o typecheck não passar;
- os testes obrigatórios não passarem;
- o build de produção não for gerado;
- migrations necessárias não forem validadas;
- documentação de execução não estiver atualizada.
