# Formato do `.md` de saída

Este documento define o formato **exato** do `.md` que a skill `rs-cobrancas` deve gerar. Ele tem cinco seções fixas, nesta ordem.

O objetivo do formato é duplo: (a) servir de relatório legível pelo Sávio e (b) servir de **input pronto para outro Claude** (o "Claude da planilha"), que vai ler o arquivo e preencher a aba "Cadastro Jobs" da planilha `Cobrancas.xlsx` sem necessidade de explicação adicional.

---

## Estrutura — 5 seções

### Seção 1 — Cabeçalho YAML

```yaml
---
escritorio: Rodrigues & Sordi Advogados Associados
advogado_responsavel: Sávio Radé Sordi (OAB/RS 93.284)
cliente: <NOME DO CLIENTE>
cpf_cnpj: <SE CONHECIDO>
servico: <descrição curta — ex.: Assessoria Jurídica Continuada>
mes_referencia: <YYYY-MM>
data_geracao: <YYYY-MM-DD>
valor_hora_tecnica: <ex.: 500.00>
total_horas: <soma das horas estimadas>
total_bruto: <total_horas × valor_hora_tecnica>
quantidade_jobs: <N>
projeto_origem: <nome do projeto do Claude que originou>
---
```

### Seção 2 — Bloco de instruções pro Claude da planilha

Este bloco é **literal e direto**. Vai num bloco fenced markdown para destacar:

```markdown
> **PARA O CLAUDE DA PLANILHA `Cobrancas.xlsx`:**
>
> Este arquivo contém o fechamento de horas/cobranças do cliente acima identificado.
> Sua tarefa é inserir cada job da Seção 3 como uma nova linha na aba **"Cadastro Jobs"**.
>
> **Passo a passo:**
>
> 1. Abrir a planilha em `openpyxl` (preserva fórmulas).
> 2. Selecionar a aba `Cadastro Jobs`.
> 3. Identificar a primeira linha vazia (a partir da linha 5 — linha 4 é o cabeçalho).
> 4. Para cada job da Seção 3, inserir uma linha com as colunas A–L:
>    - **A** (`#`): número sequencial (continuar a numeração existente)
>    - **B** (Parte Contrária / Cliente): valor de `parte_contraria`
>    - **C** (Número do Processo): valor de `processo` (vazio se extrajudicial)
>    - **D** (Tribunal / Instância): valor de `tribunal`
>    - **E** (Tipo / Natureza): valor de `area` (Cível / Trabalhista / etc.)
>    - **F** (Status): valor de `status`
>    - **G** (Descrição / Observações): valor de `descricao`
>    - **H** (Horas Estimadas): valor numérico de `horas`
>    - **I** (Justificativa da Estimativa): valor de `justificativa`
>    - **J** (Valor Estimado R$): **fórmula** `=H{linha}*'Horas Técnicas'!$B$8`
>    - **K** (Cobrança): valor de `cobranca`
>    - **L** (Aprovado?): deixar **vazio** (Sávio aprova manualmente)
> 5. Se o `valor_hora_tecnica` do YAML diferir do valor atual em `'Horas Técnicas'!B8`, perguntar ao Sávio se deve atualizar antes de seguir.
> 6. Salvar a planilha e rodar `python /mnt/skills/public/xlsx/scripts/recalc.py Cobrancas.xlsx` para recalcular as fórmulas.
> 7. Confirmar ao Sávio: linhas inseridas, total de horas e total bruto.
```

### Seção 3 — Tabela markdown com os jobs

Tabela compacta com os campos exatos da aba "Cadastro Jobs". Cada linha = um job.

```markdown
## Jobs do período

| # | Parte Contrária / Cliente | Processo | Tribunal | Área | Status | Descrição | Horas | Cobrança |
|---|---------------------------|----------|----------|------|--------|-----------|-------|----------|
| 1 | NOME DA PARTE             | NNNN-NN.NNNN.N.NN.NNNN | TJRS - 1º grau | Cível | Concluído | Descrição curta | 6 | Mensalidade (saldo geral) |
| 2 | ...                       | ...      | ...      | ...  | ...    | ...       | ...   | ...      |
```

### Seção 4 — Detalhamento por job

Para cada job, um sub-bloco com descrição expandida e justificativa técnica:

```markdown
## Detalhamento

### Job #1 — <Parte Contrária / Cliente>

