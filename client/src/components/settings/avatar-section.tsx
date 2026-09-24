"use client";

import { useCallback, useEffect } from "react";

import { SettingsSection } from "./settings-section";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AvatarSourceTabs } from "./avatar/avatar-source-tabs";
import { VoicePicker } from "./avatar/voice-picker";
import { useAvatarConfig } from "./avatar/use-avatar-config";
import { useAvatarSave } from "./avatar/use-avatar-save";
import { AvatarUploadCard } from "./avatar/avatar-upload-card";

export function AvatarSection() {
  const c = useAvatarConfig();
  const { saving, save } = useAvatarSave(c.avatarId, c.voiceId);
  const { reloadGroups, setAvatarId } = c;
  // A new photo avatar finished training: show it and pick it straight away.
  const onAvatarReady = useCallback(async (lookId: string) => {
    await reloadGroups();
    setAvatarId(lookId);
  }, [reloadGroups, setAvatarId]);

  // Stock is the only source for a user with no avatars of their own, so it is
  // loaded up front rather than waiting for them to type a search.
  useEffect(() => {
    if (!c.loading && c.groups.length === 0) c.searchStock("");
  }, [c.loading, c.groups.length, c.searchStock]);

  return (
    <SettingsSection
      title="AI Avatar"
      description="Choose the presenter and voice used for your avatar videos."
    >
      {c.loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner aria-hidden /> Loading avatars…
        </div>
      ) : (
        <div className="space-y-6">
          <AvatarUploadCard onReady={onAvatarReady} />
          <AvatarSourceTabs
            groups={c.groups} looks={c.looks} stock={c.stock}
            selectedId={c.avatarId}
            onSelect={(o) => c.setAvatarId(o.id)}
            onOpenGroup={c.openGroup}
            onSearch={c.searchStock}
          />
          <VoicePicker voices={c.voices} value={c.voiceId}
            onChange={c.setVoiceId}
            language={c.voiceLanguage}
            onLanguageChange={c.changeVoiceLanguage} />
          <div className="flex items-center gap-3">
            <Button onClick={save} disabled={saving}>
              {saving ? <Spinner aria-hidden /> : null}
              Save avatar
            </Button>
            {!c.avatarId || !c.voiceId ? (
              <span className="text-xs text-muted-foreground">
                Avatar videos stay disabled until both are set.
              </span>
            ) : null}
          </div>
        </div>
      )}
    </SettingsSection>
  );
}
