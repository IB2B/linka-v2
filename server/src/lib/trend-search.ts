import { getAnthropic } from "./anthropic";
import { tavilySearch, type TavilyResult } from "./tavily";
import { LANGUAGE_NAME, type TrendLocale } from "./trend-query-i18n";

const EXPAND_SYS = `You turn a creator's topic into focused web-search queries that
surface the most interesting, recent, postable content about it. Disambiguate the
subject using full proper names (e.g. "claude code" → "Anthropic Claude Code").
Cover three distinct facets: (1) latest news, features, or releases; (2) opinions,
comparisons, or debates; (3) real use-cases, tips, or results. Return ONLY a JSON
array of exactly 3 query strings — no prose.`;

// Turn a terse topic into 3 disambiguated, facet-spread queries. Falls back to the
// raw topic on any failure so search still runs.
async function expandTopic(topic: string, locale: TrendLocale): Promise<string[]> {
  try {
    const msg = await getAnthropic().messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 220,
      system: EXPAND_SYS,
      messages: [{ role: "user", content: `Topic: "${topic}"\nWrite the queries in ${LANGUAGE_NAME[locale]}.` }],
    });
    const block = msg.content[0];
    if (block.type !== "text") return [topic];
    const m = block.text.match(/\[[\s\S]*?\]/);
    const arr = m ? (JSON.parse(m[0]) as unknown[]) : [];
    const queries = arr.filter((q): q is string => typeof q === "string" && q.trim().length > 0).slice(0, 3);
    return queries.length ? queries : [topic];
  } catch {
    return [topic];
  }
}

function dedupe(results: TavilyResult[]): TavilyResult[] {
  return [...new Map(results.map((r) => [r.url, r])).values()];
}

// Fan out the expanded queries over rich web search, plus one fresh-news pass on
// the primary query, then merge. Each search is independently fault-tolerant.
export async function searchTopic(topic: string, locale: TrendLocale): Promise<TavilyResult[]> {
  const queries = await expandTopic(topic, locale);
  const batches = await Promise.all([
    ...queries.map((q) => tavilySearch(q, 8, { topic: "general", depth: "advanced" }).catch(() => [])),
    tavilySearch(queries[0], 8, { topic: "news", depth: "advanced", days: 30 }).catch(() => []),
  ]);
  return dedupe(batches.flat());
}
