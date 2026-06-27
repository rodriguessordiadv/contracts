-- =====================================================================
-- Seed dos sócios (perfil "socio") — Rodrigues & Sordi Advogados
-- =====================================================================
-- Fluxo seguro (sem senha em SQL):
-- 1) Crie os usuários no Supabase Auth (Dashboard > Authentication > Users >
--    "Add user", ou via convite por e-mail). Defina senha forte ou envie convite.
-- 2) Copie o UID de cada um e rode os INSERTs abaixo ligando o papel.
--    (Alternativa: o trigger handle_new_user cria a linha automaticamente como
--     'assistente'; depois promova a 'socio' com os UPDATEs.)
--
-- Sávio Radé Sordi  — OAB/RS 93.284 — savio@rs-adv.com
-- Juliana Alves Rodrigues — OAB/RS 62.221 — juliana@rs-adv.com  (confirmar e-mail)
-- =====================================================================

-- Substitua os UID pelos valores reais do Supabase Auth:
-- insert into public.usuarios (id, email, nome, oab, role, ativo) values
--   ('<UID_SAVIO>',   'savio@rs-adv.com',   'Sávio Radé Sordi',        'OAB/RS 93.284', 'socio', true),
--   ('<UID_JULIANA>', 'juliana@rs-adv.com', 'Juliana Alves Rodrigues', 'OAB/RS 62.221', 'socio', true)
-- on conflict (id) do update set role = excluded.role, ativo = excluded.ativo;

-- Ou promover quem já existe (pelo e-mail):
-- update public.usuarios set role = 'socio' where email in ('savio@rs-adv.com', 'juliana@rs-adv.com');

-- ---------------------------------------------------------------------
-- Trigger: cria a linha em public.usuarios quando alguém entra no Auth.
-- Novos usuários nascem como 'assistente' (menor privilégio). Promova manualmente.
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.usuarios (id, email, nome, role, ativo)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'nome', new.email), 'assistente', true)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
