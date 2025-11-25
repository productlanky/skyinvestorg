import React from "react";
import { GiftIcon, UsersIcon } from "lucide-react";

type RefBonusProps = {
  totalReferred: number;
  referralBonus: number;
};

export default function RefBonus({ totalReferred, referralBonus }: RefBonusProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Total Referrals */}
      <div
        className="
          flex items-center gap-4 rounded-2xl 
          border border-gray-200 dark:border-white/[0.06]
          bg-white/80 dark:bg-white/[0.03]
          backdrop-blur-xl shadow-sm 
          p-5 md:p-6 transition hover:shadow-md
        "
      >
        <div
          className="
            flex items-center justify-center w-12 h-12 rounded-xl
            bg-blue-100/70 text-blue-600
            dark:bg-blue-900/30 dark:text-blue-300
          "
        >
          <UsersIcon className="w-5 h-5" />
        </div>

        <div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Total Referrals
          </span>
          <h4 className="mt-1 font-semibold text-gray-900 text-2xl dark:text-white">
            {totalReferred}
          </h4>
        </div>
      </div>

      {/* Total Bonus */}
      <div
        className="
          flex items-center gap-4 rounded-2xl 
          border border-gray-200 dark:border-white/[0.06]
          bg-white/80 dark:bg-white/[0.03]
          backdrop-blur-xl shadow-sm 
          p-5 md:p-6 transition hover:shadow-md
        "
      >
        <div
          className="
            flex items-center justify-center w-12 h-12 rounded-xl
            bg-emerald-100/70 text-emerald-600
            dark:bg-emerald-900/30 dark:text-emerald-300
          "
        >
          <GiftIcon className="w-5 h-5" />
        </div>

        <div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Total Bonus Earned
          </span>
          <h4 className="mt-1 font-semibold text-gray-900 text-2xl dark:text-white">
            ${referralBonus.toLocaleString()}
          </h4>
        </div>
      </div>
    </div>
  );
}
