/**
 * RBAC — papéis e matriz de permissões do escritório.
 *
 * Dois papéis:
 *  - "socio": acesso total (Sávio Radé Sordi, Juliana Alves Rodrigues).
 *  - "assistente": apenas lançar/preencher dados; SEM dashboard, financeiro,
 *    propostas, gestão de usuários ou exclusões.
 *
 * É a fonte única de verdade: o servidor (rotas/ações), a RLS do banco e a UI
 * (navegação) derivam daqui. Não confie no front — sempre cheque no servidor.
 */

export type Role = "socio" | "assistente";

export type Permissao =
  | "dashboard:ver"
  | "painel:ver"
  | "clientes:ver"
  | "clientes:criar"
  | "clientes:editar"
  | "clientes:excluir"
  | "contratos:ver"
  | "contratos:importar"
  | "contratos:excluir"
  | "lancamentos:ver"
  | "lancamentos:criar"
  | "lancamentos:editar"
  | "lancamentos:confirmar"
  | "lancamentos:excluir"
  | "processos:ver"
  | "processos:criar"
  | "processos:editar"
  | "anamneses:ver"
  | "anamneses:criar"
  | "propostas:ver"
  | "propostas:criar"
  | "propostas:enviar"
  | "cobrancas:ver"
  | "cobrancas:criar"
  | "usuarios:gerenciar"
  | "auditoria:ver";

/** Permissões do assistente — perfil mínimo de preenchimento de dados. */
const ASSISTENTE: Permissao[] = [
  "clientes:ver",
  "clientes:editar",
  "lancamentos:ver",
  "lancamentos:criar",
  "lancamentos:editar",
  "processos:ver",
  "processos:criar",
  "processos:editar",
  "anamneses:ver",
  "anamneses:criar",
];

/** Todas as permissões (perfil sócio). */
export const TODAS_PERMISSOES: Permissao[] = [
  "dashboard:ver",
  "painel:ver",
  "clientes:ver",
  "clientes:criar",
  "clientes:editar",
  "clientes:excluir",
  "contratos:ver",
  "contratos:importar",
  "contratos:excluir",
  "lancamentos:ver",
  "lancamentos:criar",
  "lancamentos:editar",
  "lancamentos:confirmar",
  "lancamentos:excluir",
  "processos:ver",
  "processos:criar",
  "processos:editar",
  "anamneses:ver",
  "anamneses:criar",
  "propostas:ver",
  "propostas:criar",
  "propostas:enviar",
  "cobrancas:ver",
  "cobrancas:criar",
  "usuarios:gerenciar",
  "auditoria:ver",
];

const MATRIZ: Record<Role, ReadonlySet<Permissao>> = {
  socio: new Set(TODAS_PERMISSOES),
  assistente: new Set(ASSISTENTE),
};

/** True se o papel tem a permissão. */
export function can(role: Role, permissao: Permissao): boolean {
  return MATRIZ[role].has(permissao);
}

/** True se o papel tem ao menos uma das permissões. */
export function canAny(role: Role, permissoes: Permissao[]): boolean {
  return permissoes.some((p) => can(role, p));
}

/** Item de navegação com a permissão exigida para vê-lo. */
export interface NavItem {
  href: string;
  label: string;
  icon: string;
  permissao: Permissao;
}

export const NAV: NavItem[] = [
  { href: "/", label: "Dashboard", icon: "▤", permissao: "dashboard:ver" },
  { href: "/lancar", label: "Lançar horas", icon: "🎙", permissao: "lancamentos:criar" },
  { href: "/clientes", label: "Clientes", icon: "👥", permissao: "clientes:ver" },
  { href: "/propostas", label: "E-mail-proposta", icon: "✉", permissao: "propostas:ver" },
  { href: "/painel", label: "Painel", icon: "📊", permissao: "painel:ver" },
  { href: "/usuarios", label: "Usuários", icon: "🔐", permissao: "usuarios:gerenciar" },
];

/** Navegação visível para o papel. */
export function navFor(role: Role): NavItem[] {
  return NAV.filter((item) => can(role, item.permissao));
}

/**
 * Mapa de proteção de rotas (prefixo → permissão exigida). Usado pelo middleware
 * no servidor; é a checagem que realmente importa.
 */
export const ROTA_PERMISSAO: Array<{ prefixo: string; permissao: Permissao }> = [
  { prefixo: "/painel", permissao: "painel:ver" },
  { prefixo: "/usuarios", permissao: "usuarios:gerenciar" },
  { prefixo: "/propostas", permissao: "propostas:ver" },
  { prefixo: "/clientes", permissao: "clientes:ver" },
  { prefixo: "/lancar", permissao: "lancamentos:criar" },
  { prefixo: "/", permissao: "dashboard:ver" },
];

/** Resolve se um papel pode acessar um caminho. */
export function rotaPermitida(role: Role, pathname: string): boolean {
  const regra = ROTA_PERMISSAO.find((r) =>
    r.prefixo === "/" ? pathname === "/" : pathname.startsWith(r.prefixo),
  );
  // Caminho não mapeado: por segurança, exige ser sócio.
  if (!regra) return role === "socio";
  return can(role, regra.permissao);
}

/** Primeira rota que o papel pode ver (destino pós-login). */
export function rotaInicial(role: Role): string {
  return navFor(role)[0]?.href ?? "/lancar";
}
