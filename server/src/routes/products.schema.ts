import { z } from "zod";
import { PRODUCT_FIELDS } from "../models/product-fields";

const optional = (max: number) => z.string().trim().max(max).optional().nullable();

// "yourapp.com" → "https://yourapp.com"; people rarely type the scheme.
const withScheme = (v: unknown) => (typeof v === "string" && v.trim() && !/^https?:\/\//i.test(v.trim())
  ? `https://${v.trim()}` : v);

export const productSchema = z.object({
  name: z.string().trim().min(1, "Give the product a name.").max(PRODUCT_FIELDS.name),
  url: z.preprocess(withScheme, z.string().trim().max(PRODUCT_FIELDS.url)
    .url("That doesn't look like a website link.").optional().nullable().or(z.literal(""))),
  pitch: z.string().trim().min(1, "Add a one-line pitch.").max(PRODUCT_FIELDS.pitch),
  audience: optional(PRODUCT_FIELDS.audience),
  problem: optional(PRODUCT_FIELDS.problem),
  alternatives: optional(PRODUCT_FIELDS.alternatives),
  features: optional(PRODUCT_FIELDS.features),
  differentiators: optional(PRODUCT_FIELDS.differentiators),
  pricing: optional(PRODUCT_FIELDS.pricing),
  proof: optional(PRODUCT_FIELDS.proof),
  cta: optional(PRODUCT_FIELDS.cta),
  avoid: optional(PRODUCT_FIELDS.avoid),
  knowledge: z.string().max(PRODUCT_FIELDS.knowledge, "The knowledge text is too long (50,000 characters max).")
    .optional().nullable(),
});

export const importSchema = z.object({
  url: z.preprocess(withScheme, z.string().trim().url("That doesn't look like a website link.")
    .refine((u) => /^https?:\/\//i.test(u), "Only http and https links work.")),
});
