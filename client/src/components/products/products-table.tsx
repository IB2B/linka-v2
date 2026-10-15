"use client";

import { ProductTableRow } from "./product-table-row";
import type { Product } from "@/types/product";

type Props = { products: Product[]; onEdit: (product: Product) => void };

const HEAD = "px-3 py-2.5 text-left text-xs font-medium text-muted-foreground";

// Saved products as a table: product, pitch, how complete the brief is, and
// a Promote shortcut to the Generate page.
export function ProductsTable({ products, onEdit }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full table-fixed text-sm">
        <thead className="border-b bg-muted/30">
          <tr>
            <th className={`${HEAD} w-[45%] pl-4 lg:w-[26%]`}>Product</th>
            <th className={`${HEAD} hidden lg:table-cell`}>Pitch</th>
            <th className={`${HEAD} w-36`}>Brief</th>
            <th className="w-40"><span className="sr-only">Actions</span></th>
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
