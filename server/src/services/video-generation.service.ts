import { buildVideoSeed } from "../lib/video-seed";
import { createImageToVideo } from "../lib/higgsfield-video";
import { incrementVideoCount } from "../lib/video-rate-limiter";
import { setImageCompleted, setImageFailed, setImageGenerating }
  from "../models/generated-content-image.model";
import { setVideoCompleted, setVideoFailed, setVideoGenerating }
  from "../models/generated-content-video.model";
import { getVisualStyle } from "../models/platform-instructions.model";

// Generates a seed image (also stored as the post poster) then animates it into
// a video via Higgsfield. The video URL is stored as-is (Higgsfield CDN) —
// never written to local disk, so it survives redeploys.
export async function generateVideoForPostInBackground(
  contentId: string, userId: string, postContent: string, platform = "linkedin",
): Promise<void> {
  console.log(`[video-gen] start ${contentId}`);
  try {
    await setImageGenerating(contentId, userId);
    await setVideoGenerating(contentId, userId);

    const visualStyle = await getVisualStyle(userId, platform).catch(() => null);
    const seed = await buildVideoSeed(contentId, postContent, platform, visualStyle ?? undefined);
    await setImageCompleted(contentId, userId, seed.posterPath, seed.prompt, seed.model);
    console.log(`[video-gen] seed ok ${contentId}`);

    const motion = `${seed.prompt}. Subtle cinematic motion, natural movement.`;
    const { url, model } = await createImageToVideo(motion, seed.seedUrl);
    await setVideoCompleted(contentId, userId, url, motion, model);
    incrementVideoCount(userId);
    console.log(`[video-gen] done ${contentId}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown video error";
    console.error(`[video-gen] FATAL ${contentId}:`, err);
    await setVideoFailed(contentId, userId, message).catch(() => {});
    await setImageFailed(contentId, userId, message).catch(() => {});
  }
}
