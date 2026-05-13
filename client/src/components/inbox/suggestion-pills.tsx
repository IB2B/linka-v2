type Reply = { label: string; text: string };
type Props = { replies: Reply[]; onSelect: (text: string) => void };

export function SuggestionPills({ replies, onSelect }: Props) {
  if (replies.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {replies.map((r) => (
        <button
          key={r.label}
          type="button"
          onClick={() => onSelect(r.text)}
          className="rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
