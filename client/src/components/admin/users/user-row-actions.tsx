"use client";

import { useTransition } from "react";
import { Copy, Eye, KeyRound, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { RoleSubMenu } from "./role-sub-menu";
import { deleteUserAction, setUserRoleAction, setUserStatusAction } from "@/app/admin/users/actions";
import type { AdminUserRow } from "@/types/admin";
import type { UserRole } from "@/types/user-role";

type Props = { user: AdminUserRow; onView: () => void };

export function UserRowActions({ user, onView }: Props) {
  const [pending, start] = useTransition();
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
  const onDelete = () => {
    if (!confirm(`Delete ${user.email}? This cannot be undone.`)) return;
    start(async () => {
      const r = await deleteUserAction(user.id);
      r.error ? toast.error(r.error) : toast.success("User deleted.");
    });
  };
  const copy = (text: string, label: string) =>
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} copied.`));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Actions" />}>
        {pending ? <Spinner /> : <MoreHorizontal />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onView}><Eye />View details</DropdownMenuItem>
          <DropdownMenuItem onClick={() => copy(user.email, "Email")}><Copy />Copy email</DropdownMenuItem>
          <DropdownMenuItem onClick={() => copy(user.id, "User ID")}><Copy />Copy user ID</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <RoleSubMenu onSetRole={setRole} />
        <DropdownMenuItem onClick={() => toast.message("Password reset link sent.")}><KeyRound />Send password reset</DropdownMenuItem>
        <DropdownMenuItem onClick={toggleStatus}>{suspended ? <Play /> : <Pause />}{suspended ? "Reactivate" : "Suspend"}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onDelete}><Trash2 />Delete user</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
