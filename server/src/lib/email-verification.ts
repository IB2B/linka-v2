import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import { db } from "./db";
import { VerificationError } from "./verification-error";

const CODE_TTL_MIN = 15;
const MAX_ATTEMPTS = 5;

function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

export function generateCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export async function storeCode(userId: string, code: string): Promise<void> {
  await db.query(
    `INSERT INTO email_verification_codes (user_id, code_hash, expires_at)
     VALUES (?, ?, NOW(3) + INTERVAL ? MINUTE)
     ON DUPLICATE KEY UPDATE
       code_hash = VALUES(code_hash),
       expires_at = VALUES(expires_at),
       attempts = 0,
       created_at = NOW(3)`,
    [userId, hashCode(code), CODE_TTL_MIN],
  );
}

async function gateAttempt(userId: string): Promise<void> {
  const [r] = await db.query<any>(
    `UPDATE email_verification_codes
        SET attempts = attempts + 1
      WHERE user_id = ?
        AND attempts < ?
        AND expires_at > NOW(3)`,
    [userId, MAX_ATTEMPTS],
  );
  if (r.affectedRows > 0) return;

  const [[row]] = await db.query<any[]>(
    `SELECT attempts FROM email_verification_codes WHERE user_id = ?`,
    [userId],
  );
  if (!row) throw new VerificationError("No active verification code. Request a new one.");
  if (Number(row.attempts) >= MAX_ATTEMPTS) throw new VerificationError("Too many attempts. Request a new code.");
  throw new VerificationError("Code expired. Request a new one.");
}

function hashesMatch(stored: string, provided: string): boolean {
  const a = Buffer.from(stored, "hex");
  const b = Buffer.from(provided, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function redeemCode(userId: string, code: string): Promise<void> {
  await gateAttempt(userId);

  const [[row]] = await db.query<any[]>(
    `SELECT code_hash FROM email_verification_codes WHERE user_id = ?`,
    [userId],
  );
  if (!row) throw new VerificationError("No active verification code. Request a new one.");
  if (!hashesMatch(row.code_hash, hashCode(code))) {
    throw new VerificationError("Incorrect code.");
  }

  await db.query(`UPDATE users SET email_verified_at = NOW(3) WHERE id = ?`, [userId]);
  await db.query(`DELETE FROM email_verification_codes WHERE user_id = ?`, [userId]);
}
