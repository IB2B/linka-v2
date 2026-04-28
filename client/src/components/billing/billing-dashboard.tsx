"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BillingLoading } from "./billing-loading";
import { BillingError } from "./billing-error";
import { BillingStatusBanners } from "./billing-status-banners";
import { BillingPlanCard } from "./billing-plan-card";
import { BillingNextCharge } from "./billing-next-charge";
import { BillingWallet } from "./billing-wallet";
import { BillingPaymentMethods } from "./billing-payment-methods";
import { BillingInvoices } from "./billing-invoices";
import type { BillingOverview } from "@/types/billing-overview";

export function BillingDashboard() {
  const [overview, setOverview] = useState<BillingOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portalPending, setPortalPending] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const res = await fetch("/api/billing/overview", { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setOverview(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load billing");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function openPortal() {
    setPortalPending(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST", credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to open portal");
      window.location.href = data.url;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to open portal");
      setPortalPending(false);
    }
  }

  if (loading) return <BillingLoading />;
  if (error || !overview) return <BillingError error={error ?? "Unknown error"} onRetry={load} />;

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
