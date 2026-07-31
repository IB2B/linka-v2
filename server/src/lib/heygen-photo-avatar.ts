import { heygenFetch, HeygenError } from "./heygen-api";

// Photo avatars, not digital twins. Digital twins are capped per plan (5 on
// Creator) so they cannot scale across users; photo avatars are unlimited, which
// makes them the only workable basis for user-created avatars.
//
// The upload host differs from the API host and takes a RAW body — not
// multipart — which is why this does not go through heygenFetch.
const UPLOAD_URL = "https://upload.heygen.com/v1/asset";

type Uploaded = { data?: { image_key?: string; url?: string } };

export async function uploadAvatarImage(
  body: Buffer, mime: string,
): Promise<string> {
  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: { "x-api-key": process.env.HEYGEN_API_KEY ?? "", "Content-Type": mime },
    body: new Uint8Array(body),
  });
  const json = (await res.json().catch(() => ({}))) as Uploaded;
  if (!res.ok || !json.data?.image_key) {
    throw new HeygenError(res.status, "Could not upload that image.");
  }
  return json.data.image_key;
}

type Created = { data?: { id?: string } };

export async function createPhotoAvatarGroup(
  name: string, imageKey: string,
): Promise<string> {
  const r = await heygenFetch<Created>("/v2/photo_avatar/avatar_group/create", {
    method: "POST",
    body: JSON.stringify({ name, image_key: imageKey }),
  });
  const id = r.data?.id;
  if (!id) throw new Error("HeyGen returned no avatar group id");
  return id;
}

// Async and billable — the group exists before this runs, but its looks cannot
// render until training completes.
export async function trainPhotoAvatarGroup(groupId: string): Promise<void> {
  await heygenFetch("/v2/photo_avatar/train", {
    method: "POST",
    body: JSON.stringify({ group_id: groupId }),
  });
}

type Status = { data?: { status?: string; error_msg?: string | null } };

export async function photoAvatarTrainStatus(groupId: string): Promise<string> {
  const r = await heygenFetch<Status>(
    `/v2/photo_avatar/train/status/${encodeURIComponent(groupId)}`,
  );
  return r.data?.status ?? "unknown";
}
