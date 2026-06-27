import Link from "next/link";
import { Badge, Card, formatHoras, Stat } from "@/components/ui";
import { emReais, formatarBRL } from "@/domain/money";
import { AREAS_LABEL, CLIENTES, LANCAMENTOS, saldoAtual } from "@/mock/seed";

const COMPETENCIA = "2026-06";

export default function Dashboard() {
  const saldos = CLIENTES.map((c) => ({ cliente: c, saldo: saldoAtual(c.id, COMPETENCIA)! }));
  const totalConsumidas = saldos.reduce((a, s) => a + s.saldo.horasConsumidas, 0);
  const faturamentoFixo = CLIENTES.reduce((a, c) => a + emReais(c.parametros.valorMensal), 0);
  const emEstouro = saldos.filter((s) => s.saldo.horasExtras > 0).length;
  const fila = LANCAMENTOS.filter((l) => l.status === "rascunho");

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Competência {COMPETENCIA} · banco de horas e honorários</p>
        </div>
        <Link
          href="/lancar"
          className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-900 shadow-sm transition hover:bg-gold-400"
        >
          🎙 Lançar horas
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Clientes ativos" value={CLIENTES.filter((c) => c.ativo).length} />
        <Stat label="Horas no mês" value={formatHoras(totalConsumidas)} hint={`${CLIENTES.length} clientes`} />
        <Stat label="Mensalidades fixas" value={formatarBRL(Math.round(faturamentoFixo * 100))} hint="recorrente/mês" />
        <Stat
          label="Clientes em estouro"
          value={emEstouro}
          tone={emEstouro > 0 ? "warn" : "good"}
          hint={emEstouro > 0 ? "horas extras a cobrar" : "tudo dentro do pacote"}
        />
      </div>

      <Card title="Saldo de horas por cliente">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-2">Cliente</th>
                <th className="pb-2 text-right">Contratado</th>
                <th className="pb-2 text-right">Consumido</th>
                <th className="pb-2 text-right">Saldo</th>
                <th className="pb-2 text-right">Situação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {saldos.map(({ cliente, saldo }) => (
                <tr key={cliente.id} className="hover:bg-slate-50">
                  <td className="py-3">
                    <Link href={`/clientes/${cliente.id}`} className="font-medium text-navy-700 hover:underline">
                      {cliente.nomeFantasia ?? cliente.razaoSocial}
                    </Link>
                    <div className="text-xs text-slate-400">{cliente.numeroCntr}</div>
                  </td>
                  <td className="py-3 text-right">{formatHoras(saldo.horasContratadas)}</td>
                  <td className="py-3 text-right">{formatHoras(saldo.horasConsumidas)}</td>
                  <td className={`py-3 text-right font-medium ${saldo.saldoFinal < 0 ? "text-red-600" : "text-navy-900"}`}>
                    {formatHoras(saldo.saldoFinal)}
                  </td>
                  <td className="py-3 text-right">
                    {saldo.horasExtras > 0 ? (
                      <Badge tone="warn">+{formatHoras(saldo.horasExtras)} extra</Badge>
                    ) : (
                      <Badge tone="good">dentro</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title={`Fila de revisão (${fila.length})`}>
        {fila.length === 0 ? (
          <p className="text-sm text-slate-500">Nada para revisar.</p>
        ) : (
          <ul className="space-y-3">
            {fila.map((l) => {
              const cliente = CLIENTES.find((c) => c.id === l.clienteId);
              return (
                <li key={l.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-navy-900">{l.titulo}</div>
                    <div className="text-xs text-slate-500">
                      {cliente?.nomeFantasia ?? cliente?.razaoSocial} · {formatHoras(l.horas)} ·{" "}
                      {l.area ? AREAS_LABEL[l.area] : "—"} · origem: {l.origem}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {l.confiancaIa != null && (
                      <Badge tone={l.confiancaIa >= 0.8 ? "good" : "gold"}>
                        IA {Math.round(l.confiancaIa * 100)}%
                      </Badge>
                    )}
                    <button className="rounded-md bg-navy-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-navy-800">
                      Revisar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
