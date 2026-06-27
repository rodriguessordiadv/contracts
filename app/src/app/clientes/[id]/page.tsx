import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Card, formatHoras, Stat } from "@/components/ui";
import { formatarBRL } from "@/domain/money";
import { custoHorasExtras } from "@/domain/pricing";
import { AREAS_LABEL, getCliente, lancamentosDoCliente, saldoAtual } from "@/mock/seed";

export default async function ClienteDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cliente = getCliente(id);
  if (!cliente) notFound();

  const p = cliente.parametros;
  const saldo = saldoAtual(id)!;
  const lancamentos = lancamentosDoCliente(id);
  const custoExtra = saldo.horasExtras > 0 ? custoHorasExtras(p, saldo.horasExtras, "acumula") : 0;

  return (
    <div className="space-y-6">
      <div className="text-sm text-slate-400">
        <Link href="/clientes" className="hover:underline">
          Clientes
        </Link>{" "}
        / {cliente.nomeFantasia ?? cliente.razaoSocial}
      </div>

      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">{cliente.razaoSocial}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {cliente.cpfCnpj} · {cliente.email} · contrato {cliente.numeroCntr}
          </p>
        </div>
        <Link
          href={`/propostas?cliente=${cliente.id}`}
          className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-400"
        >
          ✉ Gerar e-mail-proposta
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Stat label="Pacote mensal" value={formatHoras(p.horasMensais)} hint={formatarBRL(p.valorMensal) + "/mês"} />
        <Stat label="Consumido" value={formatHoras(saldo.horasConsumidas)} hint={`disp. ${formatHoras(saldo.horasDisponiveis)}`} />
        <Stat label="Saldo" value={formatHoras(saldo.saldoFinal)} tone={saldo.saldoFinal < 0 ? "warn" : "good"} />
        <Stat
          label="Horas extras"
          value={saldo.horasExtras > 0 ? formatHoras(saldo.horasExtras) : "—"}
          tone={saldo.horasExtras > 0 ? "warn" : "default"}
          hint={saldo.horasExtras > 0 ? `≈ ${formatarBRL(custoExtra)} a cobrar` : undefined}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Banco de horas (contrato)">
          <dl className="space-y-2 text-sm">
            <Row k="Hora técnica" v={formatarBRL(p.valorHoraTecnica)} />
            <Row k="Hora extra (acumula)" v={formatarBRL(p.precoHoraExtra.padrao)} />
            <Row k="Hora extra (não acumula)" v={formatarBRL(p.precoHoraExtra.naoCumulacao)} />
            <Row k="Hora extra (quita até dia 10)" v={formatarBRL(p.precoHoraExtra.naoCumulacaoQuitaAteDia10)} />
            <Row k="Acumulável" v={p.acumulavel ? "Sim (1º ano)" : "Não"} />
            <Row k="Vencimento" v={`dia ${p.diaVencimento}`} />
          </dl>
        </Card>
        <Card title="Honorários e regras">
          <dl className="space-y-2 text-sm">
            <Row k="Êxito padrão" v={`${Math.round(p.exitoPadrao * 100)}%`} />
            <Row k="Reajuste" v={`${p.reajuste.indices.join(" ou ")} (mês ${p.reajuste.mesAniversario})`} />
            <Row k="Mora" v={`${Math.round(p.mora.multa * 100)}% + ${(p.mora.jurosMes * 100).toFixed(0)}% a.m. + ${p.mora.correcao}`} />
            <Row k="Prazo p/ aproveitar banco" v={`${p.prazoMinimoMesesAproveitamento} meses`} />
          </dl>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.areas.map((a) => (
              <Badge key={a} tone="muted">
                {AREAS_LABEL[a]}
              </Badge>
            ))}
          </div>
        </Card>
        <Card title="Origem">
          <p className="text-sm text-slate-600">
            Cliente cadastrado a partir do contrato assinado{" "}
            <span className="font-medium text-navy-900">{cliente.numeroCntr}</span>. A contagem de horas começou na
            vigência do contrato.
          </p>
          <div className="mt-3">
            <Badge tone="good">Contrato ativo</Badge>
          </div>
        </Card>
      </div>

      <Card title={`Lançamentos da competência (${saldo.competencia})`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="pb-2">Data</th>
              <th className="pb-2">Título</th>
              <th className="pb-2">Área</th>
              <th className="pb-2">Origem</th>
              <th className="pb-2 text-right">Horas</th>
              <th className="pb-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {lancamentos.map((l) => (
              <tr key={l.id}>
                <td className="py-2.5 text-slate-500">{l.data.slice(8)}/{l.data.slice(5, 7)}</td>
                <td className="py-2.5 font-medium text-navy-900">{l.titulo}</td>
                <td className="py-2.5">{l.area ? AREAS_LABEL[l.area] : "—"}</td>
                <td className="py-2.5 text-slate-500">{l.origem}</td>
                <td className="py-2.5 text-right">{formatHoras(l.horas)}</td>
                <td className="py-2.5 text-right">
                  {l.status === "rascunho" ? <Badge tone="gold">revisar</Badge> : <Badge tone="good">ok</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{k}</dt>
      <dd className="font-medium text-navy-900">{v}</dd>
    </div>
  );
}
