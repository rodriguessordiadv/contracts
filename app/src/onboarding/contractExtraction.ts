/**
 * Extração de contrato com Claude (Sonnet 4.6) — onboarding do cliente.
 *
 * Recebe o PDF do contrato assinado, extrai todos os dados num schema validado
 * por Zod e mapeia o bloco de honorários para os parâmetros do banco de horas
 * usados pelo domínio. É a Fase 1: contrato → cadastro completo → contagem de horas.
 */

import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { reais } from "../domain/money";
import type { Area, Indice, ParametrosBancoHoras } from "../domain/types";
import { getAnthropicClient, MODELS, type ParseClient } from "../integrations/anthropic";

const AREA_VALUES = [
  "civel",
  "trabalhista",
  "empresarial",
  "imobiliario",
  "familia",
  "criminal",
  "consultivo",
] as const;

/**
 * Schema da extração. Campos nuláveis (não opcionais) para casar com saída
 * estruturada estrita (strict JSON schema: tudo required + nullable).
 */
export const ContratoExtraidoSchema = z.object({
  numeroCntr: z.string().nullable(),
  dataAssinatura: z.string().nullable(), // YYYY-MM-DD

  escritorio: z.object({
    razaoSocial: z.string(),
    oabSociedade: z.string().nullable(),
    cnpj: z.string().nullable(),
    endereco: z.string().nullable(),
    email: z.string().nullable(),
    responsavelNome: z.string().nullable(),
    responsavelOab: z.string().nullable(),
    responsavelCpf: z.string().nullable(),
  }),

  cliente: z.object({
    razaoSocial: z.string(),
    nomeFantasia: z.string().nullable(),
    tipoPessoa: z.enum(["PF", "PJ"]),
    cpfCnpj: z.string().nullable(),
    nire: z.string().nullable(),
    endereco: z.string().nullable(),
    email: z.string().nullable(),
  }),

  socios: z.array(
    z.object({
      nome: z.string(),
      cpf: z.string().nullable(),
      rg: z.string().nullable(),
      qualificacao: z.string().nullable(),
      isAdministrador: z.boolean(),
      isSignatario: z.boolean(),
    }),
  ),

  honorarios: z.object({
    modalidade: z.string(), // ex.: "banco de horas técnicas mensais"
    horasMensais: z.number(),
    valorMensalReais: z.number(),
    valorHoraTecnicaReais: z.number(),
    horaExtraPadraoReais: z.number().nullable(),
    horaExtraNaoCumulacaoReais: z.number().nullable(),
    horaExtraNaoCumulacaoQuitaAteDia10Reais: z.number().nullable(),
    acumulavel: z.boolean(),
    diaVencimento: z.number(),
    reajusteMesAniversario: z.number().nullable(), // 1-12
    reajusteIndices: z.array(z.enum(["IPCA", "IGPM"])),
    moraMultaPercent: z.number().nullable(), // ex.: 20 (=20%)
    moraJurosMesPercent: z.number().nullable(), // ex.: 1 (=1% a.m.)
    moraCorrecao: z.enum(["IPCA", "IGPM"]).nullable(),
    areas: z.array(z.enum(AREA_VALUES)),
    exitoPadraoPercent: z.number().nullable(), // ex.: 25 (=25%)
    prazoMinimoMeses: z.number().nullable(),
  }),

  processosVinculados: z.array(
    z.object({
      numeroCnj: z.string().nullable(),
      tribunal: z.string().nullable(),
      polo: z.enum(["ativo", "passivo"]).nullable(),
      descricao: z.string().nullable(),
    }),
  ),
});

export type ContratoExtraido = z.infer<typeof ContratoExtraidoSchema>;

const SYSTEM_PROMPT = [
  "Você é assistente jurídico do escritório Rodrigues & Sordi Advogados (Porto Alegre/RS).",
  "Extraia, com precisão, os dados de um contrato de prestação de serviços advocatícios e honorários.",
  "Regras: valores monetários em reais (número, sem 'R$'); horas como número; percentuais como número (25, não 0.25);",
  "datas em YYYY-MM-DD; CNPJ/CPF/CNJ no formato como aparecem no documento.",
  "Quando um campo não existir no contrato, retorne null (ou lista vazia). Não invente dados.",
].join(" ");

const USER_INSTRUCTION =
  "Extraia todos os dados deste contrato no schema fornecido. Atenção especial ao bloco de honorários (banco de horas, valor da hora, hora extra em diferentes níveis, acumulação, reajuste, mora, êxito) e a processos judiciais citados.";

/** Monta as mensagens com o PDF (base64) + instrução. */
export function buildContractMessages(pdfBase64: string) {
  return [
    {
      role: "user" as const,
      content: [
        {
          type: "document" as const,
          source: {
            type: "base64" as const,
            media_type: "application/pdf" as const,
            data: pdfBase64,
          },
        },
        { type: "text" as const, text: USER_INSTRUCTION },
      ],
    },
  ];
}

/**
 * Extrai o contrato a partir do PDF em base64. Aceita um cliente injetado
 * (testes); por padrão usa o cliente Claude real.
 */
export async function extractContractFromPdf(
  pdfBase64: string,
  client: ParseClient = getAnthropicClient() as unknown as ParseClient,
): Promise<ContratoExtraido> {
  const response = await client.messages.parse({
    model: MODELS.sonnet,
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: buildContractMessages(pdfBase64),
    output_config: { format: zodOutputFormat(ContratoExtraidoSchema) },
  });
  return ContratoExtraidoSchema.parse(response.parsed_output);
}

/**
 * Mapeia o bloco de honorários extraído para os parâmetros de banco de horas do
 * domínio (valores em centavos). Aplica defaults sensatos quando o contrato
 * omite um nível de hora extra ou um parâmetro de mora/reajuste.
 */
export function mapHonorariosToParametros(extraido: ContratoExtraido): ParametrosBancoHoras {
  const h = extraido.honorarios;
  const valorHora = reais(h.valorHoraTecnicaReais);
  const padrao = h.horaExtraPadraoReais != null ? reais(h.horaExtraPadraoReais) : valorHora;

  const indices: Indice[] = h.reajusteIndices.length > 0 ? h.reajusteIndices : ["IPCA", "IGPM"];

  return {
    horasMensais: h.horasMensais,
    valorMensal: reais(h.valorMensalReais),
    valorHoraTecnica: valorHora,
    precoHoraExtra: {
      padrao,
      naoCumulacao:
        h.horaExtraNaoCumulacaoReais != null ? reais(h.horaExtraNaoCumulacaoReais) : padrao,
      naoCumulacaoQuitaAteDia10:
        h.horaExtraNaoCumulacaoQuitaAteDia10Reais != null
          ? reais(h.horaExtraNaoCumulacaoQuitaAteDia10Reais)
          : padrao,
    },
    acumulavel: h.acumulavel,
    diaVencimento: h.diaVencimento,
    reajuste: {
      mesAniversario: h.reajusteMesAniversario ?? 1,
      indices,
      criterio: "maior_beneficio_contratada",
    },
    mora: {
      multa: (h.moraMultaPercent ?? 0) / 100,
      jurosMes: (h.moraJurosMesPercent ?? 0) / 100,
      correcao: h.moraCorrecao ?? "IGPM",
    },
    areas: h.areas as Area[],
    exitoPadrao: (h.exitoPadraoPercent ?? 0) / 100,
    prazoMinimoMesesAproveitamento: h.prazoMinimoMeses ?? 12,
  };
}
