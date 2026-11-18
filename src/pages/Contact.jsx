import React, { useState } from "react";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const FIELD =
  "mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 font-reading text-[15px] text-foreground outline-none focus:border-gold";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setForm((draft) => ({ ...draft, [field]: event.target.value }));
    setSent(false);
  };

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <LegalPage
      title="Contact Us"
      seo={{
        title: "Contact Us - onlinknow.co.za",
        description:
          "Contact onlinknow.co.za. Email support@onlinknow.co.za for questions about the free public domain library. We reply within 24 hours.",
        keywords:
          "contact onlink library, free library support, public domain library contact, onlinknow",
        canonical: `${SITE_URL}/contact`,
        image: DEFAULT_OG_IMAGE,
      }}
    >
      <LegalSection
        heading="Get in touch"
        paragraphs={[
          <>
            Email:{" "}
            <a
              href="mailto:support@onlinknow.co.za"
              className="text-link underline underline-offset-2"
            >
              support@onlinknow.co.za
            </a>
          </>,
          "We reply within 24 hours, Monday to Sunday.",
          "Address: Durban, KwaZulu-Natal, South Africa.",
        ]}
      />

      <LegalSection heading="Send a message">
        <form onSubmit={submit} className="not-prose space-y-3">
          <div>
            <label htmlFor="name" className="text-[12px] font-semibold text-muted-foreground">
              Name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={update("name")}
              placeholder="Siphesihle Madondo"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-[12px] font-semibold text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="zanok139@gmail.com"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="message" className="text-[12px] font-semibold text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={update("message")}
              placeholder="How can we help?"
              className={FIELD}
            />
          </div>
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-gold text-[14px] font-semibold text-navy transition-opacity hover:opacity-90"
          >
            Send message
          </button>
          {sent ? (
            <p className="rounded-lg bg-gold/15 px-3 py-2 text-[13px] font-semibold text-foreground">
              Message sent!
            </p>
          ) : null}
        </form>
      </LegalSection>
    </LegalPage>
  );
}