import { http } from "../http";
import type { PlanPrices } from "@/types/plan-prices";

export const plansService = {
  prices: () => http.get<PlanPrices>("/plans/prices").then((r) => r.data),
};
