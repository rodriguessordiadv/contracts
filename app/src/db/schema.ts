/**
 * Schema Postgres (Supabase) — Drizzle ORM.
 *
 * Modela o domínio derivado do contrato padrão do escritório:
 * escritório (fixo) → clientes + sócios → contratos (banco de horas) →
 * lançamentos / processos → anamneses → propostas (e-mail-proposta + aceite) →
 * cobranças (ASAAS). Tabela OAB/RS e trilha de auditoria à parte.
 *
 * Convenções:
 * - dinheiro em CENTAVOS (integer) — ver src/domain/money.ts;
 * - horas em numeric(8,2);
 * - timestamps com timezone, default now();
 * - ids uuid v4 (gen_random_uuid()).
 */

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const areaEnum = pgEnum("area", [
  "civel",
  "trabalhista",
  "empresarial",
  "imobiliario",
  "familia",
  "criminal",
  "consultivo",
]);

export const complexidadeEnum = pgEnum("complexidade", ["baixa", "media", "alta"]);

export const origemLancamentoEnum = pgEnum("origem_lancamento", [
  "manual",
  "voz",
  "timer",
  "import",
]);

export const statusLancamentoEnum = pgEnum("status_lancamento", [
  "rascunho", // criado por voz/timer, aguardando revisão
  "confirmado", // revisado e debitado do banco
  "descartado",
]);

export const poloEnum = pgEnum("polo", ["ativo", "passivo"]);

export const statusPropostaEnum = pgEnum("status_proposta", [
  "rascunho",
  "enviada",
  "aceita",
  "recusada",
  "expirada",
]);

export const statusCobrancaEnum = pgEnum("status_cobranca", [
  "pendente",
  "confirmada",
  "recebida",
  "vencida",
  "estornada",
  "cancelada",
]);

export const tipoCobrancaEnum = pgEnum("tipo_cobranca", ["pix", "boleto", "cartao", "link"]);

export const statusContratoEnum = pgEnum("status_contrato", [
  "rascunho",
  "ativo",
  "suspenso",
  "encerrado",
]);

// ---------------------------------------------------------------------------
// Usuários (auth) — minimal; integra com Supabase Auth depois
// ---------------------------------------------------------------------------

