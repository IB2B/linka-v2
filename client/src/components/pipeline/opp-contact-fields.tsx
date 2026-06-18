import { Input } from "@/components/ui/input";
import { OppField } from "./opp-field";

// Title + primary contact details (uncontrolled, read via FormData).
export function OppContactFields() {
  return (
    <>
      <OppField label="Title" htmlFor="title">
        <Input id="title" name="title" required maxLength={255} autoFocus
          placeholder="e.g. Sponsorship — running gear brand" />
      </OppField>
      <div className="grid gap-4 sm:grid-cols-2">
        <OppField label="Contact name" htmlFor="contactName">
          <Input id="contactName" name="contactName" maxLength={160} placeholder="Jane Doe" />
        </OppField>
        <OppField label="Contact email" htmlFor="contactEmail">
          <Input id="contactEmail" name="contactEmail" type="email" maxLength={255}
            placeholder="jane@brand.com" />
        </OppField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <OppField label="Phone" htmlFor="contactPhone">
          <Input id="contactPhone" name="contactPhone" type="tel" maxLength={40}
            placeholder="+39 …" />
        </OppField>
        <OppField label="Company name" htmlFor="companyName">
          <Input id="companyName" name="companyName" maxLength={160} placeholder="Acme S.r.l." />
        </OppField>
      </div>
    </>
  );
}
