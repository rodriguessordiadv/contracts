# Modo COM gov.br — Protocolo

Cenário: o cliente importou o rascunho no PGD via integração com o e-CAC (gov.br ouro ou prata). A declaração vem com dados pré-preenchidos.

## O que costuma vir pré-preenchido

| Bloco | Fonte | Vem? |
|---|---|---|
| Identificação | CPF Receita | Sim |
| Endereço | CPF Receita | Parcial — confere e atualiza |
| Rendimentos tributáveis PJ | eSocial (DCTFWeb) | Sim, se a empresa transmitiu |
| Rendimentos INSS | INSS | Sim |
| Rendimentos PF (carnê-leão) | Carnê-Leão Web | Sim, se cliente usou |
| Rendimentos isentos | eSocial + INSS | Sim |
| 13º salário | eSocial | Sim |
| Aplicações financeiras (tributação exclusiva) | e-Financeira | Sim |
| Saldos bancários em 31/12 | e-Financeira | Sim |
| Pensão alimentícia paga | Carnê-Leão Web | Parcial |
| Plano de saúde | Operadora (DMED) | Sim |
| Despesas médicas | DMED | Parcial — só clínicas/hospitais grandes |
| Imóveis com escritura registrada | Cartórios | Sim, valor de aquisição |
| Veículos | Detran | NÃO vem (declarado pelo contribuinte) |
| Pagamentos efetuados | Variável | Parcial |
| Doações | Variável | Parcial |

## Procedimento (depois da identificação do cenário)

### 1. Pedir o rascunho

"Manda o PDF do rascunho que tu importou (Imprimir Declaração no PGD) ou prints das telas principais."

Aceita: PDF da declaração em rascunho, prints, ou o arquivo .DEC exportado.

### 2. Pedir os informes do cliente

"Manda também TODOS os informes de rendimentos que o cliente recebeu — mesmo que tu ache que já tá no rascunho. A gente vai conferir um por um."

### 3. Pedir declaração do ano anterior

"E a declaração do ano passado, pra eu pegar dados que não mudaram (endereço, número de recibo, bens que continuam iguais)."

### 4. Conferência cruzada — campo a campo

Para cada fonte pagadora que aparece no rascunho:

| Campo | Rascunho | Informe físico | Bate? |
|---|---|---|---|
| CNPJ | | | |
| Nome | | | |
| Rendimentos | | | |
| Contribuição previdenciária | | | |
| IRRF | | | |
| 13º | | | |
| IRRF 13º | | | |

Se alguma fonte está NO INFORME mas NÃO no rascunho → empresa atrasou eSocial. Lança manualmente.

Se está NO RASCUNHO mas NÃO tem informe → cliente esqueceu de pedir. Investiga (pode ser fonte legítima que cliente nem lembra, como uma palestra paga via RPA, juros sobre capital próprio de empresa que tem ação, prêmio recebido).

### 5. Conferência de saldos bancários

Para cada conta no rascunho:

| Banco | Ag/Conta | Rascunho 31/12 | Extrato 31/12 | Bate? |
|---|---|---|---|---|
| | | | | |

Tolerância: até R$ 1,00 de diferença por conta (centavos de juros de fechamento). Acima disso, investigar.

### 6. Telas que NÃO vêm pré-preenchidas — sempre pergunta

- **Veículos** (carros, motos, embarcações): sempre lançados pelo contribuinte. Se já apareciam ano passado, mantém valor (não atualiza). Se vendeu, dar baixa. Se comprou, lança valor de compra.
- **Imóveis sem escritura registrada** (compromisso de compra e venda, posse, herança não finalizada): contribuinte declara
- **Aplicações em corretoras** (XP, BTG, Rico, NuInvest, Inter, Avenue): pode ou não vir. Conferir.
- **Crédito em terceiros** (empréstimo a parente, sócio devedor): contribuinte declara
- **Joias, obras de arte, criptoativos**: contribuinte declara (criptoativos só se posição > R$ 5 mil)
- **Conta no exterior**: contribuinte declara (e potencialmente cai em DCBE também)

### 7. Validação do total de Bens em 31/12 vs 31/12 do ano anterior

A variação patrimonial precisa ser explicável por:
- Renda do ano (rendimentos tributáveis + isentos + exclusiva) MENOS
- Despesas estimadas (alimentação, moradia, lazer — não declaradas) MAIS
- Heranças/doações recebidas MAIS/MENOS
- Ganhos de capital

Se patrimônio cresceu MUITO mais que a renda permite → cliente tem renda não declarada. Investigar antes de transmitir, ou ele cai em malha por "acréscimo patrimonial a descoberto".

### 8. Comparativo simplificada vs completa

Mesmo com rascunho, sempre rodar as duas e escolher a melhor.

### 9. Seguir para tela por tela

Após conferências, segue o protocolo padrão de telas (`telas_pgd.md`), mas em cada tela já vem com valores conferidos — então é mais ágil que o modo SEM gov.br.

## Vantagens deste modo

- Risco de malha muito menor
- Velocidade alta após conferência inicial
- Dados de bens imóveis já vêm com valor de aquisição correto
- Salários e benefícios já vêm certos (na maioria dos casos)

## Riscos a vigiar

- **eSocial atrasado**: empresa só transmitiu em março, rascunho de fevereiro não tem. Aguardar até abril ou lançar manualmente
- **DMED parcial**: clínica pequena pode não ter transmitido — cliente precisa juntar nota fiscal
- **e-Financeira parcial**: banco menor pode ter transmitido com atraso
- **Carnê-Leão Web não preenchido**: rendimentos PF não aparecem
- **Endereço desatualizado**: rascunho traz último endereço da Receita, pode estar errado
