import type Stripe from "stripe";

export function mapPaymentMethods(pms: Stripe.PaymentMethod[], defaultPmId: string | null) {
  return pms.map((pm) => ({
    id: pm.id, brand: pm.card!.brand, last4: pm.card!.last4,
    expMonth: pm.card!.exp_month, expYear: pm.card!.exp_year,
    funding: pm.card!.funding, isDefault: pm.id === defaultPmId,
  }));
}

export function mapInvoices(invoices: Stripe.Invoice[]) {
  return invoices.map((inv) => ({
    id: inv.id, number: inv.number, status: inv.status, amountPaid: inv.amount_paid,
    amountDue: inv.amount_due, currency: inv.currency, created: inv.created * 1000,
    hostedInvoiceUrl: inv.hosted_invoice_url ?? null,
    invoicePdf: inv.invoice_pdf ?? null, description: inv.description ?? null,
  }));
}
