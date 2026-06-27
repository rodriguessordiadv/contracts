import { Badge, Card, formatHoras, Stat } from "@/components/ui";
import { formatarBRL } from "@/domain/money";
import { custoHorasExtras } from "@/domain/pricing";
import { TABELA_OAB_RS, VIGENCIA_TABELA } from "@/data/tabelaOabRs";
import { CLIENTES, saldoAtual } from "@/mock/seed";

const AUDITORIA = [
  { quando: "26/06 14:32", ator: "Sávio", acao: "Lançamento confirmado", det: "RS Energia · 1,5h · análise contratual" },
  { quando: "26/06 11:08", ator: "IA (voz)", acao: "Lançamento criado p/ revisão", det: "RS Energia · 2,5h · confiança 91%" },
  { quando: "25/06 09:19", ator: "Leandro de Rosa", acao: "Aceite de proposta", det: "CNTR000262 · IP 186.219.130.230" },
  { quando: "24/06 12:31", ator: "Sávio", acao: "Contrato importado", det: "CNTR000262 extraído e cadastrado" },
];

const COBRANCAS = [
  { cliente: "RS Energia", tipo: "PIX", valor: 126000, venc: "10/07", status: "pendente" },
  { cliente: "Marcelo Severo", tipo: "Boleto", valor: 250000, venc: "10/07", status: "pendente" },
  { cliente: "Santa Clara", tipo: "PIX", valor: 400000, venc: "05/07", status: "confirmada" },
];

export default function PainelPage() {
  const extras = CLIENTES.map((c) => {
    const s = saldoAtual(c.id)!;
    return { cliente: c, horasExtras: s.horasExtras, custo: s.horasExtras > 0 ? custoHorasExtras(c.parametros, s.horasExtras, "acumula") : 0 };
  });
  const totalExtras = extras.reduce((a, e) => a + e.custo, 0);
  const totalFixo = CLIENTES.reduce((a, c) => a + c.parametros.valorMensal, 0);
  const aReceber = COBRANCAS.filter((c) => c.status === "pendente").reduce((a, c) => a + c.valor, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-navy-900">Painel de controle</h1>
        <p className="mt-1 text-sm text-slate-500">Faturamento, horas extras, cobranças e auditoria</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Mensalidades fixas" value={formatarBRL(totalFixo)} hint="recorrente/mês" />
        <Stat label="Horas extras a cobrar" value={formatarBRL(totalExtras)} tone={totalExtras > 0 ? "warn" : "good"} />
        <Stat label="A receber (ASAAS)" value={formatarBRL(aReceber)} hint="pendente" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Horas extras por cliente">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {extras.map((e) => (
                <tr key={e.cliente.id}>
                  <td className="py-2.5 font-medium text-navy-900">{e.cliente.nomeFantasia ?? e.cliente.razaoSocial}</td>
                  <td className="py-2.5 text-right text-slate-500">{e.horasExtras > 0 ? formatHoras(e.horasExtras) : "—"}</td>
                  <td className="py-2.5 text-right font-medium">{e.custo > 0 ? formatarBRL(e.custo) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Cobranças (ASAAS)">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {COBRANCAS.map((c, i) => (
                <tr key={i}>
                  <td className="py-2.5 font-medium text-navy-900">{c.cliente}</td>
                  <td className="py-2.5 text-slate-500">{c.tipo}</td>
                  <td className="py-2.5 text-slate-500">venc. {c.venc}</td>
                  <td className="py-2.5 text-right">{formatarBRL(c.valor)}</td>
                  <td className="py-2.5 text-right">
                    {c.status === "confirmada" ? <Badge tone="good">recebida</Badge> : <Badge tone="gold">pendente</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-slate-400">Espelho do ASAAS — liga de verdade com a API key (sandbox já guardada).</p>
        </Card>
      </div>

      <Card title={`Tabela de Honorários OAB/RS — ${VIGENCIA_TABELA}`}>
        <div className="max-h-72 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="sticky top-0 bg-white text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-2">Código</th>
                <th className="pb-2">Seção</th>
                <th className="pb-2">Item</th>
                <th className="pb-2 text-right">Mínimo</th>
                <th className="pb-2 text-right">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TABELA_OAB_RS.map((i) => (
                <tr key={i.codigo}>
                  <td className="py-2 text-slate-400">{i.codigo}</td>
                  <td className="py-2 text-slate-500">{i.secao}</td>
                  <td className="py-2 text-navy-900">{i.descricao}</td>
                  <td className="py-2 text-right">{i.valorMinimo != null ? formatarBRL(i.valorMinimo) : "—"}</td>
                  <td className="py-2 text-right text-slate-500">{i.percentual != null ? `${Math.round(i.percentual * 100)}%` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Trilha de auditoria">
        <ul className="space-y-2 text-sm">
          {AUDITORIA.map((a, i) => (
            <li key={i} className="flex items-center gap-3 border-b border-slate-50 pb-2 last:border-0">
              <span className="w-20 shrink-0 text-xs text-slate-400">{a.quando}</span>
              <Badge tone="muted">{a.ator}</Badge>
              <span className="font-medium text-navy-900">{a.acao}</span>
              <span className="text-slate-500">— {a.det}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
