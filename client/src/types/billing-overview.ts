export interface BillingOverview {
  tier: "FREE" | "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
  status: string;
  postsThisMonth: number;
  postsLimit: number;
  hasStripeCustomer: boolean;
  balance: number;
  currency: string;
  paymentMethods: Array<{
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    funding: string;
    isDefault: boolean;
  }>;
  defaultPaymentMethodId: string | null;
  invoices: Array<{
    id: string;
    number: string | null;
    status: string;
    amountPaid: number;
    amountDue: number;
    currency: string;
    created: number;
    hostedInvoiceUrl: string | null;
    invoicePdf: string | null;
    description: string | null;
  }>;
  upcoming: { amountDue: number; currency: string; nextPaymentAttempt: number | null } | null;
  currentPeriodEnd: number | null;
  cancelAtPeriodEnd: boolean;
}
