// The panel's own wash: a cool tint along the top edge so the hero arcs and the
// floating tiles sit on something, fading out before the first section.
export function LandingBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-white">
      <div className="absolute inset-x-0 top-0 h-[820px] bg-[radial-gradient(70%_60%_at_50%_-10%,rgba(109,95,249,0.07)_0%,rgba(59,130,246,0.05)_40%,transparent_78%)]" />
    </div>
  );
}
