"use client";

import { useEffect, useState } from "react";

import React from "react";
import RecentOrders from "../ecommerce/RecentOrders";
import MonthlyTarget from "../ecommerce/MonthlyTarget";
import { EcommerceMetrics } from "../ecommerce/EcommerceMetrics";
import QuickLinks from "./QuickLinks";
import CopyLinkInput from "../form/group-input/CopyLinkInput";
import { Skeleton } from "../ui/skeleton";
import Alert from "../ui/alert/Alert";
import { getUser } from "@/lib/appwrite/auth";
import {
    databases,
    DB_ID,
    INVESTMENT_COLLECTION,
    PROFILE_COLLECTION_ID,
    TRANSACTION_COLLECTION,
} from "@/lib/appwrite/client";
import { Query } from "appwrite";
import { tierList } from "@/lib/data/info";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [kycStatus, setKycStatus] = useState<string | null>(null);
    const [tierName, setTierName] = useState("Unknown");
    const [referralCount, setReferralCount] = useState(0);
    const [activeInvestments, setActiveInvestments] = useState(0);
    const [referralLink, setReferralLink] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const user = await getUser();

            if (!user) return;

            try {
                const response = await databases.listDocuments(
                    DB_ID,
                    PROFILE_COLLECTION_ID,
                    [Query.equal("userId", user.$id)]
                );

                const userProfile = response.documents[0];

                if (!userProfile) {
                    console.warn("No profile found for user.");
                    return;
                }

                const referralCode = userProfile?.refereeId;
                setKycStatus(userProfile?.kycStatus || "unknown");

                const baseUrl =
                    process.env.NEXT_PUBLIC_APP_URL || "https://yourapp.com";
                setReferralLink(`${baseUrl}/signup?ref=${referralCode}`);

                // Referrals
                const referralsList = await databases.listDocuments(
                    DB_ID,
                    PROFILE_COLLECTION_ID,
                    [Query.equal("referredBy", userProfile.refereeId)]
                );

                setReferralCount(referralsList.total);

                // Active investments
                const investmentList = await databases.listDocuments(
                    DB_ID,
                    INVESTMENT_COLLECTION,
                    [
                        Query.equal("userId", user.$id),
                        Query.equal("status", "active"),
                    ]
                );

                setActiveInvestments(investmentList.total);

                // Total approved deposits
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

                // Determine tier
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
                                referralsList.total >= Number(tier.referrals)
                        )
                        .pop() || null;

                setTierName(currentTier ? currentTier.name : "Unknown");
            } catch (error) {
                console.log("Error fetching profile:", error);
            }

            setLoading(false);
        };

        fetchUser();
    }, []);

    const showKycAlert = kycStatus !== "approved";

    return (
        <div className="space-y-5 md:space-y-6">
            {/* Top banner / alert */}
            {showKycAlert && (
                <Alert
                    variant="warning"
                    title="KYC Required"
                    linkHref="/profile"
                    linkText="Update KYC"
                    showLink
                    message="You must submit and get your KYC approved to fully use your dashboard. Please go to the KYC page to complete verification."
                />
            )}

            {/* Page header */}
            <section
                className="
    rounded-3xl border border-border/60 
    bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 
    text-slate-900
    px-5 py-5 sm:px-6 sm:py-6 
    shadow-[0_18px_45px_rgba(15,23,42,0.08)]
    dark:border-slate-800
    dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
    dark:text-white
  "
            >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                            Dashboard overview
                        </h1>
                        <p className="text-xs md:text-sm text-slate-600 max-w-lg dark:text-slate-300">
                            Track your balance, investments, referrals and progress towards
                            higher tiers — all in one place.
                        </p>
                    </div>

                    {!loading && !showKycAlert && (
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm justify-start md:justify-end">
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-100">
                                <span className="mr-1 h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="font-medium">Tier: {tierName}</span>
                            </span>
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
                                <span className="mr-1 h-2 w-2 rounded-full bg-sky-500" />
                                <span className="font-medium">Referrals: {referralCount}</span>
                            </span>
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
                                <span className="mr-1 h-2 w-2 rounded-full bg-amber-400" />
                                <span className="font-medium">
                                    Active investments: {activeInvestments}
                                </span>
                            </span>
                        </div>
                    )}
                </div>
            </section>


            <div className="grid grid-cols-12 gap-4 md:gap-6">
                {/* Left column: metrics + quick actions */}
                <div className="col-span-12 xl:col-span-7 space-y-5 md:space-y-6 flex flex-col">
                    {loading || showKycAlert ? (
                        <>
                            <Skeleton className="h-[160px] w-full rounded-2xl" />
                            <Skeleton className="h-[180px] w-full rounded-2xl" />
                        </>
                    ) : (
                        <>
                            <EcommerceMetrics />
                            <QuickLinks />
                        </>
                    )}
                </div>

                {/* Right column: monthly target + referral card */}
                <div className="col-span-12 xl:col-span-5 space-y-5 md:space-y-6">
                    {loading || showKycAlert ? (
                        <Skeleton className="h-[340px] w-full rounded-2xl" />
                    ) : (
                        <MonthlyTarget
                            loading={loading}
                            tierName={tierName}
                            referralCount={referralCount}
                            activeInvestments={activeInvestments}
                        />
                    )}

                    {loading || showKycAlert ? (
                        <Skeleton className="h-[64px] w-full rounded-2xl" />
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-white/[0.03] p-5 sm:p-6">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        Invite &amp; earn more
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-w-sm">
                                        Share your unique referral link and earn rewards whenever
                                        your friends start investing.
                                    </p>
                                </div>
                                <div className="min-w-[220px] mt-3 sm:mt-0">
                                    <CopyLinkInput link={referralLink} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom: activity / recent orders */}
                <div className="col-span-12">
                    {loading || showKycAlert ? (
                        <Skeleton className="h-[320px] w-full rounded-2xl" />
                    ) : (
                        <RecentOrders />
                    )}
                </div>
            </div>
        </div>
    );
}
