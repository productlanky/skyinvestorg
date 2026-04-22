"use client";

import React, { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableHeader, TableRow 
} from "../ui/table";
import { ArrowDownCircle, ArrowUpCircle, TrendingUp, Activity, CheckCircle2, Clock, XCircle } from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  status: "approved" | "pending" | "rejected";
  created_at: string;
};

export default function RecentOrders() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) { setLoading(false); return; }

      const txQuery = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(5)
      );

      const unsubscribeTx = onSnapshot(txQuery, (snapshot) => {
        const txData: Transaction[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          // --- BULLETPROOF DATE PARSING ---
          // Prevents the "toDate is not a function" crash from legacy strings
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
            type: data.type || data.category || "unknown", // Check both type and category
            amount: Number(data.amount) || 0,
            status: data.status || "pending",
            created_at: parsedDate, 
          };
        });
        setTransactions(txData);
        setLoading(false);
      }, (error) => {
          console.error("Dashboard Ledger Sync Error:", error);
          setLoading(false);
      });

      return () => unsubscribeTx();
    });
    return () => unsubscribeAuth();
  }, []);

  const getStatusDisplay = (status: Transaction["status"]) => {
    switch (status) {
      case "approved":
        return <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"><CheckCircle2 size={12}/> Approved</span>;
      case "pending":
        return <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20"><Clock size={12}/> Pending</span>;
      case "rejected":
        return <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"><XCircle size={12}/> Rejected</span>;
      default:
        return <span className="text-xs text-gray-500 uppercase">{status}</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('deposit')) return <ArrowDownCircle size={16} className="text-blue-500" />;
    if (t.includes('withdraw')) return <ArrowUpCircle size={16} className="text-indigo-500" />;
    if (t.includes('profit') || t.includes('bonus') || t.includes('trade')) return <TrendingUp size={16} className="text-emerald-500" />;
    return <Activity size={16} className="text-gray-400" />;
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <Table className="w-full min-w-[500px]">
        <TableHeader>
          <TableRow className="border-b border-gray-100 dark:border-gray-800">
            <TableCell isHeader className="py-3 px-4 text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Operation</TableCell>
            <TableCell isHeader className="py-3 px-4 text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Amount</TableCell>
            <TableCell isHeader className="py-3 px-4 text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status</TableCell>
            <TableCell isHeader className="py-3 px-4 text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Uplink_Date</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="py-4 px-4"><div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" /></TableCell>
                <TableCell className="py-4 px-4"><div className="h-4 w-16 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" /></TableCell>
                <TableCell className="py-4 px-4"><div className="h-5 w-20 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" /></TableCell>
                <TableCell className="py-4 px-4"><div className="h-4 w-28 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" /></TableCell>
              </TableRow>
            ))
          ) : transactions.length > 0 ? (
            transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-3">
                      {getTypeIcon(tx.type)}
                      <span className="text-[11px] font-black text-gray-900 dark:text-gray-100 uppercase tracking-widest">
                        {tx.type.replace("_", " ")}
                      </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <span className="text-sm font-black text-gray-700 dark:text-gray-300">
                    ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4">
                  {getStatusDisplay(tx.status)}
                </TableCell>
                <TableCell className="py-3 px-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">
                  {new Date(tx.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-12 text-center text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] opacity-50">
                NO_RECENT_TRANSACTIONS_FOUND
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}