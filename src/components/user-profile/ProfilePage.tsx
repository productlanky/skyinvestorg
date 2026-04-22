"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, ShieldCheck, MapPin, Key, Fingerprint, Activity } from "lucide-react";

// --- CUSTOM UI COMPONENTS ---
import UserMetaCard from "./UserMetaCard";
import UserInfoCard from "./UserInfoCard";
import UserAddressCard from "./UserAddressCard";
import SetWithdrawalPassword from "./SetWithdrawalPassword";
import KYCUpload from "./KycUpload";
import Loading from "../ui/Loading";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export interface ProfileType {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    address: string;
    gender: string;
    dob: string;
    tiers?: { name: string };
    referral_code: string;
    referred_by: string | null;
    photo_url: string | null;
    created_at: string;
    tier_level: number;
    withdrawal_password?: string | null;
    refresh: () => void;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const syncProfile = useCallback(() => {
        setLoading(true);

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace("/login");
                return;
            }

            // --- REAL-TIME PROFILE NODE LISTENER ---
            const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();

                    // --- BULLETPROOF DATE PARSING ---
                    // Prevents "TypeError: toDate is not a function" from legacy string dates
                    let parsedDate = new Date().toISOString(); 
                    if (data.createdAt) {
                        if (typeof data.createdAt.toDate === 'function') {
                            // Modern Firebase Timestamp
                            parsedDate = data.createdAt.toDate().toISOString();
                        } else if (typeof data.createdAt === 'string' || typeof data.createdAt === 'number') {
                            // Legacy Appwrite String or Unix Number
                            const dateObj = new Date(data.createdAt);
                            if (!isNaN(dateObj.getTime())) {
                                parsedDate = dateObj.toISOString();
                            }
                        }
                    }

                    setProfile({
                        id: docSnap.id,
                        first_name: data.firstName || "",
                        last_name: data.lastName || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        country: data.country || "",
                        state: data.state || "",
                        city: data.city || "",
                        zip: data.zip || "",
                        address: data.address || "",
                        gender: data.gender || "",
                        dob: data.dob || "",
                        referral_code: data.refereeId || "",
                        referred_by: data.referredBy || null,
                        photo_url: data.photo_url || null,
                        created_at: parsedDate,
                        tier_level: data.tierLevel || 1,
                        withdrawal_password: data.withdrawalPassword || null,
                        refresh: syncProfile,
                    });
                } else {
                    console.error("SYS_ERR: Profile node not found in registry.");
                }
                setLoading(false);
            }, (error) => {
                console.error("Profile Sync Error:", error);
                setLoading(false);
            });

            return () => unsubProfile();
        });

        return () => unsubscribeAuth();
    }, [router]);

    useEffect(() => {
        syncProfile();
    }, [syncProfile]);

    if (loading) return <Loading />;
    if (!profile) return (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
            <Activity className="text-red-500 animate-pulse" size={32} />
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-500">ERR_SYNC_FAILED: UNABLE_TO_LOCATE_PROFILE</div>
        </div>
    );

    return (
        <div className="space-y-6 pb-20 animate-in fade-in duration-500">

            {/* 1. Profile Header Protocol */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-10">IDENTITY_NODE</div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 border border-brand-500/20 bg-brand-500/5 shrink-0">
                        <Fingerprint className="text-brand-500" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Account Parameters</h1>
                        <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">Manage system coordinates and security protocols.</p>
                    </div>
                </div>
            </div>

            {/* 2. Configuration Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* Left Section: Meta & Basic Info */}
                <div className="xl:col-span-8 space-y-6">
                    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center gap-2">
                            <User size={14} className="text-brand-500" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white">Primary_Metadata</span>
                        </div>
                        <UserMetaCard {...profile} />
                    </div>

                    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center gap-2">
                            <ShieldCheck size={14} className="text-brand-500" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white">Biological_Data</span>
                        </div>
                        <UserInfoCard {...profile} />
                    </div>

                    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center gap-2">
                            <MapPin size={14} className="text-brand-500" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white">Geographic_Coordinates</span>
                        </div>
                        <UserAddressCard {...profile} refresh={syncProfile} />
                    </div>
                </div>

                {/* Right Section: Security & Verification */}
                <div className="xl:col-span-4 space-y-6">

                    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center gap-2">
                            <Key size={14} className="text-brand-500" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white">Withdrawal_Protocol</span>
                        </div>
                        <div className="p-6">
                            <SetWithdrawalPassword
                                refresh={syncProfile}
                                hasPassword={!!profile.withdrawal_password}
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center gap-2">
                            <ShieldCheck size={14} className="text-brand-500" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-white">KYC_Verification</span>
                        </div>
                        <div className="p-6">
                            <KYCUpload />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}