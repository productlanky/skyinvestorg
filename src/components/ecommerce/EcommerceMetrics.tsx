"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { WalletIcon, BanknoteIcon } from "lucide-react";
import {
  databases,
  DB_ID,
  PROFILE_COLLECTION_ID,
  STOCKLOG_COLLECTION_ID,
} from "@/lib/appwrite/client";
import { Query } from "appwrite";
import { getUser, fetchTeslaPrice } from "@/lib/appwrite/auth";
import { RiStockFill } from "react-icons/ri";

export const EcommerceMetrics = () => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<number | null>(0);
  const [totalDeposit, setTotalDeposit] = useState<number | null>(0);
  const [totalShares, setTotalShare] = useState<number | null>(0);
  const [profit, setProfit] = useState<number | null>(0);
  const [sharePrice, setSharePrice] = useState(0);

  useEffect(() => {
    fetchTeslaPrice().then((price) => {
      setSharePrice(parseFloat(price));
    });

    const fetchData = async () => {
      const user = await getUser();
      if (!user) return;

      try {
        const response = await databases.listDocuments(
          DB_ID,
          PROFILE_COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );

        const profile = response.documents[0];

        // Get all stock logs for the current user
        const { documents } = await databases.listDocuments(
          DB_ID,
          STOCKLOG_COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );

        const totalShare =
          documents.reduce(
            (sum, tx) => sum + (Number(tx.shares) || 0),
            0
          ) || 0;

        setBalance(profile?.totalDeposit || 0);
        setTotalShare(totalShare);
        setTotalDeposit(profile?.totalDeposit || 0);
        setProfit(profile?.profit || 0);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const computedPortfolioValue =
    (balance || 0) + (profit || 0) + (totalShares || 0) * sharePrice;
  const sharesValue = (totalShares || 0) * sharePrice;

  const cards = [
    {
      label: "Portfolio value",
      icon: WalletIcon,
      value: loading ? null : `$${computedPortfolioValue.toFixed(2)}`,
      hint: "Balance + shares + profit",
    },
    {
      label: "Total deposit",
      icon: BanknoteIcon,
      value: loading ? null : `$${(totalDeposit || 0).toFixed(2)}`,
      hint: "All approved deposits",
    },
    {
      label: "Shares value",
      icon: RiStockFill,
      value: loading
        ? null
        : `$${sharesValue.toFixed(2)} ~ ${(totalShares || 0).toFixed(2)}`,
      hint: "Current Tesla shares",
    },
    {
      label: "Realized profit",
      icon: BanknoteIcon,
      value: loading ? null : `$${(profit || 0).toFixed(2)}`,
      hint: "Total profit withdrawn/realized",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
      {cards.map((card) => {
        const Icon = card.icon as any;

        return (
          <div
            key={card.label}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/90 p-4 sm:p-5 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500/60 via-violet-500/60 to-emerald-500/60" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {card.label}
                </span>
                <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
                  {loading ? (
                    <Skeleton className="h-7 w-24" />
                  ) : (
                    card.value
                  )}
                </div>
                <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                  {card.hint}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                {Icon === RiStockFill ? (
                  <RiStockFill className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                ) : (
                  <Icon className="h-5 w-5 text-gray-800 dark:text-white/90" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
