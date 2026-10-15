"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SettingsSection } from "./settings-section";
import { ProductDialog } from "@/components/products/product-dialog";
import { ProductRow } from "@/components/products/product-row";
import type { Product } from "@/types/product";

// `editing`: undefined = dialog closed, null = adding, a product = editing it.
export function ProductsSection({ products }: { products: Product[] }) {
  const [editing, setEditing] = useState<Product | null | undefined>(undefined);

  return (
    <SettingsSection
      title="Products"
      description="The products you promote, usually your own SaaS. Save them once, then pick one on the Generate page with “Promote a product”."
    >
      {products.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-sm font-medium">No products yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your product so the AI can write posts that promote it with real details.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <ProductRow key={p.id} product={p} onEdit={() => setEditing(p)} />
          ))}
        </div>
      )}
      <Button variant="outline" size="sm" onClick={() => setEditing(null)}>
        <Plus /> Add product
      </Button>
      <ProductDialog key={editing?.id ?? "new"} open={editing !== undefined} product={editing ?? null}
        onOpenChange={(open) => { if (!open) setEditing(undefined); }} />
    </SettingsSection>
  );
}
