import { Card } from "@/components/ui/card";
import { IntegrationRow } from "./integration-row";
import { IntegrationRecheck } from "./integration-recheck";
import { CATEGORY_META, CATEGORY_ORDER } from "./integration-meta";
import type { IntegrationStatus } from "@/types/admin-settings.types";

type Props = { integrations: IntegrationStatus[]; checkedAt: string | null };

export function IntegrationsList({ integrations, checkedAt }: Props) {
  if (integrations.length === 0) {
    return (
      <p className="text-sm tracking-tight text-muted-foreground">No integrations defined.</p>
    );
  }
  const configured = integrations.filter((i) => i.configured).length;
  const up = integrations.filter((i) => i.reachable === true).length;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs tracking-tight text-muted-foreground">
          {configured} of {integrations.length} configured
          {up > 0 ? ` · ${up} live` : ""}
          {checkedAt ? ` · checked ${new Date(checkedAt).toLocaleTimeString()}` : ""}
        </span>
        <IntegrationRecheck />
      </div>
      <div className="gap-4 lg:columns-2 lg:[column-fill:balance]">
        {CATEGORY_ORDER.map((cat) => {
          const items = integrations.filter((i) => i.category === cat);
          if (items.length === 0) return null;
          const { label, Icon } = CATEGORY_META[cat];
          return (
            <Card key={cat} size="sm" className="mb-4 gap-0 break-inside-avoid py-0">
              <div className="flex items-center gap-2 border-b px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Icon className="size-3.5" />
                {label}
              </div>
              <ul className="flex flex-col divide-y">
                {items.map((i) => <IntegrationRow key={i.key} integration={i} />)}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
