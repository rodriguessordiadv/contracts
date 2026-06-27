import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = { name: string; value: string; options: CookieOptions };
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/env";
import { rotaInicial, rotaPermitida, type Role } from "@/auth/permissions";

const ROTAS_PUBLICAS = ["/login", "/auth"];

/**
 * Renova a sessão e aplica a autorização por papel em toda requisição.
 * Em "modo demonstração" (sem Supabase), libera tudo.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  if (!isSupabaseConfigured()) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const publica = ROTAS_PUBLICAS.some((p) => path.startsWith(p));

  // Não autenticado → login
  if (!user) {
    if (publica) return response;
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Autenticado: resolve papel (usuário ativo na tabela usuarios)
  const { data: perfil } = await supabase
    .from("usuarios")
    .select("role, ativo")
    .eq("id", user.id)
    .maybeSingle();

  // Usuário sem perfil ativo → bloqueia (desloga via /login)
  if (!perfil || perfil.ativo === false) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("erro", "sem-acesso");
    return NextResponse.redirect(url);
  }

  const role = perfil.role as Role;

  // Já logado tentando ver /login → manda para a home do papel
  if (publica) {
    const url = request.nextUrl.clone();
    url.pathname = rotaInicial(role);
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Checagem de autorização por papel (a que realmente importa)
  if (!rotaPermitida(role, path)) {
    const url = request.nextUrl.clone();
    url.pathname = rotaInicial(role);
    return NextResponse.redirect(url);
  }

  return response;
}
