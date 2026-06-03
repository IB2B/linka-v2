import { getAnthropic } from "./anthropic";

const SYSTEM = `You turn a social post into ONE vivid image-generation prompt.
Return ONLY the prompt text — no preamble, no quotes, no explanation.`;

function userPrompt(postContent: string, platform: string): string {
  return `Read this ${platform} post and design one image that visually represents its specific subject — the concrete topic, idea, or metaphor at the heart of the post.

Post:
"${postContent.slice(0, 1500)}"

Write an image-generation prompt that:
- Depicts the actual thing the post is about — a concrete scene, object, or visual metaphor tied to that subject. Not a generic stand-in.
- AVOIDS overused stock clichés unless the post is literally about them: a person staring at a screen, handshakes, faceless people in suits, a laptop next to coffee, lightbulbs for "ideas", or rising arrows.
- Has one strong focal point, editorial and modern, photoreal or clean illustration, tasteful color and lighting.
- Contains NO text, letters, numbers, logos, watermarks, or UI elements.
- Uses a 16:9 composition.

Return just the prompt.`;
}

export async function buildImagePrompt(
  postContent: string, platform = "linkedin",
): Promise<string> {
  const res = await getAnthropic().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 400,
    system: SYSTEM,
    messages: [{ role: "user", content: userPrompt(postContent, platform) }],
  });
  const block = res.content[0];
  if (block.type !== "text") throw new Error("No prompt returned");
  return block.text.trim();
}
