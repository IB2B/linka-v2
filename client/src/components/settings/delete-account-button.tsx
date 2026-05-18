"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteAccountDialog } from "./delete-account-dialog";

export function DeleteAccountButton({ email }: { email: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => setOpen(true)}
        className="gap-1.5"
      >
        <Trash2 className="size-3.5" />
        Delete account
      </Button>
      <DeleteAccountDialog email={email} open={open} onOpenChange={setOpen} />
    </>
  );
}
