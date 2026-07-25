# Arquitetura técnica inicial

## Objetivo

Definir uma base simples, modular e testável para o Ono Pocket, adequada ao MVP e preparada para evolução incremental.

## Princípios

- monólito modular;
- frontend e backend claramente separados;
- regras de negócio fora da interface;
- banco relacional como fonte persistente;
- APIs explícitas;
- sem microserviços no MVP;
- sem IA generativa dentro do jogo;
- sem dependência obrigatória de serviços proprietários.

## Stack inicial

### Frontend

- React;
- TypeScript;
- Vite;
- PWA;
- CSS responsivo;
- biblioteca de interface mínima.

### Backend

- Node.js;
- TypeScript;
- API REST;
- Prisma ORM;
- MySQL.

### Qualidade

- ESLint;
- verificação TypeScript;
- testes unitários;
- testes de integração;
- build de produção;
- GitHub Actions.

## Estrutura sugerida

```text
apps/
├── web/
└── server/
packages/
├── domain/
├── ono-generator/
├── visual-system/
└── shared/
docs/
prisma/
```

A estrutura final pode ser ajustada durante a SPEC-001, desde que preserve as responsabilidades.

## Responsabilidades

### `apps/web`

- interface do jogador;
- navegação;
- estados de carregamento, vazio e erro;
- consumo da API;
- instalação PWA;
- renderização visual dos Onos.

Não deve conter regras definitivas de geração, economia ou conclusão de tarefas.

### `apps/server`

- autenticação futura;
- validação de entradas;
- acesso ao banco;
- horários confiáveis;
- autorização;
- orquestração dos casos de uso;
- API REST.

### `packages/domain`

- tipos de domínio;
- invariantes;
- regras de cultivo;
- regras de trabalho;
- economia;
- passagem do tempo.

### `packages/ono-generator`

- gerador determinístico por seed;
- compatibilidade entre partes;
- geração de atributos;
- versão do algoritmo;
- testes determinísticos.

### `packages/visual-system`

- descrição visual;
- ordenação de camadas;
- fallback de animações;
- validação lógica de composição.

### `packages/shared`

- contratos compartilhados;
- schemas de validação;
- utilitários sem regra de negócio específica.

## Comunicação

O frontend se comunica com o backend por HTTP usando JSON.

A API deve retornar:

- código HTTP apropriado;
- corpo consistente;
- mensagem segura para o usuário;
- identificador técnico de erro quando necessário.

## Persistência

O MySQL será usado para:

- contas;
- laboratórios;
- cultivos;
- Onos;
- composições visuais;
- trabalhos;
- saldo;
- histórico relevante.

Alterações de estrutura devem usar migrations do Prisma.

Migrations já aplicadas não devem ser editadas.

## Tempo

Operações importantes devem usar horário do servidor.

Não haverá atualização contínua de cada Ono. O sistema armazenará horários relevantes e calculará o estado quando o dado for consultado ou uma ação for executada.

Isso se aplica a:

- cultivo;
- trabalhos;
- energia;
- recompensas;
- progressão temporal.

## Segurança

- segredos apenas em variáveis de ambiente;
- `.env.example` sem credenciais;
- validação no backend;
- senhas nunca armazenadas em texto puro;
- uploads futuros com validação de MIME, tamanho e nome;
- autorização por proprietário do recurso;
- logs sem tokens ou credenciais.

## PWA

A aplicação deve possuir:

- manifesto;
- ícones provisórios;
- service worker;
- shell básico em cache;
- comportamento seguro quando offline;
- detecção de atualização disponível.

O MVP não deve simular sucesso de operações financeiras ou temporais enquanto offline. Ações sensíveis devem aguardar conexão com o servidor.

## Configuração

A configuração deve ser lida de variáveis de ambiente e validada na inicialização.

Exemplos:

- URL do banco;
- porta da API;
- origem permitida do frontend;
- ambiente;
- segredos de autenticação futuros.

## Observabilidade inicial

No MVP, bastam:

- logs estruturados simples;
- endpoint de saúde;
- mensagens claras de inicialização;
- tratamento global de erros.

## Restrições

Não adotar na fundação:

- microserviços;
- filas distribuídas;
- Kubernetes;
- Redis sem necessidade comprovada;
- GraphQL;
- event sourcing;
- arquitetura excessivamente abstrata.

## Evolução

Novos sistemas devem ser implementados por especificações numeradas, uma de cada vez, preservando compatibilidade com os documentos de produto e domínio.
