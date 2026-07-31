import { db } from "./db";
import { lateFetch } from "./late-api";

type CreateProfileResponse = { profile: { _id: string } };

export async function getOrCreateLateProfile(userId: string): Promise<string> {
  const [rows] = await db.query<any[]>(
    "SELECT late_profile_id FROM users WHERE id = ?", [userId],
  );
  const existing = rows[0]?.late_profile_id as string | null | undefined;
  if (existing) return existing;

  const data = await lateFetch<CreateProfileResponse>("/profiles", {
    method: "POST",
    body: JSON.stringify({ name: `linka:${userId}` }),
  });
  const profileId = data.profile._id;

  await db.query(
    "UPDATE users SET late_profile_id = ? WHERE id = ?",
    [profileId, userId],
  );
  return profileId;
}

// Drops a profile id the provider no longer recognises and mints a fresh one, so
// a stale row heals on the next click instead of failing every connect forever.
export async function resetLateProfile(userId: string): Promise<string> {
  await db.query(
    "UPDATE users SET late_profile_id = NULL WHERE id = ?", [userId],
  );
  return getOrCreateLateProfile(userId);
}
