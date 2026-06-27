/**
 * Dinheiro em centavos (inteiro) para evitar erros de ponto flutuante.
 * Toda a precificação do sistema usa `Centavos`. Conversão para/de reais e
 * formatação BRL ficam concentradas aqui.
 */

export type Centavos = number;

/** Converte um valor em reais (ex.: 420 ou 1260.5) para centavos inteiros. */
export function reais(valor: number): Centavos {
  return Math.round(valor * 100);
}

/** Converte centavos para número em reais (pode ter casas decimais). */
export function emReais(centavos: Centavos): number {
  return centavos / 100;
}

/** Multiplica um valor em centavos por uma quantidade (ex.: horas), arredondando. */
export function multiplicar(centavos: Centavos, fator: number): Centavos {
  return Math.round(centavos * fator);
}

/** Aplica um percentual (0–1) sobre um valor em centavos. */
export function percentual(centavos: Centavos, taxa: number): Centavos {
  return Math.round(centavos * taxa);
}

/** Formata centavos no padrão BRL: 126000 -> "R$ 1.260,00". */
export function formatarBRL(centavos: Centavos): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(emReais(centavos));
}
