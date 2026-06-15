# Perguntas pertinentes — por bloco/tela

Banco de perguntas que devem ser feitas em cada momento. Usar `ask_user_input_v0` quando houver opções claras de resposta; texto livre quando precisa de detalhamento.

Princípio: máximo de 3 perguntas por turno (limite do tool). Se precisar de mais, separar em rodadas.

## Bloco 0 — Identificação do cenário (sempre antes de começar)

1. **Cenário operacional**: COM / SEM / HÍBRIDO gov.br? (single_select)
2. **Identificação básica do cliente** (texto livre): nome, CPF, exercício, tipo de declaração
3. **Perfil tributário** (multi_select): CLT, aposentado, autônomo, sócio PJ, locador, ações, vendeu imóvel, atividade rural, exterior, espólio, doença grave

## Bloco 1 — Identificação do contribuinte

Antes de fechar a tela:
- "Mudou de endereço em [ano]?" (sim/não)
- "Casou, separou, ficou viúvo(a) ou nasceu filho em [ano]?" (multi_select com opções)
- "Vai declarar dependente este ano?" (sim/não)
- "Tem doença grave reconhecida pelo INSS ou em pleito?" (sim/não)
- "Mudou de ocupação principal em [ano]?" (sim/não)

## Bloco 2 — Dependentes

Se vai declarar dependentes:
- "Algum dependente teve rendimento próprio (salário, bolsa, pensão) em [ano]?" (sim/não)
- Se sim: "Qual valor anual?" (texto livre)
- "Algum dependente fez 21 anos em [ano]?" (se sim, perguntar se está em universidade)
- "Algum dependente fez 24 anos?" (perde direito a partir desse ano)
- "Tem dependente em outra declaração?" (não pode estar em duas)

## Bloco 3 — Alimentandos

- "Pensão alimentícia paga em [ano]?" (sim/não)
- Se sim: "Tem decisão judicial ou escritura pública?" (obrigatório para dedução)
- "Tem CPF do alimentando?" (obrigatório)

## Bloco 4 — Rendimentos PJ Titular

ANTES de pedir os informes:
- "Quantas fontes pagadoras teve em [ano]?" (1, 2, 3+)
- "Mudou de emprego durante [ano]?" (sim/não)
- "Recebeu rescisão de algum vínculo?" (sim/não)
- "Recebeu PLR?" (sim/não)
- "Recebeu aposentadoria além do salário?" (sim/não)

DEPOIS de lançar:
- Se mais de 1 fonte: avisar que vai gerar imposto a pagar e perguntar se cliente já sabia

## Bloco 5 — Rendimentos PF / Exterior

- "Recebeu aluguel em [ano]?" (sim/não + de PF ou PJ)
- Se PF e mensal > R$ 2.428,80: "Pagou Carnê-Leão Web mensal?" (sim/não — se não, alerta)
- "Recebeu por serviço autônomo (RPA, freelance)?" (sim/não)
- "Tem rendimento do exterior (salário, aluguel, juros)?" (sim/não)
- "Recebeu pensão de ex-cônjuge?" (sim/não — após Tema 874 STF, tributável)

## Bloco 6 — Rendimentos Isentos

- "Recebeu indenização trabalhista (FGTS, multa, aviso prévio)?" (sim/não)
- "Recebeu doação ou herança em [ano]?" (sim/não)
- "Tem 65 anos ou mais e recebe aposentadoria?" (verificar automaticamente pela data de nascimento)
- "Recebeu lucros ou dividendos de PJ?" (sim/não)
- "Recebeu bolsa de estudos?" (sim/não)
- "Tem rendimento de poupança?" (lançar mesmo isento)

## Bloco 7 — Tributação Exclusiva

- "Tem aplicação financeira (CDB, RDB, LCI, LCA, fundo)?" (sim/não)
- Se sim: "De quais bancos/corretoras?" (lista)
- "Recebeu PLR este ano?" (lembrar que a partir de 2024 vai em exclusiva, não em tributáveis)
- "Tem ações ou FII pagando dividendos?" (sim/não)

## Bloco 8 — Pagamentos Efetuados (só se considerar completa)

- "Teve despesas médicas em [ano]?" (sim/não)
- "Tem plano de saúde?" (titular ou dependentes)
- "Pagou educação (escola, faculdade) de dependentes?" (sim/não)
- "Pagou previdência privada PGBL?" (não VGBL — só PGBL deduz)
- "Tem livro caixa de autônomo?" (sim/não)

