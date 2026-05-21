import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { recordOutcomes } from "../models/posting-history.model";
import { publishPostOnLate, schedulePostOnLate, deleteLatePost } from "../lib/late-client";
import { partitionPublishResult } from "../lib/late-publish-result";
import { publishOutcomeToRows } from "../lib/publish-outcome-to-rows";
import { resolveOrFail } from "./posts-publish-helpers";
import { sendPostFailedEmail } from "../lib/post-event-emails";

const platformsSchema = z.array(z.string()).optional();
const scheduleSchema = z.object({
  scheduledFor: z.string().datetime(),
  platforms: platformsSchema,
});
const publishSchema = z.object({ platforms: platformsSchema });

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
    const r = await schedulePostOnLate(post, when, entries);
    try {
      await posts.setSchedule(
        post.id, req.user!.id, when,
        entries.map((e) => e.platform), r.latePostId,
      );
    } catch (dbErr) {
      await deleteLatePost(r.latePostId).catch((e) => console.error("[compensate] deleteLatePost failed", e));
      throw dbErr;
    }
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
    const outcome = partitionPublishResult(result, entries);
    if (outcome.publishedTo.length > 0) {
      await posts.markPosted(post.id, req.user!.id, result.latePostId);
    }
    await recordOutcomes(req.user!.id, post.id, publishOutcomeToRows(outcome));
    if (outcome.failed.length > 0) {
      sendPostFailedEmail(
        req.user!.id, post.id, post.content.slice(0, 140),
        outcome.failed.map((f) => f.platform),
      ).catch((e) => console.error("[email] post-failed", e));
    }
    res.json({
      post: await posts.findById(post.id, req.user!.id),
      ...outcome,
    });
  } catch (e) { next(e); }
}
