# Pegadinhas e checagens automáticas

Lista das verificações que SEMPRE devem rodar antes de fechar a ficha final. Cada uma com sintoma, ação e base legal.

## 1. Acumulação de fontes pagadoras

**Sintoma**: contribuinte tem 2+ fontes na tela "Rendimentos Tributáveis PJ".

**Risco**: cada fonte retém IRRF como se fosse única (sob faixa de isenção isoladamente), mas a soma anual cai em faixa de 22,5% ou 27,5% → imposto a pagar SURPRESA.

**Ação**:
1. Somar rendimentos anuais de todas as fontes
2. Aplicar desconto simplificado (20%) ou completa
3. Aplicar tabela progressiva anual
4. Subtrair IRRF total retido
5. Resultado positivo = imposto a pagar; avisar o cliente com VALOR ESTIMADO antes de fechar

**Prevenção para próximo ano**:
- Cliente pode solicitar majoração de retenção em uma das fontes (Receita admite via formulário interno da empresa ou direto no Meu INSS)
- Ou guardar provisão mensal pra pagar de uma vez

## 2. Aposentado / pensionista ≥ 65 anos no ano-calendário

**Sintoma**: data de nascimento + cálculo do ano-calendário = ≥ 65 anos.

**Direito**: parcela isenta de aposentadoria/pensão. Valores 2025:
- Mensal: R$ 2.246,93
- Anual: R$ 26.963,20
- 13º proporcional isento: até R$ 2.246,93

**Atenção**:
- Vale a partir do MÊS em que completou 65 anos (proporcional no ano em que faz aniversário)
- Vale APENAS para rendimentos previdenciários (INSS, militar, RPPS, previdência privada). NÃO vale para salário ativo.

**Ação**:
1. Reduzir o valor lançado em "Tributáveis PJ" pelo valor da parcela isenta
2. Lançar a parcela isenta em "Rendimentos Isentos" categoria 02
3. Lançar 13º isento proporcional em categoria 03

## 3. Doença grave em atividade laboral — Tema 1.037 STJ

**Sintoma**: cliente declara doença grave (cardiopatia, câncer, AIDS, etc.) MAS continua trabalhando ativamente.

**Regra**: Tema 1.037 STJ — isenção por doença grave SÓ vale para rendimentos PREVIDENCIÁRIOS. Salário ativo continua tributável.

**Ação**:
- Salário CLT/autônomo: lança normalmente como tributável
- Aposentadoria/pensão/reforma: pode ser isenta (categoria 11) se houver laudo oficial reconhecendo
- Sem laudo oficial: NÃO aplicar isenção administrativamente (risco de malha). Recomendar pedido no Meu INSS.

**Lista das 16 doenças graves (Lei 7.713/88 art. 6º XIV)**:
1. Moléstia profissional
2. Tuberculose ativa
3. Alienação mental
4. Esclerose múltipla
5. Neoplasia maligna (câncer, mesmo em remissão)
6. Cegueira (inclusive monocular — STJ)
7. Hanseníase
8. Paralisia irreversível e incapacitante
9. Cardiopatia grave (inclui stent + angioplastia em diversos precedentes)
10. Doença de Parkinson
11. Espondiloartrose anquilosante
12. Nefropatia grave
13. Hepatopatia grave (desde 01/01/2005)
14. Doença de Paget (estados avançados)
15. Contaminação por radiação
16. AIDS

**Súmula 627 STJ**: contemporaneidade dos sintomas não é exigida — câncer em remissão mantém direito.

**Súmula 598 STJ**: laudo médico oficial dispensável para o reconhecimento judicial — particular basta na via judicial.

## 4. Lei 15.270/2025 — Isenção até R$ 5 mil/mês

**Vigência**: a partir de 01/01/2026.

**Aplicação na declaração**:
- Declaração ano-base 2025 (exercício 2026) → **NÃO APLICA**. Continua tabela tradicional 2025.
- Declaração ano-base 2026 (exercício 2027) → APLICA. Total mensal até R$ 5.000 = isenção integral. Faixa R$ 5.000-7.350 = redução decrescente. Acima de R$ 7.350 = tributação inalterada.

**Erro comum**: aplicar a isenção em 2025 porque a lei entrou em vigor antes da declaração ser entregue.

## 5. Pré-preenchida vs informes

**Sintoma**: trabalhando em modo COM gov.br.

**Ação**: para CADA fonte pagadora no rascunho, conferir com o informe físico. Para CADA conta bancária, conferir saldo 31/12.

**Critério**:
- Tolerância R$ 1,00 para arredondamento de centavos
- Divergências maiores = investigar
- Se cliente tem informe e rascunho não tem → empresa atrasou eSocial; lança manual
- Se rascunho tem e cliente não tem informe → fonte legítima esquecida; pedir 2ª via

## 6. Saldos bancários em 31/12 — e-Financeira

**Regra**: Banco transmite à Receita TODAS as contas (titularidade do contribuinte) com saldo em 31/12, mesmo conta zerada, mesmo conta poupança nunca usada.

**Ação obrigatória**:
- Pedir extrato de 31/12 de TODAS as contas
- Lançar todas, mesmo saldo R$ 0
- NÃO esconder conta para "economizar tela" — gera malha

