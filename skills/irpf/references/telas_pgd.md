# Telas do PGD — Sequência canônica

Ordem em que as telas serão apresentadas. Cada tela tem:
- Nome oficial do PGD
- O que entra
- Modelo de recortável em tabela markdown
- Checagens automáticas
- Próxima tela

Princípio: **uma tela por turno**. Sempre confirma antes de avançar.

## 1. Identificação do Contribuinte

**Campos**:
- Nome completo, CPF, data de nascimento
- Estado civil (cônjuge?)
- Endereço completo + telefone + e-mail
- Natureza da ocupação (lista do PGD)
- Ocupação principal (lista do PGD)
- Tipo de declaração (Original / Retificadora)
- Nº recibo da última declaração entregue
- Houve alteração de dados cadastrais?
- Declarante ou dependente com doença grave?
- Era residente no exterior e passou a ser residente no Brasil?
- Raça/Cor

**Modelo recortável**:
```
| Campo | Valor |
|---|---|
| Nome | [nome] |
| CPF | [cpf] |
| Nascimento | [dd/mm/aaaa] |
| Endereço | [rua, número, complemento, bairro, município/UF, CEP] |
| Telefone | [(DDD) número] |
| E-mail | [email] |
| Ocupação | [código + descrição] |
| Tipo de declaração | [Original/Retificadora] |
| Recibo anterior | [nº ou "não declarou"] |
| Doença grave | [Sim/Não] |
```

**Perguntas pertinentes**:
- "Mudou de endereço em [ano]?"
- "Casou, separou ou ficou viúvo(a) em [ano]?"
- "Vai declarar dependente este ano?" → se sim, próxima tela é Dependentes
- "Tem doença grave reconhecida pelo INSS ou em pleito?"

## 2. Dependentes

**Campos por dependente**:
- CPF (obrigatório qualquer idade)
- Nome
- Data de nascimento
- Relação de dependência (lista PGD: filho, cônjuge, pais, etc.)

**Checagens**:
- Dependente com rendimento > R$ 24.511,92/ano em 2025? **NÃO PODE** ser dependente — perde o benefício e ainda obriga a declarar todos os rendimentos dele
- Filho > 21 anos só dependente se universitário até 24 anos ou incapaz
- Cônjuge: alternativa é declarar separado se renda dele/dela for alta (calcular)

**Perguntas pertinentes**:
- "Algum dependente teve renda em [ano]?" (salário de menor aprendiz, bolsa, pensão, etc.)
- "Algum dependente fez 21 anos e não está mais na universidade?"
- "Algum dependente fez 24 anos?"

## 3. Alimentandos

**Campos**:
- CPF do alimentando
- Nome
- Valor pago no ano
- Documento que estabelece (decisão judicial / escritura pública)

**Checagens**:
- Pensão precisa ter decisão judicial OU escritura pública. Acordo verbal NÃO deduz.
- Tema 874 STF: a partir de 2022, pensão alimentícia É TRIBUTÁVEL para quem recebe (alimentando) — mas isso não afeta a dedução de quem paga.

## 4. Rendimentos Tributáveis de PJ pelo Titular

**Campos por fonte**:
- CNPJ da fonte
- Nome da fonte
- Rendimentos recebidos
- Contribuição previdenciária oficial
- Imposto retido na fonte (IRRF)
- 13º salário
- IRRF sobre 13º salário

**Modelo recortável**:
```
| Fonte | CNPJ | Rendimentos | Contrib. Prev. | IRRF | 13º | IRRF 13º |
|---|---|---|---|---|---|---|
| [Empresa A] | [cnpj] | | | | | |
| [Empresa B] | [cnpj] | | | | | |
| **TOTAL** | | | | | | |
```

**Checagens automáticas críticas**:
- **MAIS DE UMA FONTE = ACUMULAÇÃO**: simular soma anual + faixa progressiva → previsão de imposto a pagar surpresa. Avisar o cliente ANTES de fechar.
- **Aposentado ≥ 65 anos no ano-calendário**: parcela isenta de R$ 26.963,20/ano + isenção proporcional do 13º. NÃO esquecer de lançar nos isentos.
- **Conferir contribuição previdenciária**: empresa pode ter retido com base em teto antigo. Não impacta a declaração mas vale conferir com o cliente.

