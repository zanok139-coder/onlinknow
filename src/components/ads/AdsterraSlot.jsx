import React, { useEffect, useRef, useState } from "react";

/**
 * ADSTERRA FIXED IFRAME SLOT
 * - Always visible: Accept shows personalized ads, Decline shows non-personalized
 *   ads. Nothing here hides the slot or sets display:none.
 * - Lazy: the ad is built when the slot nears the viewport.
 * - Each slot renders inside its own same-origin iframe, so repeated placements
 *   and the desktop/mobile pair never overwrite the shared `atOptions` global.
 */
export default function AdsterraSlot({ adKey, width, height, enabled = true, className = "" }) {
  const hostRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (!("IntersectionObserver" in window)) {
      setNearViewport(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !enabled || !nearViewport) return undefined;

    const frame = document.createElement("iframe");
    frame.title = "Advertisement";
    frame.width = String(width);
    frame.height = String(height);
    frame.scrolling = "no";
    frame.style.cssText = `display:block;border:0;width:${width}px;height:${height}px;max-width:100%;overflow:hidden`;
    frame.srcdoc = [
      "<!DOCTYPE html><html><head><meta charset='utf-8'>",
      "<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style>",
      "</head><body>",
      "<script type='text/javascript'>",
      `atOptions = { 'key' : '${adKey}', 'format' : 'iframe', 'height' : ${height}, 'width' : ${width}, 'params' : {} };`,
      "<\/script>",
      `<script type='text/javascript' src='https://www.highrevenueformat.com/${adKey}/invoke.js'><\/script>`,
      "</body></html>",
    ].join("");

    host.appendChild(frame);

    return () => {
      host.innerHTML = "";
    };
  }, [adKey, width, height, enabled, nearViewport]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ width, height, maxWidth: "100%", overflow: "hidden" }}
    />
  );
}