import { generatePost } from "../services/post-generation.service";
import { generateImageForPostInBackground }
  from "../services/image-generation.service";
import { generateVideoForPostInBackground }
  from "../services/video-generation.service";
import { generateAvatarVideoInBackground }
  from "../services/avatar-video.service";
import { checkImageRateLimit } from "../lib/image-rate-limiter";
import { checkVideoRateLimit } from "../lib/video-rate-limiter";
import * as posts from "../models/generated-content.model";
import { checkAndNotifyUsageLimit } from "./check-usage-limit";

// "video" = b-roll clip animated from a seed image; "avatar" = HeyGen presenter
// speaking the post to camera.
export type MediaKind = "none" | "image" | "video" | "avatar";

type Input = {
  postType: string;
  topic?: string;
  newsArticle?: { title: string; url?: string; source?: string; summary?: string };
  language: string;
  media: MediaKind;
};

export async function generateForPlatform(
  userId: string, input: Input, platform: string,
) {
  const result = await generatePost({
    userId, postType: input.postType as never,
    topic: input.topic, newsArticle: input.newsArticle,
    platform: platform as never, language: input.language,
  });
  const videoAllowed = checkVideoRateLimit(userId).allowed;
  const wantsVideo = input.media === "video" && videoAllowed;
  const wantsAvatar = input.media === "avatar" && videoAllowed;
  const wantsImage = !wantsVideo && !wantsAvatar
    && input.media === "image" && checkImageRateLimit(userId).allowed;
  // B-roll video also produces a poster image, so image_status is pending there.
  // Avatar video ships with HeyGen's own thumbnail — no image job.
  const stored = await posts.insertOne({
    userId,
    prompt: input.topic ?? input.newsArticle?.title ?? null,
    content: result.content,
    platform,
    imageStatus: wantsImage || wantsVideo ? "pending" : "skipped",
    videoStatus: wantsVideo || wantsAvatar ? "pending" : "skipped",
    tokensInput: result.tokensInput,
    tokensOutput: result.tokensOutput,
    model: result.model,
  });
  if (wantsAvatar) {
    void generateAvatarVideoInBackground(stored.id, userId, result.content, platform);
  } else if (wantsVideo) {
    void generateVideoForPostInBackground(stored.id, userId, result.content, platform);
  } else if (wantsImage) {
    void generateImageForPostInBackground(stored.id, userId, result.content, platform);
  }
  checkAndNotifyUsageLimit(userId).catch((e) =>
    console.error("[usage-limit]", e));
  return { id: stored.id, content: result.content };
}
