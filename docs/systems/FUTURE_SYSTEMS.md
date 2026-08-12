# Sistemas Futuros e Fronteiras Arquiteturais — Ono Pocket

## 1. Objetivo

Documentar responsabilidades esperadas e limites dos sistemas futuros sem antecipar código, tabelas ou dependências no núcleo atual.

---

## 2. Regra Geral

Estes sistemas são **Future / Experimental**. Só devem receber implementação após:
- o ciclo principal do jogo estar validado;
- existir uma SPEC dedicada;
- a necessidade estar clara;
- a implementação não exigir acoplamento prematuro em módulos atuais.

Não amarrar essa decisão a números específicos de SPEC, pois a ordem de evolução pode mudar.

---

## 3. Game Admin

### Responsabilidades futuras
- gestão de contas e jogadores;
- consulta/auditoria de Onos;
- edição de parâmetros permitidos de GameConfig;
- gestão de conteúdo oficial;
- gestão de mods aprovados;
- monitoramento de Economy e Commerce;
- suporte a pagamentos;
- estatísticas e gráficos.

### Fronteira
- cliente administrativo separado;
- consome API administrativa autenticada;
- nunca acessa MySQL diretamente pelo frontend;
- permissões administrativas são diferentes das permissões de jogador;
- operações críticas precisam de auditoria.

---

## 4. World & Maps

### Responsabilidades futuras
- regiões e localizações;
- navegação;
- disponibilidade regional de conteúdo;
- condições ambientais e deslocamento quando houver mecânica concreta.

### Fronteira
O mapa pode ser renderizado no cliente, mas regras de desbloqueio, deslocamento, custos e efeitos persistentes pertencem ao servidor.

---

## 5. Events

### Responsabilidades futuras
- eventos globais, sazonais ou pessoais;
- ativação temporária de conteúdo/modificadores;
- gatilhos que possam afetar Work, World ou Story.

### Fronteira
Events não deve transformar GameConfig em um saco genérico de estados temporários. Eventos podem consumir regras de Content e produzir modificadores explicitamente modelados/versionados.

---

## 6. Story

### Responsabilidades futuras
- progressão narrativa;
- diálogos e escolhas;
- descoberta de lore;
- desbloqueios narrativos.

### Fronteira
Conteúdo narrativo pode ser declarativo, mas consequências persistentes e validação de escolhas pertencem ao servidor.

---

## 7. Combat

### Responsabilidades futuras
- desafios táticos ou simulações baseadas nas características dos Onos.

### Fronteira
- resolução autoritativa no servidor;
- reutilizar atributos/partes existentes quando adequado, evitando criar um segundo modelo incompatível de Ono;
- não assumir MMO em tempo real;
- modo, PvE/PvP e regras só serão definidos quando a mecânica for planejada.

---

## 8. Invariantes para o Núcleo Atual

1. Não criar tabelas, campos nulos, rotas ou serviços “reservados” para sistemas futuros.
2. IDs e modelos atuais devem ser extensíveis sem tentar prever todos os usos futuros.
3. Ono, Cultivation, Work, Economy e Content devem permanecer independentes de World/Story/Combat enquanto esses sistemas não existirem.
4. Funcionalidades futuras entram através de interfaces/casos de uso explícitos, não por condicionais espalhadas pelo núcleo.

---

## 9. Status

- **Maturidade:** Future / Experimental.
