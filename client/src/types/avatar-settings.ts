// A look is the renderable unit — a specific person in a specific setting and
// outfit. Groups exist only for browsing; their ids cannot be rendered.
export type AvatarOption = {
  id: string;
  name: string;
  previewImage: string | null;
  previewVideo?: string | null;
  ready?: boolean;
};

export type AvatarGroup = {
  id: string;
  name: string;
  looks: number;
  previewImage: string | null;
  trained: boolean;
};

export type VoiceOption = {
  id: string;
  name: string;
  language: string | null;
  gender: string | null;
  previewAudio: string | null;
};

export type AvatarChoice = { avatarId: string; voiceId: string };
