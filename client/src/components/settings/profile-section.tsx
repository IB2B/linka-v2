import { Separator } from "@/components/ui/separator";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileForm } from "./profile-form";
import { ProfileWorkForm } from "./profile-work-form";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  jobTitle: string;
  companyName: string;
  industry: string;
  headline: string;
};

export function ProfileSection({ avatarUrl, firstName, lastName, email, jobTitle, companyName, industry, headline }: Props) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight">Profile</h2>
          <p className="text-sm text-muted-foreground">Your personal information and contact details.</p>
        </div>
        <Separator />
        <ProfileAvatar avatarUrl={avatarUrl} firstName={firstName} email={email} />
        <ProfileForm firstName={firstName} lastName={lastName} email={email} />
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight">Work Profile</h2>
          <p className="text-sm text-muted-foreground">Used to personalize AI-generated content to your context.</p>
        </div>
        <Separator />
        <ProfileWorkForm jobTitle={jobTitle} companyName={companyName} industry={industry} headline={headline} />
      </div>
    </div>
  );
}
