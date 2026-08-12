# Arquitetura técnica — Ono Pocket

## Objetivo

Manter uma base simples, modular, testável e adequada ao crescimento incremental do Ono Pocket.

## Princípios

- monólito modular no backend;
- Web Client e Game Server separados como aplicações/deploys;
- regras de negócio fora da interface;
- servidor como autoridade de estado, tempo e economia;
- banco relacional como persistência principal;
- APIs explícitas;
- conteúdo data-driven e versionado;
- sem microserviços no MVP;
- sem dependência obrigatória de serviços proprietários para o núcleo do jogo.

## Stack

### Web Client
- React;
- TypeScript;
- Vite;
- PWA;
- CSS responsivo/Tailwind quando útil.

### Game Server
- Node.js;
- TypeScript;
- Express/API REST;
- Prisma ORM;
- MySQL.

### Qualidade
- ESLint;
- TypeScript strict/verificação de tipos;
- testes unitários;
- testes de integração;
- build de produção;
- GitHub Actions.

## Estado da Fundação

A SPEC-001 implementou uma fundação integrada funcional. A próxima reorganização técnica deverá separar Web e API em aplicações/containers independentes antes de implementar autenticação persistente e os módulos centrais do jogo.

Essa reorganização é uma mudança de aplicação/deploy, não adoção de microserviços.

## Estrutura Alvo

Estrutura conceitual sugerida:

```text
apps/
├── web/
└── server/

packages/
├── domain/
├── game-config/
├── ono-generator/
├── visual-system/
└── shared/

prisma/
docs/
docker/
compose.yml
```

A estrutura física pode variar se mantiver responsabilidades claras e não introduzir abstrações sem necessidade.

## Responsabilidades

### `apps/web`
- interface do jogador;
- navegação e estado visual;
- PWA;
- consumo da API;
- renderização dos Onos;
- sem autoridade sobre economia, geração, pagamentos ou tempo.

### `apps/server`
- autenticação/autorização;
- API REST;
- orquestração dos casos de uso;
- acesso ao banco;
- relógio confiável;
- validação;
- regras econômicas e financeiras;
- carregamento de configuração e conteúdo.

### `packages/domain`
- tipos e invariantes de domínio independentes de HTTP/UI quando isso simplificar os testes.

### `packages/game-config`
- defaults tipados e versionados de balanceamento;
- sem depender de interface administrativa no MVP.

### `packages/ono-generator`
- geração determinística;
- versionamento do algoritmo;
- processamento de catálogo/snapshots recebidos como entrada;
- testes determinísticos.

### `packages/visual-system`
- composição visual;
- ordem de camadas;
- fallbacks;
- validações de manifesto visual.

### `packages/shared`
- contratos compartilhados e utilitários realmente genéricos;
- não deve virar um depósito de regras de negócio.

## Deploy Inicial

Cenário alvo no homelab:

```text
Cloudflare / Tunnel
      │
      ├── ono.<dominio>
      │       ↓
      │   Web Container
      │
      └── api.ono.<dominio>
              ↓
          API Container
              ↓
            MySQL
```

O banco pode ser remoto ou local. Somente a API o acessa.

Nenhuma regra do jogo depende do hostname atual. `VITE_API_URL`, origens permitidas e demais endereços são configurados por ambiente.

## Comunicação Web/API

- HTTPS + JSON;
- erros com formato consistente;
- CORS explícito;
- autenticação projetada considerando hosts/subdomínios distintos;
- operações sensíveis nunca são confirmadas apenas pelo cliente.

## Persistência e Transações

MySQL/Prisma será usado para dados persistentes.

Migrations:
- são versionadas;
- migrations aplicadas não são editadas retroativamente;
- novos sistemas só criam tabelas quando sua SPEC for implementada;
- não antecipar colunas/tabelas para sistemas futuros.

Operações que combinam mudanças de estado e economia devem usar transação/garantia de idempotência apropriada.

## Tempo

O servidor é autoridade do tempo.

Cultivos e trabalhos armazenam `startedAt`/`endsAt` e snapshots necessários. O estado é calculado quando consultado/resolvido; não existe processo contínuo individual por Ono.

## Segurança

- segredos apenas no backend/variáveis de ambiente;
- `.env.example` nunca contém credenciais reais;
- validação de entrada;
- autorização por proprietário/recurso;
- senhas com hash apropriado;
- logs sem tokens, senhas ou segredos;
- uploads/mods futuros com validação de MIME, tamanho, caminho e schema;
- cliente e Game Admin nunca acessam banco diretamente.

## PWA

- manifesto e ícones;
- service worker;
- shell/offline seguro;
- operações econômicas, temporais e financeiras aguardam servidor;
- cache nunca simula sucesso de operações sensíveis.

## Observabilidade Inicial

- logs estruturados simples;
- endpoint de saúde;
- mensagens de inicialização;
- tratamento global de erros;
- métricas avançadas apenas quando houver necessidade.

## Restrições

Não adotar sem necessidade comprovada:
- microserviços;
- Redis;
- filas distribuídas;
- RabbitMQ/Kafka;
- Kubernetes;
- Elasticsearch;
- GraphQL;
- event sourcing;
- abstrações genéricas excessivas.

## Documentação de Sistemas

A fonte de verdade para as fronteiras dos sistemas está em:

- [`docs/systems/SYSTEM_OVERVIEW.md`](../docs/systems/SYSTEM_OVERVIEW.md)

Documentos individuais em `docs/systems/` detalham Account/Player, GameConfig, Ono, OnoGenerator, Cultivation, Laboratory, Work, Economy, Commerce, Content, Mods e sistemas futuros.

Novas funcionalidades devem ser implementadas por SPECs numeradas, uma de cada vez, e revisadas contra esses contratos antes do merge.
