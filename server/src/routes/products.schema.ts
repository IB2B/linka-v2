import { z } from "zod";
import { PRODUCT_FIELDS } from "../models/product-fields";

const optional = (max: number) => z.string().trim().max(max).optional().nullable();

export const productSchema = z.object({
  name: z.string().trim().min(1, "Give the product a name.").max(PRODUCT_FIELDS.name),
  url: z.string().trim().max(PRODUCT_FIELDS.url).url("Use a full link, like https://yourapp.com")
    .optional().nullable().or(z.literal("")),
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
  url: z.string().trim().url("Use a full link, like https://yourapp.com")
    .refine((u) => /^https?:\/\//i.test(u), "Only http and https links work."),
});
