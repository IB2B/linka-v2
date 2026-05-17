import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import { POST_TYPES } from "../lib/post-type-guidance";
import { getCached, setCached } from "../lib/topic-cache";
import { generateTopics } from "../services/topic-suggestions.service";

const schema = z.object({
  postType: z.enum(POST_TYPES as [string, ...string[]]),
  count: z.number().int().min(1).max(10).default(5),
  refresh: z.boolean().optional(),
});

export async function suggestTopics(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const { postType, count, refresh } = parsed.data;
    const userId = req.user!.id;
    const cacheKey = `${userId}-${postType}`;

    const cached = refresh ? null : getCached(cacheKey);
    if (cached) {
      res.json({
        postType,
        suggestions: cached.slice(0, count).map((topic) => ({ topic })),
        cached: true,
      });
      return;
    }

    const topics = await generateTopics(userId, postType, count);
    setCached(cacheKey, topics);
    res.json({
      postType,
      suggestions: topics.slice(0, count).map((topic) => ({ topic })),
      cached: false,
    });
  } catch (e) {
    next(e);
  }
}
