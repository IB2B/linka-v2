"use client";

import { FileText, Image as ImageIcon, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRegen } from "./regen-context";

export function PostDetailRegenerate() {
  const { textPending, imagePending, runText, runImage } = useRegen();
  const pending = textPending || imagePending;

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
        <DropdownMenuItem onClick={runImage} className="whitespace-nowrap">
          <ImageIcon className="size-4" />
          Regenerate image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
