import { db } from "./db";
import { parseBrandKit } from "./brand-kit";

// Every column that can point at a file under /uploads for this user. Inbox
// attachments are not recorded against a user, so they cannot be traced here.
const FILE_QUERIES = [
  "SELECT avatar_url AS url FROM user_profiles WHERE user_id = ?",
  "SELECT image_url AS url FROM generated_content WHERE user_id = ?",
  "SELECT attachment_url AS url FROM support_tickets WHERE user_id = ?",
  `SELECT r.attachment_url AS url FROM support_ticket_replies r
     JOIN support_tickets t ON t.id = r.ticket_id WHERE t.user_id = ?`,
];

async function brandLogos(userId: string): Promise<string[]> {
  const [rows] = await db.query<any[]>(
    "SELECT brand_kit FROM user_platform_instructions WHERE user_id = ?", [userId],
  );
  return rows.map((r) => parseBrandKit(r.brand_kit)?.logoUrl ?? "");
}

export async function collectUserFiles(userId: string): Promise<string[]> {
  const [logos, ...results] = await Promise.all([
    brandLogos(userId),
    ...FILE_QUERIES.map((sql) => db.query<any[]>(sql, [userId])),
  ]);
  const urls = results.flatMap(([rows]) => rows.map((r) => String(r.url ?? "")));
  return [...new Set([...urls, ...logos])].filter((u) => u.startsWith("/uploads/"));
}
