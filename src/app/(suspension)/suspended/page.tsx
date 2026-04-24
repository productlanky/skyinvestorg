"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Terminal, Lock, ArrowRight } from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

interface FlashUser {
    name?: string;
    email?: string;
    reason?: string; 
}

export default function SuspendedPage() {
    const router = useRouter();
    const [user, setUser] = useState<FlashUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let unsubscribeProfile: () => void;

        const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const profileRef = doc(db, "profiles", firebaseUser.uid);
                    
                    unsubscribeProfile = onSnapshot(profileRef, (profileSnap) => {
                        if (profileSnap.exists()) {
                            const data = profileSnap.data();
                            
                            // --- REAL-TIME REDIRECT CHECK ---
                            const isSuspended = 
                                data.suspended === true || 
                                String(data.suspended).toLowerCase() === "true" || 
                                data.status?.toLowerCase() === "suspended";

                            // Instantly boot back to dashboard if unsuspended
                            if (!isSuspended) {
                                router.replace("/dashboard");
                                return; 
                            }

                            let displayName = firebaseUser.displayName || "Operator";
                            const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
                            if (fullName) displayName = fullName;
                            
                            setUser({
                                name: displayName,
                                email: firebaseUser.email || "",
                                reason: data.suspensionReason || "",
                            });
                        }
                        setIsLoading(false);
                    }, (err) => {
                        console.error("Error syncing suspended profile:", err);
                        setIsLoading(false);
                    });

                } catch (err) {
                    console.error("Initialization error:", err);
                    setIsLoading(false);
                }
            } else {
                setUser(null);
                setIsLoading(false);
                router.replace("/login");
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeProfile) unsubscribeProfile();
        };
    }, [router]);

    if (isLoading) {
        return (
            <div className="h-screen w-full bg-slate-50 dark:bg-[#020305] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] animate-pulse">
                        Verifying_Clearance...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020305] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden selection:bg-red-500/30">
            
            {/* Terminal Background Accents */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
            </div>

            <div className="w-full max-w-2xl bg-white dark:bg-[#0D1117] border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative z-10 animate-in fade-in zoom-in-95 duration-500">
                
                {/* Terminal Top Bar */}
                <div className="absolute top-0 right-0 p-1.5 bg-red-500/10 text-[8px] font-mono text-red-500 border-l border-b border-red-500/20 tracking-widest uppercase">
                    SYS_LOCK_ACTIVE
                </div>

                {/* Header Section */}
                <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/5 bg-red-50 dark:bg-red-500/[0.02]">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 shrink-0 bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <ShieldAlert className="text-red-500 w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest mb-2">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                Clearance Revoked
                            </div>
                            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none">
                                Access Denied
                            </h1>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2">
                                Operations halted due to administrative suspension.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body Section */}
                <div className="p-6 sm:p-8 space-y-6">
                    
                    {/* Operator Data Node */}
                    <div className="p-4 border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Terminal className="text-brand-500 w-4 h-4" />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Operator_ID</span>
                                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{user?.name || "UNKNOWN_USER"}</span>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Network_Link</span>
                            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">Severed</span>
                        </div>
                    </div>

                    {/* Dynamic Reason Log */}
                    <div className="space-y-2">
                        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            {'//'} Suspension_Log
                        </p>
                        <div className="p-4 border-l-2 border-red-500 bg-red-50 dark:bg-red-500/5 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                            {user?.reason ? (
                                <span className="text-red-600 dark:text-red-400 font-bold">
                                    &gt; {user.reason}
                                </span>
                            ) : (
                                <span>
                                    &gt; Account has exceeded minimum compliance thresholds.<br/>
                                    &gt; Trading and withdrawal protocols are currently locked pending administrative review.
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Default Reasons (Hidden if specific reason exists) */}
                    {!user?.reason && (
                        <div className="space-y-2 pt-4">
                            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                {'//'} Potential_Flags
                            </p>
                            <ul className="space-y-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                                <li className="flex items-center gap-2"><Lock className="w-3 h-3 text-brand-500" /> Unusual login or trading activity detected.</li>
                                <li className="flex items-center gap-2"><Lock className="w-3 h-3 text-brand-500" /> Pending identity (KYC) verification review.</li>
                                <li className="flex items-center gap-2"><Lock className="w-3 h-3 text-brand-500" /> Compliance check on recent ledger deposits.</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest text-center sm:text-left">
                        Initiate support sequence to restore access.
                    </span>
                    <button
                        onClick={() => { window.location.href = "mailto:support@skyinvestorg.xyz?subject=Account%20Suspension%20Inquiry"; }}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                        style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                    >
                        Contact_Support <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

            </div>
        </div>
    );
}