import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

export function ToggleRow({ id, label, description, checked, onChange }: Props) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border bg-card p-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium tracking-tight">{label}</span>
        {description && (
          <span className="text-xs tracking-tight text-muted-foreground">{description}</span>
        )}
      </div>
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(!!v)} className="mt-0.5" />
    </label>
  );
}
