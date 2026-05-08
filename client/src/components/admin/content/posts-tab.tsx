import { ContentOverview } from "@/components/admin/content/content-overview";
import { ContentTable } from "@/components/admin/content/content-table";
import { ContentToolbar } from "@/components/admin/content/content-toolbar";
import { getAdminContent } from "@/lib/admin/get-content";
import { contentFilterFromParams } from "@/lib/admin/content-filters";

type Props = { sp: { q?: string; status?: string; platform?: string } };

export async function PostsTab({ sp }: Props) {
  const { rows, total, summary } = await getAdminContent(sp);
  return (
    <div className="space-y-6">
      <ContentOverview summary={summary} />
      <div className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight">All posts</h2>
        <ContentToolbar
          active={contentFilterFromParams(sp)}
          q={sp.q}
          total={total}
        />
        <ContentTable rows={rows} />
      </div>
    </div>
  );
}
