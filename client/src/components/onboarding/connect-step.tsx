"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { skipStepAction } from "@/app/onboarding/actions";
import {
  LinkedInIcon, XIcon, InstagramIcon,
  YouTubeIcon, FacebookIcon, ThreadsIcon, PinterestIcon,
} from "./platform-icons";

const PLATFORMS = [
  { name: "LinkedIn",       Icon: LinkedInIcon,  color: "#0A66C2", free: true },
  { name: "X / Twitter",    Icon: XIcon,         color: "#000000", free: false },
  { name: "Instagram",      Icon: InstagramIcon, color: "#E1306C", free: false },
  { name: "YouTube Shorts", Icon: YouTubeIcon,   color: "#FF0000", free: false },
  { name: "Facebook",       Icon: FacebookIcon,  color: "#1877F2", free: false },
  { name: "Threads",        Icon: ThreadsIcon,   color: "#000000", free: false },
  { name: "Pinterest",      Icon: PinterestIcon, color: "#E60023", free: false },
];

export function ConnectStep({ isFree }: { isFree: boolean }) {
  const router = useRouter();

  async function advance() {
    await skipStepAction(3);
    router.push("/onboarding/style");
  }

  return (
    <div className="flex flex-1 flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        Linka publishes directly to your accounts. Connect them from{" "}
        <strong className="text-foreground">Settings → Connected Accounts</strong> after setup.
      </p>
      <ul className="grid grid-cols-2 gap-2">
        {PLATFORMS.map(({ name, Icon, color, free }) => (
          <li key={name} className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm">
            <Icon className="size-3.5 shrink-0" style={{ color }} />
            <span className="flex-1 font-medium">{name}</span>
            {isFree && free && <Badge variant="secondary" className="text-xs">Free</Badge>}
          </li>
        ))}
      </ul>
      {isFree && (
        <p className="rounded-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
          <strong className="text-foreground">Free plan:</strong> 1 connected account.
          Upgrade to Creator for unlimited platforms.
        </p>
      )}
      <div className="flex justify-end pt-2">
        <Button size="sm" onClick={advance}>Continue</Button>
      </div>
    </div>
  );
}
