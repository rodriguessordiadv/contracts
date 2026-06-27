import { describe, expect, it } from "vitest";
import { CNTR000262 } from "../data/contratoExemplo";
import { calcularSaldoMensal, projetarSaldo } from "./hourBank";

describe("calcularSaldoMensal", () => {
  it("computa sobra quando consome menos que o disponível", () => {
    const r = calcularSaldoMensal(CNTR000262, {
      competencia: "2026-07",
      horasContratadas: 3,
      horasConsumidas: 2,
      saldoAcumuladoAnterior: 0,
    });
    expect(r.horasDisponiveis).toBe(3);
    expect(r.saldoFinal).toBe(1);
    expect(r.horasExtras).toBe(0);
    expect(r.saldoParaProximoMes).toBe(1);
  });

  it("apura horas extras quando estoura o saldo", () => {
    const r = calcularSaldoMensal(CNTR000262, {
      competencia: "2026-07",
      horasContratadas: 3,
      horasConsumidas: 5,
      saldoAcumuladoAnterior: 0,
    });
    expect(r.saldoFinal).toBe(-2);
    expect(r.horasExtras).toBe(2);
    expect(r.saldoParaProximoMes).toBe(0);
  });

  it("usa saldo acumulado anterior quando o contrato é acumulável", () => {
    const r = calcularSaldoMensal(CNTR000262, {
      competencia: "2026-08",
      horasContratadas: 3,
      horasConsumidas: 4,
      saldoAcumuladoAnterior: 2,
    });
    expect(r.horasDisponiveis).toBe(5);
    expect(r.horasExtras).toBe(0);
    expect(r.saldoParaProximoMes).toBe(1);
  });

  it("ignora acúmulo quando o contrato não é acumulável", () => {
    const naoAcumulavel = { ...CNTR000262, acumulavel: false };
    const r = calcularSaldoMensal(naoAcumulavel, {
      competencia: "2026-08",
      horasContratadas: 3,
      horasConsumidas: 1,
      saldoAcumuladoAnterior: 5,
    });
    expect(r.horasDisponiveis).toBe(3);
    expect(r.saldoParaProximoMes).toBe(0);
  });
});

describe("projetarSaldo", () => {
  it("transporta o saldo acumulado entre meses", () => {
    const r = projetarSaldo(CNTR000262, [
      { competencia: "2026-07", horasContratadas: 3, horasConsumidas: 1 },
      { competencia: "2026-08", horasContratadas: 3, horasConsumidas: 1 },
      { competencia: "2026-09", horasContratadas: 3, horasConsumidas: 8 },
    ]);
    expect(r[0]!.saldoParaProximoMes).toBe(2);
    expect(r[1]!.horasDisponiveis).toBe(5);
    expect(r[1]!.saldoParaProximoMes).toBe(4);
    // mês 3: disponível 3 + 4 acumulado = 7; consumiu 8 -> 1 extra
    expect(r[2]!.horasDisponiveis).toBe(7);
    expect(r[2]!.horasExtras).toBe(1);
  });
});
