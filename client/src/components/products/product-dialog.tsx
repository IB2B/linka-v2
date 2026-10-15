"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { saveProductAction } from "@/app/dashboard/settings/product-actions";
import { ProductForm } from "./product-form";
import type { Product } from "@/types/product";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // null = add a new product.
  product: Product | null;
  onSaved?: (id: string) => void;
};

export function ProductDialog({ open, onOpenChange, product, onSaved }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const res = await saveProductAction(product?.id ?? null, fd);
      if (res.error) { toast.error(res.error); return; }
      toast.success(product ? "Product updated." : "Product saved.");
      onOpenChange(false);
      router.refresh();
      onSaved?.(res.id ?? product?.id ?? "");
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "Edit product" : "Add a product"}</DialogTitle>
          <DialogDescription>
            The AI uses these details when you pick &quot;Promote a product&quot; on the Generate page.
          </DialogDescription>
        </DialogHeader>
        <ProductForm product={product} formRef={formRef} onSubmit={onSubmit} />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" disabled={pending} />}>Cancel</DialogClose>
          <Button disabled={pending} onClick={() => formRef.current?.requestSubmit()}>
            {pending ? <Spinner aria-hidden /> : null}
            {product ? "Save changes" : "Save product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
