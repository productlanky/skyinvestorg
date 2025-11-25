import {
  Lock,
  TrendingUp,
  UsersRound,
  Zap,
  Medal,
  Shield,
  Award,
  Trophy,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tierIcons = {
  Bronze: <Medal className="w-6 h-6 text-amber-500 dark:text-amber-300" />,
  Silver: <Shield className="w-6 h-6 text-slate-300 dark:text-slate-200" />,
  Gold: <Award className="w-6 h-6 text-yellow-400 dark:text-yellow-300" />,
  Platinum: <Trophy className="w-6 h-6 text-indigo-400 dark:text-indigo-300" />,
  Diamond: <Crown className="w-6 h-6 text-sky-400 dark:text-sky-300" />,
};

interface Tier {
  name: keyof typeof tierIcons;
  deposit: number;
  referrals: number;
  boost: number;
  color?: string;
}

interface TiersOverviewProps {
  tierList: Tier[];
  activeTier: Tier;
  userDeposits: number;
  userReferrals: number;
}

export default function TiersOverview({
  tierList,
  activeTier,
  userDeposits,
  userReferrals,
}: TiersOverviewProps) {
  const cardBase =
    "relative rounded-2xl border border-white/50 dark:border-white/10 " +
    "bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl " +
    "shadow-[0_10px_35px_rgba(15,23,42,0.1)] dark:shadow-[0_0_35px_rgba(15,23,42,0.8)] " +
    "p-5 md:p-6 text-center transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.18)]";

  const getProgress = (tier: Tier) => {
    // 100% for already unlocked tiers
    if (
      userDeposits >= tier.deposit &&
      userReferrals >= tier.referrals
    ) {
      return 100;
    }

    const depositProgress =
      tier.deposit > 0
        ? Math.min(100, (userDeposits / tier.deposit) * 100)
        : 100;

    const referralProgress =
      tier.referrals > 0
        ? Math.min(100, (userReferrals / tier.referrals) * 100)
        : 100;

    // Average of deposit/referral progress
    return Math.round((depositProgress + referralProgress) / 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tiers overview
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Progress is based on both <span className="font-medium">deposits</span> and{" "}
          <span className="font-medium">referrals</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {tierList.map((tier) => {
          const isActive = tier.name === activeTier.name;
          const isUnlocked =
            userDeposits >= tier.deposit && userReferrals >= tier.referrals;
          const progress = getProgress(tier);

          return (
            <div
              key={tier.name}
              className={cn(
                cardBase,
                isActive &&
                  "ring-2 ring-brand-500/80 ring-offset-0 border-brand-500/60",
                !isActive &&
                  isUnlocked &&
                  "border-emerald-400/50 bg-emerald-50/60 dark:bg-emerald-500/5",
                !isUnlocked &&
                  !isActive &&
                  "opacity-80 border-slate-200/70 dark:border-slate-800/80"
              )}
            >
              {/* Status badge */}
              <div className="absolute right-3 top-3 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide">
                {isActive ? (
                  <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200">
                    Current tier
                  </span>
                ) : isUnlocked ? (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                    Unlocked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                    <Lock className="w-3 h-3" />
                    Locked
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900/80 shadow-inner">
                    {tierIcons[tier.name]}
                  </div>
                </div>

                {/* Tier name */}
                <p
                  className={cn(
                    "text-base font-semibold",
                    isActive
                      ? "text-brand-700 dark:text-brand-200"
                      : isUnlocked
                      ? "text-emerald-700 dark:text-emerald-200"
                      : "text-gray-800 dark:text-white/90"
                  )}
                >
                  {tier.name}
                </p>

                {/* Requirements */}
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      Deposit:{" "}
                      <span className="font-semibold">
                        ${tier.deposit.toLocaleString()}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <UsersRound className="w-4 h-4" />
                    <span>
                      Referrals:{" "}
                      <span className="font-semibold">
                        {tier.referrals}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>
                      Boost:{" "}
                      <span className="font-semibold">
                        +{tier.boost}% rewards
                      </span>
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                {!isUnlocked && (
                  <div className="pt-2 space-y-1">
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-500 dark:bg-brand-400 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {progress > 0 ? (
                        <>
                          <span className="font-medium">{progress}%</span> of
                          requirements completed
                        </>
                      ) : (
                        <>Start depositing and referring to unlock this tier.</>
                      )}
                    </p>
                  </div>
                )}

                {isUnlocked && (
                  <p className="pt-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    You’ve met all requirements for this tier.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
