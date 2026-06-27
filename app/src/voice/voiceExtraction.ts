/**
 * Extração de lançamento de horas a partir de transcrição de voz (Haiku 4.5).
 *
 * "Sordi, duas horas e meia pro cliente Fulano, análise de defesa trabalhista"
 * → { clientName, hours, title, area, workDate, confidence }.
 *
 * Modelo barato (Haiku) porque a tarefa é simples e de alto volume. O
 * casamento do cliente por similaridade e a fila de revisão ficam em camadas
 * acima (não criamos lançamento cego).
 */

import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
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

export const VoiceEntrySchema = z.object({
  /** Nome do cliente como falado (será casado por similaridade depois). */
  clientName: z.string(),
  /** Número de horas (aceita meias: 2.5). */
  hours: z.number(),
  /** Título curto do serviço prestado. */
  title: z.string(),
  /** Área quando inferível, senão null. */
  area: z.enum(AREA_VALUES).nullable(),
  /** Data do trabalho YYYY-MM-DD quando mencionada, senão null. */
  workDate: z.string().nullable(),
  /** Confiança da extração (0–1) para acionar a fila de revisão. */
  confidence: z.number(),
});

export type VoiceEntry = z.infer<typeof VoiceEntrySchema>;

const SYSTEM_PROMPT = [
  "Você converte mensagens de voz de um advogado em lançamentos de horas estruturados.",
  "Extraia o nome do cliente, o número de horas (aceite meias, ex.: 2.5), um título curto do serviço,",
  "a área jurídica quando der para inferir, e a data quando mencionada (YYYY-MM-DD).",
  "Defina confidence (0–1) refletindo o quão claro foi o áudio: baixa quando o nome do cliente ou as horas ficaram ambíguos.",
  "Não invente dados. Se a data não foi dita, retorne null.",
].join(" ");

/** Extrai os campos do lançamento a partir do texto transcrito. */
export async function extractTimeEntryFromTranscription(
  transcription: string,
  client: ParseClient = getAnthropicClient() as unknown as ParseClient,
): Promise<VoiceEntry> {
  const response = await client.messages.parse({
    model: MODELS.haiku,
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: `Transcrição: ${transcription}` }],
    output_config: { format: zodOutputFormat(VoiceEntrySchema) },
  });
  return VoiceEntrySchema.parse(response.parsed_output);
}

/** Limiar abaixo do qual o lançamento vai para revisão humana obrigatória. */
export const CONFIANCA_MINIMA_AUTO = 0.8;

/** Decide se o lançamento pode ser salvo direto ou precisa de revisão. */
export function precisaRevisao(entry: VoiceEntry, clienteEncontrado: boolean): boolean {
  return !clienteEncontrado || entry.confidence < CONFIANCA_MINIMA_AUTO;
}
