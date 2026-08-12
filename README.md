# Ono Pocket

O **Ono Pocket** é um jogo PWA de simulação, cultivo e trabalho com criaturas biológicas modulares chamadas **Onos**.

O projeto é desenvolvido de forma simples, incremental e orientada por documentação. O objetivo inicial é validar um ciclo de jogo curto e consistente antes de adicionar sistemas mais complexos.

## Conceito

O jogador administra um pequeno laboratório onde pode cultivar Onos gerados proceduralmente. Cada Ono possui aparência, atributos e predisposições próprias. Depois de cultivado, ele pode ser enviado para trabalhos compatíveis com suas capacidades, gerando recursos para ampliar o laboratório e iniciar novos cultivos.

## Ciclo principal

1. Iniciar um cultivo.
2. Gerar um Ono procedural e modular.
3. Observar seus atributos e características físicas.
4. Prepará-lo para uma atividade.
5. Enviá-lo para trabalhar.
6. Receber um relatório e pagamento.
7. Melhorar o laboratório e cultivar novos Onos.

## Pilares do projeto

- **Simplicidade:** implementar apenas o necessário para o MVP.
- **Modularidade:** separar geração, cultivo, trabalho, economia e renderização visual.
- **Determinismo:** a mesma seed e versão do gerador devem produzir o mesmo Ono.
- **Aparência orientada por dados:** o Ono será montado por camadas visuais configuráveis.
- **Testabilidade:** regras de negócio devem ser independentes da interface.
- **Consistência:** toda implementação deve seguir a documentação oficial do repositório.

## Estrutura do Projeto

```text
├── .github/workflows/   Workflows do GitHub Actions (CI)
├── docs/architecture/  Registros de Decisão Arquitetural (ADR)
├── prisma/             Schema e migrations do Prisma ORM (MySQL)
├── public/             Assets estáticos do PWA (manifest, sw, ícones)
├── src/
│   ├── client/         Frontend React + Vite + Tailwind CSS
│   └── server/         Backend Node.js + Express REST API
├── tests/              Testes automatizados com Vitest
├── .env.example        Exemplo de variáveis de ambiente
├── eslint.config.js    Configuração do ESLint
└── vite.config.ts      Configuração do Vite
```

## Como Executar

### Pré-requisitos
- Node.js 20+
- npm 10+

### Instalação
```bash
git clone https://github.com/uillaneduardo/ono-pocket.git
cd ono-pocket
npm install
```

### Desenvolvimento
O comando principal para desenvolvimento é:
```bash
# Inicia a aplicação integrada (Backend Express + Frontend Vite na porta 3000)
npm run dev
```
> **Como funciona:** O script `npm run dev` executa o servidor Node.js/Express (`src/server/index.ts`) em modo watch com `tsx`. Em modo de desenvolvimento, o Express carrega o middleware do Vite (`vite.createServer`), processando o frontend React/Vite e servindo as rotas `/api/*` da REST API simultaneamente na mesma porta (3000).

Também estão disponíveis scripts individuais de desenvolvimento:
```bash
# Executa apenas o servidor backend Express
npm run dev:server

# Executa apenas o servidor Vite para o frontend
npm run dev:web
```

### Banco de Dados (Prisma ORM)
```bash
# Gera o cliente do Prisma ORM
npm run db:generate

# Executa as migrações do banco em desenvolvimento
npm run db:migrate
```

### Testes Automatizados
```bash
# Executa os testes unitários com Vitest
npm run test

# Executa os testes de integração com Vitest
npm run test:integration
```

### Linter & Checagem de Tipos
```bash
# Checagem de linting
npm run lint

# Checagem de tipos TypeScript
npm run typecheck
```

### Build para Produção
```bash
# Gera cliente estático e compila servidor Node.js em dist/
npm run build

# Executa servidor em produção
npm start
```

## Estado Atual

- **SPEC-001 — Project Foundation**: Concluído com sucesso (Frontend React + TS + Vite, Backend REST Node.js + Express, Prisma ORM MySQL, Vitest, PWA e GitHub Actions CI).
