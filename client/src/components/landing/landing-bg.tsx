export function LandingBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#FAFAFA]"
    >
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(109,95,249,0.10)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,17,19,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,17,19,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000_0%,transparent_80%)]" />
    </div>
  );
}
