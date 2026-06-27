import { describe, expect, it } from "vitest";
import { CNTR000262 } from "../data/contratoExemplo";
import { reais } from "./money";
import { custoHorasExtras, precoOAB, valorHoraExtra } from "./pricing";

describe("valorHoraExtra (3 níveis — Cláusula 1ª)", () => {
  it("acumula -> R$ 420", () => {
    expect(valorHoraExtra(CNTR000262, "acumula")).toBe(reais(420));
  });
  it("não acumula -> R$ 400", () => {
    expect(valorHoraExtra(CNTR000262, "nao_acumula")).toBe(reais(400));
  });
  it("não acumula + quita até dia 10 -> R$ 390", () => {
    expect(valorHoraExtra(CNTR000262, "nao_acumula_quita_ate_dia_10")).toBe(reais(390));
  });
});

describe("custoHorasExtras", () => {
  it("multiplica horas pelo nível correto", () => {
    expect(custoHorasExtras(CNTR000262, 2.5, "nao_acumula_quita_ate_dia_10")).toBe(reais(975));
  });
});

describe("precoOAB (motor de honorários)", () => {
  it("aplica desconto e calcula equivalente em horas", () => {
    const r = precoOAB({
      valorReferenciaOAB: reais(10000),
      desconto: 0.3,
      valorHoraTecnica: reais(420),
    });
    expect(r.precoCheioOAB).toBe(reais(10000));
    expect(r.precoSugerido).toBe(reais(7000));
    expect(r.descontoAplicado).toBe(0.3);
    // 7000 / 420 = 16,67h
    expect(r.equivalenteHoras).toBeCloseTo(16.67, 2);
  });

  it("limita o desconto a 50%", () => {
    const r = precoOAB({ valorReferenciaOAB: reais(1000), desconto: 0.9, valorHoraTecnica: reais(420) });
    expect(r.descontoAplicado).toBe(0.5);
    expect(r.precoSugerido).toBe(reais(500));
  });

  it("sem desconto não gera alerta de aviltamento", () => {
    const r = precoOAB({ valorReferenciaOAB: reais(1000), desconto: 0, valorHoraTecnica: reais(420) });
    expect(r.alertaAviltamento).toBeNull();
  });

  it("desconto alto gera alerta de atenção", () => {
    const r = precoOAB({ valorReferenciaOAB: reais(1000), desconto: 0.45, valorHoraTecnica: reais(420) });
    expect(r.alertaAviltamento?.nivel).toBe("atencao");
  });
});
