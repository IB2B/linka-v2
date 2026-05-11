import type { Response, NextFunction } from "express";
import { z } from "zod";

import type { AuthRequest } from "../middleware/auth";
import { findById } from "../models/generated-content.model";
import { resolvePlatformAccounts } from "../lib/late-accounts";
import { replyToPostComment } from "../lib/late-comments";

function absoluteMediaUrl(req: AuthRequest, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const proto = (req.headers["x-forwarded-proto"] as string) ?? req.protocol;
  const host = req.headers.host;
  return `${proto}://${host}${path.startsWith("/") ? "" : "/"}${path}`;
}

const schema = z.object({
  platform: z.string().min(1),
  commentId: z.string().min(1),
  message: z.string().trim().min(1).max(5000),
  imageUrl: z.string().min(1).max(2000).optional(),
});

export async function replyComment(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = String(req.params.id);
    const post = await findById(id, req.user!.id);
    if (!post?.latePostId) {
      res.status(404).json({ error: "Post not found." }); return;
    }
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    const entries = await resolvePlatformAccounts(
      req.user!.id, [parsed.data.platform],
    );
    if (entries.length === 0) {
      res.status(400).json({ error: "Account not connected." }); return;
    }
    const mediaUrl = parsed.data.imageUrl
      ? absoluteMediaUrl(req, parsed.data.imageUrl)
      : undefined;
    const result = await replyToPostComment(
      post.latePostId, entries[0].accountId,
      parsed.data.commentId, parsed.data.message, mediaUrl,
    );
    res.status(201).json({ id: result.data?.commentId ?? null });
  } catch (e) { next(e); }
}
