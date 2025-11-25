"use client";

import React from "react";
import { FiMail, FiPhone, FiMessageCircle, FiHelpCircle, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { HiOutlineLifebuoy } from "react-icons/hi2";

export default function SupportPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 pb-10 pt-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Support center
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
          Get help with deposits, investments, shipments and your account. 
          Start with the quick help topics or reach out to our team directly.
        </p>
      </div>

      {/* Top overview strip */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
            <HiOutlineLifebuoy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Priority support
            </p>
            <p className="text-sm text-gray-800 dark:text-white/90">
              Typical reply time: under 24 hours
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
            <FiMessageCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Live chat
            </p>
            <p className="text-sm text-gray-800 dark:text-white/90">
              Weekdays · 9:00–17:00 (UTC)
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Need urgent help?
            </p>
            <p className="text-sm text-gray-800 dark:text-white/90">
              Open a priority ticket and we’ll escalate it.
            </p>
          </div>
          <Link href="/support/ticket">
            <Button size="sm" variant="outline" className="flex items-center gap-1.5">
              Open ticket
              <FiArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main grid: contact + help topics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Contact methods */}
        <div className="space-y-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contact us
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Email */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/25 dark:text-blue-300">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                    Email support
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    For account issues, deposits, withdrawals or KYC.
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300">
                support@logixinvest.com
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                We reply within 24 hours on business days.
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-900/25 dark:text-sky-300">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                    Phone support
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Speak directly with our support specialist.
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                +1 (888) 555-2193
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Available Monday–Friday, 9:00–17:00 (UTC).
              </p>
            </div>

            {/* Live chat */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] md:col-span-2">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/25 dark:text-emerald-300">
                  <FiMessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                    Live chat
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Fastest way to get help with your dashboard.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Chat with us about deposits, plans, shipments or account issues.
                </p>
                <Button size="sm" variant="outline">
                  Start chat
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Help topics / mini-FAQ */}
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <FiHelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                Quick help topics
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Short answers to common questions.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900/60">
              <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
                Account & security
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Update your profile, change password, enable 2FA and complete KYC.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900/60">
              <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
                Deposits & withdrawals
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Learn how to fund your account, track pending deposits and request payouts.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900/60">
              <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
                Investment plans
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                See how returns are calculated, plan durations and when interest is paid.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900/60">
              <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
                Shipments tracking
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Track shipment status, route history and delivery estimates.
              </p>
            </div>
          </div>

          <Link
            href="/help"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Browse full help center
            <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          If you ever feel something is wrong with your account or transactions, 
          contact us immediately — our team is here to help you stay safe.
        </p>
      </div>
    </section>
  );
}
