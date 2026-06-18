import { getTranslations } from "next-intl/server";

import {
  Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { RangeTabs } from "@/components/admin/analytics/range-tabs";
import { EngagementChart } from "./engagement-chart";
import type { EngagementDay } from "@/lib/dashboard/engagement.types";

export async function EngagementCard({ data, days }: { data: EngagementDay[]; days: number }) {
  const t = await getTranslations("dashboard.engagement");
  const hasData = data.some((d) =>
    d.likes + d.comments + d.views + d.impressions > 0,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("description", { days })}
        </CardDescription>
        <CardAction>
          <RangeTabs days={days} basePath="/dashboard" options={[30, 60, 90]} />
        </CardAction>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <EngagementChart data={data} />
        ) : (
          <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
            {t("empty")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
