import { randomUUID } from "node:crypto";
import { db } from "./db";

// Persist the user's most recent post language so it becomes the default for
// future generations — including "Surprise me", which skips the settings step.
export async function rememberLanguage(userId: string, language: string): Promise<void> {
  await db.query(
    `INSERT INTO user_profiles (id, user_id, preferred_language)
       VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE preferred_language = VALUES(preferred_language)`,
    [randomUUID(), userId, language],
  );
}
