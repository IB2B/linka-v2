import { randomUUID } from "node:crypto";
import { db } from "../lib/db";

export type ProductInput = {
  name: string;
  url?: string | null;
  pitch: string;
  audience?: string | null;
  features?: string | null;
  cta?: string | null;
};

export type Product = Required<{ [K in keyof ProductInput]: ProductInput[K] }> & {
  id: string;
};

const COLS = "id, name, url, pitch, audience, features, cta";
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

function values(p: ProductInput) {
  return [p.name, p.url || null, p.pitch, p.audience || null, p.features || null, p.cta || null];
}

export async function createProduct(userId: string, p: ProductInput): Promise<string> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO products (id, user_id, name, url, pitch, audience, features, cta)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, userId, ...values(p)],
  );
  return id;
}

export async function updateProduct(userId: string, id: string, p: ProductInput): Promise<boolean> {
  const [res] = await db.query<any>(
    `UPDATE products SET name = ?, url = ?, pitch = ?, audience = ?, features = ?, cta = ?
     WHERE id = ? AND user_id = ?`,
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
