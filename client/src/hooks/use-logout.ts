"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { logoutRequest } from "@/lib/api/auth-client";

export function useLogout() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    if (pending) return;
    setPending(true);
    const { ok } = await logoutRequest();
    if (!ok) {
      toast.error("Couldn't sign out. Please try again.");
      setPending(false);
      return;
    }
    router.replace("/login");
    router.refresh();
  }

  return { logout, pending };
}
