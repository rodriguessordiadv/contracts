import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServer } from "@/lib/supabase/server";
import type { Role } from "./permissions";

/** Papel do usuário atual (server-side). Em modo demo, retorna "socio". */
export async function getCurrentRole(): Promise<Role | null> {
  if (!isSupabaseConfigured()) return "socio";
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("usuarios")
    .select("role, ativo")
    .eq("id", user.id)
    .maybeSingle();
  if (!data || data.ativo === false) return null;
  return data.role as Role;
}

/** E-mail do usuário atual (ou null em modo demo / deslogado). */
export async function getCurrentUserEmail(): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email ?? null;
}
