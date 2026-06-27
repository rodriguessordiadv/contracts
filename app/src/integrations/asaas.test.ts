import { afterEach, describe, expect, it, vi } from "vitest";
import { AsaasClient, AsaasError } from "./asaas";

function mockFetch(responses: Array<{ ok?: boolean; status?: number; body: unknown }>) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  let i = 0;
  const fn = vi.fn(async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    const r = responses[Math.min(i, responses.length - 1)]!;
    i += 1;
    return {
      ok: r.ok ?? true,
      status: r.status ?? 200,
      statusText: "",
      text: async () => JSON.stringify(r.body),
    } as Response;
  });
  vi.stubGlobal("fetch", fn);
  return calls;
}

afterEach(() => vi.unstubAllGlobals());

describe("AsaasClient", () => {
  it("envia o header access_token e detecta sandbox", async () => {
    const calls = mockFetch([{ body: { name: "R&S" } }]);
    const client = new AsaasClient({ apiKey: "$aact_hmlg_xxx" });
    expect(client.isSandbox).toBe(true);
    await client.getAccount();
    expect(calls[0]!.url).toBe("https://sandbox.asaas.com/api/v3/myAccount");
    const headers = calls[0]!.init.headers as Record<string, string>;
    expect(headers.access_token).toBe("$aact_hmlg_xxx");
  });

  it("findOrCreateCustomer reaproveita customer existente por CPF/CNPJ", async () => {
    const calls = mockFetch([
      { body: { data: [{ id: "cus_1", name: "RS Energia" }], hasMore: false, totalCount: 1 } },
    ]);
    const client = new AsaasClient({ apiKey: "k" });
    const c = await client.findOrCreateCustomer({ name: "RS Energia", cpfCnpj: "46647982000109" });
    expect(c.id).toBe("cus_1");
    expect(calls).toHaveLength(1); // só a busca, não criou
    expect(calls[0]!.init.method).toBe("GET");
  });

  it("findOrCreateCustomer cria quando não encontra", async () => {
    const calls = mockFetch([
      { body: { data: [], hasMore: false, totalCount: 0 } },
      { body: { id: "cus_novo", name: "Novo" } },
    ]);
    const client = new AsaasClient({ apiKey: "k" });
    const c = await client.findOrCreateCustomer({ name: "Novo", cpfCnpj: "123" });
    expect(c.id).toBe("cus_novo");
    expect(calls).toHaveLength(2);
    expect(calls[1]!.init.method).toBe("POST");
  });

  it("propaga erro do ASAAS com a descrição", async () => {
    mockFetch([{ ok: false, status: 400, body: { errors: [{ description: "CPF inválido" }] } }]);
    const client = new AsaasClient({ apiKey: "k" });
    await expect(client.createCustomer({ name: "x", cpfCnpj: "0" })).rejects.toThrow(AsaasError);
    await expect(client.createCustomer({ name: "x", cpfCnpj: "0" })).rejects.toThrow("CPF inválido");
  });
});
