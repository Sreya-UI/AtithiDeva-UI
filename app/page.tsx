import { Marquee } from "@/components/home/Marquee";
import { Banquet } from "@/components/home/Banquet";
import { Billing } from "@/components/home/Billing";
import { BookingFlow } from "@/components/home/BookingFlow";
import { CTA } from "@/components/home/CTA";
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Finance } from "@/components/home/Finance";
import { Hero } from "@/components/home/Hero";
import { HotelShowcase } from "@/components/home/HotelShowcase";
import { Housekeeping } from "@/components/home/Housekeeping";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MasterData } from "@/components/home/MasterData";
import { Principles } from "@/components/home/Principles";
import { VideoWalkthrough } from "@/components/home/VideoWalkthrough";
import { QuotationFlow } from "@/components/home/QuotationFlow";
import { Restaurant } from "@/components/home/Restaurant";
import { RoomManagement } from "@/components/home/RoomManagement";
import { Showcase } from "@/components/home/Showcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, softwareApplicationSchema } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Principles />
      <VideoWalkthrough />
      <HotelShowcase />
      <QuotationFlow />
      <RoomManagement />
      <BookingFlow />
      <Billing />
      <Housekeeping />
      <Restaurant />
      <Banquet />
      <Finance />
      <Showcase />
      <Features />
      <MasterData />
      <HowItWorks />
      <FAQ />
      <CTA />

      <JsonLd id="schema-software" data={softwareApplicationSchema} />
      <JsonLd id="schema-faq" data={faqSchema} />
    </>
  );
}
