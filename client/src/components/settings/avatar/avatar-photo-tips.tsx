const TIPS = [
  "Just you, facing the camera, whole head in frame",
  "Even, bright light — no sunglasses or hats over the forehead",
  "The sharpest JPG or PNG you have (up to 15 MB)",
];

export function AvatarPhotoTips() {
  return (
    <ul className="space-y-1 text-xs text-muted-foreground">
      {TIPS.map((t) => (
        <li key={t} className="flex gap-2">
          <span aria-hidden className="text-primary">•</span>
          {t}
        </li>
      ))}
    </ul>
  );
}
