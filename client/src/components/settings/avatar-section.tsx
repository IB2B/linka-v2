"use client";

import { useCallback, useEffect } from "react";

import { SettingsSection } from "./settings-section";
import { Spinner } from "@/components/ui/spinner";
import { AvatarSourceTabs } from "./avatar/avatar-source-tabs";
import { VoicePicker } from "./avatar/voice-picker";
import { useAvatarConfig } from "./avatar/use-avatar-config";
import { useAvatarSave } from "./avatar/use-avatar-save";
import { AvatarUploadCard } from "./avatar/avatar-upload-card";

export function AvatarSection() {
  const c = useAvatarConfig();
  const { saving } = useAvatarSave(c.avatarId, c.voiceId, c.loading);
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
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            {saving ? <Spinner aria-hidden /> : null}
            {saving ? "Saving…"
              : !c.avatarId ? "Pick an avatar — videos use it once a voice is set too."
              : !c.voiceId ? "Now pick a voice to finish setting up your avatar."
              : "Saved. New videos use this avatar and voice."}
          </p>
        </div>
      )}
    </SettingsSection>
  );
}
