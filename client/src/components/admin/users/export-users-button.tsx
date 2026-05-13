"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ExportUsersButton({ q, role, status }: {
  q?: string; role?: string; status?: string;
}) {
  const [pending, setPending] = useState(false);

  async function download() {
    setPending(true);
    try {
      const qs = new URLSearchParams();
      if (q) qs.set("q", q);
      if (role) qs.set("role", role);
      if (status) qs.set("status", status);
      const res = await fetch(`/api/admin/users/export${qs.size ? `?${qs}` : ""}`, {
        credentials: "include",
      });
      if (!res.ok) { toast.error("Export failed."); return; }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `linka-users-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Export failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={download} disabled={pending}>
      {pending ? <Spinner /> : <Download className="size-4" />}
      Export CSV
    </Button>
  );
}
