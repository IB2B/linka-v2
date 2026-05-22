import { db } from "./db";

const FALLBACK = [
  "AI & machine learning", "Software engineering", "Startups & VC",
  "Marketing", "Design & UX", "Productivity", "Crypto & web3",
  "Climate tech", "Health & biotech", "Finance",
];

function titlecase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function suggestTrendTopics(userId: string): Promise<string[]> {
  const [rows] = await db.query<any[]>(
    "SELECT industry, job_title FROM user_profiles WHERE user_id = ? LIMIT 1",
    [userId],
  );
  const ind = (rows[0]?.industry as string | null)?.trim();
  if (!ind) return FALLBACK;
  const cap = titlecase(ind);
  return [
    cap,
    `${cap} news`,
    `${cap} trends`,
    `AI for ${ind}`,
    "Productivity",
    "Marketing",
    "Startups & VC",
    "Design & UX",
  ];
}
