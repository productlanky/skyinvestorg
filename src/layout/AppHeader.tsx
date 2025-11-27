"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useRouter } from "next/navigation";
import {
  Command,
  Search,
  Zap,
  ArrowRight,
  X,
  LayoutDashboard,
  Wallet,
  Banknote,
  BarChart3,
  Gift,
  Users,
  Settings,
} from "lucide-react";

type CommandItem = {
  label: string;
  description?: string;
  href: string;
  group: "Navigation" | "Quick actions" | "Support";
  icon: React.ReactNode;
};

const COMMAND_ITEMS: CommandItem[] = [
  // Navigation
  {
    label: "Dashboard",
    description: "Overview of your balances and performance",
    href: "/dashboard",
    group: "Navigation",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Investments",
    description: "View and manage your investment plans",
    href: "/investments",
    group: "Navigation",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    label: "Shares",
    description: "View and manage Tesla shares",
    href: "/shares",
    group: "Navigation",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    label: "Transactions",
    description: "View deposits & withdrawals history",
    href: "/transactions",
    group: "Navigation",
    icon: <Wallet className="w-4 h-4" />,
  },
  // Quick actions
  {
    label: "Deposit funds",
    description: "Start a new deposit",
    href: "/deposit",
    group: "Quick actions",
    icon: <Wallet className="w-4 h-4" />,
  },
  {
    label: "Withdraw funds",
    description: "Request a withdrawal",
    href: "/withdraw",
    group: "Quick actions",
    icon: <Banknote className="w-4 h-4" />,
  },
  {
    label: "Buy shares",
    description: "Buy Tesla shares",
    href: "/shares",
    group: "Quick actions",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    label: "Invite friends",
    description: "View your referral link & rewards",
    href: "/referral",
    group: "Quick actions",
    icon: <Users className="w-4 h-4" />,
  },
  // Support
  // {
  //   label: "Support",
  //   description: "Get help with your account",
  //   href: "/support",
  //   group: "Support",
  //   icon: <HelpCircle className="w-4 h-4" />,
  // },
  {
    label: "Account settings",
    description: "Profile & security preferences",
    href: "/profile",
    group: "Support",
    icon: <Settings className="w-4 h-4" />,
  },
];

