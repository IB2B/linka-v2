import { localeFor } from "./heygen-locale";

// Everything past avatar + voice + script that decides how a render looks.
// Split out of heygen-video so the request body stays readable.

// A photo avatar given no direction stands still and talks, which is the exact
// look people call out as AI. Avatar IV takes a plain sentence describing body
// motion, so ask for the small unforced movement a real person has on camera —
// and rule out the tells (swaying, looping gestures, presenter arms).
const MOTION =
  "Speaks straight to camera with relaxed, natural body language: small head "
  + "movements, an occasional open hand gesture on emphasis, unforced "
  + "expression. No exaggerated gesturing, no swaying, no repeated identical "
  + "motions, no stiff presenter posture.";

export type RenderStyle = {
  language?: string | null;
  // motion_prompt and expressiveness are Avatar IV only — avatar_v rejects them.
  engine: string;
};

export function renderExtras(style: RenderStyle): Record<string, unknown> {
  const locale = localeFor(style.language);
  return {
    ...(style.engine === "avatar_iv" && {
      motion_prompt: MOTION,
      // "high" reads manic on a talking head; "low" is the stiffness we came
      // here to fix.
      expressiveness: "medium",
    }),
    // Crop to the requested frame instead of padding it. Without this a 16:9
    // look asked for at 4:5 comes back with white strips baked into the MP4.
    fit: "cover",
    voice_settings: {
      // A shade under real time — TTS reads a script faster than a person
      // speaking one, and the gap is audible.
      speed: 0.95,
      ...(locale && { locale }),
    },
    // Sidecar SRT plus a burned-in track: social feeds autoplay muted, so a
    // video with no visible words is a video nobody hears.
    caption: { file_format: "srt", style: "default" },
  };
}
