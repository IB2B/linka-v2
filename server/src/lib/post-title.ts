import { getAnthropic } from "./anthropic";
import { titleLimitFor } from "./title-limits";

// Haiku, not Sonnet: naming a piece of text that already exists is the cheapest
// job in the pipeline and does not deserve the latency of the writing model.
const MODEL = "claude-haiku-4-5-20251001";

const SYSTEM = `You title a social post that is already written. The title states
what the post is actually about, in the writer's own plain words — a person
should know whether to read on. Write it in the SAME LANGUAGE as the post, always:
an English title over an Italian post is a bug. Reuse the post's concrete nouns;
never invent detail that is not in it. No hashtags, no emoji, no colons splitting a
clever phrase from a subtitle, no "How I", no "Here's why", no clickbait, no
trailing full stop, no surrounding quotes. Sentence case. Output ONLY the title.`;

export async function buildPostTitle(
  content: string, platform = "linkedin",
): Promise<string> {
  const limit = titleLimitFor(platform);
  const res = await getAnthropic().messages.create({
    model: MODEL,
    max_tokens: 100,
    system: SYSTEM,
    messages: [{
      role: "user",
      content: `Post:\n"${content.slice(0, 2000)}"\n\n`
        // Asking for the ceiling gets titles that sit just past it, and Italian
        // or Spanish says the same thing in more characters than English. Aim
        // well inside it so nothing has to be cut.
        + `Title it in about ${Math.round(limit * 0.7)} characters and never more `
        + `than ${limit}. Count them. It must be a complete phrase — a title that `
        + `runs long gets cut mid-word and reads broken.`,
    }],
  });
  const block = res.content[0];
  if (block.type !== "text") throw new Error("No title returned");
  return tidy(block.text, limit);
}

// The model obeys the character limit most of the time; a hard cut on a word
// boundary covers the rest, since the column and the platform both reject
// anything longer.
export function tidy(raw: string, limit: number): string {
  const clean = raw.trim().replace(/^["'“”]|["'“”]$/g, "").replace(/\.$/, "").trim();
  if (clean.length <= limit) return clean;

  // Whole words only, then drop the function-word scraps the cut leaves behind:
  // "lo fa in", "el miedo al". Prepositions, articles and conjunctions are short
  // in every language this app writes in, so length is a good enough test.
  const kept: string[] = [];
  for (const word of clean.split(/\s+/)) {
    if ([...kept, word].join(" ").length > limit) break;
    kept.push(word);
  }
  while (kept.length > 2 && isScrap(kept[kept.length - 1])) kept.pop();

  const out = kept.join(" ").replace(/[,;:—-]$/, "").trim();
  // A single word longer than the limit has no boundary to cut on.
  return out || clean.slice(0, limit);
}

function isScrap(word: string): boolean {
  return word.length <= 3 && /^[\p{L}]+$/u.test(word);
}
