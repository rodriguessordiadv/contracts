---
name: rs-advogados
description: >-
  Gera CONTRATOS jurídicos do escritório Rodrigues & Sordi (prestação de serviços
  advocatícios e correlatos) em .docx, aplicando o padrão de numeração e o layout
  de cabeçalho/rodapé CNTR. Use quando o usuário pedir a elaboração de um contrato
  jurídico. NÃO usar para peças forenses (petições, contestações, agravos etc.),
  que mantêm o cabeçalho institucional Rodrigues & Sordi.
---

# rs-advogados — Contratos jurídicos (Rodrigues & Sordi)

Skill de geração de **CONTRATOS** jurídicos. O detalhamento de formatação
(cabeçalho, rodapé, posição do número, fontes e cores) está em
[`formatting-spec.md`](./formatting-spec.md).

## Escopo crítico

Este padrão (layout sem cabeçalho institucional + numeração CNTR) vale **somente
para CONTRATOS**. Petições, contestações, agravos e demais **peças forenses**
mantêm o cabeçalho institucional **RODRIGUES & SORDI** — a identificação do
advogado é exigência forense. **Não aplicar** o layout sem-cabeçalho a peças
judiciais.

## Regras Críticas

### Numeração de Contratos (padrão CNTR)

Todo CONTRATO gerado recebe um número no formato `CNTRNNNNNN` (prefixo CNTR + 6
dígitos), ex.: `CNTR000262`.

**FLUXO OBRIGATÓRIO — antes de gerar qualquer contrato, SEMPRE perguntar ao usuário:**

1. **"Qual o número deste contrato?"** (ex.: CNTR000263) — nunca presumir nem
   inventar o próximo número; o controle da sequência é do usuário.
2. **"Em qual lista/projeto devo registrar este número?"** — para manter a memória
   da numeração dentro do projeto/uso correto.

Após gerar, registrar no controle indicado pelo usuário a linha:
`CNTRNNNNNN — [objeto do contrato] — [contratante] — [data]`.

> Observação honesta: o skill não persiste contador entre conversas. A
> continuidade da sequência depende dessa pergunta + do registro na lista do
> projeto. Por isso a pergunta é obrigatória e não pode ser pulada.

## Checklist de validação (todo contrato)

- [ ] Perguntei o número do contrato e em qual lista registrar.
- [ ] Página 1 sem cabeçalho.
- [ ] Página 2+ com `Título | CNTRNNNNNN` no topo, sem nome do escritório.
- [ ] Sub-item CNTR à direita, itálico, abaixo do título.
- [ ] Rodapé em todas as páginas: CNTR à esquerda, `Página X de Y` à direita, sem dados do escritório.
- [ ] Peças forenses (petição/contestação/etc.) NÃO usaram este layout — mantiveram o cabeçalho institucional.
- [ ] Número registrado na lista do projeto indicada.
