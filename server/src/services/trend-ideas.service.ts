import { getAnthropic } from "../lib/anthropic";

export type IdeaDraft = {
  hook: string;
  angle: string;
  platform: string;
  score: number;
};

function prompt(title: string, summary: string): string {
  return `A trending news item:
TITLE: ${title}
SUMMARY: ${summary}

Generate 3 distinct social post ideas. Return ONLY JSON array of:
{"hook": "scroll-stopping first line (max 140 chars)", "angle": "contrarian|story|how-to|hot-take", "platform": "linkedin|x|threads|instagram", "score": 0-100 viral potential}`;
}

function parse(text: string): IdeaDraft[] {
  const m = text.match(/\[[\s\S]*\]/);
  const arr = JSON.parse(m ? m[0] : text);
  if (!Array.isArray(arr)) return [];
  return arr.filter((x): x is IdeaDraft =>
    x && typeof x.hook === "string" && typeof x.angle === "string"
    && typeof x.platform === "string" && typeof x.score === "number",
  ).slice(0, 3);
}

export async function generateIdeas(title: string, summary: string): Promise<IdeaDraft[]> {
  const msg = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 600,
    messages: [{ role: "user", content: prompt(title, summary) }],
  });
  const block = msg.content[0];
  if (block.type !== "text") return [];
  try { return parse(block.text); } catch { return []; }
}
