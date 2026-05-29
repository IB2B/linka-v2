export type Integration = {
  name: string;
  id: string;
  bg: string;
  fg: string;
};

export const INTEGRATIONS: Integration[] = [
  { name: "OpenAI",     id: "openai",     bg: "#0F1113", fg: "#FFFFFF" },
  { name: "Anthropic",  id: "anthropic",  bg: "#D97757", fg: "#FFFFFF" },
  { name: "Gemini",     id: "gemini",     bg: "#1A73E8", fg: "#FFFFFF" },
  { name: "Stripe",     id: "stripe",     bg: "#635BFF", fg: "#FFFFFF" },
  { name: "Cloudflare", id: "cloudflare", bg: "#F38020", fg: "#FFFFFF" },
];
