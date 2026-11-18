import React from "react";
import AdsterraSlot from "@/components/ads/AdsterraSlot";

/**
 * TOP HEADER AD — real Adsterra fixed banners.
 * Desktop: 728x90 (768px and wider) · Phone: 320x50 (below 768px).
 * Shown for every visitor — Accept personalizes, Decline serves non-personalized.
 */
const DESKTOP_TOP_KEY = "d70929d64e4d387bfff14b6df600b45b";
const MOBILE_TOP_KEY = "57dc1dee533054e07c8a38d65f1c49da";

export default function AdsterraTop() {
  return (
    <div id="ad-top" className="mx-auto flex w-full justify-center overflow-hidden px-2 py-2">
      {/* Desktop 728x90 */}
      <div className="hidden items-center justify-center md:flex">
        <AdsterraSlot adKey={DESKTOP_TOP_KEY} width={728} height={90} />
      </div>

      {/* Phone 320x50 */}
      <div className="flex items-center justify-center md:hidden">
        <AdsterraSlot adKey={MOBILE_TOP_KEY} width={320} height={50} />
      </div>
    </div>
  );
}