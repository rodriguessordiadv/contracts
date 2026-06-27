import { describe, expect, it, vi } from "vitest";
import type { ParseClient } from "../integrations/anthropic";
import {
  CONFIANCA_MINIMA_AUTO,
  extractTimeEntryFromTranscription,
  precisaRevisao,
  type VoiceEntry,
} from "./voiceExtraction";

const entry: VoiceEntry = {
  clientName: "RS Energia",
  hours: 2.5,
  title: "Análise de defesa trabalhista",
  area: "trabalhista",
  workDate: null,
  confidence: 0.92,
};

describe("extractTimeEntryFromTranscription", () => {
  it("valida e retorna o lançamento do cliente injetado", async () => {
    const fake: ParseClient = {
      messages: { parse: vi.fn(async () => ({ parsed_output: entry })) },
    };
    const r = await extractTimeEntryFromTranscription(
      "Sordi, duas horas e meia pro cliente RS Energia, análise de defesa trabalhista",
      fake,
    );
    expect(r.hours).toBe(2.5);
    expect(r.area).toBe("trabalhista");
  });
});

describe("precisaRevisao", () => {
  it("não precisa quando confiança alta e cliente encontrado", () => {
    expect(precisaRevisao(entry, true)).toBe(false);
  });
  it("precisa quando o cliente não foi encontrado", () => {
    expect(precisaRevisao(entry, false)).toBe(true);
  });
  it("precisa quando a confiança é baixa", () => {
    const incerto = { ...entry, confidence: CONFIANCA_MINIMA_AUTO - 0.01 };
    expect(precisaRevisao(incerto, true)).toBe(true);
  });
});
