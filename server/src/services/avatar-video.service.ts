import { buildAvatarScript } from "../lib/avatar-script";
import { HeygenError } from "../lib/heygen-api";
import { createAvatarVideo } from "../lib/heygen-video";
import { incrementVideoCount } from "../lib/video-rate-limiter";
import { setVideoCompleted, setVideoFailed, setVideoGenerating }
  from "../models/generated-content-video.model";
import { getAvatarChoice } from "../models/user-avatar.model";
import { getForPlatform } from "../models/platform-instructions.model";

// Talking-head post video: the post text is rewritten as a spoken script, then
// HeyGen renders the user's chosen avatar + voice saying it. The MP4 URL is
// stored as-is (HeyGen CDN) — never written to local disk, so it survives
// redeploys. No poster image is generated; HeyGen supplies its own thumbnail.
export async function generateAvatarVideoInBackground(
  contentId: string, userId: string, postContent: string, platform = "linkedin",
): Promise<void> {
  console.log(`[avatar-video] start ${contentId}`);
  try {
    await setVideoGenerating(contentId, userId);

    const choice = (await getAvatarChoice(userId)) ?? envDefaults();
    const brief = await getForPlatform(userId, platform).catch(() => null);
    const script = await buildAvatarScript(
      postContent, platform, 30, brief?.tone ?? undefined,
    );
    console.log(`[avatar-video] script ok ${contentId}`);

    const { url, model } = await createAvatarVideo({
      script, platform, avatarId: choice.avatarId, voiceId: choice.voiceId,
    });
    await setVideoCompleted(contentId, userId, url, script, `heygen:${model}`);
    incrementVideoCount(userId);
    console.log(`[avatar-video] done ${contentId}`);
  } catch (err) {
    console.error(`[avatar-video] FATAL ${contentId}:`, err);
    await setVideoFailed(contentId, userId, userMessage(err)).catch(() => {});
  }
}

// video_error is rendered in the UI, so never leak the provider's name or raw
// status codes to the person who just clicked "generate".
function userMessage(err: unknown): string {
  if (err instanceof HeygenError) {
    if (err.status === 402) return "Video credits ran out. Top up to keep generating.";
    if (err.status === 429) return "Too many videos at once — try again in a minute.";
    if (err.status === 401) return "Video service not configured. Contact support.";
    return "The video service could not render this. Try again.";
  }
  return err instanceof Error ? err.message : "Unknown avatar error";
}

// Falls back to a house presenter so the feature works before a user has picked
// their own avatar. Without either, fail loudly with an actionable message.
function envDefaults() {
  const avatarId = process.env.HEYGEN_DEFAULT_AVATAR_ID;
  const voiceId = process.env.HEYGEN_DEFAULT_VOICE_ID;
  if (!avatarId || !voiceId) {
    throw new Error("Pick an avatar and voice in Settings before making videos.");
  }
  return { avatarId, voiceId };
}
