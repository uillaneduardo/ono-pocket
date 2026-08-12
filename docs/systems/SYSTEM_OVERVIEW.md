# Visão Geral da Arquitetura de Sistemas — Ono Pocket

## 1. Visão Geral e Filosofia Arquitetural

O **Ono Pocket** é estruturado conceitualmente como um **monólito modular** focado em simulação, cultivo e trabalho com criaturas biológicas modulares chamadas **Onos**.

A arquitetura prioriza:
- **Simplicidade e baixo acoplamento:** módulos de domínio independentes dentro de uma mesma aplicação backend, sem complexidade de microserviços.
- **Separação de aplicação/deploy:** separação clara entre o container da aplicação cliente (**Web Client / PWA**) e o container da autoridade do jogo (**Game Server / API REST**).
- **Autoridade estrita no servidor:** o cliente web é camada visual e de interação. Regras de negócio, economia, geração procedural, recompensas, pagamentos e gestão do tempo são de autoridade do servidor.
- **Evolução data-driven:** definições de conteúdo são declarativas, versionadas e validadas, facilitando testes, balanceamento e suporte futuro a mods.

---

## 2. Mapa Geral de Sistemas

```text
Ono Pocket
│
├── Web Client / PWA
│   ├── Interface e navegação
│   ├── Estado visual e renderização dos Onos
│   └── Envio de ações do jogador para a API
│
├── Game Server / API
│   │
│   ├── Account         (Identidade, autenticação, credenciais e sessões)
│   ├── Player          (Perfil e progressão do jogador)
│   ├── GameConfig      (Parâmetros de balanceamento)
│   ├── Ono             (Entidade persistente do organismo)
│   ├── OnoGenerator    (Geração procedural determinística e versionada)
│   ├── Cultivation     (Ciclos de cultivo)
│   ├── Laboratory      (Instalações, capacidade e upgrades)
│   ├── Work            (Oportunidades, atribuições e resolução)
│   ├── Economy         (Carteiras virtuais e ledger)
│   ├── Commerce        (Loja, pedidos, Pix e pagamentos reais)
│   └── Content         (Definições data-driven versionadas)
│
├── Mod System          (Conteúdo declarativo da comunidade — futuro)
│
└── Game Admin          (Cliente administrativo — futuro)
```

### Sistemas futuros / exclusivamente conceituais

```text
World
Maps
Events
Story
Combat
```

---

## 3. Separação de Aplicação e Implantação

O cenário inicial prevê containers independentes e comunicação via HTTPS/API.

```text
Internet / Cloudflare
      │
Cloudflare Tunnel / Reverse Proxy
      │
      ├── https://ono.example.com
      │         ↓
      │    Web Container
      │
      └── https://api.ono.example.com
                ↓
           API Container
                │
                ↓
              MySQL
```

O domínio é configurável e não constitui dependência arquitetural. Web, API e banco podem futuramente ser hospedados em provedores distintos.

### Princípios de comunicação

1. **URLs configuráveis:** nenhum hostname ou porta de produção é hardcoded. Origens são configuradas por ambiente.
2. **Cliente sem autoridade de negócio:** o Web Client não determina saldos, atributos, recompensas, tempos, sucesso de trabalhos ou pagamentos.
3. **Servidor como fonte de verdade:** autorização, relógio, regras, persistência e operações econômicas pertencem ao Game Server.
4. **Banco privado:** apenas o backend acessa o banco. Web Client e Game Admin nunca acessam MySQL diretamente.

---

## 4. Classificação e Maturidade dos Sistemas

A classificação indica a importância arquitetural, não necessariamente a ordem exata das SPECs.

### 4.1. Core / MVP

Necessários para o primeiro ciclo jogável online:
- **Account & Player:** identidade, sessão e isolamento dos dados do jogador.
- **GameConfig (defaults):** parâmetros padrão versionados em código; overrides administrativos ficam para depois.
- **Ono:** entidade e estado persistente.
- **OnoGenerator:** geração determinística por seed e versões de algoritmo/conteúdo.
- **Cultivation:** ciclo temporal de formação de um Ono.
- **Laboratory:** capacidade, incubadoras e upgrades básicos.
- **Work:** oportunidades, atribuições e resolução.
- **Economy:** Coins, futuras PremiumCredits e ledger auditável.
- **Content:** conteúdo oficial declarativo e versionado.

### 4.2. Planned

- **Commerce:** loja, pedidos, integração Pix por `PaymentProvider` e monetização.
- **GameConfig overrides:** edição persistida/auditada de parâmetros selecionados.
- **Notificações:** conclusão de cultivos e trabalhos após o ciclo principal estar funcional.

### 4.3. Future / Experimental

- **Mod System:** carregamento de pacotes declarativos da comunidade.
- **Game Admin:** painel de administração e observabilidade.
- **World, Maps, Events, Story e Combat:** expansões de jogabilidade.

---

## 5. Ordem de Evolução

A infraestrutura pode ser reorganizada antes dos módulos de domínio quando isso reduzir refatorações futuras. Em particular, a separação real entre Web e API em containers independentes deve ocorrer antes de autenticação e demais regras persistentes, pois influencia origem da API, CORS, cookies/sessões e deploy.

Cada nova capacidade deve possuir SPEC própria e critérios de aceitação. A numeração das SPECs é definida no momento do planejamento e não deve ser hardcoded nestes documentos de domínio.

---

## 6. Índice da Documentação

1. `ACCOUNT_PLAYER.md` — Conta e perfil de jogo.
2. `GAME_CONFIG.md` — Parâmetros e balanceamento.
3. `ONO.md` — Entidade Ono.
4. `ONO_GENERATOR.md` — Geração procedural.
5. `CULTIVATION.md` — Ciclos de cultivo.
6. `LABORATORY.md` — Instalações e capacidade.
7. `WORK.md` — Sistema de trabalho.
8. `ECONOMY.md` — Carteiras e ledger.
9. `COMMERCE.md` — Loja, créditos premium e pagamentos.
10. `CONTENT.md` — Conteúdo data-driven.
11. `MODS.md` — Mods declarativos.
12. `FUTURE_SYSTEMS.md` — Sistemas futuros e suas fronteiras.