- **Processo:** NNNN-NN.NNNN.N.NN.NNNN (TJRS — 1º grau)
- **Área:** Cível
- **Tipo:** Contestação
- **Status:** Concluído
- **Complexidade atribuída:** Média
- **Horas estimadas:** 8

**Descrição:**
Descrição expandida em prosa do que foi feito — atos praticados, peças entregues, prazos atendidos, particularidades.

**Justificativa da estimativa:**
Frase técnica e direta justificando a faixa de horas escolhida (volume documental, densidade técnica, urgência, novidade da tese, etc.).

---

### Job #2 — ...
(idem)
```

### Seção 5 — Resumo financeiro

```markdown
## Resumo financeiro

- **Total de jobs:** N
- **Total de horas estimadas:** NN h
- **Valor da hora técnica:** R$ XXX,XX
- **Valor bruto do fechamento:** R$ XX.XXX,XX
- **Cobrança predominante:** Mensalidade saldo geral (X jobs) / Avulsa (X jobs) / Mista (X jobs)

### Distribuição por área

| Área | Jobs | Horas | % |
|------|------|-------|---|
| Cível | X | XX | XX% |
| Trabalhista | X | XX | XX% |
| ... | | | |

### Observações

- (Se aplicável) Saldo de banco de horas pré-existente do cliente: X h.
- (Se aplicável) Itens com cobrança Avulsa requerem aprovação prévia do cliente.
- (Se aplicável) Pendências para o próximo fechamento: ...
```

---

## Exemplo completo (referência)

Abaixo, um exemplo realista do `.md` final, simulando um fechamento de 3 jobs do cliente Marcelo Severo no mês de abril/2026:

```markdown
---
escritorio: Rodrigues & Sordi Advogados Associados
advogado_responsavel: Sávio Radé Sordi (OAB/RS 93.284)
cliente: MARCELO GONÇALVES SEVERO
cpf_cnpj: 898.218.400-78
servico: Assessoria Jurídica Continuada
mes_referencia: 2026-04
data_geracao: 2026-05-08
valor_hora_tecnica: 500.00
total_horas: 24
total_bruto: 12000.00
quantidade_jobs: 3
projeto_origem: Cliente Marcelo - Assessoria Continuada
---

> **PARA O CLAUDE DA PLANILHA `Cobrancas.xlsx`:**
>
> Este arquivo contém o fechamento de horas/cobranças do cliente acima identificado.
> Sua tarefa é inserir cada job da Seção 3 como uma nova linha na aba **"Cadastro Jobs"**.
>
> **Passo a passo:**
>
> 1. Abrir a planilha em `openpyxl` (preserva fórmulas).
> 2. Selecionar a aba `Cadastro Jobs`.
> 3. Identificar a primeira linha vazia (a partir da linha 5 — linha 4 é o cabeçalho).
> 4. Para cada job da Seção 3, inserir uma linha com as colunas A–L:
>    - **A** (`#`): número sequencial (continuar a numeração existente)
>    - **B** (Parte Contrária / Cliente): valor de `parte_contraria`
>    - **C** (Número do Processo): valor de `processo` (vazio se extrajudicial)
>    - **D** (Tribunal / Instância): valor de `tribunal`
>    - **E** (Tipo / Natureza): valor de `area`
>    - **F** (Status): valor de `status`
>    - **G** (Descrição / Observações): valor de `descricao`
>    - **H** (Horas Estimadas): valor numérico de `horas`
>    - **I** (Justificativa da Estimativa): valor de `justificativa`
>    - **J** (Valor Estimado R$): **fórmula** `=H{linha}*'Horas Técnicas'!$B$8`
>    - **K** (Cobrança): valor de `cobranca`
>    - **L** (Aprovado?): deixar **vazio**
> 5. Se o `valor_hora_tecnica` do YAML diferir do valor em `'Horas Técnicas'!B8`, perguntar ao Sávio se deve atualizar.
> 6. Salvar a planilha e rodar `python /mnt/skills/public/xlsx/scripts/recalc.py Cobrancas.xlsx`.
> 7. Confirmar ao Sávio: linhas inseridas, total de horas e total bruto.

## Jobs do período

