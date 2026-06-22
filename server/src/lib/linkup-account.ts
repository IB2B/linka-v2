import { db } from "./db";

export type LinkupAccount = {
  loginToken: string; country: string; email: string | null; displayName: string | null;
};

export async function getLinkupAccount(userId: string): Promise<LinkupAccount | null> {
  const [rows] = await db.query<any[]>(
    `SELECT login_token, country, linkedin_email, display_name
     FROM linkup_accounts WHERE user_id = ? AND status = 'connected'`, [userId],
  );
  const r = rows[0];
  if (!r?.login_token) return null;
  return {
    loginToken: r.login_token, country: r.country ?? "US",
    email: r.linkedin_email ?? null, displayName: r.display_name ?? null,
  };
}

export async function hasLinkupAccount(userId: string): Promise<boolean> {
  return (await getLinkupAccount(userId)) !== null;
}

export async function saveLinkupAccount(
  userId: string, loginToken: string, email: string, country: string, displayName?: string,
): Promise<void> {
  await db.query(
    `INSERT INTO linkup_accounts
       (id, user_id, login_token, linkedin_email, country, display_name, status)
     VALUES (UUID(), ?, ?, ?, ?, ?, 'connected')
     ON DUPLICATE KEY UPDATE
       login_token = VALUES(login_token), linkedin_email = VALUES(linkedin_email),
       country = VALUES(country), display_name = VALUES(display_name), status = 'connected'`,
    [userId, loginToken, email, country, displayName ?? null],
  );
}

export async function deleteLinkupAccount(userId: string): Promise<void> {
  await db.query("DELETE FROM linkup_accounts WHERE user_id = ?", [userId]);
}
