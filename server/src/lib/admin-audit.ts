import { randomUUID } from "node:crypto";
import { db } from "./db";

export async function recordAdminAction(
  adminId: string, action: string,
  targetId: string | null = null, details: unknown = null,
): Promise<void> {
  await db.query(
    "INSERT INTO admin_actions (id, admin_id, target_id, action, details) VALUES (?, ?, ?, ?, ?)",
    [randomUUID(), adminId, targetId, action, details ? JSON.stringify(details) : null],
  );
}
