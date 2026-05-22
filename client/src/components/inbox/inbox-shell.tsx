import { ConversationList } from "./conversation-list";
import { InboxError } from "./inbox-error";
import { cn } from "@/lib/utils";
import { getConversations } from "@/lib/inbox/get-conversations";
import { getAccounts } from "@/lib/zernio/get-accounts";

type Props = {
  activeId: string | null;
  platform: string;
  children: React.ReactNode;
};

export async function InboxShell({ activeId, platform, children }: Props) {
  const [result, accounts] = await Promise.all([
    getConversations(platform || undefined),
    getAccounts(),
  ]);

  return (
    <div className="grid h-[calc(100svh-5.5rem)] grid-cols-1 overflow-hidden rounded-xl border bg-card lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className={cn("border-r lg:block", activeId ? "hidden" : "block")}>
        {result.ok ? (
          <ConversationList
            conversations={result.data.conversations}
            activeId={activeId}
            platform={platform}
            accounts={accounts}
          />
        ) : (
          <InboxError
            message={result.status === 402 ? "Inbox add-on required" : "Couldn't load conversations"}
            hint={
              result.status === 402
                ? "Enable the Inbox add-on on your Late workspace to manage DMs here."
                : result.error === "service_unavailable"
                  ? "Our messaging provider is temporarily unavailable. Please try again in a few minutes."
                  : result.error
            }
          />
        )}
      </aside>
      <section className={cn("h-full min-h-0 flex-col lg:flex", activeId ? "flex" : "hidden lg:flex")}>
        {children}
      </section>
    </div>
  );
}
