import Link from "next/link";
import { Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ConnectAccountsNotice() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-dashed bg-card/60 px-4 py-3 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Link2 className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium">Connect a social account to post</p>
          <p className="text-sm text-muted-foreground">
            Post now and Schedule stay off until at least one account is connected.
          </p>
        </div>
      </div>
      <Button render={<Link href="/dashboard/accounts" />} nativeButton={false}
        size="sm" className="sm:shrink-0">
        Connect an account
      </Button>
    </div>
  );
}
