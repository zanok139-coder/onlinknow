import React from "react";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 28, 2026"
      seo={{
        title: "Terms of Service - onlinknow.co.za",
        description:
          "The terms for using onlinknow.co.za, a free public domain reading platform. All books are copyright-free and provided free of charge.",
        keywords: "onlink library terms of service, free book library terms, public domain usage terms",
        canonical: `${SITE_URL}/terms`,
        image: DEFAULT_OG_IMAGE,
      }}
    >
      <LegalSection
        number="1"
        heading="Acceptance"
        paragraphs={[
          "By using onlinknow.co.za, you agree to these Terms.",
        ]}
      />

      <LegalSection
        number="2"
        heading="Free Public Domain Content"
        paragraphs={[
          "All books provided are public domain works. Original editions published before 1929 or works with expired copyright.",
          "We do not host modern copyrighted books.",
        ]}
      />

      <LegalSection
        number="3"
        heading="No Copyright Infringement"
        paragraphs={[
          "If you believe any content violates copyright, email us at support@onlinknow.co.za with proof and we will remove it within 24 hours (DMCA compliant).",
        ]}
      />

      <LegalSection
        number="4"
        heading="Ads"
        
      />

      <LegalSection
        number="5"
        heading="No Account Needed"
        paragraphs={["No registration is required. We do not store personal reading data."]}
      />

      <LegalSection
        number="6"
        heading="Educational Purpose Only"
        paragraphs={[
          "Books are for educational and spiritual growth purposes. They are not professional advice.",
        ]}
      />

      <LegalSection
        number="7"
        heading="No Guarantee"
        paragraphs={["Content is provided as-is from public domain sources."]}
      />

      <LegalSection
        number="8"
        heading="Governing Law"
        paragraphs={["These Terms are governed by the laws of South Africa."]}
      />
    </LegalPage>
  );
}