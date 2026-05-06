const avatars = [
  "from-rose-300 to-orange-300",
  "from-violet-300 to-fuchsia-300",
  "from-emerald-300 to-cyan-300",
  "from-amber-300 to-pink-300",
];

export function HeroTrustRow() {
  return (
    <div className="flex items-center gap-3 pt-2">
      <div className="flex -space-x-2" aria-hidden="true">
        {avatars.map((g, i) => (
          <span
            key={i}
            className={`grid size-7 place-items-center rounded-full bg-gradient-to-br ring-2 ring-white ${g}`}
          />
        ))}
      </div>
      <div className="text-[13px] leading-tight text-zinc-700">
        <div className="font-medium text-zinc-900">2,400+ creators</div>
        <div className="text-zinc-500">posting on autopilot this week</div>
      </div>
    </div>
  );
}
