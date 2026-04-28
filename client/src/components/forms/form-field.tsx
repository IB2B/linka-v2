import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormFieldProps } from "@/types/form-field-props";

export function FormField({
  id,
  label,
  labelAction,
  className,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {labelAction}
      </div>
      <Input id={id} className={className} {...inputProps} />
    </div>
  );
}
