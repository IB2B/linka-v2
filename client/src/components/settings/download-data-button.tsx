import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

// A plain link: the browser sends the session cookie and saves the file the
// API returns as an attachment, so no client JS is needed.
export function DownloadDataButton() {
  return (
    <Button
      size="sm"
      variant="outline"
      nativeButton={false}
      render={<a href="/api/users/me/export" download />}
      className="gap-1.5"
    >
      <Download className="size-3.5" />
      Download data
    </Button>
  );
}
