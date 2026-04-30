import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { schedulePostOnLate, publishPostOnLate } from "../lib/late-client";
import { deleteGeneratedImage } from "../lib/image-storage";

export async function list(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try { res.json({ posts: await posts.listForUser(req.user!.id) }); }
  catch (e) { next(e); }
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

const scheduleSchema = z.object({
  scheduledFor: z.string().datetime(),
});

export async function schedule(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = scheduleSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    const id = req.params.id as string;
    const post = await posts.findById(id, req.user!.id);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    const when = new Date(parsed.data.scheduledFor);
    if (when.getTime() <= Date.now()) {
      res.status(400).json({ error: "Schedule must be in the future." }); return;
    }
    await schedulePostOnLate(post, when);
    await posts.setSchedule(post.id, req.user!.id, when);
    res.json({ post: await posts.findById(post.id, req.user!.id) });
  } catch (e) { next(e); }
}

export async function publish(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id as string;
    const post = await posts.findById(id, req.user!.id);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    const result = await publishPostOnLate(post);
    await posts.markPosted(post.id, req.user!.id, result.latePostId);
    res.json({ post: await posts.findById(post.id, req.user!.id) });
  } catch (e) { next(e); }
}
