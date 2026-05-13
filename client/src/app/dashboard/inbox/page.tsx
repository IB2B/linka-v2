import { InboxShell } from "@/components/inbox/inbox-shell";
import { InboxEmpty } from "@/components/inbox/inbox-empty";

type SP = Promise<{ platform?: string }>;

export default async function InboxPage({ searchParams }: { searchParams: SP }) {
  const { platform = "" } = await searchParams;
  return (
    <InboxShell activeId={null} platform={platform}>
      <InboxEmpty />
    </InboxShell>
  );
}
