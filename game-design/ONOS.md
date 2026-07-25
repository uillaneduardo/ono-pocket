# Onos

## Definição

Onos são organismos biológicos cultivados artificialmente para desenvolver capacidades físicas, sensoriais e comportamentais úteis. Eles não são ferramentas inertes nem animais comuns: aprendem, adaptam-se e manifestam características próprias ao longo do cultivo e da experiência.

No MVP, o projeto deve tratar apenas da lore necessária para o funcionamento do jogo. Questões maiores do universo dos Onomorfos permanecem fora do escopo até serem formalmente documentadas.

## Identidade de um Ono

Cada Ono possui uma identidade persistente composta por:

- seed de geração;
- versão do gerador;
- nome atribuído pelo jogador;
- fase de desenvolvimento;
- atributos permanentes;
- predisposições;
- condições temporárias;
- componentes visuais;
- histórico de cultivo e trabalho.

A mesma seed, processada pela mesma versão do gerador, deve produzir o mesmo Ono inicial.

## Atributos permanentes

Os atributos descrevem capacidades estáveis do organismo. No MVP:

- **Força:** capacidade de aplicar esforço físico e transportar carga.
- **Mobilidade:** velocidade, coordenação e capacidade de deslocamento.
- **Sensibilidade:** percepção de sinais físicos e ambientais.
- **Resistência:** tolerância a desgaste, esforço e condições adversas.
- **Cognição:** capacidade de aprender rotinas e resolver tarefas simples.
- **Autonomia:** capacidade de agir com pouca supervisão.
- **Sociabilidade:** facilidade de vínculo e cooperação.
- **Plasticidade:** potencial de adaptação e desenvolvimento de novas características.

Os valores devem permanecer dentro de limites definidos pela versão das regras.

## Predisposições

Predisposições são tendências geradas no início do cultivo. Elas não garantem uma função, mas tornam determinados desenvolvimentos mais prováveis.

Exemplos:

- transporte;
- inspeção;
- limpeza técnica;
- busca;
- cultivo biológico;
- monitoramento ambiental.

Uma predisposição deve influenciar atributos, componentes visuais possíveis e compatibilidade com trabalhos, sem substituir o cálculo normal dessas regras.

## Condições temporárias

As condições representam o estado atual do Ono:

- energia;
- nutrição;
- saúde;
- estresse;
- higiene;
- motivação.

Condições temporárias afetam a prontidão para trabalhar, mas não devem alterar silenciosamente os atributos permanentes.

## Fases de desenvolvimento

O MVP utiliza três fases:

1. **Cultivo:** organismo ainda em formação dentro da incubadora.
2. **Recém-formado:** Ono disponível para observação e cuidados básicos.
3. **Jovem:** Ono apto a executar os trabalhos iniciais.

Fases posteriores ficam fora do escopo inicial.

## Aparência

A aparência do Ono é composta por dados e camadas visuais. Ela deve refletir, de forma legível, parte de seus atributos e predisposições.

Categorias iniciais:

- corpo;
- textura;
- padrão corporal;
- olhos ou sensores;
- boca;
- membros;
- cauda;
- carapaça;
- membrana;
- órgão especializado;
- efeito temporário.

A aparência não deve ser usada como fonte autoritativa dos atributos. Os dados do Ono determinam a aparência, e não o contrário.

## Relação com o jogador

O jogador administra o cultivo e o uso profissional dos Onos. O MVP não deve reduzir o Ono a um item de inventário comum.

A interface deve preservar a noção de organismo vivo por meio de:

- nome individual;
- histórico próprio;
- condições visíveis;
- necessidade de descanso;
- limites de trabalho;
- consequências de uso inadequado.

## Regras de consistência

- Um Ono pertence a uma única conta no MVP.
- Um Ono não pode estar simultaneamente em cultivo, disponível e trabalhando.
- Um Ono em trabalho não pode iniciar outro trabalho.
- Um Ono com saúde crítica não pode trabalhar.
- Alterações no gerador não podem modificar retroativamente Onos já criados.
- Componentes visuais devem respeitar compatibilidades e a fase do organismo.

## Fora do escopo do MVP

- reprodução;
- combate;
- morte permanente;
- comércio entre jogadores;
- consciência ou linguagem avançada;
- linhagens complexas;
- facções e política do universo;
- direitos civis ou legislação detalhada dos Onos.
