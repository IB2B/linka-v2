"use client";

import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PLATFORMS } from "@/lib/zernio/platforms";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = {
  account: ZernioAccount | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function AccountDisconnectConfirm({ account, onOpenChange, onConfirm }: Props) {
  const label = account
    ? PLATFORMS.find((p) => p.slug === account.platform)!.label
    : "";

  return (
    <Dialog open={Boolean(account)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disconnect {label}?</DialogTitle>
          <DialogDescription>
            Scheduled posts to {label} will stop going out. Your published posts
            stay on {label}, and you can reconnect anytime.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Disconnect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
