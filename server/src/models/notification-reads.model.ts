import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";

interface KeyRow extends RowDataPacket { notification_key: string }

export async function listReadKeys(userId: string): Promise<Set<string>> {
  const [rows] = await db.query<KeyRow[]>(
    `SELECT notification_key FROM notification_reads WHERE user_id = ?`,
    [userId],
  );
  return new Set(rows.map((r) => r.notification_key));
}

// Idempotent — re-marking an already-read notification is a no-op.
export async function markKeysRead(userId: string, keys: string[]): Promise<void> {
  if (!keys.length) return;
  const values = keys.map(() => "(?, ?)").join(", ");
  const params = keys.flatMap((k) => [userId, k]);
  await db.query(
    `INSERT INTO notification_reads (user_id, notification_key)
     VALUES ${values}
     ON DUPLICATE KEY UPDATE seen_at = seen_at`,
    params,
  );
}
