"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
// import TierProgressCard from "./TierProgressCard";
import TiersOverview from "./TiersOverview";
import { tierList } from "@/lib/data/info";
import {
  databases,
  DB_ID,
  PROFILE_COLLECTION_ID,
  TRANSACTION_COLLECTION,
} from "@/lib/appwrite/client";
import { Query } from "appwrite";
import { getUser } from "@/lib/appwrite/auth";

export default function BannerPage() {
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [activeTier, setActiveTier] = useState(tierList[0]);
  const [nextTier, setNextTier] = useState<typeof tierList[0] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUser().catch(() => null);
        if (!user) return;

        const profileRes = await databases.listDocuments(
          DB_ID,
          PROFILE_COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );
        const profileDoc = profileRes.documents[0];

        // Approved deposits
        const deposits = await databases.listDocuments(
          DB_ID,
          TRANSACTION_COLLECTION,
          [
            Query.equal("userId", user.$id),
            Query.equal("type", "deposit"),
            Query.equal("status", "approved"),
          ]
        );

        const totalDeposit =
          deposits?.documents?.reduce(
            (sum, tx) => sum + (Number(tx.amount) || 0),
            0
          ) || 0;

        // Referrals
        const referralsList = await databases.listDocuments(
          DB_ID,
          PROFILE_COLLECTION_ID,
          [Query.equal("referredBy", profileDoc.refereeId)]
        );

        const totalReferralCount = referralsList.total;

        setTotalDeposits(totalDeposit);
        setTotalReferrals(totalReferralCount);

        // Current tier
        const currentTier =
          tierList
            .slice()
            .sort((a, b) => {
              if (a.deposit === b.deposit) {
                return a.referrals - b.referrals;
              }
              return a.deposit - b.deposit;
            })
            .filter(
              (tier) =>
                totalDeposit >= Number(tier.deposit) &&
                totalReferralCount >= Number(tier.referrals)
            )
            .pop() || tierList[0];

        setActiveTier(currentTier);

        // Next tier
        const upcomingTier =
          tierList.find(
            (tier) =>
              tier.deposit > totalDeposit ||
              tier.referrals > totalReferralCount
          ) || null;

        setNextTier(upcomingTier);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const getProgressToNextTier = () => {
    if (!nextTier) return 100;
    const depositProgress = Math.min(
      100,
      ((totalDeposits - activeTier.deposit) /
        (nextTier.deposit - activeTier.deposit || 1)) *
        100
    );
    const referralProgress = Math.min(
      100,
      ((totalReferrals - activeTier.referrals) /
        (nextTier.referrals - activeTier.referrals || 1)) *
        100
    );
    return Math.round((depositProgress + referralProgress) / 2);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10 pt-5 space-y-6">
      {/* Top banner / summary */}
      <div
        className="
          rounded-3xl border border-border/70 
          bg-gradient-to-r from-brand-500/12 via-brand-500/5 to-transparent
          dark:from-brand-500/18 dark:via-brand-500/7 dark:to-transparent
          px-5 py-4 md:px-7 md:py-5
          flex flex-col md:flex-row md:items-center md:justify-between
          gap-4 shadow-[0_18px_40px_rgba(15,23,42,0.18)]
          dark:shadow-[0_0_40px_rgba(15,23,42,0.8)]
          backdrop-blur-xl
        "
      >
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
            Loyalty tiers & rewards
          </p>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            You&apos;re currently in the{" "}
            <span className="text-brand-600 dark:text-brand-400">
              {activeTier.name}
            </span>{" "}
            tier
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-xl">
            Grow your deposits and referrals to unlock higher rewards, better
            rates and exclusive perks.
          </p>
        </div>

        <div className="flex gap-3 md:gap-4">
          <div className="rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-white/60 dark:border-white/10 px-4 py-3 min-w-[120px]">
            <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Total Deposits
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              ${totalDeposits.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-white/60 dark:border-white/10 px-4 py-3 min-w-[120px]">
            <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Total Referrals
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              {totalReferrals}
            </p>
          </div>
        </div>
      </div>

      {/* Main layout: progress + tiers */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: main cards */}
        <div className="space-y-6 lg:col-span-2">
          {/* <TierProgressCard
            totalDeposits={totalDeposits}
            totalReferrals={totalReferrals}
            activeTier={activeTier}
          /> */}

          <TiersOverview
            tierList={tierList}
            activeTier={activeTier}
            userDeposits={totalDeposits}
            userReferrals={totalReferrals}
          />
        </div>

        {/* Right: progress to next tier */}
        <div className="lg:col-span-1">
          {nextTier ? (
            <div
              className="
                h-full rounded-2xl border border-border/70 
                bg-card/90 dark:bg-slate-950/80 
                shadow-[0_16px_40px_rgba(15,23,42,0.18)]
                dark:shadow-[0_0_40px_rgba(15,23,42,0.9)]
                px-5 py-5 md:px-6 md:py-6
                flex flex-col justify-between
              "
            >
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  Progress to{" "}
                  <span className="text-brand-600 dark:text-brand-400">
                    {nextTier.name}
                  </span>{" "}
                  tier
                </h3>
                <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {totalDeposits < nextTier.deposit &&
                    `Deposit $${Math.max(
                      0,
                      nextTier.deposit - totalDeposits
                    ).toLocaleString()} more `}
                  {totalDeposits < nextTier.deposit &&
                    totalReferrals < nextTier.referrals &&
                    `and `}
                  {totalReferrals < nextTier.referrals &&
                    `Refer ${Math.max(
                      0,
                      nextTier.referrals - totalReferrals
                    ).toLocaleString()} more users `}
                  to reach{" "}
                  <span className="font-semibold">{nextTier.name}</span>.
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Overall progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {getProgressToNextTier()}%
                    </span>
                  </div>
                  <Progress
                    value={getProgressToNextTier()}
                    className="h-3 rounded-full bg-gray-100 dark:bg-slate-900"
                  />
                </div>

                {/* Breakdown */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
                  <div className="rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-slate-900/70 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Deposits
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      ${totalDeposits.toLocaleString()}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                      Target: ${nextTier.deposit.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-slate-900/70 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Referrals
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {totalReferrals}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                      Target: {nextTier.referrals}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400">
                You&apos;re{" "}
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  {getProgressToNextTier()}%
                </span>{" "}
                of the way there. Keep going 🚀
              </p>
            </div>
          ) : (
            <div
              className="
                h-full rounded-2xl border border-border/70 
                bg-card/90 dark:bg-slate-950/80 
                shadow-[0_16px_40px_rgba(15,23,42,0.18)]
                dark:shadow-[0_0_40px_rgba(15,23,42,0.9)]
                px-5 py-6 md:px-6 md:py-7
                flex flex-col items-center justify-center text-center
              "
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                🎉 You&apos;ve unlocked the highest tier!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                Welcome to the{" "}
                <span className="font-semibold">Diamond</span> tier. You&apos;re
                enjoying the maximum rewards available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
