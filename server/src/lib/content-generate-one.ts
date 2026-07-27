import { generatePost } from "../services/post-generation.service";
import { generateImageForPostInBackground }
  from "../services/image-generation.service";
import { generateVideoForPostInBackground }
  from "../services/video-generation.service";
import { checkImageRateLimit } from "../lib/image-rate-limiter";
import { checkVideoRateLimit } from "../lib/video-rate-limiter";
import * as posts from "../models/generated-content.model";
import { checkAndNotifyUsageLimit } from "./check-usage-limit";

export type MediaKind = "none" | "image" | "video";

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
  const wantsVideo = input.media === "video" && checkVideoRateLimit(userId).allowed;
  const wantsImage =
    !wantsVideo && input.media === "image" && checkImageRateLimit(userId).allowed;
  // Video also produces a poster image, so image_status is pending in both cases.
  const stored = await posts.insertOne({
    userId,
    prompt: input.topic ?? input.newsArticle?.title ?? null,
    content: result.content,
    platform,
    imageStatus: wantsImage || wantsVideo ? "pending" : "skipped",
    videoStatus: wantsVideo ? "pending" : "skipped",
    tokensInput: result.tokensInput,
    tokensOutput: result.tokensOutput,
    model: result.model,
  });
  if (wantsVideo) {
    void generateVideoForPostInBackground(stored.id, userId, result.content, platform);
  } else if (wantsImage) {
    void generateImageForPostInBackground(stored.id, userId, result.content, platform);
  }
  checkAndNotifyUsageLimit(userId).catch((e) =>
    console.error("[usage-limit]", e));
  return { id: stored.id, content: result.content };
}
