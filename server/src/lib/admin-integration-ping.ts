// Lightweight liveness checks for services that expose a cheap authed GET.
// Returns reachable=null for services we can't safely probe (configured-only).
export type PingResult = { reachable: boolean | null; latencyMs: number | null; error?: string };

const TIMEOUT = 5000;
const sig = () => AbortSignal.timeout(TIMEOUT);

async function timed(fn: () => Promise<Response>): Promise<PingResult> {
  const t0 = Date.now();
  try {
    const res = await fn();
    const latencyMs = Date.now() - t0;
    return res.ok ? { reachable: true, latencyMs }
      : { reachable: false, latencyMs, error: `HTTP ${res.status}` };
  } catch (e) {
    return { reachable: false, latencyMs: null, error: e instanceof Error ? e.message : "error" };
  }
}

export function pingService(key: string): Promise<PingResult> {
  const env = process.env;
  switch (key) {
    case "openai":
      return timed(() => fetch("https://api.openai.com/v1/models", {
        headers: { authorization: `Bearer ${env.OPENAI_API_KEY ?? env.OPENAI_IMAGE_API_KEY ?? ""}` },
        signal: sig() }));
    case "anthropic":
      return timed(() => fetch("https://api.anthropic.com/v1/models", {
        headers: { "x-api-key": env.ANTHROPIC_API_KEY ?? "", "anthropic-version": "2023-06-01" },
        signal: sig() }));
    case "gemini":
      return timed(() => fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${env.GEMINI_API_KEY ?? env.GOOGLE_AI_API_KEY ?? ""}`,
        { signal: sig() }));
    case "stripe":
      return timed(() => fetch("https://api.stripe.com/v1/balance", {
        headers: { authorization: `Bearer ${env.STRIPE_SECRET_KEY ?? ""}` }, signal: sig() }));
    default:
      return Promise.resolve({ reachable: null, latencyMs: null });
  }
}
