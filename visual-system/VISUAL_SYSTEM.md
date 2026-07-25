# Sistema visual modular dos Onos

## Objetivo

Permitir que cada Ono seja apresentado como uma composição de partes visuais independentes, combinadas por dados e não por lógica fixa de interface.

## Princípios

- A aparência deve refletir atributos, predisposições, estágio e experiências do Ono.
- As partes visuais devem ser reutilizáveis.
- Novos assets devem poder ser adicionados sem alterar as regras de negócio.
- O sistema precisa aceitar artes simples no MVP e animações melhores posteriormente.
- A mesma descrição visual deve produzir a mesma composição.

## Categorias iniciais

- corpo base;
- textura;
- padrão corporal;
- olhos;
- sensores;
- boca;
- membros dianteiros;
- membros traseiros;
- cauda;
- carapaça;
- membrana;
- órgão especializado;
- efeito temporário;
- acessório.

## Ordem de renderização

Cada elemento visual deve possuir uma ordem numérica de camada. Quanto maior o valor, mais à frente o elemento será desenhado.

Exemplo sugerido:

- sombra: 10;
- membros traseiros: 20;
- cauda: 30;
- corpo: 40;
- textura: 50;
- padrão corporal: 60;
- membros dianteiros: 70;
- carapaça: 80;
- boca: 90;
- olhos e sensores: 100;
- órgão especializado: 110;
- efeitos: 120;
- acessórios: 130.

A ordem deve permanecer configurável por asset e por composição.

## Canvas e alinhamento

No MVP, cada quadro deve usar um canvas lógico de 64 × 64 pixels com transparência.

Todos os elementos devem usar:

- mesma origem de coordenadas;
- ponto de ancoragem consistente;
- área transparente preservada;
- escala base igual a 1;
- posição X e Y configuráveis;
- opção de espelhamento horizontal.

O tamanho lógico pode ser ampliado no futuro sem alterar o modelo de dados.

## Descrição visual de um Ono

A aparência deve ser persistida como uma lista ordenada de componentes.

Cada componente deve registrar:

- identificador do asset;
- categoria;
- origem da característica;
- posição X;
- posição Y;
- escala;
- rotação futura, se necessária;
- espelhamento;
- ordem de camada;
- visibilidade;
- variação de cor, quando suportada.

## Origem das características

- `genetic`: definida durante a geração;
- `developed`: adquirida por crescimento ou experiência;
- `temporary`: representa condição atual;
- `cosmetic`: alteração sem impacto mecânico;
- `administrative`: aplicada por ferramentas de gerenciamento.

## Compatibilidade

Assets podem declarar:

- fases permitidas;
- corpos compatíveis;
- categorias obrigatórias;
- categorias incompatíveis;
- limites de tamanho;
- requisitos de atributos;
- tags ambientais;
- grupos mutuamente exclusivos.

O gerador deve validar essas regras antes de confirmar uma composição.

## Animações

Cada asset pode possuir animações nomeadas, inicialmente:

- `idle`;
- `eat`;
- `sleep`;
- `play`;
- `walk`;
- `work`;
- `sick`;
- `reaction`.

Cada animação deve definir:

- arquivo;
- largura e altura do quadro;
- quantidade de quadros;
- FPS;
- repetição;
- ponto de origem;
- fallback.

Quando uma camada não possuir a animação solicitada, o sistema deve usar, nesta ordem:

1. animação solicitada;
2. animação `idle`;
3. imagem estática;
4. ocultar apenas a camada ausente.

## Modelo híbrido do MVP

No MVP:

- o corpo base pode ser animado;
- olhos, padrões e órgãos podem ser estáticos;
- efeitos podem ter animação independente;
- animações especiais completas podem substituir temporariamente a composição em camadas.

Não é obrigatório que todas as camadas tenham o mesmo número de quadros.

## Manifesto de asset

Cada asset deve possuir dados equivalentes a:

```json
{
  "id": "sensor-termico-01",
  "name": "Sensor térmico inicial",
  "category": "sensor",
  "stages": ["young", "adult"],
  "layerOrder": 100,
  "anchor": { "x": 32, "y": 32 },
  "compatibleTags": ["terrestrial"],
  "incompatibleTags": ["sealed-head"],
  "animations": {
    "idle": {
      "src": "idle.webp",
      "frameWidth": 64,
      "frameHeight": 64,
      "frames": 4,
      "fps": 4,
      "loop": true
    }
  }
}
```

## Administração futura

O Laboratório administrativo deverá permitir:

- cadastrar assets;
- substituir arquivos;
- organizar categorias;
- testar camadas;
- montar composições;
- visualizar animações;
- cadastrar regras visuais;
- ativar ou desativar elementos.

Essa interface não faz parte da fundação técnica da SPEC-001.

## Testes mínimos futuros

- a ordem das camadas é estável;
- componentes invisíveis não são renderizados;
- fallback de animação funciona;
- mesma composição produz a mesma saída lógica;
- assets incompatíveis são rejeitados;
- substituição de arquivo não altera o identificador do asset.
