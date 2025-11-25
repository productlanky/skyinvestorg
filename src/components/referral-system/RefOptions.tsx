import React from "react";
import Button from "../ui/button/Button";
import CopyLinkInput from "../form/group-input/CopyLinkInput";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";

export default function RefOptions({ referralLink }: { referralLink: string }) {
  const hasLink = Boolean(referralLink);

  const shareOnTwitter = () => {
    if (!hasLink) return;
    const msg = encodeURIComponent(
      `Join me on this investing app and earn rewards with me 🚀 ${referralLink}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${msg}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    if (!hasLink) return;
    const msg = encodeURIComponent(
      `Get rewarded by joining this investing platform: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <div
      className="
        rounded-2xl border border-gray-200 dark:border-white/[0.06]
        bg-white/80 dark:bg-white/[0.03]
        backdrop-blur-xl shadow-sm px-5 py-5 md:px-6 md:py-6
        space-y-4
      "
    >
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
          Share your referral link
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground max-w-lg">
          Copy your unique link or share it directly on social media. Every
          successful signup earns you referral rewards.
        </p>
      </div>

      {/* Link Input */}
      <CopyLinkInput link={referralLink} />

      {/* Share Buttons */}
      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button
          variant="outline"
          className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 text-xs md:text-sm"
          onClick={shareOnTwitter}
          disabled={!hasLink}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
            <FaXTwitter size={13} />
          </span>
          <span>Share on X</span>
        </Button>

        <Button
          variant="outline"
          className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 text-xs md:text-sm"
          onClick={shareOnWhatsApp}
          disabled={!hasLink}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/10">
            <FaWhatsapp size={16} className="text-[#25D366]" />
          </span>
          <span>Share on WhatsApp</span>
        </Button>
      </div>

      {!hasLink && (
        <p className="text-[11px] text-amber-600 dark:text-amber-300 pt-1">
          Your referral link will appear here once your profile is fully loaded.
        </p>
      )}
    </div>
  );
}
