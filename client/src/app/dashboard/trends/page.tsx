import { getTranslations } from "next-intl/server";
import { Radar } from "lucide-react";

import { TrendsGrid } from "@/components/trends/trends-grid";
import { TrendsEmpty } from "@/components/trends/trends-empty";
import { TrendsBoard } from "@/components/trends/trends-board";
import { getTrends } from "@/lib/trends/get-trends";
import { checkPaidFeature } from "@/lib/billing/check-paid-feature";
import { UpgradeWall } from "@/components/billing/upgrade-wall";

export default async function TrendsPage() {
  const access = await checkPaidFeature("trends");
  if (!access.hasAccess) return <UpgradeWall feature="trends" />;
  const [{ trends, ideas, suggestedTopics }, t] = await Promise.all([
    getTrends(), getTranslations("trends"),
  ]);

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Radar className="size-5 text-muted-foreground" aria-hidden />
          <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        </div>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <TrendsBoard
        topics={suggestedTopics}
        count={trends.length}
        fetchedAt={trends[0]?.fetchedAt ?? null}
      >
        {trends.length === 0 ? <TrendsEmpty /> : <TrendsGrid trends={trends} ideas={ideas} />}
      </TrendsBoard>
    </>
  );
}
