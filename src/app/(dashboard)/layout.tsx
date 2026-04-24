"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

interface ProfileData {
  uid: string;
  suspended?: boolean | string; // Catches if it was saved as a string "true"
  status?: string; // Catches if you saved it as status: "suspended"
  role?: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Sidebar Logic for Margin Shift
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[280px]"
      : "lg:ml-[80px]";

  // 2. Firebase Session & REAL-TIME Profile Handshake
  useEffect(() => {
    let unsubscribeProfile: () => void; // Variable to hold the snapshot listener

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setSessionUser(null);
        setProfile(null);
        setLoading(false);
        router.replace("/login");

        // Clean up the profile listener if they log out
        if (unsubscribeProfile) unsubscribeProfile();
        return;
      }

      setSessionUser(user);

      try {
        // --- THE MAGIC: onSnapshot for Real-Time Updates ---
        const profileRef = doc(db, "profiles", user.uid);

        unsubscribeProfile = onSnapshot(profileRef, (profileSnap) => {
          if (profileSnap.exists()) {
            setProfile(profileSnap.data() as ProfileData);
          } else {
            setProfile(null);
          }
          setLoading(false); // Stop loading once the first snapshot arrives
        }, (err) => {
          console.error("Critical Terminal Access Error:", err);
          setLoading(false);
        });

      } catch (err) {
        console.error("Initialization Error:", err);
        setLoading(false);
      }
    });

    // Cleanup function when the component unmounts
    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, [router]);

  // --- BULLETPROOF SUSPENSION CHECK ---
  // This catches booleans, strings, and status text fields just in case!
  const isSuspended =
    profile?.suspended === true ||
    String(profile?.suspended).toLowerCase() === "true" ||
    profile?.status?.toLowerCase() === "suspended";

  // 3. Security Redirection Logic
  useEffect(() => {
    if (loading) return;

    // Check for suspended status using our catch-all variable
    if (isSuspended && pathname !== "/suspended") {
      router.replace("/suspended");
    }
  }, [loading, isSuspended, pathname, router]);

  // Prevent UI Flickering during authentication handshake
  if (loading || !sessionUser || (isSuspended && pathname !== "/suspended")) {
    return (
      <div className="h-screen w-full bg-white dark:bg-[#020305] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] animate-pulse">
            Authenticating_Session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020305] transition-colors duration-300 xl:flex">
      {/* Institutional Sidebar Component */}
      <AppSidebar />

      {/* Mobile Overlay */}
      <Backdrop />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* System Header */}
        <AppHeader />

        {/* Main Operational View */}
        <main className="flex-1 p-4 mx-auto w-full max-w-[1600px] md:p-6 lg:p-8">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </div>
        </main>

        {/* Optional: Status Footer */}
        <footer className="px-8 py-4 border-t border-slate-200 dark:border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-400 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Network_Stable</span>
          </div>
          <div>SkyInvestOrg v3.0.4</div>
        </footer>
      </div>
    </div>
  );
}