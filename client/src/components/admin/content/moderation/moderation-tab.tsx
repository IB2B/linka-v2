import { ModerationOverview } from "@/components/admin/content/moderation/moderation-overview";
import { ModerationQueue } from "@/components/admin/content/moderation/moderation-queue";
import { ModerationToolbar } from "@/components/admin/content/moderation/moderation-toolbar";
import { getAdminModeration } from "@/lib/admin/get-moderation";
import { modFilterFromParams } from "@/lib/admin/moderation-filters";

type Props = { sp: { q?: string; status?: string; reason?: string } };

export async function ModerationTab({ sp }: Props) {
  const { rows, total, summary } = await getAdminModeration(sp);
  return (
    <div className="space-y-6">
      <ModerationOverview summary={summary} />
      <div className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight">Review queue</h2>
        <ModerationToolbar
          active={modFilterFromParams(sp)}
          q={sp.q}
          total={total}
        />
        <ModerationQueue flags={rows} />
      </div>
    </div>
  );
}
