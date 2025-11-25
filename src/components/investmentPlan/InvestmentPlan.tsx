"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../ui/button/Button";
import { toast } from "sonner";
import { getUser } from "@/lib/appwrite/auth";
import {
  databases,
  DB_ID,
  INVESTMENT_COLLECTION,
  PROFILE_COLLECTION_ID,
} from "@/lib/appwrite/client";
import { ID, Query } from "appwrite";
import { plan } from "@/lib/data/info";

type InvestmentPlan = {
  id: string;
  name: string;
  description: string;
  interest_rate: number;
  duration_days: number;
  min_amount: number;
};

export default function InvestmentPlansPage() {
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [balanc, setBalanc] = useState<number>(0);
  const [investing, setInvesting] = useState<string | null>(null);
  const [investment, setInvestment] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      if (!user) return;

      const res = await databases.listDocuments(DB_ID, PROFILE_COLLECTION_ID, [
        Query.equal("userId", user.$id),
      ]);

      if (res.documents.length === 0) {
        toast.error("Profile not found.");
        return;
      }

      setProfileId(res.documents[0].$id);

      try {
        const response = await databases.listDocuments(
          DB_ID,
          PROFILE_COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );

        const profile = response.documents[0];
        if (!profile) {
          toast.error("Failed to fetch balance");
          return;
        }
        setBalance(profile?.totalDeposit || 0);
        setBalanc(profile?.balance || 0);
        setUserId(user.$id);
        setPlans(plan);

        // 🔥 Fetch user's last investment, sorted by start_date descending
        const investmentRes = await databases.listDocuments(
          DB_ID,
          INVESTMENT_COLLECTION,
          [
            Query.equal("userId", user.$id),
            Query.orderDesc("startDate"),
            Query.limit(1),
          ]
        );

        if (investmentRes.documents.length > 0) {
          const lastInvestment = investmentRes.documents[0];
          const now = new Date();
          const endDate = new Date(lastInvestment.endDate);

          if (now > endDate) {
            // ✅ Investment has expired
            console.log("Investment has expired.");
            setInvestment("expired");
          } else {
            // ✅ Investment is still active
            console.log("Investment is still active.");
            setInvestment(lastInvestment.planId);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleInvest = async (plan: InvestmentPlan) => {
    if (!userId || !profileId) return;

    if (balance < plan.min_amount) {
      toast.error("Insufficient balance for this investment plan.");
      return;
    }

    setInvesting(plan.id);

    const startedAt = new Date();
    const endAt = new Date();
    endAt.setDate(startedAt.getDate() + plan.duration_days);

    try {
      // 1. Create investment document
      await databases.createDocument(
        DB_ID,
        INVESTMENT_COLLECTION,
        ID.unique(),
        {
          userId,
          planId: plan.id,
          amount: plan.min_amount,
          status: "active",
          startDate: startedAt.toISOString(),
          endDate: endAt.toISOString(),
        }
      );

      // 2. Update balance in profile
      await databases.updateDocument(DB_ID, PROFILE_COLLECTION_ID, profileId, {
        totalDeposit: balance - plan.min_amount,
        balance: balanc - plan.min_amount,
      });

      // 3. Show success
      toast.success(`Investment in "${plan.name}" started successfully.`);
      setBalance((prev) => prev - plan.min_amount);
    } catch (error) {
      console.error("Investment error:", error);
      toast.error("Failed to start investment. See console for details.");
    } finally {
      setInvesting(null);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-56 rounded-2xl bg-gradient-to-br from-background/60 to-background/30 border border-border/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!plans.length) {
    return (
      <p className="text-center text-muted-foreground">
        No investment plans available at the moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const isActivePlan = investment === plan.id;
        const isLoadingPlan = investing === plan.id;

        return (
          <div
            key={plan.id}
            className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-gradient-to-b from-background/80 to-background/40 dark:from-background/70 dark:to-background/40 shadow-sm hover:shadow-xl hover:border-primary/60 transition-all duration-200 p-5"
          >
            <div className="space-y-4">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                  Min {plan.min_amount.toLocaleString()} USD
                </span>
              </div>

              {/* Rate & stats */}
              <div className="space-y-2">
                <p className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-primary leading-none">
                    {(plan.interest_rate * 100).toFixed(0)}%
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    total return
                  </span>
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Duration:{" "}
                    <span className="font-medium text-foreground">
                      {plan.duration_days} days
                    </span>
                  </span>
                  <span>
                    Balance:{" "}
                    <span className="font-medium text-foreground">
                      ${balance.toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>

              {/* Extra info */}
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <li>
                  • Fixed amount:{" "}
                  <span className="font-medium text-foreground">
                    ${plan.min_amount.toLocaleString()}
                  </span>
                </li>
                <li>• Auto–payout at end of cycle</li>
                <li>• Strategy aligned with your dashboard settings</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-5 flex items-center justify-between gap-2">
              {isActivePlan && (
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-medium">
                  Active investment
                </span>
              )}

              <Button
                variant="outline"
                className="ml-auto inline-flex items-center gap-2 text-xs sm:text-sm font-medium border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => handleInvest(plan)}
                disabled={isLoadingPlan || isActivePlan}
              >
                {isLoadingPlan
                  ? "Processing..."
                  : isActivePlan
                  ? "Already Active"
                  : "Start Investment"}
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
