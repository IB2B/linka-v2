import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

export type ImageRoiGroup = {
  postCount: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  avgSaves: number;
  avgViews: number;
  avgImpressions: number;
};

export type ImageRoiData = {
  withImage: ImageRoiGroup | null;
  withoutImage: ImageRoiGroup | null;
};

export async function getImageRoi(): Promise<ImageRoiData> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(`${API_BASE}/api/analytics/image-roi`, {
      headers: { cookie }, cache: "no-store",
    });
    if (!res.ok) return { withImage: null, withoutImage: null };
    return await res.json() as ImageRoiData;
  } catch {
    return { withImage: null, withoutImage: null };
  }
}
