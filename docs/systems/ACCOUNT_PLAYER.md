# Sistema Account & Player — Ono Pocket

## 1. Objetivo

Separar conceitualmente a identidade de acesso do usuário (**Account**) da representação da pessoa e do progresso dentro do jogo (**Player**).

---

## 2. Responsabilidades

### 2.1. Account (Identidade & Acesso)
- Autenticação e validação de credenciais de acesso.
- Gestão de sessões ativas e tokens de acesso (JWT / Cookies de Sessão).
- Configurações globais da conta (email, senha, preferências de segurança, status da conta).
- Proteção da identidade técnica do usuário.

### 2.2. Player (Perfil de Jogo & Progressão)
- Representação do jogador dentro do universo do Ono Pocket.
- Vínculo com os Onos pertencentes ao jogador.
- Estado da instalação do Laboratório e Habitats.
- Gestão do inventário futuro de recursos e insumos.
- Acompanhamento da progressão do jogador e conquistas/histórico.

---

## 3. Entidades de Domínio

### Account
- `id`: UUID (Chave primária).
- `email`: String única.
- `passwordHash`: String contendo o hash seguro da senha (Argon2 / bcrypt).
- `status`: Enum (`active`, `suspended`, `pending_verification`).
- `createdAt`: DateTime.
- `updatedAt`: DateTime.

### Player
- `id`: UUID (Chave primária).
- `accountId`: UUID (Chave estrangeira apontando para `Account`, relação 1:1).
- `displayName`: String (Nome visível do cultivador/jogador).
- `level`: Integer (Nível de experiência do jogador/laboratório).
- `createdAt`: DateTime.
- `updatedAt`: DateTime.

---

## 4. Estados

### Account States
- **unauthenticated:** Usuário sem sessão ativa.
- **authenticated:** Usuário com credenciais validadas e sessão ativa.
- **suspended:** Conta bloqueada por questões de segurança ou violação de regras.

---

## 5. Entradas e Saídas

### Entradas (Ações da API)
- `registerAccount(email, password, displayName)`
- `login(email, password)`
- `logout(sessionId)`
- `updatePlayerProfile(playerId, data)`

### Saídas
- Tokens/Sessões de autenticação válidos.
- Perfil do Jogador (`PlayerProfileDTO`).

---

## 6. Regras e Invariantes

1. **Relação 1:1 Rigorosa:** Toda `Account` possui exatamente um perfil de `Player` associado.
2. **Isolamento de Dados:** Um `Player` só pode visualizar e manipular os Onos, Incubadoras e Recursos associados ao seu próprio `playerId`.
3. **Senhas Seguras:** Nenhuma senha ou credencial é armazenada em texto puro.
4. **Desacoplamento de Domínio:** Lógicas do jogo (trabalhos, cultivos) dependem exclusivamente do `playerId`, e nunca de detalhes da `Account`.

---

## 7. Eventos Produzidos

- `AccountRegistered(accountId, email)`
- `PlayerCreated(playerId, accountId, displayName)`
- `PlayerLoggedIn(accountId, timestamp)`

---

## 8. Dependências

- **Banco de Dados Relacional:** Tabela `accounts` e `players` no MySQL via Prisma.
- **Serviço de Criptografia:** Utilitários de hash e assinatura de tokens no backend Node.js.

---

## 9. Parâmetros Configuráveis

- `auth.tokenExpirationTime`: Tempo de expiração da sessão (ex: 7 dias).
- `auth.minPasswordLength`: Tamanho mínimo da senha (ex: 8 caracteres).

---

## 10. Segurança

- **Segredos no Servidor:** As chaves de assinatura de token permanecem exclusivas no backend via variáveis de ambiente (`JWT_SECRET`).
- **Sanitização de Dados:** Respostas de API nunca contêm `passwordHash` ou dados sensíveis da conta.

---

## 11. Fora do Escopo

- Login via redes sociais (OAuth de terceiros) nesta fase inicial.
- Múltiplos perfis de jogador por conta.

---

## 12. Status

- **Maturidade:** Planned (Agendado para implementação formal na SPEC-002).
