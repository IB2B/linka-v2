import { getAnthropic } from "../lib/anthropic";
import { PLATFORM_HINT } from "../lib/platform-hints";

type Input = { original: string; platform: string };

function buildPrompt({ original, platform }: Input): string {
  const hint = PLATFORM_HINT[platform] ?? PLATFORM_HINT.linkedin;
  return `Rewrite this ${platform} post so the core message stays but the
hook, structure, and examples are fresh. Do NOT copy any sentence verbatim.
Keep the same value to the reader. ${hint} Plain text only.

Original:
"""
${original}
"""

Rewrite:`;
}

export async function rewriteForRecycle(input: Input): Promise<string> {
  const message = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 800,
    messages: [{ role: "user", content: buildPrompt(input) }],
  });
  const block = message.content[0];
  if (block.type !== "text") throw new Error("No text returned by model");
  return block.text.trim();
}
