/**
 * Dados de exemplo para o frontend rodar sem banco. Usa os tipos e o motor de
 * domínio reais (cálculo de saldo de horas, etc.), incluindo o contrato real
 * CNTR000262. Quando plugarmos o Supabase, estas estruturas saem da query.
 */

import { CNTR000262 } from "../data/contratoExemplo";
import { reais } from "../domain/money";
import { projetarSaldo } from "../domain/hourBank";
import type { Area, Lancamento, ParametrosBancoHoras } from "../domain/types";

export interface ClienteMock {
  id: string;
  razaoSocial: string;
  nomeFantasia?: string;
  cpfCnpj: string;
  email: string;
  numeroCntr: string;
  parametros: ParametrosBancoHoras;
  ativo: boolean;
}

export interface LancamentoMock extends Lancamento {
  id: string;
  clienteId: string;
  competencia: string; // YYYY-MM
  status: "rascunho" | "confirmado";
  confiancaIa?: number;
}

function params(over: Partial<ParametrosBancoHoras>): ParametrosBancoHoras {
  return {
    horasMensais: 4,
    valorMensal: reais(2000),
    valorHoraTecnica: reais(500),
    precoHoraExtra: { padrao: reais(500), naoCumulacao: reais(480), naoCumulacaoQuitaAteDia10: reais(460) },
    acumulavel: true,
    diaVencimento: 10,
    reajuste: { mesAniversario: 1, indices: ["IPCA", "IGPM"], criterio: "maior_beneficio_contratada" },
    mora: { multa: 0.2, jurosMes: 0.01, correcao: "IGPM" },
    areas: ["civel", "consultivo"],
    exitoPadrao: 0.25,
    prazoMinimoMesesAproveitamento: 12,
    ...over,
  };
}

export const ESCRITORIO = {
  razaoSocial: "Rodrigues & Sordi Advogados",
  oab: "OAB/RS 5.283",
  responsavel: "Sávio Radé Sordi — OAB/RS 93.284",
  cidade: "Porto Alegre/RS",
};

export const CLIENTES: ClienteMock[] = [
  {
    id: "rs-energia",
    razaoSocial: "RS Energia e Automação Ltda",
    nomeFantasia: "RS Energias",
    cpfCnpj: "46.647.982/0001-09",
    email: "financeiro@rgsenergia.com.br",
    numeroCntr: "CNTR000262",
    parametros: CNTR000262,
    ativo: true,
  },
  {
    id: "marcelo-severo",
    razaoSocial: "Marcelo Gonçalves Severo",
    cpfCnpj: "898.218.400-78",
    email: "marcelo@example.com",
    numeroCntr: "CNTR000231",
    parametros: params({ horasMensais: 5, valorMensal: reais(2500), areas: ["civel", "empresarial"] }),
    ativo: true,
  },
  {
    id: "santa-clara",
    razaoSocial: "Cooperativa Santa Clara Ltda",
    cpfCnpj: "87.456.030/0001-22",
    email: "juridico@santaclara.coop.br",
    numeroCntr: "CNTR000247",
    parametros: params({ horasMensais: 8, valorMensal: reais(4000), areas: ["civel", "trabalhista", "empresarial"] }),
    ativo: true,
  },
];

export const LANCAMENTOS: LancamentoMock[] = [
  { id: "l1", clienteId: "rs-energia", competencia: "2026-06", data: "2026-06-05", titulo: "Análise de contrato de fornecimento", horas: 1.5, area: "empresarial", origem: "manual", status: "confirmado" },
  { id: "l2", clienteId: "rs-energia", competencia: "2026-06", data: "2026-06-18", titulo: "Defesa em reclamatória trabalhista (RT 0020621-45)", horas: 2.5, area: "trabalhista", origem: "voz", status: "confirmado", confiancaIa: 0.91 },
  { id: "l3", clienteId: "rs-energia", competencia: "2026-06", data: "2026-06-26", titulo: "Reunião e orientação societária", horas: 1, area: "consultivo", origem: "timer", status: "rascunho", confiancaIa: 0.74 },
  { id: "l4", clienteId: "marcelo-severo", competencia: "2026-06", data: "2026-06-10", titulo: "Contestação em IDPJ (EIXOSUL)", horas: 6, area: "civel", origem: "manual", status: "confirmado" },
  { id: "l5", clienteId: "santa-clara", competencia: "2026-06", data: "2026-06-12", titulo: "Manifestação técnica fase saneadora", horas: 4, area: "civel", origem: "manual", status: "confirmado" },
];

export function getCliente(id: string): ClienteMock | undefined {
  return CLIENTES.find((c) => c.id === id);
}

export function lancamentosDoCliente(id: string): LancamentoMock[] {
  return LANCAMENTOS.filter((l) => l.clienteId === id);
}

export interface ResumoSaldo {
  competencia: string;
  horasContratadas: number;
  horasConsumidas: number;
  horasDisponiveis: number;
  saldoFinal: number;
  horasExtras: number;
}

/** Calcula o saldo da competência atual de um cliente, com o motor real. */
export function saldoAtual(id: string, competencia = "2026-06"): ResumoSaldo | null {
  const cliente = getCliente(id);
  if (!cliente) return null;
  const consumidas = lancamentosDoCliente(id)
    .filter((l) => l.competencia === competencia && l.status === "confirmado")
    .reduce((acc, l) => acc + l.horas, 0);

  const [r] = projetarSaldo(cliente.parametros, [
    { competencia, horasContratadas: cliente.parametros.horasMensais, horasConsumidas: consumidas },
  ]);
  if (!r) return null;
  return {
    competencia,
    horasContratadas: cliente.parametros.horasMensais,
    horasConsumidas: r.horasConsumidas,
    horasDisponiveis: r.horasDisponiveis,
    saldoFinal: r.saldoFinal,
    horasExtras: r.horasExtras,
  };
}

export const AREAS_LABEL: Record<Area, string> = {
  civel: "Cível",
  trabalhista: "Trabalhista",
  empresarial: "Empresarial",
  imobiliario: "Imobiliário",
  familia: "Família",
  criminal: "Criminal",
  consultivo: "Consultivo",
};
