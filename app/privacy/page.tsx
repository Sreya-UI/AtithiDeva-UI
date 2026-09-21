import { LegalPage, type LegalSection } from "@/components/pages/LegalPage";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy",
  description:
    "How AtithiDeva handles information collected through this website and through the property management system.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    heading: "What this policy covers",
    body: [
      `This policy describes how ${site.legalName} handles information collected through this website and through the AtithiDeva property management system.`,
      "It does not cover third-party websites you may reach from here, which operate under their own policies.",
    ],
  },
  {
    heading: "Information collected through this website",
    body: [
      "If you submit the demo request form, we receive the details you enter: your name, property name, email address, and optionally your phone number, room count, departments and message.",
      "We use those details to respond to your request and arrange a walkthrough. We do not sell them.",
    ],
  },
  {
    heading: "Information held inside the product",
    body: [
      "A hotel using AtithiDeva enters guest and booking information into its own installation — guest names, contact details, identity document references, stay dates, charges and payments.",
      "That information belongs to the property operating the system. The property is the controller of its guest data and decides who inside its organisation may access it through roles and permissions.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "Demo enquiries are kept only as long as needed to answer them and to maintain a record of the conversation.",
      "Operational data inside a property's installation is retained according to that property's own retention decisions and any legal obligations that apply to hotel records.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You may ask what information we hold about you, ask for it to be corrected, or ask for it to be deleted, subject to any records we are required to keep.",
      `Write to ${site.contact.email} and we will respond.`,
    ],
  },
  {
    heading: "Changes",
    body: [
      "If this policy changes materially, the updated date at the top of the page will change and the revised policy will be published here.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      marker="Legal"
      title="Privacy"
      lede="What is collected through this website, what lives inside a property's own installation, and who is responsible for each."
      updated="17 September 2026"
      sections={sections}
    />
  );
}
