import { db } from "../lib/db";
import type { RowDataPacket } from "mysql2";

type Row = RowDataPacket & { group_id: string; user_id: string; name: string };

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

export type OwnedGroup = { groupId: string; name: string };

// The avatar groups this user created, newest first. The only source for the
// "My avatars" tab: nothing else in the shared HeyGen workspace is shown.
export async function listUserGroups(userId: string): Promise<OwnedGroup[]> {
  const [rows] = await db.query<Row[]>(
    `SELECT group_id, user_id, name FROM user_avatar_groups
     WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
  );
  return rows.map((r) => ({ groupId: r.group_id, name: r.name }));
}

// Who uploaded this group, or null when no user did.
export async function groupOwner(groupId: string): Promise<string | null> {
  const [rows] = await db.query<Row[]>(
    "SELECT group_id, user_id, name FROM user_avatar_groups WHERE group_id = ?", [groupId],
  );
  return rows[0]?.user_id ?? null;
}
