export type TavilyResult = {
  title: string;
  url: string;
  content: string;
  score?: number;
};

export class TavilyError extends Error {
  constructor(public status: number, msg: string) { super(msg); }
}

export async function tavilySearch(query: string, max = 8): Promise<TavilyResult[]> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) throw new TavilyError(500, "TAVILY_API_KEY missing");
  const r = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: key, query, search_depth: "basic",
      topic: "news", max_results: max, days: 2,
    }),
  });
  if (!r.ok) throw new TavilyError(r.status, await r.text());
  const data = (await r.json()) as { results?: TavilyResult[] };
  return data.results ?? [];
}
