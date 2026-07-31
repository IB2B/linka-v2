"use client";

import { FileText, Image as ImageIcon, RotateCw, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRegen } from "./regen-context";

// hasVideo gates the video entry: re-rendering only makes sense for a post that
// asked for one, and the server rejects the rest with "This post has no video."
export function PostDetailRegenerate({ hasVideo }: { hasVideo?: boolean }) {
  const { textPending, imagePending, videoPending, runText, runImage, runVideo } =
    useRegen();
  const pending = textPending || imagePending || videoPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="sm" variant="outline" disabled={pending}>
            {pending ? <Spinner aria-hidden /> : <RotateCw className="size-4" />}
            Regenerate
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem onClick={runText} className="whitespace-nowrap">
          <FileText className="size-4" />
          Regenerate text
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => runImage()} className="whitespace-nowrap">
          <ImageIcon className="size-4" />
          Regenerate image
        </DropdownMenuItem>
        {hasVideo ? (
          <DropdownMenuItem onClick={runVideo} className="whitespace-nowrap">
            <Video className="size-4" />
            Re-render video
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