| # | Parte Contrária / Cliente | Processo | Tribunal | Área | Status | Descrição | Horas | Cobrança |
|---|---------------------------|----------|----------|------|--------|-----------|-------|----------|
| 1 | EIXOSUL — IDPJ x Marcelo | 5006646-87.2023.8.21.2001 | TJRS — 1º grau | Cível | Em andamento | Defesa em IDPJ. Apresentada contestação com prova documental e pedido subsidiário. | 10 | Mensalidade (saldo geral) |
| 2 | JBS — IDPJ x Marcelo | 5248876-78.2025.8.21.0001 | TJRS — 1º grau | Cível | Em andamento | Defesa em IDPJ. Estudo do caso, análise documental e contestação. | 10 | Mensalidade (saldo geral) |
| 3 | COOPERATIVA SANTA CLARA LTDA | 5001851-17.2022.8.21.0144 | TJRS — 1º grau | Cível | Em andamento | Acompanhamento processual e manifestação técnica em fase saneadora. | 4 | Mensalidade (saldo geral) |

## Detalhamento

### Job #1 — EIXOSUL — IDPJ x Marcelo

- **Processo:** 5006646-87.2023.8.21.2001 (TJRS — 1º grau)
- **Área:** Cível
- **Tipo:** Defesa em IDPJ
- **Status:** Em andamento
- **Complexidade atribuída:** Média
- **Horas estimadas:** 10

**Descrição:**
Apresentada contestação no Incidente de Desconsideração de Personalidade Jurídica movido pela EIXOSUL contra o cliente. A peça enfrentou os requisitos do art. 50 do Código Civil, demonstrando ausência de confusão patrimonial e desvio de finalidade, com juntada de documentação societária e fiscal. Pedido subsidiário de produção de prova pericial.

**Justificativa da estimativa:**
Defesa em IDPJ exige estudo do caso original, análise documental robusta da pessoa jurídica, articulação da tese de afastamento dos requisitos legais e estruturação de pedido subsidiário, justificando faixa média da tabela.

---

### Job #2 — JBS — IDPJ x Marcelo

- **Processo:** 5248876-78.2025.8.21.0001 (TJRS — 1º grau)
- **Área:** Cível
- **Tipo:** Defesa em IDPJ
- **Status:** Em andamento
- **Complexidade atribuída:** Média
- **Horas estimadas:** 10

**Descrição:**
Defesa em IDPJ promovido pela JBS. Estudo do feito originário (execução 5054285-29.2019), análise da documentação societária, elaboração de contestação com tese principal e subsidiária.

**Justificativa da estimativa:**
Estrutura idêntica ao IDPJ da Eixosul, com mesmo grau de aprofundamento técnico e densidade documental, mantendo a faixa média.

---

### Job #3 — COOPERATIVA SANTA CLARA LTDA

- **Processo:** 5001851-17.2022.8.21.0144 (TJRS — 1º grau)
- **Área:** Cível
- **Tipo:** Manifestação técnica
- **Status:** Em andamento
- **Complexidade atribuída:** Média
- **Horas estimadas:** 4

**Descrição:**
Acompanhamento processual no mês e elaboração de manifestação em fase saneadora, com especificação de provas e pontos controvertidos.

**Justificativa da estimativa:**
Manifestação técnica fundamentada em fase saneadora, com necessidade de articulação probatória, posicionando-se na faixa média da tabela.

## Resumo financeiro

- **Total de jobs:** 3
- **Total de horas estimadas:** 24 h
- **Valor da hora técnica:** R$ 500,00
- **Valor bruto do fechamento:** R$ 12.000,00
- **Cobrança predominante:** Mensalidade saldo geral (3 jobs)

### Distribuição por área

| Área | Jobs | Horas | % |
|------|------|-------|---|
| Cível | 3 | 24 | 100% |

### Observações

- Todos os jobs do período foram alocados em "Mensalidade (saldo geral)", consumindo banco de horas mensal do cliente.
- Saldo de banco de horas pré-existente: verificar aba "Horas Técnicas" da planilha.
- Próximo fechamento deve incluir eventuais audiências marcadas para maio/2026.
```

---

## Notas para a skill

- O bloco de instruções (Seção 2) **deve ser literal** — sem improvisar ou abreviar. É o que permite o "Claude da planilha" trabalhar sozinho.
- Quando não houver número de processo (ex.: parecer extrajudicial, notificação), o campo `processo` na tabela e no detalhamento fica em branco e o `tribunal` pode ser preenchido como "Extrajudicial".
- O nome formal das peças deve ser respeitado (ver `tabela-horas.md`).
- Quando dois jobs forem do mesmo processo mas em momentos diferentes, manter como linhas separadas na tabela com descrições distintas.
- Se o cliente tiver banco de horas (assessoria continuada), mencionar no campo de Observações da Seção 5 e sugerir verificação do saldo na aba "Horas Técnicas".
