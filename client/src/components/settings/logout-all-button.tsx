"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { logoutAllDevicesAction } from "@/app/dashboard/settings/actions";

export function LogoutAllButton() {
  const [pending, startTransition] = useTransition();

  function handle() {
    startTransition(async () => {
      const result = await logoutAllDevicesAction();
      if (result?.error) toast.error(result.error);
    });
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handle}
      disabled={pending}
      className="gap-1.5"
    >
      {pending && <Spinner size="xs" />}
      Log out all devices
    </Button>
  );
}
