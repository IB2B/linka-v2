import { randomUUID } from "node:crypto";
import { db } from "../lib/db";

export type PlatformInstructionsRow = {
  platform: string;
  who_i_am: string | null;
  what_i_do: string | null;
  goals: string | null;
  interests: string | null;
  post_types: string | null;
  tone: string | null;
  visual_style: string | null;
  competitor_links: string[] | null;
  extra_notes: string | null;
};

export type InstructionsInput = {
  whoIAm?: string; whatIDo?: string; goals?: string; interests?: string;
  postTypes?: string; tone?: string; visualStyle?: string; extraNotes?: string;
  competitorLinks?: string[];
};

const COLS = `platform, who_i_am, what_i_do, goals, interests,
              post_types, tone, visual_style, competitor_links, extra_notes`;

function parseLinks(raw: unknown): string[] {
  if (!raw) return [];
  const v = typeof raw === "string" ? JSON.parse(raw) : raw;
  return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
}

function hydrate(r: any): PlatformInstructionsRow {
  return { ...r, competitor_links: parseLinks(r.competitor_links) };
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

// The user's image/video design direction (colours, text colours, fonts, mood)
// for this platform — threaded into the image and video generation prompts.
export async function getVisualStyle(
  userId: string, platform: string,
): Promise<string | null> {
  const [rows] = await db.query<any[]>(
    `SELECT visual_style FROM user_platform_instructions
     WHERE user_id = ? AND platform = ? LIMIT 1`, [userId, platform],
  );
  return rows[0]?.visual_style ?? null;
}

export async function upsert(
  userId: string, platform: string, input: InstructionsInput,
): Promise<void> {
  const links = JSON.stringify((input.competitorLinks ?? []).slice(0, 5));
  await db.query(
    `INSERT INTO user_platform_instructions
       (id, user_id, platform, who_i_am, what_i_do, goals, interests,
        post_types, tone, visual_style, competitor_links, extra_notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       who_i_am=VALUES(who_i_am), what_i_do=VALUES(what_i_do), goals=VALUES(goals),
       interests=VALUES(interests), post_types=VALUES(post_types), tone=VALUES(tone),
       visual_style=VALUES(visual_style), competitor_links=VALUES(competitor_links),
       extra_notes=VALUES(extra_notes)`,
    [randomUUID(), userId, platform,
     input.whoIAm ?? null, input.whatIDo ?? null, input.goals ?? null,
     input.interests ?? null, input.postTypes ?? null, input.tone ?? null,
     input.visualStyle ?? null, links, input.extraNotes ?? null],
  );
}
