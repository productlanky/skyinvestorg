"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
    Search, User, Activity, ShieldAlert, ShieldCheck, 
    Terminal, ArrowRight, Database
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    role: string;
    status?: string; // "active" | "suspended"
    kycStatus: string;
    totalDeposit: number;
    profit: number;
    createdAt: string;
};

export default function UsersTable() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // --- FIREBASE REAL-TIME SYNC ---
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (adminUser) => {
            if (!adminUser) return;

            // Fetch all profiles, ordered by newest first
            const profilesQuery = query(
                collection(db, "profiles"),
                orderBy("createdAt", "desc")
            );

            const unsubscribeProfiles = onSnapshot(profilesQuery, (snapshot) => {
                const formatted: UserProfile[] = [];
                
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    
                    // --- BULLETPROOF DATE PARSING ---
                    // This prevents the "toDate is not a function" crash
                    let parsedDate = new Date().toISOString(); // Default fallback
                    
                    if (data.createdAt) {
                        if (typeof data.createdAt.toDate === 'function') {
                            // 1. Valid Firebase Timestamp Object
                            parsedDate = data.createdAt.toDate().toISOString();
                        } else if (typeof data.createdAt === 'string' || typeof data.createdAt === 'number') {
                            // 2. Legacy Appwrite String or Unix Timestamp
                            const dateObj = new Date(data.createdAt);
                            if (!isNaN(dateObj.getTime())) {
                                parsedDate = dateObj.toISOString();
                            }
                        }
                    }

                    
                    // Filter out other administrators from the CRM view if necessary
                    // if (data.role !== "admin" && data.role !== "super_admin") {
                        formatted.push({
                            id: doc.id,
                            firstName: data.firstName || "Unknown",
                            lastName: data.lastName || "Entity",
                            email: data.email || "—",
                            phone: data.phone || "—",
                            country: data.country || "—",
                            role: data.role || "user",
                            status: data.status || "active",
                            kycStatus: data.kycStatus || "pending",
                            totalDeposit: Number(data.totalDeposit || 0) + Number(data.balance || 0), 
                            profit: Number(data.profit || 0),
                            createdAt: parsedDate,
                        });
                    // }
                });

                setUsers(formatted);
                setLoading(false);
            }, (error) => {
                console.error("CRM Sync Error:", error);
                setLoading(false);
            });

            return () => unsubscribeProfiles();
        });

        return () => unsubscribeAuth();
    }, []);

    // --- SEARCH FILTER ---
    const filteredUsers = users.filter((u) => {
        const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
        const searchLower = search.toLowerCase();
        return fullName.includes(searchLower) || 
               u.email.toLowerCase().includes(searchLower) ||
               u.id.toLowerCase().includes(searchLower);
    });

    // --- TERMINAL BADGES ---
    const getStatusBadge = (status: string) => {
        if (status === 'suspended') return <span className="px-2 py-1 text-[9px] font-mono font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 uppercase tracking-widest">SUSPENDED</span>;
        return <span className="px-2 py-1 text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest">ACTIVE_NODE</span>;
    };

    const getKycBadge = (kyc: string) => {
        if (kyc === 'approved') return <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-500 uppercase"><ShieldCheck size={12}/> Verified</span>;
        if (kyc === 'rejected') return <span className="flex items-center gap-1 text-[10px] font-mono text-rose-500 uppercase"><ShieldAlert size={12}/> Rejected</span>;
        return <span className="flex items-center gap-1 text-[10px] font-mono text-amber-500 uppercase"><Activity size={12} className="animate-pulse"/> Pending</span>;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            
            {/* Command Header & Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-6 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative">
                <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest hidden sm:block">
                    ENTITY_CRM_NODE
                </div>

                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-3">
                        <Database size={18} className="text-brand-500" /> User Registry
                    </h2>
                    <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
                        Total Registered Entities: <span className="text-brand-500 font-bold">{filteredUsers.length}</span>
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Scan by Name, Email, or ID..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 pl-10 pr-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 overflow-hidden">
                <div className="w-full overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5">
                            <tr>
                                {["Identity_Hash", "Contact_Uplink", "Location", "Gross_Liquidity", "Security", "Actions"].map((label) => (
                                    <th key={label} className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {loading ? (
                                [...Array(5)].map((_, index) => (
                                    <tr key={index} className="border-b border-slate-100 dark:border-white/5">
                                        {[...Array(6)].map((_, j) => (
                                            <td key={j} className="px-6 py-5">
                                                <div className={`h-4 bg-slate-100 dark:bg-white/5 animate-pulse ${j === 0 ? 'w-32' : 'w-24'}`} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
                                            <User size={32} />
                                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">NO_ENTITIES_FOUND</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                                        
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xs font-black text-brand-500 shrink-0">
                                                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                                                        {user.firstName} {user.lastName}
                                                    </span>
                                                    <span className="text-[9px] font-mono text-slate-400 mt-0.5 flex items-center gap-1">
                                                        <Terminal size={8}/> {user.id.substring(0, 8)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                                                    {user.email}
                                                </span>
                                                <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                                                    {user.phone}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2 py-1 border border-slate-200 dark:border-white/10">
                                                {user.country}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tighter">
                                                    ${(user.totalDeposit + user.profit).toLocaleString(undefined, {minimumFractionDigits: 2})}
                                                </span>
                                                <div className="flex gap-2 text-[8px] font-mono uppercase tracking-widest mt-0.5">
                                                    <span className="text-slate-400">DEP: ${(user.totalDeposit).toLocaleString()}</span>
                                                    <span className="text-emerald-500">PR: ${(user.profit).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 space-y-2">
                                            <div>{getKycBadge(user.kycStatus)}</div>
                                            <div>{getStatusBadge(user.status || "active")}</div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Link 
                                                href={`/controlPanel/profiles/${user.id}`}
                                                className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-white/5 hover:bg-brand-600 hover:text-white border border-slate-200 dark:border-white/10 text-[9px] font-black uppercase tracking-widest transition-all group/btn"
                                            >
                                                Inspect <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}