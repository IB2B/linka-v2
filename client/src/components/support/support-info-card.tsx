import { Mail } from "lucide-react";

import { RESPONSE_TIMES, SUPPORT_EMAIL } from "./response-times";

export function SupportInfoCard() {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="text-sm font-semibold">Response times</h3>
      <ul className="mt-3 space-y-1.5 text-sm">
        {Object.entries(RESPONSE_TIMES).map(([priority, eta]) => (
          <li key={priority} className="flex items-center gap-2 text-muted-foreground">
            <span className="capitalize text-foreground">{priority}</span>
            <span className="ml-auto">{eta}</span>
          </li>
        ))}
      </ul>
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="mt-4 flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent"
      >
        <Mail aria-hidden className="size-4 text-muted-foreground" />
        <span className="font-medium">{SUPPORT_EMAIL}</span>
        <span className="ml-auto text-xs text-muted-foreground">Email us</span>
      </a>
    </div>
  );
}
