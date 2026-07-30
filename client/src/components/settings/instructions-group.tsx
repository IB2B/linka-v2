type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

// One labelled block inside AI Instructions — keeps "about you" visually
// separate from the per-platform answers.
export function InstructionsGroup({ title, description, children }: Props) {
  return (
    <div className="space-y-3 rounded-lg border bg-card/40 p-4">
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
