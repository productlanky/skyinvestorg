"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { 
  LayoutDashboard, Receipt, Target, PieChart, Activity, 
  LineChart, Users, Bot, Zap, PlusCircle, MinusCircle, 
  User, Network, Headphones, LogOut, Wallet, ShieldAlert, LucideIcon // Added ShieldAlert
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { fetchTeslaPrice } from "@/lib/appwrite/auth"; 

// --- TYPESCRIPT INTERFACES ---
interface NavBadge {
  text: string;
  color: string;
  pulse?: boolean; 
}

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  badge?: NavBadge;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

// --- BASE NAVIGATION DATA STRUCTURE ---
const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Account Statement", path: "/transactions", icon: Receipt },
    ]
  },
  {
    title: "Portfolio & Investments",
    items: [
      { name: "Investment Plans", path: "/investments", icon: Target },
      { name: "My Portfolio", path: "/logs", icon: PieChart },
      { name: "Market History", path: "/sharelogs", icon: Activity },
    ]
  },
  {
    title: "Trading & Markets",
    items: [
      { name: "Live Markets", path: "/trading-market", icon: LineChart, badge: { text: "LIVE", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30", pulse: true } },
      { name: "Copy Trading", path: "/copy-trading", icon: Users, badge: { text: "PRO", color: "text-purple-500 bg-purple-500/10 border-purple-500/30" } },
      { name: "AI Trading Bots", path: "/bot-trading", icon: Bot, badge: { text: "AI", color: "text-blue-500 bg-blue-500/10 border-blue-500/30" } },
       { name: "Shares", path: "/shares", icon: Zap, badge: { text: "TSLA", color: "text-red-500 bg-red-500/10 border-red-500/30" } },
    ]
  },
  {
    title: "Wallet & Funds",
    items: [
      { name: "Deposit Funds", path: "/deposit", icon: PlusCircle },
      { name: "Withdraw Funds", path: "/withdraw", icon: MinusCircle }, 
    ]
  }, 
  {
    title: "Account Management",
    items: [
      { name: "Profile Settings", path: "/profile", icon: User },
    ]
  },
  {
    title: "Growth & Rewards",
    items: [
      { name: "Referral Program", path: "/referral", icon: Network, badge: { text: "5%", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" } },
    ]
  },
  {
    title: "Support & Help",
    items: [
      { name: "Support Center", path: "/support", icon: Headphones },
    ]
  }
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, setIsMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  
  // --- FINANCIAL & USER STATES ---
  const [profile, setProfile] = useState<any>(null);
  const [sharePrice, setSharePrice] = useState(0);
  const [totalShares, setTotalShares] = useState(0);

  // --- REAL-TIME MASTER SYNC ---
  useEffect(() => {
    let isMounted = true;

    fetchTeslaPrice()
        .then(price => { if (isMounted) setSharePrice(parseFloat(price)); })
        .catch(err => console.error("Market Feed Error:", err));

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (!user) return;

        const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
            if (docSnap.exists()) setProfile(docSnap.data());
        });

        const qStocks = query(collection(db, "stockLogs"), where("userId", "==", user.uid));
        const unsubStocks = onSnapshot(qStocks, (snapshot) => {
            let sharesCount = 0;
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.type === 'buy') sharesCount += Number(data.shares || 0);
                if (data.type === 'sell') sharesCount -= Number(data.shares || 0);
            });
            setTotalShares(sharesCount);
        });

        return () => { unsubProfile(); unsubStocks(); };
    });

    return () => {
        isMounted = false;
        unsubscribeAuth();
    };
  }, []);

  // --- MASTER BALANCE CALCULATION ---
  const currentDeposit = profile?.totalDeposit !== undefined ? Number(profile.totalDeposit) : Number(profile?.balance || 0);
  const currentProfit = Number(profile?.profit || 0);
  const totalSharesValue = totalShares * sharePrice;
  const grossEquity = currentDeposit + currentProfit + totalSharesValue;

  // --- ROLE VERIFICATION ---
  const isAdmin = profile?.role === "admin" || profile?.role === "super_admin";

  // --- DYNAMIC NAVIGATION BUILDER ---
  const displayGroups = [...NAV_GROUPS];
  
  // If the user is an admin, inject the Control Panel group at the bottom
  if (isAdmin) {
    displayGroups.push({
      title: "System Administration",
      items: [
        { 
          name: "Control Panel", 
          path: "/controlPanel", 
          icon: ShieldAlert, 
          badge: { text: "SYS", color: "text-rose-500 bg-rose-500/10 border-rose-500/30", pulse: true } 
        }
      ]
    });
  }

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const isActive = (path: string) => pathname.startsWith(path);
  const isSidebarOpen = isExpanded || isHovered || isMobileOpen;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 flex h-screen flex-col 
          bg-white dark:bg-[#0D1117] text-slate-900 dark:text-gray-100 
          border-r border-slate-200 dark:border-white/5 shadow-2xl lg:shadow-none
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-[280px]" : "w-[80px] -translate-x-full lg:translate-x-0"}
          ${isMobileOpen ? "translate-x-0" : ""}
        `}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* --- BRAND LOGO --- */}
        <div className="h-20 flex items-center justify-center border-b border-slate-200 dark:border-white/5 relative bg-slate-50 dark:bg-white/[0.02]">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-brand-600 flex items-center justify-center shadow-[0_0_15px_rgba(31,149,201,0.3)] transition-transform">
              <span className="text-white font-black text-xl italic">S</span>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                  SkyInvest<span className="text-brand-500">Org</span>
                </span>
                <span className="text-[9px] font-mono text-slate-500 dark:text-gray-500 tracking-[0.3em] uppercase mt-1">Terminal</span>
              </div>
            )}
          </Link>
        </div>

        {/* --- DYNAMIC USER PROFILE & GROSS EQUITY --- */}
        {isSidebarOpen && (
          <div className="p-5 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-12 h-12 flex items-center justify-center text-slate-700 dark:text-white font-black text-lg border shadow-inner ${isAdmin ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' : 'bg-slate-200 dark:bg-white/10 border-slate-300 dark:border-white/20'}`}>
                  {profile?.firstName?.charAt(0) || "O"}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white dark:border-[#0D1117] ${isAdmin ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-black text-slate-900 dark:text-white truncate uppercase tracking-widest flex items-center gap-1">
                  {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : "Operator"}
                </h2>
                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-800 dark:text-slate-200">
                    <Wallet size={10} className="text-brand-500" />
                    <span>${grossEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <span className={`text-[8px] font-mono uppercase tracking-widest mt-0.5 ${isAdmin ? 'text-rose-500' : 'text-slate-400'}`}>
                    {isAdmin ? 'System Admin' : 'Gross Equity'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- NAVIGATION MENU --- */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-6 space-y-8">
          {displayGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="px-4">
              {isSidebarOpen && (
                <h3 className="mb-3 px-3 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  // Use startsWith so child routes like /controlPanel/profiles/[id] also highlight the parent link
                  const active = isActive(item.path); 

                  return (
                    <li key={itemIdx}>
                      <Link
                        href={item.path}
                        className={`
                          group flex items-center px-3 py-3 transition-all duration-200
                          ${active 
                            ? "bg-brand-500/10 border-l-2 border-brand-500 text-brand-600 dark:text-brand-400" 
                            : "border-l-2 border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"}
                          ${!isSidebarOpen ? "justify-center" : ""}
                        `}
                      >
                        <Icon size={18} className={`shrink-0 ${active ? "text-brand-500" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white"}`} />
                        
                        {isSidebarOpen && (
                          <span className="ml-3 text-xs font-bold tracking-wide">
                            {item.name}
                          </span>
                        )}

                        {isSidebarOpen && item.badge && (
                          <span className={`ml-auto flex items-center px-2 py-0.5 text-[9px] font-mono font-bold border ${item.badge.color}`}>
                            {item.badge.pulse && <div className={`w-1.5 h-1.5 rounded-full animate-pulse mr-1.5 ${item.badge.text === 'SYS' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>}
                            {item.badge.text}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* --- FOOTER ACTIONS --- */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
          <button
            onClick={handleSignOut}
            className={`
              flex items-center w-full px-3 py-3 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors
              ${!isSidebarOpen ? "justify-center" : ""}
            `}
          >
            <LogOut size={18} className="shrink-0" />
            {isSidebarOpen && <span className="ml-3 text-xs font-bold tracking-wide uppercase">Terminate Session</span>}
          </button>
        </div>

      </aside>
    </>
  );
};

export default AppSidebar;