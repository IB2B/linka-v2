"use client";

import { useState } from "react";
import { ExternalLink, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteProductDialog } from "./delete-product-dialog";
import type { Product } from "@/types/product";

type Props = { product: Product; onEdit: () => void };

// The "⋯" menu for a product: edit, open the site, delete (with a confirm).
export function ProductActionsMenu({ product, onEdit }: Props) {
  const [deleting, setDeleting] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${product.name}`} />
        }>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onEdit}><Pencil /> Edit</DropdownMenuItem>
            {product.url ? (
              <DropdownMenuItem render={<a href={product.url} target="_blank" rel="noopener noreferrer" />}>
                <ExternalLink /> Visit website
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setDeleting(true)}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteProductDialog id={product.id} name={product.name} open={deleting} onOpenChange={setDeleting} />
    </>
  );
}
