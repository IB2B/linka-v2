import { redirect } from "next/navigation";

import { fetchMe } from "@/lib/auth/me";
import { hasFeature, type PaidFeature } from "./plan-features";

export async function requirePaidFeature(feature: PaidFeature): Promise<void> {
  const user = await fetchMe();
  if (!user || user.role !== "USER") return;
  if (!hasFeature(user.tier, feature)) {
    redirect(`/dashboard/billing?upgrade=${feature}`);
  }
}
