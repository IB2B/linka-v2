import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import { getAvatarChoice, saveAvatarChoice } from "../models/user-avatar.model";
import { groupOwner } from "../models/user-avatar-groups.model";
import { getLook } from "../lib/heygen-look";

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
    // Another user's face must never be usable, even with a hand-made request.
    const look = await getLook(parsed.data.avatarId);
    const owner = look?.groupId ? await groupOwner(look.groupId) : null;
    if (owner && owner !== req.user!.id) {
      res.status(404).json({ error: "Avatar not found." });
      return;
    }
    await saveAvatarChoice(req.user!.id, parsed.data);
    res.json({ success: true });
  } catch (e) { next(e); }
}
