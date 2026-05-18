"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteAccountAction } from "@/app/dashboard/settings/actions";
import { DeleteAccountConfirm } from "./delete-account-confirm";

type Props = { email: string; open: boolean; onOpenChange: (open: boolean) => void };

export function DeleteAccountDialog({ email, open, onOpenChange }: Props) {
  const [typed, setTyped] = useState("");
  const [ack, setAck] = useState(false);
  const [pending, start] = useTransition();
  const canDelete = typed.trim().toLowerCase() === email.toLowerCase() && ack;

  const handleDelete = () => start(async () => {
    const r = await deleteAccountAction();
    if (r?.error) toast.error(r.error);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify account deletion</DialogTitle>
          <DialogDescription>
            We&rsquo;ll permanently delete your account, wipe your profile and
            cancel your subscription. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DeleteAccountConfirm
          email={email}
          typed={typed}
          ack={ack}
          onTypedChange={setTyped}
          onAckChange={setAck}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={pending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!canDelete || pending}
            className="gap-1.5"
          >
            {pending && <Spinner size="xs" />}
            Delete account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
