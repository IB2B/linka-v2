import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { fetchAndSnapshotAnalytics } from "../lib/late-analytics";
import { concurrentMap } from "../lib/concurrent-map";
import type { PostMetrics } from "../types/analytics";

type Item = { postId: string; totals: PostMetrics | null };

export async function getAnalyticsSummary(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const all = await posts.listForUser(req.user!.id);
    const posted = all.filter((p) => p.latePostId);
    const userId = req.user!.id;
    const settled = await concurrentMap(posted, 5, (p) =>
      fetchAndSnapshotAnalytics(p.latePostId!, p.id, userId),
    );
    const items: Item[] = posted.map((p, i) => {
      const r = settled[i];
      const totals = r.status === "fulfilled" && r.value.state === "ok"
        ? r.value.totals : null;
      return { postId: p.id, totals };
    });
    res.json({ items });
  } catch (e) { next(e); }
}
