import { db } from "../lib/db";
import type { RowDataPacket } from "mysql2";

type Row = RowDataPacket & { group_id: string; user_id: string };

export async function claimAvatarGroup(
  groupId: string, userId: string, name: string,
): Promise<void> {
  await db.query(
    `INSERT INTO user_avatar_groups (group_id, user_id, name)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name)`,
    [groupId, userId, name.slice(0, 191)],
  );
}

// Every claimed group across all users, so the groups endpoint can hide the ones
// belonging to somebody else while leaving unclaimed house avatars visible.
export async function loadGroupOwners(): Promise<Map<string, string>> {
  const [rows] = await db.query<Row[]>(
    "SELECT group_id, user_id FROM user_avatar_groups",
  );
  return new Map(rows.map((r) => [r.group_id, r.user_id]));
}
