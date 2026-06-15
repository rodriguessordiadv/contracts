# formatting-spec — Padrão CNTR (cabeçalho/rodapé + numeração) — rs-advogados

Especificação de formatação dos **CONTRATOS** jurídicos. Gerado com a biblioteca
[`docx`](https://docx.js.org/). Layout: **página 1 sem cabeçalho**; a partir da
página 2 o topo traz `Título do contrato | CNTRNNNNNN`; o rodapé (todas as
páginas) traz o número à esquerda e `Página X de Y` à direita — **sem** nome do
escritório, e-mail ou endereço.

```javascript
const {
  Header, Footer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, VerticalAlign, PageNumber,
} = require("docx");
```

## Parâmetros do contrato

```javascript
const NUM_CONTRATO    = "CNTR000262";                                       // perguntar ao usuário (ver SKILL.md)
const TITULO_CONTRATO = "Contrato de Prestação de Serviços Advocatícios";   // ajustar por contrato
```

## 1. Número no corpo do contrato (sub-item)

Sub-item abaixo do título, à direita, itálico e menor.

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

## 2. Cabeçalho de CONTRATO (`criarCabecalhoContrato`)

Página 1 sem cabeçalho. A partir da página 2: `Título do contrato | CNTRNNNNNN`.
Sem o nome "Rodrigues & Sordi".

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

## 3. Rodapé de CONTRATO (`criarRodapeContrato`)

Tabela invisível em todas as páginas (incluindo a 1ª): número à esquerda,
`Página X de Y` à direita. Sem nome do escritório, e-mail ou endereço.

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

## 4. Ligar tudo na seção do Document (contratos)

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

## 5. Checklist de validação (todo contrato)

- [ ] Perguntei o número do contrato e em qual lista registrar.
- [ ] Página 1 sem cabeçalho.
- [ ] Página 2+ com `Título | CNTRNNNNNN` no topo, sem nome do escritório.
- [ ] Sub-item CNTR à direita, itálico, abaixo do título.
- [ ] Rodapé em todas as páginas: CNTR à esquerda, `Página X de Y` à direita, sem dados do escritório.
- [ ] Peças forenses (petição/contestação/etc.) NÃO usaram este layout — mantiveram o cabeçalho institucional.
- [ ] Número registrado na lista do projeto indicada.
