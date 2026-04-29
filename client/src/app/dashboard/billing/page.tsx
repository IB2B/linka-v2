import { BillingDashboard } from "@/components/billing/billing-dashboard";
import { BillingError } from "@/components/billing/billing-error";
import { getBillingOverview } from "@/lib/billing/get-overview";

export default async function BillingPage() {
  const result = await getBillingOverview();
  if (!result.ok) return <BillingError error={result.error} />;
  return <BillingDashboard overview={result.overview} />;
}
