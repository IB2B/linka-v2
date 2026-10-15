type Props = { title: string; description: string };

// Title + one-line purpose for each block of the product sheet.
export function ProductSectionHeading({ title, description }: Props) {
  return (
    <div className="space-y-0.5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
