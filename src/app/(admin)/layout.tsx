"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { getUser } from "@/lib/appwrite/auth";
import {
  databases,
  DB_ID,
  PROFILE_COLLECTION_ID,
} from "@/lib/appwrite/client";
import { Query } from "appwrite";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type SessionType = Awaited<ReturnType<typeof getUser>>;
type ProfileTypeSus = {
  $id: string;
  userId: string;
  suspended?: boolean; // <- your boolean flag
  // ...any other fields
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  const [sessionInfo, setSessionInfo] = useState<SessionType | null>(null);
  const [profile, setProfile] = useState<ProfileTypeSus | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch session + profile
  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);
      try {
        const user = await getUser();

        if (!user) {
          setSessionInfo(null);
          setProfile(null);
          return;
        }

        setSessionInfo(user);

        const res = await databases.listDocuments(
          DB_ID,
          PROFILE_COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );

        if (res.total > 0) {
          setProfile(res.documents[0] as unknown as ProfileTypeSus);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetching session/profile:", err);
        setSessionInfo(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndProfile();
  }, []);

  // Redirect logic
  useEffect(() => {
    if (loading) return;

    // No session → sign in
    if (!sessionInfo) {
      router.replace("/signin");
      return;
    }

    // Session exists but profile is suspended → suspended page
    if (pathname !== "/suspended" && profile?.suspended === true) {
      router.replace("/suspended");
    }
  }, [loading, sessionInfo, profile, pathname, router]);

  // Avoid flashing content while deciding / redirecting
  if (
    loading ||
    !sessionInfo ||
    (profile?.suspended === true && pathname !== "/suspended")
  ) {
    return null; // or a spinner skeleton
  }

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
