import { getTranslations } from "next-intl/server";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { EngagementChart } from "./engagement-chart";
import type { EngagementDay } from "@/lib/dashboard/engagement.types";

export async function EngagementCard({ data }: { data: EngagementDay[] }) {
  const t = await getTranslations("dashboard.engagement");
  const hasData = data.some((d) =>
    d.likes + d.comments + d.views + d.impressions > 0,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("description", { days: data.length })}
        </CardDescription>
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
