import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import { parseBrandKit, paletteLine } from "../lib/brand-kit";
import { parseReferenceAccounts } from "../lib/reference-accounts";
import type {
  PlatformInstructionsRow, InstructionsInput,
} from "./platform-instructions.types";

export type { PlatformInstructionsRow, InstructionsInput };

const COLS = `platform, who_i_am, what_i_do, goals, interests, post_types,
              tone, visual_style, brand_kit, reference_accounts, extra_notes`;

function hydrate(r: any): PlatformInstructionsRow {
  return {
    ...r,
    brand_kit: parseBrandKit(r.brand_kit),
    reference_accounts: parseReferenceAccounts(r.reference_accounts),
  };
}

export async function listForUser(userId: string): Promise<PlatformInstructionsRow[]> {
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM user_platform_instructions WHERE user_id = ?`, [userId],
  );
  return rows.map(hydrate);
}

export async function getForPlatform(
  userId: string, platform: string,
): Promise<PlatformInstructionsRow | null> {
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM user_platform_instructions
     WHERE user_id = ? AND platform = ? LIMIT 1`, [userId, platform],
  );
  return rows[0] ? hydrate(rows[0]) : null;
}

// Composed image/video design direction: mood text plus the exact hex palette.
export async function getVisualStyle(
  userId: string, platform: string,
): Promise<string | null> {
  const [rows] = await db.query<any[]>(
    `SELECT visual_style, brand_kit FROM user_platform_instructions
     WHERE user_id = ? AND platform = ? LIMIT 1`, [userId, platform],
  );
  const r = rows[0];
  if (!r) return null;
  const composed = [r.visual_style?.trim(), paletteLine(parseBrandKit(r.brand_kit))]
    .filter(Boolean).join(" ");
  return composed || null;
}

export async function upsert(
  userId: string, platform: string, input: InstructionsInput,
): Promise<void> {
  const kit = input.brandKit ? JSON.stringify(input.brandKit) : null;
  const refs = input.referenceAccounts?.length
    ? JSON.stringify(input.referenceAccounts) : null;
  await db.query(
    `INSERT INTO user_platform_instructions
       (id, user_id, platform, who_i_am, what_i_do, goals, interests,
        post_types, tone, visual_style, brand_kit, reference_accounts, extra_notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       who_i_am=VALUES(who_i_am), what_i_do=VALUES(what_i_do), goals=VALUES(goals),
       interests=VALUES(interests), post_types=VALUES(post_types), tone=VALUES(tone),
       visual_style=VALUES(visual_style), brand_kit=VALUES(brand_kit),
       reference_accounts=VALUES(reference_accounts), extra_notes=VALUES(extra_notes)`,
    [randomUUID(), userId, platform,
     input.whoIAm ?? null, input.whatIDo ?? null, input.goals ?? null,
     input.interests ?? null, input.postTypes ?? null, input.tone ?? null,
     input.visualStyle ?? null, kit, refs, input.extraNotes ?? null],
  );
}
