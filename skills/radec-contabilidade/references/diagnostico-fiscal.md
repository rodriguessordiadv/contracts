# Módulo 1 — Diagnóstico Fiscal

## Dados a Coletar Antes do Diagnóstico

Antes de qualquer análise, confirmar com o usuário (ou extrair do material anexado):

**Da empresa:**
- Razão social e nome fantasia
- CNPJ
- Data de abertura
- Regime tributário atual (MEI / Simples Nacional / Lucro Presumido / Lucro Real)
- Status atual do CNPJ (ativo, inapto, baixado, suspenso)
- Atividade principal (CNAE)
- Sócios / Responsável Legal

**Da situação fiscal:**
- Tem faturamento real? Quanto (mesmo estimado)?
- Tem funcionários? Quantos?
- Tem dívidas na PGFN? Valor aproximado?
- Tem parcelamentos ativos?
- Tem débitos no Simples Nacional?
- Tem inscrições em dívida ativa?
- Algum processo judicial em andamento?

**Das obrigações:**
- Tem declarações em atraso? Quais?
- Desde quando não entrega declarações?
- Tem DAS em atraso? Quantos meses?
- Tem GFIP/eSocial em atraso?
- Tem nota fiscal emitida sem contabilidade?

---

## Estrutura do Diagnóstico

### 1. SITUAÇÃO CADASTRAL
```
Status CNPJ:        [Ativo / Inapto / Suspenso / Baixado]
Desde:              [Data ou período]
Motivo da irregularidade: [DEFIS / DASN / omissão de declarações / débitos / etc.]
Risco:              [Baixo / Médio / Alto / Crítico]
```

### 2. SITUAÇÃO TRIBUTÁRIA — SIMPLES NACIONAL
Separar por obrigação:

| Obrigação | Descrição | Periodicidade | Atraso (períodos) | Situação |
|-----------|-----------|---------------|-------------------|----------|
| PGDAS-D   | Apuração mensal do Simples | Mensal | XX | Em atraso |
| DEFIS     | Declaração anual de informações | Anual | XX | Em atraso |
| DAS       | Guia de pagamento | Mensal | XX | Em atraso |
| DCTFWeb   | Declaração de contribuições (se empregados) | Mensal | XX | Em atraso |
| GFIP      | Informações à previdência | Mensal | XX | Em atraso |
| eSocial   | Se empregados | Mensal | XX | Em atraso |

### 3. SITUAÇÃO TRIBUTÁRIA — DÍVIDAS
```
PGFN (Dívida Ativa Federal): R$ [valor] — [parcelado / não parcelado]
Simples Nacional débitos:    R$ [valor] — [parcelado / não parcelado]
ISS municipal:               R$ [valor] — [se houver]
Outros:                      R$ [valor]
```

### 4. SITUAÇÃO TRABALHISTA (se empregados)
```
Empregados: [número]
GFIP em dia? [Sim / Não — desde quando]
eSocial ok? [Sim / Não]
FGTS em dia? [Sim / Não]
```

### 5. ANÁLISE DE RISCO

**Critérios de classificação:**

🟢 **BAIXO** — CNPJ ativo, poucas obrigações em atraso, sem dívida ativa, regularizável rapidamente

🟡 **MÉDIO** — CNPJ com restrições, declarações em atraso por 1-2 anos, dívidas parceláveis

🔴 **ALTO** — CNPJ inapto, declarações em atraso há mais de 2 anos, dívidas significativas, risco de exclusão do Simples

🔴🔴 **CRÍTICO** — Dívida ativa com execução fiscal em andamento, CNPJ baixado, irregularidades potencialmente penais, empregados sem recolhimento

### 6. IMPACTOS PRÁTICOS PARA O CLIENTE

Traduzir a situação para o que realmente importa pro cliente:
- Não consegue abrir conta bancária empresarial?
- Não consegue emitir certidão negativa?
- Não pode participar de licitações?
- Sócios com CPF com restrições?
- Risco de multas automáticas?
- Risco de exclusão do Simples Nacional?

---

## Cálculo de Volume de Trabalho

### Como contar obrigações em atraso:

**PGDAS-D:** contar cada mês de competência em atraso (ex: jan/2022 a dez/2024 = 36 declarações)
- Cada período = 1 unidade de trabalho
- Se empresa com faturamento = complexidade ALTA (precisa do faturamento mês a mês)
- Se empresa sem faturamento = complexidade BAIXA (declarar zerado é mais simples)

**DEFIS:** 1 por ano de competência
- Preenche com base nos dados do PGDAS-D do mesmo ano
- Se PGDAS-D estiver ok, DEFIS é mais rápida

**DCTFWeb:** 1 por mês de competência com empregados
- Requer cruzamento com folha de pagamento e eSocial

**GFIP:** 1 por mês — requer dados de folha
- Mais trabalhosa quando há empregados e dados incompletos

**ECF (Lucro Presumido):** 1 por ano — mais complexa

**EFD (SPED):** mensal ou trimestral — exige escrituração completa

---

## Perguntas-Chave para o Diagnóstico

Antes de fechar o diagnóstico, garantir resposta para:

1. A empresa teve faturamento nos períodos em atraso?
2. Existem notas fiscais emitidas? Temos acesso a elas?
3. A empresa tinha empregados? Em que período?
4. Há débitos já parcelados? Em quais programas?
5. O cliente quer reativar o CNPJ ou encerrar a empresa?
6. Qual o prazo que o cliente tem / qual a urgência?
7. Existe alguma operação ou contrato que depende da regularização?
