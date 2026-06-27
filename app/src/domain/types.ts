/**
 * Modelo de domínio derivado do contrato padrão do escritório (CNTR000262).
 * Estes tipos são a "fonte da verdade" do banco de horas e da precificação.
 */

import type { Centavos } from "./money";

/** Áreas de atuação cobertas pela assessoria continuada. */
export type Area =
  | "civel"
  | "trabalhista"
  | "empresarial"
  | "imobiliario"
  | "familia"
  | "criminal"
  | "consultivo";

/** Complexidade usada na estimativa de horas (tabela forense). */
export type Complexidade = "baixa" | "media" | "alta";

/** Índices de reajuste/correção previstos no contrato. */
export type Indice = "IPCA" | "IGPM";

/**
 * Opção de cumulação de horas escolhida pelo cliente. Define qual nível de
 * preço da hora extra se aplica (Cláusula 1ª).
 */
export type OpcaoCumulacao =
  | "acumula" // hora extra ao valor padrão
  | "nao_acumula" // hora extra reduzida
  | "nao_acumula_quita_ate_dia_10"; // hora extra reduzida + quitação até o dia 10

/**
 * Regra de preço da hora extra em 3 níveis (Cláusula 1ª do contrato padrão).
 * Ex.: { padrao: 42000, naoCumulacao: 40000, naoCumulacaoQuitaAteDia10: 39000 }
 */
export interface PrecoHoraExtra {
  padrao: Centavos;
  naoCumulacao: Centavos;
  naoCumulacaoQuitaAteDia10: Centavos;
}

/** Regra de mora por inadimplemento (Cláusula 1ª/2ª). */
export interface RegraMora {
  multa: number; // ex.: 0.20 (20%)
  jurosMes: number; // ex.: 0.01 (1% a.m.)
  correcao: Indice; // ex.: "IGPM"
}

/** Política de reajuste anual (Cláusula 1ª, parágrafo único). */
export interface RegraReajuste {
  mesAniversario: number; // 1–12 (mês de assinatura)
  indices: Indice[]; // candidatos
  criterio: "maior_beneficio_contratada"; // prevalece o melhor para o escritório
}

/**
 * Parâmetros do banco de horas técnicas de um contrato (Cláusula 1ª).
 */
export interface ParametrosBancoHoras {
  horasMensais: number; // ex.: 3
  valorMensal: Centavos; // ex.: 126000 (R$ 1.260,00)
  valorHoraTecnica: Centavos; // ex.: 42000 (R$ 420,00)
  precoHoraExtra: PrecoHoraExtra;
  acumulavel: boolean; // acumula saldo não usado (1º ano)
  diaVencimento: number; // ex.: 10
  reajuste: RegraReajuste;
  mora: RegraMora;
  areas: Area[];
  exitoPadrao: number; // ex.: 0.25 (25%)
  prazoMinimoMesesAproveitamento: number; // ex.: 12
}

/** Um lançamento de horas (débito do banco). */
export interface Lancamento {
  horas: number;
  data: string; // YYYY-MM-DD
  titulo: string;
  area?: Area;
  processoId?: string; // se vinculado a uma ação
  origem: "manual" | "voz" | "timer" | "import";
}

/**
 * Estado de consumo de um cliente em um mês de competência.
 */
export interface SaldoMensal {
  competencia: string; // YYYY-MM
  horasContratadas: number;
  saldoAcumuladoAnterior: number; // de meses anteriores, se acumulável
  horasConsumidas: number;
}
