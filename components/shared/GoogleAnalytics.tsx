import Script from "next/script";
import { SITE } from "@/lib/constants";

/**
 * GA4 — untuk mengukur traffic dari AI engines (GEO measurement).
 * Tidak render apa pun selama SITE.ga4Id kosong.
 *
 * Setelah live, buat segment di GA4 dengan referral source:
 * chatgpt.com, chat.openai.com, perplexity.ai, gemini.google.com,
 * copilot.microsoft.com, claude.ai — itu traffic hasil GEO.
 */
export function GoogleAnalytics() {
  if (!SITE.ga4Id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.ga4Id}');`}
      </Script>
    </>
  );
}
