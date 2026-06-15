---
name: rs-advogados
description: "Elaboração de peças jurídicas .docx no padrão Rodrigues & Sordi Advogados (Porto Alegre/RS). Use SEMPRE que pedir petição, contestação, agravo, embargos, exceção, notificação extrajudicial, contrato, parecer, defesa ou qualquer peça jurídica para protocolo no TJRS ou tribunais. Dispara também com 'fazer peça', 'redigir defesa', 'elaborar petição', 'montar documento', 'padrão do escritório', 'formatar peça'. Gera .docx com Book Antiqua 12pt, espaçamento 1.15, margens ABNT, cabeçalho RODRIGUES & SORDI ADVOGADOS, rodapé institucional, redação forense gaúcha em parágrafos fluidos sem bullet points, fundamentação técnica densa e tom firme-diplomático. Cobre: petição inicial, contestação cível/trabalhista, agravo de instrumento, embargos de declaração, exceção de pré-executividade, ação revisional, superendividamento, notificação extrajudicial, contrato, parecer e defesa administrativa."
---

# Rodrigues & Sordi Advogados — Peças Jurídicas

## Visão Geral

Este skill gera peças jurídicas profissionais em formato `.docx` para protocolo no TJRS e demais tribunais, seguindo rigorosamente o padrão visual e redacional do escritório **Rodrigues & Sordi Advogados Associados**.

**IMPORTANTE:** Antes de usar este skill, leia TAMBÉM o skill `docx` (`/mnt/skills/public/docx/SKILL.md`) para as instruções técnicas de criação de documentos Word com `docx-js`. Este skill complementa o skill docx com padrões específicos do escritório.

---

## Dados do Escritório

```
Escritório: Rodrigues & Sordi Advogados Associados
Endereço: R. Gen. Andrade Neves, nº 100, conj. 901 - Centro Histórico - CEP 90010-210 - Porto Alegre - RS - Brasil
Telefone: (51) 3211.5252
E-mail: advogados@rs-adv.com

Advogados:
- Juliana Alves Rodrigues — OAB/RS 62.221
- Sávio Radé Sordi — OAB/RS 93.284
```

---

## Padrão de Formatação Obrigatório

Leia o arquivo `references/formatting-spec.md` para especificações técnicas completas de formatação docx-js. Resumo:

| Elemento | Especificação |
|----------|--------------|
| Fonte | Book Antiqua, 12pt (size: 24 em docx-js) |
| Espaçamento entre linhas | 1.15 (line: 276 em docx-js) |
| Alinhamento do corpo | Justificado |
| Margens | Superior: 3cm (1701 DXA), Inferior: 2cm (1134 DXA), Esquerda: 3cm (1701 DXA), Direita: 2cm (1134 DXA) — Padrão ABNT |
| Papel | A4 (11906 x 16838 DXA) |
| Recuo de parágrafo | Primeira linha: 1.25cm (709 DXA) em parágrafos narrativos |
| Cabeçalho | "RODRIGUES & SORDI" (negrito, 14pt) + "ADVOGADOS" (regular, 10pt) — centralizado ou à esquerda |
| Rodapé | "Rodrigues & Sordi \| Advogados — advogados@rs-adv.com — (51) 3211.5252" + endereço — centralizado, 9pt, cor cinza |
| Numeração de página | Rodapé, centralizado, abaixo do texto institucional |

---

## Estilo de Redação

### Princípios Fundamentais

1. **Parágrafos fluidos** — NUNCA usar bullet points ou listas numeradas no corpo da peça. Toda argumentação deve fluir em parágrafos discursivos densos. Listas são aceitáveis apenas em pedidos finais ("a", "b", "c") e rol de documentos.

2. **Tom firme, diplomático e técnico** — Evitar agressividade gratuita. Ser contundente na tese, respeitoso com o juízo. Usar expressões como "data maxima venia", "com o devido respeito", "salvo melhor juízo" apenas quando genuinamente necessário, sem exageros.

3. **Fundamentação densa** — Sempre citar artigos de lei com precisão (ex.: "art. 373, I, do CPC", "art. 6º, V, do CDC"). Jurisprudência somente quando fidedigna e verificável — NUNCA inventar ementas, números de processo ou citações.

4. **Estilo gaúcho forense** — Usar construções naturais da praxe gaúcha: "vem à presença de Vossa Excelência", "pelos fatos e fundamentos a seguir expostos", "termos em que, pede deferimento". Evitar regionalismos informais.

5. **Qualificação completa** — Sempre qualificar as partes com todos os dados disponíveis (nome, CPF/CNPJ, endereço, profissão, estado civil quando pertinente).

6. **Estrutura em seções com numeração romana** — As seções principais usam numeração romana (I, II, III...) e os subtemas usam numeração arábica (1, 2, 3...) com títulos em CAIXA ALTA ou negrito.

### Estrutura Padrão de uma Peça

