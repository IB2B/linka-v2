import { z } from "zod";
import { POST_TYPES } from "../lib/post-type-guidance";

export const PLATFORMS = ["linkedin", "twitter", "facebook", "instagram", "threads"] as const;

const articleSchema = z.object({
  title: z.string().trim().min(1),
  url: z.string().optional(),
  source: z.string().optional(),
  summary: z.string().optional(),
});

export const generateSchema = z.object({
  postType: z.enum(POST_TYPES as [string, ...string[]]),
  topic: z.string().trim().min(1).optional(),
  newsArticle: articleSchema.optional(),
  // A saved product for "Promote a product"; the topic becomes optional extra direction.
  productId: z.string().uuid().optional(),
  platforms: z.array(z.enum(PLATFORMS)).min(1).max(PLATFORMS.length).default(["linkedin"]),
  language: z.string().trim().min(2).max(8).default("en"),
  media: z.enum(["none", "image", "video", "avatar"]).optional(),
  // Avatar framing/length. "auto" defers to the per-platform aspect.
  avatarAspect: z.enum(["auto", "16:9", "9:16", "4:5", "1:1"]).optional(),
  avatarSeconds: z.union([z.literal(30), z.literal(60), z.literal(120)]).optional(),
  // Image-only shape; OpenAI offers no feed-native 4:5 or 9:16.
  imageShape: z.enum(["square", "portrait", "landscape"]).optional(),
  withImage: z.boolean().default(false),
}).refine((d) => Boolean(d.topic || d.newsArticle || d.productId), {
  message: "Provide a topic, a news article or a product.",
});
