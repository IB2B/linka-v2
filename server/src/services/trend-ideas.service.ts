import { getAnthropic } from "../lib/anthropic";
import { LANGUAGE_NAME, type TrendLocale } from "../lib/trend-query-i18n";

export type IdeaDraft = {
  hook: string;
  angle: string;
  platform: string;
  score: number;
};

export type TrendDraft = { summary: string; ideas: IdeaDraft[] };

function prompt(title: string, excerpt: string, locale: TrendLocale): string {
  const lang = LANGUAGE_NAME[locale];
  return `A trending news item:
TITLE: ${title}
RAW EXCERPT (may contain nav, ads, boilerplate): ${excerpt}

Respond ONLY with JSON, written in ${lang}. Keep "angle" and "platform" as the
English enum keys. Generate exactly 3 ideas. Shape:
{"summary": "clean 1-2 sentence recap of the news in ${lang}, no boilerplate",
 "ideas": [{"hook": "scroll-stopping line in ${lang} (max 140 chars)", "angle": "contrarian|story|how-to|hot-take", "platform": "linkedin|x|threads|instagram", "score": 0-100}]}`;
}

function isIdea(x: any): x is IdeaDraft {
  return x && typeof x.hook === "string" && typeof x.angle === "string"
    && typeof x.platform === "string" && typeof x.score === "number";
}

function parse(text: string): TrendDraft {
  const m = text.match(/\{[\s\S]*\}/);
  const obj = JSON.parse(m ? m[0] : text);
  const ideas = Array.isArray(obj?.ideas) ? obj.ideas.filter(isIdea).slice(0, 3) : [];
  return { summary: typeof obj?.summary === "string" ? obj.summary : "", ideas };
}

export async function generateTrendDraft(
  title: string, excerpt: string, locale: TrendLocale = "en",
): Promise<TrendDraft> {
  const msg = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 700,
    messages: [{ role: "user", content: prompt(title, excerpt, locale) }],
  });
  const block = msg.content[0];
  if (block.type !== "text") return { summary: "", ideas: [] };
  try { return parse(block.text); } catch { return { summary: "", ideas: [] }; }
}
