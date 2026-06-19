"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BillingStatusBanners } from "./billing-status-banners";
import { BillingCurrentPlanCard } from "./billing-current-plan-card";
import { BillingPaymentMethods } from "./billing-payment-methods";
import { BillingNextCharge } from "./billing-next-charge";
import { BillingInvoices } from "./billing-invoices";
import { BillingFreeLayout } from "./billing-free-layout";
import { BillingUpgradeButton } from "./billing-upgrade-button";
import type { BillingOverview } from "@/types/billing-overview";
import { billingService } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/api/http";

type Props = { overview: BillingOverview; confirmError?: string };

export function BillingDashboard({ overview, confirmError }: Props) {
  const [portalPending, setPortalPending] = useState(false);

  useEffect(() => {
    if (confirmError) toast.error(confirmError);
  }, [confirmError]);

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

  const { tier, status, paymentMethods, invoices, upcoming, currentPeriodEnd, cancelAtPeriodEnd, postsThisMonth, postsLimit, planAmount, planCurrency, planInterval } = overview;
  const isFree = tier === "FREE" || tier === "STARTER";

  if (isFree) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <BillingFreeLayout postsThisMonth={postsThisMonth} postsLimit={postsLimit} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Billing</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Manage your plan, payment methods, and invoices.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BillingUpgradeButton tier={tier} />
          {overview.hasStripeCustomer && (
            <Button variant="outline" onClick={openPortal} disabled={portalPending} className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              {portalPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
              Manage in Stripe
            </Button>
          )}
        </div>
      </div>
      <BillingStatusBanners status={status} cancelAtPeriodEnd={cancelAtPeriodEnd} currentPeriodEnd={currentPeriodEnd} onPortal={openPortal} portalPending={portalPending} />
      <div className="grid gap-4 lg:grid-cols-3">
        <BillingCurrentPlanCard tier={tier} status={status} postsThisMonth={postsThisMonth} postsLimit={postsLimit} planAmount={planAmount} planCurrency={planCurrency} planInterval={planInterval} />
        <BillingPaymentMethods paymentMethods={paymentMethods} onPortal={openPortal} portalPending={portalPending} />
        <BillingNextCharge upcoming={upcoming} currentPeriodEnd={currentPeriodEnd} hasPaid={!isFree} cancelAtPeriodEnd={cancelAtPeriodEnd} />
      </div>
      <BillingInvoices invoices={invoices} />
    </div>
  );
}
