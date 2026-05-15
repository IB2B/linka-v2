"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { RoleSubMenu } from "@/components/admin/users/role-sub-menu";
import { DeleteUserDialog } from "./delete-user-dialog";
import { setUserRoleAction, setUserStatusAction, deleteUserAction } from "@/app/admin/users/actions";
import type { AdminUserRow } from "@/types/admin";
import type { UserRole } from "@/types/user-role";

export function UserDetailActions({ user }: { user: AdminUserRow }) {
  const [pending, start] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();
  const suspended = user.status === "SUSPENDED";

  const setRole = (role: UserRole) => start(async () => {
    if (role === user.role) return;
    const r = await setUserRoleAction(user.id, role);
    r.error ? toast.error(r.error) : toast.success(`Role set to ${role.toLowerCase()}.`);
  });

  const toggleStatus = () => start(async () => {
    const r = await setUserStatusAction(user.id, suspended ? "ACTIVE" : "SUSPENDED");
    r.error ? toast.error(r.error) : toast.success(suspended ? "Reactivated." : "Suspended.");
  });

  const confirmDelete = () => start(async () => {
    const r = await deleteUserAction(user.id);
    if (r.error) { toast.error(r.error); return; }
    toast.success("User deleted.");
    router.push("/admin/users");
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" aria-label="Actions" />}>
          {pending ? <Spinner /> : <><MoreHorizontal className="mr-1.5 size-4" />Actions</>}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => toast.message("Password reset link sent.")}>
              <KeyRound />Send password reset
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleStatus}>
              {suspended ? <Play /> : <Pause />}{suspended ? "Reactivate" : "Suspend"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <RoleSubMenu onSetRole={setRole} />
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 />Delete user
          </DropdownMenuItem>
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
