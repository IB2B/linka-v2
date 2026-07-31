import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { heygenFetch } from "../lib/heygen-api";
import { languageNameFor } from "../lib/language-name";
import { preferredLanguage } from "../lib/user-language";

// Proxies HeyGen's voice catalogue. ?language= takes an ISO code ("it") or the
// literal "all"; ?gender= narrows further.
type Row = {
  voice_id: string; name: string; language?: string; gender?: string;
  preview_audio_url?: string;
};
type Paged = { data?: Row[]; next_token?: string | null };

// The catalogue runs to thousands of voices and the first page is almost
// entirely English, so an unfiltered list reads as "HeyGen has no Italian
// voices" when it has hundreds. Default to the language the user posts in.
async function resolveLanguage(
  raw: unknown, userId: string,
): Promise<{ filter: string | null; code: string }> {
  const asked = typeof raw === "string" ? raw.trim() : "";
  if (asked === "all") return { filter: null, code: "all" };
  if (asked) return { filter: languageNameFor(asked), code: asked };

  const code = await preferredLanguage(userId).catch(() => null);
  return { filter: languageNameFor(code), code: code ?? "all" };
}

export async function listVoices(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const params = new URLSearchParams({ limit: "100" });
    const { filter, code } = await resolveLanguage(
      req.query.language, req.user!.id,
    );
    if (filter) params.set("language", filter);

    const gender = req.query.gender;
    if (typeof gender === "string" && gender) params.set("gender", gender);
    if (typeof req.query.token === "string" && req.query.token) {
      params.set("token", req.query.token);
    }

    const r = await heygenFetch<Paged>(`/v3/voices?${params}`);
    res.json({
      // Echoed so the picker can show which language it landed on — the
      // default is chosen here, and the browser has no way to know it.
      language: filter ? code : "all",
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
