import { cookies, headers } from "next/headers";

export type PlatformNotice = {
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
  announcementEnabled: boolean;
  announcementMessage: string | null;
};

const NONE: PlatformNotice = {
  maintenanceMode: false, maintenanceMessage: null,
  announcementEnabled: false, announcementMessage: null,
};

// Resilient: any failure (DB down, route missing) yields no banner, never throws.
export async function getPlatformNotice(): Promise<PlatformNotice> {
  try {
    const [c, h] = await Promise.all([cookies(), headers()]);
    const host = h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "http";
    const res = await fetch(`${proto}://${host}/api/platform`, {
      headers: { cookie: c.toString() }, cache: "no-store",
    });
    if (!res.ok) return NONE;
    return (await res.json()) as PlatformNotice;
  } catch {
    return NONE;
  }
}
