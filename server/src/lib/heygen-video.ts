import { heygenFetch } from "./heygen-api";
import { aspectFor } from "./heygen-aspect";
import { renderExtras } from "./heygen-render";

// HeyGen renders an avatar speaking a script. Async — POST returns a video_id,
// then we poll until completed. We ask for SRT captions and prefer the captioned
// cut, since social feeds autoplay muted.
export type AvatarVideoResult = {
  url: string; model: string; durationSec: number | null;
};

const ENGINE = process.env.HEYGEN_ENGINE ?? "avatar_iv";
const POLL_MS = 10_000;
const MAX_POLLS = 90; // ~15 min ceiling

type Created = { data?: { video_id?: string } };
type Status = {
  data?: {
    status?: string;
    video_url?: string | null;
    captioned_video_url?: string | null;
    duration?: number | null;
    error?: { message?: string } | null;
  };
};

export type AvatarVideoInput = {
  script: string; avatarId: string; voiceId: string;
  // Omitted or "auto" → "auto", which matches the look's own framing.
  aspect?: string | null;
  // Drives the voice locale so the script is spoken, not transliterated.
  language?: string | null;
};

export async function createAvatarVideo(
  input: AvatarVideoInput,
): Promise<AvatarVideoResult> {
  const created = await heygenFetch<Created>("/v3/videos", {
    method: "POST",
    body: JSON.stringify({
      type: "avatar",
      avatar_id: input.avatarId,
      voice_id: input.voiceId,
      script: input.script,
      engine: { type: ENGINE },
      aspect_ratio: aspectFor(input.aspect),
      resolution: "1080p",
      output_format: "mp4",
      ...renderExtras({ language: input.language, engine: ENGINE }),
    }),
  });
  const id = created.data?.video_id;
  if (!id) throw new Error("HeyGen: no video_id in create response");
  return pollVideo(id);
}

async function pollVideo(id: string): Promise<AvatarVideoResult> {
  for (let i = 0; i < MAX_POLLS; i++) {
    await new Promise((r) => setTimeout(r, POLL_MS));
    const s = await heygenFetch<Status>(`/v3/videos/${id}`);
    const state = (s.data?.status ?? "").toLowerCase();
    if (state === "completed") {
      const url = s.data?.captioned_video_url ?? s.data?.video_url;
      if (!url) throw new Error("HeyGen: completed but no video url");
      return { url, model: ENGINE, durationSec: s.data?.duration ?? null };
    }
    if (state === "failed") {
      throw new Error(`HeyGen job failed: ${s.data?.error?.message ?? "unknown"}`);
    }
  }
  throw new Error("HeyGen: video timed out");
}
