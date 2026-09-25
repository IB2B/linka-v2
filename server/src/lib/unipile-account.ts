import { db } from "./db";
import { unipileConfigured, unipileFetch } from "./unipile-api";
import { ignoreStatus } from "./ignore-status";

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

// Unlinks the account at Unipile too. Dropping only our row left the LinkedIn
// session live there after a disconnect or an account deletion.
export async function deleteLinkedinAccount(userId: string): Promise<void> {
  const [rows] = await db.query<any[]>(
    "SELECT account_id FROM linkedin_dm_accounts WHERE user_id = ?", [userId],
  );
  const accountId = rows[0]?.account_id as string | undefined;
  if (accountId && unipileConfigured()) {
    await ignoreStatus(
      unipileFetch(`/accounts/${encodeURIComponent(accountId)}`, { method: "DELETE" }),
    );
  }
  await db.query("DELETE FROM linkedin_dm_accounts WHERE user_id = ?", [userId]);
}
