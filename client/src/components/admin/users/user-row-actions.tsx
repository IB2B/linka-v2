"use client";

import { useState } from "react";
import { Copy, Eye, KeyRound, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { RoleSubMenu } from "./role-sub-menu";
import { DeleteUserDialog } from "./detail/delete-user-dialog";
import { useUserRowActions } from "./use-user-row-actions";
import type { AdminUserRow } from "@/types/admin";

export function UserRowActions({ user }: { user: AdminUserRow }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const {
    pending, suspended, setRole, toggleStatus,
    confirmDelete, sendReset, copy,
  } = useUserRowActions(user);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Actions" />}>
          {pending ? <Spinner /> : <MoreHorizontal />}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem render={<Link href={`/admin/users/${user.id}`} />}><Eye />View details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => copy(user.email, "Email")}><Copy />Copy email</DropdownMenuItem>
            <DropdownMenuItem onClick={() => copy(user.id, "User ID")}><Copy />Copy user ID</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <RoleSubMenu onSetRole={setRole} />
          <DropdownMenuItem onClick={sendReset}><KeyRound />Send password reset</DropdownMenuItem>
          <DropdownMenuItem onClick={toggleStatus}>{suspended ? <Play /> : <Pause />}{suspended ? "Reactivate" : "Suspend"}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)}><Trash2 />Delete user</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteUserDialog
        email={user.email}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={confirmDelete}
        pending={pending}
      />
    </>
  );
}
