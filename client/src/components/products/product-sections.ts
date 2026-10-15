import type { ProductField } from "@/types/product";

export type ProductFieldMeta = {
  name: ProductField;
  label: string;
  placeholder: string;
  hint?: string;
  rows?: number;
  required?: boolean;
};

export type ProductSectionMeta = { title: string; fields: ProductFieldMeta[] };

// The sheet's sections, top to bottom. Name and link sit above them as inputs.
export const PRODUCT_SECTIONS: ProductSectionMeta[] = [
  { title: "The basics", fields: [
    { name: "pitch", label: "One-line pitch", required: true, rows: 2,
      placeholder: "Linka writes your social posts in your own voice." },
  ] },
  { title: "Who it's for", fields: [
    { name: "audience", label: "Ideal customer", rows: 2,
      placeholder: "Founders and small B2B teams who don't have time to post." },
    { name: "problem", label: "Their main problem", rows: 2,
      placeholder: "They know they should post, but writing every day eats hours." },
    { name: "alternatives", label: "What they use today instead", rows: 2,
      placeholder: "ChatGPT plus copy-paste, a freelancer, or not posting at all." },
  ] },
  { title: "The product", fields: [
    { name: "features", label: "Key features and benefits", rows: 4,
      placeholder: "One per line:\nWrites posts in your voice\nSchedules to 5 platforms" },
    { name: "differentiators", label: "What makes it different", rows: 3,
      placeholder: "Learns your voice from your old posts, so nothing sounds like AI." },
    { name: "pricing", label: "Pricing", rows: 1, placeholder: "Free plan, then from $29/month" },
    { name: "proof", label: "Proof", rows: 3,
      hint: "Real results, customer names or quotes. The AI never makes these up.",
      placeholder: "200+ founders use it\n\"I post daily now in 10 minutes\" — Sara, CEO at Acme" },
  ] },
  { title: "How to talk about it", fields: [
    { name: "cta", label: "Call to action", rows: 1,
      hint: "What readers should do. Leave blank for a simple \"try it\".",
      placeholder: "Start free for 7 days" },
    { name: "avoid", label: "Words or claims to avoid", rows: 2,
      placeholder: "Don't say \"revolutionary\". Don't mention competitors by name." },
  ] },
];
