import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { RecyclerView } from "@/components/recycler/recycler-view";
import { getRecycleCandidates } from "@/lib/recycler/get-candidates";
import { getRecycleSettings } from "@/lib/recycler/get-settings";

export default async function RecyclerPage() {
  const [candidates, settings] = await Promise.all([
    getRecycleCandidates(),
    getRecycleSettings(),
  ]);
  return (
    <>
      <PageHeader
        title="Smart Recycler"
        description="Resurface your best posts with a fresh angle."
      />
      <Separator className="my-2" />
      <RecyclerView candidates={candidates} settings={settings} />
    </>
  );
}
