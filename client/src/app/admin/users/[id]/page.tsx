import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { UserPageHero } from "@/components/admin/users/detail/user-page-hero";
import { UserDetailSubscription } from "@/components/admin/users/detail/user-detail-subscription";
import { UserAiKpis } from "@/components/admin/users/detail/user-ai-kpis";
import { UserDraftsTable } from "@/components/admin/users/detail/user-drafts-table";
import { UserDetailActivity } from "@/components/admin/users/user-detail-activity";
import { UserDetailMeta } from "@/components/admin/users/user-detail-meta";
import { getUserPageData } from "@/lib/admin/get-user-page";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ month?: string }>;
};

export default async function AdminUserPage({ params, searchParams }: Props) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const month = sp.month?.slice(0, 7);
  const data = await getUserPageData(id, month);
  if (!data) notFound();
  const { detail, ai } = data;

  return (
    <div className="space-y-6">
      <UserPageHero user={detail.user} profile={detail.profile} month={month} />
      <UserAiKpis stats={ai.stats} />
      <UserDraftsTable drafts={ai.drafts} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-6">
          <UserDetailSubscription
            subscription={detail.subscription}
            userId={detail.user.id}
            email={detail.user.email}
            eligibility={detail.refundEligibility}
          />
          <Card size="sm" className="gap-0 p-0">
            <div className="border-b px-5 py-3">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Profile
              </h3>
            </div>
            <div className="px-5 py-4">
              <UserDetailMeta detail={detail} />
            </div>
          </Card>
        </div>
        <Card size="sm" className="gap-0 p-0">
          <div className="border-b px-5 py-3">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recent activity
            </h3>
          </div>
          <div className="px-5 py-4">
            <UserDetailActivity events={detail.activity} />
          </div>
        </Card>
      </div>
    </div>
  );
}
