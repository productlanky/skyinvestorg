"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";
import { RiTelegram2Fill } from "react-icons/ri";
import { companyName } from "@/lib/data/info";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function InviteFriends() {
  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  const addEmail = (email: string) => {
    const trimmed = email.trim().replace(/,$/, "");
    if (trimmed && isValidEmail(trimmed) && !emails.includes(trimmed)) {
      setEmails((prev) => [...prev, trimmed]);
    }
    setInputValue("");
  };

  const removeEmail = (email: string) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if ((key === "Enter" || key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      addEmail(inputValue);
    } else if (key === "Backspace" && inputValue === "" && emails.length > 0) {
      e.preventDefault();
      setEmails((prev) => prev.slice(0, -1));
    }
  };

  const handleSendInvites = () => {
    if (emails.length === 0) return;
    alert(`Invitations sent to:\n${emails.join(", ")}`);
    setEmails([]);
    setInputValue("");
  };

  const hasEmails = emails.length > 0;

  return (
    <div
      className="
        max-w-3xl mx-auto mt-8
        rounded-2xl border border-gray-200/80 dark:border-white/[0.06]
        bg-white/80 dark:bg-white/[0.03]
        backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.12)]
        p-6 md:p-7
      "
    >
      <div className="flex flex-col gap-1 mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
          Email invites
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
          Invite your friends
        </h2>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-xl">
          Paste or type multiple email addresses and press{" "}
          <span className="font-medium">Enter</span> or{" "}
          <span className="font-medium">,</span> to add them as chips. We’ll
          send them an invite to join {companyName}.
        </p>
      </div>

      {/* Invite by Email */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Friend&apos;s email addresses
        </label>

        <div
          className="
            flex w-full flex-wrap items-center gap-2
            rounded-xl border border-gray-200 dark:border-gray-700
            bg-white/90 dark:bg-gray-950/70
            px-2.5 py-2
            text-sm shadow-theme-xs
            focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15
            transition
          "
        >
          {/* Chips */}
          {emails.map((email) => (
            <span
              key={email}
              className="
                inline-flex items-center gap-1.5
                rounded-full border border-brand-100
                bg-brand-50 text-brand-800
                dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200
                px-2.5 py-1 text-xs
              "
            >
              {email}
              <button
                type="button"
                onClick={() => removeEmail(email)}
                className="inline-flex items-center justify-center rounded-full hover:text-error-500 focus:outline-none"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {/* Input */}
          <input
            type="text"
            placeholder={
              emails.length === 0
                ? "Type an email and press Enter or ,"
                : "Add another email…"
            }
            className="
              flex-1 min-w-[180px] border-none outline-none bg-transparent
              text-sm text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500
            "
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />

          {/* Send button */}
          <button
            type="button"
            onClick={handleSendInvites}
            disabled={!hasEmails}
            className={`
              inline-flex items-center justify-center gap-1.5
              rounded-lg px-3 py-2 text-xs font-medium
              transition
              ${
                hasEmails
                  ? "bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed opacity-70"
              }
            `}
          >
            <RiTelegram2Fill size={16} />
            <span className="hidden sm:inline">Send invites</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-500 dark:text-gray-500">
          We’ll only use these emails to send an invitation to join your account
          on {companyName}.
        </p>
      </div>
    </div>
  );
}
