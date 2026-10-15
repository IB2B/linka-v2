import type { ProductField } from "@/types/product";

export type ProductFieldMeta = {
  name: ProductField;
  label: string;
  placeholder: string;
  hint?: string;
  // Textarea height; omitted = a one-line input.
  rows?: number;
};

export type ProductSectionMeta = { title: string; description: string; fields: ProductFieldMeta[] };

// Optional sections under the basics (name, link, pitch), top to bottom.
export const PRODUCT_SECTIONS: ProductSectionMeta[] = [
  { title: "Who it's for", description: "So posts speak to the right people about their real problem.", fields: [
    { name: "audience", label: "Ideal customer", rows: 2,
      placeholder: "Founders and small B2B teams who don't have time to post." },
    { name: "problem", label: "Their main problem", rows: 2,
      placeholder: "They know they should post, but writing every day eats hours." },
    { name: "alternatives", label: "What they use today instead",
      placeholder: "ChatGPT plus copy-paste, a freelancer, or not posting at all" },
  ] },
  { title: "The product", description: "What it does and why it beats the alternatives.", fields: [
    { name: "features", label: "Key features and benefits", rows: 4,
      placeholder: "One per line:\nWrites posts in your voice\nSchedules to 5 platforms" },
    { name: "differentiators", label: "What makes it different", rows: 3,
      placeholder: "Learns your voice from your old posts, so nothing sounds like AI." },
    { name: "proof", label: "Proof", rows: 3,
      hint: "Real results, customer names or quotes. The AI never makes these up.",
      placeholder: "200+ founders use it\n\"I post daily now in 10 minutes\" — Sara, CEO at Acme" },
    { name: "pricing", label: "Pricing", placeholder: "Free plan, then from $29/month" },
  ] },
  { title: "How to talk about it", description: "The action you want and the lines not to cross.", fields: [
    { name: "cta", label: "Call to action", placeholder: "Start free for 7 days",
      hint: "Leave blank for a simple \"try it\"." },
    { name: "avoid", label: "Words or claims to avoid",
      placeholder: "Don't say \"revolutionary\". Don't name competitors." },
  ] },
];
