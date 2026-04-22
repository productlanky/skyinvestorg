"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ArrowDownCircle, ArrowUpCircle, TrendingUp, Activity,
  CheckCircle2, Clock, XCircle, X, FileText, Terminal, Hash, Printer
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { toast } from "sonner";

type Transaction = {
  id: string;
  type: string;
  category: string;
  amount: number;
  status: "approved" | "pending" | "rejected" | "lost" | "won";
  method: string;
  created_at: string;
  metadata?: Record<string, any>;
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Sidebar State
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Real-time Firebase Sync ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const txQuery = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribeTx = onSnapshot(txQuery, (snapshot) => {
        const txData: Transaction[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          // --- BULLETPROOF DATE PARSING ---
          // Prevents the "toDate is not a function" crash from legacy string dates
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

          return {
            id: doc.id,
            type: data.type || "unknown",
            category: data.category || "system",
            amount: Number(data.amount) || 0,
            status: data.status || "pending",
            method: data.method || data.category || "System Routing",
            metadata: data.metadata || {},
            created_at: parsedDate,
          };
        });

        setTransactions(txData);
        setLoading(false);
      }, (error) => {
        console.error("Master Ledger Sync Error:", error);
        setLoading(false);
      });

      return () => unsubscribeTx();
    });

    return () => unsubscribeAuth();
  }, []);

  // --- Sidebar Handlers ---
  const handleRowClick = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedTx(null), 300);
    document.body.style.overflow = 'auto';
  };

  // --- Terminal Formatting Helpers ---
  const formatKey = (key: string) => {
    return key.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
  };

  const getStatusDisplay = (status: Transaction["status"]) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 w-fit bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
            <CheckCircle2 size={12} /> Approved
          </span>
        );
      case "won":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 w-fit bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
            <CheckCircle2 size={12} /> Won
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 w-fit bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest">
            <Clock size={12} /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 w-fit bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest">
            <XCircle size={12} /> Rejected
          </span>
        );
      case "lost":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 w-fit bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest">
            <XCircle size={12} /> Lost
          </span>
        );
      default:
        return <span className="text-[10px] font-mono uppercase text-slate-50">{status}</span>;
    }
  };

  const getTypeIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat === 'deposit') return <ArrowDownCircle size={14} className="text-brand-500" />;
    if (cat === 'withdrawal') return <ArrowUpCircle size={14} className="text-rose-500" />;
    if (cat === 'trade' || cat === 'share') return <TrendingUp size={14} className="text-indigo-500" />;
    if (cat === 'bot_trade' || cat === 'copy_trade') return <Activity size={14} className="text-amber-500" />;
    if (cat === 'investment' || cat === 'bonus') return <CheckCircle2 size={14} className="text-emerald-500" />;
    return <Activity size={14} className="text-slate-400" />;
  };

  return (
    <>
      <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative group overflow-hidden flex flex-col">

        <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest pointer-events-none z-10 hidden sm:block">
          MASTER_LEDGER_SYNC
        </div>

        <div className="w-full overflow-x-auto no-scrollbar">
          <Table className="w-full min-w-[800px]">
            <TableHeader className="bg-slate-50 dark:bg-white/[0.02]">
              <TableRow className="border-b border-slate-200 dark:border-white/5">
                {["Operation", "Category", "Amount (USD)", "Status", "Timestamp"].map((label) => (
                  <TableCell
                    key={label}
                    isHeader
                    className="px-6 py-4 text-start text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap"
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                [...Array(6)].map((_, index) => (
                  <TableRow key={index} className="hover:bg-transparent border-b border-slate-100 dark:border-white/5">
                    {[...Array(5)].map((_, j) => (
                      <TableCell key={j} className="px-6 py-5">
                        <div className={`h-4 bg-slate-100 dark:bg-white/5 animate-pulse ${j === 2 ? 'w-16' : j === 3 ? 'w-24' : 'w-32'}`} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center border-none">
                    <div className="flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
                      <Activity size={32} />
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
                        LEDGER_EMPTY
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    onClick={() => handleRowClick(tx)}
                    className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors border-b border-slate-100 dark:border-white/5 group cursor-pointer"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-brand-500/50 transition-colors">
                          {getTypeIcon(tx.category)}
                        </div>
                        <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest group-hover:text-brand-500 transition-colors">
                          {tx.type.replace(/_/g, " ")}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/10 px-2 py-1">
                        {tx.category.replace(/_/g, " ")}
                      </span>
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <span className="text-sm font-mono font-black text-slate-700 dark:text-slate-200">
                        ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      {getStatusDisplay(tx.status)}
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                        <Terminal size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-500" />
                        {new Date(tx.created_at).toLocaleString(undefined, {
                          month: 'short', day: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit', hour12: false
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-500/50 pointer-events-none"></div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/20 dark:bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeSidebar}
          />

          <div className="relative w-full max-w-md h-full bg-white dark:bg-[#0D1117] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 border border-brand-500/20 bg-brand-500/10">
                  <FileText className="text-brand-500" size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Transaction_Details</h3>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Ledger Entry Node</p>
                </div>
              </div>
              <button onClick={closeSidebar} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors">
                <X size={18} />
              </button>
            </div>

            {selectedTx && (
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                <div className="text-center p-6 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.01] relative">
                  <div className="absolute top-2 right-2">
                    {getStatusDisplay(selectedTx.status)}
                  </div>
                  <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">Net_Volume</p>
                  <h2 className="text-4xl font-black font-mono text-slate-900 dark:text-white tracking-tighter">
                    ${selectedTx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </h2>
                  <p className="text-[10px] font-mono text-brand-500 uppercase tracking-widest mt-3">
                    {selectedTx.type.replace(/_/g, " ")}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] border-b border-slate-200 dark:border-white/10 pb-2">
                    System_Identifiers
                  </h4>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Receipt_ID</span>
                    <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Hash size={10} className="text-brand-500" /> {selectedTx.id.substring(0, 12)}...
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Timestamp</span>
                    <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                      {new Date(selectedTx.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Routing_Category</span>
                    <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
                      {selectedTx.category.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>

                {selectedTx.metadata && Object.keys(selectedTx.metadata).length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] border-b border-slate-200 dark:border-white/10 pb-2">
                      Execution_Parameters
                    </h4>

                    {Object.entries(selectedTx.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start gap-4">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest shrink-0 mt-0.5">
                          {formatKey(key)}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 text-right break-words max-w-[200px]">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
              <button
                onClick={() => toast.info("PRINT_PROTOCOL: Downloading receipt...")}
                className="w-full py-4 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
              >
                <Printer size={14} /> Download_Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}