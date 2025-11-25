import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape />
              <div className="flex flex-col items-start max-w-md">
                <Link href="/" className="inline-block mb-4 logo">
                  <div className="logo-badge">⚡</div>
                  <div className="logo-text">
                    <span className="logo-text-main text-white">Flash Profits</span>
                    <span className="logo-text-sub text-white">Automated investing</span>
                  </div>
                </Link>
                <div className="max-w-md w-full space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Auto-Trading · Referral Rewards
                  </div>

                  <h1 className="text-3xl font-semibold tracking-tight text-gray-50">
                    Grow your money while we trade for you.
                  </h1>

                  <p className="text-sm leading-relaxed text-gray-400">
                    Fund your account, earn daily profits, and unlock higher tiers
                    as you deposit and refer friends. Your dashboard gives you
                    real-time insight into deposits, shares, and returns.
                  </p>

                  {/* Small stat cards */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/80 p-3 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                      <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                        Avg. Monthly ROI
                      </p>
                      <p className="mt-1 text-xl font-semibold text-emerald-800 dark:text-emerald-200">
                        15–20%
                      </p>
                      <p className="mt-1 text-[11px] text-emerald-800/80 dark:text-emerald-200/80">
                        On optimized investment plans.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-50/80 p-3 dark:border-indigo-500/25 dark:bg-indigo-500/10">
                      <p className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300">
                        Referral Boost
                      </p>
                      <p className="mt-1 text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                        +10% Tier Bonus
                      </p>
                      <p className="mt-1 text-[11px] text-indigo-800/80 dark:text-indigo-200/80">
                        Earn more when your friends deposit.
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-4 py-3 text-xs shadow-sm dark:border-gray-700 dark:bg-gray-900/80">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Transparent & trackable
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                      Every deposit, withdrawal, investment, and share purchase is
                      logged and visible in your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
