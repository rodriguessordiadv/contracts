CREATE TYPE "public"."role_usuario" AS ENUM('socio', 'assistente');--> statement-breakpoint
ALTER TABLE "usuarios" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "usuarios" ALTER COLUMN "role" SET DEFAULT 'assistente'::"public"."role_usuario";--> statement-breakpoint
ALTER TABLE "usuarios" ALTER COLUMN "role" SET DATA TYPE "public"."role_usuario" USING "role"::"public"."role_usuario";--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "ativo" boolean DEFAULT true NOT NULL;