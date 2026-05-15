import { InboxShell } from "@/components/inbox/inbox-shell";
import { InboxEmpty } from "@/components/inbox/inbox-empty";
import { checkPaidFeature } from "@/lib/billing/check-paid-feature";
import { UpgradeWall } from "@/components/billing/upgrade-wall";

type SP = Promise<{ platform?: string }>;

export default async function InboxPage({ searchParams }: { searchParams: SP }) {
  const access = await checkPaidFeature("inbox");
  if (!access.hasAccess) return <UpgradeWall feature="inbox" />;
  const { platform = "" } = await searchParams;
  return (
    <InboxShell activeId={null} platform={platform}>
      <InboxEmpty />
    </InboxShell>
  );
}
