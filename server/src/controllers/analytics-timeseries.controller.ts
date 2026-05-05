import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import * as snapshots from "../models/post-metric-snapshot.model";

export async function getPostTimeseries(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const post = await posts.findById(id, req.user!.id);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    const series = await snapshots.listSnapshots(id);
    res.json({ series });
  } catch (e) { next(e); }
}
