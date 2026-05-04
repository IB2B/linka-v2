import { db } from "./db";

type ProfileRow = { industry: string | null; job_title: string | null };

const ANGLES = [
  "latest news and announcements",
  "emerging tools and product launches",
  "controversial debates and hot takes",
  "case studies and success stories",
  "trends and industry reports",
];

function pickAngle(): string {
  return ANGLES[Math.floor(Math.random() * ANGLES.length)];
}

export async function buildTrendQuery(userId: string, topic?: string): Promise<string> {
  const angle = pickAngle();
  if (topic && topic.trim()) return `${angle} about ${topic.trim()}`;

  const [rows] = await db.query<any[]>(
    "SELECT industry, job_title FROM user_profiles WHERE user_id = ? LIMIT 1",
    [userId],
  );
  const p = (rows[0] as ProfileRow | undefined) ?? { industry: null, job_title: null };
  const industry = p.industry?.trim() || "technology";
  const role = p.job_title?.trim() || "professional";
  return `${angle} for ${role} in ${industry}`;
}
