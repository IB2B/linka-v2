import { getAnthropic } from "../lib/anthropic";

export type ScoreResult = {
  score: number;
  reasons: string[];
  suggestions: string[];
};

const SYSTEM = `You are a viral social-media post analyst. Score posts 0-100 on:
- hook strength (first line stops the scroll)
- specificity (concrete numbers, names, examples)
- clarity & readability for the platform
- emotional pull / curiosity gap
- clear CTA or reflection prompt
- length fit for the platform

Return ONLY JSON: {"score": number, "reasons": string[], "suggestions": string[]}.
"reasons" = 2-4 short critiques (what's weak or strong, max ~12 words each).
"suggestions" = 2-4 concrete fixes (imperative, max ~14 words each).
No prose. No markdown.`;

function buildUser(content: string, platform: string): string {
  return `Platform: ${platform}\n\nPost:\n"""\n${content}\n"""`;
}

function parseJson(text: string): ScoreResult {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("Bad model response");
  const obj = JSON.parse(text.slice(start, end + 1));
  const score = Math.max(0, Math.min(100, Number(obj.score) || 0));
  const reasons = Array.isArray(obj.reasons) ? obj.reasons.slice(0, 4).map(String) : [];
  const suggestions = Array.isArray(obj.suggestions)
    ? obj.suggestions.slice(0, 4).map(String) : [];
  return { score, reasons, suggestions };
}

export async function scorePost(
  content: string, platform: string,
): Promise<ScoreResult> {
  const message = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 600,
    system: SYSTEM,
    messages: [{ role: "user", content: buildUser(content, platform) }],
  });
  const block = message.content[0];
  if (block.type !== "text") throw new Error("No text returned by model");
  return parseJson(block.text);
}
