"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Bell, CheckCheck, X, Clock, Info, ShieldAlert, Signal } from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, limit, onSnapshot, doc, writeBatch } from "firebase/firestore";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        setNotifications([]);
        return;
      }

      // --- REAL-TIME SIGNAL FEED ---
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      const unsubscribeNotifs = onSnapshot(q, (snapshot) => {
        const mapped: Notification[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          // --- BULLETPROOF DATE PARSING ---
          // Prevents the "toDate is not a function" crash from legacy Appwrite strings
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
            title: data.title || "System Alert",
            message: data.message || "",
            type: data.type || "info",
            read: data.read || false,
            created_at: parsedDate,
          };
        });

        setNotifications(mapped);
        setHasUnread(mapped.some((n) => !n.read));
        setLoading(false);
      }, (error) => {
        console.error("Signal Feed Sync Failure:", error);
        setLoading(false);
      });

      return () => unsubscribeNotifs();
    });

    return () => unsubscribeAuth();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = async () => {
    const user = auth.currentUser;
    if (!user || unreadCount === 0) return;

    try {
      const batch = writeBatch(db);
      notifications.forEach(n => {
        if (!n.read) {
          const ref = doc(db, "notifications", n.id);
          batch.update(ref, { read: true });
        }
      });

      await batch.commit();
    } catch (error) {
      console.error("Protocol Error: Mark all as read failed", error);
    }
  };

  return (
    <div className="relative shrink-0">
      {/* TRIGGER BUTTON */}
      <button
        className="relative flex h-10 w-10 items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1117] text-slate-500 transition-colors hover:border-brand-500 hover:text-brand-500 dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Signal Feed"
      >
        {hasUnread && (
          <span className="absolute -top-1 -right-1 z-10 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-600 border border-white dark:border-[#0D1117]"></span>
          </span>
        )}
        <Bell size={18} />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute -right-[240px] mt-4 z-9999999! flex h-[500px] w-[350px] flex-col border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1117] shadow-2xl p-0 sm:w-[380px] lg:right-0 overflow-hidden"
      >
        <div className="flex flex-col flex-1 h-full w-full">

          {/* HEADER */}
          <div className="shrink-0 p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 bg-brand-500/10 text-brand-500 border border-brand-500/20">
                <Signal size={12} />
              </div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                Notifications
              </h5>
              {unreadCount > 0 && (
                <span className="bg-brand-500 text-white px-1.5 py-0.5 text-[8px] font-black font-mono">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[9px] font-mono font-bold text-slate-400 hover:text-brand-500 uppercase flex items-center gap-1 transition-colors"
                >
                  <CheckCheck size={12} /> Clear_Notifications
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* FEED CONTENT */}
          <div className="flex-1 grow overflow-y-auto no-scrollbar bg-white dark:bg-[#0D1117]">
            {loading ? (
              <div className="h-full flex items-center justify-center font-mono text-[10px] text-slate-500 uppercase animate-pulse">Establishing_Link...</div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center opacity-40">
                <div className="w-12 h-12 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4">
                  <Bell size={24} className="text-slate-300" />
                </div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Node Quiet: Zero Incoming Signals</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-white/5">
                {notifications.map((n) => (
                  <li key={n.id} className={`group transition-colors ${!n.read ? 'bg-brand-500/[0.03]' : ''}`}>
                    <DropdownItem
                      onItemClick={() => setIsOpen(false)}
                      className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-white/[0.01]"
                    >
                      <div className={`mt-1 h-8 w-8 shrink-0 flex items-center justify-center border transition-all
                      ${n.read
                          ? 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5'
                          : 'border-brand-500/30 bg-brand-500/10 shadow-[0_0_10px_rgba(31,149,201,0.1)]'
                        }`}
                      >
                        {n.type === 'alert'
                          ? <ShieldAlert size={14} className="text-red-500" />
                          : <Info size={14} className={n.read ? 'text-slate-400' : 'text-brand-500'} />
                        }
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h6 className={`text-[11px] font-black uppercase tracking-tight truncate ${n.read ? 'text-slate-600 dark:text-slate-400 font-bold' : 'text-slate-900 dark:text-white'}`}>
                            {n.title}
                          </h6>
                          <span className="text-[9px] font-mono font-bold text-slate-400 shrink-0">
                            {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                          </span>
                        </div>
                        <p className={`text-[10px] font-mono leading-relaxed mb-3 line-clamp-2 uppercase ${n.read ? 'text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                          {n.message}
                        </p>

                        <div className="flex items-center gap-2">
                          <Clock size={10} className="text-slate-400" />
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">
                            {new Date(n.created_at).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                          </span>
                          {!n.read && (
                            <span className="ml-auto text-[8px] font-black text-brand-500 uppercase tracking-widest animate-pulse">Unread_Notification</span>
                          )}
                        </div>
                      </div>
                    </DropdownItem>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* FOOTER ACTION */}
          {/* <div className="shrink-0 p-3 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5">
            <Link
              href="/notifications"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full py-2.5 text-[10px] font-black uppercase tracking-widest bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-brand-500 transition-all active:scale-[0.98]"
              style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
            >
              View All Ledger
            </Link>
          </div> */}
        </div>
      </Dropdown>
    </div>
  );
}