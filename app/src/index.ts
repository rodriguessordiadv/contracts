/** Ponto de entrada do núcleo de domínio R&S Horas. */

export * from "./domain/money";
export * from "./domain/types";
export * from "./domain/hourBank";
export * from "./domain/pricing";
export * from "./domain/proposal";
export * from "./data/tabelaHoras";
export { CNTR000262 } from "./data/contratoExemplo";

// Integrações e IA
export * from "./integrations/asaas";
export * from "./integrations/anthropic";
export * from "./onboarding/contractExtraction";
export * from "./voice/voiceExtraction";
export * from "./voice/clientMatch";
