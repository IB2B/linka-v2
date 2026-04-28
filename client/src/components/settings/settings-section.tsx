import { Separator } from "@/components/ui/separator";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function SettingsSection({ title, description, children }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}
