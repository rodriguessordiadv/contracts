import { describe, expect, it } from "vitest";
import { reais } from "./money";
import { calcularExito, reconciliarValorMinimo } from "./proposal";

describe("reconciliarValorMinimo (Cláusula 2ª §3º)", () => {
  it("cobra a diferença quando as horas ficam aquém do mínimo", () => {
    const r = reconciliarValorMinimo({
      valorMinimoAcao: reais(5000),
      horasConsumidasNaAcao: 8,
      valorHoraTecnica: reais(420),
    });
    // crédito = 8 × 420 = 3360; diferença = 5000 - 3360 = 1640
    expect(r.creditoHoras).toBe(reais(3360));
    expect(r.diferencaACobrar).toBe(reais(1640));
    expect(r.minimoAtingido).toBe(false);
  });

  it("não cobra diferença quando as horas já cobrem o mínimo", () => {
    const r = reconciliarValorMinimo({
      valorMinimoAcao: reais(3000),
      horasConsumidasNaAcao: 8,
      valorHoraTecnica: reais(420),
    });
    expect(r.diferencaACobrar).toBe(0);
    expect(r.minimoAtingido).toBe(true);
  });
});

describe("calcularExito (Cláusula 2ª §§1º e 2º)", () => {
  it("aplica 25% sobre o proveito econômico no polo ativo", () => {
    const r = calcularExito({
      polo: "ativo",
      proveitoEconomicoBruto: reais(100000),
      percentualExito: 0.25,
    });
    expect(r.devido).toBe(true);
    expect(r.valorExito).toBe(reais(25000));
  });

  it("não há êxito no polo passivo (defesa)", () => {
    const r = calcularExito({
      polo: "passivo",
      proveitoEconomicoBruto: reais(100000),
      percentualExito: 0.25,
    });
    expect(r.devido).toBe(false);
    expect(r.motivoNaoDevido).toBe("polo_passivo");
    expect(r.valorExito).toBe(0);
  });

  it("êxito zerado por opção de mais horas", () => {
    const r = calcularExito({
      polo: "ativo",
      proveitoEconomicoBruto: reais(100000),
      percentualExito: 0.25,
      exitoZerado: true,
    });
    expect(r.devido).toBe(false);
    expect(r.motivoNaoDevido).toBe("exito_zerado");
  });
});
