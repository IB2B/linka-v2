"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/forms/form-field";

type Props = {
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  pending: boolean;
};

export function DeleteUserDialog({ email, open, onOpenChange, onConfirm, pending }: Props) {
  const [confirm, setConfirm] = useState("");
  const [ack, setAck] = useState(false);
  useEffect(() => { if (!open) { setConfirm(""); setAck(false); } }, [open]);
  const ready = confirm.trim().toLowerCase() === email.toLowerCase() && ack;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete this user?</DialogTitle>
        </DialogHeader>
        <FormField
          id="confirm-delete-email"
          label={<span>To confirm deletion, type <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{email}</code></span>}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder={email}
          autoComplete="off"
          disabled={pending}
        />
        <div className="flex items-start gap-2.5">
          <Checkbox id="ack-delete" checked={ack} onCheckedChange={(v) => setAck(v === true)} disabled={pending} className="mt-0.5" />
          <Label htmlFor="ack-delete" className="text-sm font-normal leading-snug text-muted-foreground">
            I acknowledge that all data related to this account will be deleted and I want to proceed.
          </Label>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" disabled={pending} />}>Cancel</DialogClose>
          <Button variant="destructive" onClick={onConfirm} disabled={pending || !ready}>
            {pending && <Spinner size="xs" />}
            Delete permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
