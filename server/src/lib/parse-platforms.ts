export function parsePlatforms(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as string[];
  try { const j = JSON.parse(String(raw)); return Array.isArray(j) ? j : []; }
  catch { return []; }
}
