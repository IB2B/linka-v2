import { MessageSquare } from "lucide-react";

export function InboxEmpty({ message }: { message?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <MessageSquare aria-hidden className="size-5 text-muted-foreground" />
      </span>
      <p className="text-sm font-medium">No conversation selected</p>
      <p className="max-w-xs text-xs text-muted-foreground">
        {message ?? "Pick a conversation from the list to read and reply."}
      </p>
    </div>
  );
}
