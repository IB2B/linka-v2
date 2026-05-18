export function LandingBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#FAFAFA]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,17,19,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,17,19,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_42%_at_50%_14%,#000_0%,transparent_85%)]" />
      <div className="absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(109,95,249,0.10)_0%,rgba(109,95,249,0.04)_38%,transparent_75%)]" />
      <div className="absolute inset-x-0 top-[420px] h-px bg-gradient-to-r from-transparent via-[#0F1113]/8 to-transparent" />
    </div>
  );
}
