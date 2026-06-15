---
name: radec-contabilidade
description: >-
  Gera PROPOSTAS e CONTRATOS contábeis da RadéC Contabilidade em .docx, aplicando
  o padrão de numeração e o layout de cabeçalho/rodapé CNTR, com a identidade
  visual RadéC (verde petróleo #2C5F5F / azul #1F4E79). Use quando o usuário pedir
  a elaboração de uma proposta ou contrato contábil.
---

# radec-contabilidade — Propostas/contratos contábeis (RadéC)

Skill de geração de **PROPOSTAS e CONTRATOS** contábeis. O detalhamento de
formatação (cabeçalho, rodapé, posição do número, fontes e cores) está em
[`formatting-spec.md`](./formatting-spec.md).

Mesmo layout CNTR do padrão geral, trocando apenas a fonte/cor padrão para a
identidade **RadéC** (verde petróleo `#2C5F5F` / azul `#1F4E79`) no título e no
fio do cabeçalho, mantendo:

- página 1 sem cabeçalho;
- número CNTR no sub-item, no cabeçalho (pág. 2+) e no rodapé;
- rodapé sem dados institucionais;
- a mesma regra de numeração e a pergunta obrigatória abaixo.

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
- [ ] Página 2+ com `Título | CNTRNNNNNN` no topo, sem dados institucionais.
- [ ] Sub-item CNTR à direita, itálico, abaixo do título.
- [ ] Rodapé em todas as páginas: CNTR à esquerda, `Página X de Y` à direita, sem dados institucionais.
- [ ] Identidade RadéC aplicada (verde petróleo #2C5F5F / azul #1F4E79) no título e no fio do cabeçalho.
- [ ] Número registrado na lista do projeto indicada.
