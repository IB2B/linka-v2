import { buildImagePrompt } from "../lib/image-prompt";
import { generatePostImage } from "../lib/image-generator";
import { incrementImageCount } from "../lib/image-rate-limiter";
import { persistGeneratedImage } from "../lib/image-storage";
import { brandLogoFor } from "../lib/brand-logo";
import { setImageGenerating, setImageCompleted, setImageFailed }
  from "../models/generated-content-image.model";
import { getVisualStyle } from "../models/platform-instructions.model";
import type { ImageShape } from "../lib/image-size";

export async function generateImageForPostInBackground(
  contentId: string, userId: string, postContent: string,
  platform = "linkedin", customPrompt?: string, shape?: ImageShape,
): Promise<void> {
  console.log(`[image-gen] start ${contentId}`);
  try {
    await setImageGenerating(contentId, userId);

    let prompt = customPrompt?.trim() ?? "";
    if (!prompt) {
      try {
        const visualStyle = await getVisualStyle(userId, platform).catch(() => null);
        prompt = await buildImagePrompt(postContent, platform, visualStyle ?? undefined);
        console.log(`[image-gen] prompt ok ${contentId}: ${prompt.slice(0, 80)}…`);
      } catch (err) {
        console.error(`[image-gen] prompt FAILED ${contentId}:`, err);
        prompt = postContent.slice(0, 200);
      }
    }

    // Fetched alongside the render rather than before it: the logo is only
    // needed once the bytes exist, and the two calls are independent.
    const [{ url: source, model: imageModel }, logo] = await Promise.all([
      generatePostImage(prompt, shape),
      brandLogoFor(userId, platform).catch(() => null),
    ]);
    console.log(`[image-gen] image ok ${contentId}: ${source.slice(0, 80)}`);
    const url = await persistGeneratedImage(contentId, source, logo);
    console.log(`[image-gen] saved ${contentId}: ${url}`);

    await setImageCompleted(contentId, userId, url, prompt, imageModel);
    incrementImageCount(userId);
    console.log(`[image-gen] done ${contentId}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown image error";
    console.error(`[image-gen] FATAL ${contentId}:`, err);
    await setImageFailed(contentId, userId, message).catch((e) =>
      console.error(`[image-gen] could not write failure:`, e),
    );
  }
}
