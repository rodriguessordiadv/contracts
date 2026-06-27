/** Variáveis de ambiente públicas/seguras do app. Segredos ficam só no servidor. */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Quando o Supabase não está configurado, o app roda em "modo demonstração":
 * dados mock, sem login, acesso como sócio. Em produção (com env), a
 * autenticação e a RLS valem normalmente.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
