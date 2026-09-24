import { heygenFetch } from "./heygen-api";
import { ignoreStatus } from "./ignore-status";

export type HeygenLook = {
  id: string;
  name: string;
  groupId: string | null;
  status: string;
  error: string | null;
  previewImage: string | null;
};

type Row = {
  id?: string; name?: string; group_id?: string; status?: string;
  preview_image_url?: string | null; error?: { message?: string } | null;
};

export function toLook(r: Row & { id: string }): HeygenLook {
  return {
    id: r.id,
    name: r.name ?? "Untitled",
    groupId: r.group_id ?? null,
    status: r.status ?? "completed",
    error: r.error?.message ?? null,
    previewImage: r.preview_image_url ?? null,
  };
}

// One look by id, or null when the id is not a look (a group id answers 404).
export async function getLook(lookId: string): Promise<HeygenLook | null> {
  const r = await ignoreStatus(
    heygenFetch<{ data?: Row }>(`/v3/avatars/looks/${encodeURIComponent(lookId)}`),
  );
  return r?.data?.id ? toLook({ ...r.data, id: r.data.id }) : null;
}

export async function listGroupLooks(groupId: string): Promise<HeygenLook[]> {
  const r = await heygenFetch<{ data?: Row[] }>(
    `/v3/avatars/looks?group_id=${encodeURIComponent(groupId)}`,
  );
  return (r.data ?? [])
    .filter((l): l is Row & { id: string } => Boolean(l.id))
    .map(toLook);
}
