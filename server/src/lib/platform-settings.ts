import { db } from "./db";

export type PlatformSettings = {
  signupsEnabled: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
  announcementEnabled: boolean;
  announcementMessage: string | null;
};

const DEFAULTS: PlatformSettings = {
  signupsEnabled: true, maintenanceMode: false, maintenanceMessage: null,
  announcementEnabled: false, announcementMessage: null,
};

// Never throws: if the table is missing (pre-migration) or the DB is down, fall
// back to safe defaults so register/dashboard keep working (signups open, no banner).
export async function getPlatformSettings(): Promise<PlatformSettings> {
  try {
    const [rows] = await db.query<any[]>(
      `SELECT signups_enabled, maintenance_mode, maintenance_message,
              announcement_enabled, announcement_message
         FROM platform_settings WHERE id = 1 LIMIT 1`,
    );
    const r = rows[0];
    if (!r) return DEFAULTS;
    return {
      signupsEnabled: !!r.signups_enabled,
      maintenanceMode: !!r.maintenance_mode,
      maintenanceMessage: r.maintenance_message ?? null,
      announcementEnabled: !!r.announcement_enabled,
      announcementMessage: r.announcement_message ?? null,
    };
  } catch {
    return DEFAULTS;
  }
}

export async function updatePlatformSettings(s: PlatformSettings): Promise<void> {
  await db.query(
    `UPDATE platform_settings SET
       signups_enabled = ?, maintenance_mode = ?, maintenance_message = ?,
       announcement_enabled = ?, announcement_message = ?
     WHERE id = 1`,
    [s.signupsEnabled, s.maintenanceMode, s.maintenanceMessage,
     s.announcementEnabled, s.announcementMessage],
  );
}
