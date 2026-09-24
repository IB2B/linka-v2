import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { heygenFetch } from "../lib/heygen-api";
import { loadGroupOwners } from "../models/user-avatar-groups.model";

// The account's own avatar groups — digital twins and photo-avatar sets. A group
// is NOT renderable on its own; its looks are, so the UI drills into one via
// /avatar/groups/:id/looks.
type Group = {
  id: string; name?: string; looks_count?: number; preview_image_url?: string | null;
};
type Page = { data?: Group[]; has_more?: boolean; next_token?: string };

const MAX_PAGES = 10;

async function listPrivateGroups(): Promise<Group[]> {
  const all: Group[] = [];
  let token = "";
  for (let i = 0; i < MAX_PAGES; i++) {
    const qs = new URLSearchParams({ ownership: "private", limit: "50" });
    if (token) qs.set("token", token);
    const page = await heygenFetch<Page>(`/v3/avatars?${qs}`);
    all.push(...(page.data ?? []));
    if (!page.has_more || !page.next_token) break;
    token = page.next_token;
  }
  return all;
}

export async function listAvatarGroups(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [groups, owners] = await Promise.all([listPrivateGroups(), loadGroupOwners()]);
    // One HeyGen workspace serves every user. A group someone uploaded is theirs
    // alone; unclaimed groups are the house avatars everyone may use.
    const visible = groups.filter((g) => {
      const owner = owners.get(g.id);
      return !owner || owner === req.user!.id;
    });
    res.json({
      groups: visible.map((g) => ({
        id: g.id,
        name: g.name ?? "Untitled",
        looks: g.looks_count ?? 0,
        previewImage: g.preview_image_url ?? null,
        trained: (g.looks_count ?? 0) > 0,
      })),
    });
  } catch (e) { next(e); }
}
