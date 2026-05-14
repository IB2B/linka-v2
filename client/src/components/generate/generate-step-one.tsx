import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostTypeGrid } from "./post-type-grid";
import { RandomCard } from "./random-card";
import type { PostType } from "@/types/content";

type Props = {
  postType: PostType;
  pending: boolean;
  onChangeType: (t: PostType) => void;
  onRandom: () => void;
  onNext: () => void;
};

export function GenerateStepOne({ postType, pending, onChangeType, onRandom, onNext }: Props) {
  return (
    <div className="space-y-6">
      <PostTypeGrid value={postType} onChange={onChangeType} disabled={pending} />
      <RandomCard disabled={pending} onClick={onRandom} />
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={pending}>
          Next: Settings <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
