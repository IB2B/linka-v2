"use client";

import Link from "next/link";
import { FileText, ShieldCheck } from "lucide-react";

import {
  DropdownMenuGroup, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function SidebarUserMenuLegal() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem render={<Link href="/terms" />}>
        <FileText />
        Terms of Service
      </DropdownMenuItem>
      <DropdownMenuItem render={<Link href="/privacy" />}>
        <ShieldCheck />
        Privacy Policy
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
