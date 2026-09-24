import { heygenFetch, HeygenError } from "./heygen-api";

// v3 photo avatars: upload the photo as an asset, then create the avatar from
// it. Creating starts training on its own (v3 has no train call) and bills the
// wallet, so callers check funding first. The v2 upload/create/train endpoints
// stop working on 2026-10-31.
const base = () => process.env.HEYGEN_API_URL ?? "https://api.heygen.com";

type Asset = { data?: { asset_id?: string } };

// Multipart, so this skips heygenFetch, which always sends a JSON content type.
export async function uploadAvatarAsset(
  body: Buffer, mime: string, filename: string,
): Promise<string> {
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(body)], { type: mime }), filename);
  const res = await fetch(`${base()}/v3/assets`, {
    method: "POST",
    headers: { "x-api-key": process.env.HEYGEN_API_KEY ?? "" },
    body: form,
  });
  const json = (await res.json().catch(() => ({}))) as Asset;
  if (!res.ok || !json.data?.asset_id) {
    throw new HeygenError(res.status, "Could not upload that photo.");
  }
  return json.data.asset_id;
}

type Created = {
  data?: {
    avatar_item?: { id?: string; group_id?: string };
    avatar_group?: { id?: string };
  };
};

export type PhotoAvatar = { lookId: string; groupId: string };

// Returns at once with status "processing"; the look id is what POST
// /v3/videos renders, the group id is what the avatar picker browses.
export async function createPhotoAvatar(name: string, assetId: string): Promise<PhotoAvatar> {
  const r = await heygenFetch<Created>("/v3/avatars", {
    method: "POST",
    body: JSON.stringify({ type: "photo", name, file: { type: "asset_id", asset_id: assetId } }),
  });
  const lookId = r.data?.avatar_item?.id;
  const groupId = r.data?.avatar_item?.group_id ?? r.data?.avatar_group?.id;
  if (!lookId || !groupId) throw new Error("HeyGen returned no avatar id");
  return { lookId, groupId };
}
