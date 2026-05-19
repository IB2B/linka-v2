export type SortKey = "name" | "role" | "status" | "plan" | "posts" | "industry" | "joined";
export type SortDir = "asc" | "desc";

const SORT_SQL: Record<SortKey, string> = {
  name:     "CONCAT_WS(' ', u.first_name, u.last_name)",
  role:     "u.role",
  status:   "u.status",
  plan:     "COALESCE(s.plan_tier, 'free')",
  posts:    "COALESCE(g.posts_count, 0)",
  industry: "COALESCE(p.industry, '')",
  joined:   "u.created_at",
};

const SORT_KEYS = new Set<SortKey>(Object.keys(SORT_SQL) as SortKey[]);

export function parseSortKey(v: unknown): SortKey | undefined {
  return typeof v === "string" && SORT_KEYS.has(v as SortKey) ? (v as SortKey) : undefined;
}

export function parseSortDir(v: unknown): SortDir | undefined {
  return v === "asc" || v === "desc" ? v : undefined;
}

export function orderBy(sort?: SortKey, dir?: SortDir): string {
  const col = sort && SORT_SQL[sort] ? SORT_SQL[sort] : SORT_SQL.joined;
  const d = dir === "asc" ? "ASC" : "DESC";
  return `${col} ${d}, u.id ${d}`;
}
