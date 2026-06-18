import { Badge } from "@/components/ui/badge";
import type { IntegrationStatus } from "@/types/admin-settings.types";

function StatusBadge({ integration: i }: { integration: IntegrationStatus }) {
  if (!i.configured) return <Badge variant="destructive">Missing</Badge>;
  if (i.reachable === true) {
    return (
      <Badge variant="outline" className="gap-1.5">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Up{i.latencyMs != null ? ` · ${i.latencyMs}ms` : ""}
      </Badge>
    );
  }
  if (i.reachable === false) {
    return (
      <Badge variant="outline" className="gap-1.5 text-rose-600" title={i.error ?? "Unreachable"}>
        <span className="size-1.5 rounded-full bg-rose-500" />
        Down
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1.5">
      <span className="size-1.5 rounded-full bg-emerald-500" />
      Configured
    </Badge>
  );
}

export function IntegrationRow({ integration }: { integration: IntegrationStatus }) {
  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-sm font-medium tracking-tight">{integration.label}</span>
      <StatusBadge integration={integration} />
    </li>
  );
}
