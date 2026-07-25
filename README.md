# Ono Pocket

O **Ono Pocket** é um jogo PWA de simulação, cultivo e trabalho com criaturas biológicas modulares chamadas **Onos**.

O projeto será desenvolvido de forma simples, incremental e orientada por documentação. O objetivo inicial é validar um ciclo de jogo curto e consistente antes de adicionar sistemas mais complexos.

## Conceito

O jogador administra um pequeno laboratório onde pode cultivar Onos gerados proceduralmente. Cada Ono possui aparência, atributos e predisposições próprias. Depois de cultivado, ele pode ser enviado para trabalhos compatíveis com suas capacidades, gerando recursos para ampliar o laboratório e iniciar novos cultivos.

## Ciclo principal

1. Iniciar um cultivo.
2. Gerar um Ono procedural e modular.
3. Observar seus atributos e características físicas.
4. Prepará-lo para uma atividade.
5. Enviá-lo para trabalhar.
6. Receber um relatório e pagamento.
7. Melhorar o laboratório e cultivar novos Onos.

## Pilares do projeto

- **Simplicidade:** implementar apenas o necessário para o MVP.
- **Modularidade:** separar geração, cultivo, trabalho, economia e renderização visual.
- **Determinismo:** a mesma seed e versão do gerador devem produzir o mesmo Ono.
- **Aparência orientada por dados:** o Ono será montado por camadas visuais configuráveis.
- **Testabilidade:** regras de negócio devem ser independentes da interface.
- **Consistência:** toda implementação deve seguir a documentação oficial do repositório.

## Escopo inicial

O MVP será concentrado em três áreas:

- **Gerador procedural:** criação determinística de Onos com partes e atributos compatíveis.
- **Laboratório:** cultivo, incubadoras, habitats e registro dos Onos.
- **Trabalho:** oportunidades, duração, cálculo de resultado, experiência e pagamento.

Funcionalidades como combate, reprodução, exploração de mundo, comércio entre jogadores e recursos sociais não fazem parte do MVP inicial.

## Organização planejada

```text
ai/                 Instruções para agentes de IA
product/            Visão, escopo e ciclo do produto
game-design/        Regras de geração, cultivo e trabalho
visual-system/      Sistema modular de aparência e animações
technical/          Arquitetura, banco, segurança e testes
interface/          Arquitetura da informação e telas
specifications/     Especificações implementáveis
 decisions/         Registros de decisões arquiteturais
```

## Processo de desenvolvimento

Cada funcionalidade deve seguir este fluxo:

```text
Documentação
→ Especificação
→ Implementação
→ Testes
→ Revisão
→ Validação
```

O Google AI Studio poderá ser utilizado para gerar e alterar o código, mas deverá respeitar os documentos deste repositório como fonte oficial do projeto.

## Estado atual

Projeto em fase de documentação e definição do MVP.
