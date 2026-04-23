"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ChevronLeft, Terminal, ShieldAlert, Save,
  User, DollarSign, Activity, Settings, Loader2,
  ShieldCheck, ArrowDownCircle, ArrowUpCircle, Check, X, Clock, ExternalLink,
  Lock, Target, LineChart, Bot,
  Power
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc, serverTimestamp, writeBatch, collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

interface Props {
  params: Promise<{ id: string }>;
}

// --- CORE TYPES ---
type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zip: string;
  gender: string;
  dob: string;
  role: string;
  status: string;
  suspensionReason?: string;
  kycStatus: string;
  kycFront?: string;
  kycBack?: string;
  totalDeposit: number;
  profit: number;
  withdrawalLimit: number;
  createdAt: string;
};

type TabType = "parameters" | "liquidity" | "investments" | "shares" | "syndicates";

export default function EntityInspectionPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("parameters");

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    country: "", state: "", city: "", address: "", zip: "",
    gender: "", dob: "", role: "user", status: "active", suspensionReason: "", kycStatus: "pending",
    kycFront: "",
    kycBack: "",
    totalDeposit: 0, profit: 0, withdrawalLimit: 0
  });

  // --- 1. CORE DATA SYNC (With Bulletproof Date Parsing) ---
  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const docRef = doc(db, "profiles", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          toast.error("SYS_ERR: Entity not found in registry.");
          return;
        }

        const data = docSnap.data();

        // --- BULLETPROOF DATE PARSING ---
        // Prevents: "TypeError: toDate is not a function"
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

        // --- LEGACY BALANCE MERGER ---
        const mergedDeposit = Number(data.totalDeposit || 0) + Number(data.balance || 0);

        const profileData = {
          id: docSnap.id,
          ...data,
          totalDeposit: mergedDeposit,
          profit: Number(data.profit || 0),
          withdrawalLimit: Number(data.withdrawalLimit || 0),
          createdAt: parsedDate
        } as UserProfile;

        setUser(profileData);
        setFormData({
          ...profileData,
          status: data.status || "active",
          role: data.role || "user",
          kycStatus: data.kycStatus || "pending",
          kycFront: data.kycFront || "",
          kycBack: data.kycBack || "",
          suspensionReason: data.suspensionReason || ""
        });

      } catch (error) {
        console.error("Error fetching entity:", error);
        toast.error("NETWORK_ERR: Failed to sync entity data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEntity();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ["profit", "withdrawalLimit"].includes(name) ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    if (formData.status === "suspended" && !formData.suspensionReason.trim()) {
      toast.error("VALIDATION_ERR: Suspension reason is mandatory.");
      return;
    }
    setSaving(true);
    toast.info("AUTHENTICATING_OVERRIDE...");

    try {
      const batch = writeBatch(db);
      const profileRef = doc(db, "profiles", id);

      // NOTE: We do not save totalDeposit from formData to prevent accidental overwrites. 
      // totalDeposit is exclusively managed by the Ledger (Liquidity tab).
      const { totalDeposit, ...safeData } = formData;

      batch.update(profileRef, { ...safeData, updatedAt: serverTimestamp() });

      const logRef = doc(collection(db, "admin_logs"));
      batch.set(logRef, {
        adminId: auth.currentUser?.uid || "system",
        action: "profile_override",
        targetUserId: id,
        timestamp: serverTimestamp(),
        details: formData.status === "suspended" ? `Account Suspended. Reason: ${formData.suspensionReason}` : "Administrator executed manual profile state override."
      });

      await batch.commit();
      setUser({ ...user, ...formData } as UserProfile);
      toast.success("OVERRIDE_SUCCESSFUL: Entity parameters updated.");
    } catch (error) {
      toast.error("SYS_ERR: Override execution failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <TerminalLoader />;
  if (!user) return <NotFoundFallback router={router} />;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">

      {/* --- GLOBAL HEADER PROTOCOL --- */}
      <div className="w-full mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <button onClick={() => router.back()} className="group inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest hover:text-brand-500 transition-colors">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to Registry
        </button>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold text-rose-500 uppercase tracking-widest hidden sm:inline">Admin_Override_Active</span>
          </div>

          {/* GLOBAL SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "EXECUTING..." : "SAVE_ALL_CHANGES"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* LEFT COLUMN: Identity & Stats */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden group">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-start gap-4 bg-slate-50 dark:bg-white/[0.01]">
              <div className="w-14 h-14 bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 flex items-center justify-center text-xl font-black text-brand-500 shrink-0">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-widest">{user.firstName} {user.lastName}</h2>
                <span className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-1"><Terminal size={10} /> {user.id.substring(0, 12)}...</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/5">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Creation_Date</span>
                <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-300">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/5">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Gross_Equity</span>
                <span className="text-[11px] font-black uppercase text-brand-500">${(user.totalDeposit + user.profit).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Danger Zone (Always visible to ensure Quick Suspend access) */}
          <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative">
            <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01]">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2"><Settings size={14} className="text-slate-400" /> System State Controls</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Account_Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-4 py-3 text-xs font-black font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500 uppercase tracking-widest cursor-pointer appearance-none">
                  <option value="active">Active Node</option>
                  <option value="suspended">Suspended (Lockout)</option>
                </select>
              </div>
              {formData.status === "suspended" && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <label className="text-[9px] font-mono font-bold text-rose-500 uppercase tracking-widest">Reason_For_Lockout</label>
                  <textarea name="suspensionReason" value={formData.suspensionReason} onChange={handleChange} placeholder="Log detailed reason for suspension..." className="w-full bg-rose-500/5 border border-rose-500/20 px-4 py-3 text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-rose-500 transition-colors min-h-[100px] resize-none" />
                </div>
              )}

              {/* Secondary Quick-Save specifically for Danger Zone actions */}
              <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-slate-100 dark:bg-white/5 hover:bg-brand-500/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-brand-500 text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                <Save size={12} /> Update State
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Navigation & Content */}
        <div className="xl:col-span-8 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative flex flex-col min-h-[600px]">

          {/* Terminal Sub-Navigation */}
          <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
            <NavTab id="parameters" label="Parameters" active={activeTab} set={setActiveTab} />
            <NavTab id="liquidity" label="Deposits / Withdrawals" active={activeTab} set={setActiveTab} />
            <NavTab id="investments" label="Investments" active={activeTab} set={setActiveTab} />
            <NavTab id="shares" label="Shares / Markets" active={activeTab} set={setActiveTab} />
            <NavTab id="syndicates" label="Bot / Copy Trading" active={activeTab} set={setActiveTab} />
          </div>

          {/* DYNAMIC CONTENT RENDERING */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative">
            {activeTab === "parameters" && (
              <ParametersView formData={formData} handleChange={handleChange} />
            )}
            {activeTab === "liquidity" && (
              <LiquidityControlView userId={id} userProfile={user} onProfileUpdate={(newTotal, newProfit) => setUser({ ...user, totalDeposit: newTotal, profit: newProfit })} />
            )}
            {/* PLACEHOLDERS FOR NEXT MODULES */}
            {activeTab === "investments" && <InvestmentsView userId={id} />}
            {activeTab === "shares" && <SharesView userId={id} />}
            {activeTab === "syndicates" && <SyndicatesView userId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS & VIEWS
// ==========================================

function NavTab({ id, label, active, set }: { id: TabType, label: string, active: TabType, set: (id: TabType) => void }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => set(id)}
      className={`px-6 py-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2
            ${isActive ? 'border-brand-500 text-brand-500 bg-brand-500/5' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'}`}
    >
      {label}
    </button>
  );
}

// --- 1. PARAMETERS VIEW ---
function ParametersView({ formData, handleChange }: any) {
  return (
    <div className="p-6 md:p-8 space-y-10 animate-in fade-in duration-300">
      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
          <DollarSign size={16} className="text-brand-500" /> Financial Injection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* READ-ONLY DEPOSIT FIELD */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              <Lock size={10} /> Total_Principal_Deposit
            </label>
            <div className="relative cursor-not-allowed">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">$</span>
              <input
                type="number" value={formData.totalDeposit} readOnly disabled
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 pl-8 pr-4 py-3 text-sm font-mono font-bold text-slate-500 dark:text-slate-500 outline-none cursor-not-allowed"
              />
            </div>
            <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mt-1">Managed securely via Liquidity Ledger.</p>
          </div>

          <InputBlock label="Generated_Profit" name="profit" type="number" value={formData.profit} onChange={handleChange} color="focus:border-emerald-500" />
          <div className="md:col-span-2">
            <InputBlock label="Max_Withdrawal_Limit" name="withdrawalLimit" type="number" value={formData.withdrawalLimit} onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* --- KYC & SECURITY SECTION --- */}
      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
          <ShieldCheck size={16} className="text-brand-500" /> Security & KYC
        </h3>

        <div className="space-y-2 mb-6">
          <label className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">KYC_Status</label>
          <select name="kycStatus" value={formData.kycStatus} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-4 py-3 text-xs font-black font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500 uppercase tracking-widest cursor-pointer appearance-none">
            <option value="pending">Pending Review</option>
            <option value="approved">Approved (Verified)</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* KYC IMAGE RENDERER */}
        {(formData.kycFront || formData.kycBack) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.01]">
            {formData.kycFront && (
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Identity_Scan_Front</label>
                <a href={formData.kycFront} target="_blank" rel="noopener noreferrer" className="block p-1 border border-slate-200 dark:border-white/10 hover:border-brand-500 transition-colors bg-white dark:bg-black">
                 
                  <img src={formData.kycFront} alt="KYC Front" className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition-opacity" />
                </a>
              </div>
            )}
            {formData.kycBack && (
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Identity_Scan_Back</label>
                <a href={formData.kycBack} target="_blank" rel="noopener noreferrer" className="block p-1 border border-slate-200 dark:border-white/10 hover:border-brand-500 transition-colors bg-white dark:bg-black">
                 
                  <img src={formData.kycBack} alt="KYC Back" className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition-opacity" />
                </a>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
          <User size={16} className="text-brand-500" /> Personal Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputBlock label="First_Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <InputBlock label="Last_Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <InputBlock label="Contact_Uplink" name="email" value={formData.email} onChange={handleChange} />
          <InputBlock label="Comm_Node" name="phone" value={formData.phone} onChange={handleChange} />
          <InputBlock label="Country" name="country" value={formData.country} onChange={handleChange} />
          <InputBlock label="State/Sector" name="state" value={formData.state} onChange={handleChange} />
        </div>
      </section>
    </div>
  );
}

function InputBlock({ label, name, type = "text", value, onChange, color = "focus:border-brand-500" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className={`w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-4 py-3 text-sm font-mono font-bold text-slate-900 dark:text-white outline-none ${color} transition-colors`} />
    </div>
  );
}

// --- 2. LIQUIDITY CONTROL VIEW (DEPOSITS & WITHDRAWALS) ---

// 1. Define the TypeScript shape for our transactions
type TransactionRecord = {
  id: string;
  category?: string;
  type?: string;
  amount?: number | string;
  method?: string;
  status?: string;
  photoUrl?: string;
  createdAt?: any;
};

function LiquidityControlView({ userId, userProfile, onProfileUpdate }: { userId: string, userProfile: UserProfile, onProfileUpdate: (d: number, p: number) => void }) {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      // 2. Explicitly cast the mapped data as our new type
      const allTxs = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TransactionRecord));

      const liquidityTxs = allTxs.filter(tx =>
        tx.category === 'deposit' || tx.type === 'deposit' ||
        tx.category === 'withdrawal' || tx.type === 'withdrawal' ||
        tx.type === 'capital_injection' || tx.type === 'capital_extraction'
      );

      setTransactions(liquidityTxs);
      setLoading(false);
    });
    return () => unsub();
  }, [userId]);

  const handleAction = async (txId: string, txData: TransactionRecord, action: "approve" | "reject") => {
    setExecuting(txId);
    try {
      const batch = writeBatch(db);
      const txRef = doc(db, "transactions", txId);
      const profileRef = doc(db, "profiles", userId);

      let newDeposit = userProfile.totalDeposit;
      const newProfit = userProfile.profit;

      const isDeposit = txData.category === 'deposit' || txData.type === 'deposit' || txData.type === 'capital_injection';
      const isWithdrawal = txData.category === 'withdrawal' || txData.type === 'withdrawal' || txData.type === 'capital_extraction';

      if (isDeposit) {
        if (action === "approve") {
          newDeposit += Number(txData.amount || 0);
          batch.update(profileRef, { totalDeposit: newDeposit });
        }
      } else if (isWithdrawal) {
        if (action === "reject") {
          newDeposit += Number(txData.amount || 0);
          batch.update(profileRef, { totalDeposit: newDeposit });
        }
      }

      batch.update(txRef, {
        status: action === "approve" ? "approved" : "rejected",
        resolvedAt: serverTimestamp(),
        resolvedBy: auth.currentUser?.uid || "admin"
      });

      batch.set(doc(collection(db, "notifications")), {
        userId,
        title: `${isDeposit ? 'DEPOSIT' : 'WITHDRAWAL'} ${action.toUpperCase()}`,
        message: `Your request for $${txData.amount} has been ${action}d by the network.`,
        type: action === "approve" ? "success" : "alert",
        read: false,
        createdAt: serverTimestamp()
      });

      await batch.commit();
      onProfileUpdate(newDeposit, newProfit);
      toast.success(`TX_${action.toUpperCase()}_SUCCESS`);

    } catch (error) {
      console.error(error);
      toast.error("TX_EXECUTION_FAILED");
    } finally {
      setExecuting(null);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500 font-mono text-[10px] animate-pulse">Syncing_Ledger...</div>;

  return (
    <div className="animate-in fade-in duration-300">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5 sticky top-0 z-10 backdrop-blur-md">
          <tr>
            {["Operation", "Volume", "Method", "Status", "Resolution"].map(h => (
              <th key={h} className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {transactions.length === 0 ? (
            <tr><td colSpan={5} className="py-20 text-center text-slate-500 font-mono text-[10px] tracking-widest uppercase">No_Liquidity_Records</td></tr>
          ) : transactions.map(tx => {
            const isDeposit = tx.category === 'deposit' || tx.type === 'deposit' || tx.type === 'capital_injection';

            return (
              <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-slate-100 dark:bg-white/5">
                      {isDeposit ? <ArrowDownCircle size={14} className="text-brand-500" /> : <ArrowUpCircle size={14} className="text-rose-500" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{isDeposit ? "Deposit" : "Withdrawal"}</span>
                      <span className="text-[8px] font-mono text-slate-400 mt-0.5">{new Date(tx.createdAt?.toDate() || Date.now()).toLocaleString()}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">${Number(tx.amount || 0).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="text-[9px] font-mono text-slate-500 border border-slate-200 dark:border-white/10 px-2 py-1 uppercase">{tx.method || "Transfer"}</span>
                  {tx.photoUrl && (
                    <a href={tx.photoUrl} target="_blank" rel="noreferrer" className="block mt-2 text-[9px] font-mono text-brand-500 hover:underline flex items-center gap-1">
                      <ExternalLink size={10} /> View_Receipt
                    </a>
                  )}
                </td>
                <td className="px-6 py-4">
                  {tx.status === 'pending' ? <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-1 border border-amber-500/20 uppercase w-fit"><Clock size={10} /> Pending</span> :
                    tx.status === 'approved' ? <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 border border-emerald-500/20 uppercase w-fit"><Check size={10} /> Cleared</span> :
                      <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-rose-500 bg-rose-500/10 px-2 py-1 border border-rose-500/20 uppercase w-fit"><X size={10} /> Rejected</span>}
                </td>
                <td className="px-6 py-4">
                  {tx.status === "pending" ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleAction(tx.id, tx, "approve")} disabled={executing === tx.id} className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 transition-colors disabled:opacity-50"><Check size={14} /></button>
                      <button onClick={() => handleAction(tx.id, tx, "reject")} disabled={executing === tx.id} className="p-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-colors disabled:opacity-50"><X size={14} /></button>
                    </div>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Resolved</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// --- 3. INVESTMENTS VIEW ---
type InvestmentRecord = { id: string; planName?: string; amount?: number; interestRate?: number; status?: string; startDate?: any; endDate?: any; createdAt?: any; };

function InvestmentsView({ userId }: { userId: string }) {
  const [investments, setInvestments] = useState<InvestmentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "investments"), where("userId", "==", userId), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setInvestments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvestmentRecord)));
      setLoading(false);
    });
    return () => unsub();
  }, [userId]);

  if (loading) return <div className="p-10 text-center text-slate-500 font-mono text-[10px] animate-pulse">Syncing_Investment_Ledger...</div>;

  return (
    <div className="animate-in fade-in duration-300">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5 sticky top-0 z-10 backdrop-blur-md">
          <tr>
            {["Protocol_Name", "Principal_Locked", "Target_Yield", "Status", "Maturity_Target"].map(h => <th key={h} className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {investments.length === 0 ? (
            <tr><td colSpan={5} className="py-20 text-center text-slate-500 font-mono text-[10px] tracking-widest uppercase">No_Investment_Records</td></tr>
          ) : investments.map(inv => (
            <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="p-1.5 bg-slate-100 dark:bg-white/5"><Target size={14} className="text-brand-500" /></div>
                <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{inv.planName || "Unknown Protocol"}</span>
              </td>
              <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">${Number(inv.amount || 0).toLocaleString()}</td>
              <td className="px-6 py-4 text-[11px] font-mono font-bold text-emerald-500">{(Number(inv.interestRate || 0) * 100).toFixed(0)}%</td>
              <td className="px-6 py-4">
                {inv.status === 'active' ? <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-1 border border-amber-500/20 uppercase w-fit"><Activity size={10} className="animate-pulse" /> Active</span> :
                  <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 border border-emerald-500/20 uppercase w-fit"><Check size={10} /> Matured</span>}
              </td>
              <td className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase">{inv.endDate?.toDate() ? new Date(inv.endDate.toDate()).toLocaleDateString() : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- 4. SHARES / MARKETS VIEW ---
// --- 4. SHARES / LIVE MARKETS VIEW ---
type MarketRecord = {
  id: string;
  source?: string;
  symbol?: string;
  type?: string;
  shares?: number;
  pricePerShare?: number;
  price?: number;
  amount?: number;
  totalValue?: number;
  category?: string;
  metadata?: {
    assetName?: string;
    assetSymbol?: string;
    tradeDirection?: string;
    leverageRatio?: string;
    expirationTime?: string;
    [key: string]: any;
  };
  createdAt?: any;
};

function SharesView({ userId }: { userId: string }) {
  const [records, setRecords] = useState<MarketRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stocksData: MarketRecord[] = [];
    let liveMarketData: MarketRecord[] = [];

    // Helper function to merge both databases and sort by newest first
    const mergeAndSet = () => {
      const merged = [...stocksData, ...liveMarketData];
      merged.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.()?.getTime() || 0;
        const dateB = b.createdAt?.toDate?.()?.getTime() || 0;
        return dateB - dateA;
      });
      setRecords(merged);
      setLoading(false);
    };

    // 1. Fetch Standard Shares
    const unsubStocks = onSnapshot(query(collection(db, "stockLogs"), where("userId", "==", userId)), (snap) => {
      stocksData = snap.docs.map(doc => ({
        id: doc.id,
        source: "Stock Share",
        ...doc.data()
      } as MarketRecord));
      mergeAndSet();
    });

    // 2. Fetch Live Market / Quicktrades (From the TRANSACTIONS collection)
    const unsubLive = onSnapshot(query(collection(db, "transactions"), where("userId", "==", userId)), (snap) => {
      // Filter strictly for trades out of the master transaction log
      const tradeDocs = snap.docs.filter(doc => {
        const data = doc.data();
        return data.category === 'trade' || data.type === 'trade_execution';
      });

      liveMarketData = tradeDocs.map(doc => ({
        id: doc.id,
        source: "Live Market",
        ...doc.data()
      } as MarketRecord));
      mergeAndSet();
    });

    // Cleanup both listeners
    return () => {
      unsubStocks();
      unsubLive();
    };
  }, [userId]);

  if (loading) return <div className="p-10 text-center text-slate-500 font-mono text-[10px] animate-pulse">Syncing_Market_Ledger...</div>;

  return (
    <div className="animate-in fade-in duration-300">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5 sticky top-0 z-10 backdrop-blur-md">
          <tr>
            {["Asset", "Action", "Volume", "Execution_Price", "Net_Value", "Timestamp"].map(h => <th key={h} className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {records.length === 0 ? (
            <tr><td colSpan={6} className="py-20 text-center text-slate-500 font-mono text-[10px] tracking-widest uppercase">No_Market_Activity</td></tr>
          ) : records.map(rec => {

            // --- BULLETPROOF DATA PARSING (Handles Stocks AND Nested Metadata) ---

            // 1. Get Asset Name (Checks metadata first, then standard symbol)
            const assetName = rec.metadata?.assetSymbol || rec.metadata?.assetName || rec.symbol || "ASSET";

            // 2. Get Action (Checks metadata direction first, then standard type)
            const actionType = rec.metadata?.tradeDirection || rec.type || "trade";
            const isPositiveAction = ['buy', 'up', 'call', 'long'].includes(actionType.toLowerCase());

            // 3. Get Volume
            const sharesVolume = Number(rec.shares || 0);

            // 4. Get Execution Price
            const executionPrice = Number(rec.pricePerShare || rec.price || 0);

            // 5. Get Total Value (Net value moved). 
            // Note: For quick trades, `rec.amount` is the total stake deployed.
            const netValue = Number(rec.totalValue || rec.amount || (sharesVolume * executionPrice) || 0);

            return (
              <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="p-1.5 bg-slate-100 dark:bg-white/5"><LineChart size={14} className="text-brand-500" /></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{assetName}</span>
                    <span className="text-[8px] font-mono text-slate-400 uppercase">
                      {rec.source} {rec.metadata?.leverageRatio ? `(${rec.metadata.leverageRatio}x)` : ''}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {isPositiveAction
                    ? <span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 uppercase">{actionType}</span>
                    : <span className="text-[9px] font-mono font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2 py-1 uppercase">{actionType}</span>}
                </td>
                <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                  {rec.source === "Live Market" ? "—" : `${sharesVolume} Units`}
                </td>

                <td className="px-6 py-4 text-[11px] font-mono text-slate-500">
                  {rec.source === "Live Market" && executionPrice === 0
                    ? "—"
                    : `$${executionPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                  }
                </td>
                <td className="px-6 py-4 text-[11px] font-black text-slate-900 dark:text-white">
                  ${netValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>

                <td className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase">{rec.createdAt?.toDate() ? new Date(rec.createdAt.toDate()).toLocaleString() : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// --- 5. SYNDICATES & AI BOTS VIEW ---
type SyndicateRecord = {
  id: string;
  source?: string;
  expertName?: string;
  botName?: string;
  planName?: string;
  amount?: number;
  investment?: number;
  amountDeployed?: number;
  profit?: number;
  status?: string;
  createdAt?: any;
  startedAt?: any;
};

function SyndicatesView({ userId }: { userId: string }) {
  const [records, setRecords] = useState<SyndicateRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Action State ---
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [profitInput, setProfitInput] = useState<string>("");

  useEffect(() => {
    let copyData: SyndicateRecord[] = [];
    let botData: SyndicateRecord[] = [];

    const mergeAndSet = () => {
      const merged = [...copyData, ...botData];
      merged.sort((a, b) => {
        const dateA = (a.createdAt?.toDate?.() || a.startedAt?.toDate?.() || new Date(0)).getTime();
        const dateB = (b.createdAt?.toDate?.() || b.startedAt?.toDate?.() || new Date(0)).getTime();
        return dateB - dateA;
      });
      setRecords(merged);
      setLoading(false);
    };

    const unsubCopy = onSnapshot(query(collection(db, "copy_trades"), where("userId", "==", userId)), (snap) => {
      copyData = snap.docs.map(doc => ({ id: doc.id, source: "Copy Trading", ...doc.data() } as SyndicateRecord));
      mergeAndSet();
    });

    const unsubBot = onSnapshot(query(collection(db, "active_bots"), where("userId", "==", userId)), (snap) => {
      botData = snap.docs.map(doc => ({ id: doc.id, source: "AI Bot", ...doc.data() } as SyndicateRecord));
      mergeAndSet();
    });

    return () => { unsubCopy(); unsubBot(); };
  }, [userId]);

  // --- BATCH PROTOCOL: ADD PROFIT ---
  const handleAddProfit = async (rec: SyndicateRecord) => {
    const addedProfit = Number(profitInput);
    if (!addedProfit || addedProfit <= 0) {
      toast.error("VALIDATION_ERR: Profit must be greater than zero.");
      return;
    }

    setProcessingId(rec.id);
    try {
      const batch = writeBatch(db);

      // Identify the exact node and collection
      const collectionName = rec.source === "Copy Trading" ? "copy_trades" : "active_bots";
      const nodeName = rec.expertName || rec.botName || rec.planName || "System Node";

      // --- DYNAMIC CATEGORY ROUTING ---
      const ledgerCategory = rec.source === "Copy Trading" ? "copy_trade" : "bot_trade";

      // 1. Update Node (Bot/Copy) Profit
      const nodeRef = doc(db, collectionName, rec.id);
      const currentRecProfit = Number(rec.profit || 0);
      batch.update(nodeRef, { profit: currentRecProfit + addedProfit });

      // 2. Update Master Profile Profit
      const profileRef = doc(db, "profiles", userId);
      const profileSnap = await getDoc(profileRef);
      if (!profileSnap.exists()) throw new Error("Profile not found.");
      const currentProfileProfit = Number(profileSnap.data().profit || 0);
      batch.update(profileRef, { profit: currentProfileProfit + addedProfit });

      // 3. Log to Master Ledger
      const txRef = doc(collection(db, "transactions"));
      batch.set(txRef, {
        userId,
        type: 'yield_generation',
        category: ledgerCategory, // Dynamically routes to 'copy_trade' or 'bot_trade'
        amount: addedProfit,
        status: 'approved',
        createdAt: serverTimestamp(),
        metadata: {
          nodeName: nodeName,
          source: rec.source
        }
      });

      // 4. Dispatch User Notification
      const notifRef = doc(collection(db, "notifications"));
      batch.set(notifRef, {
        userId,
        title: "YIELD GENERATED",
        message: `Your ${rec.source} (${nodeName}) has generated $${addedProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })} in profit.`,
        type: "success",
        read: false,
        createdAt: serverTimestamp()
      });

      await batch.commit();
      toast.success("PROFIT_ALLOCATED: Ledger, profile, and notifications updated.");
      setActivePrompt(null);
      setProfitInput("");
    } catch (err) {
      console.error(err);
      toast.error("SYS_ERR: Failed to allocate profit.");
    } finally {
      setProcessingId(null);
    }
  };

  // --- BATCH PROTOCOL: TERMINATE NODE ---
  const handleTerminate = async (rec: SyndicateRecord) => {
    const confirmEnd = window.confirm(`Are you sure you want to terminate this ${rec.source}?`);
    if (!confirmEnd) return;

    setProcessingId(rec.id);
    try {
      const batch = writeBatch(db);
      const collectionName = rec.source === "Copy Trading" ? "copy_trades" : "active_bots";
      const nodeName = rec.expertName || rec.botName || rec.planName || "System Node";

      // 1. Terminate the Node
      const nodeRef = doc(db, collectionName, rec.id);
      batch.update(nodeRef, { status: "terminated", endedAt: serverTimestamp() });

      // 2. Dispatch Final Notification with Realized Profit
      const notifRef = doc(collection(db, "notifications"));
      const totalRealized = Number(rec.profit || 0);
      batch.set(notifRef, {
        userId,
        title: "NODE TERMINATED",
        message: `Your ${rec.source} (${nodeName}) has concluded. Total realized profit: $${totalRealized.toLocaleString(undefined, { minimumFractionDigits: 2 })}.`,
        type: "alert",
        read: false,
        createdAt: serverTimestamp()
      });

      // NOTE: If you also want to return their deployed capital back to their main balance, 
      // you would read the profile and add `rec.amount` back to `totalDeposit` here.

      await batch.commit();
      toast.success("NODE_TERMINATED: System connection severed.");
    } catch (err) {
      console.error(err);
      toast.error("SYS_ERR: Failed to terminate node.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500 font-mono text-[10px] animate-pulse">Syncing_Syndicate_Ledger...</div>;

  return (
    <div className="animate-in fade-in duration-300">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5 sticky top-0 z-10 backdrop-blur-md">
          <tr>
            {["System_Node", "Deployed_Capital", "Yield_Generated", "Status", "Uplink_Timestamp", "Controls"].map(h => <th key={h} className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {records.length === 0 ? (
            <tr><td colSpan={6} className="py-20 text-center text-slate-500 font-mono text-[10px] tracking-widest uppercase">No_Active_Syndicates_Or_Bots</td></tr>
          ) : records.map(rec => {

            const nodeName = rec.expertName || rec.botName || rec.planName || "System Protocol";
            const deployedCapital = Number(rec.amount || rec.investment || rec.amountDeployed || 0);
            const generatedYield = Number(rec.profit || 0);
            const isActiveStatus = rec.status === 'active' || rec.status === 'running';
            const timestamp = rec.createdAt || rec.startedAt;
            const isProcessing = processingId === rec.id;

            return (
              <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="p-1.5 bg-slate-100 dark:bg-white/5">
                    {rec.source === "AI Bot" ? <Bot size={14} className="text-brand-500" /> : <Activity size={14} className="text-brand-500" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{nodeName}</span>
                    <span className="text-[8px] font-mono text-slate-400 uppercase">{rec.source}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                  ${deployedCapital.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-[11px] font-mono font-bold text-emerald-500">
                  ${generatedYield.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4">
                  {isActiveStatus ?
                    <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 border border-emerald-500/20 uppercase w-fit">
                      <Activity size={10} className="animate-pulse" /> Active
                    </span> :
                    <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-500 bg-slate-500/10 px-2 py-1 border border-slate-500/20 uppercase w-fit">
                      <X size={10} /> Terminated
                    </span>
                  }
                </td>
                <td className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase">
                  {timestamp?.toDate() ? new Date(timestamp.toDate()).toLocaleString() : "—"}
                </td>
                <td className="px-6 py-4">
                  {/* --- ADMIN CONTROLS --- */}
                  {isActiveStatus ? (
                    <div className="flex items-center gap-2">
                      {activePrompt === rec.id ? (
                        <div className="flex items-center border border-brand-500/50">
                          <span className="bg-slate-100 dark:bg-white/5 px-2 text-[10px] font-mono text-slate-500">$</span>
                          <input
                            type="number"
                            value={profitInput}
                            onChange={(e) => setProfitInput(e.target.value)}
                            placeholder="0.00"
                            className="w-20 bg-transparent text-[10px] font-mono text-slate-900 dark:text-white outline-none px-2 py-1"
                          />
                          <button
                            onClick={() => handleAddProfit(rec)}
                            disabled={isProcessing}
                            className="bg-brand-500 text-white px-2 py-1 hover:bg-brand-600 disabled:opacity-50"
                          >
                            {isProcessing ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                          </button>
                          <button onClick={() => setActivePrompt(null)} className="bg-rose-500 text-white px-2 py-1 hover:bg-rose-600">
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => { setActivePrompt(rec.id); setProfitInput(""); }}
                            className="px-3 py-1.5 bg-brand-500/10 text-brand-500 border border-brand-500/20 hover:bg-brand-500 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest flex items-center gap-1"
                          >
                            Inject Yield
                          </button>
                          <button
                            onClick={() => handleTerminate(rec)}
                            disabled={isProcessing}
                            className="p-1.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50"
                            title="Terminate Node"
                          >
                            {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <Power size={14} />}
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Resolved</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TerminalLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
      <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.4em] animate-pulse">Syncing_Entity_Node...</p>
    </div>
  );
}

function NotFoundFallback({ router }: any) {
  return (
    <div className="p-10 border border-rose-500/20 bg-rose-500/5 flex flex-col items-center justify-center gap-4 text-rose-500 animate-in fade-in">
      <ShieldAlert size={32} />
      <p className="font-mono uppercase tracking-widest text-xs font-bold text-center">ERR_ENTITY_NOT_FOUND</p>
      <button onClick={() => router.back()} className="px-6 py-2 border border-rose-500 hover:bg-rose-500/10 text-[10px] uppercase font-bold transition-colors">Return</button>
    </div>
  );
}