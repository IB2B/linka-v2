import type {
  AvatarChoice, AvatarGroup, AvatarOption, VoiceOption,
} from "@/types/avatar-settings";

// Browser fetches against the /api/* proxy — same-origin, cookie carried.
type Result<T> = { data?: T; error?: string };

async function get<T>(path: string): Promise<Result<T>> {
  const res = await fetch(path);
  const json = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) return { error: json.error ?? "Request failed." };
  return { data: json };
}

export function fetchAvatarGroups() {
  return get<{ groups: AvatarGroup[] }>("/api/avatar/groups");
}

export function fetchGroupLooks(groupId: string) {
  return get<{ looks: AvatarOption[] }>(
    `/api/avatar/groups/${encodeURIComponent(groupId)}/looks`,
  );
}

export function fetchStockAvatars(q: string, limit = 24) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (q.trim()) params.set("q", q.trim());
  return get<{ avatars: AvatarOption[]; total: number }>(
    `/api/avatar/avatars?${params}`,
  );
}

// Omitting language lets the server default to the user's posting language;
// it echoes back the code it chose so the picker can show it.
export function fetchVoices(language?: string) {
  const params = new URLSearchParams();
  if (language) params.set("language", language);
  return get<{ voices: VoiceOption[]; language: string }>(
    `/api/avatar/voices?${params}`,
  );
}

export function fetchAvatarChoice() {
  return get<{ avatar: AvatarChoice | null }>("/api/avatar/settings");
}

export async function saveAvatarChoice(
  choice: AvatarChoice,
): Promise<{ error?: string; success?: boolean }> {
  const res = await fetch("/api/avatar/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(choice),
  });
  const json = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) return { error: json.error ?? "Could not save." };
  return { success: true };
}
