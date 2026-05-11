import { Bug, Lightbulb, MessageCircle } from "lucide-react";

type Category = "bug" | "feature" | "general";

const META: Record<Category, { label: string; icon: typeof Bug; cls: string }> = {
  bug:     { label: "Bug",     icon: Bug,           cls: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300" },
  feature: { label: "Feature", icon: Lightbulb,     cls: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300" },
  general: { label: "General", icon: MessageCircle, cls: "border-border bg-muted text-foreground/80" },
};

export function FeedbackCategoryBadge({ category }: { category: Category }) {
  const m = META[category];
  const Icon = m.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${m.cls}`}
    >
      <Icon className="size-3" />
      {m.label}
    </span>
  );
}
