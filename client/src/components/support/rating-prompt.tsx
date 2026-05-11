"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { rateMyTicketAction } from "@/app/dashboard/support/actions";
import { cn } from "@/lib/utils";

type Props = { id: string; current: number | null };

export function RatingPrompt({ id, current }: Props) {
  const [hover, setHover] = useState(0);
  const [value, setValue] = useState(current ?? 0);
  const [pending, start] = useTransition();
  const submitted = (current ?? 0) > 0;

  function pick(n: number) {
    if (pending || submitted) return;
    setValue(n);
    start(async () => {
      const r = await rateMyTicketAction(id, n);
      if ("error" in r) { toast.error(r.error); setValue(current ?? 0); }
      else toast.success("Thanks for the feedback!");
    });
  }

  return (
    <Card size="sm" className="gap-2 px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <p className="text-sm font-medium tracking-tight">
            {submitted ? "You rated this conversation" : "How was your support experience?"}
          </p>
          <p className="text-xs tracking-tight text-muted-foreground">
            {submitted ? "Thanks — this helps us improve." : "Tap a star to rate."}
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => {
            const filled = (hover || value) >= n;
            return (
              <button
                key={n} type="button" disabled={pending || submitted}
                onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
                onClick={() => pick(n)}
                className="p-1 disabled:cursor-default"
                aria-label={`${n} star${n === 1 ? "" : "s"}`}
              >
                <Star className={cn(
                  "size-5 transition",
                  filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground",
                )} />
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
