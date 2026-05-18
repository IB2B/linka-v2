"use client";

import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  amount: number;
  currency: string;
  onConfirm: () => void;
  pending: boolean;
};

function fmtMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function RefundDialog({
  open, onOpenChange, email, amount, currency, onConfirm, pending,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Refund {fmtMoney(amount, currency)}?</DialogTitle>
          <DialogDescription>
            Refunds the latest charge to <strong>{email}</strong> and cancels
            their subscription immediately. The action is logged. Cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" disabled={pending} />}>
            Cancel
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm} disabled={pending}>
            {pending && <Spinner size="xs" />}
            Refund + cancel sub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
