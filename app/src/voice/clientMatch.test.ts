import { describe, expect, it } from "vitest";
import { casarCliente, type ClienteRef, normalizar, similaridade } from "./clientMatch";

const clientes: ClienteRef[] = [
  { id: "1", razaoSocial: "RS Energia e Automação Ltda", nomeFantasia: "RS Energias" },
  { id: "2", razaoSocial: "Marcelo Gonçalves Severo" },
  { id: "3", razaoSocial: "Cooperativa Santa Clara Ltda" },
];

describe("normalizar", () => {
  it("remove acentos, pontuação e sufixos societários", () => {
    expect(normalizar("RS Energia e Automação Ltda.")).toBe("rs energia e automacao");
    expect(normalizar("Cooperativa Santa Clara LTDA")).toBe("cooperativa santa clara");
  });
});

describe("similaridade", () => {
  it("dá alta similaridade para nome falado curto vs razão completa", () => {
    expect(similaridade("RS Energia", "RS Energia e Automação Ltda")).toBeGreaterThan(0.5);
  });
  it("dá baixa similaridade para nomes diferentes", () => {
    expect(similaridade("Marcelo Severo", "Cooperativa Santa Clara")).toBeLessThan(0.3);
  });
});

describe("casarCliente", () => {
  it("acha o cliente pela fala curta", () => {
    const m = casarCliente("RS Energia", clientes);
    expect(m?.cliente.id).toBe("1");
  });
  it("acha pelo nome fantasia", () => {
    const m = casarCliente("RS Energias", clientes);
    expect(m?.cliente.id).toBe("1");
  });
  it("retorna null quando nada passa do limiar", () => {
    expect(casarCliente("Empresa Totalmente Desconhecida XPTO", clientes)).toBeNull();
  });
});
