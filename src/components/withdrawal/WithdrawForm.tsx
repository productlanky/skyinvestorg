import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import Select from "../form/Select";

const WITHDRAWAL_OPTIONS = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Bank Transfer", value: "BANK" },
  { label: "PayPal", value: "PAYPAL" },
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
      className="
        space-y-6 
        rounded-2xl
        shadow-[0_10px_40px_rgba(15,23,42,0.18)]
        dark:shadow-[0_0_30px_rgba(15,23,42,0.8)]
        backdrop-blur-xl px-6 py-7
      "
    >

      {/* Amount */}
      <div>
        <Label>
          Amount <span className="text-error-500">*</span>
        </Label>
        <Input
          type="number"
          placeholder="Enter withdrawal amount"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 100, message: "Minimum amount is $100" },
          })}
          error={!!errors.amount}
          hint={errors.amount?.message}
        />
      </div>

      {/* Withdrawal Method */}
      <div>
        <Label>
          Withdrawal Method <span className="text-error-500">*</span>
        </Label>
        <Controller
          name="method"
          control={control}
          render={({ field }) => (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <Select
                {...field}
                options={WITHDRAWAL_OPTIONS}
                className="bg-transparent"
              />
            </div>
          )}
        />
      </div>

      {/* Conditional Fields */}
      {/* ─────────────────────────────── BITCOIN */}
      {selectedMethod === "BTC" && (
        <div className="space-y-2">
          <Label>
            Bitcoin Wallet Address <span className="text-error-500">*</span>
          </Label>
          <Input
            placeholder="Enter Bitcoin address"
            {...register("address", { required: "Wallet address is required" })}
            error={!!errors.address}
            hint={errors.address?.message}
          />

          <div className="text-xs text-gray-500 dark:text-gray-400 bg-brand-500/10 border border-brand-500/20 rounded-lg p-3">
            Make sure this BTC address is correct. Crypto transfers cannot be reversed.
          </div>
        </div>
      )}

      {/* ─────────────────────────────── BANK TRANSFER */}
      {selectedMethod === "BANK" && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>
              Bank Name <span className="text-error-500">*</span>
            </Label>
            <Input
              placeholder="Enter bank name"
              {...register("bankName", { required: "Bank name is required" })}
              error={!!errors.bankName}
              hint={errors.bankName?.message}
            />
          </div>

          <div>
            <Label>
              Account Number <span className="text-error-500">*</span>
            </Label>
            <Input
              placeholder="Enter account number"
              {...register("accountNumber", {
                required: "Account number is required",
              })}
              error={!!errors.accountNumber}
              hint={errors.accountNumber?.message}
            />
          </div>

          <div>
            <Label>
              Account Name <span className="text-error-500">*</span>
            </Label>
            <Input
              placeholder="Enter account name"
              {...register("accountName", {
                required: "Account name is required",
              })}
              error={!!errors.accountName}
              hint={errors.accountName?.message}
            />
          </div>
        </div>
      )}

      {/* ─────────────────────────────── PAYPAL */}
      {selectedMethod === "PAYPAL" && (
        <div>
          <Label>
            PayPal Email Address <span className="text-error-500">*</span>
          </Label>
          <Input
            type="email"
            placeholder="Enter PayPal email"
            {...register("paypalEmail", {
              required: "PayPal email is required",
            })}
            error={!!errors.paypalEmail}
            hint={errors.paypalEmail?.message}
          />
        </div>
      )}

      {/* Withdrawal Password */}
      <div>
        <Label>
          Withdrawal Password <span className="text-error-500">*</span>
        </Label>
        <Input
          type="password"
          placeholder="Enter withdrawal password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          hint={errors.password?.message}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="
          w-full mt-4 py-3 
          font-medium text-white 
          bg-brand-600 hover:bg-brand-700
          dark:bg-brand-500 dark:hover:bg-brand-400
        "
      >
        Withdraw Funds
      </Button>
    </form>
  );
}
