CREATE TYPE "public"."area" AS ENUM('civel', 'trabalhista', 'empresarial', 'imobiliario', 'familia', 'criminal', 'consultivo');--> statement-breakpoint
CREATE TYPE "public"."complexidade" AS ENUM('baixa', 'media', 'alta');--> statement-breakpoint
CREATE TYPE "public"."origem_lancamento" AS ENUM('manual', 'voz', 'timer', 'import');--> statement-breakpoint
CREATE TYPE "public"."polo" AS ENUM('ativo', 'passivo');--> statement-breakpoint
CREATE TYPE "public"."status_cobranca" AS ENUM('pendente', 'confirmada', 'recebida', 'vencida', 'estornada', 'cancelada');--> statement-breakpoint
CREATE TYPE "public"."status_contrato" AS ENUM('rascunho', 'ativo', 'suspenso', 'encerrado');--> statement-breakpoint
CREATE TYPE "public"."status_lancamento" AS ENUM('rascunho', 'confirmado', 'descartado');--> statement-breakpoint
CREATE TYPE "public"."status_proposta" AS ENUM('rascunho', 'enviada', 'aceita', 'recusada', 'expirada');--> statement-breakpoint
CREATE TYPE "public"."tipo_cobranca" AS ENUM('pix', 'boleto', 'cartao', 'link');--> statement-breakpoint
CREATE TABLE "anamneses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cliente_id" uuid NOT NULL,
	"processo_id" uuid,
	"natureza_negocio" text,
	"area" "area",
	"complexidade" "complexidade",
	"urgencia" varchar(16),
	"recorrente" boolean,
	"respostas" jsonb,
	"resumo" text,
	"horas_estimadas" numeric(8, 2),
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auditoria" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entidade" varchar(64) NOT NULL,
	"entidade_id" uuid,
	"acao" varchar(64) NOT NULL,
	"ator" varchar(128),
	"detalhe" jsonb,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clientes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"razao_social" text NOT NULL,
	"nome_fantasia" text,
	"tipo_pessoa" varchar(2) DEFAULT 'PJ' NOT NULL,
	"cpf_cnpj" varchar(18),
	"nire" varchar(32),
	"endereco" text,
	"email" varchar(320),
	"telefone" varchar(32),
	"asaas_customer_id" varchar(64),
	"natureza_negocio" text,
	"ativo" boolean DEFAULT true NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cobrancas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cliente_id" uuid NOT NULL,
	"contrato_id" uuid,
	"proposta_id" uuid,
	"asaas_payment_id" varchar(64),
	"tipo" "tipo_cobranca" DEFAULT 'pix' NOT NULL,
	"status" "status_cobranca" DEFAULT 'pendente' NOT NULL,
	"valor_centavos" integer NOT NULL,
	"vencimento" date,
	"descricao" text,
	"link_pagamento" text,
	"pix_qr_code" text,
	"competencia" varchar(7),
	"pago_em" timestamp with time zone,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contratos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cliente_id" uuid NOT NULL,
	"numero_cntr" varchar(16),
	"status" "status_contrato" DEFAULT 'rascunho' NOT NULL,
	"horas_mensais" numeric(8, 2) NOT NULL,
	"valor_mensal_centavos" integer NOT NULL,
	"valor_hora_tecnica_centavos" integer NOT NULL,
	"preco_hora_extra" jsonb NOT NULL,
	"acumulavel" boolean DEFAULT true NOT NULL,
	"dia_vencimento" integer DEFAULT 10 NOT NULL,
	"reajuste" jsonb,
	"mora" jsonb,
	"areas" "area"[],
	"exito_padrao" numeric(5, 4) DEFAULT '0.25' NOT NULL,
	"prazo_minimo_meses" integer DEFAULT 12 NOT NULL,
	"data_assinatura" date,
	"vigencia_inicio" date,
	"inicio_contagem" date,
	"arquivo_url" text,
	"hash_assinatura" varchar(128),
	"extracao_bruta" jsonb,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "contratos_numero_cntr_unique" UNIQUE("numero_cntr")
);
--> statement-breakpoint
CREATE TABLE "escritorio" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"razao_social" text NOT NULL,
	"oab_sociedade" varchar(32),
	"cnpj" varchar(18),
	"endereco" text,
	"email" varchar(320),
	"responsavel_nome" text,
	"responsavel_oab" varchar(32),
	"responsavel_cpf" varchar(14),
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lancamentos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cliente_id" uuid NOT NULL,
	"contrato_id" uuid,
	"processo_id" uuid,
	"titulo" text NOT NULL,
	"descricao" text,
	"horas" numeric(8, 2) NOT NULL,
	"data" date NOT NULL,
	"area" "area",
	"complexidade" "complexidade",
	"origem" "origem_lancamento" DEFAULT 'manual' NOT NULL,
	"status" "status_lancamento" DEFAULT 'confirmado' NOT NULL,
	"confianca_ia" numeric(4, 3),
	"transcricao" text,
	"criado_por" uuid,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "processos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cliente_id" uuid NOT NULL,
	"contrato_id" uuid,
	"numero_cnj" varchar(32),
	"tribunal" text,
	"area" "area",
	"polo" "polo",
	"parte_contraria" text,
	"descricao" text,
	"valor_minimo_centavos" integer,
	"percentual_exito" numeric(5, 4),
	"ativo" boolean DEFAULT true NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "propostas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cliente_id" uuid NOT NULL,
	"processo_id" uuid,
	"anamnese_id" uuid,
	"status" "status_proposta" DEFAULT 'rascunho' NOT NULL,
	"horas_propostas" numeric(8, 2),
	"valor_referencia_oab_centavos" integer,
	"desconto" numeric(5, 4),
	"valor_proposto_centavos" integer,
	"equivalente_horas" numeric(8, 2),
	"percentual_exito" numeric(5, 4),
	"assunto" text,
	"corpo_email" text,
	"corpo_markdown" text,
	"token_aceite" varchar(64),
	"enviada_em" timestamp with time zone,
	"aceita_em" timestamp with time zone,
	"aceite_ip" varchar(64),
	"aceite_por" text,
	"valida_ate" timestamp with time zone,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "propostas_token_aceite_unique" UNIQUE("token_aceite")
);
--> statement-breakpoint
CREATE TABLE "socios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cliente_id" uuid NOT NULL,
	"nome" text NOT NULL,
	"cpf" varchar(14),
	"rg" varchar(32),
	"qualificacao" text,
	"is_administrador" boolean DEFAULT false NOT NULL,
	"is_signatario" boolean DEFAULT false NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tabela_oab" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seccional" varchar(8) DEFAULT 'RS' NOT NULL,
	"vigencia" varchar(16),
	"area" "area",
	"item" text NOT NULL,
	"valor_minimo_centavos" integer,
	"percentual" numeric(6, 4),
	"unidade" varchar(32),
	"observacao" text,
	"fonte" text
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"nome" text,
	"oab" varchar(32),
	"role" varchar(32) DEFAULT 'advogado' NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "anamneses" ADD CONSTRAINT "anamneses_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "anamneses" ADD CONSTRAINT "anamneses_processo_id_processos_id_fk" FOREIGN KEY ("processo_id") REFERENCES "public"."processos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cobrancas" ADD CONSTRAINT "cobrancas_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cobrancas" ADD CONSTRAINT "cobrancas_contrato_id_contratos_id_fk" FOREIGN KEY ("contrato_id") REFERENCES "public"."contratos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cobrancas" ADD CONSTRAINT "cobrancas_proposta_id_propostas_id_fk" FOREIGN KEY ("proposta_id") REFERENCES "public"."propostas"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lancamentos" ADD CONSTRAINT "lancamentos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lancamentos" ADD CONSTRAINT "lancamentos_contrato_id_contratos_id_fk" FOREIGN KEY ("contrato_id") REFERENCES "public"."contratos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lancamentos" ADD CONSTRAINT "lancamentos_processo_id_processos_id_fk" FOREIGN KEY ("processo_id") REFERENCES "public"."processos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lancamentos" ADD CONSTRAINT "lancamentos_criado_por_usuarios_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuarios"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processos" ADD CONSTRAINT "processos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processos" ADD CONSTRAINT "processos_contrato_id_contratos_id_fk" FOREIGN KEY ("contrato_id") REFERENCES "public"."contratos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_processo_id_processos_id_fk" FOREIGN KEY ("processo_id") REFERENCES "public"."processos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_anamnese_id_anamneses_id_fk" FOREIGN KEY ("anamnese_id") REFERENCES "public"."anamneses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "socios" ADD CONSTRAINT "socios_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;