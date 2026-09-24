import Link from "next/link";

import { SettingsSection } from "./settings-section";
import { ActionRow } from "./action-row";
import { DownloadDataButton } from "./download-data-button";

export function PrivacySection() {
  return (
    <SettingsSection
      title="Your Data"
      description="See and take a copy of everything linka stores about you."
    >
      <div className="overflow-hidden rounded-xl border">
        <ActionRow
          title="Download your data"
          description="Your account, profile, posts, AI instructions, pipelines and support tickets in one JSON file."
          action={<DownloadDataButton />}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Read how we handle your data in our{" "}
        <Link href="/privacy" className="font-medium text-foreground underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        . To erase everything, use Delete account in the Danger Zone.
      </p>
    </SettingsSection>
  );
}
