import type { LucideIcon } from "lucide-react";
import { Hammer } from "lucide-react";

type Props = { title: string; description: string; icon?: LucideIcon };

export function TabEmpty({ title, description, icon: Icon = Hammer }: Props) {
  return (
    <div className="flex min-h-[360px] flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 px-6 py-16 text-center">
      <div className="grid size-12 place-items-center rounded-full bg-background ring-1 ring-border">
        <Icon className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium tracking-tight">{title}</p>
      <p className="max-w-sm text-sm tracking-tight text-muted-foreground">{description}</p>
    </div>
  );
}
