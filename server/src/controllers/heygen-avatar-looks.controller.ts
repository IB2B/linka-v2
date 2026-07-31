import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { heygenFetch } from "../lib/heygen-api";

// Looks inside one group. These ids ARE what POST /v3/videos accepts, so this is
// what the picker must store. Entries without an id do occur — drop them rather
// than offering a choice that cannot render.
type Look = {
  id?: string; name?: string; status?: string; image_url?: string | null;
  is_motion?: boolean;
};
type Payload = { data?: { avatar_list?: Look[] } };

export async function listAvatarLooks(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const groupId = String(req.params.id);
    const r = await heygenFetch<Payload>(
      `/v2/avatar_group/${encodeURIComponent(groupId)}/avatars`,
    );
    res.json({
      looks: (r.data?.avatar_list ?? [])
        .filter((l): l is Look & { id: string } => Boolean(l.id))
        .map((l) => ({
          id: l.id,
          name: l.name ?? "Untitled",
          previewImage: l.image_url ?? null,
          motion: l.is_motion ?? false,
          ready: (l.status ?? "completed") === "completed",
        })),
    });
  } catch (e) { next(e); }
}
