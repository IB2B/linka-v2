import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { listGroupLooks } from "../lib/heygen-look";
import { ignoreStatus } from "../lib/ignore-status";
import { listUserGroups } from "../models/user-avatar-groups.model";

// "My avatars": only the people this user created from their own photos. The
// shared HeyGen workspace also holds the team's private avatars, which must
// never reach other users; public avatars live in the stock library tab.
// A group is NOT renderable on its own; its looks are.
export async function listAvatarGroups(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const owned = await listUserGroups(req.user!.id);
    const groups = await Promise.all(owned.map(async (g) => {
      // A group deleted on HeyGen's side just drops out of the list.
      const looks = await ignoreStatus(listGroupLooks(g.groupId), [400, 404]);
      if (!looks) return null;
      return {
        id: g.groupId,
        name: g.name,
        looks: looks.length,
        previewImage: looks[0]?.previewImage ?? null,
        trained: looks.some((l) => l.status === "completed"),
        // e.g. HeyGen's moderation rejected the photo; shown on the tile.
        failed: looks.length > 0 && looks.every((l) => l.status === "failed"),
        error: looks.find((l) => l.error)?.error ?? null,
      };
    }));
    res.json({ groups: groups.filter((g) => g !== null) });
  } catch (e) { next(e); }
}
