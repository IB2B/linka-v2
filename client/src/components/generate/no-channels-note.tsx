import Link from "next/link";

// Shown under the platform picker when nothing is connected: drafts still work,
// but publishing needs a connected channel.
export function NoChannelsNote() {
  return (
    <p className="text-xs text-muted-foreground">
      No channels connected yet, so you can only make drafts.{" "}
      <Link href="/dashboard/settings" className="font-medium text-foreground underline-offset-2 hover:underline">
        Connect a channel
      </Link>
    </p>
  );
}
