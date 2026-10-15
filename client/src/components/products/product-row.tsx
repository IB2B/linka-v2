"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "./delete-product-button";
import type { Product } from "@/types/product";

type Props = { product: Product; onEdit: () => void };

// One saved product: name, link and pitch, with edit and delete.
export function ProductRow({ product, onEdit }: Props) {
  const host = product.url ? product.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : null;
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
          <span className="font-medium">{product.name}</span>
          {host ? <span className="truncate text-xs text-muted-foreground">{host}</span> : null}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.pitch}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="icon-sm" aria-label={`Edit ${product.name}`} onClick={onEdit}>
          <Pencil />
        </Button>
        <DeleteProductButton id={product.id} name={product.name} />
      </div>
    </div>
  );
}
