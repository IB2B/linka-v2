"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BillingStatusBanners } from "./billing-status-banners";
import { BillingPlanCard } from "./billing-plan-card";
import { BillingNextCharge } from "./billing-next-charge";
import { BillingWallet } from "./billing-wallet";
import { BillingPaymentMethods } from "./billing-payment-methods";
import { BillingInvoices } from "./billing-invoices";
import type { BillingOverview } from "@/types/billing-overview";
import { billingService } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/api/http";

export function BillingDashboard({ overview }: { overview: BillingOverview }) {
  const [portalPending, setPortalPending] = useState(false);

  async function openPortal() {
    setPortalPending(true);
    try {
      const { url } = await billingService.portal();
      window.location.href = url;
    } catch (e) {
      toast.error(getErrorMessage(e, "Failed to open portal"));
      setPortalPending(false);
    }
  }

  const { tier, status, balance, currency, paymentMethods, invoices, upcoming, currentPeriodEnd, cancelAtPeriodEnd, postsThisMonth, postsLimit } = overview;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Billing</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Manage your plan, payment methods, invoices, and account balance.</p>
        </div>
        {overview.hasStripeCustomer && (
          <Button variant="outline" onClick={openPortal} disabled={portalPending} className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
            {portalPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
            Manage in Stripe
          </Button>
        )}
      </div>
      <BillingStatusBanners status={status} cancelAtPeriodEnd={cancelAtPeriodEnd} currentPeriodEnd={currentPeriodEnd} onPortal={openPortal} portalPending={portalPending} />
      <div className="grid gap-4 lg:grid-cols-3">
        <BillingPlanCard tier={tier} status={status} postsThisMonth={postsThisMonth} postsLimit={postsLimit} />
        <BillingNextCharge upcoming={upcoming} currentPeriodEnd={currentPeriodEnd} hasPaid={tier !== "FREE"} />
        <BillingWallet balance={balance} currency={currency} />
      </div>
      <BillingPaymentMethods paymentMethods={paymentMethods} onPortal={openPortal} portalPending={portalPending} />
      <BillingInvoices invoices={invoices} />
    </div>
  );
}
