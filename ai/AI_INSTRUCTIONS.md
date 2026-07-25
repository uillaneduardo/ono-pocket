# Instruções para agentes de inteligência artificial

Este repositório contém a documentação oficial do projeto **Ono Pocket**.

Todo agente de inteligência artificial que trabalhe no projeto deve seguir estas instruções antes de criar ou alterar código, documentação, banco de dados, testes ou assets.

## 1. Fonte oficial

Os documentos deste repositório são a fonte oficial das regras do produto, da arquitetura, do jogo e da interface.

Não invente funcionalidades, entidades, atributos, telas, tecnologias ou regras que contradigam a documentação.

Quando alguma informação não estiver definida:

1. escolha a solução mais simples;
2. registre claramente a suposição;
3. não transforme a suposição em uma regra permanente;
4. indique qual documento deve ser atualizado futuramente.

## 2. Ordem de prioridade

Em caso de conflito, considere esta ordem:

1. especificação da funcionalidade atual;
2. decisões arquiteturais registradas em ADRs;
3. escopo do MVP;
4. arquitetura técnica;
5. documentos de design do jogo;
6. documentos do sistema visual;
7. README;
8. decisões improvisadas durante a implementação.

## 3. Escopo

Implemente somente o que estiver solicitado na especificação atual.

Não adicione antecipadamente:

- funcionalidades sociais;
- reprodução de Onos;
- combate;
- exploração de mundo;
- comércio entre jogadores;
- múltiplas moedas;
- IA generativa durante a execução normal do jogo;
- integrações externas sem necessidade;
- microserviços;
- filas distribuídas;
- abstrações ou bibliotecas sem justificativa.

## 4. Simplicidade e modularidade

Prefira:

- código simples e explícito;
- módulos pequenos;
- tipagem forte;
- regras de negócio centralizadas;
- validação no backend;
- baixo acoplamento;
- testes determinísticos;
- documentação próxima da implementação.

Separe claramente:

- interface;
- regras de negócio;
- persistência;
- autenticação;
- geração procedural;
- renderização visual;
- passagem do tempo;
- sistema de trabalho;
- economia;
- notificações.

O gerador procedural não deve depender da interface nem do banco de dados.

O sistema visual deve receber uma descrição do Ono e produzir sua composição sem alterar seus atributos.

## 5. Consistência de domínio

Utilize os nomes definidos no glossário oficial. Não crie sinônimos desnecessários para a mesma entidade.

Termos iniciais:

- `Ono`;
- `Cultivation`;
- `Incubator`;
- `Habitat`;
- `WorkAssignment`;
- `VisualAsset`;
- `OnoVisualComponent`;
- `GeneratorVersion`;
- `Seed`.

## 6. Geração procedural

Toda geração de Ono deve:

- aceitar uma seed;
- registrar a versão do gerador;
- produzir o mesmo resultado para a mesma seed e versão;
- respeitar regras de compatibilidade;
- separar atributos, predisposições e aparência;
- permitir testes determinísticos;
- preservar Onos existentes quando o algoritmo evoluir.

## 7. Sistema visual

A aparência do Ono deve ser tratada como dados.

As características físicas devem ser compostas por camadas configuráveis, como corpo, textura, padrão, sensores, membros, carapaça, membranas, órgãos e efeitos.

Não implemente combinações específicas diretamente em componentes da interface.

As artes e animações devem poder ser substituídas sem alterar as regras de negócio.

## 8. Passagem do tempo

Não utilize atualizações contínuas para cada Ono.

Armazene horários relevantes e calcule mudanças quando necessário.

Use o horário do servidor para operações que afetem:

- dinheiro;
- conclusão de cultivo;
- conclusão de trabalho;
- recompensas;
- evolução;
- limites temporais.

O relógio do dispositivo não deve ser considerado fonte confiável.

## 9. Banco de dados

Antes de alterar o banco:

1. consulte a documentação técnica;
2. verifique a especificação atual;
3. gere migration;
4. não edite migrations já aplicadas;
5. documente novos campos;
6. preserve integridade referencial;
7. evite armazenar dados derivados sem necessidade.

Toda alteração de banco deve ser informada na entrega.

## 10. Segurança

Nunca:

- inclua credenciais no repositório;
- exponha senhas ou tokens;
- confie em dados enviados pelo frontend;
- use nomes de uploads sem sanitização;
- proteja rotas apenas escondendo elementos da interface;
- registre segredos em logs.

Mantenha um `.env.example` atualizado quando houver variáveis de ambiente.

## 11. Testes obrigatórios

Toda implementação deve incluir testes proporcionais ao risco.

- regras de negócio: testes unitários;
- API e banco: testes de integração;
- fluxos principais: testes de interface quando aplicável;
- geração procedural: testes de determinismo e compatibilidade.

Uma tarefa só pode ser considerada entregue quando:

- compilar;
- passar no lint;
- passar na verificação de tipos;
- passar nos testes aplicáveis;
- gerar build de produção;
- possuir migrations válidas, quando houver;
- atualizar as instruções de execução.

Não remova testes apenas para fazer a implementação passar.

## 12. Processo de implementação

Antes de escrever código:

1. leia a especificação atual;
2. leia os documentos relacionados;
3. identifique entidades afetadas;
4. identifique riscos;
5. apresente um plano curto;
6. liste os testes necessários.

Depois da implementação:

1. execute instalação ou restauração de dependências;
2. execute geração de tipos;
3. aplique migrations em banco de teste, quando houver;
4. execute lint;
5. execute typecheck;
6. execute testes;
7. execute build;
8. registre resultados reais;
9. informe limitações e pendências.

## 13. Formato obrigatório da entrega

Toda entrega deve apresentar:

### Resumo

O que foi implementado.

### Arquivos modificados

Arquivos criados, modificados e removidos.

### Banco de dados

Migrations, tabelas, campos e índices alterados.

### Testes

Comandos executados e resultados reais.

### Instalação

Comandos adicionais necessários após o próximo `git pull`.

### Decisões

Decisões técnicas relevantes.

### Limitações

O que não foi implementado ou validado.

### Próximo passo sugerido

Apenas o próximo passo lógico, sem implementá-lo automaticamente.

## 14. Proibições

Não declare que algo funciona sem executar o teste correspondente.

Não simule resultados de testes como se fossem reais.

Não esconda erros.

Não altere documentação para justificar uma implementação incompatível.

Não remova funcionalidades existentes fora do escopo.

Não faça grandes refatorações sem solicitação explícita.

Não avance para outra especificação sem autorização.
