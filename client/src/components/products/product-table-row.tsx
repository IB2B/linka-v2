"use client";

import { productCompleteness } from "@/lib/content/product-completeness";
import { ProductActionsMenu } from "./product-actions-menu";
import type { Product } from "@/types/product";

type Props = { product: Product; onEdit: () => void };

// One product in the table. The whole row opens the editor; the menu and the
// site link stop the click so they do their own thing.
export function ProductTableRow({ product, onEdit }: Props) {
  const host = product.url?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") ?? null;
  const { filled, total } = productCompleteness(product);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <tr onClick={onEdit} className="cursor-pointer border-b transition-colors last:border-0 hover:bg-muted/40">
      <td className="py-3 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold uppercase">
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
      <td className="hidden max-w-0 px-3 py-3 md:table-cell">
        <p className="truncate text-muted-foreground">{product.pitch}</p>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="h-1 w-14 overflow-hidden rounded-full bg-muted" aria-hidden>
            <div className="h-full rounded-full bg-foreground/50" style={{ width: `${(filled / total) * 100}%` }} />
          </div>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">{filled}/{total}</span>
        </div>
      </td>
      <td className="w-px py-3 pl-1 pr-3 text-right" onClick={stop}>
        <ProductActionsMenu product={product} onEdit={onEdit} />
      </td>
    </tr>
  );
}
