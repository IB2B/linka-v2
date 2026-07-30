import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { heygenFetch } from "../lib/heygen-api";

// Proxies HeyGen's voice catalogue. Optional ?language= and ?gender= filters
// let the UI narrow to the user's posting language.
type Row = {
  voice_id: string; name: string; language?: string; gender?: string;
  preview_audio_url?: string;
};
type Paged = { data?: Row[]; next_token?: string | null };

const FILTERS = ["language", "gender"] as const;

export async function listVoices(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const params = new URLSearchParams({ limit: "100" });
    for (const key of FILTERS) {
      const v = req.query[key];
      if (typeof v === "string" && v) params.set(key, v);
    }
    if (typeof req.query.token === "string" && req.query.token) {
      params.set("token", req.query.token);
    }
    const r = await heygenFetch<Paged>(`/v3/voices?${params}`);
    res.json({
      voices: (r.data ?? []).map((v) => ({
        id: v.voice_id,
        name: v.name,
        language: v.language ?? null,
        gender: v.gender ?? null,
        previewAudio: v.preview_audio_url ?? null,
      })),
      nextToken: r.next_token ?? null,
    });
  } catch (e) { next(e); }
}
