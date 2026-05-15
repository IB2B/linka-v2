import { cn } from "@/lib/utils";

type Props = { current: number; total?: number };

export function OnboardingStepper({ current, total = 4 }: Props) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full transition-all duration-200",
            i + 1 === current
              ? "size-2.5 bg-foreground"
              : "size-2 bg-muted-foreground/35",
          )}
        />
      ))}
    </div>
  );
}
