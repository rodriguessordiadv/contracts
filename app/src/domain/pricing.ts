/**
 * Precificação: hora extra em 3 níveis (Cláusula 1ª) e motor de honorários
 * com referência à Tabela de Honorários da OAB/RS.
 */

import { multiplicar, type Centavos } from "./money";
import type { OpcaoCumulacao, ParametrosBancoHoras } from "./types";

/**
 * Seleciona o valor da hora extra conforme a opção de cumulação e a quitação.
 *
 * Cláusula 1ª:
 * - padrão: R$ 420 (acumula);
 * - R$ 400: opção pela não-cumulação;
 * - R$ 390: não-cumulação + quitação até o dia 10 do mês subsequente ao uso.
 */
export function valorHoraExtra(
  params: ParametrosBancoHoras,
  opcao: OpcaoCumulacao,
): Centavos {
  switch (opcao) {
    case "acumula":
      return params.precoHoraExtra.padrao;
    case "nao_acumula":
      return params.precoHoraExtra.naoCumulacao;
    case "nao_acumula_quita_ate_dia_10":
      return params.precoHoraExtra.naoCumulacaoQuitaAteDia10;
  }
}

/** Custo total de N horas extras sob uma dada opção de cumulação. */
export function custoHorasExtras(
  params: ParametrosBancoHoras,
  horasExtras: number,
  opcao: OpcaoCumulacao,
): Centavos {
  return multiplicar(valorHoraExtra(params, opcao), horasExtras);
}

// ---------------------------------------------------------------------------
// Motor de honorários OAB/RS
// ---------------------------------------------------------------------------

export interface EntradaPrecoOAB {
  /** Valor de referência da Tabela de Honorários da OAB/RS, em centavos. */
  valorReferenciaOAB: Centavos;
  /** Desconto a aplicar sobre a referência (0–0.5). Ex.: 0.3 = 30% abaixo. */
  desconto: number;
  /** Valor da hora técnica do cliente, para calcular o equivalente em horas. */
  valorHoraTecnica: Centavos;
}

export interface ResultadoPrecoOAB {
  /** Preço cheio = referência OAB. */
  precoCheioOAB: Centavos;
  /** Preço sugerido = referência × (1 - desconto). */
  precoSugerido: Centavos;
  /** Desconto efetivo aplicado (0–1). */
  descontoAplicado: number;
  /** Equivalente em horas técnicas (preço sugerido ÷ valor hora). */
  equivalenteHoras: number;
  /** Alerta ético: cobrar abaixo do mínimo da OAB pode caracterizar aviltamento. */
  alertaAviltamento: AlertaAviltamento | null;
}

export interface AlertaAviltamento {
  nivel: "info" | "atencao";
  mensagem: string;
}

const DESCONTO_MIN = 0;
const DESCONTO_MAX = 0.5;

/**
 * Calcula o preço sugerido a partir da referência OAB/RS, aplicando o desconto
 * desejado (entre 10% e 50%, conforme combinado), o equivalente em horas e um
 * alerta de aviltamento de honorários.
 *
 * NOTA(pesquisa-oab-rs): o limiar e a redação do alerta de aviltamento serão
 * ajustados quando a pesquisa sobre o Código de Ética / Provimento da OAB/RS
 * for concluída. Por ora, qualquer desconto sobre a referência gera alerta.
 */
export function precoOAB(entrada: EntradaPrecoOAB): ResultadoPrecoOAB {
  const desconto = clamp(entrada.desconto, DESCONTO_MIN, DESCONTO_MAX);
  const precoSugerido = multiplicar(entrada.valorReferenciaOAB, 1 - desconto);
  const equivalenteHoras =
    entrada.valorHoraTecnica > 0
      ? round2(precoSugerido / entrada.valorHoraTecnica)
      : 0;

  return {
    precoCheioOAB: entrada.valorReferenciaOAB,
    precoSugerido,
    descontoAplicado: desconto,
    equivalenteHoras,
    alertaAviltamento: avaliarAviltamento(desconto),
  };
}

function avaliarAviltamento(desconto: number): AlertaAviltamento | null {
  if (desconto <= 0) return null;
  if (desconto >= 0.4) {
    return {
      nivel: "atencao",
      mensagem:
        "Desconto elevado sobre a Tabela da OAB/RS. Cobrar valores muito abaixo " +
        "do mínimo pode caracterizar aviltamento de honorários (questão ética). " +
        "Registre a justificativa do caso. [pendente de confirmação pela pesquisa OAB/RS]",
    };
  }
  return {
    nivel: "info",
    mensagem:
      "Valor proposto abaixo da referência da Tabela da OAB/RS. " +
      "Verifique a política de honorários antes de enviar.",
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
