import { db } from "../lib/db";

export type AvatarChoice = { avatarId: string; voiceId: string };

export async function getAvatarChoice(
  userId: string,
): Promise<AvatarChoice | null> {
  const [rows] = await db.query<any[]>(
    `SELECT avatar_id, voice_id FROM user_avatar_settings
     WHERE user_id = ? LIMIT 1`, [userId],
  );
  const r = rows[0];
  return r ? { avatarId: r.avatar_id, voiceId: r.voice_id } : null;
}

export async function saveAvatarChoice(
  userId: string, choice: AvatarChoice,
): Promise<void> {
  await db.query(
    `INSERT INTO user_avatar_settings (user_id, avatar_id, voice_id)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE
       avatar_id = VALUES(avatar_id), voice_id = VALUES(voice_id)`,
    [userId, choice.avatarId, choice.voiceId],
  );
}
