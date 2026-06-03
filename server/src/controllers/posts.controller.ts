import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { deleteGeneratedImage } from "../lib/image-storage";
import { syncScheduledPosts } from "../lib/sync-scheduled";

export { schedule, publish } from "./posts-publish";

const updateSchema = z.object({
  content: z.string().trim().min(1, "Content can't be empty.").max(10000),
});

export async function updateContent(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const userId = req.user!.id;
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    const post = await posts.findById(id, userId);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (post.status === "posted") {
      res.status(400).json({ error: "Can't edit a published post." }); return;
    }
    await posts.setContent(id, userId, parsed.data.content);
    res.json({ post: await posts.findById(id, userId) });
  } catch (e) { next(e); }
}

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
