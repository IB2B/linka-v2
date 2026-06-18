import { getAnthropic } from "./anthropic";
import type { TavilyResult } from "./tavily";

const SYSTEM = `You curate search results for a creator who wants to publish a post
about a topic. Return ONLY a JSON array of indices, BEST FIRST. Keep an item only
if it is genuinely about the topic (its products, practices, market, or players)
AND interesting enough to spark a post. Drop generic, off-topic, or boring filler,
and skip near-duplicates of items you already listed. No prose.`;

// Ranks the pool by relevance + postability (best first) and drops filler.
// Resilient: any failure or empty result returns the original pool unchanged.
export async function rankRelevant(
  topic: string, pool: TavilyResult[],
): Promise<TavilyResult[]> {
  if (pool.length === 0) return pool;
  const list = pool.map((r, i) => `${i}: ${r.title}`).join("\n");
  try {
    const msg = await getAnthropic().messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 250,
      system: SYSTEM,
      messages: [{ role: "user", content: `Topic: "${topic}"\n\nResults:\n${list}\n\nRanked indices:` }],
    });
    const block = msg.content[0];
    if (block.type !== "text") return pool;
    const m = block.text.match(/\[[\s\S]*?\]/);
    const idx = m ? (JSON.parse(m[0]) as number[]) : [];
    const ordered = idx.map((i) => pool[i]).filter(Boolean);
    return ordered.length ? ordered : pool;
  } catch {
    return pool;
  }
}
