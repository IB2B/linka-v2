import { heygenFetch } from "./heygen-api";

// HeyGen has two id namespaces and only one of them can be rendered. The avatar
// catalogue (/v3/avatars, /v2/avatar_group.list) returns *group* ids — a digital
// twin is a group of "looks" — but POST /v3/videos only accepts a *look* id, and
// answers a group id with a bare "Avatar not found". This resolves one to the
// other so a stored group id still renders.
type LookRow = { id?: string; name?: string; status?: string };
type Looks = { data?: { avatar_list?: LookRow[] } };

// Returns the input untouched when it is already a look id (the group lookup
// 404s) so both old and new stored values keep working with no migration.
export async function resolveAvatarLook(avatarId: string): Promise<string> {
  const looks = await heygenFetch<Looks>(
    `/v2/avatar_group/${encodeURIComponent(avatarId)}/avatars`,
  ).catch(() => null);
  const rows = looks?.data?.avatar_list ?? [];
  if (rows.length === 0) return avatarId;

  // Only a trained look can render; an untrained one fails late and bills nothing
  // useful. The list can also carry entries with no id at all, which would send
  // avatar_id: undefined, so require one.
  const ready = rows.find(
    (l): l is LookRow & { id: string } =>
      Boolean(l.id) && (l.status ?? "completed") === "completed",
  );
  if (!ready) {
    throw new Error("That avatar is still training. Try again once it is ready.");
  }
  console.log(
    `[heygen] avatar group ${avatarId} -> look ${ready.id} (${ready.name ?? "?"})`,
  );
  return ready.id;
}
