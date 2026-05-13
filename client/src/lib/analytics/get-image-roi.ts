import { cookies, headers } from "next/headers";

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
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(`${proto}://${host}/api/analytics/image-roi`, {
      headers: { cookie }, cache: "no-store",
    });
    if (!res.ok) return { withImage: null, withoutImage: null };
    return await res.json() as ImageRoiData;
  } catch {
    return { withImage: null, withoutImage: null };
  }
}
