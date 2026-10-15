import { getAnthropic } from "./anthropic";
import { PRODUCT_FIELDS, type ProductField } from "../models/product-fields";

// Fields the AI may fill from a website. Name and url come from the page itself;
// knowledge gets the cleaned page text so nothing the AI skipped is lost.
const FILLABLE: ProductField[] = [
  "name", "pitch", "audience", "problem", "alternatives",
  "features", "differentiators", "pricing", "proof", "cta",
];

const SYSTEM = `You read a product's website and fill in a short brief about it for a social-media writer.
Reply with JSON only, no prose, using exactly these keys: ${FILLABLE.join(", ")}.
- Use only what the page says. If the page doesn't say it, use an empty string. Never invent numbers, customers or claims.
- pitch: one sentence. features, differentiators and proof: one item per line, no bullets.
- Write in the page's language.`;

// Tavily fetches the page on its side, so this server never requests a
// user-supplied URL (no SSRF risk from internal addresses).
async function extract(url: string, depth: "basic" | "advanced"): Promise<string> {
  const r = await fetch("https://api.tavily.com/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: process.env.TAVILY_API_KEY, urls: [url], extract_depth: depth }),
  });
  if (!r.ok) return "";
  const data = (await r.json()) as { results?: { raw_content?: string }[] };
  return data.results?.[0]?.raw_content?.trim() ?? "";
}

// Basic first (fast, cheap); advanced only for sites basic can't render.
async function pageText(url: string): Promise<string> {
  if (!process.env.TAVILY_API_KEY) throw new Error("Website import isn't set up yet.");
  const text = (await extract(url, "basic")) || (await extract(url, "advanced"));
  if (!text) throw new Error("Couldn't read that website. Is the link public?");
  return text.slice(0, 30_000);
}

export async function importProductFromUrl(url: string): Promise<Record<string, string>> {
  const text = await pageText(url);
  const msg = await getAnthropic().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: SYSTEM,
    messages: [{ role: "user", content: `Website: ${url}\n\n${text}` }],
  });
  const raw = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  let json: Record<string, unknown>;
  try {
    json = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, "").trim());
  } catch {
    throw new Error("Couldn't pull product details from that page. Fill them in by hand.");
  }
  const out: Record<string, string> = { url };
  for (const k of FILLABLE) {
    const v = typeof json[k] === "string" ? (json[k] as string).trim() : "";
    if (v) out[k] = v.slice(0, PRODUCT_FIELDS[k]);
  }
  out.knowledge = text.slice(0, PRODUCT_FIELDS.knowledge);
  return out;
}
