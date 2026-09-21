import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Building2,
  Calculator,
  ChefHat,
  ConciergeBell,
  Feather,
  FileBarChart,
  Globe,
  Handshake,
  Link2,
  MailCheck,
  Moon,
  ReceiptIndianRupee,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

export type Feature = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  detail: string[];
};

export const features: Feature[] = [
  {
    id: "onboarding",
    title: "Property onboarding",
    summary:
      "Add your property, configure rooms, tariffs, taxes and users, and start managing quickly.",
    icon: Rocket,
    detail: [
      "Room types, tariffs and tax setup captured during onboarding",
      "Users and basic settings configured alongside the property",
    ],
  },
  {
    id: "direct-booking",
    title: "Website & direct booking",
    summary:
      "Generate your own hotel website in a few steps and accept direct bookings on your own tariffs.",
    icon: Globe,
    detail: [
      "A bookable website generated from your property's own data",
      "Direct bookings priced at your own tariffs",
    ],
  },
  {
    id: "ota-management",
    title: "OTA management",
    summary: "Manage bookings, room availability and tariffs across multiple OTAs from one platform.",
    icon: Link2,
    detail: [
      "OTA bookings land on the same room board as direct bookings",
      "Availability and tariffs kept in sync across channels",
    ],
  },
  {
    id: "quotations",
    title: "Smart quotations",
    summary:
      "Create professional quotations and convert them into bookings with an automatic back-calculation process.",
    icon: Calculator,
    detail: [
      "Quote the number the guest asked for; the base rate, discount and GST are worked out behind it",
      "A confirmed quotation converts directly into a booking",
    ],
  },
  {
    id: "b2b",
    title: "B2B deal management",
    summary:
      "Manage travel agents, corporate clients, negotiated rates, commissions, quotations and bookings.",
    icon: Handshake,
    detail: [
      "Negotiated rates and commissions held per travel agent or corporate account",
      "Quotations and bookings tracked against the same account",
    ],
  },
  {
    id: "check-in-out",
    title: "Quick check-in & check-out",
    summary: "Simple, fast and hassle-free guest management.",
    icon: ConciergeBell,
    detail: [
      "Check-in and check-out run against the room's active booking",
      "Guest and stay details captured once, reused throughout",
    ],
  },
  {
    id: "multi-property",
    title: "Multi-property management",
    summary: "Manage multiple hotels and properties from one dashboard.",
    icon: Building2,
    detail: [
      "Each property's rooms, bookings and staff held separately",
      "One login to move between properties",
    ],
  },
  {
    id: "inventory",
    title: "Inventory management",
    summary: "Track rooms, stock, purchases, vendors and consumption in one place.",
    icon: Boxes,
    detail: [
      "Purchases and vendors recorded against consumption",
      "Stock levels tracked alongside room inventory",
    ],
  },
  {
    id: "rbac",
    title: "Role-based access control",
    summary: "Set permissions for different users, departments and properties.",
    icon: ShieldCheck,
    detail: [
      "Access scoped to a user's department and property",
      "Roles and permissions configured centrally",
    ],
  },
  {
    id: "payments",
    title: "Multi-channel payments",
    summary: "Manage cash, card, UPI, online payments, advances and refunds.",
    icon: Wallet,
    detail: [
      "Advance payments and refunds recorded against the booking",
      "Every payment method reconciled to the same folio",
    ],
  },
  {
    id: "business-day",
    title: "Business day management",
    summary: "Simplify day closing, night audit and daily business operations.",
    icon: Moon,
    detail: [
      "The business date closes with revenue and cash reconciled",
      "Daily operations and the audit run from the same screen",
    ],
  },

  {
    id: "gst-billing",
    title: "GST & billing",
    summary: "Automated GST verification, tax calculation, invoices and receipts.",
    icon: ReceiptIndianRupee,
    detail: [
      "GST configured once in invoice settings and applied everywhere",
      "Invoices and receipts generated from the same charge records",
    ],
  },
  {
    id: "crm",
    title: "Built-in CRM",
    summary: "Manage guest profiles, booking history, preferences and corporate clients.",
    icon: Users,
    detail: [
      "Repeat guests recognised by their profile and stay history",
      "Preferences and corporate accounts held alongside the guest record",
    ],
  },
  {
    id: "auto-reports",
    title: "Automated daily reports",
    summary: "Receive revenue, occupancy, booking and operational reports via email.",
    icon: MailCheck,
    detail: [
      "A daily summary sent without anyone having to run it",
      "Covers revenue, occupancy and booking activity",
    ],
  },
  {
    id: "restaurant",
    title: "Restaurant & multi-service",
    summary: "Manage restaurants, room service, outlets and guest room postings.",
    icon: ChefHat,
    detail: [
      "Charges from any outlet post straight to the guest's room",
      "Menus and services managed centrally across outlets",
    ],
  },
  {
    id: "housekeeping",
    title: "Housekeeping management",
    summary: "Track room status, cleaning, assignments and maintenance.",
    icon: Sparkles,
    detail: [
      "Cleaning assignments tracked from checkout to release",
      "Maintenance rooms held out of sellable inventory",
    ],
  },
  {
    id: "realtime-reports",
    title: "Real-time reports & dashboard",
    summary: "Get clear insights into occupancy, revenue, payments and operations.",
    icon: FileBarChart,
    detail: [
      "Occupancy and revenue visible as the day happens",
      "Payments and operational status on one dashboard",
    ],
  },
  {
    id: "simple-ui",
    title: "Clean & simple UI",
    summary: "Easy to learn, easy to use, and designed for smooth hotel operations.",
    icon: Feather,
    detail: [
      "Every screen designed around the task in front of the user",
      "Nothing hidden behind a menu it doesn't need to be behind",
    ],
  },
];

export const featureById = Object.fromEntries(features.map((f) => [f.id, f])) as Record<
  string,
  Feature
>;
