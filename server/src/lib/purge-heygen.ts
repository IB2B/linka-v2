import { db } from "./db";
import { heygenFetch } from "./heygen-api";
import { ignoreStatus } from "./ignore-status";

// v3 replaces v2, which HeyGen shuts down on 2026-10-31. Groups created through
// v2 are tried there too while it still answers.
async function deleteAvatarGroup(groupId: string): Promise<void> {
  const id = encodeURIComponent(groupId);
  const v3 = await ignoreStatus(heygenFetch(`/v3/avatars/${id}`, { method: "DELETE" }));
  if (v3 !== null) return;
  await ignoreStatus(
    heygenFetch(`/v2/photo_avatar_group/${id}`, { method: "DELETE" }), [404, 410],
  );
}

// The user's uploaded face lives in the shared HeyGen workspace as a photo
// avatar group. Deleting the group removes every look trained from it.
export async function purgeHeygenAvatars(userId: string): Promise<void> {
  const [rows] = await db.query<any[]>(
    "SELECT group_id FROM user_avatar_groups WHERE user_id = ?", [userId],
  );
  if (!rows.length) return;
  if (!process.env.HEYGEN_API_KEY) {
    console.warn("[user-purge] HeyGen not configured, skipping", userId);
    return;
  }
  for (const r of rows) await deleteAvatarGroup(r.group_id);
}
