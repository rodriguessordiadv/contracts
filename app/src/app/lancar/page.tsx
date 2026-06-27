"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Card, formatHoras } from "@/components/ui";
import { casarCliente, type ClienteRef } from "@/voice/clientMatch";
import { AREAS_LABEL, CLIENTES } from "@/mock/seed";
import type { Area } from "@/domain/types";

const clientesRef: ClienteRef[] = CLIENTES.map((c) => ({
  id: c.id,
  razaoSocial: c.razaoSocial,
  nomeFantasia: c.nomeFantasia,
}));

type Aba = "voz" | "timer" | "manual";

interface Rascunho {
  clienteId: string;
  horas: number;
  titulo: string;
  area: Area | "";
  origem: "voz" | "timer" | "manual";
  confianca?: number;
}

export default function LancarPage() {
  const [aba, setAba] = useState<Aba>("voz");
  const [lancados, setLancados] = useState<Rascunho[]>([]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-navy-900">Lançar horas</h1>
        <p className="mt-1 text-sm text-slate-500">Por voz, timer ou manual — tudo cai numa revisão antes de salvar</p>
      </header>

      <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1 text-sm">
        {(["voz", "timer", "manual"] as Aba[]).map((a) => (
          <button
            key={a}
            onClick={() => setAba(a)}
            className={`flex-1 rounded-md px-3 py-2 font-medium capitalize transition ${
              aba === a ? "bg-navy-900 text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {a === "voz" ? "🎙 Voz" : a === "timer" ? "⏱ Timer" : "✎ Manual"}
          </button>
        ))}
      </div>

      {aba === "voz" && <AbaVoz onRascunho={(r) => setLancados((l) => [r, ...l])} />}
      {aba === "timer" && <AbaTimer onRascunho={(r) => setLancados((l) => [r, ...l])} />}
      {aba === "manual" && <AbaManual onRascunho={(r) => setLancados((l) => [r, ...l])} />}

      {lancados.length > 0 && (
        <Card title={`Lançados nesta sessão (${lancados.length})`}>
          <ul className="space-y-2">
            {lancados.map((r, i) => {
              const c = CLIENTES.find((x) => x.id === r.clienteId);
              return (
                <li key={i} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-sm">
                  <span>
                    <span className="font-medium text-navy-900">{c?.nomeFantasia ?? c?.razaoSocial}</span> ·{" "}
                    {r.titulo} · {r.area ? AREAS_LABEL[r.area] : "—"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Badge tone="muted">{r.origem}</Badge>
                    <span className="font-semibold">{formatHoras(r.horas)}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}

function parseHoras(texto: string): number {
  const m = texto.replace(",", ".").match(/(\d+(?:\.\d+)?)\s*h/);
  if (m) return Number(m[1]);
  const m2 = texto.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
  return m2 ? Number(m2[1]) : 1;
}

function AbaVoz({ onRascunho }: { onRascunho: (r: Rascunho) => void }) {
  const [texto, setTexto] = useState("");
  const [rascunho, setRascunho] = useState<Rascunho | null>(null);

  function interpretar() {
    const horas = parseHoras(texto);
    const match = casarCliente(texto, clientesRef, 0.3);
    setRascunho({
      clienteId: match?.cliente.id ?? CLIENTES[0]!.id,
      horas,
      titulo: texto.replace(/\d+(?:[.,]\d+)?\s*h(oras?)?/i, "").trim() || "Serviço",
      area: "",
      origem: "voz",
      confianca: match ? Math.min(0.95, 0.5 + match.score / 2) : 0.4,
    });
  }

  return (
    <Card title="Lançamento por voz">
      <p className="mb-3 text-xs text-slate-500">
        A transcrição real usa Claude (Haiku) quando a chave estiver configurada. Aqui, a interpretação é simulada
        localmente para você ver o fluxo de revisão.
      </p>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder='Ex.: "duas horas e meia pro cliente RS Energia, análise de defesa trabalhista"'
        className="h-24 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-navy-700"
      />
      <button
        onClick={interpretar}
        disabled={!texto.trim()}
        className="mt-3 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
      >
        Interpretar
      </button>

      {rascunho && (
        <div className="mt-5 border-t border-slate-100 pt-5">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-navy-900">Revisar antes de salvar</h3>
            {rascunho.confianca != null && (
              <Badge tone={rascunho.confianca >= 0.8 ? "good" : "gold"}>
                IA {Math.round(rascunho.confianca * 100)}%
              </Badge>
            )}
          </div>
          <FormRascunho rascunho={rascunho} setRascunho={setRascunho} onConfirmar={onRascunho} />
        </div>
      )}
    </Card>
  );
}

function AbaTimer({ onRascunho }: { onRascunho: (r: Rascunho) => void }) {
  const [seg, setSeg] = useState(0);
  const [rodando, setRodando] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (rodando) {
      ref.current = setInterval(() => setSeg((s) => s + 1), 1000);
    } else if (ref.current) {
      clearInterval(ref.current);
    }
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [rodando]);

  const horas = Math.round((seg / 3600) * 100) / 100;
  const hh = String(Math.floor(seg / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seg % 3600) / 60)).padStart(2, "0");
  const ss = String(seg % 60).padStart(2, "0");

  const [rascunho, setRascunho] = useState<Rascunho | null>(null);

  return (
    <Card title="Timer nativo">
      <div className="flex flex-col items-center py-4">
        <div className="font-mono text-5xl font-semibold tracking-tight text-navy-900">
          {hh}:{mm}:{ss}
        </div>
        <div className="mt-1 text-sm text-slate-500">≈ {formatHoras(horas)}</div>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => setRodando((r) => !r)}
            className={`rounded-lg px-5 py-2 text-sm font-semibold text-white ${rodando ? "bg-red-600" : "bg-emerald-600"}`}
          >
            {rodando ? "Pausar" : seg > 0 ? "Continuar" : "Iniciar"}
          </button>
          <button
            onClick={() => {
              setRodando(false);
              setRascunho({ clienteId: CLIENTES[0]!.id, horas: Math.max(horas, 0.25), titulo: "", area: "", origem: "timer" });
            }}
            disabled={seg === 0}
            className="rounded-lg border border-navy-900 px-5 py-2 text-sm font-semibold text-navy-900 disabled:opacity-40"
          >
            Lançar
          </button>
          <button onClick={() => setSeg(0)} className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:text-slate-800">
            Zerar
          </button>
        </div>
      </div>
      {rascunho && (
        <div className="border-t border-slate-100 pt-5">
          <FormRascunho rascunho={rascunho} setRascunho={setRascunho} onConfirmar={onRascunho} />
        </div>
      )}
    </Card>
  );
}

function AbaManual({ onRascunho }: { onRascunho: (r: Rascunho) => void }) {
  const [rascunho, setRascunho] = useState<Rascunho>({
    clienteId: CLIENTES[0]!.id,
    horas: 1,
    titulo: "",
    area: "",
    origem: "manual",
  });
  return (
    <Card title="Lançamento manual">
      <FormRascunho rascunho={rascunho} setRascunho={setRascunho} onConfirmar={onRascunho} resetApos />
    </Card>
  );
}

function FormRascunho({
  rascunho,
  setRascunho,
  onConfirmar,
  resetApos,
}: {
  rascunho: Rascunho;
  setRascunho: (r: Rascunho | null) => void;
  onConfirmar: (r: Rascunho) => void;
  resetApos?: boolean;
}) {
  const r = rascunho;
  const set = (patch: Partial<Rascunho>) => setRascunho({ ...r, ...patch });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-slate-500">Cliente</span>
        <select
          value={r.clienteId}
          onChange={(e) => set({ clienteId: e.target.value })}
          className="w-full rounded-lg border border-slate-300 p-2 outline-none focus:border-navy-700"
        >
          {CLIENTES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nomeFantasia ?? c.razaoSocial}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-slate-500">Horas</span>
        <input
          type="number"
          step="0.25"
          value={r.horas}
          onChange={(e) => set({ horas: Number(e.target.value) })}
          className="w-full rounded-lg border border-slate-300 p-2 outline-none focus:border-navy-700"
        />
      </label>
      <label className="text-sm sm:col-span-2">
        <span className="mb-1 block text-xs font-medium text-slate-500">Título</span>
        <input
          value={r.titulo}
          onChange={(e) => set({ titulo: e.target.value })}
          placeholder="Descrição do serviço"
          className="w-full rounded-lg border border-slate-300 p-2 outline-none focus:border-navy-700"
        />
      </label>
      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-slate-500">Área</span>
        <select
          value={r.area}
          onChange={(e) => set({ area: e.target.value as Area | "" })}
          className="w-full rounded-lg border border-slate-300 p-2 outline-none focus:border-navy-700"
        >
          <option value="">—</option>
          {(Object.keys(AREAS_LABEL) as Area[]).map((a) => (
            <option key={a} value={a}>
              {AREAS_LABEL[a]}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-end">
        <button
          onClick={() => {
            if (!r.titulo.trim()) return;
            onConfirmar(r);
            if (resetApos) setRascunho({ ...r, titulo: "", horas: 1, area: "" });
            else setRascunho(null);
          }}
          disabled={!r.titulo.trim()}
          className="w-full rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-400 disabled:opacity-40"
        >
          Confirmar lançamento
        </button>
      </div>
    </div>
  );
}
