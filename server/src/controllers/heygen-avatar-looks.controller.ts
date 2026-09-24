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
    const owner = await groupOwner(groupId);
    if (owner && owner !== req.user!.id) {
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
