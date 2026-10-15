import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InstructionField } from "./ai-instruction-fields";

type Props = {
  field: InstructionField;
  defaultValue: string;
  rows?: number;
  required?: boolean;
  children?: React.ReactNode;
};

export function InstructionTextarea({ field, defaultValue, rows = 2, required, children }: Props) {
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
        placeholder={field.placeholder}
      />
      {children}
    </div>
  );
}
