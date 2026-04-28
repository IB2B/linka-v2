"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function AccountsToast() {
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("connected")) toast.success("Account connected successfully.");
    if (params.get("error")) toast.error("Failed to connect account. Please try again.");
  }, [params]);

  return null;
}
