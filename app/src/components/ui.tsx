import type { ReactNode } from "react";

export function Card({
  title,
  children,
  action,
}: {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {title && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <h2 className="text-sm font-semibold tracking-wide text-navy-900">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "warn" | "good";
}) {
  const toneCls =
    tone === "warn" ? "text-red-600" : tone === "good" ? "text-emerald-600" : "text-navy-900";
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${toneCls}`}>{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "gold" | "warn" | "good" | "muted";
}) {
  const map: Record<string, string> = {
    default: "bg-navy-50 text-navy-700",
    gold: "bg-gold-500/15 text-gold-600",
    warn: "bg-red-50 text-red-600",
    good: "bg-emerald-50 text-emerald-700",
    muted: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

export function formatHoras(h: number): string {
  return `${h.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} h`;
}
