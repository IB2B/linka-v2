"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = { body: string; mine: boolean };

const COLLAPSE_THRESHOLD = 280;

export function TicketMessageBody({ body, mine }: Props) {
  const [expanded, setExpanded] = useState(false);
  const longText = body.length > COLLAPSE_THRESHOLD;

  return (
    <div className={cn(
      "max-w-full overflow-hidden rounded-2xl px-3.5 py-2 text-sm shadow-xs ring-1",
      mine
        ? "rounded-br-md bg-primary text-primary-foreground ring-primary/20"
        : "rounded-bl-md bg-background text-foreground ring-border",
    )}>
      <div className={cn(
        "whitespace-pre-wrap break-all",
        longText && !expanded && "line-clamp-6",
      )}>
        {body}
      </div>
      {longText ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={cn(
            "mt-1.5 text-xs font-medium underline-offset-2 hover:underline",
            mine ? "text-primary-foreground/85" : "text-primary",
          )}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}
