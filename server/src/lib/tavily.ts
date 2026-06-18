export type TavilyResult = {
  title: string;
  url: string;
  content: string;
  score?: number;
};

export type TavilyOpts = {
  topic?: "news" | "general";
  depth?: "basic" | "advanced";
  days?: number;
};

export class TavilyError extends Error {
  constructor(public status: number, msg: string) { super(msg); }
}

export async function tavilySearch(
  query: string, max = 8, opts: TavilyOpts = {},
): Promise<TavilyResult[]> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) throw new TavilyError(500, "TAVILY_API_KEY missing");
  const topic = opts.topic ?? "news";
  const body: Record<string, unknown> = {
    api_key: key, query, search_depth: opts.depth ?? "basic",
    topic, max_results: max,
  };
  if (topic === "news") body.days = opts.days ?? 7;
  const r = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new TavilyError(r.status, await r.text());
  const data = (await r.json()) as { results?: TavilyResult[] };
  return data.results ?? [];
}
