import { db } from "../lib/db";
import { PRODUCT_FIELD_NAMES, productValues, type Product, type ProductInput } from "./product-fields";

export type { Product, ProductInput };
export { MAX_PRODUCTS, createProductCapped } from "./product-create";

const COLS = ["id", ...PRODUCT_FIELD_NAMES].join(", ");

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

export async function updateProduct(userId: string, id: string, p: ProductInput): Promise<boolean> {
  const sets = PRODUCT_FIELD_NAMES.map((k) => `${k} = ?`).join(", ");
  const [res] = await db.query<any>(
    `UPDATE products SET ${sets} WHERE id = ? AND user_id = ?`,
    [...productValues(p), id, userId],
  );
  return res.affectedRows > 0;
}

export async function deleteProduct(userId: string, id: string): Promise<boolean> {
  const [res] = await db.query<any>(
    "DELETE FROM products WHERE id = ? AND user_id = ?", [id, userId],
  );
  return res.affectedRows > 0;
}
