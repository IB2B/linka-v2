import type { Product, ProductField } from "@/types/product";

// The optional details that make promo posts specific. Name, link and pitch
// aren't counted: name and pitch are required, the link is just a link.
const DETAILS: ProductField[] = [
  "audience", "problem", "alternatives", "features", "differentiators",
  "pricing", "proof", "cta", "avoid", "knowledge",
];

export function productCompleteness(product: Product): { filled: number; total: number } {
  const filled = DETAILS.filter((k) => (product[k] ?? "").trim().length > 0).length;
  return { filled, total: DETAILS.length };
}
