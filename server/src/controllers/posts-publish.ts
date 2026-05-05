import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { publishPostOnLate, schedulePostOnLate } from "../lib/late-client";
import { resolvePlatformAccounts } from "../lib/late-accounts";
import { partitionPublishResult } from "../lib/late-publish-result";

const platformsSchema = z.array(z.string()).optional();
const scheduleSchema = z.object({
  scheduledFor: z.string().datetime(),
  platforms: platformsSchema,
});
const publishSchema = z.object({ platforms: platformsSchema });

async function resolveOrFail(
  userId: string, platforms: string[], res: Response,
) {
  const entries = await resolvePlatformAccounts(userId, platforms);
  if (entries.length === 0) {
    res.status(400).json({
      error: "No connected accounts for the selected platforms.",
    });
    return null;
  }
  return entries;
}

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
    const entries = await resolveOrFail(req.user!.id, parsed.data.platforms ?? [], res);
    if (!entries) return;
    await schedulePostOnLate(post, when, entries);
    await posts.setSchedule(post.id, req.user!.id, when);
    res.json({ post: await posts.findById(post.id, req.user!.id) });
  } catch (e) { next(e); }
}

export async function publish(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = publishSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    const id = req.params.id as string;
    const post = await posts.findById(id, req.user!.id);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    const entries = await resolveOrFail(req.user!.id, parsed.data.platforms ?? [], res);
    if (!entries) return;
    const result = await publishPostOnLate(post, entries);
    const { publishedTo, failed } = partitionPublishResult(result, entries);
    if (publishedTo.length > 0) {
      await posts.markPosted(post.id, req.user!.id, result.latePostId);
    }
    res.json({
      post: await posts.findById(post.id, req.user!.id),
      publishedTo, failed,
    });
  } catch (e) { next(e); }
}
