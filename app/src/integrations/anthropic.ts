/**
 * Cliente Claude (Anthropic) — cérebro de IA do app.
 *
 * Sonnet 4.6 para leitura de contrato/anamnese/redação; Haiku 4.5 para extração
 * barata de voz. A chave vem de ANTHROPIC_API_KEY (variável de ambiente, nunca
 * commitada). Em produção (Vercel) é configurada nas env vars do projeto.
 */

import Anthropic from "@anthropic-ai/sdk";

/** Model IDs (ver skill claude-api). Não anexar sufixos de data. */
export const MODELS = {
  /** Leitura de contrato, anamnese, redação de proposta. */
  sonnet: "claude-sonnet-4-6",
  /** Extração barata de campos a partir de transcrição de voz. */
  haiku: "claude-haiku-4-5",
} as const;

let _client: Anthropic | null = null;

/** True quando há chave configurada (permite degradar com elegância na UI). */
export function isAnthropicConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Retorna o cliente Anthropic, criando-o sob demanda. */
export function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY ausente. Configure a chave da Anthropic para usar a IA.",
    );
  }
  if (!_client) {
    _client = new Anthropic();
  }
  return _client;
}

/**
 * Interface mínima usada pelos extratores — permite injetar um cliente falso
 * nos testes sem depender de rede.
 */
export interface ParseClient {
  messages: {
    parse: (args: Record<string, unknown>) => Promise<{ parsed_output: unknown }>;
  };
}
