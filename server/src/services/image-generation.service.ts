import { buildImagePrompt } from "../lib/image-prompt";
import { generatePostImage } from "../lib/image-generator";
import { incrementImageCount } from "../lib/image-rate-limiter";
import { persistGeneratedImage } from "../lib/image-storage";
import { setImageGenerating, setImageCompleted, setImageFailed }
  from "../models/generated-content-image.model";

export async function generateImageForPostInBackground(
  contentId: string, userId: string, postContent: string, platform = "linkedin",
): Promise<void> {
  console.log(`[image-gen] start ${contentId}`);
  try {
    await setImageGenerating(contentId, userId);

    let prompt: string;
    try {
      prompt = await buildImagePrompt(postContent, platform);
      console.log(`[image-gen] prompt ok ${contentId}: ${prompt.slice(0, 80)}…`);
    } catch (err) {
      console.error(`[image-gen] prompt FAILED ${contentId}:`, err);
      prompt = postContent.slice(0, 200);
    }

    const source = await generatePostImage(prompt);
    console.log(`[image-gen] image ok ${contentId}: ${source.slice(0, 80)}`);
    const url = await persistGeneratedImage(contentId, source);
    console.log(`[image-gen] saved ${contentId}: ${url}`);

    await setImageCompleted(contentId, userId, url, prompt);
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
