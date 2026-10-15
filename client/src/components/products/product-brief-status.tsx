import { productCompleteness } from "@/lib/content/product-completeness";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

// How complete a product's brief is, and the most useful thing to add next.
export function ProductBriefStatus({ product }: { product: Product }) {
  const { filled, total, nextMissing } = productCompleteness(product);
  const complete = !nextMissing;
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-sm">
        <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full",
          complete ? "bg-emerald-500" : "bg-yellow-500")} />
        {complete ? "Complete" : <span className="font-mono text-xs tabular-nums">{filled}/{total}</span>}
      </p>
      {nextMissing ? (
        <p className="truncate text-xs text-muted-foreground">Add {nextMissing.toLowerCase()}</p>
      ) : (
        <p className="text-xs text-muted-foreground">All details filled</p>
      )}
    </div>
  );
}
