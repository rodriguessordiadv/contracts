"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/env";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const demo = !isSupabaseConfigured();

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const supabase = createSupabaseBrowser();
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) {
        setErro("E-mail ou senha inválidos.");
        return;
      }
      router.push("/");
      router.refresh();
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="text-xl font-semibold text-navy-900">R&amp;S Horas</div>
          <div className="mt-1 text-xs text-gold-600">Rodrigues &amp; Sordi Advogados</div>
        </div>

        {demo ? (
          <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-700">
            Modo demonstração: o Supabase ainda não está configurado, então o login está desativado e o app abre com
            dados de exemplo.
            <button
              onClick={() => router.push("/")}
              className="mt-3 w-full rounded-lg bg-navy-900 px-4 py-2 font-semibold text-white"
            >
              Entrar na demonstração
            </button>
          </div>
        ) : (
          <form onSubmit={entrar} className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-500">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-navy-700"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs font-medium text-slate-500">Senha</span>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-navy-700"
              />
            </label>
            {erro && <p className="text-sm text-red-600">{erro}</p>}
            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-lg bg-gold-500 px-4 py-2.5 font-semibold text-navy-900 hover:bg-gold-400 disabled:opacity-50"
            >
              {carregando ? "Entrando…" : "Entrar"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">Acesso restrito · dados sob sigilo profissional</p>
      </div>
    </div>
  );
}
