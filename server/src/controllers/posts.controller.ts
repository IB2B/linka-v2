import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { deleteGeneratedImage } from "../lib/image-storage";
import { syncScheduledPosts } from "../lib/sync-scheduled";

export { schedule, publish } from "./posts-publish";

export async function list(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    await syncScheduledPosts(req.user!.id);
    res.json({ posts: await posts.listForUser(req.user!.id) });
  } catch (e) { next(e); }
}

export async function getOne(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const post = await posts.findById(id, req.user!.id);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    res.json({ post });
  } catch (e) { next(e); }
}

export async function remove(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const existing = await posts.findById(id, req.user!.id);
    const ok = await posts.deleteById(id, req.user!.id);
    if (!ok) { res.status(404).json({ error: "Not found" }); return; }
    if (existing?.imageUrl) await deleteGeneratedImage(existing.imageUrl);
    res.json({ ok: true });
  } catch (e) { next(e); }
}
