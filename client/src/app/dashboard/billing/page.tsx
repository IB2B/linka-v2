import { redirect } from "next/navigation";
import { BillingDashboard } from "@/components/billing/billing-dashboard";
import { BillingError } from "@/components/billing/billing-error";
import { getBillingOverview } from "@/lib/billing/get-overview";
import { serverFetch, readError } from "@/lib/server-fetch";

type Sp = { session_id?: string; confirm_error?: string };

export default async function BillingPage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const { session_id, confirm_error } = await searchParams;
  if (session_id) {
    const res = await serverFetch("/api/stripe/confirm", {
      method: "POST",
      body: JSON.stringify({ sessionId: session_id }),
    });
    if (!res.ok) {
      const error = await readError(res, "Could not confirm checkout");
      redirect(`/dashboard/billing?confirm_error=${encodeURIComponent(error)}`);
    }
    redirect("/dashboard/billing");
  }
  const result = await getBillingOverview();
  if (!result.ok) return <BillingError error={result.error} />;
  return <BillingDashboard overview={result.overview} confirmError={confirm_error} />;
}
