# R&S Horas — Software de honorários, banco de horas e propostas

Software do escritório **Rodrigues & Sordi Advogados** (Porto Alegre/RS) para
substituir o controle manual de billable hours por um fluxo único: **contrato →
banco de horas vivo → lançamento por voz/timer → e-mail-proposta com aceite →
cobrança (ASAAS)**.

Este app é a evolução do fluxo hoje feito por skills (`rs-cobrancas`) + planilha
`Cobrancas.xlsx`. Tudo que já estava validado (tabela de horas forense, padrão
CNTR, voz do escritório) é **portado**, não reinventado.

## Decisões de arquitetura (travadas com o usuário)

| Camada | Decisão |
|---|---|
| IA | **Claude** — Sonnet 4.6 (leitura de contrato, anamnese, redação) e Haiku 4.5 (extração de voz) |
| Banco | **Supabase** (Postgres) via Drizzle ORM |
| Deploy | **Vercel** |
| Tempo | **Timer nativo + voz** (sem Clockify) |
| Onboarding | **Contrato assinado é a fonte da verdade** — upload → extração → cadastro → início da contagem |
| Financeiro | **ASAAS** via API REST (o MCP do Cowork serve para inspeção/operação manual, não para o app em produção) |
| Honorários | Motor com **Tabela de Honorários da OAB/RS** + desconto configurável + equivalência em horas |
| Saída | **E-mail-proposta com link de aceite** registrado (Cláusula 2ª do contrato padrão) |

## Modelo de domínio (derivado do contrato CNTR000262)

O contrato padrão do escritório define o modelo de dados inteiro:

- **Escritório (CONTRATADA)** — fixo no sistema (Rodrigues & Sordi).
- **Cliente (CONTRATANTE)** + **sócios/representantes**.
- **Contrato** — parâmetros do *banco de horas técnicas*:
  - horas/mês, valor mensal, valor da hora técnica;
  - regra de **hora extra em 3 níveis** (padrão / não-cumulação / não-cumulação com quitação até dia 10);
  - acumulação (1º ano), dia de vencimento, reajuste anual (IPCA ou IGP-M, o que for melhor para a contratada), mora (multa 20% + 1% a.m. + IGP-M);
  - **êxito padrão 25%** sobre proveito econômico bruto;
  - prazo mínimo de 12 meses para aproveitar o banco em ações.
- **Saldo de horas** — saldo vivo por cliente/mês (contratado + acumulado − consumido).
- **Lançamentos** — débitos do banco (manual / voz / timer / import).
- **Processos** — ações vinculadas (ex.: RT 0020621-45.2026.5.04.0333).
- **Propostas (e-mail-proposta)** — nº de horas + valor mínimo (ref. OAB/RS) + êxito %; com **aceite** registrado.
- **Cobranças** — espelho ASAAS (PIX/boleto/link), status de pagamento.
- **Tabela OAB/RS** — valores de referência por tipo de demanda + a tabela forense interna por área/complexidade.

## Regras de negócio centrais (em `src/domain/`)

1. **Banco de horas** (`hourBank.ts`) — cálculo de saldo, acumulação, e quantas horas viraram extra.
2. **Precificação de hora extra** (`pricing.ts`) — escolhe o nível correto (R$ 420 / 400 / 390) conforme a opção de cumulação e a data de quitação.
3. **Motor OAB/RS** (`pricing.ts`) — a partir do valor de referência OAB: preço cheio, **preço sugerido** (desconto 10–50% configurável), **equivalente em horas**, e **alerta de aviltamento** (cobrar abaixo do mínimo da OAB tem implicação ética — pendente de confirmação pela pesquisa em curso).
4. **Reconciliação do valor mínimo da ação** (`proposal.ts`) — Cláusula 2ª §3º: horas do banco consumidas na ação são creditadas/abatidas do valor mínimo; se ao final ficar aquém, calcula-se a diferença a cobrar. Inclui cálculo do **êxito** (25% sobre proveito), com tratamento de polo passivo (sem êxito).

## Status de construção

- [x] Núcleo de domínio + testes — **não depende de credenciais**
- [x] Schema Postgres/Drizzle (Supabase) — 12 tabelas + migration
- [x] Extração de contrato com Claude (Sonnet) — testada contra o CNTR000262
- [x] Voz (Haiku) + casamento de cliente + fila de revisão (lógica)
- [x] Anamnese + Tabela OAB/RS + e-mail-proposta + aceite (motor)
- [x] Cliente ASAAS (REST) — código + testes mockados
- [ ] **Frontend (React)**: dashboard, lançamento por voz, timer nativo, telas de
      cliente/proposta, painel de controle austero
- [ ] **Deploy real**: projeto Supabase, Vercel, `ANTHROPIC_API_KEY`, egress ASAAS
- [ ] Envio de e-mail (Gmail/SMTP) + página web de aceite

> A Tabela de Honorários da OAB/RS (base 2012, indicativo) está em
> `src/data/tabelaOabRs.ts`; `corrigirValor()` aplica o reajuste acumulado.
