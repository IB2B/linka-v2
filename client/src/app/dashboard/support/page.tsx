import { getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { NewTicketDialog } from "@/components/support/new-ticket-dialog";
import { TicketList } from "@/components/support/ticket-list";
import { FaqSection } from "@/components/support/faq-section";
import { getTickets } from "@/lib/support/get-tickets";

export default async function SupportPage() {
  const [tickets, t] = await Promise.all([getTickets(), getTranslations("support")]);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <PageHeader title={t("title")} description={t("description")} />
        <NewTicketDialog />
      </div>
      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-base font-semibold tracking-tight">Your tickets</h2>
          <TicketList tickets={tickets} />
        </section>
        <FaqSection />
      </div>
    </>
  );
}
