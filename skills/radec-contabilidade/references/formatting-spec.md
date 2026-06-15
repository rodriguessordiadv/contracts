# Módulo 4 — Formatação de Documentos RadéC (.docx)

## Pré-requisito

**SEMPRE ler também o skill `/mnt/skills/public/docx/SKILL.md`** antes de gerar qualquer arquivo. Este módulo complementa com os padrões específicos da RadéC.

---

## Especificações Técnicas

| Elemento | Valor | docx-js |
|----------|-------|---------|
| Papel | A4 | width: 11906, height: 16838 |
| Margem superior | 3cm | top: 1701 |
| Margem inferior | 2cm | bottom: 1134 |
| Margem esquerda | 3cm | left: 1701 |
| Margem direita | 2cm | right: 1134 |
| Fonte principal | Garamond ou Calibri | "Garamond" / "Calibri" |
| Tamanho fonte corpo | 11pt | size: 22 |
| Espaçamento linhas | 1.15 | line: 276 |
| Alinhamento corpo | Justificado | AlignmentType.JUSTIFIED |
| Recuo primeira linha | 1.25cm | firstLine: 709 |

---

## Cores RadéC (em Hex para docx)

```javascript
const CORES = {
  verde_petroleo: "2C5F5F",    // cor principal da marca
  azul_executivo: "1F4E79",    // títulos e destaques
  cinza_texto:    "666666",    // subtextos e cabeçalho
  cinza_rodape:   "808080",    // rodapé
  vermelho_alerta:"EE0000",    // confidencial / urgência
  branco:         "FFFFFF",
  preto:          "000000",
};
```

---

## Logo nos Documentos

**Logo para fundo branco:** `RadeC_Verde_Branco_2048px.png`
- Localização: `/mnt/user-data/uploads/RadeC_Verde_Branco_2048px.png`
- Tamanho no cabeçalho: ~2cm x 2cm (715200 EMUs x 715200 EMUs)

**Logo para fundo escuro / apresentações premium:** `RadeC_HiTech_Dark_2048px.png`

---

## Estrutura do Cabeçalho

O cabeçalho é uma tabela de 3 colunas com linha azul embaixo:

```javascript
// Cabeçalho: tabela 3 colunas
// Col 1 (1701 DXA): logo RadéC
// Col 2 (4395 DXA): subtítulo do escritório
// Col 3 (3402 DXA): título específico do documento
// Linha azul abaixo: border bottom, single, 12pt, color "1F4E79"

// Col 2 — texto:
// "Consultoria Contábil, de Negócios" bold italic gray 9pt
// "e Tributária Preventivo" italic gray 9pt

// Col 3 — texto:
// "[TÍTULO DO DOCUMENTO]" bold blue 9pt ("1F4E79")
// "[subtítulo se houver]" gray 8pt
```

### Código de referência para o cabeçalho:

```javascript
const { ImageRun, Table, TableRow, TableCell, Paragraph, TextRun,
        WidthType, VerticalAlign, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');

// Carregar logo
const logoBuffer = fs.readFileSync('/mnt/user-data/uploads/RadeC_Verde_Branco_2048px.png');

const cabecalhoTabela = new Table({
  width: { size: 9498, type: WidthType.DXA },
  columnWidths: [1701, 4395, 3402],
  borders: {
    top: { style: BorderStyle.NONE },
    bottom: { style: BorderStyle.NONE },
    left: { style: BorderStyle.NONE },
    right: { style: BorderStyle.NONE },
    insideH: { style: BorderStyle.NONE },
    insideV: { style: BorderStyle.NONE },
  },
  rows: [
    new TableRow({
      height: { value: 653, rule: "exact" },
      children: [
        // Coluna 1: Logo
        new TableCell({
          width: { size: 1701, type: WidthType.DXA },
          verticalAlign: VerticalAlign.CENTER,
          borders: { top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.NONE},
                     left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE} },
          children: [new Paragraph({
            children: [new ImageRun({
              data: logoBuffer,
              transformation: { width: 60, height: 60 },
              type: 'png',
            })]
          })]
        }),
        // Coluna 2: Subtítulo do escritório
        new TableCell({
          width: { size: 4395, type: WidthType.DXA },
          verticalAlign: VerticalAlign.CENTER,
          borders: { top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.NONE},
                     left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE} },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Consultoria Contábil, de Negócios ", bold: true, italics: true, color: "666666", size: 18 }),
                new TextRun({ text: "e Tributária ", italics: true, color: "666666", size: 18 }),
                new TextRun({ text: "Preventivo", bold: true, italics: true, color: "666666", size: 18 }),
              ]
            })
          ]
        }),
        // Coluna 3: Título do documento específico
        new TableCell({
          width: { size: 3402, type: WidthType.DXA },
          verticalAlign: VerticalAlign.CENTER,
          borders: { top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.NONE},
                     left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE} },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "[TÍTULO DO DOCUMENTO]", bold: true, color: "1F4E79", size: 18 }),
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "[subtítulo]", color: "666666", size: 16 }),
              ]
            })
          ]
        }),
      ]
    })
  ]
});

// Linha azul separadora (parágrafo com border bottom)
const linhaSeparadora = new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: "1F4E79", space: 0 } },
  spacing: { after: 200 },
  children: []
});
```

