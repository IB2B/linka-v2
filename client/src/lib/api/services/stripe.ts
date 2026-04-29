import { http } from "../http";
import type { PlanTier } from "@/types/billing-plan";

export const stripeService = {
  checkout: (payload: { tier: PlanTier }) =>
    http.post<{ url: string }>("/stripe/checkout", payload).then((r) => r.data),
};
