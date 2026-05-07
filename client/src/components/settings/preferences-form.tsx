"use client";

import { useEffect, useState } from "react";

import { TIMEZONES, loadTimezone, saveTimezone } from "@/lib/preferences/timezone";

const SELECT_CLS =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

export function PreferencesForm() {
  const [tz, setTz] = useState<string>("UTC");

  useEffect(() => { setTz(loadTimezone()); }, []);

  function onTzChange(value: string) {
    setTz(value);
    saveTimezone(value);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="language">
            Language
          </label>
          <select id="language" className={SELECT_CLS}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="ar">Arabic</option>
            <option value="de">German</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="timezone">
            Timezone
          </label>
          <select
            id="timezone" className={SELECT_CLS}
            value={tz} onChange={(e) => onTzChange(e.target.value)}
          >
            {TIMEZONES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
