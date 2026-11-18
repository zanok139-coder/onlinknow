import React from "react";
import AdsterraSlot from "@/components/ads/AdsterraSlot";

const IN_CONTENT_KEY = "8fb2e33b1387adb4d100123748da76d9";

/**
 * IN-CONTENT AD — real Adsterra 300x250 banner.
 * Injected automatically after every 3 paragraphs by <ChapterContent />.
 * Each instance renders in its own iframe, so repeats never collide.
 */
export default function InContentAd() {
  return (
    <div className="my-7">
      <p className="mb-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Advertisement
      </p>

      <div className="mx-auto flex w-full justify-center overflow-hidden">
        <AdsterraSlot adKey={IN_CONTENT_KEY} width={300} height={250} />
      </div>
    </div>
  );
}