---

## Estrutura do Rodapé

```javascript
// Linha 1: RadéC Contabilidade | Radé Contabilidade Ltda - email - telefone
// Fonte: Garamond bold/regular, 9pt, cinza #808080
// Linha 2: endereço completo
// Linha 3: top border cinza + "| Documento Confidencial | Página X de Y"

// Usar tab stops para alinhar número de página ao centro:
// PAGE field + NUMPAGES field
```

---

## Tipos de Documentos e Estruturas

### PROPOSTA COMERCIAL

```
[Cabeçalho RadéC — título: "Proposta de Serviços Contábeis"]
[Linha azul]

PROPOSTA DE REGULARIZAÇÃO FISCAL
[Nome da Empresa] — CNPJ [XX.XXX.XXX/XXXX-XX]

─────────────────────────────────

1. QUEM SOMOS
[Parágrafo curto — 3-4 linhas]

2. DIAGNÓSTICO IDENTIFICADO
[Parágrafo descritivo — o que foi encontrado]

3. SERVIÇOS PROPOSTOS
[Tabela de escopo]

4. SERVIÇOS NÃO INCLUÍDOS
[Parágrafo curto]

5. INVESTIMENTO
[Tabela de valores]

6. CONDIÇÕES GERAIS
[Prazo / pagamento / validade]

7. PRÓXIMO PASSO
[1 ação clara]

Porto Alegre, [data].

Sávio Radé Sordi
Contador — CRC/RS 102812/O-6
RadéC Contabilidade | (51) 99518-3878

[Rodapé institucional]
```

### RELATÓRIO / MAPEAMENTO TEMÁTICO

```
[Cabeçalho RadéC — título: "Relatório de Situação Fiscal"]
[Linha azul]

RELATÓRIO DE SITUAÇÃO FISCAL
[Nome da Empresa] — Referência: [período]
Data: [DD/MM/AAAA]

─────────────────────────────────

1. RESUMO EXECUTIVO
[3-5 linhas — o essencial para quem não vai ler o resto]

2. SITUAÇÃO CADASTRAL
[Tabela ou parágrafo]

3. OBRIGAÇÕES TRIBUTÁRIAS
[Tabela por obrigação]

4. DÉBITOS E PARCELAMENTOS
[Tabela]

5. RISCOS E IMPACTOS
[Parágrafo — linguagem acessível]

6. PLANO DE AÇÃO RECOMENDADO
[Tabela de etapas]

7. OBSERVAÇÕES FINAIS
[Parágrafo]

Elaborado por:
Sávio Radé Sordi — CRC/RS 102812/O-6
RadéC Contabilidade e Assessoria Empresarial
Porto Alegre, [data].
```

### PARECER TÉCNICO-TRIBUTÁRIO

```
[Cabeçalho RadéC — título: "Parecer Técnico-Tributário"]
[Linha azul]

PARECER TÉCNICO-TRIBUTÁRIO
Referente: [assunto]
Interessado: [nome/empresa]
Data: [DD/MM/AAAA]

─────────────────────────────────

I — DA CONSULTA
[Contextualização do caso]

II — DOS FUNDAMENTOS TÉCNICOS
[Argumentação em parágrafos — sem bullet points]
[Citar legislação: CTN, RIR, IN RFB, Lei Complementar, Resolução CGSN, etc.]

III — DA CONCLUSÃO
[Posição técnica fundamentada]

IV — DAS RECOMENDAÇÕES
[Próximos passos práticos]

Este parecer foi elaborado com base nas informações fornecidas...

Sávio Radé Sordi
Contador — CRC/RS 102812/O-6
Advogado — OAB/RS 93.284
Porto Alegre, [data].
```

---

## Elementos Visuais Moderados (Infográficos)

A identidade visual RadéC admite elementos gráficos moderados em documentos. Use com parcimônia:

**Status visual de risco** (em tabelas ou diagnósticos):
```
🟢 REGULARIZADO / OK
🟡 PENDENTE / ATENÇÃO  
🔴 IRREGULAR / URGENTE
🔴🔴 CRÍTICO / IMINENTE
```

**Caixas de destaque** (shading em tabelas):
- Fundo verde claro para situações positivas: `#E8F5F5` (derivado do verde petróleo)
- Fundo amarelo claro para alertas: `#FFF8E1`
- Fundo vermelho claro para irregularidades: `#FFEBEE`
- Cabeçalhos de tabela: `#1F4E79` (azul executivo) com texto branco

**Linha divisória entre seções:**
```javascript
new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2C5F5F", space: 3 } },
  children: []
})
```

