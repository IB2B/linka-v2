import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { fetchAndSnapshotAnalytics } from "../lib/late-analytics";

export async function getPostAnalytics(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const post = await posts.findById(id, req.user!.id);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (!post.latePostId) {
      res.json({ analytics: { state: "unposted" } });
      return;
    }
    const allowed = post.scheduledPlatforms?.length
      ? post.scheduledPlatforms
      : post.platform ? [post.platform] : null;
    const force = req.query.refresh === "1";
    const analytics = await fetchAndSnapshotAnalytics(
      post.latePostId, post.id, req.user!.id, allowed, force,
    );
    res.json({ analytics });
  } catch (e) { next(e); }
}
