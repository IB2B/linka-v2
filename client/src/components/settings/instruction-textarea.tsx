import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Field = { name: string; label: string; placeholder: string; hint?: string };

// Uncontrolled with `defaultValue`, or controlled with `value` + `onChange`.
type Props = {
  field: Field;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  required?: boolean;
  children?: React.ReactNode;
};

export function InstructionTextarea({
  field, defaultValue, value, onChange, rows = 2, required, children,
}: Props) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.name}>{field.label}</Label>
      {field.hint && (
        <p className="text-xs text-muted-foreground">{field.hint}</p>
      )}
      <Textarea
        id={field.name}
        name={field.name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={field.placeholder}
      />
      {children}
    </div>
  );
}
