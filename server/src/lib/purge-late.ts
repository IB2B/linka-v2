import { db } from "./db";
import { lateFetch } from "./late-api";
import { lateAccountsUrl } from "./late-accounts-url";
import { deleteLatePost } from "./late-client";
import { ignoreStatus } from "./ignore-status";

type RawAccount = { _id: string; profileId?: string | { _id: string } };

async function deleteScheduledPosts(userId: string): Promise<void> {
  const [rows] = await db.query<any[]>(
    `SELECT late_post_id FROM generated_content
     WHERE user_id = ? AND status = 'scheduled' AND late_post_id IS NOT NULL`, [userId],
  );
  // 400 = already published, which Late will not delete; the post is the user's.
  for (const r of rows) await ignoreStatus(deleteLatePost(r.late_post_id), [400, 404]);
}

// Late refuses to delete a profile that still has connected accounts, and
// deleting the profile never removes them — so disconnect each account first.
async function deleteProfile(profileId: string): Promise<void> {
  const list = await ignoreStatus(
    lateFetch<{ accounts: RawAccount[] }>(lateAccountsUrl(profileId)),
  );
  const owned = (list?.accounts ?? []).filter((a) => {
    const pid = typeof a.profileId === "string" ? a.profileId : a.profileId?._id;
    return !pid || pid === profileId;
  });
  for (const a of owned) {
    await ignoreStatus(lateFetch(`/accounts/${encodeURIComponent(a._id)}`, { method: "DELETE" }));
  }
  await ignoreStatus(lateFetch(`/profiles/${encodeURIComponent(profileId)}`, { method: "DELETE" }));
}

// Removes what the social publishing provider holds for this user: scheduled
// posts, connected social accounts (and their tokens), then the profile.
export async function purgeLateData(userId: string, profileId: string | null): Promise<void> {
  if (!process.env.LATE_API_URL || !process.env.LATE_API_KEY) {
    if (profileId) console.warn("[user-purge] Late not configured, skipping", userId);
    return;
  }
  await deleteScheduledPosts(userId);
  if (profileId) await deleteProfile(profileId);
}
