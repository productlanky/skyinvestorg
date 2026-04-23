"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useRouter } from "next/navigation";
import {
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
  Menu,
  Terminal
} from "lucide-react";

type CommandItem = {
  label: string;
  description?: string;
  href: string;
  group: "Navigation" | "Quick actions" | "Support";
  icon: React.ReactNode;
};

const COMMAND_ITEMS: CommandItem[] = [
  { label: "Dashboard", description: "Overview of your balances and performance", href: "/dashboard", group: "Navigation", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Investments", description: "View and manage your investment plans", href: "/investments", group: "Navigation", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Shares", description: "View and manage Tesla shares", href: "/shares", group: "Navigation", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Transactions", description: "View deposits & withdrawals history", href: "/transactions", group: "Navigation", icon: <Wallet className="w-4 h-4" /> },
  { label: "Deposit funds", description: "Start a new deposit", href: "/deposit", group: "Quick actions", icon: <Wallet className="w-4 h-4" /> },
  { label: "Withdraw funds", description: "Request a withdrawal", href: "/withdraw", group: "Quick actions", icon: <Banknote className="w-4 h-4" /> },
  { label: "Buy shares", description: "Buy Tesla shares", href: "/shares", group: "Quick actions", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Invite friends", description: "View your referral link & rewards", href: "/referral", group: "Quick actions", icon: <Users className="w-4 h-4" /> },
  { label: "Account settings", description: "Profile & security preferences", href: "/profile", group: "Support", icon: <Settings className="w-4 h-4" /> },
];

export default function AppHeader() {
  const router = useRouter();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commandInputRef = useRef<HTMLInputElement>(null);

  // --- MISSING FUNCTION ADDED HERE ---
  const toggleQuickActions = () => setIsQuickActionsOpen((prev) => !prev);

  const filteredItems = COMMAND_ITEMS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.label.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
  });

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const openCommand = () => {
    setIsCommandOpen(true);
    setQuery("");
    setTimeout(() => { commandInputRef.current?.focus(); }, 10);
  };

  const closeCommand = () => {
    setIsCommandOpen(false);
    setQuery("");
  };

  const handleCommandSelect = (item: CommandItem) => {
    closeCommand();
    router.push(item.href);
  };

  // Global Cmd+K Listener
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

  // Escape Listener
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
      <header className="sticky top-0 z-40 flex w-full border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0D1117] h-20 items-center transition-colors duration-300">
        <div className="flex flex-col items-center justify-between w-full xl:flex-row lg:px-8">

          {/* LEFT SIDE: Sidebar Toggle & Search Trigger */}
          <div className="flex items-center justify-between w-full xl:w-fit gap-4 px-4 py-3 lg:px-0 lg:py-0 border-b border-slate-200 dark:border-white/5 xl:border-none">

            <button
              onClick={handleToggleSidebar}
              className="flex h-10 w-10 items-center justify-center border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-600 flex items-center justify-center">
                <span className="text-white font-black text-lg italic">S</span>
              </div>
              <span className="text-sm font-black text-slate-900 dark:text-white tracking-tighter uppercase">SkyInvest</span>
            </Link>

            {/* Desktop Search Trigger */}
            <div className="hidden lg:block flex-1 pl-4">
              <button
                type="button"
                onClick={openCommand}
                className="group relative flex h-11 w-96 items-center border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] pl-10 pr-4 text-left hover:border-brand-500/50 transition-colors"
              >
                <Search className="absolute left-3 w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest truncate">
                  Search Index or press...
                </span>
                <span className="absolute right-3 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-500 font-bold">⌘K</span>
                </span>
              </button>
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={openCommand}
              className="flex h-10 w-10 items-center justify-center border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 xl:hidden"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT SIDE: Quick Actions, Theme, User */}
          <div className="hidden xl:flex w-full items-center justify-end gap-4 px-5 py-3 xl:w-auto xl:px-0 xl:py-0">

            {/* Quick Actions Terminal Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={toggleQuickActions}
                className="inline-flex h-11 items-center gap-2 border border-brand-500/30 bg-brand-500/5 px-4 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest hover:bg-brand-500/10 transition-colors"
              >
                <Zap className="w-4 h-4" /> Operations
              </button>

              {isQuickActionsOpen && (
                <div className="absolute right-0 mt-2 w-64 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1117] shadow-2xl z-50">
                  <div className="p-3 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                    <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-brand-500">Fast_Execute</p>
                  </div>
                  <ul className="p-2 space-y-1">
                    {[
                      { icon: Wallet, label: "Deposit Funds", href: "/deposit" },
                      { icon: Banknote, label: "Withdraw Funds", href: "/withdraw" },
                      { icon: BarChart3, label: "Buy Shares", href: "/shares" },
                      { icon: Gift, label: "Referral Vault", href: "/referral" },
                    ].map((action, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => { setIsQuickActionsOpen(false); router.push(action.href); }}
                          className="flex w-full items-center justify-between p-3 text-left hover:bg-brand-500/10 hover:border-l-2 hover:border-brand-500 border-l-2 border-transparent transition-all group"
                        >
                          <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            <action.icon className="w-4 h-4" /> {action.label}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>

            <ThemeToggleButton />
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* --- COMMAND PALETTE MODAL (Brutalist Terminal Style) --- */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-24">
          <div className="w-full max-w-2xl bg-white dark:bg-[#0D1117] border border-brand-500/30 shadow-[0_0_50px_rgba(31,149,201,0.15)] flex flex-col relative overflow-hidden">

            {/* Terminal Top Bar */}
            <div className="absolute top-0 right-0 p-1.5 bg-brand-500/10 text-[8px] font-mono text-brand-500 border-l border-b border-brand-500/20 tracking-widest">
              CMD_SYS_V2
            </div>

            {/* Search Input */}
            <div className="flex items-center border-b border-slate-200 dark:border-white/10 p-5">
              <Search className="mr-3 h-5 w-5 text-brand-500 animate-pulse" />
              <input
                ref={commandInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="EXECUTE COMMAND..."
                className="flex-1 bg-transparent text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-widest outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
              <button
                onClick={closeCommand}
                className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-3 space-y-4">
              {["Navigation", "Quick actions", "Support"].map((group) => {
                const groupItems = filteredItems.filter((item) => item.group === group);
                if (!groupItems.length) return null;

                return (
                  <div key={group} className="border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01] p-2">
                    <p className="px-2 py-1.5 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-200 dark:border-white/5 mb-2">
                      {'//'} {group}
                    </p>
                    <ul className="space-y-1">
                      {groupItems.map((item) => (
                        <li key={item.label}>
                          <button
                            onClick={() => handleCommandSelect(item)}
                            className="flex w-full items-center justify-between p-3 text-left hover:bg-white dark:hover:bg-white/5 hover:border-l-2 hover:border-brand-500 border-l-2 border-transparent transition-all group"
                          >
                            <span className="flex items-center gap-4">
                              <span className="flex h-8 w-8 items-center justify-center bg-slate-200 dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 group-hover:text-brand-500 transition-colors">
                                {item.icon}
                              </span>
                              <span className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="text-[10px] font-mono text-slate-500">
                                    {item.description}
                                  </span>
                                )}
                              </span>
                            </span>
                            <span className="text-[9px] font-mono text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">EXECUTE ↵</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {!filteredItems.length && (
                <div className="py-12 flex flex-col items-center justify-center text-slate-500">
                  <Terminal size={32} className="mb-3 opacity-20" />
                  <span className="text-xs font-mono uppercase tracking-widest text-red-500">ERR_NO_MATCH_FOUND</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-brand-500/20 bg-slate-100 dark:bg-brand-500/5 p-4 text-[9px] font-mono uppercase tracking-widest text-slate-500">
              <span>Press <strong className="text-slate-900 dark:text-white">ESC</strong> to abort sequence</span>
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><Wallet className="w-3 h-3 text-brand-500" /> Capital Flow</span>
                <span className="flex items-center gap-1.5"><Users className="w-3 h-3 text-brand-500" /> Global Network</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}