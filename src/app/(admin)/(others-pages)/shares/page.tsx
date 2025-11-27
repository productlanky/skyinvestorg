"use client";

import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { getUser, fetchTeslaPrice } from "@/lib/appwrite/auth";
import {
    databases,
    DB_ID,
    PROFILE_COLLECTION_ID,
    STOCKLOG_COLLECTION_ID,
} from "@/lib/appwrite/client";
import { ID, Query } from "appwrite";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export default function BuySharesPage() {
    const [sharePrice, setSharePrice] = useState(0);
    const [quantity, setQuantity] = useState<number | "">("");
    const [amount, setAmount] = useState<number | "">("");
    const [mode, setMode] = useState<"shares" | "amount">("shares");
    const [balance, setBalance] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [documentId, setDocumentId] = useState("");

    const fetchBalance = async () => {
        try {
            const user = await getUser();
            const res = await databases.listDocuments(DB_ID, PROFILE_COLLECTION_ID, [
                Query.equal("userId", user.$id),
            ]);

            if (res.total > 0) {
                const profile = res.documents[0];
                setBalance(profile.totalDeposit || 0);
                setDocumentId(profile.$id);
            }
        } catch (err) {
            console.error("Error fetching balance:", err);
        }
    };

    useEffect(() => {
        fetchTeslaPrice().then((price) => {
            setSharePrice(parseFloat(price));
        });

        fetchBalance();
    }, []);

    const handleSharesChange = (val: string) => {
        const shares = parseFloat(val);
        if (!isNaN(shares) && shares >= 0) {
            const total = parseFloat((shares * sharePrice).toFixed(2));
            setQuantity(shares);
            setAmount(total);
            validateBalance(total);
        } else {
            setQuantity("");
            setAmount("");
            setError("");
        }
    };

    const handleAmountChange = (val: string) => {
        const dollars = parseFloat(val);
        if (!isNaN(dollars) && dollars >= 0) {
            const shares = parseFloat((dollars / sharePrice).toFixed(4));
            setAmount(dollars);
            setQuantity(shares);
            validateBalance(dollars);
        } else {
            setAmount("");
            setQuantity("");
            setError("");
        }
    };

    const validateBalance = (total: number) => {
        if (total > balance) {
            setError("Insufficient balance to complete this purchase.");
        } else {
            setError("");
        }
    };

    const shootConfetti = () => {
        const end = Date.now() + 800;

        const frame = () => {
            confetti({
                particleCount: 8,
                startVelocity: 35,
                spread: 360,
                ticks: 70,
                origin: { x: Math.random(), y: Math.random() - 0.15 },
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    };

    const handleBuy = async () => {
        if (!quantity || !amount || amount > balance) return;

        try {
            setIsLoading(true);
            const user = await getUser();

            await databases.createDocument(
                DB_ID,
                STOCKLOG_COLLECTION_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    shares: quantity,
                    amount: amount,
                    pricePerShare: sharePrice,
                }
            );

            const newBalance = balance - Number(amount);

            await databases.updateDocument(
                DB_ID,
                PROFILE_COLLECTION_ID,
                documentId,
                {
                    totalDeposit: newBalance,
                }
            );

            setBalance(newBalance);

            toast(
                `Successfully purchased ${quantity} share${Number(quantity) === 1 ? "" : "s"
                } for $${amount}`
            );

            shootConfetti();
            setQuantity("");
            setAmount("");
            setError("");
        } catch (err) {
            console.error("Error creating stock log:", err);
            toast.error("Failed to complete transaction.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative px-4 py-6 sm:px-6 lg:px-8">
            {/* Background accent */}
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
                <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-blue-light-400/10 blur-3xl" />
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
                    <div className="rounded-2xl border border-border/60 bg-card px-6 py-5 shadow-xl flex flex-col items-center gap-3">
                        <div className="relative h-10 w-10">
                            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            Processing your transaction...
                        </p>
                    </div>
                </div>
            )}

            <div
                className="
          mx-auto max-w-5xl rounded-3xl border border-border/70
          bg-gradient-to-b from-background/90 via-background/95 to-background/100
          shadow-[0_18px_25px_rgba(15,23,42,0.10)]
          px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10
        "
            >
                {/* Top header */}
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Live TSLA market · Fractional shares
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
                            Buy Flash Profits shares
                        </h1>
                        <p className="text-sm sm:text-[13px] text-muted-foreground max-w-xl">
                            Build your position in a few clicks. Enter shares or dollar amount,
                            we’ll calculate the rest and check your balance in real time.
                        </p>
                    </div>

                    {/* Mini price card */}
                    <div
                        className="
              w-full max-w-xs rounded-2xl border border-border/60 bg-card/70
              px-4 py-3.5 sm:px-5 sm:py-4 flex flex-col gap-2
            "
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-[13px] font-semibold text-primary">
                                    TSLA
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                        Current price
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">
                                        ${sharePrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[11px] text-emerald-400 font-medium">
                                    +2.4% today
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    Simulated change
                                </span>
                            </div>
                        </div>

                        {/* Faux sparkline */}
                        <div className="mt-2 h-10 w-full rounded-lg bg-gradient-to-r from-primary/15 via-blue-light-400/15 to-primary/5 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-60">
                                <svg
                                    viewBox="0 0 120 40"
                                    className="h-full w-full text-primary"
                                    preserveAspectRatio="none"
                                >
                                    <polyline
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        points="0,30 15,26 30,28 45,20 60,24 75,14 90,18 105,10 120,12"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main layout: left summary, right form */}
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                    {/* Left: Balance + Summary */}
                    <div className="space-y-5">
                        {/* Balance card */}
                        <div className="rounded-2xl border border-border/60 bg-card/70 px-4 py-4 sm:px-5 sm:py-5 space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                        Available to invest
                                    </p>
                                    <p className="text-xl sm:text-2xl font-semibold text-foreground">
                                        ${balance.toFixed(2)}
                                    </p>
                                </div>
                            
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                                Only your available balance can be used for this order. Your
                                wallet balance reflects all funds including locked amounts.
                            </p>
                        </div>

                        {/* Order preview */}
                        <div className="rounded-2xl border border-dashed border-border/70 bg-background/40 px-4 py-4 sm:px-5 sm:py-5 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    Estimated shares
                                </span>
                                <span className="text-sm sm:text-base font-medium text-foreground">
                                    {quantity || 0}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    Estimated total cost
                                </span>
                                <span className="text-sm sm:text-base font-medium text-foreground">
                                    ${amount || 0}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    After-order balance
                                </span>
                                <span className="text-sm sm:text-base font-medium text-foreground">
                                    $
                                    {amount
                                        ? Math.max(balance - Number(amount), 0).toFixed(2)
                                        : balance.toFixed(2)}
                                </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                                This is an estimate based on the latest price. Actual execution
                                may vary slightly during order processing.
                            </p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="rounded-2xl border border-border/60 bg-card/80 px-4 py-4 sm:px-5 sm:py-5 space-y-5">
                        {/* Toggle */}
                        <div className="inline-flex w-full rounded-full bg-muted p-1">
                            <button
                                onClick={() => setMode("shares")}
                                className={`flex-1 rounded-full px-3 py-2.5 text-xs sm:text-sm font-medium transition ${mode === "shares"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                By shares
                            </button>
                            <button
                                onClick={() => setMode("amount")}
                                className={`flex-1 rounded-full px-3 py-2.5 text-xs sm:text-sm font-medium transition ${mode === "amount"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                By amount
                            </button>
                        </div>

                        {/* Shares input */}
                        {mode === "shares" && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-foreground">
                                        Number of shares
                                    </label>
                                    <span className="text-[11px] text-muted-foreground">
                                        Min 0.0001
                                    </span>
                                </div>
                                <Input
                                    type="number"
                                    min="0"
                                    step={0.0001}
                                    value={quantity}
                                    onChange={(e) => handleSharesChange(e.target.value)}
                                    className="w-full"
                                    placeholder="0.0000"
                                />
                            </div>
                        )}

                        {/* Amount input */}
                        {mode === "amount" && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-foreground">
                                        Amount in dollars
                                    </label>
                                    <span className="text-[11px] text-muted-foreground">
                                        Max ${balance.toFixed(2)}
                                    </span>
                                </div>
                                <Input
                                    type="number"
                                    min="0"
                                    step={0.01}
                                    value={amount}
                                    onChange={(e) => handleAmountChange(e.target.value)}
                                    className="w-full"
                                    placeholder="0.00"
                                />
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2">
                                <p className="text-xs text-destructive">{error}</p>
                            </div>
                        )}

                        {/* Button */}
                        <Button
                            onClick={handleBuy}
                            disabled={!quantity || !amount || !!error || isLoading}
                            className="w-full py-2.5 sm:py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Place buy order
                        </Button>

                        <p className="text-[11px] sm:text-xs text-muted-foreground text-center">
                            Transactions are processed instantly in your simulated portfolio.
                            Prices are indicative and may not reflect real-world execution
                            slippage.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
