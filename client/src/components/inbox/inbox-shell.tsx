import { ConversationList } from "./conversation-list";
import { InboxError } from "./inbox-error";
import { cn } from "@/lib/utils";
import { getConversations } from "@/lib/inbox/get-conversations";
import { getLinkedinStatus } from "@/lib/inbox/linkedin-status";
import { getAccounts } from "@/lib/zernio/get-accounts";
import { inboxErrorCopy } from "@/lib/inbox/inbox-error-copy";

type Props = {
  activeId: string | null;
  platform: string;
  children: React.ReactNode;
};

export async function InboxShell({ activeId, platform, children }: Props) {
  const [result, accounts, linkedin] = await Promise.all([
    getConversations(platform || undefined),
    getAccounts(),
    getLinkedinStatus(),
  ]);
  const err = result.ok ? null : inboxErrorCopy(result.status, result.error);

  return (
    <div className="grid h-[calc(100svh-5.5rem)] grid-cols-1 overflow-hidden rounded-xl border bg-card lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className={cn("h-full min-h-0 overflow-hidden border-r lg:block", activeId ? "hidden" : "block")}>
        {result.ok ? (
          <ConversationList
            conversations={result.data.conversations}
            activeId={activeId}
            platform={platform}
            accounts={accounts}
            linkedinConnected={linkedin.connected}
          />
        ) : err ? (
          <InboxError message={err.message} hint={err.hint} />
        ) : null}
      </aside>
      <section className={cn("h-full min-h-0 flex-col lg:flex", activeId ? "flex" : "hidden lg:flex")}>
        {children}
      </section>
    </div>
  );
}
