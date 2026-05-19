"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  deleteUserAction, sendPasswordResetAction,
  setUserRoleAction, setUserStatusAction,
} from "@/app/admin/users/actions";
import type { AdminUserRow } from "@/types/admin";
import type { UserRole } from "@/types/user-role";

export function useUserRowActions(user: AdminUserRow) {
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

  const confirmDelete = () => start(async () => {
    const r = await deleteUserAction(user.id);
    r.error ? toast.error(r.error) : toast.success("User deleted.");
  });

  const sendReset = () => start(async () => {
    const r = await sendPasswordResetAction(user.id);
    r.error ? toast.error(r.error) : toast.success(`Reset email sent to ${user.email}.`);
  });

  const copy = (text: string, label: string) =>
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} copied.`));

  return { pending, suspended, setRole, toggleStatus, confirmDelete, sendReset, copy };
}
