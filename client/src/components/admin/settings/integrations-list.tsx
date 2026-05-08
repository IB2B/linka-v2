import { Card } from "@/components/ui/card";
import { IntegrationRow } from "@/components/admin/settings/integration-row";
import type { IntegrationStatus } from "@/types/admin";

export function IntegrationsList({ integrations }: { integrations: IntegrationStatus[] }) {
  if (integrations.length === 0) {
    return (
      <p className="text-sm tracking-tight text-muted-foreground">
        No integrations defined.
      </p>
    );
  }
  return (
    <Card size="sm" className="py-0">
      <ul className="flex flex-col divide-y">
        {integrations.map((i) => (
          <IntegrationRow key={i.key} integration={i} />
        ))}
      </ul>
    </Card>
  );
}
