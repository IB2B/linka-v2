import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TIPS = [
  "Upload 3–5 diverse writing samples for best results.",
  "Mix formats: LinkedIn posts, emails, articles.",
  "More samples = sharper voice profile.",
  "Re-analyze after adding new samples to refresh your DNA.",
];

export function TipsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="size-4" /> Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {TIPS.map((t) => <li key={t}>· {t}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
}
