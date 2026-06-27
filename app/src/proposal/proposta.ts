/**
 * E-mail-proposta com aceite (Cláusula 2ª do contrato padrão).
 *
 * Monta a proposta de honorários de uma ação a partir da anamnese e do valor de
 * referência da OAB/RS: preço cheio (OAB) → sugerido (desconto 10–50%) →
 * equivalente em horas, com alerta de aviltamento, êxito e (opcional) crédito
 * das horas do banco. Gera o corpo do e-mail na voz do escritório e um token de
 * aceite rastreável.
 */

import { randomUUID } from "node:crypto";
import { formatarBRL, type Centavos } from "../domain/money";
import { precoOAB } from "../domain/pricing";
import { calcularExito, reconciliarValorMinimo, type PoloProcessual } from "../domain/proposal";

export interface PropostaInput {
  clienteNome: string;
  /** Descrição da ação/demanda (ex.: "Reclamatória trabalhista — defesa"). */
  demanda: string;
  numeroCnj?: string | null;
  polo: PoloProcessual;
  /** Valor de referência da OAB/RS (já corrigido), em centavos. */
  valorReferenciaOAB: Centavos;
  /** Desconto sobre a referência OAB (0–0.5). */
  desconto: number;
  /** Valor da hora técnica do contrato do cliente, em centavos. */
  valorHoraTecnica: Centavos;
  /** Percentual de êxito (0–1). Padrão contratual: 0.25. */
  percentualExito: number;
  /** Êxito zerado por opção (troca por mais horas). */
  exitoZerado?: boolean;
  /** Proveito econômico estimado, p/ ilustrar o êxito (centavos). Opcional. */
  proveitoEstimado?: Centavos | null;
  /** Horas do banco já consumidas/previstas na ação (p/ reconciliação). Opcional. */
  horasDoBancoNaAcao?: number | null;
}

export interface Precificacao {
  precoCheioOAB: Centavos;
  precoSugerido: Centavos;
  descontoAplicado: number;
  equivalenteHoras: number;
  alertaAviltamento: ReturnType<typeof precoOAB>["alertaAviltamento"];
  exitoDevido: boolean;
  exitoMotivoNaoDevido: ReturnType<typeof calcularExito>["motivoNaoDevido"];
  valorExitoEstimado: Centavos | null;
  /** Diferença a cobrar se as horas do banco ficarem aquém do mínimo. */
  diferencaAposCreditoHoras: Centavos | null;
}

/** Calcula toda a precificação da proposta a partir do input. */
export function precificarProposta(input: PropostaInput): Precificacao {
  const oab = precoOAB({
    valorReferenciaOAB: input.valorReferenciaOAB,
    desconto: input.desconto,
    valorHoraTecnica: input.valorHoraTecnica,
  });

  const exito = calcularExito({
    polo: input.polo,
    proveitoEconomicoBruto: input.proveitoEstimado ?? 0,
    percentualExito: input.percentualExito,
    exitoZerado: input.exitoZerado,
  });

  let diferenca: Centavos | null = null;
  if (input.horasDoBancoNaAcao != null) {
    const rec = reconciliarValorMinimo({
      valorMinimoAcao: oab.precoSugerido,
      horasConsumidasNaAcao: input.horasDoBancoNaAcao,
      valorHoraTecnica: input.valorHoraTecnica,
    });
    diferenca = rec.diferencaACobrar;
  }

  return {
    precoCheioOAB: oab.precoCheioOAB,
    precoSugerido: oab.precoSugerido,
    descontoAplicado: oab.descontoAplicado,
    equivalenteHoras: oab.equivalenteHoras,
    alertaAviltamento: oab.alertaAviltamento,
    exitoDevido: exito.devido,
    exitoMotivoNaoDevido: exito.motivoNaoDevido,
    valorExitoEstimado:
      exito.devido && input.proveitoEstimado != null ? exito.valorExito : null,
    diferencaAposCreditoHoras: diferenca,
  };
}

export interface PropostaGerada {
  assunto: string;
  corpoMarkdown: string;
  precificacao: Precificacao;
  tokenAceite: string;
}

export interface GerarPropostaOpts {
  /** Gerador de token (injeção p/ testes). Default: UUID v4. */
  gerarToken?: () => string;
}

