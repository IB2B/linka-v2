import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { RecycleSettings } from "../types/recycler";

interface Row extends RowDataPacket {
  enabled: number;
  per_week: number;
  min_age_days: number;
  last_run_at: Date | null;
}

const DEFAULTS: RecycleSettings = {
  enabled: false, perWeek: 1, minAgeDays: 30, lastRunAt: null,
};

export async function getSettings(userId: string): Promise<RecycleSettings> {
  const [rows] = await db.query<Row[]>(
    `SELECT enabled, per_week, min_age_days, last_run_at
     FROM recycle_settings WHERE user_id = ? LIMIT 1`, [userId],
  );
  const r = rows[0];
  if (!r) return DEFAULTS;
  return {
    enabled: r.enabled === 1,
    perWeek: r.per_week,
    minAgeDays: r.min_age_days,
    lastRunAt: r.last_run_at ? r.last_run_at.toISOString() : null,
  };
}

export async function upsertSettings(
  userId: string, s: Omit<RecycleSettings, "lastRunAt">,
): Promise<void> {
  await db.query(
    `INSERT INTO recycle_settings (user_id, enabled, per_week, min_age_days)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       enabled=VALUES(enabled), per_week=VALUES(per_week),
       min_age_days=VALUES(min_age_days)`,
    [userId, s.enabled ? 1 : 0, s.perWeek, s.minAgeDays],
  );
}
