export type SortKey = "name" | "role" | "status" | "plan" | "posts" | "industry" | "joined";
export type SortDir = "asc" | "desc";

const KEYS = new Set<SortKey>([
  "name", "role", "status", "plan", "posts", "industry", "joined",
]);

export function parseSort(v?: string): SortKey | undefined {
  return v && KEYS.has(v as SortKey) ? (v as SortKey) : undefined;
}

export function parseDir(v?: string): SortDir | undefined {
  return v === "asc" || v === "desc" ? v : undefined;
}

export function nextDir(current: SortKey | undefined, key: SortKey, dir: SortDir | undefined): SortDir {
  if (current !== key) return "desc";
  return dir === "desc" ? "asc" : "desc";
}
