import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { MetaPixelPageView } from "@/components/shared/MetaPixelPageView";
import { SITE } from "@/lib/constants";
import { buildEntityGraph } from "@/lib/jsonld";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const HOME_TITLE =
  "Mote Kreatif — Agency Digital Marketing & Marketplace Optimization";
const HOME_DESCRIPTION =
  "Mote Kreatif adalah digital marketing agency & consultant di Garut, Jawa Barat. Scale penjualan lewat Meta Ads, CPAS Shopee, TikTok Shop — ROAS 20.8x, revenue +157%.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HOME_TITLE,
    template: "%s | Mote Kreatif",
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  keywords: [
    "digital marketing Garut",
    "agency digital Garut",
    "Meta Ads",
    "CPAS Shopee",
    "TikTok Shop Ads",
    "TDMO",
    "marketplace optimization",
    "Mote Kreatif",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE.url,
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  icons: {
    icon: "/img/logogramsquare.webp",
    apple: "/img/logogramsquare.webp",
  },
  verification: {
    other: {
      "facebook-domain-verification": "kk3yhk4p9djkosft73uongckwzl2es",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#06243B",
  width: "device-width",
  initialScale: 1,
};

const entityGraph = buildEntityGraph();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="antialiased">
        {/* Entity graph dirender inline (server-side) agar terbaca AI crawlers
            yang tidak mengeksekusi JavaScript */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraph) }}
        />
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${SITE.metaPixelId}');fbq('track','PageView');`}
        </Script>
        <MetaPixelPageView />
        <GoogleAnalytics />

        <Header />
        <main className="pt-16 md:pt-20 min-h-[60vh]">{children}</main>
        <Footer />

        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${SITE.metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
