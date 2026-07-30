import { cookies } from "next/headers";
import type {
  BrandKit, PlatformInstructions,
} from "@/lib/content/platform-instructions.types";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type Row = {
  platform: string;
  who_i_am: string | null;
  what_i_do: string | null;
  goals: string | null;
  interests: string | null;
  post_types: string | null;
  tone: string | null;
  visual_style: string | null;
  extra_notes: string | null;
  brand_kit: BrandKit | null;
};

function toCamel(r: Row): PlatformInstructions {
  return {
    platform: r.platform,
    whoIAm: r.who_i_am ?? "",
    whatIDo: r.what_i_do ?? "",
    goals: r.goals ?? "",
    interests: r.interests ?? "",
    postTypes: r.post_types ?? "",
    tone: r.tone ?? "",
    visualStyle: r.visual_style ?? "",
    extraNotes: r.extra_notes ?? "",
    brandKit: r.brand_kit ?? {},
  };
}

// Returns a map keyed by platform so the settings UI can look up each brief.
export async function fetchPlatformInstructions(): Promise<Record<string, PlatformInstructions>> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${API_BASE}/api/users/me/platform-instructions`, {
    headers: { cookie },
    cache: "no-store",
  });
  if (!res.ok) return {};
  const rows = (await res.json()) as Row[];
  const map: Record<string, PlatformInstructions> = {};
  for (const r of rows) map[r.platform] = toCamel(r);
  return map;
}
