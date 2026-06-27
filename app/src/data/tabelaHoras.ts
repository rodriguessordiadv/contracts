/**
 * Tabela de Horas Técnicas — referência forense gaúcha (Rodrigues & Sordi).
 * Portada da skill `rs-cobrancas` (references/tabela-horas.md).
 *
 * Faixas [min, max] de horas por peça/atividade e complexidade. Use como
 * referência, ajustando ao caso concreto, e sempre justificando a estimativa.
 */

import type { Area, Complexidade } from "../domain/types";

export type Faixa = readonly [min: number, max: number];

export interface ItemTabelaHoras {
  area: Area;
  peca: string;
  baixa: Faixa;
  media: Faixa;
  alta: Faixa;
}

export const CRITERIOS_COMPLEXIDADE: Record<Complexidade, string> = {
  baixa: "Peça padrão, baixo volume documental, tese consolidada, sem prazo apertado.",
  media:
    "Argumentação técnica relevante, volume médio de documentos (10–50), prazo padrão.",
  alta:
    "Tese nova ou contraintuitiva, volume documental alto (50+), urgência, prova complexa, valor de causa elevado, ou múltiplas teses concorrentes.",
};

export const TABELA_HORAS: ItemTabelaHoras[] = [
  // ----------------------------- CÍVEL -----------------------------
  { area: "civel", peca: "Petição inicial cível", baixa: [4, 6], media: [6, 10], alta: [10, 18] },
  { area: "civel", peca: "Contestação cível", baixa: [4, 6], media: [6, 10], alta: [10, 15] },
  { area: "civel", peca: "Réplica", baixa: [1, 2], media: [2, 4], alta: [4, 6] },
  { area: "civel", peca: "Tréplica", baixa: [1, 1], media: [1, 2], alta: [2, 4] },
  { area: "civel", peca: "Manifestação simples (ciência, juntada, prazo)", baixa: [0.3, 0.5], media: [0.5, 1], alta: [1, 2] },
  { area: "civel", peca: "Manifestação técnica fundamentada", baixa: [1, 2], media: [2, 4], alta: [4, 7] },
  { area: "civel", peca: "Embargos de Declaração", baixa: [1, 2], media: [2, 3], alta: [3, 5] },
  { area: "civel", peca: "Embargos à Execução", baixa: [4, 6], media: [6, 10], alta: [10, 16] },
  { area: "civel", peca: "Exceção de Pré-Executividade", baixa: [3, 5], media: [5, 8], alta: [8, 14] },
  { area: "civel", peca: "Impugnação ao Cumprimento de Sentença", baixa: [2, 4], media: [4, 6], alta: [6, 10] },
  { area: "civel", peca: "IDPJ — Petição Inicial", baixa: [4, 6], media: [6, 9], alta: [9, 14] },
  { area: "civel", peca: "IDPJ — Defesa", baixa: [5, 8], media: [8, 12], alta: [12, 18] },
  { area: "civel", peca: "Apelação Cível", baixa: [6, 10], media: [10, 15], alta: [15, 25] },
  { area: "civel", peca: "Contrarrazões de Apelação", baixa: [3, 5], media: [5, 8], alta: [8, 14] },
  { area: "civel", peca: "Agravo de Instrumento", baixa: [3, 5], media: [5, 8], alta: [8, 12] },
  { area: "civel", peca: "Contrarrazões de Agravo", baixa: [2, 3], media: [3, 5], alta: [5, 8] },
  { area: "civel", peca: "Agravo Interno / Regimental", baixa: [2, 3], media: [3, 5], alta: [5, 8] },
  { area: "civel", peca: "Recurso Especial / Extraordinário", baixa: [10, 15], media: [15, 22], alta: [22, 35] },
  { area: "civel", peca: "Razões Finais / Memoriais", baixa: [4, 6], media: [6, 10], alta: [10, 15] },
  { area: "civel", peca: "Petição de Cumprimento de Sentença", baixa: [2, 3], media: [3, 5], alta: [5, 8] },
  { area: "civel", peca: "Audiência de Conciliação (preparação + ato)", baixa: [1, 2], media: [2, 3], alta: [3, 5] },
  { area: "civel", peca: "Audiência de Instrução (preparação + ato)", baixa: [3, 5], media: [5, 8], alta: [8, 14] },
  { area: "civel", peca: "Acompanhamento processual mensal", baixa: [0.5, 1], media: [1, 2], alta: [2, 4] },
  { area: "civel", peca: "Análise de processo novo / estudo do caso", baixa: [1, 3], media: [3, 6], alta: [6, 12] },
  { area: "civel", peca: "Cálculo judicial", baixa: [1, 2], media: [2, 5], alta: [5, 10] },

  // -------------------------- TRABALHISTA --------------------------
  { area: "trabalhista", peca: "Reclamatória Trabalhista", baixa: [4, 6], media: [6, 10], alta: [10, 16] },
  { area: "trabalhista", peca: "Contestação Trabalhista", baixa: [5, 8], media: [8, 12], alta: [12, 18] },
  { area: "trabalhista", peca: "Réplica", baixa: [2, 3], media: [3, 5], alta: [5, 8] },
  { area: "trabalhista", peca: "Recurso Ordinário", baixa: [6, 10], media: [10, 15], alta: [15, 22] },
  { area: "trabalhista", peca: "Contrarrazões de Recurso Ordinário", baixa: [3, 5], media: [5, 8], alta: [8, 14] },
  { area: "trabalhista", peca: "Recurso de Revista", baixa: [10, 15], media: [15, 22], alta: [22, 35] },
  { area: "trabalhista", peca: "Embargos à Execução Trabalhista", baixa: [5, 8], media: [8, 12], alta: [12, 18] },
  { area: "trabalhista", peca: "Audiência Inicial / UNA", baixa: [2, 3], media: [3, 5], alta: [5, 8] },
  { area: "trabalhista", peca: "Audiência de Instrução", baixa: [4, 6], media: [6, 10], alta: [10, 15] },
  { area: "trabalhista", peca: "Manifestação simples", baixa: [0.5, 1], media: [1, 2], alta: [2, 4] },
  { area: "trabalhista", peca: "Manifestação técnica", baixa: [1, 2], media: [2, 4], alta: [4, 7] },
  { area: "trabalhista", peca: "Cálculo trabalhista (liquidação)", baixa: [2, 4], media: [4, 8], alta: [8, 15] },
  { area: "trabalhista", peca: "Acompanhamento processual mensal", baixa: [0.5, 1], media: [1, 2], alta: [2, 4] },
  { area: "trabalhista", peca: "Defesa em ação anulatória de auto de infração", baixa: [4, 6], media: [6, 10], alta: [10, 16] },
  { area: "trabalhista", peca: "Estudo de caso novo", baixa: [1, 3], media: [3, 6], alta: [6, 12] },

  // ---------------- EMPRESARIAL / SOCIETÁRIO / TRIBUTÁRIO ----------------
  { area: "empresarial", peca: "Alteração contratual (Junta Comercial)", baixa: [2, 4], media: [4, 8], alta: [8, 16] },
  { area: "empresarial", peca: "Constituição de empresa", baixa: [3, 5], media: [5, 10], alta: [10, 18] },
  { area: "empresarial", peca: "Distrato / dissolução de sociedade", baixa: [3, 5], media: [5, 10], alta: [10, 20] },
  { area: "empresarial", peca: "Petição inicial de Recuperação Judicial", baixa: [15, 25], media: [25, 40], alta: [40, 80] },
  { area: "empresarial", peca: "Defesa em Execução Fiscal", baixa: [5, 8], media: [8, 14], alta: [14, 25] },
  { area: "empresarial", peca: "Embargos à Execução Fiscal", baixa: [6, 10], media: [10, 16], alta: [16, 28] },
  { area: "empresarial", peca: "Exceção de Pré-Executividade fiscal", baixa: [4, 6], media: [6, 10], alta: [10, 16] },
  { area: "empresarial", peca: "Mandado de Segurança", baixa: [6, 10], media: [10, 16], alta: [16, 25] },
  { area: "empresarial", peca: "Defesa administrativa (CARF, TARF, ISS, IPTU)", baixa: [4, 8], media: [8, 14], alta: [14, 22] },
  { area: "empresarial", peca: "Parecer tributário", baixa: [4, 8], media: [8, 15], alta: [15, 30] },
  { area: "empresarial", peca: "Parecer societário", baixa: [4, 8], media: [8, 15], alta: [15, 25] },
  { area: "empresarial", peca: "Notificação extrajudicial corporativa", baixa: [1, 2], media: [2, 4], alta: [4, 8] },
  { area: "empresarial", peca: "Análise contratual (revisão)", baixa: [1, 3], media: [3, 6], alta: [6, 12] },
  { area: "empresarial", peca: "Elaboração de contrato", baixa: [2, 5], media: [5, 12], alta: [12, 25] },
  { area: "empresarial", peca: "Due diligence empresarial", baixa: [4, 8], media: [8, 20], alta: [20, 50] },
  { area: "empresarial", peca: "Acordo de Acionistas / Quotistas", baixa: [5, 10], media: [10, 18], alta: [18, 35] },

  // --------------------------- IMOBILIÁRIO ---------------------------
  { area: "imobiliario", peca: "Ação Revisional Contratual (MCMV/Caixa)", baixa: [6, 10], media: [10, 15], alta: [15, 25] },
  { area: "imobiliario", peca: "Ação de Adjudicação Compulsória", baixa: [4, 6], media: [6, 10], alta: [10, 16] },
  { area: "imobiliario", peca: "Ação de Despejo", baixa: [3, 5], media: [5, 8], alta: [8, 14] },
  { area: "imobiliario", peca: "Ação de Imissão na Posse", baixa: [4, 6], media: [6, 10], alta: [10, 15] },
  { area: "imobiliario", peca: "Usucapião extrajudicial", baixa: [5, 8], media: [8, 15], alta: [15, 30] },
  { area: "imobiliario", peca: "Usucapião judicial", baixa: [8, 12], media: [12, 20], alta: [20, 35] },
  { area: "imobiliario", peca: "Estudo de matrícula (parecer)", baixa: [1, 2], media: [2, 4], alta: [4, 8] },
  { area: "imobiliario", peca: "Due diligence imobiliária completa", baixa: [3, 6], media: [6, 12], alta: [12, 25] },
  { area: "imobiliario", peca: "Elaboração de contrato (compra/venda, locação)", baixa: [2, 4], media: [4, 8], alta: [8, 15] },
  { area: "imobiliario", peca: "Distrato imobiliário", baixa: [1, 3], media: [3, 6], alta: [6, 12] },
  { area: "imobiliario", peca: "Negociação de distrato com construtora", baixa: [4, 8], media: [8, 15], alta: [15, 25] },
  { area: "imobiliario", peca: "Ação de cobrança de aluguéis", baixa: [2, 4], media: [4, 7], alta: [7, 12] },
  { area: "imobiliario", peca: "Defesa em consolidação fiduciária", baixa: [5, 8], media: [8, 14], alta: [14, 22] },

  // ----------------------- FAMÍLIA / SUCESSÕES -----------------------
  { area: "familia", peca: "Inventário extrajudicial", baixa: [5, 8], media: [8, 15], alta: [15, 30] },
  { area: "familia", peca: "Inventário judicial", baixa: [10, 15], media: [15, 25], alta: [25, 50] },
  { area: "familia", peca: "Inventário negativo", baixa: [3, 5], media: [5, 9], alta: [9, 15] },
  { area: "familia", peca: "Divórcio extrajudicial", baixa: [2, 4], media: [4, 7], alta: [7, 12] },
  { area: "familia", peca: "Divórcio judicial", baixa: [4, 8], media: [8, 15], alta: [15, 25] },
  { area: "familia", peca: "Ação de alimentos", baixa: [3, 5], media: [5, 9], alta: [9, 15] },
  { area: "familia", peca: "Reconhecimento / dissolução de união estável", baixa: [3, 5], media: [5, 9], alta: [9, 15] },
  { area: "familia", peca: "Negociação extrajudicial sucessória", baixa: [4, 8], media: [8, 15], alta: [15, 25] },
  { area: "familia", peca: "Habilitação de herdeiros", baixa: [1, 3], media: [3, 5], alta: [5, 10] },

  // ----------------------------- CRIMINAL -----------------------------
  { area: "criminal", peca: "Notícia-crime / Queixa-crime", baixa: [3, 5], media: [5, 9], alta: [9, 15] },
  { area: "criminal", peca: "Defesa preliminar", baixa: [3, 5], media: [5, 9], alta: [9, 15] },
  { area: "criminal", peca: "Resposta à acusação", baixa: [3, 6], media: [6, 12], alta: [12, 22] },
  { area: "criminal", peca: "Alegações finais", baixa: [4, 8], media: [8, 15], alta: [15, 25] },
  { area: "criminal", peca: "Recurso em Sentido Estrito", baixa: [4, 6], media: [6, 10], alta: [10, 16] },
  { area: "criminal", peca: "Apelação criminal", baixa: [8, 12], media: [12, 20], alta: [20, 32] },
  { area: "criminal", peca: "Habeas Corpus", baixa: [4, 6], media: [6, 10], alta: [10, 18] },
  { area: "criminal", peca: "Audiência de instrução criminal", baixa: [4, 6], media: [6, 10], alta: [10, 15] },
  { area: "criminal", peca: "Tribunal do Júri (1ª fase)", baixa: [8, 12], media: [12, 20], alta: [20, 35] },
  { area: "criminal", peca: "Tribunal do Júri (Plenário, com prep.)", baixa: [15, 25], media: [25, 40], alta: [40, 80] },

  // ---------------------- CONSULTIVO / EXTRAJUDICIAL ----------------------
  { area: "consultivo", peca: "Parecer jurídico", baixa: [3, 6], media: [6, 12], alta: [12, 25] },
  { area: "consultivo", peca: "Notificação extrajudicial", baixa: [1, 2], media: [2, 4], alta: [4, 7] },
  { area: "consultivo", peca: "Resposta a notificação", baixa: [1, 2], media: [2, 4], alta: [4, 8] },
  { area: "consultivo", peca: "Negociação extrajudicial — rodada simples", baixa: [3, 6], media: [6, 12], alta: [12, 25] },
  { area: "consultivo", peca: "Negociação extrajudicial — caso complexo", baixa: [8, 15], media: [15, 25], alta: [25, 50] },
  { area: "consultivo", peca: "Atendimento / consulta cliente", baixa: [0.5, 1], media: [1, 2], alta: [2, 4] },
  { area: "consultivo", peca: "Reunião com cliente", baixa: [0.5, 1.5], media: [1.5, 3], alta: [3, 5] },
  { area: "consultivo", peca: "Ata notarial", baixa: [1, 2], media: [2, 4], alta: [4, 7] },
  { area: "consultivo", peca: "Acordo extrajudicial (minuta + ajustes)", baixa: [2, 4], media: [4, 8], alta: [8, 15] },
  { area: "consultivo", peca: "Mediação extrajudicial (sessão + preparação)", baixa: [2, 4], media: [4, 8], alta: [8, 15] },
];

/** Retorna a faixa de horas para uma peça/complexidade, se encontrada. */
export function faixaHoras(
  peca: string,
  complexidade: Complexidade,
): Faixa | null {
  const item = TABELA_HORAS.find(
    (i) => i.peca.toLowerCase() === peca.trim().toLowerCase(),
  );
  return item ? item[complexidade] : null;
}

/** Sugere o ponto médio da faixa de horas para uma peça/complexidade. */
export function horasSugeridas(
  peca: string,
  complexidade: Complexidade,
): number | null {
  const faixa = faixaHoras(peca, complexidade);
  if (!faixa) return null;
  return Math.round(((faixa[0] + faixa[1]) / 2) * 2) / 2; // arredonda a 0,5
}
