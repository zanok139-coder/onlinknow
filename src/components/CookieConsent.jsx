import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, pushConsentMode, saveConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = getConsent();
    // re-send the saved choice on every page load
    if (saved) pushConsentMode(saved === "accepted");
    if (!saved) setVisible(true);
  }, []);

  const decide = (value) => {
    saveConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-navy px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-3 text-navy-foreground">
      <p className="mx-auto max-w-[750px] font-reading text-[12px] leading-relaxed text-white/80">
        We use cookies for ads and analytics to keep onlinknow.co.za free. By continuing you accept
        our{" "}
        <Link to="/privacy" className="text-gold underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mx-auto mt-2.5 flex max-w-[750px] gap-2">
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="h-9 flex-1 rounded-lg bg-gold text-[13px] font-semibold text-navy transition-opacity hover:opacity-90"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("declined")}
          className="h-9 flex-1 rounded-lg border border-white/25 text-[13px] font-semibold text-white/85 transition-colors hover:border-white/50"
        >
          Decline
        </button>
      </div>
    </div>
  );
}