**Regra de ouro:** máximo 1-2 elementos visuais por página. O documento deve parecer profissional, não publicitário.

---

## Workflow de Geração do Documento

```bash
# 1. Instalar dependências (se necessário)
npm install -g docx

# 2. Criar o script .js com o documento
# (ver código acima + skill docx para detalhes técnicos)

# 3. Executar
node gerar_documento.js

# 4. Validar
python /mnt/skills/public/docx/scripts/office/validate.py documento.docx

# 5. Se ok, copiar para outputs
cp documento.docx /mnt/user-data/outputs/
```

---

## Contratos — Layout CNTR

Para **CONTRATOS** RadéC, usar este layout enxuto (não o cabeçalho institucional de
3 colunas acima). Mantém a identidade RadéC só no título e no fio:

- **Página 1 sem cabeçalho.** A partir da página 2: `Título | CNTRNNNNNN`, fio na cor RadéC.
- **Sub-item CNTR** abaixo do título, à direita, itálico e menor.
- **Rodapé** em todas as páginas: número à esquerda, `Página X de Y` à direita — **sem** dados institucionais.
- Numeração e pergunta obrigatória: ver `SKILL.md`, seção "Numeração e Layout de Contratos (padrão CNTR)".

```javascript
const {
  Header, Footer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, VerticalAlign, PageNumber,
} = require('docx');

const NUM_CONTRATO    = "CNTR000262";                         // perguntar ao usuário (ver SKILL.md)
const TITULO_CONTRATO = "Proposta de Honorários Contábeis";   // ajustar por documento

// Identidade RadéC
const COR_TITULO = "2C5F5F"; // verde petróleo
const COR_FIO    = "2C5F5F"; // fio do cabeçalho (alternativa: azul "1F4E79")
```

### 1. Número no corpo (sub-item abaixo do título)

```javascript
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 40 },
  children: [ new TextRun({ text: "PROPOSTA DE [...]", font: "Book Antiqua", size: 26, bold: true, color: COR_TITULO }) ],
}),
new Paragraph({
  alignment: AlignmentType.RIGHT,
  spacing: { after: 240 },
  children: [ new TextRun({ text: NUM_CONTRATO, font: "Book Antiqua", size: 18, italics: true, color: "404040" }) ],
}),
```

### 2. Cabeçalho de contrato (`criarCabecalhoContrato`)

```javascript
// Página 1: cabeçalho vazio
const headerFirst = new Header({ children: [ new Paragraph({ children: [] }) ] });

// Página 2+: título | número (fio na cor RadéC)
const headerDefault = new Header({
  children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: COR_FIO, space: 4 } },
      children: [
        new TextRun({ text: TITULO_CONTRATO, font: "Book Antiqua", size: 18, color: COR_TITULO }),
        new TextRun({ text: "  |  ", font: "Book Antiqua", size: 18, color: "808080" }),
        new TextRun({ text: NUM_CONTRATO, font: "Book Antiqua", size: 18, color: "404040", italics: true }),
      ],
    }),
  ],
});
```

### 3. Rodapé de contrato (`criarRodapeContrato`)

```javascript
const CONTENT_W = 9026; // A4 margens ABNT
const noBorder  = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function rodapeContrato() {
  return new Footer({ children: [
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [4513, 4513],
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
                 insideHorizontal: noBorder, insideVertical: noBorder },
      rows: [ new TableRow({ children: [
        new TableCell({
          borders: noBorders, width: { size: 4513, type: WidthType.DXA },
          margins: { top: 40, bottom: 40, left: 0, right: 0 }, verticalAlign: VerticalAlign.CENTER,
          children: [ new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 0 },
            children: [ new TextRun({ text: NUM_CONTRATO, font: "Book Antiqua", size: 16, color: "808080", italics: true }) ] }) ],
        }),
        new TableCell({
          borders: noBorders, width: { size: 4513, type: WidthType.DXA },
          margins: { top: 40, bottom: 40, left: 0, right: 0 }, verticalAlign: VerticalAlign.CENTER,
          children: [ new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 },
            children: [
              new TextRun({ text: "Página ", font: "Book Antiqua", size: 16, color: "808080" }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Book Antiqua", size: 16, color: "808080" }),
              new TextRun({ text: " de ", font: "Book Antiqua", size: 16, color: "808080" }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Book Antiqua", size: 16, color: "808080" }),
            ] }) ],
        }),
      ]})],
    }),
  ]});
}
```

### 4. Seção do Document (contratos)

```javascript
sections: [{
  properties: {
    titlePage: true,                         // habilita cabeçalho/rodapé "first" distintos
    page: {
      size: { width: 11906, height: 16838 }, // A4
      margin: { top: 1701, right: 1134, bottom: 1134, left: 1701 }, // ABNT
    },
  },
  headers: { default: headerDefault, first: headerFirst },
  footers: { default: rodapeContrato(), first: rodapeContrato() },
  children,
}]
```
