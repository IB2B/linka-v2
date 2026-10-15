import { cookies } from "next/headers";
import type { Product } from "@/types/product";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

// Server-side read of the user's saved products. Empty on any failure so the
// pages that list them still render.
export async function fetchProducts(): Promise<Product[]> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
    const res = await fetch(`${API_BASE}/api/products`, { headers: { cookie }, cache: "no-store" });
    return res.ok ? ((await res.json()) as Product[]) : [];
  } catch {
    return [];
  }
}
