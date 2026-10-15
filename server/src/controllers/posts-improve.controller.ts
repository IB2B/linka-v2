import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { improvePost } from "../services/post-improve.service";
import { rateLimit } from "../lib/rate-limit";

const HOUR = 60 * 60 * 1000;

const schema = z.object({
  suggestions: z.array(z.string().trim().min(1).max(300)).max(6).default([]),
  note: z.string().trim().max(500).optional(),
}).refine((d) => d.suggestions.length > 0 || Boolean(d.note), {
  message: "Pick at least one suggestion or write what to change.",
});

// Applies the chosen virality suggestions to the post's current text. Free like
// "Regenerate text", but rate limited since each call is an AI edit.
export async function improveText(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    if (!rateLimit(`improve:${userId}`, 20, HOUR).allowed) {
      res.status(429).json({ error: "Too many edits for now. Try again in a bit." });
      return;
    }
    const id = req.params.id as string;
    const post = await posts.findById(id, userId);
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (post.status === "posted") { res.status(400).json({ error: "Already posted." }); return; }
    if (!post.content?.trim()) { res.status(400).json({ error: "Post has no text to improve." }); return; }
    const changes = [...parsed.data.suggestions, ...(parsed.data.note ? [parsed.data.note] : [])];
    const content = await improvePost(post.content, post.platform ?? "linkedin", changes);
    await posts.setContent(id, userId, content);
    res.json({ content });
  } catch (e) { next(e); }
}
