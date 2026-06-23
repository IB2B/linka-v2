import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { IntegrationStatus } from "@/types/admin-settings.types";
import { serviceDot, summarise } from "./overview-services-status";

function Header() {
  return (
    <div className="flex items-center justify-between border-b px-5 py-3">
      <div className="flex items-center gap-2">
        <Activity className="size-3.5 text-muted-foreground" />
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Service health
        </h3>
      </div>
      <Link
        href="/admin/settings?section=integrations"
        className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground"
      >
        Details <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}

export function OverviewServices({ integrations }: { integrations: IntegrationStatus[] }) {
  if (integrations.length === 0) return null;
  const s = summarise(integrations);
  return (
    <Card size="sm" className="gap-0 p-0">
      <Header />
      <div className="flex flex-col gap-3 px-5 py-4">
        <span className={`text-sm font-medium tracking-tight ${s.tone}`}>{s.label}</span>
        <div className="flex flex-wrap gap-2">
          {integrations.map((i) => (
            <span
              key={i.key}
              title={i.error ?? (i.latencyMs != null ? `${i.latencyMs}ms` : undefined)}
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs tracking-tight"
            >
              <span className={`size-1.5 rounded-full ${serviceDot(i)}`} />
              {i.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function OverviewServicesSkeleton() {
  return (
    <Card size="sm" className="gap-0 p-0">
      <Header />
      <div className="px-5 py-4 text-sm tracking-tight text-muted-foreground">
        Checking services…
      </div>
    </Card>
  );
}
