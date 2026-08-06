export type Integration = {
  name: string;
  id: string;
  bg: string;
  fg: string;
  /** What it actually does in the pipeline — key under `landing.integrations.roles`. */
  role: string;
};

// Only vendors linka genuinely calls. Brands without an icon path fall back to a
// monogram in <BrandIcon />.
export const INTEGRATIONS: Integration[] = [
  { name: "Anthropic",  id: "anthropic",  bg: "#D97757", fg: "#FFFFFF", role: "text" },
  { name: "OpenAI",     id: "openai",     bg: "#0F1113", fg: "#FFFFFF", role: "image" },
  { name: "HeyGen",     id: "heygen",     bg: "#6D5FF9", fg: "#FFFFFF", role: "video" },
  { name: "Tavily",     id: "tavily",     bg: "#1A73E8", fg: "#FFFFFF", role: "trends" },
  { name: "Stripe",     id: "stripe",     bg: "#635BFF", fg: "#FFFFFF", role: "billing" },
  { name: "Cloudflare", id: "cloudflare", bg: "#F38020", fg: "#FFFFFF", role: "infra" },
];
