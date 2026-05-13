import { InboxShell } from "@/components/inbox/inbox-shell";
import { ThreadSkeleton } from "@/components/inbox/thread-skeleton";

export default function ConversationLoading() {
  return (
    <InboxShell activeId={null} platform="">
      <ThreadSkeleton />
    </InboxShell>
  );
}
