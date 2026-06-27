import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentRole } from "@/auth/session";
import "./globals.css";

export const metadata: Metadata = {
  title: "R&S Horas — Rodrigues & Sordi Advogados",
  description: "Controle de banco de horas, honorários OAB/RS e e-mail-propostas",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const role = await getCurrentRole();

  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {role ? (
          <div className="flex min-h-screen">
            <Sidebar role={role} />
            <main className="flex-1 overflow-x-hidden">
              <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
            </main>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
