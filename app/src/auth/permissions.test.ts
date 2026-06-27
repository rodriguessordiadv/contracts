import { describe, expect, it } from "vitest";
import { can, canAny, navFor, rotaInicial, rotaPermitida } from "./permissions";

describe("RBAC — sócio", () => {
  it("tem acesso total", () => {
    expect(can("socio", "painel:ver")).toBe(true);
    expect(can("socio", "cobrancas:criar")).toBe(true);
    expect(can("socio", "usuarios:gerenciar")).toBe(true);
    expect(can("socio", "lancamentos:excluir")).toBe(true);
  });
  it("vê toda a navegação", () => {
    expect(navFor("socio").map((n) => n.href)).toContain("/painel");
    expect(navFor("socio").map((n) => n.href)).toContain("/usuarios");
  });
  it("pode acessar qualquer rota", () => {
    expect(rotaPermitida("socio", "/painel")).toBe(true);
    expect(rotaPermitida("socio", "/usuarios")).toBe(true);
    expect(rotaInicial("socio")).toBe("/");
  });
});

describe("RBAC — assistente", () => {
  it("pode lançar e preencher dados", () => {
    expect(can("assistente", "lancamentos:criar")).toBe(true);
    expect(can("assistente", "clientes:editar")).toBe(true);
    expect(can("assistente", "processos:criar")).toBe(true);
  });
  it("NÃO acessa dashboard, financeiro, propostas, usuários nem exclusões", () => {
    expect(can("assistente", "dashboard:ver")).toBe(false);
    expect(can("assistente", "painel:ver")).toBe(false);
    expect(can("assistente", "cobrancas:ver")).toBe(false);
    expect(can("assistente", "propostas:ver")).toBe(false);
    expect(can("assistente", "usuarios:gerenciar")).toBe(false);
    expect(can("assistente", "lancamentos:excluir")).toBe(false);
    expect(can("assistente", "lancamentos:confirmar")).toBe(false);
  });
  it("navegação não inclui painel/dashboard/propostas/usuários", () => {
    const hrefs = navFor("assistente").map((n) => n.href);
    expect(hrefs).not.toContain("/");
    expect(hrefs).not.toContain("/painel");
    expect(hrefs).not.toContain("/propostas");
    expect(hrefs).not.toContain("/usuarios");
    expect(hrefs).toContain("/lancar");
  });
  it("é barrado nas rotas restritas e cai no Lançar pós-login", () => {
    expect(rotaPermitida("assistente", "/painel")).toBe(false);
    expect(rotaPermitida("assistente", "/")).toBe(false);
    expect(rotaPermitida("assistente", "/lancar")).toBe(true);
    expect(rotaInicial("assistente")).toBe("/lancar");
  });
  it("rota não mapeada exige ser sócio (deny-by-default)", () => {
    expect(rotaPermitida("assistente", "/rota-desconhecida")).toBe(false);
    expect(rotaPermitida("socio", "/rota-desconhecida")).toBe(true);
  });
});

describe("canAny", () => {
  it("verdadeiro com ao menos uma permissão", () => {
    expect(canAny("assistente", ["painel:ver", "lancamentos:criar"])).toBe(true);
    expect(canAny("assistente", ["painel:ver", "cobrancas:ver"])).toBe(false);
  });
});
