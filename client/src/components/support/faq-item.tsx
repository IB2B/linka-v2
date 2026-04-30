import { ChevronDown } from "lucide-react";

import type { FaqEntry } from "./faq-data";

export function FaqItem({ entry }: { entry: FaqEntry }) {
  return (
    <details className="group rounded-lg border bg-card px-4 py-3 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium">
        {entry.q}
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
        />
      </summary>
      <p className="mt-2 text-sm text-muted-foreground">{entry.a}</p>
    </details>
  );
}
