import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { heygenFetch } from "../lib/heygen-api";

// The account's own avatar groups — digital twins and photo-avatar sets. A group
// is NOT renderable on its own; its looks are, so the UI drills into one via
// /avatar/groups/:id/looks.
type Group = {
  id: string; name?: string; num_looks?: number;
  preview_image?: string | null; group_type?: string; train_status?: string;
};
type Payload = { data?: { avatar_group_list?: Group[] } };

export async function listAvatarGroups(
  _req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const r = await heygenFetch<Payload>("/v2/avatar_group.list");
    res.json({
      groups: (r.data?.avatar_group_list ?? []).map((g) => ({
        id: g.id,
        name: g.name ?? "Untitled",
        looks: g.num_looks ?? 0,
        previewImage: g.preview_image ?? null,
        kind: g.group_type ?? null,
        trained: (g.train_status ?? "") !== "empty",
      })),
    });
  } catch (e) { next(e); }
}
