import { getAnthropic } from "./anthropic";

const SYSTEM = `You write image prompts for OpenAI image models. Return ONLY the
prompt text — no preamble, no quotes, no explanation.`;

function userPrompt(postContent: string, platform: string): string {
  return `Create an image prompt for a professional ${platform} post image.

Post content:
"${postContent.slice(0, 500)}"

Requirements:
- Professional, clean, modern style
- Suitable for a business context
- No text or typography in the image
- Photorealistic or clean illustration
- 16:9 composition`;
}

export async function buildImagePrompt(
  postContent: string, platform = "linkedin",
): Promise<string> {
  const res = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: SYSTEM,
    messages: [{ role: "user", content: userPrompt(postContent, platform) }],
  });
  const block = res.content[0];
  if (block.type !== "text") throw new Error("No prompt returned");
  return block.text.trim();
}
