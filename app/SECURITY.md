# Segurança — R&S Horas

Dados de clientes sob **sigilo profissional** (LGPD + Estatuto da Advocacia).
Segurança pragmática: poucas camadas, todas reais. Sem burocracia desnecessária.

## Papéis (RBAC)

| Papel | Quem | Pode |
|---|---|---|
| **Sócio** | Sávio Radé Sordi, Juliana Alves Rodrigues | Tudo: dashboard, financeiro, propostas, contratos, usuários, exclusões |
| **Assistente** | (opcional, no futuro) | Só lançar/preencher: lançamentos, clientes (editar), processos, anamneses. **Sem** dashboard, financeiro, propostas, usuários, exclusões |

Fonte única: `src/auth/permissions.ts` (matriz testada). Servidor, RLS e UI derivam dela.

## Camadas

1. **Autenticação** — Supabase Auth, e-mail + senha (hash bcrypt gerido pelo Supabase). **MFA recomendado** para os sócios (ativar no painel do Supabase). Sessão em cookie httpOnly/secure.
2. **Autorização no servidor** — middleware do Next checa `rotaPermitida(role, path)` em toda requisição. Nada depende de esconder botão no front.
3. **RLS no Postgres** — `drizzle/security/rls_policies.sql`. Mesmo com a chave anon vazada, o banco só entrega dado a usuário **autenticado e ativo**, conforme o papel. Tabelas financeiras (`propostas`, `cobrancas`) e `auditoria` de leitura: **só sócio**.
4. **Segredos** — `ANTHROPIC_API_KEY`, `ASAAS_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` etc. **só** em variáveis de ambiente na Vercel. Nunca no Git (ver `.gitignore`), nunca no bundle do navegador. A `service_role` (bypassa RLS) só em rotas de servidor confiáveis.
5. **Transporte** — HTTPS no domínio próprio (Vercel + DNS). HSTS habilitado.
6. **Auditoria** — tabela `auditoria` append-only registra quem fez o quê (lançou, confirmou, enviou proposta, aceitou). Leitura restrita a sócio.

## Chaves do Supabase (3 tipos — não confundir)

| Chave | Onde | Risco |
|---|---|---|
| `anon` (publishable) | navegador + servidor | respeita RLS — ok expor no front |
| `service_role` | **só** servidor (env) | **bypassa RLS** — nunca no front/Git |
| `JWT secret` | gerido pelo Supabase | não tocar |

## Como ativar (quando o projeto Supabase existir)

1. Criar projeto Supabase; aplicar migração `0000_*` (tabelas) e depois `security/rls_policies.sql`.
2. Criar os usuários no Auth (Sávio, Juliana) com senha forte ou convite por e-mail; ativar MFA.
3. Rodar `security/seed_socios.sql` para ligar os UIDs ao papel `socio` (o trigger cria novos como `assistente`).
4. Configurar env vars na Vercel (nunca commitar).
5. Apontar o domínio próprio para a Vercel (HTTPS automático).

## Boas práticas adotadas

- Menor privilégio por padrão: novo usuário nasce `assistente`; rota não mapeada exige sócio (deny-by-default).
- Senhas nunca trafegam/armazenam em texto; reset por e-mail.
- Sem dados sensíveis em logs; chave ASAAS mascarada em diagnósticos.
- Aceite de proposta registra IP + data/hora (não-repúdio leve).
