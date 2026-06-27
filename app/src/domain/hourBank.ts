/**
 * Banco de horas — cálculo de saldo, acumulação e apuração de horas extras.
 * Espelha a Cláusula 1ª do contrato padrão.
 */

import type { ParametrosBancoHoras, SaldoMensal } from "./types";

export interface ResultadoSaldo {
  /** Horas disponíveis no mês (contratadas + acumulado anterior, se acumulável). */
  horasDisponiveis: number;
  /** Horas consumidas no mês. */
  horasConsumidas: number;
  /** Saldo final (positivo = sobra; pode virar acúmulo se acumulável). */
  saldoFinal: number;
  /** Horas que excederam o disponível e viram hora extra (sempre >= 0). */
  horasExtras: number;
  /** Saldo que será transportado para o próximo mês (0 se não acumulável). */
  saldoParaProximoMes: number;
}

/**
 * Calcula o saldo de um mês de competência a partir dos parâmetros do contrato
 * e do estado do mês.
 */
export function calcularSaldoMensal(
  params: ParametrosBancoHoras,
  saldo: SaldoMensal,
): ResultadoSaldo {
  const acumuladoAnterior = params.acumulavel ? saldo.saldoAcumuladoAnterior : 0;
  const horasDisponiveis = round2(saldo.horasContratadas + acumuladoAnterior);
  const horasConsumidas = round2(saldo.horasConsumidas);

  const saldoFinal = round2(horasDisponiveis - horasConsumidas);
  const horasExtras = saldoFinal < 0 ? round2(-saldoFinal) : 0;
  const sobra = saldoFinal > 0 ? saldoFinal : 0;
  const saldoParaProximoMes = params.acumulavel ? sobra : 0;

  return {
    horasDisponiveis,
    horasConsumidas,
    saldoFinal,
    horasExtras,
    saldoParaProximoMes,
  };
}

/**
 * Projeta o saldo acumulado ao longo de uma sequência de meses (em ordem
 * cronológica), aplicando acumulação quando o contrato permitir.
 */
export function projetarSaldo(
  params: ParametrosBancoHoras,
  meses: Array<Pick<SaldoMensal, "competencia" | "horasContratadas" | "horasConsumidas">>,
): Array<ResultadoSaldo & { competencia: string }> {
  let acumulado = 0;
  const resultados: Array<ResultadoSaldo & { competencia: string }> = [];

  for (const mes of meses) {
    const resultado = calcularSaldoMensal(params, {
      competencia: mes.competencia,
      horasContratadas: mes.horasContratadas,
      horasConsumidas: mes.horasConsumidas,
      saldoAcumuladoAnterior: acumulado,
    });
    acumulado = resultado.saldoParaProximoMes;
    resultados.push({ ...resultado, competencia: mes.competencia });
  }

  return resultados;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
