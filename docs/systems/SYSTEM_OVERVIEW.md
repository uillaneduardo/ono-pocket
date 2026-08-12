# Visão Geral da Arquitetura de Sistemas — Ono Pocket

## 1. Visão Geral e Filosofia Arquitetural

O **Ono Pocket** é estruturado conceitualmente como um **Monólito Modular** focado em simulação, cultivo e trabalho com criaturas biológicas modulares chamadas **Onos**.

A arquitetura prioriza:
- **Simplicidade e Baixo Acoplamento:** Módulos de domínio independentes dentro de uma mesma aplicação backend, sem complexidade de microserviços.
- **Separação de Aplicação/Deploy:** Separação clara entre o container da aplicação cliente (**Web Client / PWA**) e o container da autoridade do jogo (**Game Server / API REST**).
- **Autoridade Estrita no Servidor:** O cliente web é exclusivamente uma camada visual e de interação. Toda a lógica de negócio, economia, geração procedural, recompensas, cobranças e gestão do tempo é de autoridade estrita do servidor.
- **Evolução Data-Driven:** Definições de conteúdo (trabalhos, partes de Onos, itens, tabelas de experiência) são orientadas a dados e declarativas, facilitando testes, balanceamento e suporte a mods.

---

## 2. Mapa Geral de Sistemas

```text
Ono Pocket
│
├── Web Client / PWA (React + Vite + Tailwind)
│   ├── Apresentação da Interface & Responsividade PWA
│   ├── Gerenciamento de Estado Visual & Renderização em Camadas de Onos
│   └── Envio de Ações do Jogador para a API
│
├── Game Server / API (Node.js + Express REST API)
│   │
│   ├── Account         (Identidade, Autenticação, Credenciais, Sessões)
│   ├── Player          (Perfil do Jogador, Progressão, Inventário, Onos Pertencentes)
│   ├── GameConfig      (Centralização de Parâmetros de Balanceamento e Overrides)
│   ├── Ono             (Entidade do Ono, Atributos, Condições, Fases, Composição Visual)
│   ├── OnoGenerator    (Gerador Procedural Determinístico por Seed e Algoritmo)
│   ├── Cultivation     (Gestão de Incubadoras, Ciclos e Protocolos de Cultivo)
│   ├── Laboratory      (Instalação do Laboratório, Habitats, Capacidade e Upgrades)
│   ├── Work            (Tipos de Trabalho, Aptidão, Atribuições e Resolução Temporal)
│   ├── Economy         (Moeda do Jogo "Coins", Saldo e Ledger/Histórico de Transações)
│   ├── Commerce        (Loja, Pacotes de Créditos Premium, Pedidos Pix e Pagamentos)
│   └── Content         (Repositório de Definições Data-Driven de Conteúdo)
│
├── Mod System          (Suporte a Conteúdo Declarativo da Comunidade)
│
└── Game Admin          (Painel Administrativo do Jogo — Futuro)
```

### Sistemas Futuros / Exclusivamente Conceituais
```text
Sistemas Futuros
├── World               (Ambientes e Ecossistemas de Onos)
├── Maps                (Navegação de Regiões e Localizações)
├── Events              (Eventos Temporais e Emergentes)
├── Story               (Progresso Narrativo e Descoberta de Lore)
└── Combat              (Enfrentamentos ou Desafios Avançados)
```

---

## 3. Separação de Aplicação e Implantação (Cliente vs. Servidor)

A infraestrutura de produção utiliza containers independentes conectados por rede segura e proxies reversos (ex: Cloudflare / Cloudflare Tunnel).

```text
Internet / Cloudflare
      │
Cloudflare Tunnel / Reverse Proxy
      │
      ├── https://ono.example.com
      │         ↓
      │    Web Container (React / PWA / Static Assets)
      │
      └── https://api.ono.example.com
                ↓
           API Container (Node.js Express / REST API)
                │
                ↓
            MySQL Database
```

