import { getIntegrations } from "@/lib/admin/get-settings";
import { OverviewServices } from "./overview-services";

// Async data boundary — streamed via <Suspense> so the live integration pings
// (external APIs, up to 5s) never block the dashboard KPIs from rendering.
export async function OverviewServicesSection() {
  const { integrations } = await getIntegrations();
  return <OverviewServices integrations={integrations} />;
}
