import { db } from "./db";

export async function getTargetRole(id: string): Promise<string | null> {
  const [rows] = await db.query<any[]>("SELECT role FROM users WHERE id = ?", [id]);
  return rows[0]?.role ?? null;
}

export function canActOnTarget(callerRole: string, targetRole: string): boolean {
  if ((targetRole === "ADMIN" || targetRole === "SUPER_ADMIN") && callerRole !== "SUPER_ADMIN") return false;
  return true;
}
