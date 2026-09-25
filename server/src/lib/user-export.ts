import { db } from "./db";
import { EXPORT_TABLES, type ExportTable } from "./user-export-tables";

type Row = Record<string, unknown>;

const camel = (s: string) => s.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());

function clean(row: Row, omit: string[]): Row {
  const out: Row = {};
  for (const [k, v] of Object.entries(row)) {
    if (k === "user_id" || omit.includes(k)) continue;
    out[camel(k)] = v;
  }
  return out;
}

async function readTable(t: ExportTable, userId: string): Promise<[string, Row[]]> {
  const [rows] = await db.query<any[]>(t.sql, [userId]);
  return [t.key, (rows as Row[]).map((r) => clean(r, t.omit ?? []))];
}

// One JSON document with every record linka holds about the user — the GDPR
// right of access and data portability in a single download.
export async function buildUserExport(userId: string): Promise<Row> {
  const tables = await Promise.all(EXPORT_TABLES.map((t) => readTable(t, userId)));
  return {
    exportedAt: new Date().toISOString(),
    service: "linka.studio",
    note: "Connected social accounts are listed in Settings → Connected accounts. "
      + "File paths are relative to the linka app address.",
    ...Object.fromEntries(tables),
  };
}
