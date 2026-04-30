import { PageHeader } from "@/components/dashboard/page-header";
import { InboxShell } from "@/components/inbox/inbox-shell";
import { InboxEmpty } from "@/components/inbox/inbox-empty";

type SP = Promise<{ platform?: string }>;

export default async function InboxPage({ searchParams }: { searchParams: SP }) {
  const { platform = "" } = await searchParams;

  return (
    <>
      <PageHeader
        title="Inbox"
        description="Read and reply to DMs across your connected social accounts."
      />
      <InboxShell activeId={null} platform={platform}>
        <InboxEmpty />
      </InboxShell>
    </>
  );
}
