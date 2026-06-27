/**
 * Tabela de Honorários Advocatícios da OAB/RS (caráter INDICATIVO, base 2012).
 *
 * É a referência citada no contrato padrão (Cláusula 2ª, §3º) para fixar o
 * "valor mínimo de honorários" de cada ação. Os valores são de 2012 e devem ser
 * corrigidos para a data atual — use `corrigirValor()` com um fator de reajuste.
 *
 * Subconjunto focado nas áreas do escritório (empresarial, trabalhista, cível,
 * consultivo) + itens transversais. Pode ser ampliado conforme necessidade.
 * Fonte: tabela_honorarios_2012.pdf (OAB/RS).
 */

import { reais, type Centavos } from "../domain/money";

export interface ItemOab {
  /** Código do item na tabela (ex.: "4.1"). */
  codigo: string;
  /** Seção da tabela. */
  secao: string;
  /** Descrição do ato/demanda. */
  descricao: string;
  /** Valor mínimo de referência em centavos (null quando só há percentual). */
  valorMinimo: Centavos | null;
  /** Percentual sobre proveito/valor da causa, quando aplicável (0–1). */
  percentual: number | null;
}

export const VIGENCIA_TABELA = "2012 (indicativo)";

/** Itens da tabela (subconjunto operacional do escritório). */
export const TABELA_OAB_RS: ItemOab[] = [
  // 1. AVULSAS / EXTRAJUDICIAIS
  { codigo: "1.1", secao: "Avulsas/Extrajudiciais", descricao: "Consulta", valorMinimo: reais(200), percentual: null },
  { codigo: "1.1b", secao: "Avulsas/Extrajudiciais", descricao: "Consulta em condições excepcionais", valorMinimo: reais(500), percentual: null },
  { codigo: "1.2", secao: "Avulsas/Extrajudiciais", descricao: "Hora intelectual", valorMinimo: reais(500), percentual: null },
  { codigo: "1.6", secao: "Avulsas/Extrajudiciais", descricao: "Cobrança amigável (art. 395 CC)", valorMinimo: reais(700), percentual: 0.1 },
  { codigo: "1.8", secao: "Avulsas/Extrajudiciais", descricao: "Exame e visto em instrumento de constituição de pessoa jurídica", valorMinimo: reais(1200), percentual: null },
  { codigo: "1.10", secao: "Avulsas/Extrajudiciais", descricao: "Elaboração de notificação extrajudicial", valorMinimo: reais(500), percentual: null },
  { codigo: "1.11", secao: "Avulsas/Extrajudiciais", descricao: "Minutas de contrato, distrato, alteração, estatuto, testamento, escritura ou documento", valorMinimo: reais(2000), percentual: 0.03 },
  { codigo: "1.12", secao: "Avulsas/Extrajudiciais", descricao: "Parecer ou memorial", valorMinimo: reais(2000), percentual: null },
  { codigo: "1.14", secao: "Avulsas/Extrajudiciais", descricao: "Requerimento ou petições", valorMinimo: reais(700), percentual: null },

  // 2. MATÉRIA ADMINISTRATIVA
  { codigo: "2.1", secao: "Administrativa", descricao: "Sindicância e processo administrativo — acompanhamento/defesa", valorMinimo: reais(1800), percentual: 0.1 },
  { codigo: "2.5", secao: "Administrativa", descricao: "Ação ou defesa — fase judicial", valorMinimo: reais(10000), percentual: 0.2 },

  // 4. MATÉRIA CÍVEL
  { codigo: "4.1", secao: "Cível", descricao: "Procedimento ordinário: proposição ou defesa", valorMinimo: reais(3600), percentual: 0.2 },
  { codigo: "4.2", secao: "Cível", descricao: "Procedimento sumário: proposição ou defesa", valorMinimo: reais(2500), percentual: 0.2 },
  { codigo: "4.3", secao: "Cível", descricao: "Cumprimento de sentença", valorMinimo: reais(2000), percentual: 0.2 },
  { codigo: "4.4", secao: "Cível", descricao: "Impugnação ao cumprimento de sentença", valorMinimo: reais(2000), percentual: 0.2 },
  { codigo: "4.5", secao: "Cível", descricao: "Execução de título extrajudicial", valorMinimo: reais(2000), percentual: 0.2 },
  { codigo: "4.6", secao: "Cível", descricao: "Impugnação/Embargos à execução de título extrajudicial", valorMinimo: reais(2000), percentual: 0.2 },
  { codigo: "4.31", secao: "Cível", descricao: "Mandado de Segurança", valorMinimo: reais(4000), percentual: 0.2 },
  { codigo: "4.32", secao: "Cível", descricao: "Ação de despejo", valorMinimo: reais(3000), percentual: 0.2 },
  { codigo: "4.37", secao: "Cível", descricao: "Ação de dissolução de sociedade", valorMinimo: reais(4000), percentual: 0.2 },
  { codigo: "6.22", secao: "Cível", descricao: "Desconsideração da personalidade jurídica (IDPJ)", valorMinimo: reais(6000), percentual: 0.2 },

  // 6. FAMÍLIA E SUCESSÕES (principais)
  { codigo: "6.23a", secao: "Família/Sucessões", descricao: "Inventário/Arrolamento judicial sem litígio (8% sobre o monte-mor)", valorMinimo: reais(3500), percentual: 0.08 },
  { codigo: "6.23b", secao: "Família/Sucessões", descricao: "Inventário/Arrolamento judicial com litígio (10% sobre o monte-mor)", valorMinimo: reais(3500), percentual: 0.1 },
  { codigo: "6.25", secao: "Família/Sucessões", descricao: "Inventário/Arrolamento extrajudicial (6% sobre o monte-mor)", valorMinimo: reais(2500), percentual: 0.06 },

  // 7. PREVIDENCIÁRIO
  { codigo: "7.8", secao: "Previdenciário", descricao: "Ação de concessão de benefício previdenciário", valorMinimo: reais(3000), percentual: 0.2 },

  // 8. TRABALHISTA
  { codigo: "8.0a", secao: "Trabalhista", descricao: "Patrocínio de reclamante (sobre a condenação ou acordo)", valorMinimo: reais(1000), percentual: 0.2 },
  { codigo: "8.1", secao: "Trabalhista", descricao: "Acréscimo no caso de recurso ordinário (reclamante)", valorMinimo: reais(700), percentual: 0.05 },
  { codigo: "8.2", secao: "Trabalhista", descricao: "Acréscimo no caso de recurso de revista (reclamante)", valorMinimo: reais(700), percentual: 0.05 },
  { codigo: "8.0b", secao: "Trabalhista", descricao: "Patrocínio do reclamado (sobre o valor real do pedido)", valorMinimo: reais(2500), percentual: 0.2 },
  { codigo: "8.3", secao: "Trabalhista", descricao: "Acréscimo no caso de recurso ordinário (reclamado)", valorMinimo: reais(1800), percentual: 0.05 },
  { codigo: "8.4", secao: "Trabalhista", descricao: "Acréscimo no caso de recurso de revista (reclamado)", valorMinimo: reais(2500), percentual: 0.1 },
  { codigo: "8.5", secao: "Trabalhista", descricao: "Execução de sentença/embargos como mandatário específico", valorMinimo: reais(2500), percentual: 0.2 },

  // 9. FISCAL / TRIBUTÁRIO
  { codigo: "9.1", secao: "Fiscal/Tributário", descricao: "Procedimento ou defesa administrativa — 1ª instância", valorMinimo: reais(2500), percentual: 0.1 },
  { codigo: "9.3", secao: "Fiscal/Tributário", descricao: "Parecer tributário / planejamento", valorMinimo: reais(5000), percentual: 0.1 },
  { codigo: "9.4", secao: "Fiscal/Tributário", descricao: "Ação anulatória de débito tributário", valorMinimo: reais(6000), percentual: 0.15 },
  { codigo: "9.5", secao: "Fiscal/Tributário", descricao: "Defesa em execução de natureza fiscal", valorMinimo: reais(6000), percentual: 0.15 },
  { codigo: "9.9-mpe", secao: "Fiscal/Tributário", descricao: "Consultoria sem vínculo — Micro e Pequena Empresa", valorMinimo: reais(1200), percentual: null },
  { codigo: "9.9-ltda", secao: "Fiscal/Tributário", descricao: "Consultoria sem vínculo — Ltda", valorMinimo: reais(3500), percentual: null },
  { codigo: "9.9-sa", secao: "Fiscal/Tributário", descricao: "Consultoria sem vínculo — S/A", valorMinimo: reais(6000), percentual: null },
  { codigo: "9.9-outras", secao: "Fiscal/Tributário", descricao: "Consultoria sem vínculo — demais entidades (cooperativas, sociedades civis)", valorMinimo: reais(2500), percentual: null },

  // 10. CONSUMIDOR
  { codigo: "10.7", secao: "Consumidor", descricao: "Defesa em ação judicial movida pelo consumidor", valorMinimo: reais(6000), percentual: 0.2 },

  // 17. TRIBUNAIS E CONSELHOS
  { codigo: "17.1b", secao: "Tribunais", descricao: "Recurso de Apelação ou contrarrazões", valorMinimo: reais(4700), percentual: null },
  { codigo: "17.2a", secao: "Tribunais", descricao: "Recurso Especial e Extraordinário (interposição/resposta)", valorMinimo: reais(9500), percentual: null },
];

const indice = new Map(TABELA_OAB_RS.map((i) => [i.codigo, i]));

/** Busca um item pela código (ex.: "4.1"). */
export function itemOab(codigo: string): ItemOab | null {
  return indice.get(codigo) ?? null;
}

/**
 * Corrige um valor de 2012 para a data atual aplicando um fator acumulado.
 * Ex.: corrigirValor(reais(3600), 2.1) ≈ R$ 7.560,00. O fator deve ser fornecido
 * pelo usuário (IPCA/IGP-M acumulado desde 2012) — não embutimos índice fixo.
 */
export function corrigirValor(valor: Centavos, fatorAcumulado: number): Centavos {
  return Math.round(valor * fatorAcumulado);
}
