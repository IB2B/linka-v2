import { getAnthropic } from "./anthropic";

const SYSTEM = `You are an award-winning editorial photo director. For a social
post you write ONE image-generation prompt for the single photograph that runs
beside it — cinematic and specific, like a feature image in The New York Times or
Bloomberg Businessweek. It must show the world the post comes from, and read as a
real photograph taken by a human — never a 3D/CGI render, stock photo, clip-art
symbol, infographic, visual metaphor, or arty filler. Output ONLY the final
prompt text, nothing else.`;

function userPrompt(postContent: string, platform: string, visualStyle?: string): string {
  const brand = visualStyle?.trim()
    ? `\n\nUser's brand visual direction — honour it for the colour palette, text colours, typography feel and overall mood (this overrides the restrained-palette guidance below, but keep it a real photograph): "${visualStyle.trim().slice(0, 500)}".`
    : "";
  return `Post (${platform}):
"${postContent.slice(0, 1500)}"${brand}

First, silently list the concrete things this post actually contains: the people
and their roles, the rooms, the work, the tools, the places, the moment being
described. Then imagine the single photograph a great editorial photographer
would shoot INSIDE that world — a real moment that could only have come from THIS
post. Specific, not symbolic: a stranger should glance at it and recognise the
world the writer is talking about.

Write the prompt as a specific photographic brief, roughly this order:
shot type + subject doing something specific; a real setting with genuine detail;
natural directional light; lens/film feel (e.g. 35mm, shallow depth, fine grain);
a restrained 2-3 colour palette; mood; slightly off-center, imperfect framing.

Match THIS level of specificity (do NOT reuse this scene or its objects):
"Photo taken over an operator's shoulder on a loud factory floor at shift change:
a manager mid-sentence, clipboard forgotten under one arm, both faces turned away
from camera; 35mm, available light from high windows, dust in the air, muted
steel-grey and safety-orange, fine grain, slightly off-center."

Rules:
- Specific to THIS post and different from other posts.
- No visual metaphors. A post about a promotion does not get a staircase; one
  about a choice does not get a crossroads or a door standing open. Also out:
  ladders, mountain summits, chess pieces, mazes, arrows, signposts, a lone
  figure on a horizon, light at the end of a tunnel. They look profound and say
  nothing about the post.
- Real photography only — no 3D/CGI, glassmorphism, neon, glowing orbs, god rays,
  holograms, circuit or "data" motifs, hyper-saturated colour.
- No generic stock (desk-with-coffee-and-notebook, person at a laptop, office),
  no clip-art symbols, no arty random props (rope, knots, stacked stones, mazes).
- If people appear, shoot them candidly — from behind or faces not the focus.
- No text, letters, numbers, logos, watermarks or UI. 16:9 composition.

Return only the prompt.`;
}

export async function buildImagePrompt(
  postContent: string, platform = "linkedin", visualStyle?: string,
): Promise<string> {
  const res = await getAnthropic().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    system: SYSTEM,
    messages: [{ role: "user", content: userPrompt(postContent, platform, visualStyle) }],
  });
  const block = res.content[0];
  if (block.type !== "text") throw new Error("No prompt returned");
  return block.text.trim();
}
