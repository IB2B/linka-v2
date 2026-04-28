import { Check } from "lucide-react";

export function PlanFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
      <span className="text-muted-foreground">{children}</span>
    </li>
  );
}
