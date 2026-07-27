import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import { POST_TYPES } from "../lib/post-type-guidance";
import { getMonthlyUsage } from "../lib/posts-monthly-usage";
import { generateForPlatform } from "../lib/content-generate-one";
import { rememberLanguage } from "../lib/remember-language";
import { sendPostsGeneratedEmail } from "../lib/post-event-emails";

const PLATFORMS = ["linkedin", "twitter", "facebook", "instagram", "threads"] as const;

const articleSchema = z.object({
  title: z.string().trim().min(1),
  url: z.string().optional(),
  source: z.string().optional(),
  summary: z.string().optional(),
});

const schema = z.object({
  postType: z.enum(POST_TYPES as [string, ...string[]]),
  topic: z.string().trim().min(1).optional(),
  newsArticle: articleSchema.optional(),
  platforms: z.array(z.enum(PLATFORMS)).min(1).max(PLATFORMS.length).default(["linkedin"]),
  language: z.string().trim().min(2).max(8).default("en"),
  media: z.enum(["none", "image", "video"]).optional(),
  withImage: z.boolean().default(false),
}).refine((d) => Boolean(d.topic || d.newsArticle), {
  message: "Provide a topic or a news article.",
});

type Out = {
  posts: { platform: string; id: string; content: string }[];
  errors?: { platform: string; error: string }[];
};

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
    // Frontend sends `media`; fall back to the legacy `withImage` flag.
    const media = input.media ?? (input.withImage ? "image" : "none");
    const userId = req.user!.id;
    const usage = await getMonthlyUsage(userId);
    const remaining = usage.limit - usage.used;
    if (remaining < input.platforms.length) {
      res.status(403).json({
        error: `Need ${input.platforms.length} posts but only ${remaining} left (${usage.used}/${usage.limit}). Upgrade to keep generating.`,
        code: "POST_LIMIT_REACHED",
      });
      return;
    }
    void rememberLanguage(userId, input.language).catch(() => {});
    const settled = await Promise.allSettled(
      input.platforms.map((p) => generateForPlatform(userId, { ...input, media }, p)),
    );
    const out: Out = { posts: [] };
    settled.forEach((t, i) => {
      const platform = input.platforms[i];
      if (t.status === "fulfilled") out.posts.push({ platform, ...t.value });
      else {
        out.errors ??= [];
        out.errors.push({ platform, error: t.reason instanceof Error ? t.reason.message : "Generation failed." });
      }
    });
    res.json(out);
    if (out.posts.length > 0) {
      sendPostsGeneratedEmail(userId, out.posts)
        .catch((e) => console.error("[notify-generated]", e));
    }
  } catch (e) { next(e); }
}
