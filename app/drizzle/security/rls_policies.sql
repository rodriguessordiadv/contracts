-- =====================================================================
-- R&S Horas — Políticas de Row Level Security (Supabase / Postgres)
-- =====================================================================
-- Defesa final: mesmo que o app falhe, o banco só entrega dado a usuário
-- autenticado e ativo do escritório, com o papel correto.
--
-- Papéis: 'socio' (total) e 'assistente' (lançar/preencher; sem financeiro,
-- propostas ou exclusões). Aplicar APÓS criar as tabelas (migração 0000+).
-- Idempotente: pode rodar mais de uma vez.
-- =====================================================================

-- Funções auxiliares (SECURITY DEFINER evita recursão de RLS na tabela usuarios)
create or replace function public.app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select u.role::text
  from public.usuarios u
  where u.id = auth.uid() and u.ativo = true
  limit 1
$$;

create or replace function public.is_socio()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.app_role() = 'socio'
$$;

create or replace function public.is_firm()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.app_role() is not null
$$;

-- Habilita RLS em todas as tabelas de domínio
alter table public.usuarios          enable row level security;
alter table public.escritorio        enable row level security;
alter table public.clientes          enable row level security;
alter table public.socios            enable row level security;
alter table public.contratos         enable row level security;
alter table public.processos         enable row level security;
alter table public.lancamentos       enable row level security;
alter table public.anamneses         enable row level security;
alter table public.propostas         enable row level security;
alter table public.cobrancas         enable row level security;
alter table public.tabela_oab        enable row level security;
alter table public.auditoria         enable row level security;

-- ---------------------------------------------------------------------
-- usuarios: cada um vê a si; sócio vê/gerencia todos
-- ---------------------------------------------------------------------
drop policy if exists usuarios_select on public.usuarios;
create policy usuarios_select on public.usuarios for select
  using (id = auth.uid() or public.is_socio());

drop policy if exists usuarios_write on public.usuarios;
create policy usuarios_write on public.usuarios for all
  using (public.is_socio()) with check (public.is_socio());

-- ---------------------------------------------------------------------
-- Helper macro (manual): leitura para qualquer usuário do escritório,
-- escrita conforme o papel. Aplicado tabela a tabela abaixo.
-- ---------------------------------------------------------------------

-- escritorio: leitura por todos do escritório; escrita só sócio
drop policy if exists escritorio_read on public.escritorio;
create policy escritorio_read on public.escritorio for select using (public.is_firm());
drop policy if exists escritorio_write on public.escritorio;
create policy escritorio_write on public.escritorio for all using (public.is_socio()) with check (public.is_socio());

-- clientes: leitura por todos; assistente pode inserir/editar; excluir só sócio
drop policy if exists clientes_read on public.clientes;
create policy clientes_read on public.clientes for select using (public.is_firm());
drop policy if exists clientes_ins on public.clientes;
create policy clientes_ins on public.clientes for insert with check (public.is_firm());
drop policy if exists clientes_upd on public.clientes;
create policy clientes_upd on public.clientes for update using (public.is_firm()) with check (public.is_firm());
drop policy if exists clientes_del on public.clientes;
create policy clientes_del on public.clientes for delete using (public.is_socio());

-- socios (representantes do cliente): leitura todos; escrita sócio
drop policy if exists socios_read on public.socios;
create policy socios_read on public.socios for select using (public.is_firm());
drop policy if exists socios_write on public.socios;
create policy socios_write on public.socios for all using (public.is_socio()) with check (public.is_socio());

-- contratos: leitura todos; escrita só sócio (importar/editar/excluir é ato do sócio)
drop policy if exists contratos_read on public.contratos;
create policy contratos_read on public.contratos for select using (public.is_firm());
drop policy if exists contratos_write on public.contratos;
create policy contratos_write on public.contratos for all using (public.is_socio()) with check (public.is_socio());

-- processos: leitura todos; assistente cria/edita; exclui só sócio
drop policy if exists processos_read on public.processos;
create policy processos_read on public.processos for select using (public.is_firm());
drop policy if exists processos_ins on public.processos;
create policy processos_ins on public.processos for insert with check (public.is_firm());
drop policy if exists processos_upd on public.processos;
create policy processos_upd on public.processos for update using (public.is_firm()) with check (public.is_firm());
drop policy if exists processos_del on public.processos;
create policy processos_del on public.processos for delete using (public.is_socio());

-- lancamentos: leitura todos; assistente cria/edita; confirmar/excluir só sócio
-- (status confirmado e exclusão são controlados na aplicação + sócio)
drop policy if exists lancamentos_read on public.lancamentos;
create policy lancamentos_read on public.lancamentos for select using (public.is_firm());
drop policy if exists lancamentos_ins on public.lancamentos;
create policy lancamentos_ins on public.lancamentos for insert with check (public.is_firm());
drop policy if exists lancamentos_upd on public.lancamentos;
create policy lancamentos_upd on public.lancamentos for update using (public.is_firm()) with check (public.is_firm());
drop policy if exists lancamentos_del on public.lancamentos;
create policy lancamentos_del on public.lancamentos for delete using (public.is_socio());

-- anamneses: leitura todos; assistente cria; editar/excluir só sócio
drop policy if exists anamneses_read on public.anamneses;
create policy anamneses_read on public.anamneses for select using (public.is_firm());
drop policy if exists anamneses_ins on public.anamneses;
create policy anamneses_ins on public.anamneses for insert with check (public.is_firm());
drop policy if exists anamneses_write on public.anamneses;
create policy anamneses_write on public.anamneses for update using (public.is_socio()) with check (public.is_socio());

-- propostas: SÓ SÓCIO (precificação/honorários)
drop policy if exists propostas_all on public.propostas;
create policy propostas_all on public.propostas for all using (public.is_socio()) with check (public.is_socio());

-- cobrancas: SÓ SÓCIO (financeiro / ASAAS)
drop policy if exists cobrancas_all on public.cobrancas;
create policy cobrancas_all on public.cobrancas for all using (public.is_socio()) with check (public.is_socio());

-- tabela_oab: leitura todos; escrita sócio
drop policy if exists tabela_oab_read on public.tabela_oab;
create policy tabela_oab_read on public.tabela_oab for select using (public.is_firm());
drop policy if exists tabela_oab_write on public.tabela_oab;
create policy tabela_oab_write on public.tabela_oab for all using (public.is_socio()) with check (public.is_socio());

-- auditoria: leitura só sócio; inserção por qualquer usuário do escritório
-- (todos geram trilha; só sócio audita). Nunca update/delete (append-only).
drop policy if exists auditoria_read on public.auditoria;
create policy auditoria_read on public.auditoria for select using (public.is_socio());
drop policy if exists auditoria_ins on public.auditoria;
create policy auditoria_ins on public.auditoria for insert with check (public.is_firm());

-- =====================================================================
-- Observações:
-- 1) A service_role key (usada só no backend, nunca no navegador) BYPASSA a RLS
--    por padrão no Supabase — use-a apenas em rotas de servidor confiáveis.
-- 2) O app usa a chave anon + sessão do usuário no servidor; a RLS então vale.
-- 3) Mantenha auth.users e public.usuarios em sincronia (trigger abaixo).
-- =====================================================================
