"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  User, Settings, LifeBuoy, LogOut, ShieldCheck, 
  ChevronDown, Fingerprint, Activity 
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photo_url?: string;
  role?: string;
}

export default function UserDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Real-time listener for the user's profile
      const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            id: docSnap.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            photo_url: data.photo_url,
            role: data.role || "user",
          });
        }
        setLoading(false);
      });

      return () => unsubProfile();
    });

    return () => unsubscribeAuth();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("TERMINAL_OFFLINE: Session terminated.");
      router.push("/login");
    } catch (error) {
      toast.error("SIGNOUT_FAILURE: Node remains active.");
    }
  };

  const isAdmin = profile?.role === "admin";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1117] transition-colors hover:border-brand-500 group"
      >
        {/* SHARP AVATAR */}
        <div className="h-9 w-9 border border-slate-200 dark:border-white/10 overflow-hidden bg-slate-50 dark:bg-white/5 flex items-center justify-center">
          {profile?.photo_url ? (
            <Image
              width={36}
              height={36}
              src={profile.photo_url}
              alt="User"
              className="object-cover grayscale group-hover:grayscale-0 transition-all"
            />
          ) : (
            <User size={18} className="text-slate-400" />
          )}
        </div>

        <div className="hidden md:flex flex-col items-start pr-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none">
            {profile?.firstName || "SYNCING..."}
          </span>
          <span className="text-[8px] font-mono font-bold text-brand-500 uppercase tracking-tighter mt-1">
            {isAdmin ? "LEVEL_ADMIN" : "LEVEL_USER"}
          </span>
        </div>

        <ChevronDown 
          size={14} 
          className={`text-slate-400 transition-transform duration-300 mr-1 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* User Info Header */}
            <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-brand-500/5 border border-brand-500/20">
                        <Fingerprint size={16} className="text-brand-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
                            {profile?.firstName} {profile?.lastName}
                        </p>
                        <p className="text-[9px] font-mono text-slate-500 lowercase truncate max-w-[150px]">
                            {profile?.email}
                        </p>
                    </div>
                </div>
                {isAdmin && (
                    <div className="flex items-center gap-2 px-2 py-1 bg-brand-500/10 border border-brand-500/20">
                        <Activity size={10} className="text-brand-500" />
                        <span className="text-[8px] font-black text-brand-500 uppercase tracking-widest">Admin_Access_Privileges</span>
                    </div>
                )}
            </div>

            {/* Menu Links */}
            <div className="p-2 flex flex-col gap-1">
                <MenuLink href="/profile" icon={<User size={14}/>} label="User Profile" onClick={() => setIsOpen(false)} />
                <MenuLink href="/settings" icon={<Settings size={14}/>} label="Security Specs" onClick={() => setIsOpen(false)} />
                <MenuLink href="/support" icon={<LifeBuoy size={14}/>} label="Terminal Help" onClick={() => setIsOpen(false)} />
                
                {isAdmin && (
                    <MenuLink 
                        href="/controlPanel" 
                        icon={<ShieldCheck size={14}/>} 
                        label="Admin Panel" 
                        onClick={() => setIsOpen(false)}
                        isSpecial
                    />
                )}
            </div>

            {/* Footer / Signout */}
            <div className="p-2 border-t border-slate-100 dark:border-white/5">
                <button
                    onClick={handleSignOut}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-colors"
                >
                    Sign_Out_Protocol
                    <LogOut size={14} />
                </button>
            </div>

            {/* Decorative Detail */}
            <div className="absolute bottom-0 right-0 p-1">
                <div className="w-1 h-1 bg-brand-500/20"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// --- HELPER COMPONENT ---
function MenuLink({ href, icon, label, onClick, isSpecial = false }: any) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all
                ${isSpecial 
                    ? "text-brand-500 bg-brand-500/5 border border-brand-500/10 hover:bg-brand-500/10" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                }
            `}
        >
            <span className="opacity-70">{icon}</span>
            {label}
        </Link>
    );
}