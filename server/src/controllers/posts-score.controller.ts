import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { scorePost } from "../services/post-score.service";

export async function scoreById(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const userId = req.user!.id;
    const post = await posts.findById(id, userId);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (!post.content?.trim()) {
      res.status(400).json({ error: "Post has no content to score." });
      return;
    }
    const result = await scorePost(post.content, post.platform ?? "linkedin");
    res.json(result);
  } catch (e) { next(e); }
}
