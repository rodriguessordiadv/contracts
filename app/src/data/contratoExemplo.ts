/**
 * Parâmetros do contrato CNTR000262 (RS Energia e Automação Ltda) codificados
 * como fixture/exemplo. Serve de referência viva do modelo e é usado nos testes.
 */

import { reais } from "../domain/money";
import type { ParametrosBancoHoras } from "../domain/types";

export const CNTR000262: ParametrosBancoHoras = {
  horasMensais: 3,
  valorMensal: reais(1260),
  valorHoraTecnica: reais(420),
  precoHoraExtra: {
    padrao: reais(420),
    naoCumulacao: reais(400),
    naoCumulacaoQuitaAteDia10: reais(390),
  },
  acumulavel: true, // 1º ano
  diaVencimento: 10,
  reajuste: {
    mesAniversario: 6, // assinatura em junho
    indices: ["IPCA", "IGPM"],
    criterio: "maior_beneficio_contratada",
  },
  mora: {
    multa: 0.2,
    jurosMes: 0.01,
    correcao: "IGPM",
  },
  areas: ["empresarial", "trabalhista", "civel", "consultivo"],
  exitoPadrao: 0.25,
  prazoMinimoMesesAproveitamento: 12,
};
