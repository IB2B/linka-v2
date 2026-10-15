import { getAnthropic } from "../lib/anthropic";
import { PLATFORM_HINT } from "../lib/platform-hints";
import { sanitizePost } from "../lib/post-sanitize";

const SYSTEM = `You are a careful editor of social-media posts. You get a finished post and a short list of changes.
Apply exactly those changes and nothing else:
- Keep the author's voice, story, facts, numbers and language. Never invent new facts, numbers or quotes.
- Keep any hashtags at the end exactly as they are.
- Plain text only, no markdown.
- If a change asks for something the post can't support truthfully, skip that change.
Reply with the full edited post only — no preamble, no notes, no quotes around it.`;

function buildUser(content: string, platform: string, changes: string[]): string {
  const hint = PLATFORM_HINT[platform] ?? PLATFORM_HINT.linkedin;
  return `Platform: ${platform}. Format: ${hint}

Changes to apply:
${changes.map((c) => `- ${c}`).join("\n")}

Post:
"""
${content}
"""`;
}

// Edits an existing post with the chosen virality suggestions (and any note
// from the user). An edit, not a regeneration: what already works stays.
export async function improvePost(
  content: string, platform: string, changes: string[],
): Promise<string> {
  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1200,
    system: SYSTEM,
    messages: [{ role: "user", content: buildUser(content, platform, changes) }],
  });
  const text = message.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
  const unquoted = text.replace(/^"""\s*|\s*"""$/g, "").trim();
  if (!unquoted) throw new Error("No text returned by model");
  return sanitizePost(unquoted, platform);
}
