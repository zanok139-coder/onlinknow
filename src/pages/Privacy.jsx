import React from "react";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 29, 2026"
      seo={{
        title: "Privacy Policy - onlinknow.co.za",
        description:
          "How onlinknow.co.za handles data: no account needed to read, minimal cookies, ad partners and analytics explained in plain language.",
        keywords: "onlink library privacy policy, free library cookies, ad supported library privacy",
        canonical: `${SITE_URL}/privacy`,
        image: DEFAULT_OG_IMAGE,
      }}
    >
      <p className="font-reading text-[15px] text-muted-foreground">Onlinknow Library</p>

      <LegalSection
        number="1"
        heading="Introduction"
        paragraphs={["onlinknow.co.za respects your privacy. We collect minimal data."]}
      />

      <LegalSection
        number="2"
        heading="What We Collect"
        paragraphs={[
          "We do NOT collect names, emails, or require login. We use cookies for ads. We use basic analytics (page views, book popularity) via anonymized data.",
        ]}
      />

      <LegalSection
        number="3"
        heading="Cookies"
        paragraphs={[
          "We use cookies for advertising. You can disable cookies in your browser. Third-party ad networks may use cookies and web beacons.",
        ]}
      />

      <LegalSection
        number="4"
        heading="Ad Networks"
        paragraphs={[
          "We use Google AdSense. These third parties may collect IP address and device information for ad personalization. Please see their privacy policies.",
        ]}
      />

      <LegalSection
        number="5"
        heading="Google AdSense, DART Cookies and Your Choices"
        paragraphs={[
          "We use Google AdSense. Google uses cookies and DART cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Ads Settings at https://www.google.com/settings/ads. For more info visit https://policies.google.com/technologies/ads",
          "You can accept or decline cookies using the banner shown on your first visit. Declining keeps advertising cookies off your device; essential cookies that keep the site working are unaffected.",
        ]}
      />

      <LegalSection
        number="6"
        heading="No Personal Data Sale"
        paragraphs={["We do not sell personal data."]}
      />

      <LegalSection
        number="7"
        heading="Children's Privacy"
        paragraphs={["The site is for users 13+. No data is collected from children."]}
      />

      <LegalSection
        number="8"
        heading="Data Retention"
        paragraphs={["There are no personal accounts, so no personal data is retained."]}
      />

      <LegalSection
        number="9"
        heading="Your Rights"
        paragraphs={[
          <>
            You can clear cookies, use an ad blocker, or request data removal by emailing{" "}
            <a
              href="mailto:zanok139@gmail.com"
              className="text-link underline underline-offset-2"
            >
              Onlinknow.CO.ZA
            </a>
            .
          </>,
        ]}
      />

      <LegalSection
        number="10"
        heading="Contact"
        paragraphs={[
          <>
            Email{" "}
            <a
              href="mailto:zanok139@gmail.com"
              className="text-link underline underline-offset-2"
            >
              Onlinknow.CO.ZA
            </a>
            .
          </>,
        ]}
      />

      <LegalSection
        number="11"
        heading="Changes"
        paragraphs={["This policy may be updated. Please check this page for the current version."]}
      />
    </LegalPage>
  );
}