import { TrophyIcon, TrendingUp, UsersRound } from "lucide-react";

interface TierProgressProps {
  totalDeposits: number;
  totalReferrals: number;
  activeTier: {
    name: string;
    boost: number;
  };
}

export default function TierProgressCard({
  totalDeposits,
  totalReferrals,
  activeTier,
}: TierProgressProps) {
  const cardBase =
    "flex items-center gap-4 rounded-2xl border border-white/40 dark:border-white/10 " +
    "bg-white/80 dark:bg-slate-950/60 backdrop-blur-xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] " +
    "dark:shadow-[0_0_30px_rgba(15,23,42,0.6)] px-5 py-5 md:px-6 md:py-6 transition";

  const iconBase =
    "flex items-center justify-center w-12 h-12 rounded-xl shadow-sm " +
    "dark:shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Deposits */}
      <div className={cardBase}>
        <div
          className={`${iconBase} bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300`}
        >
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Total Deposits
          </span>
          <h4 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            ${totalDeposits.toLocaleString()}
          </h4>
        </div>
      </div>

      {/* Referrals */}
      <div className={cardBase}>
        <div
          className={`${iconBase} bg-blue-100/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300`}
        >
          <UsersRound className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Referrals
          </span>
          <h4 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            {totalReferrals}
          </h4>
        </div>
      </div>

      {/* Tier */}
      <div className={cardBase}>
        <div
          className={`${iconBase} bg-amber-100/80 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300`}
        >
          <TrophyIcon className="w-6 h-6" />
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Active Tier
          </span>

          <div className="flex items-baseline gap-2 mt-1">
            <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {activeTier.name}
            </h4>

            <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/10 text-amber-700 font-medium dark:bg-amber-500/20 dark:text-amber-300">
              +{activeTier.boost}% Boost
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
