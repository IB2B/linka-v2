import type { Product, ProductField } from "@/types/product";

// The optional details that make promo posts specific, most useful first.
// Name, link and pitch aren't counted: name and pitch are required.
const DETAILS: [ProductField, string][] = [
  ["audience", "Ideal customer"], ["problem", "Main problem"], ["features", "Features"],
  ["differentiators", "What makes it different"], ["proof", "Proof"], ["cta", "Call to action"],
  ["pricing", "Pricing"], ["alternatives", "Alternatives"], ["avoid", "Words to avoid"],
  ["knowledge", "Extra knowledge"],
];

export type Completeness = { filled: number; total: number; nextMissing: string | null };

export function productCompleteness(product: Product): Completeness {
  const missing = DETAILS.filter(([k]) => !(product[k] ?? "").trim());
  return {
    filled: DETAILS.length - missing.length,
    total: DETAILS.length,
    nextMissing: missing[0]?.[1] ?? null,
  };
}
