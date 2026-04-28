import "dotenv/config";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { db } from "../lib/db";

const DIR = join(__dirname, "..", "..", "migrations");

async function run() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name VARCHAR(255) NOT NULL PRIMARY KEY,
      applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB
  `);

  const [rows] = await db.query<{ name: string }[] & object>("SELECT name FROM _migrations");
  const applied = new Set((rows as { name: string }[]).map((r) => r.name));
  const files = readdirSync(DIR).filter((f) => f.endsWith(".sql")).sort();

  for (const file of files) {
    if (applied.has(file)) { console.log(`[skip] ${file}`); continue; }
    console.log(`[apply] ${file}`);
    const sql = readFileSync(join(DIR, file), "utf8");
    const statements = sql.split(/;\s*\n/).map((s) => s.trim()).filter(Boolean);
    for (const stmt of statements) await db.query(stmt);
    await db.query("INSERT INTO _migrations (name) VALUES (?)", [file]);
  }
  await db.end();
  console.log("[done]");
}

run().catch((e) => { console.error(e); process.exit(1); });
