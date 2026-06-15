# Especificação Técnica de Formatação — Rodrigues & Sordi

Este documento contém as especificações técnicas completas para gerar documentos `.docx` usando `docx-js` no padrão do escritório.

---

## Setup Inicial do Documento

```javascript
const { Document, Packer, Paragraph, TextRun, Header, Footer,
        AlignmentType, HeadingLevel, PageBreak, LevelFormat,
        TabStopType, TabStopPosition, BorderStyle, WidthType,
        Table, TableRow, TableCell, ShadingType, VerticalAlign,
        ImageRun, PageNumber, ExternalHyperlink, FootnoteReferenceRun
} = require('docx');
const fs = require('fs');
```

---

## Configuração do Document

```javascript
const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Book Antiqua",
          size: 24  // 12pt
        },
        paragraph: {
          spacing: {
            line: 276,  // 1.15 spacing
            after: 0,
            before: 0
          }
        }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          size: 28,      // 14pt
          bold: true,
          font: "Book Antiqua",
          allCaps: true
        },
        paragraph: {
          spacing: { before: 360, after: 240, line: 276 },
          alignment: AlignmentType.LEFT,
          outlineLevel: 0
        }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          size: 26,      // 13pt
          bold: true,
          font: "Book Antiqua"
        },
        paragraph: {
          spacing: { before: 240, after: 180, line: 276 },
          outlineLevel: 1
        }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          size: 24,      // 12pt
          bold: true,
          font: "Book Antiqua"
        },
        paragraph: {
          spacing: { before: 180, after: 120, line: 276 },
          outlineLevel: 2
        }
      }
    ]
  },
  sections: [/* ... */]
});
```

---

## Propriedades da Seção (Página A4 - Margens ABNT)

```javascript
sections: [{
  properties: {
    page: {
      size: {
        width: 11906,   // A4 largura
        height: 16838   // A4 altura
      },
      margin: {
        top: 1701,      // 3cm
        right: 1134,    // 2cm
        bottom: 1134,   // 2cm
        left: 1701      // 3cm
      }
    }
  },
  headers: {
    default: criarCabecalho()
  },
  footers: {
    default: criarRodape()
  },
  children: [/* conteúdo da peça */]
}]
```

**Largura útil do conteúdo:** 11906 - 1701 - 1134 = **9071 DXA**

---

## Cabeçalho Institucional

```javascript
function criarCabecalho() {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "RODRIGUES & SORDI",
            font: "Book Antiqua",
            size: 28,    // 14pt
            bold: true,
            color: "1A1A1A"
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "ADVOGADOS",
            font: "Book Antiqua",
            size: 20,    // 10pt
            color: "4A4A4A",
            characterSpacing: 120  // espaçamento entre letras
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 0 },
        border: {
          bottom: {
            style: BorderStyle.SINGLE,
            size: 6,
            color: "2C2C2C",
            space: 1
          }
        },
        children: [new TextRun({ text: "", size: 2 })]
      })
    ]
  });
}
```

---

## Rodapé Institucional

```javascript
function criarRodape() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 0 },
        border: {
          top: {
            style: BorderStyle.SINGLE,
            size: 4,
            color: "999999",
            space: 4
          }
        },
        children: [new TextRun({ text: "", size: 2 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "Rodrigues & Sordi",
            font: "Book Antiqua",
            size: 18,     // 9pt
            bold: true,
            color: "666666"
          }),
          new TextRun({
            text: " | Advogados",
            font: "Book Antiqua",
            size: 18,
            color: "666666"
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "advogados@rs-adv.com \u2014 (51) 3211.5252",
            font: "Book Antiqua",
            size: 16,     // 8pt
            color: "888888"
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "R. Gen. Andrade Neves, n\u00BA 100, conj. 901 \u2014 Centro Hist\u00F3rico \u2014 CEP 90010-210 \u2014 Porto Alegre \u2014 RS",
            font: "Book Antiqua",
            size: 14,     // 7pt
            color: "999999"
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 0 },
        children: [
          new TextRun({
            text: "- ",
            font: "Book Antiqua",
            size: 16,
            color: "999999"
          }),
          new TextRun({
            children: [PageNumber.CURRENT],
            font: "Book Antiqua",
            size: 16,
            color: "999999"
          }),
          new TextRun({
            text: " -",
            font: "Book Antiqua",
            size: 16,
            color: "999999"
          })
        ]
      })
    ]
  });
}
```

