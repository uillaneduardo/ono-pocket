# Sistema OnoGenerator — Ono Pocket

## 1. Objetivo

Garantir o gerador procedural determinístico de Onos a partir de uma seed, versão do algoritmo e configurações de balanceamento.

---

## 2. Responsabilidades

- Processar uma seed e versão de algoritmo para gerar atributos permanentes, predisposições e composição visual.
- Garantir determinismo absoluto: a mesma seed + versão + configuração produz sempre exatamente o mesmo Ono.
- Validar compatibilidades e aplicar fallbacks seguros caso seleções visuais falhem.
- Manter o gerador testável de forma isolada, sem dependência de banco de dados ou HTTP.

---

## 3. Entradas e Saídas do Gerador

### Entradas
- `seed`: String ou Number.
- `generatorVersion`: String (ex: `"v1.0"`).
- `protocol`: Enum opcional de cultivo (`balanced`, `structural`, `sensory`).
- `catalog`: Catálogo ativo de componentes visuais e regras de compatibilidade.

### Saídas
- Objeto contendo:
  - Atributos Permanentes calculados.
  - Predisposições identificadas.
  - Condições Temporárias iniciais.
  - Lista de Componentes Visuais com posições, camadas e cores.

---

## 4. Etapas do Algoritmo Determinístico

1. **Normalização da Seed:** Converter a seed de entrada em um gerador de números pseudoaleatórios (PRNG, ex: Mulberry32 / PCG).
2. **Orçamento de Atributos:** Distribuir pontos entre Força, Mobilidade, Sensibilidade, Resistência, Cognição, Autonomia, Sociabilidade e Plasticidade respeitando o limite total.
3. **Determinação de Predisposições:** Mapear atributos dominantes e variações do PRNG para definir 1 a 2 predisposições.
4. **Seleção de Componentes Estruturais:** Selecionar Corpo Base, Membros, Sensores, Carapaça/Membrana compatíveis.
5. **Seleção de Componentes Decorativos:** Selecionar Texturas, Padrões, Cores e Efeitos.
6. **Validação de Compatibilidade:** Verificar se nenhuma regra de exclusão entre partes foi violada. Se violada, executar fallback seguro determinado pelo PRNG.

---

## 5. Regras de Versionamento e Preservação

- Qualquer alteração na fórmula de cálculo ou catálogo base exige incremento na `generatorVersion` (ex: `v1.0` -> `v1.1`).
- Ao carregar um Ono existente, o sistema preserva os dados gerados e gravados originalmente. O gerador nunca re-processa Onos já persistidos.

---

## 6. Testes Obrigatórios

- **Determinismo:** `generateOno("seed-123", "v1.0")` produz exatamente o mesmo resultado em 1000 execuções.
- **Diversidade:** Seeds distintas produzem variação estatisticamente distribuída de atributos e visuais.
- **Limites:** Nenhum atributo ultrapassa o máximo individual nem o orçamento global.
- **Fallback:** Componentes incompatíveis não são montados juntos.

---

## 7. Status

- **Maturidade:** Core / MVP.
