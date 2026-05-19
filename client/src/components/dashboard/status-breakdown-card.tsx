import { getTranslations } from "next-intl/server";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { StatusDonut } from "./status-donut";
import type { DashboardCounts } from "@/lib/dashboard/build-overview";

export async function StatusBreakdownCard({ counts }: { counts: DashboardCounts }) {
  const t = await getTranslations("dashboard.status");
  const slices = [
    { label: t("posted"), value: counts.posted, color: "#10b981" },
    { label: t("scheduled"), value: counts.scheduled, color: "#6366f1" },
    { label: t("drafts"), value: counts.drafts, color: "#f59e0b" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("subtitle", { count: counts.totalGenerated })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StatusDonut slices={slices} />
      </CardContent>
    </Card>
  );
}
