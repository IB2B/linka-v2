import { cn } from "@/lib/utils";
import type { Message } from "@/lib/inbox/inbox.types";

export function MessageBubble({ message }: { message: Message }) {
  const isOut = message.direction === "outgoing";
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString(undefined, {
        hour: "numeric", minute: "2-digit",
      })
    : "";

  return (
    <div className={cn("flex w-full", isOut ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[75%] space-y-1")}>
        <div className={cn(
          "rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap break-words",
          isOut
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm",
        )}>
          {message.text}
        </div>
        <p className={cn("text-[10px] text-muted-foreground", isOut ? "text-right" : "text-left")}>
          {time}
        </p>
      </div>
    </div>
  );
}
