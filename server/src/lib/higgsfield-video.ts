import { higgsfieldFetch } from "./higgsfield-api";

// Higgsfield "DoP" is image-to-video: it animates a seed frame from a motion
// prompt. Async — submit returns a request id, then we poll until completed.
export type VideoResult = { url: string; model: string };

const MODEL = process.env.HIGGSFIELD_VIDEO_MODEL ?? "dop-turbo";
const POLL_MS = 5_000;
const MAX_POLLS = 120; // ~10 min ceiling

type Submit = { request_id?: string; id?: string; requestId?: string };
type Status = {
  status?: string;
  output?: { media_url?: string[] };
  results?: { raw?: { url?: string } };
};

function pickId(s: Submit): string {
  const id = s.request_id ?? s.id ?? s.requestId;
  if (!id) throw new Error("Higgsfield: no request id in submit response");
  return id;
}

function pickUrl(s: Status): string | null {
  return s.results?.raw?.url ?? s.output?.media_url?.[0] ?? null;
}

export async function createImageToVideo(
  prompt: string, imageUrl: string,
): Promise<VideoResult> {
  const submit = await higgsfieldFetch<Submit>("/v1/image2video/dop", {
    method: "POST",
    body: JSON.stringify({
      model: MODEL,
      prompt,
      input_images: [{ type: "image_url", image_url: imageUrl }],
    }),
  });
  const id = pickId(submit);

  for (let i = 0; i < MAX_POLLS; i++) {
    await new Promise((r) => setTimeout(r, POLL_MS));
    const s = await higgsfieldFetch<Status>(`/v1/requests/${id}/status`);
    const state = (s.status ?? "").toLowerCase();
    if (state === "completed") {
      const url = pickUrl(s);
      if (!url) throw new Error("Higgsfield: completed but no video url");
      return { url, model: MODEL };
    }
    if (state === "failed" || state === "error" || state === "nsfw") {
      throw new Error(`Higgsfield job ${state}`);
    }
  }
  throw new Error("Higgsfield: video timed out");
}
