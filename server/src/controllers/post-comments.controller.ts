import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { findById } from "../models/generated-content.model";
import { resolvePlatformAccounts } from "../lib/late-accounts";
import { aggregateComments } from "../lib/post-comments-aggregate";

const COMMENT_SUPPORTED = new Set([
  "linkedin", "instagram", "facebook",
  "twitter", "threads", "reddit",
]);

export async function listComments(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = String(req.params.id);
    const post = await findById(id, req.user!.id);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (!post.latePostId) { res.json({ groups: [] }); return; }

    const scheduled = post.scheduledPlatforms
      ?? (post.platform ? [post.platform] : []);
    const platforms = scheduled.filter((p) => COMMENT_SUPPORTED.has(p));
    if (platforms.length === 0) { res.json({ groups: [] }); return; }

    const entries = await resolvePlatformAccounts(req.user!.id, platforms);
    const groups = await aggregateComments(post.latePostId, entries);
    res.json({ groups });
  } catch (e) { next(e); }
}
