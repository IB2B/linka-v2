import { pingService } from "./admin-integration-ping";

export type IntegrationStatus = {
  key: string;
  label: string;
  category: "ai" | "billing" | "social" | "search" | "email";
  configured: boolean;
  reachable: boolean | null;
  latencyMs: number | null;
  error?: string;
};

const INTEGRATIONS: Pick<IntegrationStatus, "key" | "label" | "category">[] = [
  { key: "late",      label: "Late API",  category: "social"  },
  { key: "stripe",    label: "Stripe",    category: "billing" },
  { key: "smtp",      label: "Email (SMTP)", category: "email" },
  { key: "openai",    label: "OpenAI",    category: "ai"      },
  { key: "anthropic", label: "Anthropic", category: "ai"      },
  { key: "gemini",    label: "Gemini",    category: "ai"      },
  { key: "imagine",   label: "Imagine",   category: "ai"      },
  { key: "tavily",    label: "Tavily",    category: "search"  },
];

const ENV_VARS: Record<string, string[]> = {
  late: ["LATE_API_KEY"],
  stripe: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
  smtp: ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"],
  openai: ["OPENAI_API_KEY", "OPENAI_IMAGE_API_KEY"],
  anthropic: ["ANTHROPIC_API_KEY"],
  gemini: ["GEMINI_API_KEY", "GOOGLE_AI_API_KEY"],
  imagine: ["IMAGINE_API_KEY"],
  tavily: ["TAVILY_API_KEY"],
};

// Live check: each configured service is pinged in parallel (graceful per-service).
export async function checkIntegrations(): Promise<IntegrationStatus[]> {
  return Promise.all(INTEGRATIONS.map(async (i) => {
    const configured = ENV_VARS[i.key].some((v) => (process.env[v] ?? "").length > 0);
    const ping = configured ? await pingService(i.key) : { reachable: null, latencyMs: null };
    return { ...i, configured, ...ping };
  }));
}
