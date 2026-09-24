import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

// Radio-style marker shared by the topic and article pickers.
export function SelectDot({ selected }: { selected: boolean }) {
  return (
    <div className={cn(
      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
      selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30",
    )}>
      {selected ? <Check className="size-3" /> : null}
    </div>
  );
}
