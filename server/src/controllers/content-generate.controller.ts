import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import { POST_TYPES } from "../lib/post-type-guidance";
import { generatePost } from "../services/post-generation.service";
import { generateImageForPostInBackground }
  from "../services/image-generation.service";
import { checkImageRateLimit } from "../lib/image-rate-limiter";
import { getMonthlyUsage } from "../lib/posts-monthly-usage";
import * as posts from "../models/generated-content.model";

const PLATFORMS = ["linkedin", "twitter", "facebook", "instagram", "threads"] as const;

const articleSchema = z.object({
  title: z.string().trim().min(1),
  url: z.string().optional(),
  source: z.string().optional(),
  summary: z.string().optional(),
});

const schema = z
  .object({
    postType: z.enum(POST_TYPES as [string, ...string[]]),
    topic: z.string().trim().min(1).optional(),
    newsArticle: articleSchema.optional(),
    platform: z.enum(PLATFORMS).default("linkedin"),
    language: z.string().trim().min(2).max(8).default("en"),
    withImage: z.boolean().default(false),
  })
  .refine((d) => Boolean(d.topic || d.newsArticle), {
    message: "Provide a topic or a news article.",
  });

export async function generate(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const input = parsed.data;
    const userId = req.user!.id;
    const usage = await getMonthlyUsage(userId);
    if (usage.used >= usage.limit) {
      res.status(403).json({
        error: `Monthly limit reached (${usage.used}/${usage.limit}). Upgrade to keep generating.`,
        code: "POST_LIMIT_REACHED",
      });
      return;
    }
    const result = await generatePost({
      userId, postType: input.postType,
      topic: input.topic, newsArticle: input.newsArticle,
      platform: input.platform, language: input.language,
    });
    const wantsImage =
      input.withImage && checkImageRateLimit(userId).allowed;
    const stored = await posts.insertOne({
      userId,
      prompt: input.topic ?? input.newsArticle?.title ?? null,
      content: result.content,
      platform: input.platform,
      imageStatus: wantsImage ? "pending" : "skipped",
      tokensInput: result.tokensInput,
      tokensOutput: result.tokensOutput,
      model: result.model,
    });
    if (wantsImage) {
      void generateImageForPostInBackground(
        stored.id, userId, result.content, input.platform,
      );
    }
    res.json({ post: stored });
  } catch (e) {
    next(e);
  }
}
