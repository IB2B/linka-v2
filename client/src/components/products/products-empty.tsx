import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// First-run state for Settings → Products: says what it's for and offers the one action.
export function ProductsEmpty({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed px-6 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Package className="size-5" />
      </div>
      <p className="mt-4 text-sm font-medium">No products yet</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Add your product so the AI can promote it with real details. You can fill it in from your
        website in one click.
      </p>
      <Button size="sm" className="mt-5" onClick={onAdd}>
        <Plus /> Add your first product
      </Button>
    </div>
  );
}