/** Monta a proposta completa (texto + precificação + token de aceite). */
export function gerarProposta(input: PropostaInput, opts: GerarPropostaOpts = {}): PropostaGerada {
  const precificacao = precificarProposta(input);
  const tokenAceite = (opts.gerarToken ?? randomUUID)();
  const assunto = `Proposta de honorários — ${input.clienteNome} — ${input.demanda}`;
  const corpoMarkdown = montarCorpoMarkdown(input, precificacao);
  return { assunto, corpoMarkdown, precificacao, tokenAceite };
}

const pct = (v: number) => `${Math.round(v * 100)}%`;

function montarCorpoMarkdown(input: PropostaInput, p: Precificacao): string {
  const linhas: string[] = [];
  linhas.push(`# Proposta de Honorários Advocatícios`);
  linhas.push("");
  linhas.push(`**Cliente:** ${input.clienteNome}`);
  linhas.push(`**Demanda:** ${input.demanda}` + (input.numeroCnj ? ` (proc. ${input.numeroCnj})` : ""));
  linhas.push(`**Posição:** ${input.polo === "ativo" ? "polo ativo" : "polo passivo (defesa)"}`);
  linhas.push("");
  linhas.push(`Conforme a Cláusula Segunda do contrato de assessoria, segue proposta para a demanda em referência, tomando por base a Tabela de Honorários da OAB/RS.`);
  linhas.push("");
  linhas.push(`## Valores`);
  linhas.push("");
  linhas.push(`| Item | Valor |`);
  linhas.push(`| --- | ---: |`);
  linhas.push(`| Referência OAB/RS | ${formatarBRL(p.precoCheioOAB)} |`);
  linhas.push(`| **Valor proposto** (${pct(p.descontoAplicado)} abaixo da tabela) | **${formatarBRL(p.precoSugerido)}** |`);
  linhas.push(`| Equivalente em horas técnicas | ${p.equivalenteHoras.toLocaleString("pt-BR")} h |`);

  if (p.exitoDevido) {
    const exitoTxt = p.valorExitoEstimado != null ? formatarBRL(p.valorExitoEstimado) : "a apurar";
    linhas.push(`| Honorários de êxito (${pct(input.percentualExito)} sobre o proveito) | ${exitoTxt} |`);
  } else if (p.exitoMotivoNaoDevido === "polo_passivo") {
    linhas.push(`| Honorários de êxito | não aplicável (defesa, sem proveito econômico) |`);
  } else if (p.exitoMotivoNaoDevido === "exito_zerado") {
    linhas.push(`| Honorários de êxito | afastado (substituído por horas técnicas adicionais) |`);
  }

  if (p.diferencaAposCreditoHoras != null) {
    linhas.push("");
    linhas.push(
      p.diferencaAposCreditoHoras > 0
        ? `> As horas do banco contratado consumidas no patrocínio são creditadas e abatidas do valor mínimo. Diferença a complementar: **${formatarBRL(p.diferencaAposCreditoHoras)}**.`
        : `> As horas do banco contratado já cobrem o valor mínimo desta demanda — sem diferença a complementar.`,
    );
  }

  linhas.push("");
  linhas.push(`## Aceite`);
  linhas.push("");
  linhas.push(
    `A execução dos serviços ocorrerá mediante aceite expresso desta proposta, na forma das Cláusulas Segunda e Décima Primeira do contrato (comunicações eletrônicas com mesma validade de documento assinado).`,
  );
  linhas.push("");
  linhas.push(`Rodrigues & Sordi Advogados — OAB/RS`);
  return linhas.join("\n");
}

export interface Aceite {
  tokenAceite: string;
  aceitaEm: string; // ISO
  aceitePor: string;
  aceiteIp?: string | null;
}

/**
 * Registra o aceite de uma proposta. Valida o token. A data deve ser fornecida
 * (ISO) pela camada de aplicação para manter a função determinística/testável.
 */
export function registrarAceite(
  proposta: Pick<PropostaGerada, "tokenAceite">,
  dados: { token: string; por: string; em: string; ip?: string | null },
): Aceite {
  if (dados.token !== proposta.tokenAceite) {
    throw new Error("Token de aceite inválido");
  }
  return {
    tokenAceite: proposta.tokenAceite,
    aceitaEm: dados.em,
    aceitePor: dados.por,
    aceiteIp: dados.ip ?? null,
  };
}
