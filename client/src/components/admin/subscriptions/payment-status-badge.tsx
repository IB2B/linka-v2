import { Check, CircleAlert, Clock, X } from "lucide-react";

const STYLES: Record<string, { cls: string; icon: React.ComponentType<{ className?: string }>; label?: string }> = {
  succeeded: { cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400", icon: Check },
  paid:      { cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400", icon: Check },
  pending:   { cls: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400", icon: Clock },
  open:      { cls: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400", icon: Clock },
  draft:     { cls: "border-muted-foreground/30 bg-muted text-muted-foreground", icon: Clock },
  failed:    { cls: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400", icon: X },
  uncollectible: { cls: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400", icon: X },
  void:      { cls: "border-muted-foreground/30 bg-muted text-muted-foreground", icon: X, label: "Void" },
  refunded:  { cls: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400", icon: CircleAlert },
};

export function PaymentStatusBadge({ status }: { status: string }) {
  const k = status.toLowerCase();
  const s = STYLES[k] ?? { cls: "border-muted-foreground/30 bg-muted text-muted-foreground", icon: CircleAlert };
  const label = s.label ?? (k.charAt(0).toUpperCase() + k.slice(1));
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium tracking-tight ${s.cls}`}>
      <s.icon className="size-3" />
      {label}
    </span>
  );
}
