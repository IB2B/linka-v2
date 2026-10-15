"use client";

import { useState } from "react";
import type { Product, ProductDraft, ProductField } from "@/types/product";

const FIELDS: ProductField[] = [
  "name", "url", "pitch", "audience", "problem", "alternatives",
  "features", "differentiators", "pricing", "proof", "cta", "avoid", "knowledge",
];

function fromProduct(product: Product | null): ProductDraft {
  return Object.fromEntries(FIELDS.map((k) => [k, product?.[k] ?? ""])) as ProductDraft;
}

// Form state for the product sheet. `fill` takes website-import results but
// never overwrites something the user already typed.
export function useProductDraft(product: Product | null) {
  const [draft, setDraft] = useState<ProductDraft>(() => fromProduct(product));

  function set(field: ProductField, value: string) {
    setDraft((d) => ({ ...d, [field]: value }));
  }

  function fill(fields: Partial<ProductDraft>): number {
    let filled = 0;
    const next = { ...draft };
    for (const k of FIELDS) {
      const v = fields[k]?.trim();
      if (v && !draft[k].trim()) { next[k] = v; filled++; }
    }
    setDraft(next);
    return filled;
  }

  return { draft, set, fill };
}
