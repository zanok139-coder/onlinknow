import React from "react";
import LegalPage from "@/components/legal/LegalPage";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const STATS = [
{ value: "50+", label: "Books" },
{ value: "100%", label: "Free" },
{ value: "100%", label: "Public Domain" },
{ value: "No Login", label: "Required" }];


const PARAGRAPHS = [
"onlinknow.co.za is a public domain digital library dedicated to preserving and sharing timeless wisdom,curated by Siphesihle Madondo in Durban South Africa. We provide free access to 50+ public domain books on spirituality, mind power, meditation, and self-development.",
"Our Mission: To make ancient wisdom and classic self-development texts accessible to everyone, everywhere, for free. All books in our library are verified public domain works, published before 1929 or with expired copyrights.",
"What We Offer: A curated collection of 50+ classics including works by James Allen, Wallace D. Wattles, Marcus Aurelius, Lao Tzu, and more. A clean reading experience with no login required."];


export default function About() {
  return (
    <LegalPage
      title="About onlinknow.co.za"
      seo={{
        title: "About onlinknow.co.za - 50+ Free Public Domain Books",
        description:
        "onlinknow.co.za is a free digital library of 50+ public domain classics on spirituality, mind power and self development. No login, no payment, free forever.",
        keywords:
        "about onlink library, free public domain library, free spiritual books online, self development classics",
        canonical: `${SITE_URL}/about`,
        image: DEFAULT_OG_IMAGE
      }}>
      
      <p className="font-reading text-[18px] font-semibold leading-snug text-muted-foreground">Your Spiritual Library

      </p>

      <div className="space-y-4 font-reading text-[17px] leading-[1.8] text-foreground">
        {PARAGRAPHS.map((paragraph) =>
        <p key={paragraph}>{paragraph}</p>
        )}
      </div>

      <section className="border-y border-border py-6">
        <div className="grid grid-cols-2 gap-5 text-center sm:grid-cols-4">
          {STATS.map((stat) =>
          <div key={stat.label}>
              <p className="font-heading text-[22px] font-extrabold leading-none tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-[16px] font-bold">Contact</h2>
        <p className="mt-2 font-reading text-[17px] leading-[1.8]">
          For questions, contact us at{" "}
          <a
            href="mailto:support@onlinknow.co.za"
            className="text-link underline underline-offset-2">
            
            support@onlinknow.co.za
          </a>
          .
        </p>
      </section>
    </LegalPage>);

}