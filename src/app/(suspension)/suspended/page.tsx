"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface FlashUser {
    name?: string;
    email?: string;
    reason?: string; // Added to catch Admin suspension reasons
}

export default function SuspendedPage() {
    const [user, setUser] = useState<FlashUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch the user's profile from Firestore
                    const profileRef = doc(db, "profiles", firebaseUser.uid);
                    const profileSnap = await getDoc(profileRef);

                    let displayName = firebaseUser.displayName || "User";
                    let suspensionReason = "";

                    if (profileSnap.exists()) {
                        const data = profileSnap.data();
                        // Combine first and last name from the profiles collection
                        const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
                        if (fullName) displayName = fullName;
                        
                        // Grab the specific reason the admin typed in the CRM
                        suspensionReason = data.suspensionReason || "";
                    }

                    setUser({
                        name: displayName,
                        email: firebaseUser.email || "",
                        reason: suspensionReason,
                    });
                } catch (err) {
                    console.error("Error syncing suspended profile:", err);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribeAuth();
    }, []);

    return (
        <div className="relative min-h-[calc(100vh-80px)] px-4 py-10 sm:px-6 lg:px-8">
            {/* Background accent */}
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
                <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-blue-light-400/10 blur-3xl" />
            </div>

            <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center animate-in fade-in duration-500">
                {/* Main card */}
                <div className="w-full rounded-3xl border border-border/70 bg-gradient-to-b from-background/95 via-background/98 to-background/100 shadow-[0_18px_25px_rgba(15,23,42,0.16)] px-6 py-8 sm:px-8 sm:py-10">
                    
                    {/* Icon */}
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xl font-bold">
                            !
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1 text-[11px] font-medium text-destructive uppercase tracking-widest">
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                        Account status · Suspended
                    </div>

                    {/* Heading */}
                    <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
                        Your account is temporarily suspended
                    </h1>

                    {/* Dynamic Subtext */}
                    <p className="mx-auto mb-6 max-w-xl text-sm sm:text-[13px] text-muted-foreground leading-relaxed">
                        Hello <b>{user?.name}</b>. 
                        {user?.reason ? (
                            <span> Your account has been suspended by the administration for the following reason: <br/><br/><b className="text-foreground border-l-2 border-destructive pl-2 py-1 block bg-destructive/5">{user.reason}</b><br/></span>
                        ) : (
                            <span> Your account has exceeded the minimum thresholds for your account type. </span>
                        )}
                        Please contact support to upgrade or clear your account. Trading is now locked.
                    </p>

                    {/* User chip */}
                    {!isLoading && user && (user.name || user.email) && (
                        <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/70 px-3.5 py-1.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary uppercase">
                                {user.name
                                    ? user.name.charAt(0)
                                    : user.email?.charAt(0) || "U"}
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[11px] font-medium text-foreground">
                                    {user.name || "User"}
                                </span>
                                {user.email && (
                                    <span className="text-[10px] text-muted-foreground">
                                        {user.email}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Reasons list (Only show if there is no explicit reason provided) */}
                    {!user?.reason && (
                        <div className="mx-auto mb-6 max-w-md space-y-2 text-left text-[12px] text-muted-foreground">
                            <p className="text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80">
                                Why this might have happened
                            </p>
                            <ul className="mt-1 space-y-1.5">
                                <li className="flex gap-2">
                                    <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                                    <span>Unusual login or trading activity detected.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                                    <span>Pending KYC / identity verification review.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                                    <span>Compliance check related to your recent deposits.</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* CTA buttons */}
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                        <Button
                            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium"
                            onClick={() => {
                                window.location.href = "mailto:support@flashprofits.xyz?subject=Account%20Suspension%20Inquiry";
                            }}
                        >
                            Contact support
                        </Button>
                    </div>

                    {/* Footer note */}
                    <p className="mt-6 text-[11px] text-muted-foreground">
                        If you believe this is a mistake, reach out to our team using the
                        email linked to your account. We’ll review your case as
                        soon as possible.
                    </p>
                </div>
            </div>
        </div>
    );
}