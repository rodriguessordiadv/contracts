import Link from "next/link";
import { Badge, Card, formatHoras } from "@/components/ui";
import { formatarBRL } from "@/domain/money";
import { AREAS_LABEL, CLIENTES, saldoAtual } from "@/mock/seed";

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">Clientes</h1>
          <p className="mt-1 text-sm text-slate-500">Cadastro a partir do contrato assinado</p>
        </div>
        <button className="rounded-lg border border-navy-900 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-50">
          + Importar contrato (PDF)
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CLIENTES.map((c) => {
          const saldo = saldoAtual(c.id)!;
          return (
            <Card key={c.id}>
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/clientes/${c.id}`} className="text-base font-semibold text-navy-700 hover:underline">
                    {c.nomeFantasia ?? c.razaoSocial}
                  </Link>
                  <div className="text-xs text-slate-400">
                    {c.cpfCnpj} · {c.numeroCntr}
                  </div>
                </div>
                <Badge tone="gold">{formatarBRL(c.parametros.valorMensal)}/mês</Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.parametros.areas.map((a) => (
                  <Badge key={a} tone="muted">
                    {AREAS_LABEL[a]}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                <span className="text-slate-500">
                  Banco: {formatHoras(c.parametros.horasMensais)}/mês
                </span>
                <span className={saldo.saldoFinal < 0 ? "font-medium text-red-600" : "font-medium text-emerald-600"}>
                  Saldo {formatHoras(saldo.saldoFinal)}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
