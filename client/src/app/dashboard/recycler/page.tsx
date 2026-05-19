import { getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { RecyclerView } from "@/components/recycler/recycler-view";
import { getRecycleCandidates } from "@/lib/recycler/get-candidates";
import { getRecycleSettings } from "@/lib/recycler/get-settings";

export default async function RecyclerPage() {
  const [candidates, settings, t] = await Promise.all([
    getRecycleCandidates(), getRecycleSettings(), getTranslations("recycler"),
  ]);
  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <Separator className="my-2" />
      <RecyclerView candidates={candidates} settings={settings} />
    </>
  );
}
