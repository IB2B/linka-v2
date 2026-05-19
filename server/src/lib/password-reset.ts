import { createHash, randomBytes } from "node:crypto";
import { db } from "./db";
import { hashPassword } from "./password";

const TOKEN_TTL_MIN = 60;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

async function invalidateExisting(userId: string): Promise<void> {
  await db.query(
    `UPDATE password_reset_tokens SET used_at = NOW(3)
       WHERE user_id = ? AND used_at IS NULL`,
    [userId],
  );
}

export async function createResetToken(userId: string): Promise<string> {
  await invalidateExisting(userId);
  const token = randomBytes(32).toString("hex");
  await db.query(
    `INSERT INTO password_reset_tokens (token, user_id, expires_at)
     VALUES (?, ?, NOW(3) + INTERVAL ? MINUTE)`,
    [hashToken(token), userId, TOKEN_TTL_MIN],
  );
  return token;
}

export async function findUserByEmail(email: string): Promise<{ id: string; email: string; firstName: string } | null> {
  const [rows] = await db.query<any[]>(
    `SELECT id, email, first_name FROM users
       WHERE email = ? AND deleted_at IS NULL`,
    [email.toLowerCase()],
  );
  if (!rows.length) return null;
  return { id: rows[0].id, email: rows[0].email, firstName: rows[0].first_name };
}

export async function redeemResetToken(token: string, newPassword: string): Promise<void> {
  const [[row]] = await db.query<any[]>(
    `SELECT prt.user_id, prt.used_at, prt.expires_at
       FROM password_reset_tokens prt
       INNER JOIN users u ON u.id = prt.user_id AND u.deleted_at IS NULL
      WHERE prt.token = ?`,
    [hashToken(token)],
  );
  if (!row) throw new Error("Invalid or expired reset link.");
  if (row.used_at) throw new Error("This reset link has already been used.");
  if (new Date(row.expires_at).getTime() < Date.now()) throw new Error("This reset link has expired.");

  const passwordHash = await hashPassword(newPassword);
  await db.query(
    `UPDATE users
       SET password_hash = ?, session_version = session_version + 1
     WHERE id = ?`,
    [passwordHash, row.user_id],
  );
  await invalidateExisting(row.user_id);
}
