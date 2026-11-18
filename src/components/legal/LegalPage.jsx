import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";

export default function LegalPage({ title, updated, seo, children }) {
  return (
    <div className="min-h-screen bg-background">
      {seo ? <Seo {...seo} /> : null}
      <div className="mx-auto w-full max-w-[750px] px-4 pb-10">
        <header className="flex items-center justify-between border-b border-border py-3">
          <Link
            to="/"
            className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground">
            
            <ChevronLeft className="h-4 w-4" />
            Library
          </Link>
          <span className="font-heading text-[13px] font-semibold">onlinknow.co.za</span>
        </header>

        <h1 className="mt-7 font-heading text-[25px] font-extrabold leading-tight tracking-tight">
          {title}
        </h1>
        {updated ?
        <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Last updated: {updated}
          </p> :
        null}

        <div className="mt-6 space-y-6">{children}</div>
      </div>
      <Footer />
    </div>);

}

export function LegalSection({ number, heading, paragraphs = [], children }) {
  return (
    <section>
      <h2 className="font-heading text-[16px] font-bold leading-snug">
        {number ? `${number}. ` : ""}
        {heading}
      </h2>
      <div className="mt-2 space-y-3 font-reading text-[17px] leading-[1.8] text-foreground">
        {paragraphs.map((paragraph, index) =>
        <p key={index} className="text-left">{paragraph}</p>
        )}
        {children}
      </div>
    </section>);

}