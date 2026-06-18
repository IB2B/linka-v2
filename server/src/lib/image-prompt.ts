import { getAnthropic } from "./anthropic";

const SYSTEM = `You are an award-winning editorial photo director. For a social
post you write ONE image-generation prompt for the single photograph that runs
beside it — evocative and cinematic, like a feature image in The New York Times,
Bloomberg Businessweek, or Kinfolk. It must capture the post's core idea so a
viewer instantly senses the theme, and read as a real photograph taken by a human
— never a 3D/CGI render, stock photo, clip-art symbol, infographic, or arty
filler. Output ONLY the final prompt text, nothing else.`;

function userPrompt(postContent: string, platform: string): string {
  return `Post (${platform}):
"${postContent.slice(0, 1500)}"

First work out (silently) the post's ONE core idea and the human emotion or
tension beneath it. Then imagine the single most striking photograph a great
editorial photographer would shoot to convey THAT — a concrete real scene,
person, place, or object with mood. Evocative, not literal; a stranger should
glance at it and intuit the topic in two seconds.

Write the prompt as a specific photographic brief, roughly this order:
shot type + subject doing something specific; a real setting with genuine detail;
natural directional light; lens/film feel (e.g. 35mm, shallow depth, fine grain);
a restrained 2-3 colour palette; mood; slightly off-center, imperfect framing.

Match THIS level of specificity (do NOT reuse this scene or its objects):
"Wide cinematic photo of a vast dim theatre of empty red velvet seats, a single
warm shaft of light on just three occupied seats near the centre; 35mm film, soft
haze, muted crimson and amber, fine grain, off-center, quiet and a little lonely."

Rules:
- Specific to THIS post and different from other posts.
- Real photography only — no 3D/CGI, glassmorphism, neon, glowing orbs, god rays,
  holograms, circuit or "data" motifs, hyper-saturated colour.
- No generic stock (desk-with-coffee-and-notebook, person at a laptop, office),
  no clip-art symbols, no arty random props (rope, knots, stacked stones, mazes).
- If people appear, shoot them candidly — from behind or faces not the focus.
- No text, letters, numbers, logos, watermarks or UI. 16:9 composition.

Return only the prompt.`;
}

export async function buildImagePrompt(
  postContent: string, platform = "linkedin",
): Promise<string> {
  const res = await getAnthropic().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    system: SYSTEM,
    messages: [{ role: "user", content: userPrompt(postContent, platform) }],
  });
  const block = res.content[0];
  if (block.type !== "text") throw new Error("No prompt returned");
  return block.text.trim();
}