## Bloco 9 — Doações

- "Fez alguma doação a fundo da criança, idoso, cultura, esporte, saúde?" (sim/não)
- Se sim: "Tem o recibo com CNPJ do fundo?" (obrigatório)

## Bloco 10 — Bens e Direitos

ANTES de pedir documentos:
- "Comprou ou vendeu imóvel em [ano]?" (sim/não)
- "Comprou ou vendeu veículo, moto, barco?" (sim/não)
- "Abriu conta em banco novo?" (sim/não)
- "Investiu em corretora pela primeira vez?" (sim/não)
- "Tem criptoativo (Bitcoin, Ether) acima de R$ 5 mil?" (sim/não)
- "Pegou ou pagou empréstimo a parente/amigo (não bancário)?" (sim/não)
- "Atualizou valor de imóvel pela Lei 14.973/2024?" (sim/não — só vale se pagou DARF até 16/12/2024)

DEPOIS de lançar:
- Conferir variação patrimonial × renda do ano (acréscimo a descoberto)

## Bloco 11 — Dívidas

- "Pegou financiamento (imóvel, veículo, consignado) em [ano]?" (sim/não)
- Se sim: "Saldo devedor em 31/12 era superior a R$ 5 mil?" (se não, não precisa declarar)
- "Quitou alguma dívida em [ano]?" (sim/não)

## Bloco 12 — Atividade Rural

Só se perfil indicou atividade rural:
- "Tem propriedade rural?" (titular ou arrendatário)
- "Teve receita bruta em [ano]?" (sim/não + valor)
- "Tem livro-caixa rural?" (obrigatório se receita > 169.440)
- "Quer compensar prejuízo de anos anteriores?" (sim/não — máximo 8 anos)

## Bloco 13 — Renda Variável

Só se perfil indicou bolsa/corretora:
- "Operou ações, FII, ETF, BDR em [ano]?" (sim/não)
- "Operou day trade?" (sim/não)
- "Total de vendas excedeu R$ 20 mil em algum mês?" (sim/não)
- "Pagou DARFs mensais (código 6015)?" (sim/não — se não e devia, alerta de multa)

## Bloco 14 — Ganho de Capital

Só se vendeu bens:
- "Foi único imóvel vendido nos últimos 5 anos?" (verificar isenção)
- "Comprou outro imóvel residencial em 180 dias após a venda?" (verificar isenção)
- "Valor da venda foi até R$ 440 mil?" (verificar limite)
- "Imóvel adquirido antes de 1969?" (fator de redução pleno)
- "Tem GCAP do ano-calendário gerado e DARF pago?" (obrigatório)

## Bloco 15 — Pré-fechamento

ANTES de gerar a ficha:
- "Quer comparar simplificada vs completa?" (sim/não — default sim)
- "Vai pagar à vista ou parcelado?" (à vista | 2 quotas | ... | 8 quotas)
- Se parcelado: "Quer débito automático?" (sim/não — só vale se transmissão até 10/05)
- "Conta bancária para débito ou crédito da restituição:" (banco, agência, conta)
- Se restituição: "PIX do CPF do titular?" (recomendado para prioridade na fila)
- "Algum detalhe específico que devo registrar na ficha?" (texto livre)

## Bloco 16 — Cliente especial (espólio)

Se for declaração de espólio:
- "Inventário em andamento, finalizado ou ainda não aberto?" (define tipo: inicial / intermediária / final)
- "Tem CPF do inventariante?" (obrigatório)
- "Cônjuge sobrevivente fará declaração própria?" (separar bens da meação)
- "Há decisão de partilha?" (define divisão de bens entre herdeiros)

## Bloco 17 — Doença grave (caso pleiteado)

Se cliente quer reivindicar:
- "Qual doença? (lista das 16 enquadráveis pela Lei 7.713/88)" (single_select)
- "Tem laudo do INSS ou pleito em andamento?" (sim — INSS / sim — judicial / só laudo particular / não tem)
- "Continua trabalhando ativamente?" (sim — Tema 1.037 limita / não)
- "Diagnóstico em que ano?" (data do diagnóstico = termo inicial da isenção)

Reforçar Tema 1.037: salário ativo continua tributável, apenas aposentadoria/pensão pode ser isenta.
