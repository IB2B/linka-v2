import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PASSWORD_RULES, getPasswordStrength } from "@/lib/auth/password-strength";
import type { StrengthLevel } from "@/lib/auth/password-strength";

const LEVEL: Record<StrengthLevel, { bar: string; label: string; text: string }> = {
  weak:   { bar: "bg-destructive",  label: "text-destructive",          text: "Weak"   },
  fair:   { bar: "bg-failed",       label: "text-failed-foreground",    text: "Fair"   },
  good:   { bar: "bg-scheduled",    label: "text-scheduled-foreground", text: "Good"   },
  strong: { bar: "bg-posted",       label: "text-posted-foreground",    text: "Strong" },
};

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const { level, bars, passed } = getPasswordStrength(password);
  const { bar, label, text } = LEVEL[level];

  return (
    <div className="space-y-2.5">
      <div className="space-y-1">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn("h-1 flex-1 rounded-full transition-all", i <= bars ? bar : "bg-muted")}
            />
          ))}
        </div>
        <p className={cn("text-xs font-medium", label)}>{text}</p>
      </div>
      <ul className="space-y-1">
        {PASSWORD_RULES.map((rule, i) => (
          <li key={i} className="flex items-center gap-1.5 text-xs">
            {passed[i]
              ? <Check className="size-3 shrink-0 text-posted-foreground" />
              : <X className="size-3 shrink-0 text-muted-foreground" />
            }
            <span className={passed[i] ? "text-foreground" : "text-muted-foreground"}>
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
