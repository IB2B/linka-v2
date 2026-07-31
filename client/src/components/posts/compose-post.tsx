"use client";

import { useState, type ReactNode } from "react";

import { PostPlatformsProvider } from "./platforms-context";
import { ComposeDialog } from "./compose-dialog";
import { ScheduleDialog } from "./schedule-dialog";

type Props = { children: (open: () => void) => ReactNode };

// Hosts the composer + schedule dialogs under one platforms provider so the
// selected platforms survive the compose→schedule hand-off. Mounted lazily on
// first open, so the connected-accounts fetch never runs until needed.
export function ComposePost({ children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [scheduleId, setScheduleId] = useState<string | null>(null);

  function open() { setMounted(true); setComposeOpen(true); }

  return (
    <>
      {children(open)}
      {mounted ? (
        <PostPlatformsProvider postPlatform={null}>
          <ComposeDialog
            open={composeOpen}
            onOpenChange={setComposeOpen}
            onPosted={() => setComposeOpen(false)}
            onScheduleDraft={(id) => { setComposeOpen(false); setScheduleId(id); }}
          />
          {scheduleId ? (
            <ScheduleDialog postId={scheduleId} open
              onOpenChange={(o) => { if (!o) setScheduleId(null); }} />
          ) : null}
        </PostPlatformsProvider>
      ) : null}
    </>
  );
}
