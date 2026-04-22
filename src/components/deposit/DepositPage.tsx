"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Copy, Clock, ArrowRight,
  Wallet, Landmark, DollarSign, UploadCloud, Terminal, ShieldCheck
} from "lucide-react";

import { uploadToCloudinary } from "@/lib/cloudinary"; 

// --- FIREBASE IMPORTS (Storage Removed) ---
import { auth, db } from "@/lib/firebase/config";
import { collection, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

type StepType = "form" | "method" | "countdown";

const METHODS = [
  { value: "bitcoin", label: "BITCOIN_NETWORK", icon: <Wallet size={16} /> },
  { value: "bank", label: "BANK_TRANSFER_WIRE", icon: <Landmark size={16} /> },
  { value: "paypal", label: "PAYPAL_GATEWAY", icon: <DollarSign size={16} /> },
];

const DepositPage = () => {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<StepType>("form");
  const [countdown, setCountdown] = useState(1800);
  const [isUploading, setIsUploading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const router = useRouter();

  const bitcoinAddress = process.env.NEXT_PUBLIC_BITCOIN_ADDRESS;

  useEffect(() => {
    if (step === "countdown" && countdown > 0) {
      const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, countdown]);

  const handleStartDeposit = () => {
    if (!amount || parseFloat(amount) < 100) {
      toast.error("MIN_LIMIT_ERR: Minimum deposit is $100");
      return;
    }
    setStep("method");
  };

  const confirmMethod = async () => {
    try {
      if (!paymentMethod) {
        toast.error("METHOD_NOT_SELECTED");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        toast.error("AUTH_REQUIRED");
        return;
      };

      // Prevent multiple ID generation if user just toggles back and forth
      if (transactionId) {
         setStep("countdown");
         return;
      }

      const newTxRef = doc(collection(db, "transactions"));
      const txId = newTxRef.id;

      await setDoc(newTxRef, {
        userId: user.uid,
        type: "deposit",
        category: "deposit", // Syncing with your Ledger category logic
        amount: parseFloat(amount),
        status: "pending",
        method: paymentMethod,
        createdAt: serverTimestamp(),
      });

      setTransactionId(txId);
      setStep("countdown");
    } catch (error) {
      console.error(error);
      toast.error("PROTOCOL_INIT_FAILURE");
    }
  };

  const handleUpload = async (file: File) => {
    // Logic check: Ensure transaction exists before uploading
    if (!file || !transactionId || !auth.currentUser) return;

    try {
      setIsUploading(true);
      toast.info("RELAYING_DATA_TO_CLOUD...");

      // 1. Execute Cloudinary Relay
      const downloadURL = await uploadToCloudinary(file);

      // Failsafe if Cloudinary rejects the upload
      if (!downloadURL) {
          toast.error("UPL_ERR: Cloudinary transmission failed.");
          return;
      }

      // 2. Update Firestore Transaction Node with the new URL
      await updateDoc(doc(db, "transactions", transactionId), {
        photoUrl: downloadURL,
        receiptUploadedAt: serverTimestamp(),
        adminNote: "Awaiting verification of uploaded image."
      });

      toast.success("TRANSFER_RECEIPT_SYNCED");
      router.push("/dashboard/transactions"); // Ensuring it routes back to the user's ledger
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("UPL_ERR: Transmission failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && handleUpload(files[0]),
    accept: { "image/*": [] },
    maxFiles: 1
  });

  const minutes = Math.floor(countdown / 60);
  const seconds = (countdown % 60).toString().padStart(2, "0");

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 pb-20 animate-in fade-in duration-500">

      {/* Header Protocol */}
      <div className="mb-10 flex items-start justify-between border-b border-slate-200 dark:border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-brand-500/10 text-brand-500">
              <ShieldCheck size={16} />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Capital_Injection_V4</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Initialize Deposit</h1>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[9px] font-mono text-slate-400 uppercase">System_Status</span>
          <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Nodes_Active
          </span>
        </div>
      </div>

      {/* Industrial Stepper */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1 transition-colors ${s <= (step === 'form' ? 1 : step === 'method' ? 2 : 3) ? 'bg-brand-500' : 'bg-slate-200 dark:bg-white/5'}`} />
        ))}
      </div>

      <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-8 relative overflow-hidden">

        {/* Step 1: Input Amount */}
        {step === "form" && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">QUANTUM_SPECIFICATION</h2>
              <p className="text-[11px] font-mono text-slate-500 uppercase">Input the capital volume for this transaction node.</p>
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 font-mono font-bold">$</div>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                /* 1. Prevent scroll-changing values */
                onWheel={(e) => (e.target as HTMLElement).blur()}
                /* 2. Remove arrows via CSS and utility classes */
                className="
                  w-full bg-slate-50 dark:bg-white/[0.02] 
                  border border-slate-200 dark:border-white/10 
                  pl-8 pr-4 py-4 text-xl font-black 
                  text-slate-900 dark:text-white outline-none 
                  focus:border-brand-500 transition-colors
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                "
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[100, 500, 1000, 5000].map(val => (
                <button key={val} onClick={() => setAmount(val.toString())} className="py-2 border border-slate-200 dark:border-white/5 text-[10px] font-mono font-bold hover:bg-brand-500/5 hover:border-brand-500 transition-colors">
                  +${val}
                </button>
              ))}
            </div>

            <button
              onClick={handleStartDeposit}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              Confirm Magnitude <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2: Choose Method */}
        {step === "method" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">TRANSMISSION_PROTOCOL</h2>
              <span className="text-xs font-black text-brand-500">${parseFloat(amount).toLocaleString()}</span>
            </div>

            <div className="space-y-3">
              {METHODS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setPaymentMethod(m.value)}
                  className={`w-full flex items-center justify-between p-4 border transition-all ${paymentMethod === m.value ? 'border-brand-500 bg-brand-500/5' : 'border-slate-200 dark:border-white/10 hover:border-slate-400'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 ${paymentMethod === m.value ? 'text-brand-500' : 'text-slate-400'}`}>
                      {m.icon}
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">{m.label}</span>
                  </div>
                  {paymentMethod === m.value && <div className="w-2 h-2 bg-brand-500 shadow-[0_0_8px_rgba(31,149,201,0.5)]" />}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setStep("form")} className="py-4 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400">Abort</button>
              <button onClick={confirmMethod} className="py-4 bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest">Continue</button>
            </div>
          </div>
        )}

        {/* Step 3: Countdown + Receipt */}
        {step === "countdown" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-3">
                <Clock className="text-amber-500 animate-pulse" size={18} />
                <span className="text-[11px] font-mono font-bold text-amber-600 uppercase">Awaiting_Confirmation</span>
              </div>
              <span className="text-lg font-black text-amber-600 font-mono">{minutes}:{seconds}</span>
            </div>

            {paymentMethod === 'bitcoin' && (
              <div className="p-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                <p className="text-[10px] font-mono text-slate-400 uppercase mb-4">Target_Address</p>
                <div className="flex items-center justify-between p-3 bg-black text-emerald-500 font-mono text-[11px] break-all border border-emerald-500/20">
                  {bitcoinAddress}
                  <button onClick={() => { navigator.clipboard.writeText(bitcoinAddress || ""); toast.success("COPIED"); }} className="ml-3 hover:text-white transition-colors">
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            )}

            <div {...getRootProps()} className={`border-2 border-dashed p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragActive ? 'border-brand-500 bg-brand-500/5' : 'border-slate-200 dark:border-white/10 hover:border-brand-500/40'}`}>
              <input {...getInputProps()} />
              <UploadCloud size={32} className="text-slate-400 mb-4" />
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1">Dispatch_Transfer_Receipt</h4>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter text-center">Drag image token or click to browse registry</p>
            </div>

            {isUploading && (
              <div className="flex items-center gap-3 justify-center">
                <Terminal size={14} className="text-brand-500 animate-pulse" />
                <span className="text-[10px] font-mono text-brand-500 uppercase">Synchronizing_With_Ledger...</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default DepositPage;