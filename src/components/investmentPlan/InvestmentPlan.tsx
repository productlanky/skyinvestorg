"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Zap, ShieldCheck, Clock, Activity, Target } from "lucide-react";
import { toast } from "sonner";
import { plan } from "@/lib/data/info";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { 
    collection, query, where, orderBy, limit, 
    onSnapshot, updateDoc, doc, getDoc, serverTimestamp, writeBatch 
} from "firebase/firestore";

type InvestmentPlan = {
  id: string;
  name: string;
  description: string;
  interest_rate: number;
  duration_days: number;
  min_amount: number;
};

export default function InvestmentPlansPage() {
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [investing, setInvesting] = useState<string | null>(null);
  const [activeInvestment, setActiveInvestment] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }
      setUserId(user.uid);
      setPlans(plan);

      // 1. Profile Listener
      const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
        if (docSnap.exists()) setProfile(docSnap.data());
      });

      // 2. Active Investment Listener & Lazy Evaluation
      const invQuery = query(
        collection(db, "investments"),
        where("userId", "==", user.uid),
        where("status", "==", "active"),
        orderBy("startDate", "desc"),
        limit(1)
      );

      const unsubInvestments = onSnapshot(invQuery, async (snapshot) => {
        if (!snapshot.empty) {
            const currentInvestment = snapshot.docs[0];
            const invData = currentInvestment.data();
            const now = new Date();
            const endDate = invData.endDate.toDate();

            // --- LAZY EVALUATION: MATURITY CHECK ---
            if (now >= endDate) {
                console.log("SYS_LOG: Investment Maturity Detected. Initiating Unlock Protocol.");
                await handleInvestmentMaturity(currentInvestment.id, invData, user.uid);
                setActiveInvestment(null);
            } else {
                setActiveInvestment(invData);
            }
        } else {
            setActiveInvestment(null);
        }
        setLoading(false);
      });

      return () => { unsubProfile(); unsubInvestments(); };
    });

    return () => unsubscribeAuth();
  }, []);

  // --- CALCULATION HELPERS ---
  const currentDeposit = Number(profile?.totalDeposit || 0);
  const currentProfit = Number(profile?.profit || 0);
  const availableLiquidity = currentDeposit + currentProfit;

  // --- CORE PROTOCOL: INITIALIZE INVESTMENT ---
  const handleInvest = async (selectedPlan: InvestmentPlan) => {
    if (!userId || !profile) return;

    // 1. LIQUIDITY CHECK
    if (availableLiquidity < selectedPlan.min_amount) {
      toast.error(`INSUFFICIENT_LIQUIDITY: Gross equity cannot support this allocation.`);
      return;
    }

    setInvesting(selectedPlan.id);
    toast.info("INITIALIZING_PROTOCOL...");

    // 2. CAPITAL SIPHONING PROTOCOL
    let newDeposit = currentDeposit;
    let newProfit = currentProfit;

    if (currentDeposit >= selectedPlan.min_amount) {
        newDeposit -= selectedPlan.min_amount;
    } else {
        const remainder = selectedPlan.min_amount - currentDeposit;
        newDeposit = 0;
        newProfit -= remainder;
    }

    const startedAt = new Date();
    const endAt = new Date();
    endAt.setDate(startedAt.getDate() + selectedPlan.duration_days);

    try {
        const batch = writeBatch(db);

        // 1. Create Investment Doc
        const newInvRef = doc(collection(db, "investments"));
        batch.set(newInvRef, {
            userId,
            planId: selectedPlan.id,
            planName: selectedPlan.name,
            amount: selectedPlan.min_amount,
            interestRate: selectedPlan.interest_rate,
            status: "active",
            startDate: startedAt,
            endDate: endAt,
            createdAt: serverTimestamp(),
        });

        // 2. Update Profile (Deduct Siphoned Balances, Add to Locked Capital)
        const profileRef = doc(db, "profiles", userId);
        batch.update(profileRef, {
            totalDeposit: newDeposit,
            profit: newProfit,
            lockedCapital: (profile.lockedCapital || 0) + selectedPlan.min_amount
        });

        // 3. System Log (Transaction)
        const newTxRef = doc(collection(db, "transactions"));
        batch.set(newTxRef, {
            userId,
            amount: selectedPlan.min_amount,
            type: "capital_lock",
            category: "investment",
            status: "approved",
            createdAt: serverTimestamp(),
            metadata: {
                planName: selectedPlan.name,
                duration: selectedPlan.duration_days,
                expectedYield: `${(selectedPlan.interest_rate * 100).toFixed(0)}%`
            }
        });

        // 4. Notification
        const newNotifRef = doc(collection(db, "notifications"));
        batch.set(newNotifRef, {
            userId,
            title: "Capital Locked",
            message: `Deployed $${selectedPlan.min_amount} into ${selectedPlan.name} protocol.`,
            type: "info",
            read: false,
            createdAt: serverTimestamp(),
        });

        await batch.commit();
        toast.success(`PROTOCOL_EXECUTED: Funds locked in ${selectedPlan.name}`);

    } catch (error) {
        console.error("Investment error:", error);
        toast.error("SYS_ERR: Execution Failure.");
    } finally {
        setInvesting(null);
    }
  };


  // --- CORE PROTOCOL: MATURITY UNLOCK (LAZY EVALUATION) ---
  const handleInvestmentMaturity = async (invDocId: string, invData: any, uid: string) => {
      try {
          // Fetch fresh profile data to avoid race conditions
          const profileRef = doc(db, "profiles", uid);
          const pSnap = await getDoc(profileRef);
          if (!pSnap.exists()) return;
          const pData = pSnap.data();

          const principal = Number(invData.amount);
          const profitEarned = principal * Number(invData.interestRate);

          const batch = writeBatch(db);

          // 1. Mark Investment as Completed
          batch.update(doc(db, "investments", invDocId), {
              status: "completed",
              completedAt: serverTimestamp()
          });

          // 2. Update Profile: Release principal back to deposit, add yield to profit
          batch.update(profileRef, {
              totalDeposit: Number(pData.totalDeposit || 0) + principal,
              profit: Number(pData.profit || 0) + profitEarned,
              lockedCapital: Math.max((pData.lockedCapital || 0) - principal, 0), // Prevent negative
          });

          // 3. Log Transaction: Principal Unlock
          batch.set(doc(collection(db, "transactions")), {
              userId: uid,
              amount: principal,
              type: "capital_unlock",
              category: "investment",
              status: "approved",
              createdAt: serverTimestamp(),
              metadata: { planName: invData.planName }
          });

          // 4. Log Transaction: Yield Distributed
          batch.set(doc(collection(db, "transactions")), {
              userId: uid,
              amount: profitEarned,
              type: "yield_distributed",
              category: "investment",
              status: "approved",
              createdAt: serverTimestamp(),
              metadata: { planName: invData.planName, yieldSource: "protocol_maturity" }
          });

          // 5. Success Notification
          batch.set(doc(collection(db, "notifications")), {
              userId: uid,
              title: "Protocol Matured",
              message: `${invData.planName} completed. Principal ($${principal}) unlocked and Yield ($${profitEarned.toFixed(2)}) distributed.`,
              type: "success",
              read: false,
              createdAt: serverTimestamp(),
          });

          await batch.commit();
          toast.success("MATURITY_REACHED: Capital unlocked and yield distributed.");
          
      } catch (error) {
          console.error("Maturity Unlock Error:", error);
      }
  };


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-64 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 animate-pulse flex flex-col p-6">
              <div className="h-4 w-32 bg-slate-100 dark:bg-white/5 mb-4" />
              <div className="h-10 w-24 bg-slate-100 dark:bg-white/5 mb-auto" />
              <div className="h-12 w-full bg-slate-100 dark:bg-white/5" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-brand-500/20 uppercase tracking-widest z-10">ALLOCATOR_NODE</div>
            <div className="relative z-10">
                <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white">Capital Allocation Plans</h2>
                <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">Select a protocol to lock liquidity and generate yield.</p>
            </div>
            
            <div className="flex gap-4 relative z-10">
                {/* Available Balance (Deposit + Profit) */}
                <div className="flex flex-col items-start sm:items-end bg-slate-50 dark:bg-white/5 px-4 py-2 border border-slate-200 dark:border-white/10">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Available Liquidity</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter leading-none">
                        ${availableLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
                {/* Locked Capital Monitor */}
                <div className="flex flex-col items-start sm:items-end bg-slate-50 dark:bg-white/5 px-4 py-2 border border-slate-200 dark:border-white/10 hidden sm:flex">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Locked Capital</span>
                    <span className="text-xl font-black text-amber-500 tracking-tighter leading-none">
                        ${(profile?.lockedCapital || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => {
            const isActivePlan = activeInvestment?.planId === plan.id;
            const isLoadingPlan = investing === plan.id;

            return (
            <div key={plan.id} className="group relative bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 flex flex-col hover:border-brand-500/50 transition-colors">
                
                {/* Active Indicator Line */}
                {isActivePlan && <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />}

                <div className="p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                                {plan.name}
                            </h3>
                            <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">
                                {plan.description}
                            </p>
                        </div>
                        <div className={`p-2 border ${isActivePlan ? 'border-amber-500/30 bg-amber-500/10' : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5'}`}>
                            <Target size={16} className={isActivePlan ? "text-amber-500 animate-pulse" : "text-brand-500"} />
                        </div>
                    </div>

                    {/* Stats Block */}
                    <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 space-y-4 mb-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Target Yield</p>
                                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                                    {(plan.interest_rate * 100).toFixed(0)}<span className="text-lg text-brand-500">%</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Lock Period</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                                    {plan.duration_days} DAYS
                                </p>
                            </div>
                        </div>
                        
                        <div className="h-px w-full bg-slate-200 dark:bg-white/10" />
                        
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Entry Capital</span>
                            <span className="text-sm font-mono font-black text-slate-900 dark:text-white">
                                ${plan.min_amount.toLocaleString()} USD
                            </span>
                        </div>
                    </div>

                    {/* Active Plan Countdown (If running) */}
                    {isActivePlan && (
                        <div className="mb-6 p-3 border border-amber-500/20 bg-amber-500/5">
                            <p className="text-[9px] font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest flex items-center gap-2">
                               <Clock size={12} className="animate-spin-slow" /> Maturity Target: 
                               <span className="font-bold">{activeInvestment.endDate.toDate().toLocaleDateString()}</span>
                            </p>
                        </div>
                    )}

                    {/* Details List */}
                    <ul className="space-y-2 mb-8 flex-1">
                        <li className="flex items-start gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                            <Zap size={12} className="text-brand-500 shrink-0 mt-0.5" />
                            <span>Fixed capital lock of ${plan.min_amount.toLocaleString()}</span>
                        </li>
                        <li className="flex items-start gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                            <Clock size={12} className="text-brand-500 shrink-0 mt-0.5" />
                            <span>Automated principal + yield payout at term end</span>
                        </li>
                        <li className="flex items-start gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                            <ShieldCheck size={12} className="text-brand-500 shrink-0 mt-0.5" />
                            <span>Secured algorithmic execution strategy</span>
                        </li>
                    </ul>

                    {/* Action Button */}
                    <button
                        onClick={() => handleInvest(plan)}
                        disabled={isLoadingPlan || activeInvestment !== null} // Disable if ANY plan is active
                        className={`
                            flex items-center justify-center gap-2 w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all
                            ${activeInvestment !== null 
                                ? isActivePlan 
                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/30 cursor-not-allowed"
                                    : "bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 cursor-not-allowed opacity-50"
                                : "bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-50"}
                        `}
                        style={activeInvestment === null ? { clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' } : {}}
                    >
                        {isLoadingPlan ? (
                            "Allocating..."
                        ) : isActivePlan ? (
                            <><Activity size={14} className="animate-pulse" /> Protocol Active</>
                        ) : activeInvestment !== null ? (
                            "Yield Protocol Locked"
                        ) : (
                            <><ArrowUpRight size={16} /> Execute Protocol</>
                        )}
                    </button>
                </div>
            </div>
            );
        })}
        </div>
    </div>
  );
}