import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tierLabel } from "@/lib/billing/format";
import type { BillingOverview } from "@/types/billing-overview";

function pct(used: number, limit: number): number {
  if (limit <= 0) return 0;
  return Math.min(100, Math.round((used / limit) * 100));
}

// `tier` is the effective plan (a comp account counts as Enterprise), the same
// one the sidebar meter and the post limit use; the billing row says "free".
type Props = { overview: BillingOverview | null; tier?: string };

export async function UsageCard({ overview, tier }: Props) {
  if (!overview) return null;
  const t = await getTranslations("dashboard.usage");
  const { postsThisMonth, postsLimit } = overview;
  const percent = pct(postsThisMonth, postsLimit);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold">{t("title")}</CardTitle>
        <Link href="/dashboard/billing"
          className="text-xs font-medium text-muted-foreground hover:text-foreground">
          {t("manage")}
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">
            {t("planLabel", { tier: tierLabel(tier ?? overview.tier) })}
          </span>
          <span className="text-sm font-medium tabular-nums">
            {t("postsFormat", { used: postsThisMonth, limit: postsLimit })}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all"
            style={{ width: `${percent}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">
          {t("percentUsed", { percent })}
        </p>
      </CardContent>
    </Card>
  );
}
