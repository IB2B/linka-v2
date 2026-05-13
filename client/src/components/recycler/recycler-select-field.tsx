import { Label } from "@/components/ui/label";

const SELECT = "h-9 w-full rounded-md border bg-background px-2 text-sm shadow-sm";

type Option = { value: number; label: string };
type Props = {
  label: string;
  value: number;
  options: Option[];
  disabled: boolean;
  onChange: (v: number) => void;
};

export function RecyclerSelectField({ label, value, options, disabled, onChange }: Props) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))} disabled={disabled} className={SELECT}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