---

## Helpers de Parágrafos

```javascript
// Parágrafo normal com recuo de primeira linha (corpo da peça)
function pNormal(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 120, after: 120, line: 276 },
    indent: opts.noIndent ? undefined : { firstLine: 709 },  // 1.25cm
    children: Array.isArray(text) ? text : [
      new TextRun({ text, font: "Book Antiqua", size: 24 })
    ]
  });
}

// Parágrafo com runs mistas (negrito + normal)
function pMixed(runs, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: {
      before: opts.before !== undefined ? opts.before : 120,
      after: opts.after !== undefined ? opts.after : 120,
      line: 276
    },
    indent: opts.noIndent ? undefined : { firstLine: 709 },
    children: runs.map(r => new TextRun({
      font: "Book Antiqua",
      size: 24,
      ...r
    }))
  });
}

// Parágrafo centralizado (endereçamento, títulos)
function pCenter(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      before: opts.before || 0,
      after: opts.after || 0,
      line: 276
    },
    children: [new TextRun({
      text,
      font: "Book Antiqua",
      size: opts.size || 24,
      bold: opts.bold || false,
      allCaps: opts.allCaps || false
    })]
  });
}

// Linha em branco
function pEmpty() {
  return new Paragraph({
    spacing: { before: 0, after: 0, line: 276 },
    children: [new TextRun({ text: "", font: "Book Antiqua", size: 24 })]
  });
}

// Título de seção (I – DOS FATOS, II – DO DIREITO, etc.)
function pSecao(texto) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 360, after: 240, line: 276 },
    children: [new TextRun({
      text: texto,
      font: "Book Antiqua",
      size: 28,
      bold: true,
      allCaps: true
    })]
  });
}

// Subtítulo (1. DA PRESCRIÇÃO, 2. DO MÉRITO, etc.)
function pSubsecao(texto) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 240, after: 120, line: 276 },
    children: [new TextRun({
      text: texto,
      font: "Book Antiqua",
      size: 24,
      bold: true
    })]
  });
}
```

---

## Bloco de Assinatura

```javascript
function blocoAssinatura(advogados) {
  // advogados = [{nome, oab}] — ex: [{nome: "Sávio Radé Sordi", oab: "OAB/RS 93.284"}]
  const children = [
    pEmpty(),
    pEmpty(),
    pCenter("Termos em que,"),
    pCenter("Pede deferimento."),
    pEmpty(),
    pCenter(`Porto Alegre, ${dataExtenso()}.`),
    pEmpty(),
    pEmpty()
  ];

  for (const adv of advogados) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0, line: 276 },
        children: [new TextRun({
          text: adv.nome,
          font: "Book Antiqua",
          size: 24,
          bold: true
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 240, line: 276 },
        children: [new TextRun({
          text: adv.oab,
          font: "Book Antiqua",
          size: 22
        })]
      })
    );
  }
  return children;
}

function dataExtenso() {
  const meses = ['janeiro','fevereiro','março','abril','maio','junho',
                 'julho','agosto','setembro','outubro','novembro','dezembro'];
  const d = new Date();
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}
```

---

## Endereçamento Padrão por Tipo de Juízo

### Justiça do Trabalho — TRT4
```
EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DA ___ª VARA DO TRABALHO DE PORTO ALEGRE/RS
```

### Justiça Estadual — TJRS (1º Grau)
```
EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA ___ª VARA CÍVEL DA COMARCA DE [CIDADE]/RS
```
Variações: Vara da Fazenda Pública, Vara de Família, Vara de Execuções Fiscais, Juizado Especial Cível.

