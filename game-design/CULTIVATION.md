# Sistema de cultivo

## Objetivo

O cultivo transforma material biológico inicial em um Ono recém-formado. Esse processo deve ser simples de compreender, persistente e calculado com base em horários confiáveis do servidor.

## Ciclo de cultivo

1. O jogador escolhe uma incubadora disponível.
2. Paga o custo inicial do cultivo.
3. O sistema gera uma seed e registra a versão do gerador.
4. O cultivo entra no estado ativo.
5. O tempo decorre mesmo com a aplicação fechada.
6. Ao atingir o horário de conclusão, o cultivo pode ser finalizado.
7. O gerador cria o Ono e registra seu resultado persistente.
8. A incubadora volta a ficar disponível.

## Estados

Um cultivo pode estar em:

- **draft:** configuração ainda não confirmada;
- **active:** cultivo iniciado e aguardando conclusão;
- **ready:** tempo concluído e pronto para finalização;
- **completed:** Ono criado com sucesso;
- **cancelled:** cultivo cancelado antes da conclusão;
- **failed:** falha técnica que exige tratamento seguro.

As transições devem ser explícitas e validadas no backend.

## Incubadoras

Cada incubadora possui:

- identificador;
- nível;
- status;
- cultivo atual, quando ocupado;
- modificadores permitidos;
- data de aquisição ou liberação.

No MVP, o jogador começa com uma incubadora e pode desbloquear uma segunda por progressão econômica.

Uma incubadora não pode manter mais de um cultivo ativo.

## Tempo

O cultivo deve armazenar:

- horário de início;
- duração prevista;
- horário calculado de conclusão;
- horário de finalização efetiva.

O servidor é a fonte oficial de tempo. A interface apenas exibe uma estimativa regressiva.

Não deve existir processo contínuo atualizando cada cultivo a cada segundo. O estado `ready` pode ser derivado quando o cultivo for consultado ou finalizado.

## Custos

O início de cultivo pode consumir:

- saldo em moeda do jogo;
- material biológico básico;
- nutrientes iniciais.

No primeiro MVP, o custo pode ser representado apenas por saldo, desde que o modelo permita adicionar recursos de inventário futuramente.

A cobrança deve ocorrer de forma atômica com a criação do cultivo. Não pode haver desconto sem cultivo registrado nem cultivo sem o desconto correspondente.

## Influência do jogador

O MVP deve manter influência limitada. O jogador pode selecionar um protocolo de cultivo simples, como:

- equilibrado;
- estrutural;
- sensorial.

O protocolo altera pesos do gerador, mas não garante o resultado.

Não implementar, nesta etapa, controle detalhado de temperatura, umidade, dieta ou intervenção genética.

## Conclusão

Ao finalizar um cultivo:

- validar propriedade da incubadora;
- validar que o tempo necessário passou;
- impedir dupla finalização;
- executar o gerador com seed e versão registradas;
- persistir o Ono completo;
- associar o Ono à conta;
- liberar a incubadora;
- registrar evento no histórico;
- retornar o resultado gerado.

Toda a operação deve ser transacional.

## Cancelamento

No MVP, o cultivo pode ser cancelado apenas enquanto estiver ativo.

A política inicial de reembolso deve ser simples e explícita. Sugestão:

- nenhuma devolução após o início.

O cancelamento deve liberar a incubadora e registrar o evento.

## Falhas técnicas

Uma falha de infraestrutura não deve destruir silenciosamente o cultivo nem cobrar novamente o jogador.

Se a geração falhar durante a conclusão:

- manter o cultivo recuperável;
- registrar erro técnico sem expor detalhes sensíveis;
- permitir nova tentativa idempotente;
- impedir criação duplicada de Ono.

## Interface mínima

A tela de laboratório deve mostrar:

- incubadoras disponíveis;
- incubadoras ocupadas;
- protocolo selecionado;
- custo;
- horário ou tempo restante;
- estado atual;
- ação de iniciar;
- ação de finalizar quando pronto;
- feedback de carregamento, sucesso e erro.

## Notificações futuras

O modelo deve permitir notificar quando o cultivo estiver concluído. A notificação push real pode ser implementada em especificação posterior.

## Testes obrigatórios

- não iniciar cultivo sem saldo suficiente;
- não iniciar cultivo em incubadora ocupada;
- custo e cultivo são registrados atomicamente;
- horário de conclusão é calculado corretamente;
- não finalizar antes do tempo;
- finalizar cria exatamente um Ono;
- repetir requisição de finalização não duplica o Ono;
- incubadora é liberada após conclusão ou cancelamento;
- usuário não acessa incubadora de outra conta;
- falha do gerador mantém cultivo recuperável.

## Fora do escopo do MVP

- cruzamento de linhagens;
- múltiplos materiais biológicos;
- intervenções durante o cultivo;
- falha biológica aleatória permanente;
- morte embrionária;
- mercado de incubadoras entre jogadores;
- automação avançada de laboratório.
