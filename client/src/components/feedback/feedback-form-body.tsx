import { Textarea } from "@/components/ui/textarea";
import { FeedbackCategories } from "./feedback-categories";
import type { FeedbackCategory } from "@/app/dashboard/feedback-action";

type Props = {
  category: FeedbackCategory;
  onCategoryChange: (c: FeedbackCategory) => void;
  message: string;
  onMessageChange: (m: string) => void;
  disabled: boolean;
};

export function FeedbackFormBody({ category, onCategoryChange, message, onMessageChange, disabled }: Props) {
  return (
    <div className="space-y-3">
      <FeedbackCategories value={category} onChange={onCategoryChange} disabled={disabled} />
      <Textarea
        placeholder={category === "feature" ? "What should we build next?" : "What's working well? What do you love?"}
        rows={5}
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        disabled={disabled}
        maxLength={5000}
      />
    </div>
  );
}
