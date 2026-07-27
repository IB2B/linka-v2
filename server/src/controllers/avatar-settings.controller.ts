import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import { getAvatarChoice, saveAvatarChoice } from "../models/user-avatar.model";

const schema = z.object({
  avatarId: z.string().trim().min(1).max(128),
  voiceId: z.string().trim().min(1).max(128),
});

export async function getAvatarSettings(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const choice = await getAvatarChoice(req.user!.id);
    res.json({ avatar: choice });
  } catch (e) { next(e); }
}

export async function putAvatarSettings(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    await saveAvatarChoice(req.user!.id, parsed.data);
    res.json({ success: true });
  } catch (e) { next(e); }
}
