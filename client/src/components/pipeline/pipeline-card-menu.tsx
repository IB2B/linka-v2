"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { MoreHorizontal, ExternalLink, Copy, Trash2 } from "lucide-react";

import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { deleteOpportunityAction } from "@/app/dashboard/pipeline/actions";
import type { Opportunity } from "@/types/pipeline";

type Props = { opp: Opportunity; onOpen: () => void; onDeleted: () => void };

function firstUrl(o: Opportunity) {
  return o.socialUrl || o.facebookUrl || o.instagramUrl || o.xUrl || o.tiktokUrl || o.threadsUrl || null;
}

export function PipelineCardMenu({ opp, onOpen, onDeleted }: Props) {
  const [, start] = useTransition();

  function handleDelete() {
    start(async () => {
      const res = await deleteOpportunityAction(opp.id);
      if ("error" in res) { toast.error(res.error); return; }
      toast.success("Deleted.");
      onDeleted();
    });
  }

  const profileUrl = firstUrl(opp);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => e.stopPropagation()}
        className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Card options"
      >
        <MoreHorizontal className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onOpen(); }}>
            View details
          </DropdownMenuItem>
          {profileUrl ? (
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); window.open(profileUrl, "_blank", "noopener,noreferrer"); }}>
              <ExternalLink /> Open profile
            </DropdownMenuItem>
          ) : null}
          {opp.contactName ? (
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(opp.contactName!); toast.success("Copied!"); }}>
              <Copy /> Copy name
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
