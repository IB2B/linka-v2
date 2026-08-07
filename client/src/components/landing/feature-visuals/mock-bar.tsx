/** A skeleton text line. `w` is a Tailwind width class. */
export function MockBar({ w, tone }: { w: string; tone?: "brand" }) {
  return (
    <span
      className={`block h-1.5 rounded-full ${w} ${tone === "brand" ? "bg-[#6D5FF9]/25" : "bg-[#E5E5E5]"}`}
    />
  );
}
