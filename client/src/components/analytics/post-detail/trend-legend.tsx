"use client";

type Item = { key: string; label: string; color: string };

export function TrendLegend({
  items, hidden, onToggle,
}: {
  items: Item[];
  hidden: Set<string>;
  onToggle: (k: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => {
        const off = hidden.has(s.key);
        return (
          <button
            key={s.key} type="button" onClick={() => onToggle(s.key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${off ? "opacity-40" : ""}`}
          >
            <span
              className="size-2 rounded-full"
              style={{ background: s.color }}
            />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
