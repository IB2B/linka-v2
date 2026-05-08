import { Badge } from "@/components/ui/badge";
import type { IntegrationStatus } from "@/types/admin";

const CATEGORY_LABEL: Record<IntegrationStatus["category"], string> = {
  ai: "AI",
  billing: "Billing",
  social: "Social",
  search: "Search",
};

export function IntegrationRow({ integration }: { integration: IntegrationStatus }) {
  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium tracking-tight">{integration.label}</span>
        <Badge variant="outline" className="text-[10px]">
          {CATEGORY_LABEL[integration.category]}
        </Badge>
      </div>
      {integration.configured ? (
        <Badge variant="outline" className="gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Configured
        </Badge>
      ) : (
        <Badge variant="destructive">Missing</Badge>
      )}
    </li>
  );
}
