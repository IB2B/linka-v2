import { db } from "./db";
import { TREND_ANGLES, type TrendLocale } from "./trend-query-i18n";

type ProfileRow = { industry: string | null; job_title: string | null };

function pickAngle(locale: TrendLocale): string {
  const angles = TREND_ANGLES[locale];
  return angles[Math.floor(Math.random() * angles.length)];
}

export async function buildTrendQuery(
  userId: string, topic?: string, locale: TrendLocale = "en",
): Promise<string> {
  // A user-typed topic carries its own intent and language — the angle prefix
  // only dilutes it (e.g. "automation" started matching factory expos). Keep the
  // angle for the profile-based default, where it adds variety to refreshes.
  if (topic && topic.trim()) return topic.trim();
  const angle = pickAngle(locale);

  const [rows] = await db.query<any[]>(
    "SELECT industry, job_title FROM user_profiles WHERE user_id = ? LIMIT 1",
    [userId],
  );
  const p = (rows[0] as ProfileRow | undefined) ?? { industry: null, job_title: null };
  const industry = p.industry?.trim() || "technology";
  const role = p.job_title?.trim() || "professional";
  return `${angle} ${role}, ${industry}`;
}
