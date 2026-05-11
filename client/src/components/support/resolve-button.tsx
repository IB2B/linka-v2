"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { resolveMyTicketAction } from "@/app/dashboard/support/actions";

export function ResolveButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  function resolve() {
    start(async () => {
      const r = await resolveMyTicketAction(id);
      if ("error" in r) toast.error(r.error);
      else toast.success("Marked as resolved — thanks!");
    });
  }
  return (
    <Button size="sm" variant="outline" onClick={resolve} disabled={pending}>
      {pending ? <Spinner aria-hidden /> : <CheckCircle2 className="size-3.5" />}
      Mark resolved
    </Button>
  );
}
