import { describe, expect, it } from "vitest";
import { reais } from "../domain/money";
import { itemOab } from "../data/tabelaOabRs";
import { gerarProposta, precificarProposta, registrarAceite, type PropostaInput } from "./proposta";

const base: PropostaInput = {
  clienteNome: "RS Energia e Automação Ltda",
  demanda: "Reclamatória trabalhista — defesa",
  numeroCnj: "0020621-45.2026.5.04.0333",
  polo: "passivo",
  valorReferenciaOAB: reais(2500), // OAB 8.0b patrocínio do reclamado
  desconto: 0.3,
  valorHoraTecnica: reais(420),
  percentualExito: 0.25,
};

describe("precificarProposta", () => {
  it("calcula sugerido, equivalente em horas e suprime êxito no polo passivo", () => {
    const p = precificarProposta(base);
    expect(p.precoCheioOAB).toBe(reais(2500));
    expect(p.precoSugerido).toBe(reais(1750)); // 30% abaixo
    expect(p.equivalenteHoras).toBeCloseTo(4.17, 2); // 1750/420
    expect(p.exitoDevido).toBe(false);
    expect(p.exitoMotivoNaoDevido).toBe("polo_passivo");
    expect(p.alertaAviltamento?.nivel).toBe("info");
  });

  it("calcula êxito no polo ativo com proveito informado", () => {
    const p = precificarProposta({
      ...base,
      polo: "ativo",
      proveitoEstimado: reais(100000),
    });
    expect(p.exitoDevido).toBe(true);
    expect(p.valorExitoEstimado).toBe(reais(25000));
  });

  it("reconcilia o crédito das horas do banco com o valor mínimo", () => {
    const p = precificarProposta({ ...base, horasDoBancoNaAcao: 2 });
    // mínimo sugerido 1750; crédito 2×420=840; diferença 910
    expect(p.diferencaAposCreditoHoras).toBe(reais(910));
  });
});

describe("gerarProposta", () => {
  it("gera assunto, corpo e token; corpo cita referência OAB e valor proposto", () => {
    const r = gerarProposta(base, { gerarToken: () => "TOKEN-FIXO" });
    expect(r.tokenAceite).toBe("TOKEN-FIXO");
    expect(r.assunto).toContain("RS Energia");
    expect(r.corpoMarkdown).toContain("Tabela de Honorários da OAB/RS");
    expect(r.corpoMarkdown).toContain("R$");
    expect(r.corpoMarkdown).toContain("Aceite");
  });
});

describe("registrarAceite", () => {
  it("registra com token válido", () => {
    const a = registrarAceite(
      { tokenAceite: "T1" },
      { token: "T1", por: "Leandro de Rosa", em: "2026-06-25T09:19:00Z", ip: "186.219.130.230" },
    );
    expect(a.aceitePor).toBe("Leandro de Rosa");
    expect(a.aceitaEm).toBe("2026-06-25T09:19:00Z");
  });
  it("rejeita token inválido", () => {
    expect(() =>
      registrarAceite({ tokenAceite: "T1" }, { token: "X", por: "x", em: "2026-01-01T00:00:00Z" }),
    ).toThrow("Token de aceite inválido");
  });
});

describe("tabela OAB/RS", () => {
  it("tem o item do patrocínio do reclamado (8.0b) com valor e percentual", () => {
    const i = itemOab("8.0b");
    expect(i?.valorMinimo).toBe(reais(2500));
    expect(i?.percentual).toBe(0.2);
  });
});
