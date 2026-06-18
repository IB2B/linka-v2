import { lateFetch } from "./late-api";

export type LatePage<T> = {
  data?: T[];
  conversations?: T[];
  messages?: T[];
  pagination?: { nextCursor?: string | null };
  nextCursor?: string | null;
};

const MAX_PAGES = 50;

/** Follows Late's cursor pagination and returns every item across all pages. */
export async function fetchAllLatePages<T>(
  buildUrl: (cursor?: string) => string,
): Promise<T[]> {
  const out: T[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < MAX_PAGES; page++) {
    const r = await lateFetch<LatePage<T>>(buildUrl(cursor));
    out.push(...(r.data ?? r.conversations ?? r.messages ?? []));
    const next = r.pagination?.nextCursor ?? r.nextCursor ?? null;
    if (!next) break;
    cursor = next;
  }
  return out;
}
