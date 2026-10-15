import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import { PRODUCT_FIELD_NAMES, productValues, type ProductInput } from "./product-fields";

// Keeps the list small enough to show and to stay cheap per user.
export const MAX_PRODUCTS = 20;

// Count and insert in one transaction with the user's row locked, so parallel
// requests queue up and can't all pass the cap. Returns null when it's full.
export async function createProductCapped(userId: string, p: ProductInput): Promise<string | null> {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("SELECT id FROM users WHERE id = ? FOR UPDATE", [userId]);
    const [rows] = await conn.query<any[]>("SELECT COUNT(*) AS n FROM products WHERE user_id = ?", [userId]);
    if (Number(rows[0]?.n ?? 0) >= MAX_PRODUCTS) { await conn.rollback(); return null; }
    const id = randomUUID();
    const cols = PRODUCT_FIELD_NAMES.join(", ");
    const marks = PRODUCT_FIELD_NAMES.map(() => "?").join(", ");
    await conn.query(`INSERT INTO products (id, user_id, ${cols}) VALUES (?, ?, ${marks})`, [id, userId, ...productValues(p)]);
    await conn.commit();
    return id;
  } catch (e) {
    await conn.rollback().catch(() => {});
    throw e;
  } finally {
    conn.release();
  }
}
