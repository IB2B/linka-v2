import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { generatePost } from "../services/post-generation.service";
import { generateImageForPostInBackground }
  from "../services/image-generation.service";
import { checkImageRateLimit } from "../lib/image-rate-limiter";
import { deleteGeneratedImage } from "../lib/image-storage";
import { setImageGenerating } from "../models/generated-content-image.model";

export async function regenerateText(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const userId = req.user!.id;
    const post = await posts.findById(id, userId);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (post.status === "posted") {
      res.status(400).json({ error: "Already posted." }); return;
    }
    const result = await generatePost({
      userId, postType: "personal_insight",
      topic: post.prompt ?? undefined,
      platform: post.platform ?? "linkedin", language: "en",
    });
    await posts.setContent(id, userId, result.content);
    res.json({ post: await posts.findById(id, userId) });
  } catch (e) { next(e); }
}

export async function regenerateImage(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const userId = req.user!.id;
    const customPrompt =
      typeof req.body?.imagePrompt === "string" && req.body.imagePrompt.trim()
        ? (req.body.imagePrompt as string).trim()
        : undefined;
    const post = await posts.findById(id, userId);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    const limit = checkImageRateLimit(userId);
    if (!limit.allowed) {
      res.status(429).json({ error: "Image rate limit reached." }); return;
    }
    if (post.imageUrl) await deleteGeneratedImage(post.imageUrl);
    await setImageGenerating(id, userId);
    void generateImageForPostInBackground(
      id, userId, post.content, post.platform ?? "linkedin", customPrompt,
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
}
