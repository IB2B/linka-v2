import { db } from "./db";

// The post language doubles as the voice locale: a video should be spoken with
// the accent of the language it was written in, not read phonetically by an
// English voice. Read on its own because the avatar pipeline needs nothing else
// from the profile.
export async function preferredLanguage(userId: string): Promise<string | null> {
  const [rows] = await db.query<any[]>(
    "SELECT preferred_language FROM user_profiles WHERE user_id = ? LIMIT 1",
    [userId],
  );
  return rows[0]?.preferred_language ?? null;
}
