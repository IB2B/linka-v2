import { buildImagePrompt } from "./image-prompt";
import { generatePostImage } from "./image-generator";
import { persistGeneratedImage } from "./image-storage";

export type Seed = {
  posterPath: string; seedUrl: string; prompt: string; model: string;
};

// Produces the still frame Higgsfield animates. Persists it as the post poster
// and returns a publicly-fetchable URL for Higgsfield to pull the frame from.
export async function buildVideoSeed(
  contentId: string, postContent: string, platform: string, visualStyle?: string,
): Promise<Seed> {
  const prompt = await buildImagePrompt(postContent, platform, visualStyle).catch(
    () => postContent.slice(0, 200),
  );
  const { url: source, model } = await generatePostImage(prompt);
  const posterPath = await persistGeneratedImage(contentId, source);
  return { posterPath, seedUrl: publicSeedUrl(source, posterPath), prompt, model };
}

// dall-e returns a public https URL we can hand straight to Higgsfield. For
// gpt-image (data: URL) we serve the persisted poster from our public origin.
function publicSeedUrl(source: string, posterPath: string): string {
  if (source.startsWith("https://")) return source;
  const base = process.env.MEDIA_PUBLIC_URL;
  if (!base) throw new Error("MEDIA_PUBLIC_URL required to serve video seed frames");
  return `${base.replace(/\/$/, "")}${posterPath}`;
}
