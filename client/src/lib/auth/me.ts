import { cookies, headers } from "next/headers";
import type { UserRole } from "@/types/user-role";

export type UserFeatures = {
  recycler: boolean;
};

export type UserTier = "free" | "starter" | "professional" | "enterprise";

export type Me = {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  industry: string | null;
  bio: string | null;
  jobTitle: string | null;
  tier: UserTier;
  onboardingCompleted: boolean;
  postsUsed: number;
  postsLimit: number;
  features: UserFeatures;
};

export async function fetchMe(): Promise<Me | null> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${proto}://${host}/api/users/me`, {
    headers: { cookie },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as Me;
}
