"use client";

import { Package } from "lucide-react";

import { SelectDot } from "./select-dot";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type Props = { product: Product; selected: boolean; disabled: boolean; onClick: () => void };

// One saved product as a radio option, styled like the topic suggestions.
export function ProductPickItem({ product, selected, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group flex w-full items-start gap-3 rounded-md border bg-card p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "hover:border-primary/50 hover:bg-muted/40",
      )}
    >
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Package className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className={cn("font-medium leading-snug", selected ? "text-primary" : "group-hover:text-primary")}>
          {product.name}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.pitch}</p>
      </div>
      <SelectDot selected={selected} />
    </button>
  );
}
