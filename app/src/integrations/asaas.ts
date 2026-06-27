/**
 * Cliente ASAAS (API REST v3) — camada financeira do app.
 *
 * Autenticação por header `access_token`. Em produção a chave vem de variável
 * de ambiente (ASAAS_API_KEY) na Vercel — nunca commitada.
 *
 * Cobre o necessário para o fluxo do escritório: clientes (customers),
 * cobranças (payments) com PIX/boleto, QR Code PIX e consulta de status.
 * Docs: https://docs.asaas.com/reference
 */

export interface AsaasConfig {
  apiKey: string;
  baseUrl?: string; // default: sandbox
}

export interface AsaasCustomer {
  id: string;
  name: string;
  cpfCnpj?: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
}

export type AsaasBillingType = "PIX" | "BOLETO" | "CREDIT_CARD" | "UNDEFINED";

export interface AsaasPaymentInput {
  customer: string; // id do customer no ASAAS
  billingType: AsaasBillingType;
  value: number; // em REAIS (o ASAAS usa reais com decimais)
  dueDate: string; // YYYY-MM-DD
  description?: string;
  externalReference?: string; // nosso id interno (proposta/cobrança)
}

export interface AsaasPayment {
  id: string;
  customer: string;
  billingType: AsaasBillingType;
  value: number;
  netValue?: number;
  status: string; // PENDING | RECEIVED | CONFIRMED | OVERDUE | ...
  dueDate: string;
  invoiceUrl?: string;
  bankSlipUrl?: string;
  description?: string;
  externalReference?: string;
}

export interface AsaasPixQrCode {
  encodedImage: string; // base64 PNG
  payload: string; // copia-e-cola
  expirationDate?: string;
}

export interface AsaasListResponse<T> {
  data: T[];
  hasMore: boolean;
  totalCount: number;
}

export class AsaasError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = "AsaasError";
  }
}

const DEFAULT_BASE_URL = "https://sandbox.asaas.com/api/v3";

export class AsaasClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(config: AsaasConfig) {
    if (!config.apiKey) {
      throw new Error("ASAAS_API_KEY ausente");
    }
    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
  }

  /** Indica se está apontando para o ambiente de homologação/sandbox. */
  get isSandbox(): boolean {
    return this.baseUrl.includes("sandbox");
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        access_token: this.apiKey,
        "User-Agent": "rs-horas",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    const parsed = text ? safeJson(text) : undefined;

    if (!res.ok) {
      const msg = extractErrorMessage(parsed) ?? `${res.status} ${res.statusText}`;
      throw new AsaasError(`ASAAS ${method} ${path} falhou: ${msg}`, res.status, parsed);
    }
    return parsed as T;
  }

  /** Dados da conta autenticada — útil para validar a chave. */
  getAccount(): Promise<Record<string, unknown>> {
    return this.request("GET", "/myAccount");
  }

  listCustomers(params?: { name?: string; cpfCnpj?: string; offset?: number; limit?: number }) {
    const qs = toQuery(params);
    return this.request<AsaasListResponse<AsaasCustomer>>("GET", `/customers${qs}`);
  }

  createCustomer(input: { name: string; cpfCnpj?: string; email?: string; mobilePhone?: string }) {
    return this.request<AsaasCustomer>("POST", "/customers", input);
  }

  /**
   * Acha um customer pelo CPF/CNPJ ou cria um novo. Útil para sincronizar a
   * base do escritório com o ASAAS sem duplicar.
   */
  async findOrCreateCustomer(input: {
    name: string;
    cpfCnpj?: string;
    email?: string;
    mobilePhone?: string;
  }): Promise<AsaasCustomer> {
    if (input.cpfCnpj) {
      const found = await this.listCustomers({ cpfCnpj: input.cpfCnpj, limit: 1 });
      if (found.data.length > 0) return found.data[0]!;
    }
    return this.createCustomer(input);
  }

  createPayment(input: AsaasPaymentInput) {
    return this.request<AsaasPayment>("POST", "/payments", input);
  }

  getPayment(id: string) {
    return this.request<AsaasPayment>("GET", `/payments/${id}`);
  }

  /** QR Code PIX (copia-e-cola + imagem) de uma cobrança. */
  getPixQrCode(paymentId: string) {
    return this.request<AsaasPixQrCode>("GET", `/payments/${paymentId}/pixQrCode`);
  }
}

function toQuery(params?: Record<string, unknown>): string {
  if (!params) return "";
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== "");
  if (entries.length === 0) return "";
  const qs = entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return `?${qs.join("&")}`;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractErrorMessage(body: unknown): string | null {
  if (body && typeof body === "object" && "errors" in body) {
    const errors = (body as { errors?: Array<{ description?: string }> }).errors;
    if (Array.isArray(errors) && errors[0]?.description) {
      return errors.map((e) => e.description).join("; ");
    }
  }
  return null;
}
