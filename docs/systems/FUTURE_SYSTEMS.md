# Sistemas Futuros e Fronteiras Arquiteturais — Ono Pocket

## 1. Objetivo

Documentar as fronteiras, responsabilidades esperadas e limites dos sistemas futuros e experimentais do Ono Pocket, garantindo que o núcleo técnico atual não crie impedimentos ou decisões conflitantes para desenvolvimentos futuros.

---

## 2. Visão Geral dos Sistemas Futuros

Estes sistemas são categorizados como **Future / Experimental**. Suas especificações detalhadas e códigos **NÃO** fazem parte do MVP nem da fundação técnica imediata.

---

## 3. Delimitação das Fronteiras e Responsabilidades

### 3.1. Game Admin (Painel Administrativo)
- **Responsabilidades:**
  - Interface web de gestão para administradores do jogo.
  - Monitoramento de contas (`Accounts`), jogadores (`Players`), movimentações financeiras e métricas de desempenho.
  - Gestão de overrides do `GameConfig`, ativação/desativação de mods e catálogo de loja.
  - Auditoria de segurança e tratamento de suporte a pagamentos.
- **Fronteira Arquitetural:**
  - O Game Admin é um cliente consumidor da API REST (`admin.ono.example.com`).
  - **Nunca** acerta ou manipula o banco de dados diretamente via SQL do frontend. Todas as ações passam por rotas REST administrativas autenticadas com tokens de privilégio elevado.

### 3.2. World & Maps (Mundo e Mapas)
- **Responsabilidades:**
  - Apresentar regiões geográficas do universo de Ono Pocket.
  - Definir ecossistemas locais que influenciam quais oportunidades de trabalho ou linhagens de Onos estão disponíveis por região.
  - Navegação de mapas e deslocamentos no cliente.
- **Fronteira Arquitetural:**
  - A navegação em mapas é puramente visual e orientada a dados no frontend.
  - O tempo de deslocamento ou requisitos regionais são validados de forma centralizada pelo `Game Server`.

### 3.3. Events (Sistema de Eventos Temporais)
- **Responsabilidades:**
  - Gerenciar eventos globais ou sazonais no jogo (ex: festival de biotecnologia, tempestades ambientais).
  - Aplicar modificadores temporários de trabalho ou cultivo (ex: +20% recompensa em monitoramento ambiental por 48 horas).
- **Fronteira Arquitetural:**
  - Eventos são expostos como overrides temporários de dados no `GameConfig` ou parâmetros no sistema `Content`.

### 3.4. Story (Progresso Narrativo)
- **Responsabilidades:**
  - Apresentar diálogos, descobertas de lore e conquistas narrativas conforme o jogador evolui seu laboratório.
- **Fronteira Arquitetural:**
  - Árvores de diálogos e textos narrativos são entregues via `Content` como arquivos JSON declarativos sem lógica executável no cliente.

### 3.5. Combat (Enfrentamentos / Desafios Biológicos)
- **Responsabilidades:**
  - Sistema opcional de desafios ou simulações táticas entre Onos ou contra ameaças ambientais.
- **Fronteira Arquitetural:**
  - O combate (se futuramente implementado) será estritamente baseado em simulação calculada no servidor com base nos atributos do Ono, sem transformar o jogo em um MMO em tempo real.

---

## 4. Invariantes de Isolamento dos Sistemas Futuros

1. **Sem Adição Prematura:** Nenhum código, tabela ou rota para esses sistemas deve ser criada no repositório até que o ciclo principal (SPEC-001, SPEC-002, SPEC-003) esteja totalmente validado e em produção.
2. **Preservação do Núcleo:** O modelo de dados do Ono, Cultivo e Trabalho deve permanecer simples e testável, sem colunas nulas ou campos antecipados destinados a sistemas futuros não implementados.

---

## 5. Status

- **Maturidade:** Future / Experimental (Documentação conceitual de fronteiras).
