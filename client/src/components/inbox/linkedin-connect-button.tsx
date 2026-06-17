"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { connectLinkedinAction, syncLinkedinAction } from "@/app/dashboard/inbox/linkedin-actions";

// Redirects to Unipile's hosted LinkedIn login (no credentials in this app).
// On return (?linkedin=connected) we sync the account, since the notify webhook
// can't reach localhost.
export function LinkedinConnectButton({ connected }: { connected: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (connected) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("linkedin") !== "connected") return;
    (async () => {
      const r = await syncLinkedinAction();
      window.history.replaceState({}, "", "/dashboard/inbox");
      if (r.connected) { toast.success("LinkedIn connected"); router.refresh(); }
      else toast.error("Couldn't finish LinkedIn connect — try again.");
    })();
  }, [connected, router]);

  if (connected) return null;

  async function start() {
    setPending(true);
    const r = await connectLinkedinAction();
    if ("error" in r) { setPending(false); toast.error(r.error); return; }
    window.location.href = r.url;
  }

  return (
    <Button
      size="sm" variant="outline" disabled={pending}
      className="h-7 gap-1.5 px-2 text-xs" onClick={start}
    >
      {pending
        ? <Spinner size="xs" />
        : <PlatformIcon platform="linkedin" className="size-3.5" style={{ color: "#0A66C2" }} />}
      Connect LinkedIn
    </Button>
  );
}
