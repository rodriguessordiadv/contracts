import { describe, expect, it, vi } from "vitest";
import type { ParseClient } from "../integrations/anthropic";
import { type AnamneseResultado, conduzirAnamnese, horasAncoradas } from "./anamnese";

const resultado: AnamneseResultado = {
  naturezaNegocio: "Energia e automação",
  area: "trabalhista",
  complexidade: "media",
  urgencia: "media",
  recorrente: false,
  polo: "passivo",
  pecaSugerida: "Contestação Trabalhista",
  itemOabSugerido: "8.0b",
  resumo: "Defesa em reclamatória trabalhista de ex-empregado.",
  horasEstimadas: 9,
};

describe("conduzirAnamnese", () => {
  it("valida e retorna a anamnese do cliente injetado", async () => {
    const fake: ParseClient = {
      messages: { parse: vi.fn(async () => ({ parsed_output: resultado })) },
    };
    const r = await conduzirAnamnese("Defesa de reclamatória", "Energia", fake);
    expect(r.area).toBe("trabalhista");
    expect(r.itemOabSugerido).toBe("8.0b");
  });
});

describe("horasAncoradas", () => {
  it("ancora na tabela forense quando a peça é reconhecida", () => {
    // "Contestação Trabalhista" média -> faixa [8,12] -> ponto médio 10
    expect(horasAncoradas(resultado)).toBe(10);
  });
  it("mantém a estimativa da IA quando a peça não está na tabela", () => {
    const r = { ...resultado, pecaSugerida: "Peça inexistente XPTO" };
    expect(horasAncoradas(r)).toBe(9);
  });
});
