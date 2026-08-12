# Sistema Mod System — Ono Pocket

## 1. Objetivo

Preparar a arquitetura do Ono Pocket para aceitar modificações e novos conteúdos criados pela comunidade de forma declarativa (*data-driven*), sem comprometer a segurança, a estabilidade do servidor ou a integridade financeira do jogo.

---

## 2. Diretrizes Principais e Filosofia de Segurança

1. **Apenas Conteúdo Declarativo:** O sistema de mods aceita exclusivamente definições de dados (JSON/YAML) e arquivos de mídia estática (imagens WebP/PNG, áudios OGG/MP3).
2. **Proibição de Execução de Código:** **NENHUM** arquivo contendo código executável (JavaScript, TypeScript, WASM, scripts Python/Shell, etc.) fornecido por mods será executado no servidor ou no cliente.
3. **Isolamento Completo:** Mods não possuem acesso ao banco de dados, ao sistema de arquivos do servidor, às rotas de autenticação, nem aos serviços de pagamentos e moedas virtuais.

---

## 3. Estrutura de Pacote de Mod

```text
mods/
└── example-mod/
    ├── mod.json                (Manifesto obrigatório do mod)
    ├── assets/                 (Imagens, sprites de Onos, áudios)
    │   ├── sprites/
    │   └── audio/
    └── content/                (Definições declarativas de conteúdo)
        ├── works/              (Novos trabalhos data-driven)
        ├── ono-parts/          (Novas partes visuais de Onos)
        └── items/              (Novos insumos declarativos)
```

### Exemplo de Manifesto (`mod.json`)
```json
{
  "id": "biotech-expansions",
  "name": "Expansão Biotecnológica",
  "version": "1.0.0",
  "author": "Comunidade Ono",
  "description": "Adiciona novos trabalhos de laboratório e componentes visuais de sensores.",
  "minEngineVersion": "0.1.0",
  "dependencies": []
}
```

---

## 4. Tipos de Conteúdo Permitidos para Mods

- **Partes Visuais de Onos:** Sprites de membros, carapaças, texturas e órgãos declarados no formato de manifesto visual.
- **Definições de Trabalhos:** Oportunidades de trabalho customizadas declaradas com base nos schemas do sistema `Content`.
- **Assets de Audio e Cenário:** Sons de ambiente e temas visuais para a interface do laboratório.
- **Eventos e Mapas Declarativos:** Estruturas de eventos narrativos descritas por árvores de decisão em JSON.

---

## 5. Limites Invioláveis e Fronteiras de Segurança dos Mods

Mods são estritamente proibidos de acessar ou modificar:
- **Infraestrutura e Banco:** Acesso ao banco de dados MySQL, Prisma ORM ou filesystem.
- **Variáveis de Ambiente:** Acesso a `process.env`, credenciais, chaves JWT e segredos do servidor.
- **Autenticação e Sessões:** Acesso a contas de usuário (`Account`), tokens e permissões.
- **Sistema de Pagamentos:** Acesso ao sistema `Commerce`, `PaymentProvider`, `Pix` ou precificação BRL.
- **Moeda e Créditos:** Mods **NÃO** podem criar, conceder ou multiplicar `PremiumCredits` ou alterar arbitrariamente o saldo da carteira do jogador.
- **Permissões Administrativas:** Mods não possuem acesso ao painel `Game Admin`.

---

## 6. Validação e Carregamento

1. **Validação de Schema:** Todo arquivo de conteúdo de um mod é submetido a validação estrita contra os schemas JSON oficiais do jogo antes de ser aceito pelo servidor.
2. **Namespace e Identificação:** Todo conteúdo registrado por um mod recebe o identificador do mod como namespace para evitar conflitos (ex: `mod:biotech-expansions:work-lab-clean`).
3. **Desativação Segura:** Se um mod contiver erros de schema ou for desativado, o servidor remove suas definições do catálogo sem corromper a integridade dos dados dos jogadores.

---

## 7. Status

- **Maturidade:** Future / Experimental (Fundação do sistema declarativo de conteúdo preparada no MVP; carregamento de mods externos reservado para fases futuras).