export const usuarios = pgTable("usuarios", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email", { length: 320 }).notNull().unique(),
  nome: text("nome"),
  oab: varchar("oab", { length: 32 }),
  role: varchar("role", { length: 32 }).notNull().default("advogado"),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Escritório (CONTRATADA) — normalmente um único registro fixo
// ---------------------------------------------------------------------------

export const escritorio = pgTable("escritorio", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  razaoSocial: text("razao_social").notNull(),
  oabSociedade: varchar("oab_sociedade", { length: 32 }),
  cnpj: varchar("cnpj", { length: 18 }),
  endereco: text("endereco"),
  email: varchar("email", { length: 320 }),
  responsavelNome: text("responsavel_nome"),
  responsavelOab: varchar("responsavel_oab", { length: 32 }),
  responsavelCpf: varchar("responsavel_cpf", { length: 14 }),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Clientes (CONTRATANTE)
// ---------------------------------------------------------------------------

export const clientes = pgTable("clientes", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  razaoSocial: text("razao_social").notNull(),
  nomeFantasia: text("nome_fantasia"),
  tipoPessoa: varchar("tipo_pessoa", { length: 2 }).notNull().default("PJ"), // PF | PJ
  cpfCnpj: varchar("cpf_cnpj", { length: 18 }),
  nire: varchar("nire", { length: 32 }),
  endereco: text("endereco"),
  email: varchar("email", { length: 320 }),
  telefone: varchar("telefone", { length: 32 }),
  /** id do cliente no ASAAS, quando sincronizado. */
  asaasCustomerId: varchar("asaas_customer_id", { length: 64 }),
  /** Natureza do negócio (mini-anamnese / perfil). */
  naturezaNegocio: text("natureza_negocio"),
  ativo: boolean("ativo").notNull().default(true),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
});

/** Sócios / representantes do cliente (extraídos do contrato). */
export const socios = pgTable("socios", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  nome: text("nome").notNull(),
  cpf: varchar("cpf", { length: 14 }),
  rg: varchar("rg", { length: 32 }),
  qualificacao: text("qualificacao"), // ex.: sócio-administrador
  isAdministrador: boolean("is_administrador").notNull().default(false),
  isSignatario: boolean("is_signatario").notNull().default(false),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Contratos — parâmetros do banco de horas (Cláusula 1ª/2ª)
// ---------------------------------------------------------------------------

export const contratos = pgTable("contratos", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  /** Número CNTR (ex.: CNTR000262). */
  numeroCntr: varchar("numero_cntr", { length: 16 }).unique(),
  status: statusContratoEnum("status").notNull().default("rascunho"),

  // Banco de horas (Cláusula 1ª)
  horasMensais: numeric("horas_mensais", { precision: 8, scale: 2 }).notNull(),
  valorMensalCentavos: integer("valor_mensal_centavos").notNull(),
  valorHoraTecnicaCentavos: integer("valor_hora_tecnica_centavos").notNull(),
  /** Preço da hora extra em 3 níveis: { padrao, naoCumulacao, naoCumulacaoQuitaAteDia10 }. */
  precoHoraExtra: jsonb("preco_hora_extra").notNull(),
  acumulavel: boolean("acumulavel").notNull().default(true),
  diaVencimento: integer("dia_vencimento").notNull().default(10),
  /** Regra de reajuste: { mesAniversario, indices[], criterio }. */
  reajuste: jsonb("reajuste"),
  /** Regra de mora: { multa, jurosMes, correcao }. */
  mora: jsonb("mora"),
  areas: areaEnum("areas").array(),
  exitoPadrao: numeric("exito_padrao", { precision: 5, scale: 4 }).notNull().default("0.25"),
  prazoMinimoMeses: integer("prazo_minimo_meses").notNull().default(12),

  // Vigência / assinatura
  dataAssinatura: date("data_assinatura"),
  vigenciaInicio: date("vigencia_inicio"),
  /** A contagem de horas começa a partir desta data (assinatura/aceite). */
  inicioContagem: date("inicio_contagem"),

  // Proveniência
  arquivoUrl: text("arquivo_url"), // PDF do contrato assinado
  hashAssinatura: varchar("hash_assinatura", { length: 128 }),
  extracaoBruta: jsonb("extracao_bruta"), // saída crua da extração por Claude

  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Processos / ações vinculadas
// ---------------------------------------------------------------------------

export const processos = pgTable("processos", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  contratoId: uuid("contrato_id").references(() => contratos.id, { onDelete: "set null" }),
  numeroCnj: varchar("numero_cnj", { length: 32 }),
  tribunal: text("tribunal"),
  area: areaEnum("area"),
  polo: poloEnum("polo"),
  parteContraria: text("parte_contraria"),
  descricao: text("descricao"),
  /** Valor mínimo de honorários fixado (ref. OAB/RS), em centavos. */
  valorMinimoCentavos: integer("valor_minimo_centavos"),
  percentualExito: numeric("percentual_exito", { precision: 5, scale: 4 }),
  ativo: boolean("ativo").notNull().default(true),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Lançamentos de horas (débitos do banco)
// ---------------------------------------------------------------------------

export const lancamentos = pgTable("lancamentos", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  contratoId: uuid("contrato_id").references(() => contratos.id, { onDelete: "set null" }),
  processoId: uuid("processo_id").references(() => processos.id, { onDelete: "set null" }),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  horas: numeric("horas", { precision: 8, scale: 2 }).notNull(),
  data: date("data").notNull(),
  area: areaEnum("area"),
  complexidade: complexidadeEnum("complexidade"),
  origem: origemLancamentoEnum("origem").notNull().default("manual"),
  status: statusLancamentoEnum("status").notNull().default("confirmado"),
  /** Confiança da IA (0–1) para lançamentos por voz. */
  confiancaIa: numeric("confianca_ia", { precision: 4, scale: 3 }),
  /** Transcrição original, quando origem = voz. */
  transcricao: text("transcricao"),
  criadoPor: uuid("criado_por").references(() => usuarios.id, { onDelete: "set null" }),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Anamnese (avaliação do caso / natureza do negócio)
// ---------------------------------------------------------------------------

export const anamneses = pgTable("anamneses", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  processoId: uuid("processo_id").references(() => processos.id, { onDelete: "set null" }),
  naturezaNegocio: text("natureza_negocio"),
  area: areaEnum("area"),
  complexidade: complexidadeEnum("complexidade"),
  urgencia: varchar("urgencia", { length: 16 }), // baixa | media | alta
  recorrente: boolean("recorrente"),
  /** Perguntas/respostas da anamnese conduzida pela IA. */
  respostas: jsonb("respostas"),
  resumo: text("resumo"),
  horasEstimadas: numeric("horas_estimadas", { precision: 8, scale: 2 }),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Propostas (e-mail-proposta) + aceite (Cláusula 2ª)
// ---------------------------------------------------------------------------

export const propostas = pgTable("propostas", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  processoId: uuid("processo_id").references(() => processos.id, { onDelete: "set null" }),
  anamneseId: uuid("anamnese_id").references(() => anamneses.id, { onDelete: "set null" }),
  status: statusPropostaEnum("status").notNull().default("rascunho"),

  // Precificação
  horasPropostas: numeric("horas_propostas", { precision: 8, scale: 2 }),
  valorReferenciaOabCentavos: integer("valor_referencia_oab_centavos"),
  desconto: numeric("desconto", { precision: 5, scale: 4 }),
  valorPropostoCentavos: integer("valor_proposto_centavos"),
  equivalenteHoras: numeric("equivalente_horas", { precision: 8, scale: 2 }),
  percentualExito: numeric("percentual_exito", { precision: 5, scale: 4 }),

  // Conteúdo
  assunto: text("assunto"),
  corpoEmail: text("corpo_email"),
  corpoMarkdown: text("corpo_markdown"),

  // Aceite (Cláusula 2ª + Cláusula 11ª comunicações eletrônicas)
  tokenAceite: varchar("token_aceite", { length: 64 }).unique(),
  enviadaEm: timestamp("enviada_em", { withTimezone: true }),
  aceitaEm: timestamp("aceita_em", { withTimezone: true }),
  aceiteIp: varchar("aceite_ip", { length: 64 }),
  aceitePor: text("aceite_por"),
  validaAte: timestamp("valida_ate", { withTimezone: true }),

  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Cobranças (espelho ASAAS)
// ---------------------------------------------------------------------------

export const cobrancas = pgTable("cobrancas", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id, { onDelete: "cascade" }),
  contratoId: uuid("contrato_id").references(() => contratos.id, { onDelete: "set null" }),
  propostaId: uuid("proposta_id").references(() => propostas.id, { onDelete: "set null" }),
  /** id da cobrança no ASAAS. */
  asaasPaymentId: varchar("asaas_payment_id", { length: 64 }),
  tipo: tipoCobrancaEnum("tipo").notNull().default("pix"),
  status: statusCobrancaEnum("status").notNull().default("pendente"),
  valorCentavos: integer("valor_centavos").notNull(),
  vencimento: date("vencimento"),
  descricao: text("descricao"),
  linkPagamento: text("link_pagamento"),
  pixQrCode: text("pix_qr_code"),
  competencia: varchar("competencia", { length: 7 }), // YYYY-MM (mensalidade)
  pagoEm: timestamp("pago_em", { withTimezone: true }),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Tabela de Honorários da OAB/RS (referência)
// ---------------------------------------------------------------------------

export const tabelaOab = pgTable("tabela_oab", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  seccional: varchar("seccional", { length: 8 }).notNull().default("RS"),
  vigencia: varchar("vigencia", { length: 16 }), // ex.: "2025"
  area: areaEnum("area"),
  item: text("item").notNull(), // descrição do ato/demanda
  /** Valor mínimo de referência em centavos (quando fixo). */
  valorMinimoCentavos: integer("valor_minimo_centavos"),
  /** Percentual sobre proveito/valor da causa, quando aplicável. */
  percentual: numeric("percentual", { precision: 6, scale: 4 }),
  unidade: varchar("unidade", { length: 32 }), // ex.: "por ato", "% da causa", "hora"
  observacao: text("observacao"),
  fonte: text("fonte"),
});

// ---------------------------------------------------------------------------
// Trilha de auditoria
// ---------------------------------------------------------------------------

export const auditoria = pgTable("auditoria", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  entidade: varchar("entidade", { length: 64 }).notNull(), // ex.: "lancamento"
  entidadeId: uuid("entidade_id"),
  acao: varchar("acao", { length: 64 }).notNull(), // criou | confirmou | editou | enviou | aceitou
  ator: varchar("ator", { length: 128 }), // usuário ou "ia"
  detalhe: jsonb("detalhe"),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const clientesRelations = relations(clientes, ({ many }) => ({
  socios: many(socios),
  contratos: many(contratos),
  processos: many(processos),
  lancamentos: many(lancamentos),
  propostas: many(propostas),
  cobrancas: many(cobrancas),
}));

export const sociosRelations = relations(socios, ({ one }) => ({
  cliente: one(clientes, { fields: [socios.clienteId], references: [clientes.id] }),
}));

export const contratosRelations = relations(contratos, ({ one, many }) => ({
  cliente: one(clientes, { fields: [contratos.clienteId], references: [clientes.id] }),
  lancamentos: many(lancamentos),
  processos: many(processos),
}));

export const processosRelations = relations(processos, ({ one, many }) => ({
  cliente: one(clientes, { fields: [processos.clienteId], references: [clientes.id] }),
  contrato: one(contratos, { fields: [processos.contratoId], references: [contratos.id] }),
  lancamentos: many(lancamentos),
}));

export const lancamentosRelations = relations(lancamentos, ({ one }) => ({
  cliente: one(clientes, { fields: [lancamentos.clienteId], references: [clientes.id] }),
  contrato: one(contratos, { fields: [lancamentos.contratoId], references: [contratos.id] }),
  processo: one(processos, { fields: [lancamentos.processoId], references: [processos.id] }),
}));

export const propostasRelations = relations(propostas, ({ one }) => ({
  cliente: one(clientes, { fields: [propostas.clienteId], references: [clientes.id] }),
  processo: one(processos, { fields: [propostas.processoId], references: [processos.id] }),
  anamnese: one(anamneses, { fields: [propostas.anamneseId], references: [anamneses.id] }),
}));

export const cobrancasRelations = relations(cobrancas, ({ one }) => ({
  cliente: one(clientes, { fields: [cobrancas.clienteId], references: [clientes.id] }),
  contrato: one(contratos, { fields: [cobrancas.contratoId], references: [contratos.id] }),
  proposta: one(propostas, { fields: [cobrancas.propostaId], references: [propostas.id] }),
}));
