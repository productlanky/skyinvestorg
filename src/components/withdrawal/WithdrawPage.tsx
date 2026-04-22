"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { validate as validateBitcoin } from "bitcoin-address-validation";
import { useRouter } from "next/navigation";
import { 
  ShieldAlert, 
  Activity, 
  Wallet, 
  ArrowUpRight, 
  LineChart, 
  ShieldCheck
} from "lucide-react";

// --- COMPONENTS ---
import WithdrawAlert from "./WithdrawAlert";
import WithdrawForm, { WithdrawFormFields } from "./WithdrawForm";
import { Skeleton } from "../ui/skeleton";

// --- FIREBASE & UTILS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { 
  doc, onSnapshot, collection, query, where, getDocs, 
  serverTimestamp, writeBatch 
} from "firebase/firestore";
import { fetchTeslaPrice } from "@/lib/appwrite/auth";

type Profile = {
    uid: string;
    totalDeposit: number;
    profit: number;
    withdrawalPassword?: string;
    kycStatus?: string;
    withdrawalLimit: number;
    balance?: number; // Legacy support
};

export default function WithdrawPage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalShares, setTotalShares] = useState<number>(0);
    const [sharePrice, setSharePrice] = useState(0);

    const router = useRouter();

    useEffect(() => {
        // Fetch Live Market Data for Asset Valuation
        fetchTeslaPrice().then(price => setSharePrice(parseFloat(price)));

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (!user) return;

            // 1. Setup Real-time Profile Listener
            const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
                if (docSnap.exists()) {
                    const pData = docSnap.data();
                    setProfile({
                        uid: user.uid,
                        totalDeposit: pData.totalDeposit || 0,
                        profit: pData.profit || 0,
                        balance: pData.balance || 0, // Legacy field
                        withdrawalPassword: pData.withdrawalPassword,
                        kycStatus: pData.kycStatus || "pending",
                        withdrawalLimit: pData.withdrawalLimit || 0
                    });
                }
            });

            // 2. Fetch Stock Logs for Asset Calculation (Non-realtime is fine here)
            const stockQuery = query(collection(db, "stockLogs"), where("userId", "==", user.uid));
            const stockSnap = await getDocs(stockQuery);
            const shares = stockSnap.docs.reduce((sum, doc) => {
                const d = doc.data();
                return d.type === 'buy' ? sum + (d.shares || 0) : sum - (d.shares || 0);
            }, 0);
            
            setTotalShares(shares);
            setIsLoading(false);

            return () => unsubProfile();
        });

        return () => unsubscribeAuth();
    }, []);

    // --- DERIVED LIQUIDITY METRICS ---
    // Matches the rest of your app's logic
    const currentDeposit = profile?.totalDeposit !== undefined ? Number(profile.totalDeposit) : Number(profile?.balance || 0);
    const currentProfit = Number(profile?.profit || 0);
    const availableLiquidity = currentDeposit + currentProfit;

    const validateAddress = (crypto: string, address: string) => {
        if (crypto === "BTC") return validateBitcoin(address);
        if (crypto === "ETH") return /^0x[a-fA-F0-9]{40}$/.test(address);
        return false;
    };

    const onSubmit = async (data: WithdrawFormFields) => {
        if (!profile || isLoading) return;

        // Security Protocols
        if (profile.kycStatus !== "approved") {
            toast.error("KYC_UNAUTHORIZED: Verification required.");
            return;
        }

        if (data.method === 'BTC' && (!data.address || !validateAddress("BTC", data.address))) {
            toast.error("INVALID_COORDINATES: BTC address check failed.");
            return;
        }

        if (!profile.withdrawalPassword) {
            toast.error("SECURITY_VOID: Set withdrawal key in profile.");
            return;
        }

        if (data.password !== profile.withdrawalPassword) {
            toast.error("ACCESS_DENIED: Incorrect security key.");
            return;
        }

        const withdrawAmount = Number(data.amount);

        // Limit Checks
        if (withdrawAmount > availableLiquidity) {
            toast.error(`LIMIT_ERR: Extraction exceeds liquid nodes ($${availableLiquidity.toFixed(2)})`);
            return;
        }

        if (withdrawAmount > profile.withdrawalLimit) {
            toast.error(`TIER_RESTRICTION: Max withdraw is $${profile.withdrawalLimit}`);
            return;
        }

        try {
            setIsLoading(true);
            const batch = writeBatch(db);

            // --- REVERSE SIPHONING PROTOCOL: PROFIT FIRST ---
            let newProfit = currentProfit;
            let newDeposit = currentDeposit;

            if (newProfit >= withdrawAmount) {
                // Profit covers the entire withdrawal
                newProfit -= withdrawAmount;
            } else {
                // Profit exhausted, take remainder from deposit
                const remainder = withdrawAmount - newProfit;
                newProfit = 0;
                newDeposit -= remainder;
            }

            // 1. Log Withdrawal Transaction (Pending status)
            const txRef = doc(collection(db, "transactions"));
            batch.set(txRef, {
                userId: profile.uid,
                type: 'capital_extraction',
                category: 'withdrawal',
                method: data.method,
                amount: withdrawAmount,
                status: "pending",
                createdAt: serverTimestamp(),
                metadata: {
                    address: data.address,
                    source: "profit_priority_routing"
                }
            });

            // 2. Dispatch System Notification
            const notifRef = doc(collection(db, "notifications"));
            batch.set(notifRef, {
                userId: profile.uid,
                title: "Withdrawal Initialized",
                message: `Extraction of $${withdrawAmount} is in the clearing cycle.`,
                type: "withdrawal",
                read: false,
                createdAt: serverTimestamp(),
            });

            // 3. Update Balance Nodes (Siphoned math)
            const profileRef = doc(db, "profiles", profile.uid);
            batch.update(profileRef, {
                totalDeposit: newDeposit,
                profit: newProfit,
                lastWithdrawalAt: serverTimestamp()
            });

            await batch.commit();

            toast.success("DISPATCH_SUCCESS: Funds routed to clearing network.");
            router.push('/transactions');
        } catch (error) {
            console.error("Execution Error:", error);
            toast.error("TERMINAL_EXECUTION_FAILURE");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">EXIT_PROTOCOL_V2</div>
                <div className="flex items-center gap-4">
                    <div className="p-3 border border-brand-500/20 bg-brand-500/5">
                        <ArrowUpRight className="text-brand-500" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Capital Outflow</h1>
                        <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">Initialize secure liquidation of assets.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 md:p-10 relative">
                {!isLoading ? (
                    <div className="space-y-10">
                        {/* Stats Summary Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatNode label="Liquid_Capital" value={`$${availableLiquidity.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={<Wallet size={12}/>} />
                            <StatNode label="Market_Assets" value={`$${(totalShares * sharePrice).toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={<LineChart size={12}/>} />
                            <StatNode label="Verified_Tier_Limit" value={`$${profile?.withdrawalLimit.toLocaleString()}`} icon={<ShieldCheck size={12}/>} />
                        </div>

                        <WithdrawAlert
                            kycStatus={profile?.kycStatus || "pending"}
                            withdrawalPasswordSet={!!profile?.withdrawalPassword}
                        />
                        
                        <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                            <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <Activity size={14} className="text-brand-500" /> Dispatch_Parameters
                            </h3>
                            <WithdrawForm onSubmit={onSubmit} />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <Skeleton className="h-[80px] w-full rounded-none" />
                        <Skeleton className="h-[120px] w-full rounded-none" />
                        <Skeleton className="h-[300px] w-full rounded-none" />
                    </div>
                )}
            </div>
        </div>
    );
}

function StatNode({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-400">{icon}</span>
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{label}</span>
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">{value}</p>
        </div>
    );
}