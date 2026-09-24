// Photo avatar creation + training status, against the /api/* proxy.
type Result<T> = { data?: T; error?: string };

export type CreatedAvatar = { groupId: string; lookId: string; status: string };
export type LookStatus = { status: string; error: string | null; previewImage: string | null };

export async function createPhotoAvatar(file: File, name: string): Promise<Result<CreatedAvatar>> {
  const form = new FormData();
  form.append("file", file);
  form.append("name", name);
  const res = await fetch("/api/avatar/photo", { method: "POST", body: form });
  const json = (await res.json().catch(() => ({}))) as CreatedAvatar & { error?: string };
  if (!res.ok) return { error: json.error ?? "Could not create the avatar." };
  return { data: json };
}

export async function fetchLookStatus(lookId: string): Promise<Result<LookStatus>> {
  const res = await fetch(`/api/avatar/looks/${encodeURIComponent(lookId)}/status`);
  const json = (await res.json().catch(() => ({}))) as LookStatus & { error?: string };
  if (!res.ok) return { error: json.error ?? "Could not check the avatar." };
  return { data: json };
}
