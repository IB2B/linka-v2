import { db } from "./db";
import { lateFetch } from "./late-api";
import { ProfileLimitError, isProfileLimit } from "./late-profile-limit";

type CreateProfileResponse = { profile: { _id: string } };

// Every user gets their own provider profile, so hitting the plan's profile cap
// stops connections dead for anyone who has not been given one yet — while
// existing users keep working, which is exactly why it looks like a
// "production-only" bug.
async function createProfile(userId: string): Promise<string> {
  try {
    const data = await lateFetch<CreateProfileResponse>("/profiles", {
      method: "POST",
      body: JSON.stringify({ name: `linka:${userId}` }),
    });
    return data.profile._id;
  } catch (err) {
    if (!isProfileLimit(err)) throw err;
    const detail = err instanceof Error ? err.message : "";
    console.error(
      "[late] FATAL profile cap reached — no user without an existing profile "
      + `can connect an account until the plan is raised or unused profiles are `
      + `pruned. Provider said: ${detail}`,
    );
    throw new ProfileLimitError(detail);
  }
}

export async function getOrCreateLateProfile(userId: string): Promise<string> {
  const [rows] = await db.query<any[]>(
    "SELECT late_profile_id FROM users WHERE id = ?", [userId],
  );
  const existing = rows[0]?.late_profile_id as string | null | undefined;
  if (existing) return existing;

  const profileId = await createProfile(userId);

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
