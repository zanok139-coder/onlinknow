import React from "react";
import AdsterraSlot from "@/components/ads/AdsterraSlot";

const IN_CONTENT_KEY = "8fb2e33b1387adb4d100123748da76d9";

/** Adsterra 300x250 fixed banner, centered inside the book summary. */
export default function AdsterraInContent() {
  return (
    <div id="ad-in-content" className="my-5 flex w-full justify-center overflow-hidden">
      <AdsterraSlot
        adKey={IN_CONTENT_KEY}
        width={300}
        height={250}
        className="flex justify-center"
      />
    </div>
  );
}