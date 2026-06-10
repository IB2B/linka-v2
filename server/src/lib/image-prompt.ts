import { getAnthropic } from "./anthropic";

// The visual tells that make an image read as generic "AI slop". Banned hard.
const AI_TELLS = `glowing orbs or spheres, neon glow, god rays, light beams,
lens flares, swirling energy, abstract "data" particles, glassmorphism, frosted
translucent 3D blobs, dark navy/teal gradients with a central glow, glossy
plastic 3D renders, hyper-symmetry, hyper-saturated colors, holograms, circuit
patterns, generic futuristic/sci-fi tech aesthetics`;

const SYSTEM = `You write ONE image-generation prompt for a social post. The
result must look CREATIVE, CLEAN, and HUMAN-MADE — like work from a real art
director, photographer, or graphic designer — NOT a generic AI render. Return
ONLY the prompt text — no preamble, quotes, or notes.`;

function userPrompt(postContent: string, platform: string): string {
  return `Read this ${platform} post, find its core idea and mood, then pick the
ONE aesthetic below that best fits and write a vivid prompt in that style:

A) Authentic editorial photography — a real, believable scene or still life shot
   on a real camera: natural directional light, genuine materials and texture,
   shallow but realistic depth, subtle film grain, slightly off-center framing.
B) Minimalist graphic-design poster — bold restrained palette, confident shapes,
   strong negative space, a print/risograph/matte-paper feel. Designed, not 3D.
C) Tactile fine-art still life — real objects, hands, paper, or materials
   arranged with intention; documentary realism, imperfect and human.

Post:
"${postContent.slice(0, 1500)}"

Rules:
- Make it feel intentional and restrained — think Kinfolk, Monocle, Stripe, or
  Linear editorial art. Embrace asymmetry, real texture, and imperfection.
- NEVER use any of these AI clichés: ${AI_TELLS}.
- NO text, letters, numbers, logos, watermarks, or UI. 16:9 composition.

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
