// Teste de conectividade com o ASAAS (sandbox). Lê app/.env manualmente para
// preservar o "$" inicial da chave. Uso: node scripts/asaas-ping.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const raw = readFileSync(join(__dirname, "..", ".env"), "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = loadEnv();
const baseUrl = (env.ASAAS_BASE_URL || "https://sandbox.asaas.com/api/v3").replace(/\/+$/, "");
const key = env.ASAAS_API_KEY;

if (!key) {
  console.error("ASAAS_API_KEY ausente no .env");
  process.exit(1);
}

console.log(`Base URL: ${baseUrl}`);
console.log(`Chave: ${key.slice(0, 12)}…${key.slice(-4)} (mascarada)`);

const res = await fetch(`${baseUrl}/myAccount`, {
  headers: { access_token: key, "User-Agent": "rs-horas", Accept: "application/json" },
});

console.log(`HTTP ${res.status} ${res.statusText}`);
const text = await res.text();
try {
  const json = JSON.parse(text);
  // Mostra um resumo seguro da conta, sem despejar tudo
  const resumo = {
    name: json.name,
    email: json.email,
    companyType: json.companyType,
    cpfCnpj: json.cpfCnpj,
    walletId: json.walletId ? "presente" : undefined,
  };
  console.log("Conta:", JSON.stringify(resumo, null, 2));
} catch {
  console.log("Resposta:", text.slice(0, 500));
}
