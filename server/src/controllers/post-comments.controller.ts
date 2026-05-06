import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { findById } from "../models/generated-content.model";
import { fetchPostAnalytics } from "../lib/late-analytics";
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

    const analytics = await fetchPostAnalytics(post.latePostId);
    if (analytics.state !== "ok") { res.json({ groups: [] }); return; }

    const platforms = analytics.platforms
      .filter((p) => p.status === "ok" && COMMENT_SUPPORTED.has(p.platform))
      .map((p) => p.platform);
    if (platforms.length === 0) { res.json({ groups: [] }); return; }

    const entries = await resolvePlatformAccounts(req.user!.id, platforms);
    const groups = await aggregateComments(post.latePostId, entries);
    res.json({ groups });
  } catch (e) { next(e); }
}
