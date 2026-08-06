// Concentric guides radiating from below the hero, the way the reference frames
// its headline. Purely decorative and very low contrast — they read as paper
// guides rather than a gradient wash.
export function HeroArcs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[780px] overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 780"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <g fill="none" stroke="#7C97D8">
          <circle cx="600" cy="760" r="300" strokeOpacity="0.16" />
          <circle cx="600" cy="760" r="430" strokeOpacity="0.13" />
          <circle cx="600" cy="760" r="560" strokeOpacity="0.16" strokeDasharray="5 8" />
          <circle cx="600" cy="760" r="700" strokeOpacity="0.09" />
          <circle cx="600" cy="760" r="850" strokeOpacity="0.07" />
        </g>
        <path
          d="M -40 250 C 220 120, 420 70, 600 62 C 790 70, 1000 125, 1240 258"
          fill="none"
          stroke="#7C97D8"
          strokeOpacity="0.16"
        />
      </svg>
    </div>
  );
}
