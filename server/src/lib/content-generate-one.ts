import { generatePost } from "../services/post-generation.service";
import { generateImageForPostInBackground }
  from "../services/image-generation.service";
import { checkImageRateLimit } from "../lib/image-rate-limiter";
import * as posts from "../models/generated-content.model";
import { checkAndNotifyUsageLimit } from "./check-usage-limit";

type Input = {
  postType: string;
  topic?: string;
  newsArticle?: { title: string; url?: string; source?: string; summary?: string };
  language: string;
  withImage: boolean;
};

export async function generateForPlatform(
  userId: string, input: Input, platform: string,
) {
  const result = await generatePost({
    userId, postType: input.postType as never,
    topic: input.topic, newsArticle: input.newsArticle,
    platform: platform as never, language: input.language,
  });
  const wantsImage = input.withImage && checkImageRateLimit(userId).allowed;
  const stored = await posts.insertOne({
    userId,
    prompt: input.topic ?? input.newsArticle?.title ?? null,
    content: result.content,
    platform,
    imageStatus: wantsImage ? "pending" : "skipped",
    tokensInput: result.tokensInput,
    tokensOutput: result.tokensOutput,
    model: result.model,
  });
  if (wantsImage) {
    void generateImageForPostInBackground(
      stored.id, userId, result.content, platform,
    );
  }
  checkAndNotifyUsageLimit(userId).catch((e) =>
    console.error("[usage-limit]", e));
  return { id: stored.id, content: result.content };
}
