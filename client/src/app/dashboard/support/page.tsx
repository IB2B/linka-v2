import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";
import { SupportForm } from "@/components/support/support-form";
import { TicketList } from "@/components/support/ticket-list";
import { FaqSection } from "@/components/support/faq-section";
import { SupportInfoCard } from "@/components/support/support-info-card";
import { getTickets } from "@/lib/support/get-tickets";

export default async function SupportPage() {
  const tickets = await getTickets();

  return (
    <>
      <PageHeader
        title="Support"
        description="Run into a problem? Tell us what's wrong and we'll get back to you by email."
      />
      <Separator className="my-2" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-8">
          <section className="rounded-xl border bg-card p-6">
            <h2 className="text-base font-semibold">Open a ticket</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Share as much detail as you can — screenshots can be added later.
            </p>
            <SupportForm />
          </section>
          <FaqSection />
        </div>
        <aside className="space-y-6">
          <SupportInfoCard />
          <section className="space-y-3">
            <h2 className="text-base font-semibold">Your tickets</h2>
            <TicketList tickets={tickets} />
          </section>
        </aside>
      </div>
    </>
  );
}
