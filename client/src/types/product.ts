// Mirrors GET /api/products. A product the user promotes, usually their own SaaS.
export type ProductField =
  | "name" | "url" | "pitch" | "audience" | "problem" | "alternatives"
  | "features" | "differentiators" | "pricing" | "proof" | "cta" | "avoid" | "knowledge";

export type Product = { id: string; name: string; pitch: string }
  & Record<Exclude<ProductField, "name" | "pitch">, string | null>;

// Form state: every field as a string ("" = not filled in).
export type ProductDraft = Record<ProductField, string>;
