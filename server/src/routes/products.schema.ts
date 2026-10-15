import { z } from "zod";
import { PRODUCT_FIELDS } from "../models/product-fields";

const optional = (max: number) => z.string().trim().max(max).optional().nullable();

// "yourapp.com" → "https://yourapp.com" and http:// → https://. We never fetch
// or store plain http; any other scheme is left as is so the check rejects it.
function withHttps(v: unknown): unknown {
  if (typeof v !== "string" || !v.trim()) return v;
  const s = v.trim();
  if (/^https?:\/\//i.test(s)) return s.replace(/^https?:\/\//i, "https://");
  return /^[a-z][a-z0-9+.-]*:/i.test(s) ? s : `https://${s}`;
}

const httpsUrl = z.string().trim().max(PRODUCT_FIELDS.url)
  .refine((u) => u.startsWith("https://"), "Only secure https links work.")
  .refine((u) => { try { return new URL(u).hostname.includes("."); } catch { return false; } },
    "That doesn't look like a website link.");

export const productSchema = z.object({
  name: z.string().trim().min(1, "Give the product a name.").max(PRODUCT_FIELDS.name),
  // Empty means "no link"; anything else must be a public https address.
  url: z.preprocess((v) => (v === "" ? null : withHttps(v)), httpsUrl.nullable().optional()),
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
  url: z.preprocess(withHttps, httpsUrl),
});
