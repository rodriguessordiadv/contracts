/**
 * Mini-anamnese do caso — avaliação assistida por Claude (Sonnet).
 *
 * A partir da descrição do caso (e da natureza do negócio do cliente), a IA
 * classifica área, complexidade, urgência e recorrência, resume o caso, sugere a
 * peça e o item da Tabela OAB/RS de referência, e estima as horas. Alimenta o
 * motor de proposta.
 */

import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { TABELA_OAB_RS } from "../data/tabelaOabRs";
import { horasSugeridas } from "../data/tabelaHoras";
import { getAnthropicClient, MODELS, type ParseClient } from "../integrations/anthropic";
import type { Complexidade } from "../domain/types";

const AREA_VALUES = [
  "civel",
  "trabalhista",
  "empresarial",
  "imobiliario",
  "familia",
  "criminal",
  "consultivo",
] as const;

export const AnamneseSchema = z.object({
  naturezaNegocio: z.string().nullable(),
  area: z.enum(AREA_VALUES),
  complexidade: z.enum(["baixa", "media", "alta"]),
  urgencia: z.enum(["baixa", "media", "alta"]),
  recorrente: z.boolean(),
  polo: z.enum(["ativo", "passivo"]).nullable(),
  /** Nome da peça/atividade (idealmente igual a um item da tabela de horas). */
  pecaSugerida: z.string().nullable(),
  /** Código do item da Tabela OAB/RS de referência (ex.: "8.0b"). */
  itemOabSugerido: z.string().nullable(),
  resumo: z.string(),
  /** Estimativa de horas pela IA (cruzada depois com a tabela forense). */
  horasEstimadas: z.number(),
});

export type AnamneseResultado = z.infer<typeof AnamneseSchema>;

const codigosOab = TABELA_OAB_RS.map((i) => `${i.codigo} (${i.descricao})`).join("; ");

const SYSTEM_PROMPT = [
  "Você conduz a avaliação (anamnese) de um caso jurídico para o escritório Rodrigues & Sordi (Porto Alegre/RS).",
  "Classifique área, complexidade (baixa/média/alta), urgência e se é demanda recorrente; identifique o polo (ativo/passivo) quando aplicável;",
  "resuma o caso de forma objetiva (estilo gaúcho forense, direto); sugira a peça/atividade principal e o item da Tabela OAB/RS de referência.",
  "Estime as horas técnicas necessárias. Itens OAB/RS disponíveis: " + codigosOab,
].join(" ");

/** Conduz a anamnese a partir da descrição livre do caso. */
export async function conduzirAnamnese(
  descricao: string,
  naturezaNegocio?: string | null,
  client: ParseClient = getAnthropicClient() as unknown as ParseClient,
): Promise<AnamneseResultado> {
  const contexto = naturezaNegocio
    ? `Natureza do negócio do cliente: ${naturezaNegocio}\n\nCaso: ${descricao}`
    : `Caso: ${descricao}`;

  const response = await client.messages.parse({
    model: MODELS.sonnet,
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: contexto }],
    output_config: { format: zodOutputFormat(AnamneseSchema) },
  });
  return AnamneseSchema.parse(response.parsed_output);
}

/**
 * Concilia a estimativa de horas da IA com a tabela forense interna: se a peça
 * sugerida bate com a tabela, usa o ponto médio da faixa daquela complexidade
 * como âncora; caso contrário, mantém a estimativa da IA.
 */
export function horasAncoradas(anamnese: AnamneseResultado): number {
  if (!anamnese.pecaSugerida) return anamnese.horasEstimadas;
  const daTabela = horasSugeridas(anamnese.pecaSugerida, anamnese.complexidade as Complexidade);
  return daTabela ?? anamnese.horasEstimadas;
}
