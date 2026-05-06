import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { rewriteForRecycle } from "../services/recycle-rewrite.service";

const schema = z.object({ postId: z.string().min(1) });

export async function regenerateFromPost(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    const userId = req.user!.id;
    const original = await posts.findById(parsed.data.postId, userId);
    if (!original) { res.status(404).json({ error: "Not found" }); return; }
    if (original.status !== "posted") {
      res.status(400).json({ error: "Only posted content can be recycled." }); return;
    }
    const platform = original.platform ?? "linkedin";
    const content = await rewriteForRecycle({
      original: original.content, platform,
    });
    const draft = await posts.insertOne({
      userId, prompt: original.prompt, content, platform,
    });
    res.json({ post: draft, sourcePostId: original.id });
  } catch (e) { next(e); }
}
