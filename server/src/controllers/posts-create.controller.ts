import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import { insertOne } from "../models/generated-content.model";

const schema = z.object({
  content: z.string().trim().min(1).max(5000),
  imageUrl: z.string().trim().startsWith("/uploads/").max(512).nullable().optional(),
});

// Creates a manual (user-written) post row, ready to publish/schedule via the
// existing /posts/:id/publish and /posts/:id/schedule endpoints.
export async function createManual(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    const { content, imageUrl } = parsed.data;
    const post = await insertOne({
      userId: req.user!.id, prompt: null, content, platform: null,
      imageUrl: imageUrl ?? null, imageStatus: imageUrl ? "completed" : "skipped",
    });
    res.status(201).json({ post });
  } catch (e) { next(e); }
}
