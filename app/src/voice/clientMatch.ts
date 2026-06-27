/**
 * Casamento de cliente por similaridade — para voz, onde o nome é falado e pode
 * não bater exatamente com o cadastro (ex.: "RS Energia" vs "RS Energia e
 * Automação Ltda"). Substitui o casamento por nome exato, que era frágil.
 */

export interface ClienteRef {
  id: string;
  razaoSocial: string;
  nomeFantasia?: string | null;
}

export interface MatchResult {
  cliente: ClienteRef;
  score: number; // 0–1
}

/** Normaliza: minúsculas, sem acentos, sem pontuação, sem sufixos societários. */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos
    .replace(/\bltda\b|\bs\.?a\.?\b|\bme\b|\beireli\b|\bepp\b/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(texto: string): string[] {
  return normalizar(texto).split(" ").filter(Boolean);
}

/** Similaridade por sobreposição de tokens (Jaccard) + bônus de prefixo. */
export function similaridade(a: string, b: string): number {
  const ta = new Set(tokens(a));
  const tb = new Set(tokens(b));
  if (ta.size === 0 || tb.size === 0) return 0;

  let intersec = 0;
  for (const t of ta) if (tb.has(t)) intersec += 1;
  const uniao = new Set([...ta, ...tb]).size;
  const jaccard = intersec / uniao;

  // Bônus quando um nome é prefixo/subconjunto do outro (fala curta vs razão completa)
  const na = normalizar(a);
  const nb = normalizar(b);
  const contido = na.includes(nb) || nb.includes(na) ? 0.2 : 0;

  return Math.min(1, jaccard + contido);
}

/**
 * Acha o melhor cliente para um nome falado. Retorna null se nada passar do
 * limiar (nesse caso a UI pede confirmação ou cadastro).
 */
export function casarCliente(
  nomeFalado: string,
  clientes: ClienteRef[],
  limiar = 0.5,
): MatchResult | null {
  let melhor: MatchResult | null = null;

  for (const cliente of clientes) {
    const scoreRazao = similaridade(nomeFalado, cliente.razaoSocial);
    const scoreFantasia = cliente.nomeFantasia
      ? similaridade(nomeFalado, cliente.nomeFantasia)
      : 0;
    const score = Math.max(scoreRazao, scoreFantasia);

    if (!melhor || score > melhor.score) {
      melhor = { cliente, score };
    }
  }

  return melhor && melhor.score >= limiar ? melhor : null;
}
