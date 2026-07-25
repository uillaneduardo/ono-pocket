# SPEC-001 — Fundação do projeto

## Status

Aprovada para implementação.

## Objetivo

Criar a fundação técnica do Ono Pocket como uma aplicação web progressiva, responsiva, modular e testável, sem implementar ainda os sistemas completos de geração procedural, cultivo, trabalho ou economia.

## Contexto

O repositório já contém a visão do produto, o escopo do MVP, o domínio inicial dos Onos, as regras de geração, cultivo, trabalho, sistema visual, arquitetura e testes.

Esta especificação deve produzir uma base executável para as próximas funcionalidades, reduzindo improvisações técnicas e garantindo que todas as etapas futuras possam ser testadas isoladamente.

## Documentos obrigatórios

Antes de implementar, o agente deve ler:

- `README.md`;
- `ai/AI_INSTRUCTIONS.md`;
- `product/PRODUCT_VISION.md`;
- `product/MVP_SCOPE.md`;
- `product/GAME_LOOP.md`;
- `product/GLOSSARY.md`;
- `game-design/ONOS.md`;
- `game-design/PROCEDURAL_GENERATION.md`;
- `game-design/CULTIVATION.md`;
- `game-design/WORK_SYSTEM.md`;
- `visual-system/VISUAL_SYSTEM.md`;
- `technical/ARCHITECTURE.md`;
- `technical/TESTING.md`.

## Dentro do escopo

### Estrutura do projeto

- workspace npm simples;
- frontend React, TypeScript e Vite;
- backend Node.js e TypeScript;
- pacotes compartilhados quando necessários;
- Prisma configurado para MySQL;
- scripts de desenvolvimento e validação;
- documentação de instalação.

### Frontend inicial

- página inicial responsiva;
- título “Ono Pocket”;
- descrição curta do projeto;
- representação visual provisória e original de um Ono usando CSS ou SVG local;
- indicação clara de versão inicial;
- estado de conexão com a API;
- estados de carregamento, sucesso e erro;
- navegação mínima preparada para expansões futuras, sem criar telas não implementadas.

### Backend inicial

- servidor HTTP;
- endpoint `GET /api/health`;
- resposta com estado, versão e horário do servidor;
- tratamento global de erros;
- validação de variáveis de ambiente;
- CORS configurável;
- desligamento gracioso;
- logs simples e seguros.

### Banco de dados

- configuração inicial do Prisma para MySQL;
- migration inicial apenas se houver uma entidade realmente necessária para a fundação;
- comando de geração do cliente;
- comando de aplicação de migrations;
- banco de teste separado por variável de ambiente.

Não criar antecipadamente tabelas de conta, Ono, cultivo, trabalho, economia ou assets nesta SPEC.

### PWA inicial

- manifesto válido;
- nome e nome curto;
- tema inicial;
- ícones provisórios originais;
- service worker;
- cache apenas do shell essencial;
- detecção simples de modo offline;
- nenhuma simulação offline de ações futuras.

### Qualidade

- ESLint;
- TypeScript em modo estrito;
- testes unitários mínimos;
- teste de integração do endpoint de saúde;
- build de produção;
- GitHub Actions.

### Documentação

- atualizar `README.md` com instalação e execução;
- criar `.env.example`;
- documentar comandos pós-clone;
- documentar como configurar o MySQL;
- registrar limitações atuais.

## Fora do escopo

Não implementar nesta SPEC:

- cadastro ou login;
- recuperação de senha;
- contas de jogador;
- gerador procedural funcional;
- persistência de Onos;
- cultivo;
- trabalhos;
- saldo ou economia;
- inventário;
- notificações push;
- painel administrativo;
- upload de assets;
- editor visual;
- múltiplas moedas;
- integração com IA generativa;
- Firebase;
- Supabase;
- serviços externos obrigatórios;
- microserviços;
- filas;
- Redis;
- GraphQL.

## Requisitos de arquitetura

### REGRA-001 — Monólito modular

O sistema deve permanecer simples. Frontend, backend e regras compartilhadas podem existir no mesmo repositório, mas devem possuir responsabilidades claras.

### REGRA-002 — Regras fora da interface

Mesmo que ainda existam poucas regras de domínio, a estrutura não deve incentivar lógica de negócio dentro de componentes React.

### REGRA-003 — Configuração validada

A aplicação deve falhar com mensagem clara quando uma variável obrigatória estiver ausente ou inválida.

### REGRA-004 — Horário do servidor

O endpoint de saúde deve retornar horário gerado pelo servidor, preparando a arquitetura para operações temporais futuras.

