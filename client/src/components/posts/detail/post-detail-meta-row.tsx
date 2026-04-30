type Props = { label: string; children: React.ReactNode };

export function PostDetailMetaRow({ label, children }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm break-words text-foreground/90">{children}</dd>
    </div>
  );
}
