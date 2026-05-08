import { Check, Clock, EyeOff, ShieldX } from "lucide-react";

const STYLE: Record<string, { cls: string; icon: React.ComponentType<{ className?: string }>; label: string }> = {
  pending:   { cls: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400", icon: Clock,    label: "Pending" },
  reviewing: { cls: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400",          icon: ShieldX,  label: "Reviewing" },
  actioned:  { cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400", icon: Check, label: "Actioned" },
  dismissed: { cls: "border-muted-foreground/30 bg-muted text-muted-foreground",               icon: EyeOff,   label: "Dismissed" },
};

export function FlagStatusBadge({ status }: { status: string }) {
  const s = STYLE[status] ?? STYLE.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium tracking-tight ${s.cls}`}>
      <s.icon className="size-3" />
      {s.label}
    </span>
  );
}
