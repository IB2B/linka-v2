"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { SettingToggle } from "./setting-toggle";
import { savePlatformSettingsAction } from "@/app/admin/settings/platform-action";
import type { PlatformSettings } from "@/types/admin-settings.types";

export function PlatformForm({ initial }: { initial: PlatformSettings }) {
  const [s, setS] = useState(initial);
  const [pending, start] = useTransition();

  function save() {
    start(async () => {
      const r = await savePlatformSettingsAction(s);
      if (r.error) toast.error(r.error);
      else toast.success("Platform settings saved.");
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <SettingToggle
        label="New sign-ups" description="Allow new clients to create accounts."
        checked={s.signupsEnabled} onChange={(v) => setS({ ...s, signupsEnabled: v })} disabled={pending}
      />
      <SettingToggle
        label="Maintenance mode" description="Show a maintenance banner across every client dashboard."
        checked={s.maintenanceMode} onChange={(v) => setS({ ...s, maintenanceMode: v })} disabled={pending}
      />
      {s.maintenanceMode && (
        <Textarea
          placeholder="Maintenance message shown to clients…" maxLength={280}
          value={s.maintenanceMessage ?? ""} disabled={pending}
          onChange={(e) => setS({ ...s, maintenanceMessage: e.target.value })}
        />
      )}
      <SettingToggle
        label="Announcement banner" description="Show a message at the top of every client dashboard."
        checked={s.announcementEnabled} onChange={(v) => setS({ ...s, announcementEnabled: v })} disabled={pending}
      />
      {s.announcementEnabled && (
        <Textarea
          placeholder="Announcement message…" maxLength={280}
          value={s.announcementMessage ?? ""} disabled={pending}
          onChange={(e) => setS({ ...s, announcementMessage: e.target.value })}
        />
      )}
      <div className="flex justify-end">
        <Button size="sm" onClick={save} disabled={pending}>
          {pending && <Spinner aria-hidden />}Save changes
        </Button>
      </div>
    </div>
  );
}
