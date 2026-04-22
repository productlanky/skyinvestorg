"use client";

import { useState } from "react";
import { XIcon, Mail, Send, Terminal } from "lucide-react";
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
    // Integration point: Connect your email service provider (SendGrid, Mailgun, etc.)
    console.log(`Sending batch protocols to: ${emails.join(", ")}`);
    setEmails([]);
    setInputValue("");
  };

  const hasEmails = emails.length > 0;

  return (
    <div
      className="
        bg-white dark:bg-[#0D1117] 
        border border-slate-200 dark:border-white/5 
        p-6 relative group overflow-hidden
      "
    >
      {/* Terminal Tag */}
      <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">
        DISPATCH_RELAY_V1
      </div>

      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex items-start gap-4">
          <div className="p-3 border border-brand-500/20 bg-brand-500/5 shrink-0">
             <Mail className="text-brand-500" size={20} />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
              Relay Node Invitations
            </h2>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-tight leading-relaxed max-w-xl">
              Queue email addresses to initialize remote invitations. 
              Use <span className="text-brand-500 font-bold">ENTER</span> or <span className="text-brand-500 font-bold">COMMA</span> to register tokens.
            </p>
          </div>
        </div>

        {/* Input & Chip Area */}
        <div className="space-y-3">
          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">
            Target_Recipient_List
          </label>

          <div
            className="
              flex w-full flex-wrap items-center gap-2
              bg-slate-50 dark:bg-white/[0.02]
              border border-slate-200 dark:border-white/10
              px-3 py-3
              transition-colors focus-within:border-brand-500/50
            "
          >
            {/* Chips (Terminal Style) */}
            {emails.map((email) => (
              <span
                key={email}
                className="
                  inline-flex items-center gap-2
                  bg-brand-500/10 border border-brand-500/30
                  text-brand-700 dark:text-brand-400
                  px-2 py-1 text-[10px] font-mono font-bold uppercase
                "
              >
                {email}
                <button
                  type="button"
                  onClick={() => removeEmail(email)}
                  className="hover:text-red-500 transition-colors"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Input Field */}
            <input
              type="text"
              placeholder={emails.length === 0 ? "INPUT_EMAIL_COORDINATE..." : ""}
              className="
                flex-1 min-w-[200px] border-none outline-none bg-transparent
                text-xs font-mono text-slate-800 dark:text-white 
                placeholder:text-slate-400 dark:placeholder:text-slate-600
                uppercase tracking-wider
              "
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        </div>

        {/* Execution Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
                <Terminal size={12} className="text-slate-400" />
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                  Status: {hasEmails ? `${emails.length} Addresses Ready` : "Awaiting Input"}
                </p>
            </div>

            <button
              type="button"
              onClick={handleSendInvites}
              disabled={!hasEmails}
              className={`
                flex items-center justify-center gap-2 px-6 py-3
                text-[10px] font-black uppercase tracking-widest
                transition-all duration-200
                ${
                  hasEmails
                    ? "bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/10"
                    : "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-white/10"
                }
              `}
              style={hasEmails ? { clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' } : {}}
            >
              <Send size={14} />
              Dispatch Protocols
            </button>
        </div>
      </div>

      {/* Decorative Bottom Detail */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-t border-r border-slate-200 dark:border-white/10"></div>
    </div>
  );
}