// "auto" defers to the per-platform aspect the server picks (4:5 on feed
// surfaces, 9:16 on short-video ones) — usually the better performer.
export type AvatarAspect = "auto" | "16:9" | "9:16" | "4:5" | "1:1";

// Spoken length target. The script is written to hit it; HeyGen then renders for
// however long the presenter takes to say it, so the result lands near the
// target rather than exactly on it.
export type AvatarSeconds = 30 | 60 | 120;
