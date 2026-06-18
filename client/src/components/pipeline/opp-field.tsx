import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
};

// Label + control pair shared by every opportunity form field.
export function OppField({ label, htmlFor, className, children }: Props) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="mb-1.5 text-xs text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