### REGRA-005 — Sem credenciais

Nenhuma credencial real pode ser incluída no repositório.

### REGRA-006 — Scripts previsíveis

Os comandos principais devem poder ser executados a partir da raiz do repositório.

## Estrutura sugerida

A implementação pode usar:

```text
apps/
├── web/
└── server/
packages/
├── shared/
└── domain/
prisma/
```

Uma estrutura equivalente é aceitável se for mais simples e estiver documentada.

## Contrato do endpoint de saúde

### Requisição

```http
GET /api/health
```

### Resposta de sucesso

```json
{
  "status": "ok",
  "service": "ono-pocket-api",
  "version": "0.1.0",
  "serverTime": "2026-07-25T23:00:00.000Z"
}
```

O horário acima é apenas ilustrativo e deve ser gerado dinamicamente.

## Interface inicial

A página deve apresentar:

- nome do projeto;
- texto explicando que um organismo está em formação;
- arte temporária simples;
- indicador de API conectada ou indisponível;
- indicação de possibilidade de instalação como PWA quando suportada;
- layout adequado a telas de 320 pixels ou mais.

Não criar dashboard vazio com dezenas de menus.

## Estados obrigatórios

- carregando a API;
- API disponível;
- API indisponível;
- offline;
- atualização da PWA disponível, quando detectável.

## Variáveis de ambiente

Definir ao menos exemplos equivalentes a:

```env
NODE_ENV=development
API_PORT=3001
WEB_ORIGIN=http://localhost:5173
DATABASE_URL=mysql://usuario:senha@localhost:3306/ono_pocket
TEST_DATABASE_URL=mysql://usuario:senha@localhost:3306/ono_pocket_test
VITE_API_URL=http://localhost:3001
```

Os nomes podem variar, mas devem ser consistentes e documentados.

## Scripts obrigatórios

A raiz deve oferecer comandos equivalentes a:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
npm run test:integration
npm run db:generate
npm run db:migrate
```

Caso frontend e backend possam ser executados separadamente, documentar os scripts adicionais.

## Testes obrigatórios

### Unitários

- validação da configuração;
- formatação ou construção da resposta de saúde;
- utilitário compartilhado relevante, se existir.

### Integração

- `GET /api/health` retorna HTTP 200;
- resposta segue o contrato;
- `serverTime` contém data ISO válida.

### Frontend

- página inicial renderiza o título;
- estado de carregamento é apresentado;
- sucesso da API é apresentado;
- falha da API é apresentada.

### Build

- frontend gera build de produção;
- backend compila sem erros;
- service worker e manifesto são incluídos corretamente.

## GitHub Actions

Criar workflow que execute em push e pull request:

1. checkout;
2. configuração de versão LTS compatível do Node.js;
3. `npm ci`;
4. geração do cliente Prisma;
5. lint;
6. typecheck;
7. testes unitários;
8. build.

A CI não deve exigir segredos reais para executar validações que não dependam do banco.

## Critérios de aceitação

- [ ] O projeto instala com `npm ci` após existir lockfile.
- [ ] O frontend inicia localmente.
- [ ] O backend inicia localmente.
- [ ] A página inicial consulta o endpoint de saúde.
- [ ] O endpoint retorna o contrato definido.
- [ ] A interface é utilizável em celular.
- [ ] O manifesto PWA é válido.
- [ ] O service worker é registrado.
- [ ] O app apresenta estado offline sem fingir concluir operações.
- [ ] `npm run lint` passa.
- [ ] `npm run typecheck` passa.
- [ ] `npm run test` passa.
- [ ] `npm run test:integration` passa no ambiente configurado.
- [ ] `npm run build` passa.
- [ ] `.env.example` está completo e sem segredos.
- [ ] README informa todos os comandos necessários após clone ou pull.
- [ ] Nenhum sistema fora do escopo foi implementado.

## Formato obrigatório da entrega do AI Studio

Ao concluir, informar:

### Resumo

O que foi implementado.

### Arquivos

Todos os arquivos criados, modificados e removidos.

### Dependências

Dependências adicionadas e justificativa.

### Banco de dados

Configuração do Prisma e migrations existentes.

### Comandos após pull

Lista exata de comandos que o usuário deve executar.

### Testes executados

Comandos reais e resultados reais.

### Limitações

Tudo que não foi validado ou depende do ambiente local.

### Próximo passo

Sugerir a SPEC-002 de autenticação, sem implementá-la.

## Proibição de avanço automático

Após concluir esta especificação, não implementar autenticação, geração de Onos, cultivo ou trabalho sem nova autorização.
