export const CONSENT_KEY = "onlink_cookie_choice";
const CONSENT_EVENT = "onlink-consent-change";

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

/**
 * Flags the AdSense queue as non-personalized. Ads keep rendering either way —
 * Accept only turns personalization on.
 */
export function setAdPersonalization(accepted) {
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = accepted ? 0 : 1;
}

/**
 * Reports the visitor's choice with Google Consent Mode v2 so Google ad tags can
 * personalize (or not). Always sends all four keys. Non-personalized ads are
 * still requested on Decline, so ad slots stay visible.
 */
export function pushConsentMode(accepted) {
  const state = accepted ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];
  const gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
  gtag("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
  setAdPersonalization(accepted);
}

export function saveConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable */
  }
  pushConsentMode(value === "accepted");
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}