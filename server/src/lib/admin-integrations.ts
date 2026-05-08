export type IntegrationStatus = {
  key: string;
  label: string;
  category: "ai" | "billing" | "social" | "search";
  configured: boolean;
};

const INTEGRATIONS: Omit<IntegrationStatus, "configured">[] = [
  { key: "late",      label: "Late API",  category: "social"  },
  { key: "stripe",    label: "Stripe",    category: "billing" },
  { key: "openai",    label: "OpenAI",    category: "ai"      },
  { key: "anthropic", label: "Anthropic", category: "ai"      },
  { key: "gemini",    label: "Gemini",    category: "ai"      },
  { key: "imagine",   label: "Imagine",   category: "ai"      },
  { key: "tavily",    label: "Tavily",    category: "search"  },
];

const ENV_VARS: Record<string, string[]> = {
  late: ["LATE_API_KEY"],
  stripe: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
  openai: ["OPENAI_API_KEY"],
  anthropic: ["ANTHROPIC_API_KEY"],
  gemini: ["GEMINI_API_KEY", "GOOGLE_AI_API_KEY"],
  imagine: ["IMAGINE_API_KEY"],
  tavily: ["TAVILY_API_KEY"],
};

export function listIntegrations(): IntegrationStatus[] {
  return INTEGRATIONS.map((i) => ({
    ...i,
    configured: ENV_VARS[i.key].some((v) => (process.env[v] ?? "").length > 0),
  }));
}
