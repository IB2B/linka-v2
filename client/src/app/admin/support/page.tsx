import { LifeBuoy, MessageSquare } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";
import { SubPageNav } from "@/components/admin/sub-page-nav";

export const dynamic = "force-dynamic";

const TABS = [
  { id: "tickets", label: "Tickets" },
  { id: "feedback", label: "Feedback" },
];

type Props = { searchParams: Promise<{ tab?: string }> };

export default async function AdminSupportPage({ searchParams }: Props) {
  const { tab } = await searchParams;
  const active = TABS.find((t) => t.id === tab)?.id ?? "tickets";
  return (
    <>
      <PageHeader
        title="Support"
        description="Inbound tickets and product feedback from users."
      />
      <SubPageNav items={TABS} active={active} basePath="/admin/support" defaultId="tickets" />
      {active === "feedback" ? (
        <ComingSoon title="Feedback" description="Product feedback submitted from the in-app widget." icon={MessageSquare} />
      ) : (
        <ComingSoon title="Tickets" description="Inbound support tickets across all users." icon={LifeBuoy} />
      )}
    </>
  );
}
