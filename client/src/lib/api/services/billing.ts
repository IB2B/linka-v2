import { http } from "../http";
import type { BillingOverview } from "@/types/billing-overview";

export const billingService = {
  overview: () => http.get<BillingOverview>("/billing/overview").then((r) => r.data),
  portal: () => http.post<{ url: string }>("/billing/portal").then((r) => r.data),
};
