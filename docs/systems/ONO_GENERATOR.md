# Sistema OnoGenerator — Ono Pocket

## 1. Objetivo

Gerar Onos proceduralmente de forma reproduzível, isolada e testável, preservando o resultado histórico mesmo quando algoritmo, balanceamento ou catálogo de conteúdo evoluírem.

---

## 2. Responsabilidades

- Gerar atributos permanentes, predisposições, condições iniciais e composição visual.
- Utilizar um PRNG determinístico.
- Validar compatibilidades entre componentes.
- Aplicar fallbacks determinísticos.
- Não depender de HTTP ou banco de dados.
- Receber snapshots/versões explícitos de suas entradas, em vez de consultar estado global mutável durante a geração.

---

## 3. Entradas

A identidade reprodutível de uma geração deve considerar ao menos:

- `seed`: String.
- `generatorVersion`: versão do algoritmo.
- `contentVersion`: versão/hash imutável do catálogo e regras relevantes utilizados.
- `protocol`: protocolo de cultivo escolhido.
- `configSnapshot`: subconjunto versionado dos parâmetros de balanceamento que realmente influenciam a geração, quando aplicável.

O gerador não deve depender implicitamente do “catálogo atualmente ativo”.

### Regra de determinismo

A mesma combinação de entradas relevantes deve produzir exatamente a mesma saída:

```text
seed
+ generatorVersion
+ contentVersion
+ protocol
+ configSnapshot relevante
= mesmo resultado lógico
```

Após persistido, um Ono não precisa ser regenerado para ser exibido ou utilizado; seus dados gerados são a fonte histórica do organismo.

---

## 4. Saída

Objeto de geração contendo:
- atributos permanentes;
- predisposições;
- condições temporárias iniciais;
- composição visual com IDs estáveis;
- metadados de geração (`generatorVersion`, `contentVersion`, protocolo e demais versões necessárias).

O serviço de Cultivation é responsável por persistir essa saída como um novo Ono.

---

## 5. Etapas Conceituais

1. Normalizar a seed e inicializar PRNG.
2. Distribuir orçamento de atributos conforme regras da versão.
3. Determinar predisposições.
4. Selecionar componentes estruturais elegíveis.
5. Selecionar componentes decorativos.
6. Validar compatibilidade.
7. Aplicar fallback determinístico quando necessário.
8. Produzir composição e metadados finais.

A ordem do consumo do PRNG faz parte do algoritmo versionado. Mudá-la pode alterar resultados e, portanto, pode exigir nova `generatorVersion`.

---

## 6. Versionamento

- Mudança de fórmula, ordem de sorteio ou regra algorítmica incompatível exige nova `generatorVersion`.
- Mudança do conjunto de conteúdo usado pela geração exige nova `contentVersion`/snapshot.
- Mudanças de balanceamento que afetem a geração precisam ser incluídas no snapshot/versionamento relevante.
- O ID/versão dos componentes escolhidos deve permanecer rastreável.

Isso evita a prática perigosa de incrementar a versão do algoritmo apenas porque um asset ou mod foi adicionado ao catálogo.

---

## 7. Testes Obrigatórios

- **Determinismo:** mesmas entradas produzem saída idêntica em execuções repetidas.
- **Separação por versão:** versões diferentes podem produzir resultados distintos sem alterar Onos antigos.
- **Diversidade:** seeds distintas apresentam diversidade dentro das regras esperadas.
- **Limites:** atributos respeitam intervalos e orçamento.
- **Compatibilidade:** combinações inválidas são rejeitadas/fallback aplicado.
- **Catálogo versionado:** alterar o catálogo ativo sem mudar `contentVersion` não pode afetar uma geração histórica reproduzível.

---

## 8. Status

- **Maturidade:** Core / MVP.
