import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { heygenFetch } from "../lib/heygen-api";

// Proxies HeyGen's avatar catalogue so the browser never sees the API key.
// `ownership=private` returns the user's own digital twins.
type Row = {
  id: string; name: string; gender?: string;
  preview_image_url?: string; preview_video_url?: string;
  default_voice_id?: string; status?: string;
};
type Paged = { data?: Row[]; next_token?: string | null };

export async function listAvatars(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const params = new URLSearchParams({ limit: "40" });
    const ownership = req.query.ownership === "private" ? "private" : "public";
    params.set("ownership", ownership);
    if (typeof req.query.token === "string" && req.query.token) {
      params.set("token", req.query.token);
    }
    const r = await heygenFetch<Paged>(`/v3/avatars?${params}`);
    res.json({
      avatars: (r.data ?? []).map((a) => ({
        id: a.id,
        name: a.name,
        gender: a.gender ?? null,
        previewImage: a.preview_image_url ?? null,
        previewVideo: a.preview_video_url ?? null,
        defaultVoiceId: a.default_voice_id ?? null,
        ready: (a.status ?? "completed") === "completed",
      })),
      nextToken: r.next_token ?? null,
    });
  } catch (e) { next(e); }
}
