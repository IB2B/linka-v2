import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, label: "Post type" },
  { n: 2, label: "Settings" },
  { n: 3, label: "Topic" },
] as const;

export function GenerateStepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
              step > s.n && "bg-primary text-primary-foreground",
              step === s.n && "bg-primary text-primary-foreground ring-4 ring-primary/20",
              step < s.n && "bg-muted text-muted-foreground",
            )}>
              {step > s.n ? <Check className="size-3.5" /> : s.n}
            </div>
            <span className={cn(
              "text-sm transition-colors",
              step === s.n ? "font-semibold text-foreground" : "text-muted-foreground",
            )}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={cn(
              "mx-4 h-px w-12 flex-1 bg-border transition-colors sm:w-20",
              step > s.n && "bg-primary/50",
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