**Perguntas pertinentes**:
- "Tem certeza que essas são todas as empresas?"
- "Recebeu PLR? Onde está lançado?"
- "Recebeu rescisão? Vamos para a tela de isentos (multa FGTS e aviso prévio são isentos)"

## 5. Rendimentos Tributáveis de PF e Exterior pelo Titular

**Campos**:
- CPF do pagador (se PF) ou identificação se exterior
- Rendimentos recebidos
- Carnê-Leão pago

**Checagens**:
- Aluguel recebido de pessoa física → obrigatório Carnê-Leão Web mensal (Lei 7.713/88 art. 8º)
- RPA recebido de pessoa física → obrigatório Carnê-Leão se acima da faixa de isenção mensal
- Pensão alimentícia recebida → tributável (Tema 874 STF)
- Exterior → converter pelo dólar de compra do dia do recebimento

## 6. Rendimentos Isentos e Não Tributáveis

**Categorias frequentes**:
- 02 — Parcela isenta de aposentadoria 65+ anos
- 03 — Parcela isenta do 13º de aposentadoria 65+ anos
- 04 — Indenização por rescisão de contrato (multa FGTS, aviso prévio indenizado)
- 05 — Saldo FGTS sacado
- 11 — Doença grave / Acidente em serviço (aposentadoria/reforma/pensão)
- 12 — Bolsas de estudo
- 14 — Transferências patrimoniais (doações recebidas, heranças)
- 18 — Lucros e dividendos
- 26 — Outros (PLR no exercício a partir de 2024 entra em exclusiva, não aqui)

**Checagens críticas**:
- **Aposentado ≥ 65 anos**: SEMPRE lançar parcela isenta (R$ 26.963,20/ano em 2025) + parcela isenta do 13º proporcional
- **Doença grave**: Tema 1.037 STJ — só vale para rendimentos PREVIDENCIÁRIOS. Salário ativo continua tributável.
- **Lucros e dividendos**: lançar com CNPJ da PJ que distribuiu
- **Indenização trabalhista**: distinguir parcela isenta (FGTS, aviso prévio, multa) da parcela tributável (férias proporcionais, 13º proporcional)

## 7. Rendimentos Sujeitos à Tributação Exclusiva / Definitiva

**Categorias**:
- 01 — 13º salário (líquido após IRRF)
- 04 — Ganhos de capital na alienação de bens e direitos
- 06 — Rendimentos de aplicações financeiras
- 11 — Outros (PLR, juros sobre capital próprio)
- 12 — PLR (Participação nos Lucros) — a partir de 2024 vai aqui, não mais nos tributáveis

**Modelo recortável aplicações financeiras**:
```
| Fonte | CNPJ | Valor |
|---|---|---|
| [Banco/Corretora] | [cnpj] | [valor líquido a declarar] |
```

⚠️ Atenção: o valor declarado é o **líquido** ("valor a declarar" do informe), não o bruto. Não confundir.

## 8. Imposto Pago / Retido

Para preenchimento de IR pago no exterior, Carnê-Leão acumulado pago, e DARFs de complementar.

## 9. Pagamentos Efetuados (modalidade completa)

Despesas dedutíveis:
- Médicos, dentistas, hospitais, planos de saúde
- Educação (limite anual por dependente — verificar valor do exercício)
- Pensão alimentícia (sem limite, se judicial)
- Previdência oficial (já vem nas fontes PJ)
- Previdência privada PGBL (limite de 12% da renda bruta)
- Livro caixa de autônomo

**Checagem**: comparar simplificada vs completa. Se completa não vencer por margem significativa, fica simplificada (menos risco de malha).

## 10. Doações Efetuadas

Doações que dão dedução direta no imposto (Estatuto da Criança, Idoso, Fundos de Cultura, Esporte, Saúde — Pronon/Pronas/Pronas).

