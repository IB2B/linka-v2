// The panel's gradient: a blue-lavender wash across the top that has resolved to
// white by the time the app window clears it, so the window reads as sitting on
// paper rather than floating in colour.
export function LandingBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-white">
      <div className="absolute inset-x-0 top-0 h-250 bg-[linear-gradient(180deg,#D6E2FF_0%,#DFE8FF_22%,#EAEEFF_44%,#F4F6FF_66%,#FBFCFF_84%,#FFFFFF_100%)]" />
      <div className="absolute inset-x-0 top-0 h-180 bg-[radial-gradient(58%_46%_at_50%_-6%,rgba(109,95,249,0.16)_0%,rgba(59,130,246,0.10)_38%,transparent_72%)]" />
      <div className="absolute inset-x-0 top-0 h-130 bg-[radial-gradient(40%_34%_at_50%_8%,rgba(255,255,255,0.72)_0%,transparent_70%)]" />
    </div>
  );
}
