"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { Key, ShieldAlert, Lock, Fingerprint } from "lucide-react";
import { toast } from "sonner"; 

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

interface SetWithdrawalPasswordProps {
    refresh?: () => void;
    hasPassword?: boolean;
}

export default function SetWithdrawalPassword({
    refresh,
    hasPassword
}: SetWithdrawalPasswordProps) {
    const { isOpen, openModal, closeModal } = useModal();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || password.length < 6) {
            return toast.error("VALIDATION_ERR: Password must be at least 6 characters.");
        }

        if (password !== confirmPassword) {
            return toast.error("MATCH_ERR: Passwords do not correlate.");
        }

        setLoading(true);

        try {
            const user = auth.currentUser;
            if (!user) throw new Error("AUTH_NODE_OFFLINE");

            // Update the profile document in Firestore
            const profileRef = doc(db, "profiles", user.uid);
            await updateDoc(profileRef, { 
                withdrawalPassword: password,
                lastSecurityUpdate: new Date()
            });

            toast.success(
                hasPassword ? "PROTOCOL_UPDATED: Security key rotated." : "PROTOCOL_SET: Security key initialized."
            );
            
            closeModal();
            refresh?.();
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Security Update Error:", error);
            toast.error("EXECUTION_FAILURE: Database link unstable.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* --- COMPONENT CARD --- */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">SEC_PROTOCOL_V4</div>
                
                <div className="flex flex-col items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 border border-brand-500/20 bg-brand-500/5">
                            <Key className="text-brand-500" size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                Withdrawal Security Key
                            </h4>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mt-1">
                                {hasPassword
                                    ? "ENCRYPTION_ACTIVE: User-defined key detected."
                                    : "ENCRYPTION_PENDING: No security key assigned."}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={openModal}
                        className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all
                            ${hasPassword 
                                ? "border border-slate-200 dark:border-white/10 text-slate-500 hover:border-brand-500 hover:text-brand-500" 
                                : "bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/20"}`}
                        style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                    >
                        {hasPassword ? "Rotate Key" : "Initialize Key"}
                    </button>
                </div>
            </div>

            {/* --- SECURITY MODAL --- */}
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md m-4">
                <div className="relative w-full p-6 lg:p-10 bg-white dark:bg-[#0D1117] border border-brand-500/20 shadow-2xl">
                    <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">SEC_INPUT_NODE</div>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <Fingerprint className="text-brand-500" size={24} />
                        <h4 className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white">
                            {hasPassword ? "Rotate Security Key" : "Set Security Key"}
                        </h4>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 mb-8">
                        <ShieldAlert className="text-amber-500 shrink-0" size={16} />
                        <p className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase leading-relaxed">
                            Warning: This 6+ digit key is required for all capital outflows. Do not share your encryption node data.
                        </p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">New_Security_Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-500 transition-colors" size={14} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••"
                                    className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-10 py-4 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm_Key_Correlative</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-500 transition-colors" size={14} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••"
                                    className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-10 py-4 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                            <button 
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Abort
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-brand-500/20"
                                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                            >
                                {loading ? "Syncing..." : "Execute_Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}