```
ENDEREÇAMENTO (centralizado, negrito, caixa alta)
[espaço]
Número do processo (se houver)
[espaço]
QUALIFICAÇÃO DAS PARTES + tipo de ação
[espaço]
TÍTULO DA PEÇA (centralizado, negrito, caixa alta, fonte maior)
[espaço]

I – [SEÇÃO PRINCIPAL - ex: DOS FATOS / DAS PRELIMINARES]
  1. [Subtema]
  2. [Subtema]

II – [SEÇÃO PRINCIPAL - ex: DO DIREITO / DO MÉRITO]
  1. [Subtema]
  2. [Subtema]

III – DOS PEDIDOS

IV – DAS PROVAS (quando aplicável)

V – DO VALOR DA CAUSA (quando aplicável)

Termos em que,
Pede deferimento.

Porto Alegre, [data por extenso].

[Assinatura do(s) advogado(s)]
```

---

## Tipos de Peça — Referência Rápida

Leia `references/document-types.md` para templates detalhados de cada tipo de peça. Tipos cobertos:

- **Petição Inicial** (cível, trabalhista, consumerista, revisional)
- **Contestação** (cível e trabalhista)
- **Agravo de Instrumento**
- **Embargos de Declaração**
- **Exceção de Pré-Executividade**
- **Ação de Superendividamento** (Lei 14.181/2021)
- **Ação Revisional** (financiamento, consignado, etc.)
- **Notificação Extrajudicial**
- **Contrato** (prestação de serviços, honorários, etc.)
- **Parecer Jurídico**
- **Defesa Administrativa**
- **Petições Intercorrentes** (manifestação, juntada, impugnação, etc.)

---

## Workflow de Geração do Documento

### Passo 1 — Entender o caso
Antes de redigir, coletar do usuário:
- Tipo de peça
- Dados das partes (autor/réu, reclamante/reclamado, etc.)
- Fatos relevantes
- Teses jurídicas pretendidas
- Documentos de referência (se houver uploads)
- Tribunal/vara de destino
- Advogado(s) que assinarão

### Passo 2 — Ler os skills necessários
```bash
# SEMPRE ler o skill docx antes de gerar o arquivo
cat /mnt/skills/public/docx/SKILL.md

# Ler as especificações de formatação deste skill
cat [caminho-deste-skill]/references/formatting-spec.md
```

### Passo 3 — Gerar o documento .docx
Usar `docx-js` (npm package `docx`) seguindo rigorosamente:
- As regras técnicas do skill `docx`
- As especificações de formatação deste skill (formatting-spec.md)
- O template do tipo de peça aplicável (document-types.md)

### Passo 4 — Validar
```bash
python /mnt/skills/public/docx/scripts/office/validate.py documento.docx
```

### Passo 5 — Entregar
Copiar para `/mnt/user-data/outputs/` e apresentar ao usuário.

---

## Regras Críticas

1. **NUNCA inventar jurisprudência.** Se não tem certeza, não cite. Melhor citar apenas a lei do que inventar um julgado.

2. **NUNCA usar bullet points no corpo da peça.** Exceto em pedidos finais e rol de documentos.

3. **SEMPRE usar Book Antiqua.** Não substituir por Times New Roman, Arial ou qualquer outra fonte.

4. **SEMPRE usar espaçamento 1.15.** Não usar espaçamento simples ou 1.5.

5. **SEMPRE incluir cabeçalho e rodapé institucional** conforme especificação.

6. **SEMPRE formatar nomes das partes em NEGRITO** na qualificação e primeira menção.

7. **SEMPRE usar alinhamento justificado** no corpo do texto.

8. **SEMPRE gerar em formato .docx** — nunca entregar como markdown, HTML ou texto puro quando a peça é para protocolo.

9. **Recuo de primeira linha** de 1.25cm em parágrafos narrativos do corpo da peça. NÃO aplicar recuo em títulos de seção, endereçamento, ou assinaturas.

10. **Data em formato gaúcho:** "Porto Alegre, 14 de abril de 2026." — por extenso, com ponto final.

---

## Numeração e Layout de Contratos (padrão CNTR)

> **ESCOPO CRÍTICO:** este padrão vale **somente para CONTRATOS**. Petições,
> contestações, agravos e demais **peças forenses** mantêm o cabeçalho
> institucional **RODRIGUES & SORDI** (identificação do advogado é exigência
> forense). **NÃO** aplicar o layout sem-cabeçalho a peças judiciais.

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

O layout específico de contrato (página 1 sem cabeçalho; pág. 2+ com
`Título | CNTRNNNNNN`; rodapé com número à esquerda e `Página X de Y` à direita,
sem dados institucionais) está em `references/formatting-spec.md`, seção
**"Contratos — Layout CNTR"**.

### Checklist de validação (todo CONTRATO)

- [ ] Perguntei o número do contrato e em qual lista registrar.
- [ ] Página 1 sem cabeçalho.
- [ ] Página 2+ com `Título | CNTRNNNNNN` no topo, sem nome do escritório.
- [ ] Sub-item CNTR à direita, itálico, abaixo do título.
- [ ] Rodapé em todas as páginas: CNTR à esquerda, `Página X de Y` à direita, sem dados do escritório.
- [ ] Peças forenses (petição/contestação/etc.) NÃO usaram este layout — mantiveram o cabeçalho institucional.
- [ ] Número registrado na lista do projeto indicada.
