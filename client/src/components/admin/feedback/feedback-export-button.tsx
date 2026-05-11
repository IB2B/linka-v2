"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { FeedbackRow } from "@/types/admin-feedback";

function escape(v: unknown): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows: FeedbackRow[]): string {
  const header = ["id", "category", "status", "user_email", "message", "page_url", "created_at"];
  const lines = rows.map((r) => [
    r.id, r.category, r.status, r.user?.email ?? "",
    r.message, r.pageUrl ?? "", r.createdAt,
  ].map(escape).join(","));
  return [header.join(","), ...lines].join("\n");
}

export function FeedbackExportButton({ rows }: { rows: FeedbackRow[] }) {
  function download() {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `feedback-${date}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  return (
    <Button variant="outline" size="sm" onClick={download} disabled={rows.length === 0}>
      <Download className="size-3.5" />
      Export CSV
    </Button>
  );
}
