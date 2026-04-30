import { cn } from "@/lib/utils";

type Props = { value: number; min: number; max: number };

export function CharacterCounter({ value, min, max }: Props) {
  const tooShort = value > 0 && value < min;
  const tooLong = value > max;
  return (
    <span className={cn(
      "text-xs tabular-nums",
      tooShort || tooLong ? "text-destructive" : "text-muted-foreground",
    )}>
      {value} / {max}
      {tooShort ? ` · ${min - value} more needed` : null}
    </span>
  );
}
