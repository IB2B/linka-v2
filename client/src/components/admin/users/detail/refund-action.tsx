"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { refundUserAction } from "@/app/admin/users/actions";
import { RefundDialog } from "./refund-dialog";
import type { RefundEligibility } from "@/types/admin-user.types";

type Props = {
  userId: string;
  email: string;
  eligibility: RefundEligibility;
};

export function RefundAction({ userId, email, eligibility }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const { lastCharge, draftCount } = eligibility;

  const reason =
    !lastCharge ? "No charge on file"
    : lastCharge.refunded ? "Already refunded"
    : draftCount > 0 ? `User has ${draftCount} draft${draftCount === 1 ? "" : "s"}`
    : null;

  function onConfirm() {
    if (!lastCharge) return;
    start(async () => {
      const r = await refundUserAction(userId, lastCharge.id);
      if (r.error) { toast.error(r.error); return; }
      toast.success("Refunded and subscription canceled.");
      setOpen(false);
    });
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={!!reason}
        title={reason ?? undefined}
        onClick={() => setOpen(true)}
      >
        <Undo2 /> Refund + cancel sub
      </Button>
      {lastCharge && (
        <RefundDialog
          open={open}
          onOpenChange={setOpen}
          email={email}
          amount={lastCharge.amount}
          currency={lastCharge.currency}
          onConfirm={onConfirm}
          pending={pending}
        />
      )}
    </>
  );
}
