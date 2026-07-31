import { getAnthropic } from "./anthropic";
import { titleLimitFor } from "./title-limits";

// Haiku, not Sonnet: naming a piece of text that already exists is the cheapest
// job in the pipeline and does not deserve the latency of the writing model.
const MODEL = "claude-haiku-4-5-20251001";

const SYSTEM = `You title a social post that is already written. The title states
what the post is actually about, in the writer's own plain words — a person
should know whether to read on. Reuse the post's concrete nouns; never invent
detail that is not in it. No hashtags, no emoji, no colons splitting a clever
phrase from a subtitle, no "How I", no "Here's why", no clickbait, no trailing
full stop, no surrounding quotes. Sentence case. Output ONLY the title.`;

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
        + `Title it in at most ${limit} characters.`,
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
  const cut = clean.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trim();
}
