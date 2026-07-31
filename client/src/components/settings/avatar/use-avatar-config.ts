"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  fetchAvatarChoice, fetchAvatarGroups, fetchGroupLooks, fetchStockAvatars,
  fetchVoices, saveAvatarChoice,
} from "@/lib/api/avatar-client";
import { ALL_LANGUAGES } from "./voice-languages";
import type {
  AvatarGroup, AvatarOption, VoiceOption,
} from "@/types/avatar-settings";

export function useAvatarConfig() {
  const [groups, setGroups] = useState<AvatarGroup[]>([]);
  const [looks, setLooks] = useState<AvatarOption[]>([]);
  const [stock, setStock] = useState<AvatarOption[]>([]);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [voiceLanguage, setLanguage] = useState(ALL_LANGUAGES);
  const [avatarId, setAvatarId] = useState<string | null>(null);
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const [choice, g, v] = await Promise.all([
        fetchAvatarChoice(), fetchAvatarGroups(), fetchVoices(),
      ]);
      if (choice.data?.avatar) {
        setAvatarId(choice.data.avatar.avatarId);
        setVoiceId(choice.data.avatar.voiceId);
      }
      setGroups(g.data?.groups ?? []);
      setVoices(v.data?.voices ?? []);
      // Server picked this from the profile — adopt it so the dropdown matches.
      setLanguage(v.data?.language ?? ALL_LANGUAGES);
      setLoading(false);
    })();
  }, []);

  const changeVoiceLanguage = useCallback(async (code: string) => {
    setLanguage(code);
    const r = await fetchVoices(code);
    if (r.error) { toast.error(r.error); return; }
    setVoices(r.data?.voices ?? []);
  }, []);

  const openGroup = useCallback(async (groupId: string) => {
    setLooks([]);
    const r = await fetchGroupLooks(groupId);
    if (r.error) { toast.error(r.error); return; }
    setLooks(r.data?.looks ?? []);
  }, []);

  const searchStock = useCallback(async (q: string) => {
    const r = await fetchStockAvatars(q);
    if (r.error) { toast.error(r.error); return; }
    setStock(r.data?.avatars ?? []);
  }, []);

  async function save() {
    if (!avatarId || !voiceId) {
      toast.error("Pick both an avatar and a voice."); return;
    }
    setSaving(true);
    const r = await saveAvatarChoice({ avatarId, voiceId });
    setSaving(false);
    if (r.error) toast.error(r.error);
    else toast.success("Avatar saved.");
  }

  return {
    groups, looks, stock, voices, voiceLanguage, avatarId, voiceId,
    loading, saving,
    setAvatarId, setVoiceId, openGroup, searchStock, changeVoiceLanguage, save,
  };
}
