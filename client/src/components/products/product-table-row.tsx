"use client";

import Link from "next/link";
import { Megaphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductActionsMenu } from "./product-actions-menu";
import { ProductBriefStatus } from "./product-brief-status";
import type { Product } from "@/types/product";

type Props = { product: Product; onEdit: () => void };

// One product in the table. The row opens the editor; the site link, the
// Promote button and the menu stop the click so they do their own thing.
export function ProductTableRow({ product, onEdit }: Props) {
  const host = product.url?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") ?? null;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <tr onClick={onEdit} className="cursor-pointer border-b align-top transition-colors last:border-0 hover:bg-muted/40">
      <td className="py-3.5 pl-4 pr-3">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold uppercase">
            {product.name.trim().charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">{product.name}</p>
            {host ? (
              <a href={product.url ?? undefined} target="_blank" rel="noopener noreferrer" onClick={stop}
                className="block truncate text-xs text-muted-foreground hover:text-foreground hover:underline">
                {host}
              </a>
            ) : <p className="text-xs text-muted-foreground">No website</p>}
          </div>
        </div>
      </td>
      <td className="hidden px-3 py-3.5 lg:table-cell">
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.pitch}</p>
      </td>
      <td className="px-3 py-3.5"><ProductBriefStatus product={product} /></td>
      <td className="py-3 pl-3 pr-3" onClick={stop}>
        <div className="flex items-center justify-end gap-1">
          <Button variant="outline" size="sm" nativeButton={false}
            render={<Link href={`/dashboard/generate?product=${product.id}`} />}>
            <Megaphone /> Promote
          </Button>
          <ProductActionsMenu product={product} onEdit={onEdit} />
        </div>
      </td>
    </tr>
  );
}
