# Geração procedural de Onos

## Objetivo

O gerador procedural cria Onos distintos a partir de uma seed, respeitando limites de balanceamento e regras de compatibilidade. O resultado deve ser reproduzível, testável e independente da interface e do banco de dados.

## Entradas

O gerador recebe:

- seed;
- versão do algoritmo;
- configuração de geração;
- catálogo de componentes visuais ativos;
- regras de compatibilidade;
- limites dos atributos.

No MVP, a geração não deve depender de chamadas externas nem de inteligência artificial generativa.

## Saída

O resultado deve conter:

- seed original;
- versão do gerador;
- atributos permanentes;
- predisposições;
- valores iniciais das condições temporárias;
- componentes visuais selecionados;
- metadados necessários para auditoria e reprodução.

## Ordem de geração

A geração deve ocorrer em etapas determinísticas:

1. Normalizar a seed.
2. Inicializar o gerador pseudoaleatório.
3. Selecionar arquétipo ou linhagem base do MVP.
4. Distribuir atributos dentro dos limites.
5. Determinar predisposições.
6. Selecionar corpo e proporções.
7. Selecionar componentes compatíveis.
8. Aplicar cores, textura e padrão.
9. Calcular condições iniciais.
10. Validar o resultado completo.

## Determinismo

A mesma combinação de seed, versão e configuração deve gerar exatamente o mesmo resultado.

Toda alteração que possa mudar o resultado deve incrementar a versão do gerador.

Onos existentes devem armazenar o resultado gerado e a versão usada. Eles não devem ser recalculados automaticamente quando o algoritmo mudar.

## Atributos

Cada atributo deve:

- respeitar valor mínimo e máximo;
- usar distribuição documentada;
- permitir compensações para evitar organismos perfeitos;
- manter diversidade sem produzir resultados inviáveis.

No MVP, recomenda-se um orçamento total de pontos. Valores altos em alguns atributos reduzem a disponibilidade para outros.

## Predisposições

Predisposições derivam da combinação dos atributos e de uma variação controlada pela seed.

Exemplo:

- força e resistência elevadas favorecem transporte;
- sensibilidade e mobilidade favorecem inspeção;
- cognição e autonomia favorecem monitoramento;
- plasticidade pode ampliar a chance de características incomuns.

A predisposição não deve garantir sucesso em um trabalho.

## Componentes visuais

Cada componente visual deve declarar:

- categoria;
- fases compatíveis;
- requisitos mínimos ou máximos;
- incompatibilidades;
- peso de seleção;
- ordem de renderização;
- versão ou estado ativo.

O gerador deve selecionar primeiro os componentes estruturais e depois os decorativos.

### Componentes estruturais

- corpo;
- membros;
- sensores;
- cauda;
- carapaça;
- membrana;
- órgão especializado.

### Componentes decorativos

- cor;
- textura;
- padrão corporal;
- marcas;
- efeitos visuais não funcionais.

## Compatibilidade

Uma combinação é válida quando:

- todos os requisitos dos componentes são atendidos;
- não existe incompatibilidade explícita;
- a fase do Ono aceita os componentes;
- existe corpo base compatível;
- o resultado final contém todos os componentes obrigatórios.

Quando uma seleção falhar, o gerador deve tentar outra opção por um número limitado de vezes. Se ainda falhar, deve aplicar uma alternativa segura e registrar o fallback.

## Variações raras

O MVP pode suportar variações raras simples, desde que:

- sejam determinadas pela seed;
- não concedam vantagem desproporcional;
- respeitem compatibilidades;
- sejam registradas no resultado;
- não dependam de porcentagens ocultas impossíveis de testar.

## Validação

Antes de entregar o resultado, validar:

- presença de todos os campos obrigatórios;
- atributos dentro dos limites;
- orçamento de atributos válido;
- componentes sem conflito;
- presença de corpo base;
- categorias únicas quando exigido;
- versão e seed registradas.

Resultados inválidos não devem ser persistidos.

## Testes obrigatórios

- mesma seed e versão produzem o mesmo Ono;
- seeds diferentes produzem diversidade mensurável;
- nenhum atributo ultrapassa limites;
- orçamento total é respeitado;
- componentes incompatíveis nunca aparecem juntos;
- catálogo sem opção válida usa fallback seguro;
- mudança de versão pode gerar resultado diferente sem alterar registros antigos.

## Escopo inicial de variedade

Para o MVP:

- uma linhagem base;
- três corpos;
- três tipos de sensores ou olhos;
- três tipos de membros;
- duas carapaças;
- duas membranas;
- dois órgãos especializados;
- quatro cores;
- quatro padrões.

Esse catálogo deve ser configurável e ampliável sem alterar o núcleo do gerador.
