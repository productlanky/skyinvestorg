"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar"; // Note: You might want an AdminSidebar later
import Backdrop from "@/layout/Backdrop";
import { Terminal, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[280px]"
      : "lg:ml-[80px]";

  // --- STRICT SECURITY STATE ---
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      // 1. NO SESSION -> Eject to Login
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        // 2. FETCH PROFILE DATA
        const profileRef = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
            const data = profileSnap.data();
            
            // 3. STRICT ROLE VERIFICATION
            if (data.role === "admin" || data.role === "super_admin") {
                setIsAdmin(true);
                setIsVerifying(false);
            } else {
                // Eject standard users trying to access admin routes
                console.warn("SECURITY_BREACH_ATTEMPT: Unauthorized node access.");
                toast.error("UNAUTHORIZED: Administrator clearance required.");
                router.replace("/dashboard"); 
            }
        } else {
            // Profile missing -> Eject
            router.replace("/login");
        }
      } catch (error) {
          console.error("Verification Error:", error);
          toast.error("SYS_ERR: Verification protocol failed.");
          router.replace("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  // --- SECURITY HOLDING PATTERN (LOADING STATE) ---
  if (isVerifying) {
    return (
        <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
            <div className="flex items-center gap-3 text-brand-500">
                <Terminal size={16} className="animate-pulse" />
                <p className="text-xs font-mono font-bold uppercase tracking-[0.4em] animate-pulse">
                    Verifying_Admin_Clearance...
                </p>
            </div>
        </div>
    );
  }

  // --- RENDER COMMAND CENTER IF CLEARED ---
  if (!isAdmin) return null; // Failsafe fallback

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090C10] xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        
        {/* Header */}
        <AppHeader />
        
        {/* Admin Warning Banner (Optional but recommended) */}
        <div className="w-full bg-rose-500/10 border-b border-rose-500/20 px-6 py-2 flex items-center justify-center gap-2">
            <ShieldAlert size={14} className="text-rose-500" />
            <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-[0.2em]">
                Administrator_Override_Active
            </span>
        </div>

        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 animate-in fade-in duration-500">
            {children}
        </div>

      </div>
    </div>
  );
}