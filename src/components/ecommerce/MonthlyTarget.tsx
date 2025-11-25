"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "@/icons";
import { Skeleton } from "../ui/skeleton";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface MonthlyTargetProps {
  tierName: string;
  referralCount: number;
  activeInvestments: number;
  loading: boolean;
}

export default function MonthlyTarget({
  tierName,
  referralCount,
  activeInvestments,
  loading,
}: MonthlyTargetProps) {
  const TARGET_REFERRALS = 10;
  const progress =
    TARGET_REFERRALS > 0
      ? Math.min((referralCount / TARGET_REFERRALS) * 100, 100)
      : 0;

  const series = [progress];
  const [isOpen, setIsOpen] = useState(false);

  // Neutral chart options (work in both themes)
  const options: ApexOptions = useMemo(
    () => ({
      colors: ["#4F46E5"],
      chart: {
        fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont",
        type: "radialBar",
        height: 260,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: "78%",
          },
          track: {
            background: "#E5E7EB", // neutral gray track (works light + dark)
            strokeWidth: "100%",
            margin: 5,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: "30px",
              fontWeight: 600,
              offsetY: -25,
              color: "#111827", // good contrast on light; still visible on dark
              formatter(val) {
                return `${val.toFixed(0)}%`;
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.4,
          gradientToColors: ["#22C55E"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Progress"],
    }),
    []
  );

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-800 dark:bg-slate-950 dark:text-slate-50">
      <div className="px-5 pt-5 pb-8 sm:px-6 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly progress
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Grow your tier by inviting new users and keeping investments
              active.
            </p>
          </div>
          <div className="relative inline-block">
            <button onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem onItemClick={closeDropdown}>
                View details
              </DropdownItem>
              <DropdownItem onItemClick={closeDropdown}>
                Hide widget
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div className="relative mt-4">
          <div className="max-h-[260px] rounded-2xl bg-gray-50 px-3 pb-4 pt-4 dark:bg-slate-900">
            {loading ? (
              <Skeleton className="w-full h-[220px] rounded-full" />
            ) : (
              <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                height={220}
              />
            )}
          </div>

          {!loading && (
            <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              {progress.toFixed(0)}% of referral goal
            </span>
          )}
        </div>

        {!loading && (
          <p className="mt-7 text-center text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            You are currently in the{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {tierName}
            </span>{" "}
            tier with{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {referralCount}
            </span>{" "}
            referrals and{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {activeInvestments}
            </span>{" "}
            active investments.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 px-6 py-4 border-t border-gray-100 dark:border-gray-800 sm:gap-10">
        <div className="text-center">
          <p className="mb-1 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Tier
          </p>
          {loading ? (
            <Skeleton className="h-5 w-20 mx-auto" />
          ) : (
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {tierName}
            </p>
          )}
        </div>

        <div className="h-7 w-px bg-gray-200 dark:bg-gray-800" />

        <div className="text-center">
          <p className="mb-1 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Referrals
          </p>
          {loading ? (
            <Skeleton className="h-5 w-10 mx-auto" />
          ) : (
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {referralCount}
            </p>
          )}
        </div>

        <div className="h-7 w-px bg-gray-200 dark:bg-gray-800" />

        <div className="text-center">
          <p className="mb-1 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Active investments
          </p>
          {loading ? (
            <Skeleton className="h-5 w-10 mx-auto" />
          ) : (
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {activeInvestments}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
