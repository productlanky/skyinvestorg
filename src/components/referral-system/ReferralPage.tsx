"use client";

import { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import RefBonus from "./RefBonus";
import RefOptions from "./RefOptions";
import InviteFriends from "./InviteFriends";
import ReferredUsersTable from "./ReferredUsersTable";
import Button from "../ui/button/Button";
import { getUser } from "@/lib/appwrite/auth";
import {
  databases,
  DB_ID,
  PROFILE_COLLECTION_ID,
} from "@/lib/appwrite/client";
import { Query } from "appwrite";

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

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yourapp.com";
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function fetchReferralInfo() {
      try {
        const user = await getUser().catch(() => null);
        if (!user) return;

        // Profile
        const profileRes = await databases.listDocuments(
          DB_ID,
          PROFILE_COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );

        const profileDoc = profileRes.documents[0];
        const code = profileDoc?.refereeId;

        if (code) {
          setReferralLink(`${baseUrl}/signup?ref=${code}`);
        }

        // Referred Users
        const referralsList = await databases.listDocuments(
          DB_ID,
          PROFILE_COLLECTION_ID,
          [Query.equal("referredBy", profileDoc.refereeId)]
        );

        const referralsWithProfiles = referralsList.documents.map((ref) => ({
          id: ref.$id,
          bonus: 10,
          referred_by: ref.referredBy || "",
          created_at: ref.$createdAt,
          profiles: {
            email: ref.email,
            created_at: ref.$createdAt,
          },
        }));

        setReferredUsers(referralsWithProfiles);
        setTotalReferred(referralsList.total);

        setReferralBonus(referralsList.total * 10);
      } catch (error) {
        console.error("Error fetching referral info:", error);
      }
    }

    fetchReferralInfo();
  }, [baseUrl]);

  const handleDownloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "referral-qr.png";
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10 pt-6 space-y-10">

      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Referral Rewards
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Share your link, invite friends and earn bonuses automatically.
        </p>
      </div>

      {/* Top grid */}
      <div className="grid grid-cols-12 gap-6">

        {/* Left section */}
        <div className="col-span-12 xl:col-span-7 space-y-6">
          <RefBonus
            totalReferred={totalReferred}
            referralBonus={referralBonus}
          />

          <InviteFriends />
        </div>

        {/* QR Code card */}
        <div className="col-span-12 xl:col-span-5 space-y-6">
          {referralLink && (
            <div
              className="
                flex flex-col items-center text-center 
                rounded-2xl border border-gray-200 dark:border-white/[0.06] 
                bg-white/80 dark:bg-white/[0.05]
                backdrop-blur-xl shadow-[0_10px_35px_rgba(15,23,42,0.08)]
                p-7 gap-4
              "
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Share Your QR Code
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                Friends can scan this code to sign up instantly with your
                referral.
              </p>

              <QRCodeCanvas
                ref={qrRef}
                value={referralLink}
                size={240}
                className="dark:invert rounded-xl"
              />

              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={handleDownloadQR}
              >
                Download QR Code
              </Button>
            </div>
          )}


        </div>
      </div>
      <RefOptions referralLink={referralLink} />
      {/* Referred Users Table */}
      <ReferredUsersTable referredUsers={referredUsers} />

    </div>
  );
}
