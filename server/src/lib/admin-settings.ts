import { db } from "./db";

export type AppSettings = {
  maintenanceMode: boolean;
  signupsEnabled: boolean;
  trialDays: number;
  minPasswordLength: number;
  requireMfa: boolean;
  sessionTimeoutMin: number;
  autoSuspendDays: number;
  alertEmail: string | null;
  slackWebhookUrl: string | null;
  dailyDigestEnabled: boolean;
  logoUrl: string | null;
  primaryColor: string | null;
  emailSenderName: string | null;
  emailFooterText: string | null;
};

const DB_TO_API: Record<string, keyof AppSettings> = {
  maintenance_mode: "maintenanceMode",
  signups_enabled: "signupsEnabled",
  trial_days: "trialDays",
  min_password_length: "minPasswordLength",
  require_mfa: "requireMfa",
  session_timeout_min: "sessionTimeoutMin",
  auto_suspend_days: "autoSuspendDays",
  alert_email: "alertEmail",
  slack_webhook_url: "slackWebhookUrl",
  daily_digest_enabled: "dailyDigestEnabled",
  logo_url: "logoUrl",
  primary_color: "primaryColor",
  email_sender_name: "emailSenderName",
  email_footer_text: "emailFooterText",
};

export async function fetchSettings(): Promise<AppSettings> {
  const cols = Object.keys(DB_TO_API).join(", ");
  const [[r]] = await db.query<any[]>(`SELECT ${cols} FROM app_settings WHERE id = 1`);
  const out = {} as AppSettings;
  for (const [db, api] of Object.entries(DB_TO_API)) {
    const v = r?.[db];
    (out as any)[api] = typeof v === "number" && (api === "maintenanceMode" || api === "signupsEnabled" || api === "requireMfa" || api === "dailyDigestEnabled") ? !!v : (v ?? null);
  }
  return out;
}

const API_TO_DB = Object.fromEntries(Object.entries(DB_TO_API).map(([d, a]) => [a, d]));

export async function updateSettings(p: Partial<AppSettings>): Promise<void> {
  const fields: string[] = []; const params: any[] = [];
  for (const [k, v] of Object.entries(p)) {
    const col = API_TO_DB[k]; if (!col) continue;
    fields.push(`${col} = ?`);
    params.push(typeof v === "boolean" ? (v ? 1 : 0) : (v === "" ? null : v));
  }
  if (fields.length === 0) return;
  await db.query(`UPDATE app_settings SET ${fields.join(", ")} WHERE id = 1`, params);
}