### TJRS (2º Grau — Câmara Cível)
```
EXCELENTÍSSIMOS SENHORES DESEMBARGADORES DA COLENDA ___ª CÂMARA CÍVEL DO EGRÉGIO TRIBUNAL DE JUSTIÇA DO ESTADO DO RIO GRANDE DO SUL
```

### Justiça Federal — TRF4 (1º Grau)
```
EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) FEDERAL DA ___ª VARA FEDERAL DE PORTO ALEGRE/RS
```

---

## Pedidos Finais — Formato

Os pedidos usam alíneas em estilo "a)", "b)", "c)" com recuo, SEM bullet points:

```javascript
function pPedido(letra, texto) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 60, line: 276 },
    indent: { left: 709, hanging: 354 },
    children: [
      new TextRun({ text: `${letra}) `, font: "Book Antiqua", size: 24, bold: true }),
      new TextRun({ text: texto, font: "Book Antiqua", size: 24 })
    ]
  });
}
```

---

## Tabela de Conversão DXA

| Medida | DXA |
|--------|-----|
| 1 cm | 567 |
| 1.25 cm | 709 |
| 2 cm | 1134 |
| 3 cm | 1701 |
| 1 polegada | 1440 |

---

## Checklist Antes de Gerar

- [ ] Fonte Book Antiqua, 12pt (size: 24)
- [ ] Espaçamento 1.15 (line: 276)
- [ ] Margens ABNT (3cm sup/esq, 2cm inf/dir)
- [ ] Papel A4 (11906 x 16838)
- [ ] Cabeçalho "RODRIGUES & SORDI / ADVOGADOS" com linha separadora
- [ ] Rodapé com dados do escritório, endereço e numeração de página
- [ ] Alinhamento justificado no corpo
- [ ] Recuo de primeira linha 1.25cm nos parágrafos narrativos
- [ ] Títulos de seção sem recuo, em negrito
- [ ] Nomes das partes em negrito na primeira menção
- [ ] Sem bullet points no corpo da peça
- [ ] Data por extenso no fecho
- [ ] Assinatura do(s) advogado(s) com nome e OAB
- [ ] Validação com validate.py

---

## Contratos — Layout CNTR

> **ESCOPO:** esta seção vale **somente para CONTRATOS**. Peças forenses
> (petição, contestação, agravo etc.) usam o cabeçalho/rodapé institucional
> `criarCabecalho()` / `criarRodape()` acima — **não** este layout.

Diferenças do contrato em relação à peça forense:

- **Página 1 sem cabeçalho.** A partir da página 2: `Título do contrato | CNTRNNNNNN`, sem o nome "Rodrigues & Sordi".
- **Sub-item CNTR** logo abaixo do título do contrato, à direita, itálico e menor.
- **Rodapé** em todas as páginas: número do contrato à esquerda, `Página X de Y` à direita — **sem** nome do escritório, e-mail ou endereço.
- Numeração e pergunta obrigatória: ver `SKILL.md`, seção "Numeração e Layout de Contratos (padrão CNTR)".

### Parâmetros

```javascript
const NUM_CONTRATO    = "CNTR000262";                                       // perguntar ao usuário (ver SKILL.md)
const TITULO_CONTRATO = "Contrato de Prestação de Serviços Advocatícios";   // ajustar por contrato
```

### 1. Número no corpo (sub-item abaixo do título)

```javascript
// Logo após o parágrafo do título do contrato:
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 40 },
  children: [ new TextRun({ text: "CONTRATO DE [...]", font: "Book Antiqua", size: 26, bold: true }) ],
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

// Página 2+: título | número
const headerDefault = new Header({
  children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
      children: [
        new TextRun({ text: TITULO_CONTRATO, font: "Book Antiqua", size: 18, color: "404040" }),
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

> `Table`, `TableRow`, `TableCell`, `WidthType`, `VerticalAlign` e `PageNumber`
> já estão no `require('docx')` do topo deste arquivo.
