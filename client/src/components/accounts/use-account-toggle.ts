"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { connectAction, disconnectInPlaceAction } from "@/app/dashboard/accounts/actions";
import type { Platform, ZernioAccount } from "@/lib/zernio/zernio-account.types";

// Toggling on sends the user to the provider's OAuth screen; toggling off asks
// for confirmation first, then refreshes in place.
export function useAccountToggle() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState<Platform | null>(null);
  const [confirming, setConfirming] = useState<ZernioAccount | null>(null);

  function toggle(account: ZernioAccount, next: boolean) {
    if (!next) {
      setConfirming(account);
      return;
    }
    setBusy(account.platform);
    startTransition(() => connectAction(account.platform));
  }

  function confirmDisconnect() {
    const account = confirming;
    if (!account) return;
    setConfirming(null);
    setBusy(account.platform);
    startTransition(async () => {
      await disconnectInPlaceAction(account.id);
      toast.success("Account disconnected.");
      setBusy(null);
      router.refresh();
    });
  }

  return { busy: pending ? busy : null, confirming, setConfirming, toggle, confirmDisconnect };
}
