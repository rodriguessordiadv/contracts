"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navFor, type Role } from "@/auth/permissions";

export function Sidebar({ role = "socio" }: { role?: Role }) {
  const pathname = usePathname();
  const NAV = navFor(role);
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-navy-900 text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="text-lg font-semibold leading-tight">R&S Horas</div>
        <div className="mt-0.5 text-xs text-gold-400">Rodrigues &amp; Sordi Advogados</div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-500" />}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4 text-xs text-white/50">
        Porto Alegre/RS
        <br />
        OAB/RS 5.283
      </div>
    </aside>
  );
}
