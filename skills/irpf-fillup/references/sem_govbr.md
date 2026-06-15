# Modo SEM gov.br — Protocolo

Cenário: cliente não tem gov.br ouro/prata ou não conseguiu importar o rascunho. Vai montar tudo manualmente. **Cuidado máximo** — a Receita já tem os dados via eSocial, e-Financeira, DMED, DIMOB, DIMOF, DOI. Divergir = malha.

## Princípio operacional

Pressupor que o cliente vai esquecer de mencionar alguma fonte. **Sempre rodar checklist expandido antes** de começar tela por tela.

## Checklist expandido — 23 perguntas obrigatórias

Aplicar TODAS antes de começar a montagem das telas. Pode dividir em 2-3 mensagens com `ask_user_input_v0` para não cansar.

### Bloco A — Rendimentos do trabalho

1. **Trabalhou em mais de uma empresa em [ano]?** Mesmo curto período. Estágio, contrato temporário, freelancer registrado.
2. **Recebeu rescisão trabalhista?** (aviso prévio, multa FGTS, indenizações)
3. **Recebeu PLR (participação nos lucros)?** Tem tributação exclusiva separada.
4. **Recebeu seguro-desemprego ou auxílio emergencial?**
5. **Tem MEI ativo?** Mesmo sem faturamento, exige verificação.

### Bloco B — Aposentadoria e benefícios

6. **Recebe INSS, militar (FAS, FRMM), previdência privada (Brasilprev, Bradesco Prev) ou pensão?**
7. **Recebeu auxílio-doença, salário-maternidade, BPC?**
8. **Tem PGBL/VGBL com resgate ou benefício no ano?**

### Bloco C — Bens e patrimônio

9. **Comprou ou vendeu imóvel em [ano]?** Mesmo terreno, mesmo entre familiares.
10. **Comprou ou vendeu veículo, moto, barco?**
11. **Pegou ou pagou empréstimo a parente/amigo (não bancário)?**
12. **Recebeu herança, doação ou pensão por morte?**
13. **Tem participação societária em alguma empresa?** Mesmo cotas mínimas, mesmo holding familiar.

### Bloco D — Aplicações financeiras

14. **Tem conta em mais de um banco?** Lista TODOS, mesmo conta zerada (entra como saldo R$ 0 mas a conta existe e foi reportada pela e-Financeira).
15. **Tem aplicação em corretora?** XP, BTG, Rico, NuInvest, Inter, Avenue, Stake, Toro, Clear, Modal, BTG, Genial.
16. **Tem ações, FII, ETF, BDR, Tesouro Direto?**
17. **Operou day trade em [ano]?** Mesmo uma vez.
18. **Tem criptoativos (Bitcoin, Ethereum, etc.)?** Posição acumulada > R$ 5 mil exige declaração; movimentação > R$ 30 mil/mês exige IN 1.888.
19. **Tem conta ou investimento no exterior?** Wise, Avenue, Stake, conta bancária física, imóvel fora.

### Bloco E — Outras receitas

20. **Recebeu aluguel em [ano]?** Mesmo informal, mesmo via Pix de parente.
21. **Recebeu por serviço autônomo (RPA, freelancer)?** Mesmo um único trabalho pequeno.
22. **Recebeu prêmios, sorteios, ressarcimentos jurídicos?**
23. **Cônjuge/companheiro tem renda?** Se for fazer declaração em conjunto ou separar — calcular qual vantajoso.

## Documentos a pedir com base nas respostas

A cada "sim" do checklist, pedir o documento correspondente:

| Resposta SIM | Documento a pedir |
|---|---|
| Trabalhou em N empresas | Informe de rendimentos de CADA uma |
| Rescisão | TRCT + extrato FGTS |
| PLR | Comprovante anual da empresa |
| INSS/militar/RPPS | Comprovante de rendimentos do órgão |
| Previdência privada | Informe da seguradora |
| Comprou/vendeu imóvel | Escritura + ITBI + DOI |
| Comprou/vendeu veículo | DUT (transferência) |
| Empréstimo a/de parente | Recibo ou contrato (mesmo verbal — descrever) |
| Herança/doação | Inventário/escritura de doação + GCAP |
| Sócio de empresa | Contrato social + comprovante anual de retenção + extrato de distribuição |
| Conta em N bancos | Informe de rendimentos de CADA banco |
| Corretora | Informe da corretora + DARFs mensais se day trade |
| Day trade | Notas + DARFs |
| Crypto | Extratos das exchanges |
| Exterior | Extratos + comprovante de remessa |
| Aluguel | Contrato + recibos + DARF Carnê-Leão se pessoa física |
| RPA | RPAs recebidos + Carnê-Leão se foi acima do limite |

## Documentos sempre obrigatórios (independente de checklist)

1. **Declaração IRPF do ano anterior** (PDF da entregue)
2. **Recibo da última declaração entregue** (número)
3. **CPF de TODOS os familiares** que serão dependentes
4. **Comprovante de endereço atualizado**
5. **Extratos bancários de 31/12** de TODAS as contas
6. **Saldo de TODAS as aplicações em 31/12**

## Conferências antes de tela por tela

Antes de começar o preenchimento:

1. **Lista cruzada de fontes pagadoras**: o cliente lembrou de todas? Vale perguntar com base em movimentação bancária — "olha, vi entrada de R$ X em julho, de onde veio?"
2. **Total de entradas em 31/12 vs renda informada**: se entrou muito mais no banco que a renda informada, alerta — pode ser renda esquecida.
3. **Variação patrimonial × renda do ano**: se patrimônio cresceu MUITO mais que renda permite → tem renda não declarada.
4. **Bens declarados no ano anterior**: confirmar se ainda existem ou se foram vendidos.

## Ao final — sempre recomendar gov.br

Mensagem padrão na ficha final:

> **Recomendação operacional**: para o próximo exercício, orientar o cliente a criar/elevar conta gov.br para nível **ouro** ou **prata**. A pré-preenchida traz dados do eSocial, e-Financeira, escrituras de imóveis, plano de saúde e despesas DMED automaticamente. Reduz drasticamente o risco de malha e poupa tempo de montagem.

Para conta ouro: validação biométrica via app gov.br + dados bancários.
Para conta prata: validação via internet banking de banco credenciado (BB, Caixa, Bradesco, BRB, BANRISUL).

## Riscos exclusivos deste modo

- **Omissão de fontes pagadoras**: principal causa de malha
- **Saldos bancários divergentes**: e-Financeira vai bater com Receita
- **Despesas médicas DMED maiores que declaradas**: também gera malha
- **Bens não declarados**: DOI (Declaração de Operações Imobiliárias) e Detran reportam
- **Criptoativos**: exchanges reportam via IN 1.888

A cada bloco de tela, repassar o checklist relevante daquele bloco como "última chance" antes de fechar a tela.
