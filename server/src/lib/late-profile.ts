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
