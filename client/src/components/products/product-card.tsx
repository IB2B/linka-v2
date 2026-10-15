"use client";

import { ArrowRight } from "lucide-react";

import { productCompleteness } from "@/lib/content/product-completeness";
import { ProductCardMenu } from "./product-card-menu";
import type { Product } from "@/types/product";

type Props = { product: Product; onEdit: () => void };

// One saved product: initial tile, name, site, pitch, and how much of the
// brief is filled in (more details → better promo posts).
export function ProductCard({ product, onEdit }: Props) {
  const host = product.url?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") ?? null;
  const { filled, total } = productCompleteness(product);

  return (
    <div className="flex flex-col rounded-lg border bg-card p-4 transition-colors hover:border-foreground/20">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-semibold uppercase">
          {product.name.trim().charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium leading-tight">{product.name}</p>
          {host ? (
            <a href={product.url ?? undefined} target="_blank" rel="noopener noreferrer"
              className="truncate text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
              {host}
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">No website</p>
          )}
        </div>
        <ProductCardMenu product={product} onEdit={onEdit} />
      </div>
      <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">{product.pitch}</p>
      <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3 text-xs">
        <span className="text-muted-foreground">
          <span className="font-medium tabular-nums text-foreground">{filled}</span> of {total} details
        </span>
        <button type="button" onClick={onEdit}
          className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground">
          {filled < total ? "Add details" : "Edit details"}
          <ArrowRight className="size-3" />
        </button>
      </div>
    </div>
  );
}
