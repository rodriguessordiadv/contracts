import { describe, expect, it, vi } from "vitest";
import { CNTR000262 } from "../data/contratoExemplo";
import type { ParseClient } from "../integrations/anthropic";
import {
  buildContractMessages,
  type ContratoExtraido,
  extractContractFromPdf,
  mapHonorariosToParametros,
} from "./contractExtraction";

const extraidoCNTR000262: ContratoExtraido = {
  numeroCntr: "CNTR000262",
  dataAssinatura: "2026-06-17",
  escritorio: {
    razaoSocial: "Rodrigues & Sordi Advogados",
    oabSociedade: "5.283",
    cnpj: "22.588.050/0001-74",
    endereco: "R. Gen. Andrade Neves, 100, conj. 901, Porto Alegre/RS",
    email: "advogados@rs-adv.com",
    responsavelNome: "Sávio Radé Sordi",
    responsavelOab: "OAB/RS 93.284",
    responsavelCpf: "764.133.730-91",
  },
  cliente: {
    razaoSocial: "RS Energia e Automação Ltda",
    nomeFantasia: "RS Energias",
    tipoPessoa: "PJ",
    cpfCnpj: "46.647.982/0001-09",
    nire: "43209486321",
    endereco: "Rua Auxiliadora, 68, São Leopoldo/RS",
    email: "financeiro@rgsenergia.com.br",
  },
  socios: [
    {
      nome: "Leandro de Rosa",
      cpf: "545.814.860-68",
      rg: "3037793605 SSP/RS",
      qualificacao: "sócio-administrador",
      isAdministrador: true,
      isSignatario: true,
    },
  ],
  honorarios: {
    modalidade: "banco de horas técnicas mensais",
    horasMensais: 3,
    valorMensalReais: 1260,
    valorHoraTecnicaReais: 420,
    horaExtraPadraoReais: 420,
    horaExtraNaoCumulacaoReais: 400,
    horaExtraNaoCumulacaoQuitaAteDia10Reais: 390,
    acumulavel: true,
    diaVencimento: 10,
    reajusteMesAniversario: 6,
    reajusteIndices: ["IPCA", "IGPM"],
    moraMultaPercent: 20,
    moraJurosMesPercent: 1,
    moraCorrecao: "IGPM",
    areas: ["empresarial", "trabalhista", "civel", "consultivo"],
    exitoPadraoPercent: 25,
    prazoMinimoMeses: 12,
  },
  processosVinculados: [
    {
      numeroCnj: "0020621-45.2026.5.04.0333",
      tribunal: "3ª Vara do Trabalho de São Leopoldo/RS",
      polo: "passivo",
      descricao: "Reclamatória trabalhista",
    },
  ],
};

describe("mapHonorariosToParametros", () => {
  it("reproduz exatamente os parâmetros do CNTR000262", () => {
    expect(mapHonorariosToParametros(extraidoCNTR000262)).toEqual(CNTR000262);
  });

  it("usa defaults quando níveis de hora extra estão ausentes", () => {
    const semExtras: ContratoExtraido = {
      ...extraidoCNTR000262,
      honorarios: {
        ...extraidoCNTR000262.honorarios,
        horaExtraPadraoReais: null,
        horaExtraNaoCumulacaoReais: null,
        horaExtraNaoCumulacaoQuitaAteDia10Reais: null,
      },
    };
    const p = mapHonorariosToParametros(semExtras);
    // Sem níveis no contrato, todos caem no valor da hora técnica
    expect(p.precoHoraExtra.padrao).toBe(p.valorHoraTecnica);
    expect(p.precoHoraExtra.naoCumulacao).toBe(p.valorHoraTecnica);
    expect(p.precoHoraExtra.naoCumulacaoQuitaAteDia10).toBe(p.valorHoraTecnica);
  });
});

describe("buildContractMessages", () => {
  it("inclui o PDF como bloco document base64 antes do texto", () => {
    const msgs = buildContractMessages("BASE64DATA");
    const content = msgs[0]!.content;
    expect(content[0]).toMatchObject({
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: "BASE64DATA" },
    });
    expect(content[1]).toMatchObject({ type: "text" });
  });
});

describe("extractContractFromPdf", () => {
  it("valida e retorna a extração do cliente injetado", async () => {
    const fake: ParseClient = {
      messages: {
        parse: vi.fn(async () => ({ parsed_output: extraidoCNTR000262 })),
      },
    };
    const result = await extractContractFromPdf("BASE64", fake);
    expect(result.numeroCntr).toBe("CNTR000262");
    expect(fake.messages.parse).toHaveBeenCalledOnce();
  });
});
