"use client";

import { ProductTableRow } from "./product-table-row";
import type { Product } from "@/types/product";

type Props = { products: Product[]; onEdit: (product: Product) => void };

const HEAD = "px-3 py-2.5 text-left text-xs font-medium text-muted-foreground";

// Saved products as a table: product, pitch, how much of the brief is filled.
export function ProductsTable({ products, onEdit }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full table-fixed text-sm">
        <thead className="border-b bg-muted/30">
          <tr>
            <th className={`${HEAD} w-[40%] pl-4 md:w-[32%]`}>Product</th>
            <th className={`${HEAD} hidden md:table-cell`}>Pitch</th>
            <th className={`${HEAD} w-28`} title="Optional details filled in. More details make better posts.">
              Details
            </th>
            <th className="w-12"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <ProductTableRow key={p.id} product={p} onEdit={() => onEdit(p)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
