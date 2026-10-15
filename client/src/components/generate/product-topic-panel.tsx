"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductDialog } from "@/components/products/product-dialog";
import { ProductPickItem } from "./product-pick-item";
import { TopicGenerateBar } from "./topic-generate-bar";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  pending: boolean;
  onGenerate: (productId: string, label: string, direction?: string) => void;
};

// Step 3 for "Promote a product": pick a saved product (or add one here), add
// optional direction, then generate. The AI picks a fresh angle each time.
export function ProductTopicPanel({ products, pending, onGenerate }: Props) {
  const [selected, setSelected] = useState<string | null>(products[0]?.id ?? null);
  const [direction, setDirection] = useState("");
  const [adding, setAdding] = useState(false);
  const product = products.find((p) => p.id === selected) ?? null;

  return (
    <div className="space-y-4">
      {products.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-sm font-medium">Add the product you want to promote</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Name, link, pitch and key features. You only do this once.
          </p>
        </div>
      ) : (
        <div role="radiogroup" aria-label="Product" className="space-y-2">
          {products.map((p) => (
            <ProductPickItem key={p.id} product={p} selected={p.id === selected}
              disabled={pending} onClick={() => setSelected(p.id)} />
          ))}
        </div>
      )}
      <Button variant="outline" size="sm" disabled={pending} onClick={() => setAdding(true)}>
        <Plus /> Add product
      </Button>
      {product ? (
        <div className="space-y-2">
          <Label htmlFor="promo-direction">Anything specific for this post? (optional)</Label>
          <Textarea id="promo-direction" rows={2} value={direction} disabled={pending}
            onChange={(e) => setDirection(e.target.value)}
            placeholder="e.g. Focus on the new calendar view, mention the 7-day free trial" />
        </div>
      ) : null}
      <TopicGenerateBar label={product?.name ?? null} pending={pending}
        onGenerate={() => product && onGenerate(product.id, product.name, direction.trim() || undefined)} />
      <ProductDialog open={adding} onOpenChange={setAdding} product={null}
        onSaved={(id) => id && setSelected(id)} />
    </div>
  );
}
