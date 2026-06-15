# contracts — Padrão de Contratos CNTR

Repositório dos skills de geração de **contratos** (cabeçalho/rodapé + numeração
padrão **CNTR**).

## Skills

| Skill | Uso |
| --- | --- |
| [`rs-advogados/`](./rs-advogados/) | Contratos jurídicos — Rodrigues & Sordi |
| [`radec-contabilidade/`](./radec-contabilidade/) | Propostas/contratos contábeis — RadéC (identidade verde petróleo #2C5F5F / azul #1F4E79) |

Cada skill tem:

- `SKILL.md` — metadados + regra de numeração CNTR (pergunta obrigatória) + checklist;
- `formatting-spec.md` — código `docx` do número no corpo, cabeçalho, rodapé e
  ligação na seção do `Document`.

## Escopo crítico

O padrão CNTR (layout **sem** cabeçalho institucional + numeração CNTR) vale
**somente para CONTRATOS**. Petições, contestações, agravos e demais **peças
forenses** mantêm o cabeçalho institucional **RODRIGUES & SORDI** — a
identificação do advogado é exigência forense. **Não aplicar** o layout
sem-cabeçalho a peças judiciais.

## Padrão CNTR em resumo

- Número no formato `CNTRNNNNNN` (prefixo CNTR + 6 dígitos), ex.: `CNTR000262`.
- **Antes de gerar**, perguntar sempre: (1) o número do contrato e (2) em qual
  lista/projeto registrá-lo. Nunca presumir o próximo número.
- Página 1 **sem** cabeçalho; página 2+ com `Título | CNTRNNNNNN` no topo.
- Sub-item CNTR à direita, itálico, abaixo do título.
- Rodapé em todas as páginas: CNTR à esquerda, `Página X de Y` à direita, sem
  dados institucionais.
