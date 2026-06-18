import { Share2, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OppField } from "./opp-field";

const SOCIALS = [
  { name: "instagramUrl", label: "Instagram", placeholder: "https://instagram.com/…" },
  { name: "facebookUrl", label: "Facebook", placeholder: "https://facebook.com/…" },
  { name: "xUrl", label: "X", placeholder: "https://x.com/…" },
  { name: "tiktokUrl", label: "TikTok", placeholder: "https://tiktok.com/@…" },
  { name: "threadsUrl", label: "Threads", placeholder: "https://threads.net/@…" },
  { name: "socialUrl", label: "Other / website", placeholder: "https://…" },
] as const;

// Optional social profile links, collapsed by default to keep the form compact.
export function OppSocialFields() {
  return (
    <details className="group rounded-lg border bg-muted/30 px-3 py-2.5">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
        <Share2 className="size-3.5" aria-hidden />
        Social links
        <ChevronDown className="ml-auto size-3.5 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {SOCIALS.map((s) => (
          <OppField key={s.name} label={s.label} htmlFor={s.name}>
            <Input id={s.name} name={s.name} type="url" inputMode="url"
              maxLength={2048} placeholder={s.placeholder} />
          </OppField>
        ))}
      </div>
    </details>
  );
}
