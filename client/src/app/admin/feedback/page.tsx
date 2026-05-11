import { PageHeader } from "@/components/dashboard/page-header";
import { FeedbackToolbar } from "@/components/admin/feedback/feedback-toolbar";
import { FeedbackList } from "@/components/admin/feedback/feedback-list";
import { getAdminFeedback } from "@/lib/admin/get-feedback";
import { feedbackFilterFromParams } from "@/lib/admin/feedback-filters";

export const dynamic = "force-dynamic";

type Sp = { q?: string; status?: string; category?: string };

export default async function AdminFeedbackPage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const sp = await searchParams;
  const { rows, total } = await getAdminFeedback(sp);
  return (
    <>
      <PageHeader
        title="Feedback"
        description="User-submitted feedback from the in-app widget — bugs, ideas and praise."
      />
      <div className="space-y-3">
        <FeedbackToolbar
          active={feedbackFilterFromParams(sp)}
          q={sp.q}
          total={total}
          rows={rows}
        />
        <FeedbackList rows={rows} />
      </div>
    </>
  );
}
