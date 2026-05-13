import { Label } from "@/components/ui/label";
import { CATEGORIES, PRIORITIES } from "./support-options";
import type { TicketCategory, TicketPriority } from "@/lib/support/support.types";

type Props = {
  category: TicketCategory;
  priority: TicketPriority;
  onCategoryChange: (c: TicketCategory) => void;
  onPriorityChange: (p: TicketPriority) => void;
};

const SELECT_CLS = "flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm";

export function SupportSelectFields({ category, priority, onCategoryChange, onPriorityChange }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select id="category" value={category} onChange={(e) => onCategoryChange(e.target.value as TicketCategory)} className={SELECT_CLS}>
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <select id="priority" value={priority} onChange={(e) => onPriorityChange(e.target.value as TicketPriority)} className={SELECT_CLS}>
          {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>
    </div>
  );
}
