
type Props = {
  title: string;
  description: string;
  action: React.ReactNode;
};

export function DangerRow({ title, description, action }: Props) {
  return (
    <div className="flex items-center justify-between gap-6 px-5 py-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}
