"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { LinkedinConnectDialog } from "./linkedin-connect-dialog";

// Entry point shown in the conversation list header until LinkedIn is connected.
// Once connected, LinkedIn threads appear in the list and the filter, so the
// button hides itself.
export function LinkedinConnectButton({ connected }: { connected: boolean }) {
  const [open, setOpen] = useState(false);
  if (connected) return null;
  return (
    <>
      <Button
        size="sm" variant="outline"
        className="h-7 gap-1.5 px-2 text-xs"
        onClick={() => setOpen(true)}
      >
        <PlatformIcon platform="linkedin" className="size-3.5" style={{ color: "#0A66C2" }} />
        Connect LinkedIn
      </Button>
      <LinkedinConnectDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
