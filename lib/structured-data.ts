import { site } from "./site";
import { faqs } from "@/data/content";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.legalName,
  url: site.url,
  description: site.description,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contact.addressLocality,
    addressRegion: site.contact.addressRegion,
    addressCountry: site.contact.addressCountry,
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en",
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${site.url}/#software`,
  name: site.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Property Management System",
  operatingSystem: "Web browser",
  description: site.description,
  url: site.url,
  publisher: { "@id": `${site.url}/#organization` },
  featureList: [
    "Front desk and guest check-in",
    "Reservations and room allocation",
    "Room status and availability tracking",
    "Housekeeping and maintenance workflow",
    "Billing, discounts, GST and invoicing",
    "Restaurant and meal plan charges",
    "Banquet enquiry to payment lifecycle",
    "Night audit and financial reporting",
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
