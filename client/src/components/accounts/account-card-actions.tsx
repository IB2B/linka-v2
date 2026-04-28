"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { connectAction, disconnectAction } from "@/app/dashboard/accounts/actions";
import type { Platform } from "@/lib/zernio/zernio-account.types";

type Props = {
  platform: Platform;
  connected: boolean;
  accountId: string;
};

export function AccountCardActions({ platform, connected, accountId }: Props) {
  const [pending, startTransition] = useTransition();

  if (connected) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => startTransition(() => disconnectAction(accountId))}
      >
        {pending ? <Spinner size="xs" /> : "Disconnect"}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      disabled={pending}
      onClick={() => startTransition(() => connectAction(platform))}
    >
      {pending ? <Spinner size="xs" /> : "Connect"}
    </Button>
  );
}