const AppHeader: React.FC = () => {
  const router = useRouter();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commandInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = COMMAND_ITEMS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  });

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen((prev) => !prev);
  };

  const openCommand = () => {
    setIsCommandOpen(true);
    setQuery("");
    // focus after small delay to ensure DOM is ready
    setTimeout(() => {
      commandInputRef.current?.focus();
    }, 10);
  };

  const closeCommand = () => {
    setIsCommandOpen(false);
    setQuery("");
  };

  const handleCommandSelect = (item: CommandItem) => {
    closeCommand();
    router.push(item.href);
  };

  const toggleQuickActions = () => {
    setIsQuickActionsOpen((prev) => !prev);
  };

  // Cmd/Ctrl + K global listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isCommandOpen) {
          closeCommand();
        } else {
          openCommand();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCommandOpen]);

  // Close overlays on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsQuickActionsOpen(false);
        closeCommand();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
        <div className="flex flex-col items-center justify-between w-full xl:flex-row lg:px-6">
          {/* Left side: logo + sidebar toggle + search trigger (mobile) */}
          <div className="flex items-center justify-between w-full xl:w-fit gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 lg:border-b-0 lg:px-0 lg:py-3">
            {/* Sidebar toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={handleToggleSidebar}
              aria-label="Toggle sidebar"
            >
              {isMobileOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 16 12"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                  />
                </svg>
              )}
            </button>

            {/* Mobile logo */}
            <Link href="/" className="lg:hidden">
              <div className="flex items-center gap-2 logo">
                <div className="logo-badge shrink-0">⚡</div>
                <div className="logo-text">
                  <span className="logo-text-main">Flash Profits</span>
                  <span className="logo-text-sub text-[10px]!">Automated investing</span>
                </div>
              </div>
            </Link>

            {/* Search / Command trigger (desktop) */}
            <div className="hidden lg:block flex-1 pl-3">
              <button
                type="button"
                onClick={openCommand}
                className="
                  group relative flex h-11  items-center rounded-lg border 
                  border-gray-200 bg-white/60 pl-10 pr-20 text-left text-sm 
                  text-gray-600 shadow-theme-xs transition
                  hover:border-brand-500/70 hover:bg-white
                  dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300
                  dark:hover:border-brand-500/70 w-fit
                "
              >
                <span className="pointer-events-none absolute left-3 text-gray-400 dark:text-gray-500">
                  <Search className="w-4 h-4" />
                </span>
                <span className="truncate">
                  Search pages, actions or type <span className="font-medium">“deposit”</span>…
                </span>
                <span className="pointer-events-none absolute right-2.5 inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                  <span className="font-semibold">⌘</span>
                  <span>K</span>
                </span>
              </button>
            </div>

            {/* Mobile application menu toggle */}
            <button
              onClick={toggleApplicationMenu}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 xl:hidden"
            >
              <Command className="w-5 h-5" />
            </button>
          </div>

          {/* Right side (actions) */}
          <div
            className={`${isApplicationMenuOpen ? "flex" : "hidden"
              } w-full items-center justify-between gap-3 px-5 py-3 shadow-theme-md xl:flex xl:w-auto xl:justify-end xl:px-0 xl:py-0 xl:shadow-none`}
          >
            <div className="flex items-center gap-2 2xsm:gap-3">
              {/* Quick actions */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={toggleQuickActions}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/5 px-3 text-xs font-medium text-brand-700 shadow-sm hover:bg-brand-500/10 dark:border-brand-400/40 dark:bg-brand-500/10 dark:text-brand-200"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Quick actions
                </button>

                {isQuickActionsOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-3 text-sm shadow-xl dark:border-gray-800 dark:bg-gray-900">
                    <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Quick actions
                    </p>
                    <ul className="space-y-1">
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            setIsQuickActionsOpen(false);
                            router.push("/deposit");
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <span className="flex items-center gap-2">
                            <Wallet className="w-4 h-4 text-brand-500" />
                            <span>Deposit funds</span>
                          </span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            setIsQuickActionsOpen(false);
                            router.push("/withdraw");
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <span className="flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-brand-500" />
                            <span>Withdraw funds</span>
                          </span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            setIsQuickActionsOpen(false);
                            router.push("/shares");
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <span className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-brand-500" />
                            <span>Buy shares</span>
                          </span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            setIsQuickActionsOpen(false);
                            router.push("/referral");
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <span className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-brand-500" />
                            <span>Referral rewards</span>
                          </span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Theme toggle */}
              <ThemeToggleButton />

              {/* Notifications */}
              <NotificationDropdown />
            </div>

            {/* User */}
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Command palette modal */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-4 pt-24 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center border-b border-gray-100 px-3 py-2.5 text-sm dark:border-gray-800">
              <Search className="mr-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                ref={commandInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                placeholder="Search anything…"
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={closeCommand}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[360px] overflow-y-auto py-2">
              {["Navigation", "Quick actions", "Support"].map((group) => {
                const groupItems = filteredItems.filter(
                  (item) => item.group === group
                );
                if (!groupItems.length) return null;

                return (
                  <div key={group}>
                    <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                      {group}
                    </p>
                    <ul className="px-1">
                      {groupItems.map((item) => (
                        <li key={`${group}-${item.label}`}>
                          <button
                            type="button"
                            onClick={() => handleCommandSelect(item)}
                            className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <span className="flex items-center gap-2">
                              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                                {item.icon}
                              </span>
                              <span className="flex flex-col">
                                <span className="font-medium text-gray-800 dark:text-gray-100">
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                    {item.description}
                                  </span>
                                )}
                              </span>
                            </span>
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {!filteredItems.length && (
                <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  No matches found. Try a different keyword.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2 text-[11px] text-gray-500 dark:border-gray-800 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>
                  Press <span className="font-semibold">Esc</span> to close
                </span>
              </span>
              <span className="hidden md:inline-flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Wallet className="w-3 h-3" />
                  <span>Deposit</span>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>Referrals</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;
