import { FileText } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ContentRow } from "@/components/admin/content/content-row";
import type { AdminContentRow } from "@/types/admin-content";

export function ContentTable({ rows }: { rows: AdminContentRow[] }) {
  if (rows.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
        <FileText className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">No content matches this filter</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Clear the filter or try a different search term.
        </p>
      </Card>
    );
  }
  return (
    <Card size="sm" className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/40">
            <tr className="text-xs font-medium tracking-tight text-muted-foreground">
              <th className="px-4 py-3">Post</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Platforms</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => <ContentRow key={r.id} row={r} />)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
