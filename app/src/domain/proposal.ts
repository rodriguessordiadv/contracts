/**
 * E-mail-proposta e reconciliação do valor mínimo de honorários por ação.
 * Espelha a Cláusula 2ª (§§ 1º, 2º e 3º) do contrato padrão.
 */

import { multiplicar, percentual, type Centavos } from "./money";

export type PoloProcessual = "ativo" | "passivo";

export interface EntradaReconciliacaoMinimo {
  /** Valor mínimo de honorários fixado para a ação (ref. Tabela OAB/RS). */
  valorMinimoAcao: Centavos;
  /** Horas do banco efetivamente consumidas no patrocínio da ação. */
  horasConsumidasNaAcao: number;
  /** Valor da hora técnica do contrato, para creditar as horas. */
  valorHoraTecnica: Centavos;
}

export interface ResultadoReconciliacaoMinimo {
  valorMinimoAcao: Centavos;
  /** Crédito das horas consumidas = horas × valor hora. */
  creditoHoras: Centavos;
  /** Diferença a cobrar se o crédito ficou aquém do mínimo (>= 0). */
  diferencaACobrar: Centavos;
  /** True quando o crédito das horas já cobriu o mínimo. */
  minimoAtingido: boolean;
}

/**
 * Cláusula 2ª, §3º: as horas do banco consumidas no patrocínio são creditadas e
 * abatidas do valor mínimo; se a remuneração via horas ficar aquém do mínimo
 * fixado, o cliente paga a diferença — o patrocínio nunca é remunerado por valor
 * inferior ao mínimo da demanda.
 */
export function reconciliarValorMinimo(
  entrada: EntradaReconciliacaoMinimo,
): ResultadoReconciliacaoMinimo {
  const creditoHoras = multiplicar(
    entrada.valorHoraTecnica,
    entrada.horasConsumidasNaAcao,
  );
  const diferenca = entrada.valorMinimoAcao - creditoHoras;
  const diferencaACobrar = diferenca > 0 ? diferenca : 0;

  return {
    valorMinimoAcao: entrada.valorMinimoAcao,
    creditoHoras,
    diferencaACobrar,
    minimoAtingido: diferencaACobrar === 0,
  };
}

export interface EntradaExito {
  polo: PoloProcessual;
  /** Proveito econômico bruto obtido na ação, em centavos. */
  proveitoEconomicoBruto: Centavos;
  /** Percentual de êxito (0–1). Padrão contratual: 0.25. */
  percentualExito: number;
  /** Êxito zerado por opção (ex.: troca por mais horas — Cláusula 2ª §1º). */
  exitoZerado?: boolean;
}

export interface ResultadoExito {
  devido: boolean;
  motivoNaoDevido: "polo_passivo" | "exito_zerado" | null;
  valorExito: Centavos;
}

/**
 * Calcula o êxito (Cláusula 2ª, §1º e §2º):
 * - polo passivo (defesa) → não há proveito econômico, não há êxito;
 * - êxito pode ser zerado mediante contratação de horas adicionais;
 * - caso contrário, percentual sobre o proveito econômico bruto (padrão 25%).
 */
export function calcularExito(entrada: EntradaExito): ResultadoExito {
  if (entrada.polo === "passivo") {
    return { devido: false, motivoNaoDevido: "polo_passivo", valorExito: 0 };
  }
  if (entrada.exitoZerado) {
    return { devido: false, motivoNaoDevido: "exito_zerado", valorExito: 0 };
  }
  return {
    devido: true,
    motivoNaoDevido: null,
    valorExito: percentual(entrada.proveitoEconomicoBruto, entrada.percentualExito),
  };
}
