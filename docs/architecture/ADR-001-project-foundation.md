# ADR-001 — Project Foundation & Technical Stack

## Status
Aceito

## Contexto
O Ono Pocket é um jogo PWA de simulação e gestão leve em que o jogador cultiva criaturas biológicas modulares chamadas Onos. Para suportar o desenvolvimento modular incremental sem reescritas futuras, é necessário definir a fundação técnica inicial (SPEC-001).

## Decisão
Decidimos adotar a seguinte arquitetura base para o projeto Ono Pocket:

1. **Frontend**:
   - **Framework**: React 18 com TypeScript e Vite.
   - **Estilização**: Tailwind CSS.
   - **Plataforma**: PWA (Progressive Web App) responsiva com Service Worker para funcionamento em mobile e desktop.

2. **Backend**:
   - **Runtime**: Node.js com TypeScript e servidor REST usando Express.
   - **Porta**: 3000 (compatível com containers Cloud Run/sandboxes).
   - **Middleware**: CORS, suporte JSON nativo e escuta unificada de rotas estáticas e de API.

3. **Banco de Dados & ORM**:
   - **ORM**: Prisma ORM v5.
   - **SGBD**: MySQL / MariaDB (configurável via `DATABASE_URL`).

4. **Qualidade & Testes**:
   - **Linter**: ESLint 9.
   - **Testes**: Vitest + Supertest para testes automatizados das rotas REST.
   - **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`).

## Consequências
- **Positivas**:
  - Arquitetura limpa, com baixo acoplamento entre frontend e backend REST.
  - Tipagem forte ponta a ponta com TypeScript.
  - PWA instalável em dispositivos móveis e desktop.
  - Testes automatizados rápidos com Vitest.
  - CI pronto para validar PRs e novos commits.

- **Limitações**:
  - A SPEC-001 não inclui persistência em banco ativo de produção MySQL (somente schema/ORM prontos).
  - Funcionalidades de domínio (Onos, cultivo, trabalhos, autenticação) serão implementadas nas SPECs subsequentes.
