# Sistema Mod System — Ono Pocket

## 1. Objetivo

Preparar a arquitetura do Ono Pocket para aceitar modificações e novos conteúdos criados pela comunidade de forma declarativa (*data-driven*), sem comprometer segurança, estabilidade, compatibilidade ou integridade econômica.

---

## 2. Diretrizes Principais

1. **Conteúdo declarativo apenas:** mods fornecem dados validados e mídia estática.
2. **Sem execução arbitrária:** JavaScript, TypeScript, WASM, Python, Shell ou qualquer código fornecido pelo mod não é executado no servidor nem no cliente.
3. **Sem acesso a capacidades internas:** conteúdo de mod não recebe referências para banco, filesystem, `process.env`, autenticação, Economy, Commerce ou APIs administrativas.
4. **Carregador confiável:** o próprio Game Server pode ler arquivos do pacote para validá-los e importá-los; isso não significa que o mod possua acesso ao filesystem.
5. **Namespace obrigatório:** conteúdo de mod utiliza identificadores namespaced e nunca sobrescreve silenciosamente conteúdo oficial.

---

## 3. Estrutura Conceitual de Pacote

```text
mods/
└── example-mod/
    ├── mod.json
    ├── assets/
    │   ├── sprites/
    │   └── audio/
    └── content/
        ├── works/
        ├── ono-parts/
        ├── items/
        ├── maps/
        └── events/
```

### Manifesto

```json
{
  "id": "biotech-expansions",
  "name": "Expansão Biotecnológica",
  "version": "1.0.0",
  "author": "Comunidade Ono",
  "description": "Adiciona novos conteúdos declarativos.",
  "minEngineVersion": "0.1.0",
  "dependencies": []
}
```

---

## 4. Tipos de Conteúdo Permitidos

Quando os respectivos sistemas existirem, mods poderão fornecer:
- partes e variações visuais de Onos;
- animações e mídia estática;
- trabalhos declarativos;
- itens e insumos declarativos;
- mapas e cenários declarativos;
- eventos e árvores narrativas declarativas.

Permissão de schema não implica automaticamente permissão de impacto econômico.

---

## 5. Fronteiras de Segurança

Mods não podem acessar ou modificar diretamente:
- banco de dados, Prisma ou infraestrutura;
- variáveis de ambiente e segredos;
- contas, sessões ou permissões;
- Game Admin;
- `PaymentProvider`, Pix ou pedidos de pagamento;
- preços em BRL;
- carteiras de jogadores;
- `PremiumCredits`;
- concessão arbitrária de `Coins`.

### Conteúdo com impacto econômico

Um `WorkDefinition` de mod pode descrever que uma atividade possui recompensa, mas o valor efetivamente concedido deve passar pelas políticas da Economy e pelo perfil do servidor.

No servidor oficial:
- recompensas de mods devem ser rejeitadas, normalizadas ou limitadas por regras/caps oficiais;
- conteúdo com impacto relevante pode exigir aprovação administrativa antes da ativação;
- um mod nunca chama diretamente operações de crédito/débito.

Uma futura instalação self-hosted poderá adotar políticas diferentes, mas isso deve ser configuração explícita do administrador da instância.

---

## 6. Validação e Importação

Antes da ativação:
1. validar manifesto;
2. validar schemas de todos os arquivos;
3. verificar tamanho, MIME e caminhos de assets;
4. impedir path traversal e referências externas não autorizadas;
5. resolver dependências e versões compatíveis;
6. aplicar namespace;
7. executar validações semânticas e econômicas pertinentes;
8. somente então registrar o conteúdo no catálogo ativo.

Conteúdo inválido deve falhar de forma segura, sem deixar importação parcial ativa.

---

## 7. Versionamento, Persistência e Desativação

Conteúdo de mod pode passar a fazer parte de dados persistidos do jogador. Portanto, simplesmente apagar uma definição do catálogo não pode corromper entidades existentes.

Regras:
- registros persistentes devem guardar `sourceId`, versão do mod e identificador estável da definição utilizada;
- operações que dependem de regras mutáveis devem guardar snapshot ou versão suficiente para preservar o resultado histórico;
- ao desativar um mod, novas criações com aquele conteúdo são bloqueadas;
- entidades existentes devem receber fallback visual/funcional seguro ou permanecer legíveis em modo legado, conforme o tipo de conteúdo;
- remoção física de assets/regras só ocorre quando não houver referência persistente ou após migração explícita.

A política detalhada de cada tipo de conteúdo será definida quando o Mod System for implementado.

---

## 8. Status

- **Maturidade:** Future / Experimental.
- O MVP prepara schemas, IDs estáveis e conteúdo oficial data-driven, mas não carrega mods externos.
