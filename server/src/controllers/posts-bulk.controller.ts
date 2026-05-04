import type { Response, NextFunction } from "express";
import { z } from "zod";

import type { AuthRequest } from "../middleware/auth";
import * as posts from "../models/generated-content.model";
import { deleteGeneratedImage } from "../lib/image-storage";

const schema = z.object({ ids: z.array(z.string().uuid()).min(1).max(200) });

export async function bulkDelete(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "ids required" }); return; }
    const userId = req.user!.id;
    let deleted = 0;
    for (const id of parsed.data.ids) {
      const existing = await posts.findById(id, userId);
      const ok = await posts.deleteById(id, userId);
      if (ok) {
        deleted += 1;
        if (existing?.imageUrl) await deleteGeneratedImage(existing.imageUrl);
      }
    }
    res.json({ deleted });
  } catch (e) { next(e); }
}
