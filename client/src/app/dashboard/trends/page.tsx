import { getTranslations } from "next-intl/server";

import { Separator } from "@/components/ui/separator";
import { TrendsGrid } from "@/components/trends/trends-grid";
import { TrendsEmpty } from "@/components/trends/trends-empty";
import { TopicPicker } from "@/components/trends/topic-picker";
import { getTrends } from "@/lib/trends/get-trends";
import { checkPaidFeature } from "@/lib/billing/check-paid-feature";
import { UpgradeWall } from "@/components/billing/upgrade-wall";

export default async function TrendsPage() {
  const access = await checkPaidFeature("trends");
  if (!access.hasAccess) return <UpgradeWall feature="trends" />;
  const [{ trends, ideas }, t] = await Promise.all([
    getTrends(), getTranslations("trends"),
  ]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <TopicPicker />
      <Separator className="my-2" />
      {trends.length === 0 ? <TrendsEmpty /> : <TrendsGrid trends={trends} ideas={ideas} />}
    </>
  );
}
