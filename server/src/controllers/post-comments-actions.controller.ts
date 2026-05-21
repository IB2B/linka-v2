import type { Response, NextFunction } from "express";
import { z } from "zod";

import type { AuthRequest } from "../middleware/auth";
import { findById } from "../models/generated-content.model";
import { resolvePlatformAccounts } from "../lib/late-accounts";
import {
  likeComment, deleteComment,
} from "../lib/late-comment-actions";

const baseSchema = z.object({
  platform: z.string().min(1),
  commentId: z.string().min(1),
  cid: z.string().optional(),
});

async function ctx(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const post = await findById(id, req.user!.id);
  if (!post?.latePostId) { res.status(404).json({ error: "Not found." }); return null; }
  const parsed = baseSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Bad request." }); return null; }
  const entries = await resolvePlatformAccounts(req.user!.id, [parsed.data.platform]);
  if (entries.length === 0) {
    res.status(400).json({ error: "Account not connected." }); return null;
  }
  return { postId: post.latePostId, accountId: entries[0].accountId, body: parsed.data };
}

export async function likeAction(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const c = await ctx(req, res); if (!c) return;
    const r = await likeComment(c.postId, c.body.commentId, c.accountId, c.body.cid);
    res.json({ liked: r.liked ?? true });
  } catch (e) { next(e); }
}

export async function deleteAction(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const c = await ctx(req, res); if (!c) return;
    await deleteComment(c.postId, c.body.commentId, c.accountId);
    res.json({ success: true });
  } catch (e) { next(e); }
}
