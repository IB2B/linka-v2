import type { Response, NextFunction } from "express";
import { z } from "zod";

import type { AuthRequest } from "../middleware/auth";
import { findById } from "../models/generated-content.model";
import { getAnthropic } from "../lib/anthropic";

const schema = z.object({
  platform: z.string().min(1),
  commentMessage: z.string().trim().min(1).max(5000),
  commenterName: z.string().trim().max(120).optional(),
});

const SYSTEM = `You write short, friendly replies to social-media comments on behalf of the post's author. Match the tone of the platform. Keep it under 280 characters. Acknowledge the commenter, add genuine value, end with a light question when natural. No hashtags, no emojis unless the original comment used them. Return ONLY the reply text — no quotes, no preamble.`;

export async function suggestReply(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const id = String(req.params.id);
    const post = await findById(id, req.user!.id);
    if (!post) { res.status(404).json({ error: "Post not found." }); return; }

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    const { platform, commentMessage, commenterName } = parsed.data;
    const prompt = [
      `Platform: ${platform}`,
      `Original post:\n${post.content}`,
      commenterName ? `Commenter: ${commenterName}` : null,
      `Their comment:\n${commentMessage}`,
      "Write the reply.",
    ].filter(Boolean).join("\n\n");

    const anthropic = getAnthropic();
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("").trim();
    res.json({ suggestion: text });
  } catch (e) { next(e); }
}