### Princípios de Comunicação e Desacoplamento
1. **Origens e URLs Dinâmicas:** Nenhuma URL, domínio ou porta é *hardcoded* no código da aplicação. As origens são configuradas via variáveis de ambiente (`WEB_ORIGIN`, `VITE_API_URL`).
2. **Web Client sem Regras de Negócio:**
   - Apresenta a interface gráfica responsiva (PWA).
   - Renderiza a composição visual em camadas dos Onos.
   - Envia requisições HTTP para os endpoints `/api/*`.
   - **Não possui autoridade** sobre saldo de moedas, cálculo de atributos de Onos, taxas de sucesso de trabalho, validações financeiras ou tempo de cultivo.
3. **Game Server como Fonte da Verdade:**
   - Valida autorização do jogador.
   - Utiliza relógio confiável do servidor (`serverTime`).
   - Executa geradores procedurais de forma determinística.
   - Garante transações atômicas no banco de dados MySQL via Prisma ORM.

---

## 4. Classificação e Maturidade dos Sistemas

Os sistemas do Ono Pocket são classificados em três níveis de maturidade para governar o desenvolvimento incremental:

### 4.1. Core / MVP (Fundação do Primeiro Ciclo Jogável)
Sistemas indispensáveis para validar o ciclo principal de jogo (*Cultivar → Descobrir → Trabalhar → Receber → Melhorar*):
- **Ono:** Definição da entidade, atributos permanentes, condições temporárias e camadas visuais.
- **OnoGenerator:** Geração determinística por seed e algoritmo versão v1.
- **Cultivation:** Gerenciamento de incubadoras e tempo de desenvolvimento no servidor.
- **Laboratory:** Gestão básica de capacidade do laboratório do jogador.
- **Work:** Sistema de oportunidades de trabalho, cálculo de aptidão, desgaste e relatórios.
- **Economy:** Moeda principal do jogo (`Coins`), recebida em trabalhos e gasta em cultivos/upgrades.
- **Content:** Suporte data-driven para definições de trabalhos e componentes visuais.

### 4.2. Planned (Planejados para Especificações Sequenciais Próximas)
Sistemas necessários para produção completa, mas projetados para implementação isolada:
- **Account e Player:** Autenticação formal, credenciais, sessões e perfil do jogador (SPEC-002).
- **GameConfig:** Centralizador de parâmetros de balanceamento e overrides.
- **Commerce:** Integração com pagamentos reais (Pix via `PaymentProvider`), `PremiumCredits` e loja.

### 4.3. Future / Experimental (Fronteiras e Expansões)
Sistemas que possuem apenas suas responsabilidades e fronteiras delimitadas, garantindo que o núcleo não crie bloqueios arquiteturais:
- **Mod System:** Carregamento de pacotes declarativos de conteúdo criados pela comunidade.
- **Game Admin:** Painel administrativo REST/Web para gestão do jogo.
- **World, Maps, Events, Story, Combat:** Expansões de simulação e jogabilidade.

---

## 5. Índice da Documentação Detalhada por Sistema

A documentação detalhada de cada módulo encontra-se nos seguintes arquivos em `docs/systems/`:

1. `ACCOUNT_PLAYER.md` — Separação de Conta de Usuário e Perfil do Jogador.
2. `GAME_CONFIG.md` — Centralização de Parâmetros de Balanceamento e Ajustes.
3. `ONO.md` — Estrutura de Domínio dos Onos e seus Estados.
4. `ONO_GENERATOR.md` — Algoritmo Procedural Determinístico por Seed.
5. `CULTIVATION.md` — Incubadoras, Ciclos e Protocolos de Cultivo.
6. `LABORATORY.md` — Instalação do Laboratório, Habitats e Capacidade.
7. `WORK.md` — Atribuições de Trabalho, Aptidão, Desgaste e Relatórios.
8. `ECONOMY.md` — Moeda Interna (`Coins`) e Ledger Atômico de Transações.
9. `COMMERCE.md` — Loja, Créditos Premium, Cobranças Pix e `PaymentProvider`.
10. `CONTENT.md` — Modelagem Data-Driven de Trabalhos e Assets.
11. `MODS.md` — Sistema Declarativo de Mods e Limites de Segurança.
12. `FUTURE_SYSTEMS.md` — Delimitação dos Sistemas Futuros (World, Maps, Events, Story, Combat, Admin).
