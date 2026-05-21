import { db } from "./db";

export function currentPeriodKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function tryClaimNotification(
  userId: string, kind: string, periodKey: string,
): Promise<boolean> {
  try {
    await db.query(
      `INSERT INTO notification_log (user_id, kind, period_key) VALUES (?, ?, ?)`,
      [userId, kind, periodKey],
    );
    return true;
  } catch (e: unknown) {
    const code = (e as { code?: string }).code;
    if (code === "ER_DUP_ENTRY") return false;
    throw e;
  }
}
