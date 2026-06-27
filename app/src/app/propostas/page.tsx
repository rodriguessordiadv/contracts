"use client";

import { useMemo, useState } from "react";
import { Badge, Card } from "@/components/ui";
import { formatarBRL, reais } from "@/domain/money";
import type { PoloProcessual } from "@/domain/proposal";
import { corrigirValor, TABELA_OAB_RS } from "@/data/tabelaOabRs";
import { gerarProposta } from "@/proposal/proposta";
import { CLIENTES } from "@/mock/seed";

export default function PropostasPage() {
  const [clienteId, setClienteId] = useState(CLIENTES[0]!.id);
  const [demanda, setDemanda] = useState("Reclamatória trabalhista — defesa");
  const [polo, setPolo] = useState<PoloProcessual>("passivo");
  const [codigoOab, setCodigoOab] = useState("8.0b");
  const [fator, setFator] = useState(1.9);
  const [desconto, setDesconto] = useState(0.3);
  const [proveito, setProveito] = useState(0);

  const cliente = CLIENTES.find((c) => c.id === clienteId)!;
  const item = TABELA_OAB_RS.find((i) => i.codigo === codigoOab)!;

  const proposta = useMemo(() => {
    const valorRef = corrigirValor(item.valorMinimo ?? 0, fator);
    return gerarProposta(
      {
        clienteNome: cliente.nomeFantasia ?? cliente.razaoSocial,
        demanda,
        polo,
        valorReferenciaOAB: valorRef,
        desconto,
        valorHoraTecnica: cliente.parametros.valorHoraTecnica,
        percentualExito: cliente.parametros.exitoPadrao,
        proveitoEstimado: proveito > 0 ? reais(proveito) : null,
      },
      { gerarToken: () => "preview-token" },
    );
  }, [cliente, demanda, polo, item, fator, desconto, proveito]);

  const p = proposta.precificacao;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-navy-900">E-mail-proposta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Cláusula 2ª · referência Tabela OAB/RS · desconto 10–50% · equivalente em horas · aceite
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Parâmetros">
          <div className="space-y-4">
            <Field label="Cliente">
              <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} className={inputCls}>
                {CLIENTES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nomeFantasia ?? c.razaoSocial}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Demanda">
              <input value={demanda} onChange={(e) => setDemanda(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Polo">
              <select value={polo} onChange={(e) => setPolo(e.target.value as PoloProcessual)} className={inputCls}>
                <option value="ativo">Ativo</option>
                <option value="passivo">Passivo (defesa)</option>
              </select>
            </Field>
            <Field label="Item da Tabela OAB/RS">
              <select value={codigoOab} onChange={(e) => setCodigoOab(e.target.value)} className={inputCls}>
                {TABELA_OAB_RS.filter((i) => i.valorMinimo != null).map((i) => (
                  <option key={i.codigo} value={i.codigo}>
                    {i.secao} · {i.descricao} ({formatarBRL(i.valorMinimo!)})
                  </option>
                ))}
              </select>
            </Field>
            <Field label={`Fator de correção desde 2012: ${fator.toFixed(2)}× → ${formatarBRL(corrigirValor(item.valorMinimo ?? 0, fator))}`}>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={fator}
                onChange={(e) => setFator(Number(e.target.value))}
                className="w-full"
              />
            </Field>
            <Field label={`Desconto sobre a OAB: ${Math.round(desconto * 100)}%`}>
              <input
                type="range"
                min={0}
                max={0.5}
                step={0.05}
                value={desconto}
                onChange={(e) => setDesconto(Number(e.target.value))}
                className="w-full"
              />
            </Field>
            {polo === "ativo" && (
              <Field label="Proveito econômico estimado (R$)">
                <input
                  type="number"
                  value={proveito}
                  onChange={(e) => setProveito(Number(e.target.value))}
                  className={inputCls}
                />
              </Field>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Precificação">
            <dl className="space-y-2 text-sm">
              <Linha k="Referência OAB/RS (corrigida)" v={formatarBRL(p.precoCheioOAB)} />
              <Linha k={`Valor proposto (−${Math.round(p.descontoAplicado * 100)}%)`} v={formatarBRL(p.precoSugerido)} forte />
              <Linha k="Equivalente em horas" v={`${p.equivalenteHoras.toLocaleString("pt-BR")} h`} />
              {p.exitoDevido ? (
                <Linha k="Êxito estimado" v={p.valorExitoEstimado != null ? formatarBRL(p.valorExitoEstimado) : "a apurar"} />
              ) : (
                <Linha k="Êxito" v={p.exitoMotivoNaoDevido === "polo_passivo" ? "não aplicável (defesa)" : "—"} />
              )}
            </dl>
            {p.alertaAviltamento && (
              <div className={`mt-4 rounded-lg p-3 text-xs ${p.alertaAviltamento.nivel === "atencao" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                ⚠ {p.alertaAviltamento.mensagem}
              </div>
            )}
          </Card>

          <Card title="Prévia do e-mail" action={<Badge tone="gold">aceite: 1 clique</Badge>}>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
              {proposta.corpoMarkdown}
            </pre>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800">
                Enviar por e-mail
              </button>
              <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                Copiar
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-navy-700";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function Linha({ k, v, forte }: { k: string; v: string; forte?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{k}</dt>
      <dd className={forte ? "text-base font-semibold text-navy-900" : "font-medium text-navy-900"}>{v}</dd>
    </div>
  );
}
