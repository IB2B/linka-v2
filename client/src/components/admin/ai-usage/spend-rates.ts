import {
  PRICE_INPUT_PER_M, PRICE_OUTPUT_PER_M, PRICE_PER_IMAGE,
  calcTokenCost, formatTokenCount,
} from "@/lib/admin/token-cost";

export const fmtNum = new Intl.NumberFormat("en-US");
export const fmtTok = formatTokenCount;

export function fmtCost(n: number) {
  if (n === 0) return "$0";
  if (n < 0.001) return "<$0.001";
  if (n < 1) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(2)}`;
}

export const textCost = calcTokenCost;

export function imageCost(images: number) {
  return images * PRICE_PER_IMAGE;
}

export { PRICE_INPUT_PER_M, PRICE_OUTPUT_PER_M, PRICE_PER_IMAGE };
