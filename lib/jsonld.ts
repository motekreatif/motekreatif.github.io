import { SITE, CONTACT, SAME_AS } from "./constants";
import { SERVICES } from "./data";

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const LOGO_ID = `${SITE.url}/#logo`;

/**
 * Entity graph utama — dirender inline di <head> (server-side) agar terbaca
 * oleh AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) yang
 * tidak mengeksekusi JavaScript.
 *
 * Struktur: Organization sebagai entity pusat, di-link via @id ke WebSite
 * dan ProfessionalService (lokasi fisik). Satu graph, satu identitas.
 */
export function buildEntityGraph() {
  const organization = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: "MOTE",
    url: SITE.url,
    description: SITE.description,
    slogan: SITE.slogan,
    foundingDate: SITE.foundingDate,
    email: CONTACT.email,
    telephone: "+62-851-9655-8646",
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${SITE.url}/img/logogramsquare.webp`,
      contentUrl: `${SITE.url}/img/logogramsquare.webp`,
      caption: SITE.name,
    },
    image: { "@id": LOGO_ID },
    sameAs: SAME_AS,
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
    address: CONTACT.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.streetAddress,
      addressLocality: "Garut",
      addressRegion: "Jawa Barat",
      postalCode: office.postalCode,
      addressCountry: "ID",
    })),
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Garut",
      },
      {
        "@type": "AdministrativeArea",
        name: "Jawa Barat",
      },
      {
        "@type": "Country",
        name: "Indonesia",
      },
    ],
    knowsAbout: [
      "Digital Marketing",
      "Meta Ads",
      "CPAS Shopee",
      "TikTok Shop Ads",
      "Google Ads",
      "Marketplace Optimization",
      "Social Media Marketing",
      "Brand Strategy",
      "Marketing Team Development",
      "WhatsApp CRM",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-851-9655-8646",
      email: CONTACT.email,
      contactType: "sales",
      availableLanguage: ["Indonesian", "English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Mote Kreatif",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          provider: { "@id": ORG_ID },
          areaServed: "Indonesia",
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "id-ID",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}
