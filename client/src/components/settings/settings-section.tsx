import { Separator } from "@/components/ui/separator";

type Props = {
  title: string;
  description: string;
  // Optional control on the right of the title, e.g. an "Add" button.
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function SettingsSection({ title, description, action, children }: Props) {
  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <Separator />
      {children}
    </section>
  );
}
