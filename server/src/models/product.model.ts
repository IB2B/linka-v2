import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import { PRODUCT_FIELD_NAMES, type Product, type ProductInput } from "./product-fields";

export type { Product, ProductInput };

const COLS = ["id", ...PRODUCT_FIELD_NAMES].join(", ");
// Keeps the list small enough to show as cards and to stay cheap per user.
export const MAX_PRODUCTS = 20;

export async function listProducts(userId: string): Promise<Product[]> {
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM products WHERE user_id = ? ORDER BY created_at ASC`, [userId],
  );
  return rows as Product[];
}

export async function getProduct(userId: string, id: string): Promise<Product | null> {
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM products WHERE user_id = ? AND id = ? LIMIT 1`, [userId, id],
  );
  return (rows[0] as Product) ?? null;
}

export async function countProducts(userId: string): Promise<number> {
  const [rows] = await db.query<any[]>(
    "SELECT COUNT(*) AS n FROM products WHERE user_id = ?", [userId],
  );
  return Number(rows[0]?.n ?? 0);
}

// Empty strings are stored as NULL so "not filled in" has one meaning.
function values(p: ProductInput): (string | null)[] {
  return PRODUCT_FIELD_NAMES.map((k) => (p[k as keyof ProductInput] as string | null | undefined) || null);
}

export async function createProduct(userId: string, p: ProductInput): Promise<string> {
  const id = randomUUID();
  const cols = PRODUCT_FIELD_NAMES.join(", ");
  const marks = PRODUCT_FIELD_NAMES.map(() => "?").join(", ");
  await db.query(
    `INSERT INTO products (id, user_id, ${cols}) VALUES (?, ?, ${marks})`,
    [id, userId, ...values(p)],
  );
  return id;
}

export async function updateProduct(userId: string, id: string, p: ProductInput): Promise<boolean> {
  const sets = PRODUCT_FIELD_NAMES.map((k) => `${k} = ?`).join(", ");
  const [res] = await db.query<any>(
    `UPDATE products SET ${sets} WHERE id = ? AND user_id = ?`,
    [...values(p), id, userId],
  );
  return res.affectedRows > 0;
}

export async function deleteProduct(userId: string, id: string): Promise<boolean> {
  const [res] = await db.query<any>(
    "DELETE FROM products WHERE id = ? AND user_id = ?", [id, userId],
  );
  return res.affectedRows > 0;
}
