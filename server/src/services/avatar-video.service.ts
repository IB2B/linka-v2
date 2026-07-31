import { buildAvatarScript } from "../lib/avatar-script";
import { avatarUserMessage } from "../lib/avatar-video-error";
import { assertWalletFunded } from "../lib/heygen-wallet";
import { resolveAvatarLook } from "../lib/heygen-avatar-look";
import { createAvatarVideo } from "../lib/heygen-video";
import { incrementVideoCount } from "../lib/video-rate-limiter";
import { setVideoCompleted, setVideoFailed, setVideoGenerating }
  from "../models/generated-content-video.model";
import { getAvatarChoice } from "../models/user-avatar.model";
import { getForPlatform } from "../models/platform-instructions.model";
import { preferredLanguage } from "../lib/user-language";

// Spoken length is a target, not a cut: HeyGen renders for as long as the script
// takes to say, so the seconds figure sizes the script rather than trimming video.
export type AvatarVideoOptions = {
  aspect?: string | null;
  seconds?: number;
};

// Talking-head post video: the post text is rewritten as a spoken script, then
// HeyGen renders the user's chosen avatar + voice saying it. The MP4 URL is
// stored as-is (HeyGen CDN) — never written to local disk, so it survives
// redeploys. No poster image is generated; HeyGen supplies its own thumbnail.
export async function generateAvatarVideoInBackground(
  contentId: string, userId: string, postContent: string, platform = "linkedin",
  opts: AvatarVideoOptions = {},
): Promise<void> {
  console.log(`[avatar-video] start ${contentId}`);
  try {
    await setVideoGenerating(contentId, userId);

    // Before the script call, which costs tokens whether or not HeyGen can pay.
    await assertWalletFunded();

    // No shared house avatar: without a per-user choice there is no correct
    // presenter to fall back to, and borrowing someone else's face and cloned
    // voice is not a sane default.
    const [choice, brief, language] = await Promise.all([
      getAvatarChoice(userId),
      getForPlatform(userId, platform).catch(() => null),
      preferredLanguage(userId).catch(() => null),
    ]);
    if (!choice) {
      throw new Error(
        "Choose your avatar and voice in Settings before generating videos.",
      );
    }
    const script = await buildAvatarScript(
      postContent, platform, opts.seconds ?? 30, brief?.tone ?? undefined,
    );
    console.log(`[avatar-video] script ok ${contentId}`);

    const { url, model } = await createAvatarVideo({
      script, aspect: opts.aspect, language,
      avatarId: await resolveAvatarLook(choice.avatarId),
      voiceId: choice.voiceId,
    });
    await setVideoCompleted(contentId, userId, url, script, `heygen:${model}`);
    incrementVideoCount(userId);
    console.log(`[avatar-video] done ${contentId}`);
  } catch (err) {
    console.error(`[avatar-video] FATAL ${contentId}:`, err);
    await setVideoFailed(contentId, userId, avatarUserMessage(err)).catch(() => {});
  }
}
