// Every editable product column with its max length. The model, the zod schema
// and the website import all read this one list.
export const PRODUCT_FIELDS = {
  name: 120,
  url: 500,
  pitch: 300,
  audience: 300,
  problem: 500,
  alternatives: 500,
  features: 2000,
  differentiators: 2000,
  pricing: 500,
  proof: 2000,
  cta: 200,
  avoid: 500,
  knowledge: 50_000,
} as const;

export type ProductField = keyof typeof PRODUCT_FIELDS;
export const PRODUCT_FIELD_NAMES = Object.keys(PRODUCT_FIELDS) as ProductField[];

// name and pitch are required; everything else may be empty.
export type ProductInput = { name: string; pitch: string }
  & Partial<Record<Exclude<ProductField, "name" | "pitch">, string | null>>;

export type Product = { id: string } & Record<ProductField, string | null> & {
  name: string; pitch: string;
};

// Values in PRODUCT_FIELD_NAMES order. Empty strings are stored as NULL so
// "not filled in" has one meaning.
export function productValues(p: ProductInput): (string | null)[] {
  return PRODUCT_FIELD_NAMES.map((k) => (p[k as keyof ProductInput] as string | null | undefined) || null);
}
