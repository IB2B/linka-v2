import type { SupportCategory } from "@/types/admin-support";

const LABEL: Record<SupportCategory, string> = {
  bug: "Bug", billing: "Billing", feature: "Feature",
  account: "Account", other: "Other",
};

export function SupportCategoryPill({ category }: { category: SupportCategory | null }) {
  if (!category) return null;
  return (
    <span className="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium tracking-tight text-muted-foreground">
      {LABEL[category] ?? category}
    </span>
  );
}
