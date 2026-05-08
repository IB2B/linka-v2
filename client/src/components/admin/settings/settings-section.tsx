import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";

type Props = {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SettingsSection({ id, title, description, children }: Props) {
  return (
    <Card id={id} className="scroll-mt-20">
      <CardHeader>
        <CardTitle className="text-sm font-semibold tracking-tight">{title}</CardTitle>
        {description && (
          <CardDescription className="tracking-tight">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
}
