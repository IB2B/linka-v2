import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { listGroupLooks } from "../lib/heygen-look";
import { groupOwner } from "../models/user-avatar-groups.model";

// Looks inside one group. These ids ARE what POST /v3/videos accepts, so this is
// what the picker must store.
export async function listAvatarLooks(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const groupId = String(req.params.id);
    // Only groups this user created can be browsed; stock looks come from the
    // stock library, which lists looks directly.
    if ((await groupOwner(groupId)) !== req.user!.id) {
      res.status(404).json({ error: "Avatar not found." });
      return;
    }
    const looks = await listGroupLooks(groupId);
    res.json({
      looks: looks.map((l) => ({
        id: l.id,
        name: l.name,
        previewImage: l.previewImage,
        ready: l.status === "completed",
      })),
    });
  } catch (e) { next(e); }
}
