"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { deleteProductAction } from "@/app/dashboard/settings/product-actions";

type Props = { id: string; name: string; open: boolean; onOpenChange: (open: boolean) => void };

export function DeleteProductDialog({ id, name, open, onOpenChange }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function onDelete() {
    start(async () => {
      const res = await deleteProductAction(id);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Product deleted.");
      onOpenChange(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {name}?</DialogTitle>
          <DialogDescription>
            Posts you already made stay as they are. You won&apos;t be able to pick this product again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" disabled={pending} />}>Cancel</DialogClose>
          <Button variant="destructive" disabled={pending} onClick={onDelete}>
            {pending ? <Spinner aria-hidden /> : null}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
