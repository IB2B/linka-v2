import { Router } from "express";
import { authenticate } from "../middleware/auth";

export type ServiceStatus = "ok" | "degraded" | "down" | "unconfigured";

async function pingStatusPage(url: string): Promise<ServiceStatus> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return "down";
    const data = (await res.json()) as { status?: { indicator?: string } };
    const ind = data?.status?.indicator ?? "none";
    if (ind === "none") return "ok";
    if (ind === "minor") return "degraded";
    return "down";
  } catch {
    return "down";
  }
}

function keyed(key: string | undefined, fallback: ServiceStatus = "ok"): ServiceStatus {
  return key ? fallback : "unconfigured";
}

const router = Router();

router.get("/status", authenticate, async (_req, res) => {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;

  const [openai, anthropic] = await Promise.all([
    hasOpenAI
      ? pingStatusPage("https://status.openai.com/api/v2/status.json")
      : Promise.resolve<ServiceStatus>("unconfigured"),
    hasAnthropic
      ? pingStatusPage("https://status.anthropic.com/api/v2/status.json")
      : Promise.resolve<ServiceStatus>("unconfigured"),
  ]);

  res.json({
    openai,
    openaiImage: process.env.OPENAI_IMAGE_API_KEY ? openai : "unconfigured",
    anthropic,
    gemini: keyed(process.env.GEMINI_API_KEY),
    imagine: keyed(process.env.IMAGINE_API_KEY),
    lateApi: keyed(process.env.LATE_API_KEY),
    tavily: keyed(process.env.TAVILY_API_KEY),
  });
});

export default router;
