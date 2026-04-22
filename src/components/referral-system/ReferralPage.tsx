"use client";

import { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Share2, Download, Users, Gift, QrCode, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

// --- CUSTOM UI COMPONENTS ---
import RefBonus from "./RefBonus";
import RefOptions from "./RefOptions";
import InviteFriends from "./InviteFriends";
import ReferredUsersTable from "./ReferredUsersTable";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import Link from "next/link";

type ReferredUser = {
  id: string;
  bonus: number;
  referred_by: string;
  created_at: string;
  profiles: {
    email: string;
    created_at: string;
  };
};

export default function ReferralPage() {
  const [referralLink, setReferralLink] = useState("");
  const [totalReferred, setTotalReferred] = useState(0);
  const [referralBonus, setReferralBonus] = useState(0);
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [loading, setLoading] = useState(true);

  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      // 1. Get User Profile for the Referral Code
      const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          const profileData = docSnap.data();
          const code = profileData.refereeId;
          const baseUrl = window.location.origin;
          
          if (code) {
            setReferralLink(`${baseUrl}/register?ref=${code}`);
          }

          // 2. Listen for users who were referred by THIS code
          const referralsQuery = query(
            collection(db, "profiles"),
            where("referredBy", "==", code)
          );

          const unsubReferrals = onSnapshot(referralsQuery, (snapshot) => {
            const referrals = snapshot.docs.map((doc) => {
              const data = doc.data();

              // --- BULLETPROOF DATE PARSING ---
              // Prevents the "toDate is not a function" crash on legacy string dates
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
                bonus: 10, // Static bonus per user
                referred_by: data.referredBy || "",
                created_at: parsedDate,
                profiles: {
                  email: data.email || "—",
                  created_at: parsedDate,
                },
              };
            });

            setReferredUsers(referrals);
            setTotalReferred(snapshot.size);
            setReferralBonus(snapshot.size * 10);
            setLoading(false);
          });

          return () => unsubReferrals();
        }
      });

      return () => unsubProfile();
    });

    return () => unsubscribeAuth();
  }, []);

  const handleDownloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `skyinvest-referral-qr.png`;
    link.click();
    toast.success("Referral QR Node exported.");
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center font-mono text-xs tracking-[0.3em] uppercase animate-pulse text-slate-500">Syncing_Network_Nodes...</div>;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-20 animate-in fade-in duration-500">

      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-10">REWARD_PROTOCOL</div>
          <div className="relative z-10 flex items-center gap-4">
              <div className="p-3 border border-brand-500/20 bg-brand-500/5 shrink-0">
                  <Gift className="text-brand-500" size={24} />
              </div>
              <div>
                  <h1 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Network Expansion</h1>
                  <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">Initialize referral nodes to earn commission on capital flow.</p>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT: Stats & Invitation */}
        <div className="col-span-12 xl:col-span-8 space-y-6">
          <RefBonus
            totalReferred={totalReferred}
            referralBonus={referralBonus}
          />
          
          <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6">
             <InviteFriends />
          </div>

          <RefOptions referralLink={referralLink} />
        </div>

        {/* RIGHT: QR Interface */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          {referralLink && (
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-8 flex flex-col items-center text-center relative group">
              <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">QR_LINK_NODE</div>
              
              <div className="w-12 h-12 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 bg-slate-50 dark:bg-white/5">
                <QrCode size={20} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
              </div>

              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-2">
                Visual Protocol Link
              </h2>
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-tight mb-8 leading-relaxed max-w-xs">
                Nodes can scan this encrypted matrix to bridge directly to your referral coordinate.
              </p>

              <div className="p-4 bg-white border border-slate-200 dark:border-white/10 shadow-xl group-hover:border-brand-500/30 transition-colors">
                <QRCodeCanvas
                  ref={qrRef}
                  value={referralLink}
                  size={200}
                  level="H"
                  includeMargin={false}
                  className="dark:filter dark:contrast-125"
                />
              </div>

              <button
                onClick={handleDownloadQR}
                className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-white transition-all shadow-lg"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <Download size={14} /> Export Node Map
              </button>
            </div>
          )}

          <div className="p-6 border border-dashed border-slate-200 dark:border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-brand-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Affiliate Tier: Level 1</span>
              </div>
              <p className="text-[10px] font-mono text-slate-500 uppercase leading-relaxed">
                You earn <span className="text-emerald-500 font-bold">5.00%</span> on every capital deposit made by nodes in your direct network.
              </p>
              <Link href="/support" className="text-[9px] font-bold text-brand-500 hover:underline uppercase tracking-tighter flex items-center gap-1">
                View Reward Structure <ArrowUpRight size={10} />
              </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Referred Network Ledger</h3>
        </div>
        <ReferredUsersTable referredUsers={referredUsers} />
      </div>

    </div>
  );
}