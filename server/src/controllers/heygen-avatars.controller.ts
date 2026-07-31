import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { heygenFetch } from "../lib/heygen-api";

// Stock avatar catalogue, sourced from /v2/avatars because those are LOOK ids —
// the only kind POST /v3/videos accepts. The v3 catalogue returns group ids,
// which answer every render with "Avatar not found", so it must not be used here.
//
// The list runs past a thousand entries and repeats ids, so it is deduped,
// name-searched and paged before reaching the browser.
type Row = {
  avatar_id: string; avatar_name?: string; gender?: string;
  preview_image_url?: string; preview_video_url?: string;
};
type Payload = { data?: { avatars?: Row[] } };

export async function listAvatars(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const q = typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : "";
    const limit = Math.min(Math.max(Number(req.query.limit) || 40, 1), 100);
    const offset = Math.max(Number(req.query.offset) || 0, 0);

    const r = await heygenFetch<Payload>("/v2/avatars");
    const seen = new Set<string>();
    const rows = (r.data?.avatars ?? []).filter((a) => {
      if (!a.avatar_id || seen.has(a.avatar_id)) return false;
      seen.add(a.avatar_id);
      return !q || (a.avatar_name ?? "").toLowerCase().includes(q);
    });

    res.json({
      total: rows.length,
      avatars: rows.slice(offset, offset + limit).map((a) => ({
        id: a.avatar_id,
        name: a.avatar_name ?? "Untitled",
        gender: a.gender && a.gender !== "unknown" ? a.gender : null,
        previewImage: a.preview_image_url ?? null,
        previewVideo: a.preview_video_url ?? null,
      })),
    });
  } catch (e) { next(e); }
}
