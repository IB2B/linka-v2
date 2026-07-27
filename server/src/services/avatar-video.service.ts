import { buildAvatarScript } from "../lib/avatar-script";
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
    const message = err instanceof Error ? err.message : "Unknown avatar error";
    console.error(`[avatar-video] FATAL ${contentId}:`, err);
    await setVideoFailed(contentId, userId, message).catch(() => {});
  }
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
