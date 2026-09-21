import { LegalPage, type LegalSection } from "@/components/pages/LegalPage";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms",
  description:
    "The terms that apply to this website and to the use of the AtithiDeva property management system.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    heading: "Using this website",
    body: [
      `This website is published by ${site.legalName} to describe the AtithiDeva property management system.`,
      "Product visuals on this site contain sample data for illustration. They are not statements about any property's actual occupancy, revenue or results.",
    ],
  },
  {
    heading: "Software licence",
    body: [
      "Access to AtithiDeva is granted under a separate written agreement between the property and us. That agreement governs scope, fees, term, support and anything else about the software.",
      "Nothing on this website forms part of that agreement or creates a licence by itself.",
    ],
  },
  {
    heading: "Property responsibilities",
    body: [
      "A property using the system is responsible for the accuracy of the data it enters, for the rates and tax settings it configures, and for issuing invoices that comply with the law applying to it.",
      "The property is also responsible for managing its own users, roles and permissions.",
    ],
  },
  {
    heading: "Availability",
    body: [
      "We aim to keep the service available and correct, but we do not warrant uninterrupted operation. Planned maintenance and service levels, where they apply, are set out in the agreement with the property.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The AtithiDeva name, the software and the material on this website remain our property. Data entered by a property into its installation remains that property's own.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about these terms can be sent to ${site.contact.email}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      marker="Legal"
      title="Terms"
      lede="What applies when you use this website, and where the actual software agreement takes over."
      updated="17 September 2026"
      sections={sections}
    />
  );
}
