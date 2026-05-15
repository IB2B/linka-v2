import { notFound } from "next/navigation";

import { InboxShell } from "@/components/inbox/inbox-shell";
import { ThreadHeader } from "@/components/inbox/thread-header";
import { MessageThread } from "@/components/inbox/message-thread";
import { ReplyComposer } from "@/components/inbox/reply-composer";
import { InboxError } from "@/components/inbox/inbox-error";
import { getConversations } from "@/lib/inbox/get-conversations";
import { getMessages } from "@/lib/inbox/get-messages";
import { requirePaidFeature } from "@/lib/billing/require-paid-feature";

type Params = Promise<{ id: string }>;
type SP = Promise<{ platform?: string }>;

export default async function ConversationPage({
  params, searchParams,
}: { params: Params; searchParams: SP }) {
  await requirePaidFeature("inbox");
  const [{ id }, { platform = "" }] = await Promise.all([params, searchParams]);

  const convosRes = await getConversations(platform || undefined);
  const conversation = convosRes.ok
    ? convosRes.data.conversations.find((c) => c.id === id)
    : null;
  if (convosRes.ok && !conversation) notFound();

  const messagesRes = await getMessages(id, conversation?.accountId ?? null);

  return (
    <InboxShell activeId={id} platform={platform}>
      {!messagesRes.ok ? (
        <InboxError
          message={messagesRes.status === 402 ? "Inbox add-on required" : "Couldn't load messages"}
          hint={messagesRes.error}
        />
      ) : conversation ? (
        <>
          <ThreadHeader conversation={conversation} />
          <MessageThread messages={messagesRes.data.messages} />
          <ReplyComposer conversationId={id} accountId={conversation.accountId} />
        </>
      ) : null}
    </InboxShell>
  );
}
