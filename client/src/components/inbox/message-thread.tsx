import { MessageBubble } from "./message-bubble";
import type { Message } from "@/lib/inbox/inbox.types";

export function MessageThread({ messages }: { messages: Message[] }) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      </div>
    );
  }
  const ordered = [...messages].sort((a, b) => {
    const aT = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bT = b.createdAt ? Date.parse(b.createdAt) : 0;
    return aT - bT;
  });
  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {ordered.map((m) => <MessageBubble key={m.id} message={m} />)}
    </div>
  );
}
