import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BillingOverview } from "@/types/billing-overview";

function pct(used: number, limit: number): number {
  if (limit <= 0) return 0;
  return Math.min(100, Math.round((used / limit) * 100));
}

export async function UsageCard({ overview }: { overview: BillingOverview | null }) {
  if (!overview) return null;
  const t = await getTranslations("dashboard.usage");
  const { tier, postsThisMonth, postsLimit } = overview;
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
          <span className="text-xs text-muted-foreground capitalize">
            {t("planLabel", { tier: tier.toLowerCase() })}
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