Limite agregado: 7% do imposto devido (Estatuto Criança + Idoso) + 1% por programa específico.

## 11. Bens e Direitos

**Campos por bem**:
- Grupo (lista PGD)
- Código (lista PGD)
- Localização (Brasil/Exterior — código do país)
- CNPJ (se aplicável — banco, corretora)
- Discriminação (descritivo)
- Situação em 31/12 do ano anterior
- Situação em 31/12 do ano-calendário

**Modelo recortável**:
```
| Grupo/Cód. | Discriminação | 31/12/[ano-1] | 31/12/[ano] | Variação |
|---|---|---|---|---|
| 01/11 | Apartamento [endereço] | | | |
| 04/02 | RDB Itaú [ag/conta] | | | |
| 06/01 | CC Itaú [ag/conta] | | | |
| | **TOTAL** | | | |
```

**Checagens**:
- Bens IMÓVEIS: valor NÃO se atualiza com valor de mercado (mantém valor de aquisição + benfeitorias com comprovação). Exceção: Lei 14.973/2024 permitiu atualização com pagamento de ganho de capital até 16/12/2024 (4% para pessoa física)
- Veículos: NÃO se atualiza com FIPE (mantém valor de aquisição). Se vendeu, baixa.
- Saldos bancários e RDB/CDB: atualiza para o saldo de 31/12
- Ações: mantém valor de aquisição (preço médio de compra)
- Criptoativos: declarar pelo valor de aquisição

**Pergunta crítica antes de fechar**:
- "Atualizou o valor de algum bem imóvel e pagou o ganho de capital até 16/12/2024 de acordo com a Lei nº 14.973/2024?"

## 12. Dívidas e Ônus Reais

**Campos**:
- Código (financiamento, empréstimo, etc.)
- Discriminação
- Situação em 31/12 ano anterior
- Situação em 31/12 ano-calendário

**Quem declarar**: dívidas acima de R$ 5 mil em 31/12. Abaixo disso, dispensa.

## 13. Atividade Rural (se aplicável)

Demonstrativo separado: receitas, despesas, apuração, movimentação de rebanho, bens da atividade rural, dívidas vinculadas.

Resultado positivo entra como tributável; negativo pode ser compensado em até 8 anos.

## 14. Ganhos de Capital (se houve venda de bens)

Gerar GCAP (programa separado) e importar. Apurado pelo PGD com base nos dados do GCAP.

**Isenções principais (art. 39 Lei 11.196/2005 + art. 22-23 Lei 9.250/95)**:
- Único imóvel vendido até R$ 440 mil (se não houve outra venda nos últimos 5 anos)
- Venda + compra de OUTRO imóvel residencial em 180 dias
- Venda de imóveis adquiridos antes de 1969 (fator de redução pleno)

## 15. Renda Variável (se aplicável)

Mês a mês, ganhos líquidos ou perdas, DARFs pagos.

**Obrigação acessória**:
- Vendas > R$ 20 mil/mês em ações: tributação na operação comum
- Day trade: SEMPRE tributado, independente de valor
- DARFs mensais pagos até último dia útil do mês seguinte (código 6015)

## 16. Fundos de Investimento Imobiliário e CRA

Mês a mês. Atualmente isentos para PF se cliente tiver < 10% do fundo (cuidar regras novas a partir de 2024).

## 17. Demonstrativo de Aposentadoria por Acidente em Serviço / Doença Grave

Se aplicável, ficha específica.

## 18. Resumo e Opções de Pagamento

Final. Programa calcula:
- Total de rendimentos tributáveis
- Desconto simplificado (20% até limite)
- Base de cálculo
- Imposto devido
- IRRF e demais retenções
- Saldo a pagar ou a restituir

**Opções de pagamento**:
- À vista até o último dia útil de maio
- Parcelamento em até 8 quotas (mínimo R$ 50 por quota)
- Débito automático: 1ª quota se transmitir até 10/05; senão a partir da 2ª

**Restituição**:
- Cadastrar PIX do CPF do titular (prioridade na fila)
- Ou conta corrente/poupança em nome do titular