## 7. Ganho de capital — venda de imóvel

**Sintoma**: cliente vendeu imóvel no ano.

**Programa**: GCAP (gerado separadamente e importado pro PGD).

**Isenções**:
- Único imóvel vendido até R$ 440 mil + não houve outra venda nos últimos 5 anos (art. 23 Lei 9.250/95)
- Compra de outro imóvel residencial em 180 dias (art. 39 Lei 11.196/2005) — só residencial, NÃO terreno
- Imóveis adquiridos antes de 1969 (fator de redução pleno)

**Reduções**:
- Fator de redução por tempo de aquisição (art. 18 Lei 7.713/88) — quanto mais antigo, menos imposto

**Alíquotas (vendas acima da isenção)**:
- 15% sobre o ganho até R$ 5 milhões
- 17,5% de R$ 5 mi a R$ 10 mi
- 20% de R$ 10 mi a R$ 30 mi
- 22,5% acima de R$ 30 mi

**DARF**: até o último dia útil do mês seguinte à venda (código 4600).

## 8. Atualização de imóveis — Lei 14.973/2024

**Sintoma**: cliente pagou DARF de ganho de capital até 16/12/2024 para atualizar o valor de um imóvel.

**Marcador**: SIM na pergunta "Atualizou o valor de algum bem imóvel..." na tela de Bens.

**Efeito**: o valor declarado de 31/12 do ano-calendário pode ser superior ao do ano anterior, com o ganho de capital já recolhido.

## 9. Renda variável — operações comuns e day trade

**Operações comuns** (ações vendidas em dias diferentes da compra):
- Isenção até R$ 20 mil/mês de vendas (total bruto)
- Acima disso: 15% sobre o ganho líquido
- DARF código 6015

**Day trade** (compra e venda no mesmo dia, mesmo papel):
- SEMPRE tributado, 20% sobre o ganho líquido
- DARF código 6015

**Sintoma**: cliente operou na bolsa em [ano] sem ter pago DARFs mensais → vai gerar débito + multa.

**Ação**: avisar para regularizar (DARF retroativo com multa e juros Selic) antes de declarar, ou declarar acertando e aguardar notificação.

## 10. Modalidade simplificada vs completa

**Simplificada**: desconto de 20% sobre rendimentos tributáveis, limitado a R$ 16.754,34 em 2025.

**Completa**: deduções específicas (médicas sem limite, educação até R$ 3.561,50 por dependente em 2025, previdência privada até 12% da renda, etc.).

**Regra de ouro**: simplificada vence em 90% dos casos sem despesas vultosas.

**Quando completa vence**:
- Despesas médicas significativas (cirurgias, internações, planos premium)
- Educação de múltiplos dependentes
- Dependentes (R$ 2.275,08 por dependente em 2025)
- Pensão alimentícia paga (sem limite)
- Previdência privada PGBL

**Sempre calcular as duas** antes de transmitir. PGD compara automaticamente.

## 11. Dependentes com renda própria

**Limite 2025**: dependente que teve rendimentos próprios > R$ 24.511,92 no ano NÃO PODE ser declarado como dependente.

**Risco**: declarar dependente com renda alta = perde a dedução de R$ 2.275,08 + tem que incluir TODOS os rendimentos do dependente na sua declaração.

**Filho universitário**: pode ser dependente até 24 anos se matriculado em ensino superior/técnico. Acima disso, não.

**Filho deficiente**: sem limite de idade, mas precisa comprovar deficiência.

## 12. Débito automático e PIX da restituição

**Débito automático**:
- Só para a 1ª quota se transmissão for até **10/05** do ano-corrente
- Após 10/05: só funciona a partir da 2ª quota
- Conta deve ser de titularidade do declarante (não vale conta conjunta sem o titular)

**Restituição**:
- PIX do CPF do titular → fila prioritária
- Sem PIX: conta corrente ou poupança em nome do titular

## 13. Saldo a pagar mínimo

**Regra**: saldo a pagar inferior a R$ 10,00 é dispensado de DARF.

**Ação**: se saldo der R$ 5 ou R$ 8, programa não emite DARF — não se preocupar.

## 14. Acréscimo patrimonial a descoberto

**Sintoma**: bens em 31/12 cresceram muito mais que renda do ano permite (mesmo somando isentos e exclusiva).

**Regra**: variação patrimonial > renda total + estimativa de despesas pessoais = "acréscimo patrimonial a descoberto" → presumido como renda omitida.

**Fórmula simplificada**:
```
Bens em 31/12 + dívidas quitadas - Bens em 31/12 ano-1 - dívidas novas - heranças/doações recebidas
≤ Renda tributável + Isentos + Exclusiva - despesas de subsistência estimadas
```

**Despesas estimadas** (Receita usa cestas básicas, IBGE, custo de vida da região): aproximadamente 30-50% da renda bruta para classe média.

**Ação se houver descoberto**:
- Investigar com cliente origem dos recursos
- Pode ser herança/doação esquecida (lança em isentos)
- Pode ser empréstimo (lança em dívidas)
- Pode ser renda esquecida → declarar e ajustar
- Pior caso: cliente vai admitir omissão e pagar imposto + multa

**Nunca transmitir com descoberto significativo sem investigar.**
