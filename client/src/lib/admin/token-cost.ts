// Anthropic Haiku 4.5 pricing — keep in sync with the model used by
// server/src/services/post-generation.service.ts.
export const PRICE_INPUT_PER_M = 0.8;
export const PRICE_OUTPUT_PER_M = 4.0;
export const PRICE_PER_IMAGE = 0.04;

export function calcTokenCost(inputTokens: number, outputTokens: number): number {
  return (inputTokens / 1e6) * PRICE_INPUT_PER_M + (outputTokens / 1e6) * PRICE_OUTPUT_PER_M;
}

export function calcTotalCost(inputTokens: number, outputTokens: number, images: number): number {
  return calcTokenCost(inputTokens, outputTokens) + images * PRICE_PER_IMAGE;
}

export function formatTokenCost(n: number): string {
  if (n === 0) return "$0.00";
  if (n < 0.001) return "<$0.001";
  return `$${n.toFixed(n < 0.1 ? 3 : 2)}`;
}

export function formatTokenCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
