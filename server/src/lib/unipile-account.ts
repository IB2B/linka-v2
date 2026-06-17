import { db } from "./db";

export type LinkedinAccount = {
  accountId: string; displayName: string | null; email: string | null;
};

export async function getLinkedinAccount(userId: string): Promise<LinkedinAccount | null> {
  const [rows] = await db.query<any[]>(
    `SELECT account_id, display_name, email FROM linkedin_dm_accounts
     WHERE user_id = ? AND status = 'connected'`, [userId],
  );
  const r = rows[0];
  if (!r?.account_id) return null;
  return { accountId: r.account_id, displayName: r.display_name ?? null, email: r.email ?? null };
}

export async function hasLinkedinAccount(userId: string): Promise<boolean> {
  return (await getLinkedinAccount(userId)) !== null;
}

export async function saveLinkedinAccount(
  userId: string, accountId: string, displayName?: string, email?: string,
): Promise<void> {
  await db.query(
    `INSERT INTO linkedin_dm_accounts (id, user_id, account_id, display_name, email, status)
     VALUES (UUID(), ?, ?, ?, ?, 'connected')
     ON DUPLICATE KEY UPDATE
       account_id = VALUES(account_id), display_name = VALUES(display_name),
       email = VALUES(email), status = 'connected'`,
    [userId, accountId, displayName ?? null, email ?? null],
  );
}

export async function deleteLinkedinAccount(userId: string): Promise<void> {
  await db.query("DELETE FROM linkedin_dm_accounts WHERE user_id = ?", [userId]);
}
