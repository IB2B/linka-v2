"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SettingsSection } from "./settings-section";
import { ProductSheet } from "@/components/products/product-sheet";
import { ProductsTable } from "@/components/products/products-table";
import { ProductsEmpty } from "@/components/products/products-empty";
import type { Product } from "@/types/product";

// `editing`: undefined = sheet closed, null = adding, a product = editing it.
export function ProductsSection({ products }: { products: Product[] }) {
  const [editing, setEditing] = useState<Product | null | undefined>(undefined);
  const hasProducts = products.length > 0;

  return (
    <SettingsSection
      title="Products"
      description="The products you promote, usually your own SaaS. Save them once, then pick one on the Generate page with “Promote a product”."
      action={hasProducts ? (
        <Button size="sm" onClick={() => setEditing(null)}>
          <Plus /> Add product
        </Button>
      ) : null}
    >
      {hasProducts ? (
        <ProductsTable products={products} onEdit={setEditing} />
      ) : (
        <ProductsEmpty onAdd={() => setEditing(null)} />
      )}
      <ProductSheet key={editing === undefined ? "closed" : editing?.id ?? "new"}
        open={editing !== undefined} product={editing ?? null}
        onOpenChange={(open) => { if (!open) setEditing(undefined); }} />
    </SettingsSection>
  );
}
