"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import Select from "../form/Select";
import { ShieldCheck, Info, Landmark, Wallet, DollarSign } from "lucide-react";

const WITHDRAWAL_OPTIONS = [
  { label: "BITCOIN_NETWORK (BTC)", value: "BTC" },
  { label: "BANK_WIRE_TRANSFER", value: "BANK" },
  { label: "PAYPAL_WALLET", value: "PAYPAL" },
];

export type WithdrawFormFields = {
  amount: number;
  method: "BTC" | "BANK" | "PAYPAL";
  address?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  paypalEmail?: string;
  password: string;
};

export default function WithdrawForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<WithdrawFormFields>;
}) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WithdrawFormFields>({
    defaultValues: {
      method: "BTC",
    },
  });

  const selectedMethod = watch("method");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 relative"
    >
      {/* 1. QUANTUM SPECIFICATION (Amount) */}
      <div className="space-y-2">
        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
          Withdrawal_Magnitude_USD
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 font-mono font-bold">$</div>
          <Input
            type="number"
            placeholder="0.00"
            onWheel={(e: any) => e.target.blur()}
            {...register("amount", {
              required: "Amount is required",
              min: { value: 100, message: "Minimum amount is $100" },
            })}
            error={!!errors.amount}
            hint={errors.amount?.message}
            className="pl-8 py-4 text-xl font-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* 2. TRANSMISSION_PROTOCOL (Method) */}
      <div className="space-y-2">
        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
          Relay_Method_Selection
        </label>
        <Controller
          name="method"
          control={control}
          render={({ field }) => (
            <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-1">
              <Select
                {...field}
                options={WITHDRAWAL_OPTIONS}
                className="bg-transparent border-none text-[10px] font-mono font-bold uppercase tracking-widest"
              />
            </div>
          )}
        />
      </div>

      {/* 3. CONDITIONAL PARAMETERS */}
      <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-6">
        
        {/* BITCOIN */}
        {selectedMethod === "BTC" && (
          <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">BTC_Wallet_Coordinate</label>
                <div className="relative group">
                    <Wallet size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500" />
                    <Input
                        placeholder="INPUT_BITCOIN_ADDRESS..."
                        {...register("address", { required: "Wallet address is required" })}
                        error={!!errors.address}
                        hint={errors.address?.message}
                        className="pl-10 font-mono text-[11px] tracking-tight uppercase"
                    />
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20">
                <Info size={14} className="text-amber-500 shrink-0" />
                <p className="text-[9px] font-mono text-amber-600 uppercase leading-relaxed">
                    CRITICAL: Crypto transactions are immutable. Ensure the target coordinate is verified.
                </p>
            </div>
          </div>
        )}

        {/* BANK TRANSFER */}
        {selectedMethod === "BANK" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Bank_Institution</label>
              <Input
                placeholder="INPUT_BANK_NAME..."
                {...register("bankName", { required: "Bank name is required" })}
                error={!!errors.bankName}
                hint={errors.bankName?.message}
                className="font-mono text-[11px] uppercase"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Registry_Account_Number</label>
              <Input
                placeholder="INPUT_ACCOUNT_NUMBER..."
                {...register("accountNumber", { required: "Account number is required" })}
                error={!!errors.accountNumber}
                hint={errors.accountNumber?.message}
                className="font-mono text-[11px] uppercase"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Legal_Account_Name</label>
              <Input
                placeholder="INPUT_ACCOUNT_HOLDER..."
                {...register("accountName", { required: "Account name is required" })}
                error={!!errors.accountName}
                hint={errors.accountName?.message}
                className="font-mono text-[11px] uppercase"
              />
            </div>
          </div>
        )}

        {/* PAYPAL */}
        {selectedMethod === "PAYPAL" && (
          <div className="space-y-2">
            <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Paypal_Proxy_Email</label>
            <div className="relative group">
                <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500" />
                <Input
                    type="email"
                    placeholder="USER@PAYPAL_NETWORK"
                    {...register("paypalEmail", { required: "PayPal email is required" })}
                    error={!!errors.paypalEmail}
                    hint={errors.paypalEmail?.message}
                    className="pl-10 font-mono text-[11px] tracking-tight uppercase"
                />
            </div>
          </div>
        )}
      </div>

      {/* 4. SECURITY_VERIFICATION */}
      <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-white/5">
        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
          Exit_Authentication_Key
        </label>
        <div className="relative group">
            <ShieldCheck size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500" />
            <Input
                type="password"
                placeholder="••••••"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                hint={errors.password?.message}
                className="pl-10 py-4 font-mono tracking-widest"
            />
        </div>
      </div>

      {/* EXECUTION BUTTON */}
      <button
        type="submit"
        className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-lg shadow-brand-500/10 active:scale-[0.98]"
        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
      >
        Execute_Liquidation
      </button>
    </form>
  );
}