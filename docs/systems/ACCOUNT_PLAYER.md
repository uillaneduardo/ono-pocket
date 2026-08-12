# Sistema Account & Player — Ono Pocket

## 1. Objetivo

Separar a identidade de acesso (**Account**) da representação e progresso dentro do jogo (**Player**).

---

## 2. Responsabilidades

### Account
- cadastro e identidade técnica;
- autenticação de credenciais;
- sessões;
- estado da conta;
- preferências de segurança;
- futuras verificações e recuperação de acesso.

### Player
- perfil visível dentro do jogo;
- vínculo com Onos;
- laboratório;
- inventário futuro;
- progressão e histórico do jogador.

As regras de jogo dependem de `playerId` e não de detalhes de autenticação.

---

## 3. Entidades Conceituais

### Account
- `id`: UUID.
- `email`: String única normalizada.
- `passwordHash`: hash seguro.
- `status`: Enum (`active`, `suspended`, `pending_verification` quando aplicável).
- `createdAt`: DateTime.
- `updatedAt`: DateTime.

### Player
- `id`: UUID.
- `accountId`: UUID único, relação 1:1.
- `displayName`: String.
- campos de progressão apenas quando houver função documentada.
- `createdAt`: DateTime.
- `updatedAt`: DateTime.

Não adicionar `level` genérico apenas por convenção. Caso exista nível de jogador/laboratório, sua função e progressão devem ser definidas em SPEC própria.

---

## 4. Regras e Invariantes

1. Cada Account possui no máximo um Player; no fluxo normal de criação, Account e Player devem resultar em uma associação 1:1 válida.
2. Recursos pertencentes ao jogador são autorizados por `playerId` obtido da sessão autenticada, nunca por um `playerId` arbitrário confiado do cliente.
3. Senhas nunca são armazenadas em texto puro.
4. Dados sensíveis da Account não são expostos em DTOs de Player.
5. Suspensão de Account impede novas ações autenticadas conforme política definida pelo servidor.
6. Criação de Account/Player deve ser consistente: falha parcial não pode deixar uma conta utilizável sem o estado mínimo exigido pelo jogo.

---

## 5. Sessões

A implementação exata será definida na SPEC de Account/Player considerando que Web e API utilizam subdomínios/hosts separados.

Diretrizes:
- preferir credencial de sessão protegida por cookie `HttpOnly` + `Secure` quando compatível com o modelo final de deploy;
- não armazenar token de longa duração em `localStorage` por padrão;
- CORS, `SameSite`, domínio/path do cookie e CSRF devem ser tratados explicitamente;
- sessões devem ser revogáveis e possuir expiração;
- segredos de assinatura/chaves permanecem apenas no backend.

Não fixar JWT como requisito arquitetural. JWT pode ser usado internamente se houver justificativa, mas não deve surgir apenas por padrão de framework.

---

## 6. Entradas Conceituais

- `registerAccount(email, password, displayName)`
- `login(email, password)`
- `logout(currentSession)`
- `getCurrentPlayer()`
- `updatePlayerProfile(data)`

A API não deve exigir que o cliente informe o próprio `playerId` para operações que podem derivá-lo da sessão.

---

## 7. Segurança

- hash de senha com algoritmo apropriado e parâmetros atualizados;
- rate limiting/defesas contra abuso nos endpoints de autenticação;
- mensagens de erro que não revelem informação sensível desnecessária;
- cookies/tokens não registrados em logs;
- validação e normalização de email;
- proteção contra enumeração de contas quando aplicável;
- autorização sempre no backend.

---

## 8. Eventos Conceituais

- `AccountRegistered(accountId)`
- `PlayerCreated(playerId, accountId)`
- eventos de auditoria de sessão quando úteis.

Evitar incluir email/sensíveis em eventos/logs sem necessidade.

---

## 9. Status

- **Maturidade:** Core / MVP.
- A implementação deve ocorrer somente após a fundação de deploy Web/API estar definida, pois isso influencia sessão, CORS e cookies.
