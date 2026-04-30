import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { url: string; postId: string };

export function PostDetailDownload({ url, postId }: Props) {
  return (
    <Button size="sm" variant="outline" render={
      <a href={url} download={`${postId}.png`} />
    } nativeButton={false}>
      <Download className="size-4" />
      Download image
    </Button>
  );
}
