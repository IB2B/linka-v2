export function LandingBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#fde7d3_0%,#f8d4e6_35%,#e9d8ff_65%,#fafafa_100%)]" />
      <div className="absolute -top-24 -left-24 size-[520px] rounded-full bg-[radial-gradient(closest-side,#ffb39a_0%,transparent_70%)] opacity-60 blur-2xl" />
      <div className="absolute top-40 -right-24 size-[560px] rounded-full bg-[radial-gradient(closest-side,#c8b2ff_0%,transparent_70%)] opacity-55 blur-2xl" />
      <div className="absolute bottom-[-200px] left-1/3 size-[620px] rounded-full bg-[radial-gradient(closest-side,#ffd1e8_0%,transparent_70%)] opacity-60 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,#fafafa_100%)]" />
    </div>
  );
}
