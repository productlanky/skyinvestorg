"use client";

import Link from "next/link";
import {
  ArrowDownToLineIcon,
  ArrowUpFromLineIcon,
  BriefcaseIcon,
  UserIcon,
} from "lucide-react";
import { RiStockFill } from "react-icons/ri";

const links = [
  {
    href: "/deposit",
    label: "Deposit",
    description: "Add funds to your account",
    icon: <ArrowDownToLineIcon className="w-5 h-5" />,
    bg: "bg-blue-100 dark:bg-blue-600/20",
    iconColor: "text-blue-600 dark:text-blue-300",
  },
  {
    href: "/withdraw",
    label: "Withdraw",
    description: "Move funds out securely",
    icon: <ArrowUpFromLineIcon className="w-5 h-5" />,
    bg: "bg-red-100 dark:bg-red-600/20",
    iconColor: "text-red-600 dark:text-red-300",
  },
  {
    href: "/investments",
    label: "Invest",
    description: "Browse available plans",
    icon: <BriefcaseIcon className="w-5 h-5" />,
    bg: "bg-green-100 dark:bg-green-600/20",
    iconColor: "text-green-600 dark:text-green-300",
  },
  {
    href: "/shares",
    label: "Shares",
    description: "Manage your Tesla shares",
    icon: <RiStockFill className="w-5 h-5" />,
    bg: "bg-indigo-100 dark:bg-indigo-600/20",
    iconColor: "text-indigo-600 dark:text-indigo-300",
  },
  {
    href: "/profile",
    label: "Profile",
    description: "Update details & security",
    icon: <UserIcon className="w-5 h-5" />,
    bg: "bg-purple-100 dark:bg-purple-600/20",
    iconColor: "text-purple-600 dark:text-purple-300",
  },
];

export default function QuickLinks() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/90 p-5 sm:p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Quick actions
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Jump straight into the tasks you perform most frequently.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className="group flex flex-col items-start justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-left transition-all hover:-translate-y-[1px] hover:border-gray-200 hover:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-white/10 dark:hover:bg-white/[0.05]"
          >
            <div
              className={`flex items-center justify-center rounded-full p-2.5 ${link.bg}`}
            >
              <span className={link.iconColor}>{link.icon}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {link.label}
              </span>
              <p className="text-[11px] leading-snug text-gray-500 dark:text-gray-400">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
