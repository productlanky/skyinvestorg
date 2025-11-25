"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@/components/ui/button/Button";
import { toast } from "sonner";
import Input from "../form/input/InputField";
import { getUser } from "@/lib/appwrite/auth";
import {
  databases,
  DB_ID,
  RECEIPTS_BUCKET,
  storage,
  TRANSACTION_COLLECTION,
} from "@/lib/appwrite/client";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import { Copy, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import Radio from "../form/input/Radio";

type StepType = "form" | "method" | "countdown";

const METHODS = [
  { value: "bitcoin", label: "Bitcoin" },
  { value: "bank", label: "Bank transfer" },
  { value: "paypal", label: "PayPal" },
];

const DepositPage = () => {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<StepType>("form");
  const [countdown, setCountdown] = useState(1800); // 30 min in seconds
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const router = useRouter();

  const bitcoinAddress = process.env.NEXT_PUBLIC_BITCOIN_ADDRESS;

  // Countdown effect
  useEffect(() => {
    if (step === "countdown" && countdown > 0) {
      const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, countdown]);

  const handleStartDeposit = () => {
    if (!amount || parseFloat(amount) < 100) {
      toast.error("Minimum deposit is $100");
      return;
    }
    setStep("method");
  };

  const confirmMethod = async () => {
    try {
      if (!paymentMethod) {
        toast.error("Select a payment method.");
        return;
      }

      const user = await getUser();

      const transaction = await databases.createDocument(
        DB_ID,
        TRANSACTION_COLLECTION,
        ID.unique(),
        {
          userId: user.$id,
          type: "deposit",
          amount: parseFloat(amount),
          status: "pending",
          method: paymentMethod,
        }
      );

      setTransactionId(transaction.$id);
      setStep("countdown");
    } catch (error) {
      console.error(error);
      toast.error("Failed to start deposit.");
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const user = await getUser();
      if (!file || !transactionId || !user) return;

      setIsUploading(true);

      const uploadedFile = await storage.createFile(
        RECEIPTS_BUCKET,
        `receipt-${transactionId}`,
        file
      );

      const publicUrl = storage.getFileView(RECEIPTS_BUCKET, uploadedFile.$id);

      await databases.updateDocument(
        DB_ID,
        TRANSACTION_COLLECTION,
        transactionId,
        {
          photoUrl: publicUrl,
        }
      );

      toast.success("Receipt uploaded successfully!");
      router.push("/transactions");
    } catch (error) {
      console.error("Error uploading receipt:", error);
      toast.error("Error uploading receipt.");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setReceiptFile(acceptedFiles[0]);
        handleUpload(acceptedFiles[0]);
      }
    },
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  const copyBitcoinAddress = () => {
    if (bitcoinAddress) {
      navigator.clipboard.writeText(bitcoinAddress);
      toast.success("Bitcoin address copied!");
    }
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = (countdown % 60).toString().padStart(2, "0");

  const currentStepIndex =
    step === "form" ? 0 : step === "method" ? 1 : 2;

  const stepsMeta = [
    { key: "form", label: "Enter amount", step: 1 },
    { key: "method", label: "Choose method", step: 2 },
    { key: "countdown", label: "Upload receipt", step: 3 },
  ] as const;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 pb-10">
      {/* Page Heading */}
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Deposit funds
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl">
          Start a new deposit, choose your preferred payment method and upload
          your receipt so our team can verify and credit your balance.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-6 flex items-center gap-3 text-xs">
        {stepsMeta.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isCompleted = idx < currentStepIndex;

          return (
            <React.Fragment key={s.key}>
              <div className="flex items-center gap-2">
                <div
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold",
                    isActive
                      ? "border-brand-500 bg-brand-500 text-white"
                      : isCompleted
                        ? "border-brand-500/40 bg-brand-500/10 text-brand-600 dark:text-brand-300"
                        : "border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400",
                  ].join(" ")}
                >
                  {s.step}
                </div>
                <span
                  className={[
                    "hidden text-[11px] uppercase tracking-wide md:inline-block",
                    isActive
                      ? "text-brand-500"
                      : "text-gray-500 dark:text-gray-400",
                  ].join(" ")}
                >
                  {s.label}
                </span>
              </div>
              {idx < stepsMeta.length - 1 && (
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200/80 via-gray-200/60 to-gray-200/30 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Card */}
      <div
        className="
          rounded-2xl border border-border/60 
          bg-card/80 backdrop-blur-xl
          shadow-[0_18px_45px_rgba(15,23,42,0.18)]
          dark:shadow-[0_0_40px_rgba(15,23,42,0.9)]
          px-5 py-6 md:px-7 md:py-7
          space-y-6
        "
      >
        {/* Step 1: Enter Amount */}
        {step === "form" && (
          <>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                How much do you want to deposit?
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Minimum deposit is{" "}
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  $100
                </span>
                . Funds will be reviewed and credited once your payment is
                confirmed.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="number"
                min={0}
                placeholder="Enter amount (min $100)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 text-base rounded-lg border border-gray-200 bg-white text-sm 
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 
             focus-visible:border-brand-500/60 dark:border-gray-700 dark:bg-gray-900 
             dark:text-gray-100"
              />


              {/* Quick amounts */}
              <div className="flex flex-wrap gap-2 text-xs">
                {[100, 250, 500, 1000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className="
        rounded-full border border-gray-200 
        px-3 py-1.5 text-gray-600 text-xs
        hover:border-brand-500 hover:text-brand-600
        dark:border-gray-700 dark:text-gray-300 
        dark:hover:border-brand-400 dark:hover:text-brand-300
        transition-colors
      "
                  >
                    ${val}
                  </button>
                ))}
              </div>

            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                You’ll choose a payment method on the next step.
              </p>
              <Button
                onClick={handleStartDeposit}
                className="inline-flex items-center gap-1.5 px-4 py-2"
              >
                Continue
                <ArrowRight size={14} />
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Select Payment Method */}
        {step === "method" && (
          <>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Choose how you want to pay
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Deposit amount:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${parseFloat(amount || "0").toFixed(2)}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft size={12} />
                Edit amount
              </button>
            </div>

            <div className="grid gap-3 mt-2">
              {METHODS.map((m) => {
                const isActive = paymentMethod === m.value;
                return (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setPaymentMethod(m.value)}
                    className={[
                      "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors",
                      isActive
                        ? "border-brand-500/80 bg-brand-500/5 shadow-sm"
                        : "border-gray-200 bg-gray-50/60 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40 dark:hover:bg-gray-900",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          "flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold",
                          isActive
                            ? "bg-brand-500 text-white"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
                        ].join(" ")}
                      >
                        {m.label[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {m.label}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {m.value === "bitcoin"
                            ? "Fast, on-chain payment with BTC"
                            : m.value === "bank"
                              ? "Send from your local bank account"
                              : "Use your PayPal wallet"}
                        </p>
                      </div>
                    </div>
                    <Radio
                      id={`method-${m.value}`}
                      label=""
                      name="method"
                      value={m.value}
                      checked={paymentMethod === m.value}
                      onChange={(value: string) => setPaymentMethod(value)}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <Button
                onClick={confirmMethod}
                className="inline-flex items-center gap-1.5 px-4 py-2"
              >
                Start deposit
                <ArrowRight size={14} />
              </Button>
            </div>
          </>
        )}

        {/* Step 3: Payment + Receipt Upload */}
        {step === "countdown" && (
          <>
            {/* Summary */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Complete your payment
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Amount:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${parseFloat(amount || "0").toFixed(2)}
                  </span>{" "}
                  · Method:{" "}
                  <span className="uppercase">
                    {paymentMethod ?? "—"}
                  </span>
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                <Clock size={12} />
                <span>
                  Time left: {minutes}:{seconds}
                </span>
              </div>
            </div>

            {/* Bitcoin details */}
            {paymentMethod === "bitcoin" && (
              <div className="mt-3 space-y-2 rounded-xl border border-dashed border-brand-500/50 bg-brand-500/5 p-4">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Send exactly{" "}
                  <span className="font-semibold">
                    ${parseFloat(amount || "0").toFixed(2)}
                  </span>{" "}
                  worth of Bitcoin to the address below. Network fees are not
                  included in this amount.
                </p>
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2.5 font-mono text-[11px] text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  <span className="flex-1 break-all">
                    {bitcoinAddress || "Bitcoin address not configured"}
                  </span>
                  {bitcoinAddress && (
                    <button
                      type="button"
                      onClick={copyBitcoinAddress}
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-800/90 p-1.5 text-white hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Non-bitcoin info */}
            {paymentMethod && paymentMethod !== "bitcoin" && (
              <div className="mt-3 space-y-2 rounded-xl border border-dashed border-gray-300 bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Please follow the {paymentMethod} payment instructions you
                  received. Once you’ve made the transfer, upload your payment
                  receipt below so we can verify and credit your account.
                </p>
              </div>
            )}

            {/* Upload Section */}
            <div
              {...getRootProps()}
              className={[
                "mt-5 rounded-2xl border border-dashed p-7 lg:p-9 cursor-pointer transition-colors",
                isDragActive
                  ? "border-brand-500 bg-brand-500/5"
                  : "border-gray-300 bg-gray-50/60 hover:border-brand-500/80 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/60 dark:hover:bg-gray-900",
              ].join(" ")}
            >
              <Input {...getInputProps()} />
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <svg width="24" height="24" viewBox="0 0 29 28">
                    <path
                      fill="currentColor"
                      d="M14.5 3.917a.75.75 0 00-.547.239L8.574 9.532a.75.75 0 001.06 1.06l4.117-4.116v12.19a.75.75 0 001.5 0V6.476l4.113 4.116a.75.75 0 001.06-1.06l-5.341-5.338a.75.75 0 00-.583-.277zM5.917 18.667a.75.75 0 10-1.5 0v3.167A2.25 2.25 0 006.667 24.084h15.667a2.25 2.25 0 002.25-2.25v-3.167a.75.75 0 10-1.5 0v3.167a.75.75 0 01-.75.75H6.667a.75.75 0 01-.75-.75v-3.167z"
                    />
                  </svg>
                </div>
                <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white/90">
                  {isDragActive
                    ? "Drop your receipt to upload"
                    : "Upload payment receipt"}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 max-w-sm">
                  Drop a PNG, JPG, WebP or SVG receipt here, or click to browse
                  your files. We’ll notify you once your deposit is verified.
                </p>
                {receiptFile && (
                  <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                    Selected file:{" "}
                    <span className="font-medium">{receiptFile.name}</span>
                  </p>
                )}
              </div>
            </div>

            {isUploading && (
              <p className="mt-3 text-xs font-medium text-brand-600 dark:text-brand-400">
                Uploading receipt…
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DepositPage;
