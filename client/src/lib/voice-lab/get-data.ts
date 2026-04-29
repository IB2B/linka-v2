import { cookies, headers } from "next/headers";
import type { WritingSample, SampleLimits, VoiceProfile } from "@/types/voice-lab";

async function api<T>(path: string): Promise<T | null> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${proto}://${host}${path}`, {
    headers: { cookie }, cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

export async function getVoiceLabData(): Promise<{
  samples: WritingSample[];
  limits: SampleLimits;
  profile: VoiceProfile | null;
}> {
  const [list, profile] = await Promise.all([
    api<{ samples: WritingSample[]; limits: SampleLimits }>("/api/voice-lab/samples"),
    api<VoiceProfile>("/api/voice-lab/profile"),
  ]);
  return {
    samples: list?.samples ?? [],
    limits: list?.limits ?? { current: 0, limit: 5, canAddMore: true },
    profile,
  };
}
