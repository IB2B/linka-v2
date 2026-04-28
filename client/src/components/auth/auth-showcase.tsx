export function AuthShowcase() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(255,255,255,0.08),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)]"
      />

      <div className="relative z-10 flex items-center gap-2 text-base font-semibold">
        <div className="size-6 rounded-md bg-zinc-50" />
        linka
      </div>

      <div className="relative z-10 mt-auto space-y-4">
        <blockquote className="text-xl font-medium leading-snug">
          &ldquo;The fastest way I&apos;ve ever shipped a side project. Linka
          feels effortless.&rdquo;
        </blockquote>
        <p className="text-sm text-zinc-400">— Sofia Davis, Founder at Acme</p>
      </div>
    </>
  );
}
